import { Achievement, DailyChallenge, UserStats, WellnessActivity } from '@/types/analytics';

// Achievement-Definitionen
export const achievements: Achievement[] = [
  // Streak Achievements
  {
    id: 'first_step',
    title: 'Erste Schritte',
    description: 'Deine erste Wellness-Aktivität abgeschlossen',
    icon: '🌱',
    category: 'milestone',
    requirement: { type: 'activity_count', value: 1 },
    points: 10,
    rarity: 'common'
  },
  {
    id: 'streak_3',
    title: 'Auf dem Weg',
    description: '3 Tage in Folge aktiv',
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak_days', value: 3 },
    points: 25,
    rarity: 'common'
  },
  {
    id: 'streak_7',
    title: 'Woche der Wellness',
    description: '7 Tage in Folge aktiv',
    icon: '⭐',
    category: 'streak',
    requirement: { type: 'streak_days', value: 7 },
    points: 50,
    rarity: 'rare'
  },
  {
    id: 'streak_30',
    title: 'Wellness-Krieger',
    description: '30 Tage in Folge aktiv',
    icon: '👑',
    category: 'streak',
    requirement: { type: 'streak_days', value: 30 },
    points: 200,
    rarity: 'epic'
  },
  {
    id: 'mood_master',
    title: 'Stimmungs-Meister',
    description: 'Durchschnittlich +3 Punkte Stimmungsverbesserung',
    icon: '😊',
    category: 'mastery',
    requirement: { type: 'mood_improvement', value: 3 },
    points: 75,
    rarity: 'rare'
  },
  {
    id: 'explorer',
    title: 'Wellness-Entdecker',
    description: 'Alle 8 Module ausprobiert',
    icon: '🗺️',
    category: 'exploration',
    requirement: { type: 'module_completion', value: 8 },
    points: 100,
    rarity: 'epic'
  },
  {
    id: 'centurion',
    title: 'Wellness-Zenturio',
    description: '100 Aktivitäten abgeschlossen',
    icon: '💎',
    category: 'milestone',
    requirement: { type: 'activity_count', value: 100 },
    points: 300,
    rarity: 'legendary'
  }
];

// Tägliche Challenges generieren
export const generateDailyChallenges = (): DailyChallenge[] => {
  const challenges = [
    {
      id: 'gratitude_easy',
      title: 'Dankbarkeits-Moment',
      description: 'Schreibe 3 Dinge auf, für die du heute dankbar bist',
      icon: '🙏',
      moduleId: 'dankbarkeit',
      difficulty: 'easy' as const,
      points: 10,
      requirement: 'Dankbarkeit hinzufügen'
    },
    {
      id: 'meditation_medium',
      title: 'Innere Ruhe',
      description: 'Meditiere 10 Minuten oder länger',
      icon: '🧘',
      moduleId: 'stille',
      difficulty: 'medium' as const,
      points: 20,
      requirement: '10+ Min Meditation'
    },
    {
      id: 'joy_easy',
      title: 'Freude teilen',
      description: 'Führe eine Freude-Aktivität durch',
      icon: '😊',
      moduleId: 'freude',
      difficulty: 'easy' as const,
      points: 15,
      requirement: 'Freude-Aktivität'
    },
    {
      id: 'challenge_hard',
      title: 'Herausforderung meistern',
      description: 'Nutze ein Tool bei einer aktuellen Herausforderung',
      icon: '💪',
      moduleId: 'herausforderungen',
      difficulty: 'hard' as const,
      points: 30,
      requirement: 'Challenge-Tool anwenden'
    },
    {
      id: 'love_medium',
      title: 'Selbstliebe praktizieren',
      description: 'Führe eine Selbstliebe-Übung durch',
      icon: '💖',
      moduleId: 'liebe',
      difficulty: 'medium' as const,
      points: 25,
      requirement: 'Selbstliebe-Übung'
    }
  ];

  // Wähle 3 zufällige Challenges für heute
  const selectedChallenges = challenges
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(challenge => ({
      ...challenge,
      completed: false,
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 Stunden
    }));

  return selectedChallenges;
};

// Level-System
export const calculateLevel = (totalPoints: number): number => {
  // Exponentielles Level-System: Level = sqrt(points / 50)
  return Math.floor(Math.sqrt(totalPoints / 50)) + 1;
};

export const getPointsForNextLevel = (currentPoints: number): number => {
  const currentLevel = calculateLevel(currentPoints);
  const nextLevelPoints = Math.pow(currentLevel, 2) * 50;
  return nextLevelPoints - currentPoints;
};

// Achievement Check
export const checkAchievements = (
  userStats: UserStats, 
  recentActivity?: WellnessActivity
): Achievement[] => {
  const unlockedAchievements: Achievement[] = [];
  
  for (const achievement of achievements) {
    // Skip if already unlocked
    if (userStats.achievements.some(a => a.id === achievement.id)) continue;
    
    let isUnlocked = false;
    
    switch (achievement.requirement.type) {
      case 'activity_count':
        isUnlocked = userStats.totalActivities >= achievement.requirement.value;
        break;
      case 'streak_days':
        isUnlocked = userStats.currentStreak >= achievement.requirement.value;
        break;
      case 'mood_improvement':
        isUnlocked = userStats.averageMoodImprovement >= achievement.requirement.value;
        break;
      case 'module_completion':
        // Check if user has tried all modules (simplified)
        isUnlocked = Object.keys(userStats.monthlyProgress).length >= achievement.requirement.value;
        break;
    }
    
    if (isUnlocked) {
      unlockedAchievements.push({
        ...achievement,
        unlockedAt: new Date()
      });
    }
  }
  
  return unlockedAchievements;
};

// Wellness Score Berechnung
export const calculateWellnessScore = (userStats: UserStats): number => {
  const {
    totalActivities,
    currentStreak,
    averageMoodImprovement,
    totalPoints
  } = userStats;
  
  // Gewichtete Formel für Wellness Score (0-100)
  const activityScore = Math.min(totalActivities * 2, 30); // Max 30 Punkte
  const streakScore = Math.min(currentStreak * 5, 25); // Max 25 Punkte
  const moodScore = Math.min(averageMoodImprovement * 5, 25); // Max 25 Punkte
  const achievementScore = Math.min(totalPoints / 10, 20); // Max 20 Punkte
  
  return Math.round(activityScore + streakScore + moodScore + achievementScore);
};

// Rarity Colors
export const getRarityColor = (rarity: string): string => {
  const colors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500'
  };
  return colors[rarity as keyof typeof colors] || colors.common;
};

// Motivational Messages
export const getMotivationalMessage = (userStats: UserStats): string => {
  const { currentStreak, totalActivities, level } = userStats;
  
  if (currentStreak === 0) {
    return "Heute ist ein perfekter Tag für einen Neuanfang! 🌟";
  } else if (currentStreak < 3) {
    return `${currentStreak} Tage dabei - du bist auf dem richtigen Weg! 🔥`;
  } else if (currentStreak < 7) {
    return `Wow! ${currentStreak} Tage Streak - du rockst das! ⭐`;
  } else if (currentStreak < 30) {
    return `Unglaublich! ${currentStreak} Tage in Folge - du bist ein Wellness-Champion! 👑`;
  } else {
    return `LEGENDÄR! ${currentStreak} Tage Streak - du inspirierst andere! 💎`;
  }
};
