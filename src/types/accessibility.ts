export interface AccessibilityProfile {
  userId: string;
  disabilities: DisabilityType[];
  preferences: AccessibilityPreferences;
  assistiveTechnologies: AssistiveTechnology[];
  customizations: UICustomizations;
  cognitiveSupportLevel: 'minimal' | 'moderate' | 'high' | 'maximum';
  lastUpdated: Date;
}

export type DisabilityType = 
  | 'visual-impairment'
  | 'blindness'
  | 'color-blindness'
  | 'hearing-impairment'
  | 'deafness'
  | 'motor-impairment'
  | 'cognitive-impairment'
  | 'autism-spectrum'
  | 'adhd'
  | 'dyslexia'
  | 'speech-impairment'
  | 'temporary-impairment';

export interface AccessibilityPreferences {
  visualPreferences: {
    highContrast: boolean;
    darkMode: boolean;
    fontSize: 'small' | 'medium' | 'large' | 'extra-large' | 'huge';
    fontFamily: 'default' | 'dyslexia-friendly' | 'high-legibility';
    lineSpacing: number;
    letterSpacing: number;
    wordSpacing: number;
    colorFilters: ColorFilter[];
    animations: 'all' | 'essential' | 'none';
    flashingContent: 'allow' | 'reduce' | 'disable';
  };
  auditoryPreferences: {
    captionsEnabled: boolean;
    captionStyle: CaptionStyle;
    audioDescriptions: boolean;
    soundEffects: boolean;
    backgroundMusic: boolean;
    voiceSpeed: number;
    voicePitch: number;
    preferredVoice: string;
    hearingAidCompatibility: boolean;
  };
  motorPreferences: {
    keyboardNavigation: boolean;
    mouseAlternatives: boolean;
    touchTargetSize: 'default' | 'large' | 'extra-large';
    dwellTime: number;
    stickyKeys: boolean;
    filterKeys: boolean;
    mouseKeys: boolean;
    voiceControl: boolean;
    eyeTracking: boolean;
  };
  cognitivePreferences: {
    simplifiedInterface: boolean;
    reducedOptions: boolean;
    consistentNavigation: boolean;
    progressIndicators: boolean;
    timeoutExtensions: boolean;
    errorPrevention: boolean;
    confirmationDialogs: boolean;
    memoryAids: boolean;
    focusIndicators: 'standard' | 'enhanced' | 'maximum';
  };
}

export type ColorFilter = 
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'achromatopsia'
  | 'blue-light-filter'
  | 'high-contrast';

export interface CaptionStyle {
  fontSize: number;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
  textOpacity: number;
  backgroundOpacity: number;
  textEdge: 'none' | 'outline' | 'drop-shadow' | 'raised' | 'depressed';
  position: 'bottom' | 'top' | 'custom';
}

export interface AssistiveTechnology {
  type: 'screen-reader' | 'voice-recognition' | 'eye-tracker' | 'switch-control' | 'brain-computer-interface';
  name: string;
  version: string;
  isActive: boolean;
  compatibility: number;
  customCommands: AssistiveCommand[];
}

export interface AssistiveCommand {
  trigger: string;
  action: string;
  description: string;
  isCustom: boolean;
}

export interface UICustomizations {
  layout: {
    compactMode: boolean;
    sidebarPosition: 'left' | 'right' | 'hidden';
    navigationStyle: 'horizontal' | 'vertical' | 'minimal';
    widgetArrangement: string[];
  };
  interaction: {
    clickDelay: number;
    hoverDelay: number;
    dragSensitivity: number;
    scrollSpeed: number;
    keyboardShortcuts: Record<string, string>;
  };
  feedback: {
    visualFeedback: boolean;
    auditoreFeedback: boolean;
    hapticFeedback: boolean;
    confirmationSounds: boolean;
    errorSounds: boolean;
    successSounds: boolean;
  };
}

export interface AccessibilityFeature {
  id: string;
  name: string;
  description: string;
  category: 'visual' | 'auditory' | 'motor' | 'cognitive' | 'universal';
  isEnabled: boolean;
  supportedDisabilities: DisabilityType[];
  implementation: FeatureImplementation;
}

export interface FeatureImplementation {
  cssClass?: string;
  ariaAttributes?: Record<string, string>;
  keyboardBindings?: Record<string, string>;
  voiceCommands?: string[];
  gestureSupport?: boolean;
  aiEnhanced?: boolean;
}

export interface AccessibilityAudit {
  id: string;
  timestamp: Date;
  wcagLevel: 'A' | 'AA' | 'AAA';
  compliance: {
    perceivable: number;
    operable: number;
    understandable: number;
    robust: number;
    overall: number;
  };
  issues: AccessibilityIssue[];
  recommendations: string[];
  autoFixable: AccessibilityIssue[];
}

export interface AccessibilityIssue {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  wcagCriterion: string;
  description: string;
  element: string;
  location: string;
  suggestedFix: string;
  canAutoFix: boolean;
}

export interface CognitiveSupport {
  memoryAids: {
    breadcrumbs: boolean;
    recentActions: boolean;
    savedStates: boolean;
    contextHelp: boolean;
  };
  focusManagement: {
    skipLinks: boolean;
    focusTrapping: boolean;
    focusRestoration: boolean;
    logicalTabOrder: boolean;
  };
  errorPrevention: {
    inputValidation: boolean;
    confirmationDialogs: boolean;
    undoFunctionality: boolean;
    autoSave: boolean;
  };
  comprehensionAids: {
    plainLanguage: boolean;
    visualCues: boolean;
    progressIndicators: boolean;
    stepByStepGuidance: boolean;
  };
}

export interface BrainComputerInterface {
  deviceId: string;
  deviceName: string;
  isConnected: boolean;
  signalQuality: number;
  calibrationStatus: 'uncalibrated' | 'calibrating' | 'calibrated';
  supportedCommands: BCICommand[];
  userTrainingLevel: number;
  adaptiveAlgorithm: boolean;
}

export interface BCICommand {
  id: string;
  name: string;
  mentalTask: string;
  accuracy: number;
  trainingRequired: number;
  isActive: boolean;
}

export interface AccessibilityAI {
  personalizedAdaptations: boolean;
  predictiveAssistance: boolean;
  contextAwareness: boolean;
  learningCapability: boolean;
  realTimeOptimization: boolean;
  emotionalSupport: boolean;
}

export interface AccessibilityMetrics {
  usageStats: {
    featureId: string;
    usageCount: number;
    effectiveness: number;
    userSatisfaction: number;
  }[];
  performanceMetrics: {
    taskCompletionRate: number;
    averageTaskTime: number;
    errorRate: number;
    satisfactionScore: number;
  };
  complianceMetrics: {
    wcagAACompliance: number;
    wcagAAACompliance: number;
    automatedTestsPassed: number;
    userTestingScore: number;
  };
}
