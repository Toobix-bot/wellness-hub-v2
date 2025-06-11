export interface SmartDevice {
  id: string;
  name: string;
  type: DeviceType;
  brand: string;
  model: string;
  isOnline: boolean;
  batteryLevel?: number;
  firmwareVersion: string;
  lastSeen: Date;
  capabilities: DeviceCapability[];
  currentState: Record<string, any>;
  automationRules: AutomationRule[];
}

export type DeviceType = 
  | 'smart-light'
  | 'smart-speaker'
  | 'smart-display'
  | 'air-purifier'
  | 'humidifier'
  | 'aromatherapy-diffuser'
  | 'smart-mirror'
  | 'sleep-tracker'
  | 'meditation-mat'
  | 'biometric-sensor'
  | 'smart-plant'
  | 'circadian-light'
  | 'white-noise-machine'
  | 'smart-thermostat'
  | 'yoga-mat-sensor';

export type DeviceCapability = 
  | 'brightness-control'
  | 'color-control'
  | 'audio-playback'
  | 'voice-control'
  | 'air-quality-monitoring'
  | 'humidity-control'
  | 'scent-dispensing'
  | 'biometric-reading'
  | 'motion-detection'
  | 'temperature-control'
  | 'vibration-feedback'
  | 'sleep-monitoring';

export interface WellnessEnvironment {
  id: string;
  name: string;
  description: string;
  type: 'meditation' | 'sleep' | 'energize' | 'focus' | 'relax' | 'exercise';
  devices: SmartDevice[];
  settings: {
    lighting: {
      brightness: number;
      color: string;
      warmth: number;
    };
    audio: {
      volume: number;
      content: string;
      soundscape: string;
    };
    climate: {
      temperature: number;
      humidity: number;
      airQuality: number;
    };
    aromatherapy: {
      enabled: boolean;
      scent: string;
      intensity: number;
    };
  };
  triggers: EnvironmentTrigger[];
  schedule: EnvironmentSchedule[];
}

export interface EnvironmentTrigger {
  id: string;
  type: 'time' | 'biometric' | 'activity' | 'emotion' | 'manual';
  condition: Record<string, any>;
  actions: DeviceAction[];
  isActive: boolean;
}

export interface DeviceAction {
  deviceId: string;
  action: string;
  parameters: Record<string, any>;
  delay?: number;
  duration?: number;
}

export interface EnvironmentSchedule {
  id: string;
  name: string;
  days: number[];
  startTime: string;
  endTime: string;
  environmentId: string;
  isActive: boolean;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'wellness-activity' | 'emotion-change' | 'biometric-threshold' | 'time-based';
    condition: Record<string, any>;
  };
  actions: DeviceAction[];
  isEnabled: boolean;
  priority: number;
}

export interface BiometricIntegration {
  heartRate?: number;
  heartRateVariability?: number;
  stressLevel?: number;
  sleepStage?: 'awake' | 'light' | 'deep' | 'rem';
  respirationRate?: number;
  bodyTemperature?: number;
  ambientLight?: number;
  noiseLevel?: number;
}

export interface WellnessSession {
  id: string;
  type: 'meditation' | 'yoga' | 'breathing' | 'sleep' | 'focus';
  duration: number;
  startTime: Date;
  endTime?: Date;
  environment: WellnessEnvironment;
  biometricData: BiometricIntegration[];
  deviceInteractions: DeviceInteraction[];
  effectiveness: number;
  userFeedback?: {
    rating: number;
    notes: string;
  };
}

export interface DeviceInteraction {
  timestamp: Date;
  deviceId: string;
  action: string;
  parameters: Record<string, any>;
  success: boolean;
  userInitiated: boolean;
}

export interface SmartHomeAnalytics {
  environmentUsage: {
    environmentId: string;
    usageTime: number;
    activationCount: number;
    effectiveness: number;
  }[];
  devicePerformance: {
    deviceId: string;
    uptime: number;
    responseTime: number;
    errorCount: number;
  }[];
  wellnessMetrics: {
    totalSessionTime: number;
    averageSessionRating: number;
    mostUsedEnvironments: string[];
    improvementTrend: number;
  };
  energyUsage: {
    totalConsumption: number;
    costSavings: number;
    sustainabilityScore: number;
  };
}

export interface VoiceCommand {
  id: string;
  phrase: string;
  intent: string;
  parameters: Record<string, any>;
  confidence: number;
  timestamp: Date;
  deviceResponse: string;
  success: boolean;
}

export interface SmartHomeRoutine {
  id: string;
  name: string;
  description: string;
  triggers: {
    type: 'voice' | 'app' | 'schedule' | 'sensor';
    condition: Record<string, any>;
  }[];
  actions: DeviceAction[];
  conditions: {
    timeRange?: { start: string; end: string };
    days?: number[];
    weather?: string[];
    userPresence?: boolean;
  };
  isActive: boolean;
  lastExecuted?: Date;
}

export interface AirQualityData {
  pm25: number;
  pm10: number;
  co2: number;
  voc: number;
  humidity: number;
  temperature: number;
  airQualityIndex: number;
  recommendations: string[];
  timestamp: Date;
}

export interface CircadianSettings {
  wakeUpTime: string;
  bedTime: string;
  lightTherapyEnabled: boolean;
  colorTemperatureSchedule: {
    time: string;
    temperature: number;
    brightness: number;
  }[];
  sleepOptimization: {
    prerollDuration: number;
    fadeOutDuration: number;
    nightModeEnabled: boolean;
  };
}
