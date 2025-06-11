// AI-Generated Content Engine Typen
export interface AIContentEngine {
  models: AIModel[];
  contentTypes: ContentType[];
  personalization: PersonalizationProfile;
  qualityMetrics: QualityMetrics;
  ethicalGuidelines: EthicalGuidelines;
}

export interface AIModel {
  id: string;
  name: string;
  type: 'text_generation' | 'audio_synthesis' | 'image_generation' | 'music_composition' | 'voice_cloning';
  provider: 'openai' | 'anthropic' | 'elevenlabs' | 'stability' | 'custom';
  version: string;
  capabilities: ModelCapability[];
  limitations: string[];
  costPerRequest: number;
  averageResponseTime: number; // in seconds
  qualityScore: number; // 1-10
  ethicalCompliance: number; // 1-10
}

export interface ModelCapability {
  name: string;
  description: string;
  accuracy: number; // 0-100
  supportedLanguages: string[];
  maxInputLength: number;
  maxOutputLength: number;
}

export interface ContentType {
  id: string;
  name: string;
  description: string;
  category: 'meditation' | 'affirmation' | 'story' | 'music' | 'visualization' | 'exercise' | 'advice';
  aiModel: string;
  template: ContentTemplate;
  personalizationFactors: PersonalizationFactor[];
  qualityRequirements: QualityRequirement[];
  ethicalConsiderations: string[];
}

export interface ContentTemplate {
  structure: TemplateStructure[];
  variables: TemplateVariable[];
  examples: string[];
  constraints: TemplateConstraint[];
}

export interface TemplateStructure {
  section: string;
  required: boolean;
  minLength: number;
  maxLength: number;
  guidelines: string[];
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'boolean' | 'list' | 'duration';
  description: string;
  defaultValue?: any;
  possibleValues?: any[];
  validation?: ValidationRule[];
}

export interface ValidationRule {
  type: 'minLength' | 'maxLength' | 'range' | 'format' | 'required';
  value: any;
  message: string;
}

