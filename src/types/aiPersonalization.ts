// Erweiterte KI-Personalisierung für Wellness Hub
export interface UserBehaviorPattern {
  id: string;
  userId: string;
  activityType: string;
  frequency: number; // pro Woche
  preferredTimes: string[]; // ['morning', 'afternoon', 'evening']
  averageSessionDuration: number; // in Minuten
  successRate: number; // 0-1
  emotionalStates: {
    before: EmotionalState;
    after: EmotionalState;
  };
  contexts: string[]; // ['stressed', 'energetic', 'tired', etc.]
  lastAnalyzed: Date;
}

export interface EmotionalState {
  energy: number; // 1-10
  stress: number; // 1-10
  motivation: number; // 1-10
  happiness: number; // 1-10
  focus: number; // 1-10
}

export interface PredictiveInsight {
  id: string;
  type: 'mood_prediction' | 'activity_recommendation' | 'risk_alert' | 'optimization_tip';
  title: string;
  description: string;
  confidence: number; // 0-1
  predictedOutcome: string;
  recommendedActions: string[];
  timeframe: string; // 'next_hour', 'today', 'this_week'
  scientificBasis: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  expiresAt: Date;
}

export interface PersonalizationEngine {
  analyzeUserPatterns: (userId: string) => Promise<UserBehaviorPattern[]>;
  generatePredictiveInsights: (patterns: UserBehaviorPattern[]) => Promise<PredictiveInsight[]>;
  recommendActivities: (currentState: EmotionalState, context: string[]) => Promise<WellnessRecommendation[]>;
  optimizeSchedule: (userId: string) => Promise<OptimizedSchedule>;
  detectRiskFactors: (patterns: UserBehaviorPattern[]) => Promise<RiskAlert[]>;
}

export interface WellnessRecommendation {
  moduleId: string;
  activityType: string;
  title: string;
  description: string;
  estimatedDuration: number; // Minuten
  difficulty: 'easy' | 'medium' | 'hard';
  predictedImpact: {
    energy: number;
    stress: number;
    motivation: number;
    happiness: number;
  };
  confidence: number; // 0-1
  reasoningChain: string[];
  scientificEvidence: StudyReference[];
  personalizedTips: string[];
  optimalTiming: string[];
}

export interface OptimizedSchedule {
  userId: string;
  dailySchedules: DailyOptimization[];
  weeklyGoals: WeeklyGoal[];
  adaptiveRecommendations: AdaptiveRecommendation[];
  generatedAt: Date;
}

export interface DailyOptimization {
  date: Date;
  timeSlots: TimeSlot[];
  energyPrediction: number[];
  stressPrediction: number[];
  recommendedBreaks: BreakRecommendation[];
  priorityActivities: string[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  recommendedActivity: string;
  moduleId: string;
  reasoning: string;
  alternatives: string[];
}

export interface RiskAlert {
  id: string;
  type: 'burnout_risk' | 'motivation_decline' | 'stress_accumulation' | 'activity_avoidance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  indicators: string[];
  recommendedActions: string[];
  professionalHelpSuggested: boolean;
  preventiveStrategies: string[];
  timeframe: string;
}

export interface StudyReference {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  relevanceScore: number;
  keyFindings: string[];
}

export interface MachineLearningModel {
  modelType: 'mood_prediction' | 'activity_effectiveness' | 'schedule_optimization' | 'risk_detection';
  version: string;
  accuracy: number;
  lastTrained: Date;
  trainingDataSize: number;
  features: string[];
  hyperparameters: Record<string, any>;
}

export interface AdaptiveRecommendation {
  id: string;
  type: 'activity_modification' | 'schedule_adjustment' | 'goal_refinement' | 'intervention';
  title: string;
  description: string;
  reason: string;
  expectedImpact: string;
  implementation: string[];
  successMetrics: string[];
  fallbackOptions: string[];
}

export interface WeeklyGoal {
  id: string;
  category: string;
  target: string;
  progress: number; // 0-1
  adaptiveAdjustments: string[];
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  deadline: Date;
  completed: boolean;
  reward: string;
}

export interface BreakRecommendation {
  time: string;
  duration: number; // Minuten
  type: 'micro_break' | 'active_break' | 'mindful_break' | 'social_break';
  activities: string[];
  reasoning: string;
}

// Context-Aware Recommendations
export interface ContextualFactor {
  type: 'weather' | 'time_of_day' | 'day_of_week' | 'season' | 'social_context' | 'location';
  value: string;
  impact: number; // -1 to 1
  confidence: number; // 0-1
}

export interface SmartNotification {
  id: string;
  userId: string;
  type: 'reminder' | 'insight' | 'encouragement' | 'warning' | 'celebration';
  title: string;
  message: string;
  actionButtons: NotificationAction[];
  scheduledFor: Date;
  priority: number; // 1-10
  personalizationFactors: string[];
  deliveryChannel: 'push' | 'in_app' | 'email';
  expectedEngagement: number; // 0-1
}

export interface NotificationAction {
  id: string;
  label: string;
  action: string;
  deepLink?: string;
}

// Advanced Analytics Types
export interface WellnessMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'improving' | 'stable' | 'declining';
  trendConfidence: number;
  benchmarks: {
    personal: number;
    peer_group: number;
    optimal: number;
  };
  factors: InfluencingFactor[];
}

export interface InfluencingFactor {
  factor: string;
  correlation: number; // -1 to 1
  significance: number; // 0-1
  actionable: boolean;
  suggestions: string[];
}

// Real-time Adaptation
export interface AdaptationTrigger {
  id: string;
  condition: string;
  threshold: number;
  action: string;
  parameters: Record<string, any>;
  priority: number;
  active: boolean;
}

export interface DynamicContent {
  id: string;
  contentType: 'meditation_script' | 'affirmation' | 'exercise_routine' | 'journal_prompt';
  generatedContent: string;
  personalizationFactors: string[];
  effectivenessScore: number;
  userFeedback: number;
  variants: string[];
}

// Biometric Integration Types
export interface BiometricData {
  id: string;
  userId: string;
  timestamp: Date;
  heartRate?: number;
  heartRateVariability?: number;
  sleepQuality?: number;
  steps?: number;
  activeMinutes?: number;
  stressLevel?: number; // from wearable
  bloodOxygen?: number;
  skinTemperature?: number;
  source: 'apple_watch' | 'fitbit' | 'garmin' | 'manual_entry';
}

export interface BiometricInsight {
  metric: string;
  current: number;
  average: number;
  optimal: number;
  trend: 'improving' | 'stable' | 'concerning';
  recommendations: string[];
  correlations: string[];
}
