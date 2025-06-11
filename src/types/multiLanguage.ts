export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  enabled: boolean;
}

export interface Translation {
  key: string;
  translations: Record<string, string>;
  context?: string;
  category: TranslationCategory;
}

export type TranslationCategory = 
  | 'ui'
  | 'wellness'
  | 'meditation'
  | 'therapy'
  | 'coaching'
  | 'community'
  | 'achievements'
  | 'notifications'
  | 'errors'
  | 'life-rpg';

export interface CulturalAdaptation {
  languageCode: string;
  culturalContext: {
    wellnessPractices: string[];
    communicationStyle: 'direct' | 'indirect' | 'high-context' | 'low-context';
    timeOrientation: 'monochronic' | 'polychronic';
    colorPreferences: string[];
    iconAdaptations: Record<string, string>;
  };
  localizedContent: {
    meditationStyles: string[];
    therapeuticApproaches: string[];
    exercisePreferences: string[];
    dietaryConsiderations: string[];
  };
  compliance: {
    dataProtection: string[];
    healthRegulations: string[];
    accessibilityStandards: string[];
  };
}

export interface AITranslationEngine {
  id: string;
  name: string;
  provider: 'openai' | 'google' | 'deepl' | 'azure' | 'custom';
  supportedLanguages: string[];
  accuracy: number;
  culturalAwareness: number;
  wellnessSpecialization: number;
  realTimeCapability: boolean;
  offlineCapability: boolean;
}

export interface LocalizationRequest {
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
  context: string;
  category: TranslationCategory;
  priority: 'low' | 'medium' | 'high' | 'critical';
  culturalAdaptation: boolean;
}

export interface LocalizationResponse {
  translatedText: string;
  confidence: number;
  alternatives: string[];
  culturalNotes: string[];
  qualityScore: number;
  processingTime: number;
  cached: boolean;
}

export interface VoiceLocalization {
  languageCode: string;
  voiceId: string;
  voiceName: string;
  gender: 'male' | 'female' | 'neutral';
  age: 'child' | 'young' | 'adult' | 'senior';
  accent: string;
  emotionalRange: number;
  naturalness: number;
  available: boolean;
}

export interface RegionalCustomization {
  region: string;
  languageCode: string;
  preferences: {
    dateFormat: string;
    timeFormat: string;
    numberFormat: string;
    currencyFormat: string;
    measurementUnits: 'metric' | 'imperial';
    weekStartDay: number;
  };
  localizedAssets: {
    images: Record<string, string>;
    videos: Record<string, string>;
    audio: Record<string, string>;
  };
  legalCompliance: {
    consentForms: string[];
    privacyPolicies: string[];
    termsOfService: string[];
  };
}

export interface MultiLanguageSession {
  id: string;
  userId: string;
  primaryLanguage: string;
  secondaryLanguages: string[];
  autoTranslate: boolean;
  culturalAdaptation: boolean;
  voicePreferences: VoiceLocalization[];
  translationQuality: 'fast' | 'balanced' | 'accurate';
  offlineMode: boolean;
  lastUpdated: Date;
}

export interface LanguageAnalytics {
  usage: {
    languageCode: string;
    sessionCount: number;
    duration: number;
    userCount: number;
    engagement: number;
  }[];
  translationMetrics: {
    requestCount: number;
    successRate: number;
    averageQuality: number;
    userSatisfaction: number;
  };
  culturalInsights: {
    preferredContent: Record<string, string[]>;
    engagementPatterns: Record<string, number>;
    dropoffPoints: Record<string, string[]>;
  };
}

export interface AIContentLocalization {
  originalContent: {
    type: 'meditation' | 'affirmation' | 'therapy-session' | 'coaching';
    content: string;
    metadata: Record<string, any>;
  };
  localizedVersions: {
    languageCode: string;
    content: string;
    culturalAdaptations: string[];
    qualityScore: number;
    reviewStatus: 'pending' | 'approved' | 'rejected';
  }[];
  globalMetadata: {
    originalLanguage: string;
    creationDate: Date;
    lastUpdated: Date;
    translationProvider: string;
  };
}

export interface LanguagePreferences {
  userId: string;
  primaryLanguage: string;
  fallbackLanguages: string[];
  autoDetectLanguage: boolean;
  translateUserContent: boolean;
  voiceLanguage: string;
  textToSpeechEnabled: boolean;
  speechToTextEnabled: boolean;
  culturalAdaptationLevel: 'minimal' | 'moderate' | 'full';
  qualityPreference: 'speed' | 'balance' | 'accuracy';
}

export interface CommunityTranslation {
  messageId: string;
  originalText: string;
  originalLanguage: string;
  translations: {
    languageCode: string;
    translatedText: string;
    confidence: number;
    communityVerified: boolean;
    votes: number;
  }[];
  translationRequests: {
    languageCode: string;
    requestCount: number;
    priority: number;
  }[];
}

export interface LanguageLearningIntegration {
  userId: string;
  targetLanguage: string;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'native';
  learningGoals: string[];
  practicePreferences: {
    vocabulary: boolean;
    pronunciation: boolean;
    grammar: boolean;
    culturalContext: boolean;
  };
  progressTracking: {
    wordsLearned: number;
    correctPronunciations: number;
    culturalInsights: number;
    lastPracticeDate: Date;
  };
}
