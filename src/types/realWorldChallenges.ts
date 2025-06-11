/**
 * Real-World Challenges & Solutions System
 * Typen für echte Probleme, Krankheiten und positive Beiträge
 */

export interface RealWorldChallenge {
  id: string;
  category: 'mental_health' | 'physical_health' | 'social_issues' | 'environmental' | 'personal_crisis';
  title: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  prevalence: number; // Prozent der Bevölkerung betroffen
  symptoms: string[];
  riskFactors: string[];
  commonTriggers: string[];
  icon: string;
  color: string;
  
  // Wissenschaftliche Daten
  statistics: {
    globalAffected: number;
    ageGroups: { range: string; percentage: number }[];
    genderDistribution: { male: number; female: number; other: number };
    trends: { year: number; prevalence: number }[];
  };
  
  // Medizinische/Wissenschaftliche Informationen
  medicalInfo: {
    causes: string[];
    complications: string[];
    diagnosis: string[];
    conventionalTreatments: string[];
  };
}

export interface IndividualSolution {
  id: string;
  challengeId: string;
  type: 'lifestyle' | 'mindfulness' | 'nutrition' | 'exercise' | 'social' | 'professional_help';
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeCommitment: string; // z.B. "5-10 Minuten täglich"
  effectiveness: number; // 1-10 Skala basierend auf Studien
  scientificBacking: {
    studies: number; // Anzahl unterstützender Studien
    evidenceLevel: 'low' | 'moderate' | 'high' | 'very_high';
    keyFindings: string[];
    sources: string[];
  };
  
  // Praktische Umsetzung
  implementation: {
    steps: string[];
    tools: string[];
    frequency: string;
    duration: string;
    progressMetrics: string[];
  };
  
  // Erfolgsgeschichten
  successStories: {
    anonymizedCase: string;
    improvement: string;
    timeframe: string;
  }[];
  
  // Potentielle Barrieren und Lösungen
  barriers: {
    obstacle: string;
    solution: string;
  }[];
}

export interface PersonalImpactPlan {
  id: string;
  userId: string;
  challengeId: string;
  selectedSolutions: string[];
  startDate: Date;
  targetDuration: number; // Wochen
  personalGoals: string[];
  currentPhase: 'assessment' | 'planning' | 'implementation' | 'evaluation' | 'maintenance';
  
  // Fortschritt
  progress: {
    week: number;
    symptomReduction: number; // 0-100%
    qualityOfLifeImprovement: number; // 0-100%
    adherence: number; // 0-100%
    notes: string;
    challenges: string[];
    breakthroughs: string[];
  }[];
  
  // Messbare Ergebnisse
  metrics: {
    baseline: { [key: string]: number };
    current: { [key: string]: number };
    target: { [key: string]: number };
  };
}

export interface CommunityImpact {
  challengeId: string;
  totalParticipants: number;
  activeUsers: number;
  averageImprovement: number;
  successRate: number;
  communitySupport: {
    mentors: number;
    peerSupport: number;
    successStories: number;
  };
  collectiveImpact: {
    totalHoursInvested: number;
    livesImproved: number;
    costSavings: number; // Geschätzte Gesundheitskosteneinsparungen
  };
}

export interface ExpertResource {
  id: string;
  challengeId: string;
  type: 'article' | 'video' | 'podcast' | 'research' | 'professional_contact';
  title: string;
  author: string;
  credentials: string;
  content: string;
  url?: string;
  verified: boolean;
  lastUpdated: Date;
  rating: number;
  views: number;
}
