// Tagebuch-System Typen
export interface JournalEntry {
  id: string;
  date: string;
  title?: string;
  content: string;
  mood: number; // 1-10
  emotions: string[];
  tags: string[];
  privacy: 'private' | 'anonymous' | 'public';
  attachments?: {
    type: 'image' | 'audio' | 'mood-board';
    data: string;
  }[];
  reflectionPrompts?: {
    question: string;
    answer: string;
  }[];
  worldImpact: {
    virtualWorld: 'garden' | 'forest' | 'ocean' | 'mountains';
    growthPoints: number;
    elementsUnlocked: string[];
  };
}

export interface JournalStats {
  totalEntries: number;
  streakDays: number;
  averageMood: number;
  mostUsedEmotions: string[];
  worldGrowthLevel: number;
  unlockedElements: string[];
}

export interface PhilosophicalPerspective {
  id: string;
  culture: string;
  tradition: string;
  concept: 'good_evil' | 'heaven_hell' | 'balance' | 'duality';
  title: string;
  description: string;
  teachings: string[];
  practices: string[];
  avatar: string;
  color: string;
}

export interface InnerBattleChallenge {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  opponent: {
    name: string;
    avatar: string;
    weaknesses: string[];
    strengths: string[];
  };
  weapons: {
    name: string;
    type: 'mindfulness' | 'gratitude' | 'wisdom' | 'love';
    power: number;
    description: string;
  }[];
  rewards: {
    xp: number;
    insight: string;
    unlockedContent: string[];
  };
}

export interface CulturalWisdom {
  id: string;
  culture: string;
  category: 'philosophy' | 'spirituality' | 'daily_life' | 'society';
  title: string;
  originalText?: string;
  translation: string;
  context: string;
  modernApplication: string;
  practices: string[];
  aiAvatar: {
    name: string;
    personality: string;
    appearance: string;
  };
}
