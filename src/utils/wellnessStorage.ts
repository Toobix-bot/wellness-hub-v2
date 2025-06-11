/**
 * Wellness Local Storage Utilities
 * Verwaltet die lokale Speicherung von Benutzerdaten, Statistiken und Fortschritt
 */

import { UserStats, WellnessActivity, Achievement, DailyChallenge } from '@/types/analytics';

const STORAGE_KEYS = {
  USER_STATS: 'wellness-user-stats',
  ACTIVITIES: 'wellness-activities',
  ACHIEVEMENTS: 'wellness-achievements',
  DAILY_CHALLENGES: 'wellness-daily-challenges',
  SETTINGS: 'wellness-settings',
  MOOD_ENTRIES: 'wellness-mood-entries',
  SESSION_HISTORY: 'wellness-session-history'
} as const;

// Hilfsfunktion für sichere JSON-Operationen
const safeJSONParse = <T>(json: string | null, fallback: T): T => {
  if (!json) return fallback;
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
};

// Hilfsfunktion für sichere localStorage-Operationen
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }
};

/**
 * Benutzerstatistiken verwalten
 */
export const userStatsStorage = {
  get: (): UserStats => {
    const stored = safeLocalStorage.getItem(STORAGE_KEYS.USER_STATS);
    return safeJSONParse(stored, {
      totalActivities: 0,
      totalMinutes: 0,
      currentStreak: 0,
      longestStreak: 0,
      level: 1,
      totalPoints: 0,
      averageMoodImprovement: 0,
      favoriteModule: 'dankbarkeit',
      achievements: [],
      weeklyActivity: {
        'Mo': 0, 'Di': 0, 'Mi': 0, 'Do': 0, 'Fr': 0, 'Sa': 0, 'So': 0
      },
      monthlyProgress: {
        'dankbarkeit': 0,
        'stille': 0,
        'fortschritt': 0,
        'therapie': 0,
        'freude': 0,
        'transformation': 0,
        'liebe': 0,
        'herausforderungen': 0
      }
    });
  },

  save: (stats: UserStats): void => {
    safeLocalStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
  },

  update: (updates: Partial<UserStats>): UserStats => {
    const current = userStatsStorage.get();
    const updated = { ...current, ...updates };
    userStatsStorage.save(updated);
    return updated;
  }
};

/**
 * Aktivitäten verwalten
 */
export const activitiesStorage = {
  get: (): WellnessActivity[] => {
    const stored = safeLocalStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return safeJSONParse(stored, []);
  },

  add: (activity: Omit<WellnessActivity, 'id' | 'timestamp'>): WellnessActivity => {
    const activities = activitiesStorage.get();
    const newActivity: WellnessActivity = {
      ...activity,
      id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };
    
    activities.unshift(newActivity); // Neueste zuerst
    
    // Nur die letzten 1000 Aktivitäten behalten
    if (activities.length > 1000) {
      activities.splice(1000);
    }
    
    safeLocalStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    return newActivity;
  },
  getByModule: (moduleId: string): WellnessActivity[] => {
    return activitiesStorage.get().filter(activity => activity.moduleId === moduleId);
  },

  getByDateRange: (startDate: Date, endDate: Date): WellnessActivity[] => {
    const activities = activitiesStorage.get();
    return activities.filter(activity => {
      const activityDate = new Date(activity.timestamp);
      return activityDate >= startDate && activityDate <= endDate;
    });
  },

  getTodaysActivities: (): WellnessActivity[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return activitiesStorage.getByDateRange(today, tomorrow);
  }
};

/**
 * Erfolge verwalten
 */
export const achievementsStorage = {
  get: (): Achievement[] => {
    const stored = safeLocalStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return safeJSONParse(stored, []);
  },

  unlock: (achievement: Achievement): void => {
    const achievements = achievementsStorage.get();
    const existing = achievements.find(a => a.id === achievement.id);
    
    if (!existing) {
      const newAchievement = {
        ...achievement,
        unlockedAt: new Date()
      };
      achievements.push(newAchievement);
      safeLocalStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
      
      // Achievement-Notification erstellen
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('achievementUnlocked', {
          detail: newAchievement
        }));
      }
    }
  },

  isUnlocked: (achievementId: string): boolean => {
    const achievements = achievementsStorage.get();
    return achievements.some(a => a.id === achievementId);
  }
};

/**
 * Tägliche Herausforderungen verwalten
 */
export const dailyChallengesStorage = {
  get: (): DailyChallenge[] => {
    const stored = safeLocalStorage.getItem(STORAGE_KEYS.DAILY_CHALLENGES);
    return safeJSONParse(stored, []);
  },

  save: (challenges: DailyChallenge[]): void => {
    safeLocalStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGES, JSON.stringify(challenges));
  },

  complete: (challengeId: string): void => {
    const challenges = dailyChallengesStorage.get();
    const challenge = challenges.find(c => c.id === challengeId);
    
    if (challenge && !challenge.completed) {
      challenge.completed = true;
      challenge.completedAt = new Date();
      dailyChallengesStorage.save(challenges);
      
      // XP und Punkte hinzufügen
      const currentStats = userStatsStorage.get();
      userStatsStorage.update({
        totalPoints: currentStats.totalPoints + challenge.xpReward
      });
    }
  }
};

