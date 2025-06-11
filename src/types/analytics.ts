// Analytics und Gamification Typen

export interface WellnessActivity {
  id: string;
  moduleId: string;
  activityName: string;
  type: string;
  timestamp: Date;
  duration: number; // in Minuten
  pointsEarned: number;
  mood_before?: number; // 1-10
  mood_after?: number; // 1-10
  moodBefore?: number; // Alternative Benennung für Kompatibilität
  moodAfter?: number; // Alternative Benennung für Kompatibilität
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'milestone' | 'exploration' | 'mastery' | 'social';
  requirement: {
    type: 'activity_count' | 'streak_days' | 'module_completion' | 'mood_improvement';
    value: number;
    timeframe?: 'daily' | 'weekly' | 'monthly' | 'all_time';
  };
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

export interface UserStats {
  totalActivities: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  totalPoints: number;
  averageMoodImprovement: number;
  favoriteModule: string;
  achievements: Achievement[];
  weeklyActivity: { [key: string]: number }; // day -> activity count
  monthlyProgress: { [key: string]: number }; // module -> completion %
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  moduleId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  xpReward: number;
  requirement: string;
  completed: boolean;
  completedAt?: Date;
  deadline: Date;
}

export interface WellnessInsight {
  id: string;
  type: 'pattern' | 'recommendation' | 'milestone' | 'encouragement';
  title: string;
  message: string;
  data?: any;
  priority: 'low' | 'medium' | 'high';
  generatedAt: Date;
  seen: boolean;
}
