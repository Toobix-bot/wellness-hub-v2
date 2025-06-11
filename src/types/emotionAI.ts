export interface EmotionData {
  timestamp: number;
  emotions: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    surprise: number;
    disgust: number;
    neutral: number;
    contempt: number;
  };
  confidence: number;
  dominantEmotion: string;
}

export interface FacialEmotionAnalysis {
  faceDetected: boolean;
  emotions: EmotionData['emotions'];
  facialLandmarks: {
    eyebrows: number;
    eyes: number;
    nose: number;
    mouth: number;
    jawline: number;
  };
  microExpressions: {
    detected: boolean;
    type: string;
    intensity: number;
  }[];
  confidence: number;
}

export interface VoiceEmotionAnalysis {
  audioDetected: boolean;
  emotions: EmotionData['emotions'];
  voiceCharacteristics: {
    pitch: number;
    energy: number;
    tempo: number;
    tone: string;
    clarity: number;
  };
  stressLevel: number;
  confidenceScore: number;
}

export interface EmotionPattern {
  id: string;
  userId: string;
  timeRange: {
    start: Date;
    end: Date;
  };
  patterns: {
    dominantEmotions: string[];
    emotionalStability: number;
    stressTriggers: string[];
    positivityTrend: number;
    recoveryTime: number;
  };
  insights: {
    summary: string;
    recommendations: string[];
    wellnessScore: number;
  };
}

export interface EmotionTrigger {
  id: string;
  type: 'activity' | 'time' | 'location' | 'person' | 'content';
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  intensity: number;
  frequency: number;
  correlatedEmotions: string[];
}

export interface EmotionBasedRecommendation {
  id: string;
  type: 'immediate' | 'short_term' | 'long_term';
  emotion: string;
  intensity: number;
  recommendations: {
    activities: string[];
    content: string[];
    breathing: boolean;
    meditation: boolean;
    movement: boolean;
    social: boolean;
  };
  urgency: 'low' | 'medium' | 'high';
  estimatedEffectiveness: number;
}

export interface BiometricCorrelation {
  emotionData: EmotionData;
  heartRate?: number;
  heartRateVariability?: number;
  skinConductance?: number;
  temperature?: number;
  oxygenSaturation?: number;
  correlationStrength: number;
  predictiveAccuracy: number;
}

export interface EmotionSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  type: 'facial' | 'voice' | 'combined';
  data: EmotionData[];
  summary: {
    dominantEmotions: string[];
    emotionalRange: number;
    stabilityScore: number;
    averageConfidence: number;
  };
  recommendations: EmotionBasedRecommendation[];
  biometricData?: BiometricCorrelation[];
}

export interface EmotionAIModel {
  id: string;
  name: string;
  type: 'facial' | 'voice' | 'multimodal';
  version: string;
  accuracy: number;
  supportedEmotions: string[];
  culturalAdaptation: boolean;
  realTimeProcessing: boolean;
  privacyLevel: 'local' | 'edge' | 'cloud';
}

export interface EmotionPrivacySettings {
  enableFacialRecognition: boolean;
  enableVoiceAnalysis: boolean;
  dataRetentionDays: number;
  shareWithTherapists: boolean;
  anonymizeData: boolean;
  localProcessingOnly: boolean;
  consentTimestamp: Date;
  gdprCompliant: boolean;
}

export interface RealTimeEmotionFeedback {
  currentEmotion: string;
  intensity: number;
  confidence: number;
  suggestions: {
    immediate: string[];
    breathing: boolean;
    posture: boolean;
    environment: boolean;
  };
  trendAnalysis: {
    improving: boolean;
    stable: boolean;
    declining: boolean;
    timeFrame: string;
  };
}

export interface EmotionTherapyIntegration {
  therapistId?: string;
  sessionNotes: string;
  emotionalGoals: string[];
  progressMetrics: {
    emotionalStability: number;
    stressReduction: number;
    positivityIncrease: number;
    selfAwareness: number;
  };
  therapistRecommendations: string[];
  nextSessionDate?: Date;
}