export interface TemplateConstraint {
  type: 'tone' | 'length' | 'complexity' | 'audience' | 'scientific_accuracy';
  value: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

export interface PersonalizationFactor {
  name: string;
  weight: number; // 0-1
  dataSource: 'user_profile' | 'activity_history' | 'preferences' | 'biometric' | 'mood';
  extractionMethod: string;
  influence: InfluenceMapping[];
}

export interface InfluenceMapping {
  inputValue: any;
  outputModification: string;
  confidence: number; // 0-1
}

export interface PersonalizationProfile {
  userId: string;
  preferences: UserPreferences;
  history: ContentHistory[];
  patterns: UserPattern[];
  adaptations: PersonalizationAdaptation[];
  lastUpdated: Date;
}

export interface UserPreferences {
  tone: 'gentle' | 'motivational' | 'scientific' | 'playful' | 'spiritual';
  complexity: 'simple' | 'moderate' | 'advanced';
  duration: 'short' | 'medium' | 'long' | 'flexible';
  themes: string[];
  avoidTopics: string[];
  languageStyle: 'formal' | 'casual' | 'poetic' | 'direct';
  culturalContext: string;
  accessibility: AccessibilityNeeds;
}

export interface AccessibilityNeeds {
  visualImpairment: boolean;
  hearingImpairment: boolean;
  cognitiveConsiderations: string[];
  languageLevel: 'beginner' | 'intermediate' | 'advanced' | 'native';
  readingDifficulties: boolean;
}

export interface ContentHistory {
  contentId: string;
  type: string;
  generatedAt: Date;
  userFeedback: UserFeedback;
  engagement: EngagementMetrics;
  effectiveness: EffectivenessScore;
}

export interface UserFeedback {
  rating: number; // 1-5
  helpful: boolean;
  appropriate: boolean;
  personalized: boolean;
  comments: string;
  reportedIssues: string[];
  suggestions: string[];
}

export interface EngagementMetrics {
  completionRate: number; // 0-1
  timeSpent: number; // in seconds
  interactions: number;
  shared: boolean;
  bookmarked: boolean;
  revisited: boolean;
}

export interface EffectivenessScore {
  moodImprovement: number; // -5 to +5
  stressReduction: number; // 0-100
  goalAlignment: number; // 0-100
  learningOutcome: number; // 0-100
  behaviorChange: number; // 0-100
}

export interface UserPattern {
  type: 'time_preference' | 'topic_affinity' | 'engagement_style' | 'learning_pace' | 'emotional_response';
  description: string;
  strength: number; // 0-1
  confidence: number; // 0-1
  examples: string[];
  lastObserved: Date;
}

export interface PersonalizationAdaptation {
  trigger: string;
  modification: string;
  success: boolean;
  appliedAt: Date;
  measuredImpact: number; // -1 to +1
}

export interface GeneratedContent {
  id: string;
  type: string;
  title: string;
  content: ContentBody;
  metadata: ContentMetadata;
  personalization: PersonalizationApplied;
  quality: QualityAssessment;
  ethics: EthicalAssessment;
  performance: ContentPerformance;
}

export interface ContentBody {
  text?: string;
  audioUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  interactiveElements?: InteractiveElement[];
  duration?: number;
  sections?: ContentSection[];
}

export interface ContentSection {
  title: string;
  content: string;
  type: 'introduction' | 'main' | 'guidance' | 'reflection' | 'conclusion';
  duration?: number;
  voiceNotes?: VoiceNote[];
}

export interface VoiceNote {
  text: string;
  audioUrl: string;
  speaker: 'narrator' | 'guide' | 'expert';
  emotion: 'calm' | 'encouraging' | 'informative' | 'warm';
}

export interface InteractiveElement {
  type: 'question' | 'reflection' | 'exercise' | 'choice' | 'input';
  content: string;
  options?: string[];
  validation?: ValidationRule[];
  feedback?: string;
}

export interface ContentMetadata {
  generatedAt: Date;
  aiModel: string;
  version: string;
  promptTokens: number;
  responseTokens: number;
  generationTime: number; // in seconds
  cost: number;
  language: string;
  tags: string[];
  scientificSources?: string[];
}

export interface PersonalizationApplied {
  factors: string[];
  modifications: PersonalizationModification[];
  confidence: number; // 0-1
  fallbackUsed: boolean;
  customizations: string[];
}

export interface PersonalizationModification {
  factor: string;
  originalValue: string;
  modifiedValue: string;
  reason: string;
  impact: number; // 0-1
}

export interface QualityAssessment {
  overall: number; // 1-10
  criteria: QualityCriterion[];
  flags: QualityFlag[];
  humanReview: HumanReview | null;
  autoImprovement: AutoImprovementSuggestion[];
}

export interface QualityCriterion {
  name: string;
  score: number; // 1-10
  weight: number; // 0-1
  details: string;
  improvementSuggestion?: string;
}

export interface QualityFlag {
  type: 'grammar' | 'coherence' | 'accuracy' | 'appropriateness' | 'completeness';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  suggestion: string;
  autoFixable: boolean;
}

export interface HumanReview {
  reviewerId: string;
  score: number; // 1-10
  feedback: string;
  approved: boolean;
  improvementNotes: string[];
  reviewedAt: Date;
}

export interface AutoImprovementSuggestion {
  area: string;
  suggestion: string;
  confidence: number; // 0-1
  implementationComplexity: 'low' | 'medium' | 'high';
  expectedImprovement: number; // 0-1
}

export interface EthicalAssessment {
  overall: number; // 1-10
  guidelines: EthicalGuideline[];
  violations: EthicalViolation[];
  culturalSensitivity: CulturalSensitivityCheck;
  harmfulnessPrevention: HarmfulnessCheck;
  biasDetection: BiasDetection;
}

export interface EthicalGuideline {
  name: string;
  description: string;
  compliance: number; // 0-1
  importance: 'low' | 'medium' | 'high' | 'critical';
  checkMethod: string;
}

export interface EthicalViolation {
  guideline: string;
  severity: 'minor' | 'moderate' | 'major' | 'critical';
  description: string;
  suggestion: string;
  mustFix: boolean;
}

export interface CulturalSensitivityCheck {
  score: number; // 1-10
  considerations: string[];
  potentialIssues: string[];
  adaptations: string[];
}

export interface HarmfulnessCheck {
  harmfulnessScore: number; // 0-1, lower is better
  potentialHarms: string[];
  mitigations: string[];
  safeguards: string[];
}

export interface BiasDetection {
  overallBias: number; // 0-1, lower is better
  biasTypes: BiasType[];
  corrections: BiasCorrection[];
}

export interface BiasType {
  type: 'gender' | 'cultural' | 'age' | 'ability' | 'socioeconomic' | 'religious';
  severity: number; // 0-1
  examples: string[];
  impact: string;
}

export interface BiasCorrection {
  biasType: string;
  originalText: string;
  correctedText: string;
  explanation: string;
}

export interface ContentPerformance {
  views: number;
  completions: number;
  averageRating: number;
  shareCount: number;
  bookmarkCount: number;
  reportCount: number;
  effectivenessMetrics: PerformanceMetric[];
  userSegmentPerformance: SegmentPerformance[];
}

export interface PerformanceMetric {
  name: string;
  value: number;
  benchmark: number;
  trend: 'improving' | 'stable' | 'declining';
  significance: 'low' | 'medium' | 'high';
}

export interface SegmentPerformance {
  segment: string;
  performance: number;
  sampleSize: number;
  confidence: number;
}

export interface QualityMetrics {
  averageQualityScore: number;
  humanApprovalRate: number;
  userSatisfactionRate: number;
  flaggedContentRate: number;
  improvementTrend: number;
  benchmarkComparison: BenchmarkComparison[];
}

export interface BenchmarkComparison {
  metric: string;
  ourScore: number;
  industryBenchmark: number;
  competitorAverage: number;
  trend: 'outperforming' | 'meeting' | 'underperforming';
}

export interface EthicalGuidelines {
  principles: EthicalPrinciple[];
  prohibitions: string[];
  requirements: string[];
  reviewProcess: ReviewProcess;
  continuousImprovement: ContinuousImprovement;
}

export interface EthicalPrinciple {
  name: string;
  description: string;
  implementation: string[];
  metrics: string[];
  importance: 'fundamental' | 'important' | 'preferred';
}

export interface ReviewProcess {
  automaticChecks: string[];
  humanReviewTriggers: string[];
  escalationProcedure: string[];
  appealProcess: string[];
}

export interface ContinuousImprovement {
  feedbackLoop: string[];
  learningMechanism: string[];
  updateFrequency: string;
  stakeholderInvolvement: string[];
}

// Content Generation Request Interface
export interface ContentGenerationRequest {
  type: string;
  parameters: ContentParameters;
  personalization: PersonalizationRequest;
  quality: QualityRequirements;
  constraints: GenerationConstraints;
}

export interface ContentParameters {
  topic: string;
  duration?: number;
  complexity: 'simple' | 'moderate' | 'advanced';
  tone: string;
  format: 'text' | 'audio' | 'guided' | 'interactive';
  language: string;
  additionalRequirements: string[];
}

export interface PersonalizationRequest {
  usePersonalization: boolean;
  personalityFactors: string[];
  contextualFactors: string[];
  customInstructions?: string[];
}

export interface QualityRequirements {
  minimumScore: number;
  criticalCriteria: string[];
  humanReviewRequired: boolean;
  scientificAccuracy: boolean;
}

export interface GenerationConstraints {
  maxTokens: number;
  maxCost: number;
  maxTime: number; // in seconds
  prohibitedContent: string[];
  requiredElements: string[];
}