/**
 * Stimmungseinträge verwalten
 */
export interface MoodEntry {
  id: string;
  date: Date;
  mood: number; // 1-10 Skala
  notes?: string;
  module?: string;
  beforeActivity?: number;
  afterActivity?: number;
}

export const moodStorage = {
  get: (): MoodEntry[] => {
    const stored = safeLocalStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES);
    return safeJSONParse(stored, []);
  },

  add: (mood: Omit<MoodEntry, 'id'>): MoodEntry => {
    const entries = moodStorage.get();
    const newEntry: MoodEntry = {
      ...mood,
      id: `mood-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date(mood.date)
    };
    
    entries.unshift(newEntry);
    
    // Nur die letzten 365 Einträge behalten (ein Jahr)
    if (entries.length > 365) {
      entries.splice(365);
    }
    
    safeLocalStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(entries));
    return newEntry;
  },

  getAverageMood: (days: number = 7): number => {
    const entries = moodStorage.get();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const recentEntries = entries.filter(entry => 
      new Date(entry.date) >= cutoffDate
    );
    
    if (recentEntries.length === 0) return 0;
    
    const sum = recentEntries.reduce((acc, entry) => acc + entry.mood, 0);
    return Math.round((sum / recentEntries.length) * 10) / 10;
  }
};

/**
 * Session-Verlauf verwalten
 */
export interface SessionEntry {
  id: string;
  module: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in Minuten
  completed: boolean;
  moodBefore?: number;
  moodAfter?: number;
  notes?: string;
}

export const sessionStorage = {
  get: (): SessionEntry[] => {
    const stored = safeLocalStorage.getItem(STORAGE_KEYS.SESSION_HISTORY);
    return safeJSONParse(stored, []);
  },

  add: (session: Omit<SessionEntry, 'id'>): SessionEntry => {
    const sessions = sessionStorage.get();
    const newSession: SessionEntry = {
      ...session,
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      startTime: new Date(session.startTime),
      endTime: new Date(session.endTime)
    };
    
    sessions.unshift(newSession);
    
    // Nur die letzten 500 Sessions behalten
    if (sessions.length > 500) {
      sessions.splice(500);
    }
    
    safeLocalStorage.setItem(STORAGE_KEYS.SESSION_HISTORY, JSON.stringify(sessions));
    return newSession;
  },

  getTotalDuration: (module?: string): number => {
    const sessions = sessionStorage.get();
    return sessions
      .filter(session => !module || session.module === module)
      .reduce((total, session) => total + session.duration, 0);
  }
};

/**
 * Einstellungen verwalten
 */
export interface WellnessSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  dailyReminders: boolean;
  reminderTime: string; // HH:MM Format
  soundEnabled: boolean;
  language: 'de' | 'en';
  privacy: {
    shareProgress: boolean;
    anonymous: boolean;
  };
  goals: {
    dailyMinutes: number;
    weeklyActivities: number;
    preferredModules: string[];
  };
}

export const settingsStorage = {
  get: (): WellnessSettings => {
    const stored = safeLocalStorage.getItem(STORAGE_KEYS.SETTINGS);
    return safeJSONParse(stored, {
      theme: 'system',
      notifications: true,
      dailyReminders: true,
      reminderTime: '09:00',
      soundEnabled: true,
      language: 'de',
      privacy: {
        shareProgress: false,
        anonymous: true
      },
      goals: {
        dailyMinutes: 20,
        weeklyActivities: 5,
        preferredModules: ['dankbarkeit', 'stille']
      }
    });
  },

  save: (settings: WellnessSettings): void => {
    safeLocalStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  update: (updates: Partial<WellnessSettings>): WellnessSettings => {
    const current = settingsStorage.get();
    const updated = { ...current, ...updates };
    settingsStorage.save(updated);
    return updated;
  }
};

/**
 * Daten exportieren
 */
export const exportData = () => {
  const data = {
    userStats: userStatsStorage.get(),
    activities: activitiesStorage.get(),
    achievements: achievementsStorage.get(),
    dailyChallenges: dailyChallengesStorage.get(),
    moodEntries: moodStorage.get(),
    sessions: sessionStorage.get(),
    settings: settingsStorage.get(),
    exportDate: new Date(),
    version: '1.0'
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wellness-data-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * Daten importieren
 */
export const importData = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        // Validierung der Datenstruktur
        if (data.userStats) userStatsStorage.save(data.userStats);
        if (data.activities) safeLocalStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(data.activities));
        if (data.achievements) safeLocalStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(data.achievements));
        if (data.settings) settingsStorage.save(data.settings);
        
        resolve(true);
      } catch {
        resolve(false);
      }
    };
    reader.readAsText(file);
  });
};
