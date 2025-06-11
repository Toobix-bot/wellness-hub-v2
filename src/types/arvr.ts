// AR/VR Wellness Experiences Typen
export interface VREnvironment {
  id: string;
  name: string;
  description: string;
  type: 'meditation_room' | 'nature_scene' | 'cosmic_space' | 'underwater' | 'forest' | 'mountain';
  thumbnail: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  features: VRFeature[];
  audioTracks: AudioTrack[];
  customization: EnvironmentCustomization;
  biometricIntegration: boolean;
  socialFeatures: boolean;
}

export interface VRFeature {
  name: string;
  description: string;
  type: 'guided_meditation' | 'breathing_exercise' | 'visualization' | 'ambient_sounds' | 'interactive_elements';
  isActive: boolean;
}

export interface AudioTrack {
  id: string;
  name: string;
  type: 'guided' | 'ambient' | 'nature' | 'music' | 'binaural';
  duration: number;
  url: string;
  frequency?: number; // for binaural beats
}

export interface EnvironmentCustomization {
  timeOfDay: 'dawn' | 'morning' | 'noon' | 'sunset' | 'night';
  weather: 'clear' | 'cloudy' | 'rainy' | 'snowy' | 'misty';
  ambientIntensity: number; // 0-100
  interactionLevel: 'passive' | 'interactive' | 'full_control';
}

export interface ARExperience {
  id: string;
  name: string;
  description: string;
  type: 'breathing_guide' | 'chakra_visualization' | 'gratitude_garden' | 'mood_bubble' | 'wellness_pet';
  requiresCamera: boolean;
  requiresMotion: boolean;
  duration: number;
  instructions: string[];
  benefits: string[];
}

export interface VRSession {
  id: string;
  userId: string;
  environmentId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  heartRateData?: number[];
  stressLevel?: number;
  immersionLevel: number; // 1-10
  effectiveness: number; // 1-10
  notes?: string;
  achievements: string[];
}

export interface HapticFeedback {
  pattern: 'gentle_pulse' | 'breathing_rhythm' | 'heart_beat' | 'wave_motion' | 'energy_flow';
  intensity: number; // 0-100
  duration: number;
  triggers: HapticTrigger[];
}

export interface HapticTrigger {
  event: 'breath_in' | 'breath_out' | 'meditation_transition' | 'achievement_unlock' | 'stress_alert';
  delay: number;
  feedback: HapticFeedback;
}

export interface SpatialAudio {
  type: '3d_positioned' | 'binaural' | 'ambisonic';
  sources: AudioSource[];
  environment: AudioEnvironment;
}

export interface AudioSource {
  id: string;
  position: Vector3D;
  volume: number;
  frequency: number;
  type: 'nature' | 'voice' | 'music' | 'effects';
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface AudioEnvironment {
  roomSize: 'small' | 'medium' | 'large' | 'infinite';
  reverberation: number; // 0-100
  ambientNoise: number; // 0-100
}

export interface VRMetrics {
  totalSessions: number;
  totalDuration: number; // in minutes
  favoriteEnvironments: string[];
  averageEffectiveness: number;
  stressReduction: number; // percentage
  heartRateVariability: HRVData[];
  achievements: VRAchievement[];
}

export interface HRVData {
  timestamp: Date;
  value: number;
  session: string;
}

export interface VRAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  requirements: AchievementRequirement[];
}

export interface AchievementRequirement {
  type: 'session_count' | 'total_duration' | 'stress_reduction' | 'consistency' | 'environment_mastery';
  target: number;
  description: string;
}

export interface VRCompatibility {
  device: VRDevice;
  features: DeviceFeature[];
  performance: PerformanceMetrics;
}

export interface VRDevice {
  name: string;
  type: 'standalone' | 'pc_connected' | 'mobile' | 'ar_capable';
  resolution: string;
  refreshRate: number;
  trackingCapabilities: TrackingCapability[];
}

export interface TrackingCapability {
  type: 'head_tracking' | 'eye_tracking' | 'hand_tracking' | 'body_tracking' | 'facial_tracking';
  accuracy: number; // 0-100
  latency: number; // in milliseconds
}

export interface DeviceFeature {
  name: string;
  supported: boolean;
  quality: 'low' | 'medium' | 'high' | 'ultra';
}

export interface PerformanceMetrics {
  frameRate: number;
  latency: number;
  batteryLife: number; // in hours
  thermalPerformance: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface ImmersiveStoryline {
  id: string;
  title: string;
  description: string;
  chapters: StoryChapter[];
  totalDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  theme: 'mindfulness' | 'self_discovery' | 'healing' | 'transformation' | 'gratitude';
  narrator: string;
  language: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  duration: number;
  environment: string;
  objectives: ChapterObjective[];
  interactions: InteractiveElement[];
  transitions: Transition[];
}

export interface ChapterObjective {
  id: string;
  description: string;
  type: 'meditation' | 'visualization' | 'breathing' | 'reflection' | 'movement';
  isCompleted: boolean;
  progress: number;
}

export interface InteractiveElement {
  id: string;
  type: 'touch_point' | 'gaze_target' | 'gesture_trigger' | 'voice_command' | 'biometric_response';
  position: Vector3D;
  action: ElementAction;
  feedback: InteractionFeedback;
}

export interface ElementAction {
  type: 'play_sound' | 'change_environment' | 'trigger_haptic' | 'show_text' | 'record_data';
  parameters: { [key: string]: any };
}

export interface InteractionFeedback {
  visual: VisualFeedback;
  audio: AudioFeedback;
  haptic?: HapticFeedback;
}

export interface VisualFeedback {
  type: 'particle_effect' | 'color_change' | 'size_change' | 'opacity_change' | 'animation';
  duration: number;
  intensity: number;
}

export interface AudioFeedback {
  type: 'chime' | 'nature_sound' | 'voice_guidance' | 'musical_note';
  volume: number;
  pitch?: number;
}

export interface Transition {
  from: string;
  to: string;
  type: 'fade' | 'slide' | 'morph' | 'portal' | 'teleport';
  duration: number;
  trigger: TransitionTrigger;
}

export interface TransitionTrigger {
  type: 'time_based' | 'objective_completed' | 'user_input' | 'biometric_threshold' | 'gaze_duration';
  value?: any;
}

// Erweiterte XR (Extended Reality) Integration
export interface XRCapabilities {
  vr: boolean;
  ar: boolean;
  mr: boolean; // Mixed Reality
  webXR: boolean;
  handTracking: boolean;
  eyeTracking: boolean;
  spatialMapping: boolean;
}

export interface XRSession {
  type: 'vr' | 'ar' | 'mr';
  environment: VREnvironment | ARExperience;
  startTime: Date;
  isActive: boolean;
  metrics: SessionMetrics;
}

export interface SessionMetrics {
  heartRate: number[];
  stressLevel: number[];
  focusLevel: number[];
  movementData: MovementData[];
  gazeData: GazeData[];
}

export interface MovementData {
  timestamp: Date;
  headPosition: Vector3D;
  handPositions: { left: Vector3D; right: Vector3D };
  bodyPosture: 'sitting' | 'standing' | 'lying' | 'walking';
}

export interface GazeData {
  timestamp: Date;
  target: string;
  duration: number;
  fixationQuality: number; // 0-100
}
