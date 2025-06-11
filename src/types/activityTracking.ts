// Erweiterte Aktivitäts-Tracking Typen
export interface Activity {
  id: string;
  type: 'meditation' | 'exercise' | 'reading' | 'social' | 'creative' | 'learning' | 'nature' | 'rest';
  name: string;
  duration: number; // in Minuten
  intensity: 'low' | 'medium' | 'high';
  mood_before: number;
  mood_after: number;
  location: 'home' | 'outdoor' | 'gym' | 'work' | 'other';
  companions: 'alone' | 'family' | 'friends' | 'strangers' | 'pets';
  notes?: string;
  timestamp: string;
  weather?: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  energy_level: number; // 1-10
  tags: string[];
}

export interface ActivityPattern {
  type: string;
  averageDuration: number;
  averageMoodImprovement: number;
  preferredTime: string;
  preferredLocation: string;
  frequency: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface ActivityGoal {
  id: string;
  type: Activity['type'];
  target: {
    frequency: number; // pro Woche
    duration: number; // total Minuten pro Woche
    moodImprovement: number; // Ziel-Verbesserung
  };
  current: {
    frequency: number;
    duration: number;
    averageMoodImprovement: number;
  };
  startDate: string;
  endDate: string;
  isActive: boolean;
  rewards: {
    xp: number;
    badge: string;
    virtualWorldBonus: number;
  };
}

export interface ActivityChallenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  requirements: {
    activities: Activity['type'][];
    minDuration: number;
    minFrequency: number;
    specificConditions?: string[];
  };
  rewards: {
    xp: number;
    coins: number;
    badge: string;
    unlocks: string[];
  };
  progress: {
    current: number;
    target: number;
    isCompleted: boolean;
  };
  timeframe: {
    start: string;
    end: string;
  };
}

export interface SmartRecommendation {
  id: string;
  type: 'activity' | 'rest' | 'social' | 'learning';
  title: string;
  description: string;
  reasoning: string;
  suggestedActivity: {
    type: Activity['type'];
    duration: number;
    intensity: Activity['intensity'];
    location: Activity['location'];
  };
  confidence: number; // 0-1
  basedOn: string[]; // factors that influenced this recommendation
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface ActivityInsight {
  id: string;
  category: 'pattern' | 'correlation' | 'achievement' | 'warning' | 'tip';
  title: string;
  description: string;
  data: any;
  actionable: boolean;
  suggestions?: string[];
  scientificBacking?: {
    source: string;
    credibility: number;
    summary: string;
  };
}
