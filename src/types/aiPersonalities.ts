/**
 * KI-Persönlichkeiten System
 * Verschiedene KI-Coaches mit einzigartigen Persönlichkeiten und Spezialisierungen
 */

// Haupt-KI-Persönlichkeit Interface
export interface AIPersonality {
  id: string;
  name: string;
  title: string;
  avatar: string;
  personality: PersonalityType;
  specializations: Specialization[];
  conversationStyle: ConversationStyle;
  voiceProfile: VoiceProfile;
  backstory: string;
  quotes: string[];
  responses: ResponsePattern[];
  skills: Skill[];
  availability: AvailabilityPattern;
  trustLevel: number; // 0-100, entwickelt sich basierend auf Interaktionen
}

// Persönlichkeitstypen
export type PersonalityType = 
  | 'nurturing-healer'      // 🌸 Maya - Sanfte Heilerin
  | 'motivational-warrior'  // 💪 Rex - Motivations-Spartaner  
  | 'scientific-analyst'    // 🧬 Dr. Nova - Wissenschafts-Nerd
  | 'creative-trickster'    // 🎭 Pixel - Kreativer Schelm
  | 'spiritual-sage'        // 🕉️ Guru - Spiritueller Weise
  | 'practical-mentor'      // 🔧 Coach Sam - Praktischer Mentor
  | 'empathetic-listener'   // 👂 Luna - Empathische Zuhörerin
  | 'adventure-guide';      // 🗺️ Explorer - Abenteuer-Guide

// Spezialisierungen
export interface Specialization {
  area: SpecializationArea;
  expertise: number; // 1-100
  certifications: string[];
  experience: string;
}

export type SpecializationArea =
  | 'trauma-healing' | 'motivation' | 'scientific-method' | 'creativity'
  | 'spirituality' | 'practical-skills' | 'emotional-support' | 'adventure-therapy'
  | 'addiction-recovery' | 'relationship-counseling' | 'career-guidance' 
  | 'anxiety-management' | 'depression-support' | 'mindfulness' | 'nutrition';

// Konversationsstile
export interface ConversationStyle {
  formality: 'casual' | 'professional' | 'friendly' | 'formal';
  directness: 'direct' | 'gentle' | 'suggestive' | 'questioning';
  humor: 'playful' | 'dry' | 'none' | 'encouraging';
  empathy: 'high' | 'medium' | 'analytical';
  challengeLevel: 'supportive' | 'motivating' | 'challenging' | 'tough-love';
}

// Stimmprofil für zukünftige Sprachintegration
export interface VoiceProfile {
  tone: 'warm' | 'energetic' | 'calm' | 'authoritative' | 'playful';
  pace: 'slow' | 'medium' | 'fast' | 'variable';
  pitch: 'low' | 'medium' | 'high';
  accent: 'neutral' | 'regional' | 'international';
}

// Response-Muster für verschiedene Situationen
export interface ResponsePattern {
  trigger: TriggerType;
  conditions: string[];
  responseTemplates: string[];
  followUpActions: FollowUpAction[];
  emotionalTone: EmotionalTone;
}

export type TriggerType =
  | 'first-meeting' | 'daily-checkin' | 'crisis-mode' | 'celebration'
  | 'setback' | 'goal-setting' | 'reflection' | 'motivation-needed'
  | 'overwhelmed' | 'anxious' | 'sad' | 'angry' | 'confused' | 'excited';

export interface FollowUpAction {
  type: 'question' | 'suggestion' | 'resource' | 'exercise' | 'reminder';
  content: string;
  timing: 'immediate' | 'later-today' | 'tomorrow' | 'weekly';
}

export type EmotionalTone =
  | 'compassionate' | 'energizing' | 'calming' | 'challenging'
  | 'celebratory' | 'analytical' | 'playful' | 'serious';

// Fähigkeiten des KI-Coaches
export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  effectiveness: number; // 1-100
  unlockConditions: string[];
  tools: Tool[];
}

export type SkillCategory =
  | 'assessment' | 'intervention' | 'support' | 'education' | 'motivation';

export interface Tool {
  id: string;
  name: string;
  type: 'guided-meditation' | 'breathing-exercise' | 'journal-prompt' 
       | 'cognitive-reframe' | 'action-plan' | 'resource-link' | 'gamification';
  instructions: string[];
  estimatedTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Verfügbarkeitsmuster
export interface AvailabilityPattern {
  timezone: string;
  preferredHours: number[]; // Array von Stunden (0-23)
  responseDelay: ResponseDelay;
  busyPeriods: BusyPeriod[];
  emergencyAvailable: boolean;
}

export interface ResponseDelay {
  immediate: number; // Prozentsatz für sofortige Antworten
  within5min: number;
  within1hour: number;
  within24hours: number;
}

export interface BusyPeriod {
  start: Date;
  end: Date;
  reason: string;
  alternativeSupport: string[];
}

// Persönlichkeitsentwicklung über Zeit
export interface PersonalityEvolution {
  coachId: string;
  userInteractions: number;
  learningProgress: LearningArea[];
  adaptations: Adaptation[];
  userFeedback: UserFeedback[];
  relationshipDepth: number; // 0-100
}

export interface LearningArea {
  skill: string;
  initialLevel: number;
  currentLevel: number;
  improvementRate: number;
  lastUpdate: Date;
}

export interface Adaptation {
  date: Date;
  trigger: string;
  change: string;
  effectiveness: number;
  userReaction: 'positive' | 'neutral' | 'negative';
}

export interface UserFeedback {
  date: Date;
  type: 'rating' | 'comment' | 'behavior';
  content: string | number;
  context: string;
  aiResponse: string;
}

// Coaching-Session Datenstruktur
export interface CoachingSession {
  id: string;
  coachId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  sessionType: SessionType;
  topics: string[];
  mood: {
    before: number;
    after?: number;
  };
  goals: SessionGoal[];
  activities: SessionActivity[];
  outcomes: SessionOutcome[];
  satisfaction: number; // 1-10
  notes: string;
}

export type SessionType =
  | 'daily-checkin' | 'crisis-intervention' | 'goal-planning'
  | 'skill-building' | 'reflection' | 'celebration' | 'problem-solving';

export interface SessionGoal {
  description: string;
  achieved: boolean;
  progress: number; // 0-100
  notes: string;
}

export interface SessionActivity {
  type: string;
  duration: number;
  effectiveness: number; // 1-10
  userEngagement: number; // 1-10
}

export interface SessionOutcome {
  type: 'insight' | 'action-item' | 'breakthrough' | 'skill-learned' | 'goal-set';
  description: string;
  importance: number; // 1-10
  followUpNeeded: boolean;
}

// Multi-Coach Koordination
export interface CoachTeam {
  primaryCoach: string;
  supportingCoaches: string[];
  specialistReferrals: SpecialistReferral[];
  coordinationProtocol: CoordinationRule[];
}

export interface SpecialistReferral {
  fromCoach: string;
  toCoach: string;
  reason: string;
  duration: 'temporary' | 'permanent' | 'as-needed';
  handoffNotes: string;
}

export interface CoordinationRule {
  condition: string;
  action: 'escalate' | 'refer' | 'collaborate' | 'step-back';
  coaches: string[];
  protocol: string;
}