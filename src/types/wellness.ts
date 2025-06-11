// Wellness-App Typen und Interfaces

// Thematische Kategorien für die neue Navigation
export interface WellnessCategoryConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  path: string;
  modules: string[];
  priority: number;
  features?: string[];
}

export interface WellnessModule {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  icon: string;
  category: string; // Changed to string to allow new categories
  path: string;
  color: string;
  isActive: boolean;
  features?: string[];
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: string;
  premium?: boolean;
}

export type WellnessCategory = 
  | 'therapie'
  | 'transformation' 
  | 'dankbarkeit'
  | 'freude'
  | 'stille'
  | 'fortschritt'
  | 'liebe'
  | 'herausforderungen'
  | 'mental-emotional'
  | 'growth-transformation'
  | 'relationships-community'
  | 'creativity-expression'
  | 'lifestyle-wellness'
  | 'tools-systems'
  | 'advanced-esoteric';

export interface UserProgress {
  moduleId: string;
  completedSessions: number;
  totalTime: number;
  lastAccess: Date;
  level: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface DailyReflection {
  date: Date;
  gratitude: string[];
  mood: number; // 1-10
  challenges: string[];
  progress: string[];
  reflection: string;
}

export interface TherapySession {
  id: string;
  title: string;
  duration: number;
  type: 'meditation' | 'breathing' | 'journaling' | 'exercise';
  content: string;
  audioUrl?: string;
  videoUrl?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: WellnessCategory;
  targetDate: Date;
  progress: number; // 0-100
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: Date;
}
