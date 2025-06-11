// Professional Wellness Network Types
export interface WellnessProfessional {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  credentials: string[];
  profileImage: string;
  bio: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  currency: string;
  availability: Availability[];
  consultationTypes: ConsultationType[];
  experienceYears: number;
  isVerified: boolean;
  location: {
    city: string;
    country: string;
    timezone: string;
  };
  totalSessions: number;
  responseTime: string; // "< 2 Stunden", "< 24 Stunden"
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sonntag-Samstag)
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  timezone: string;
}

export interface ConsultationType {
  id: string;
  name: string;
  description: string;
  duration: number; // Minuten
  price: number;
  isOnline: boolean;
  maxParticipants?: number;
}

export interface Session {
  id: string;
  professionalId: string;
  clientId: string;
  consultationType: ConsultationType;
  scheduledAt: Date;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  meetingLink?: string;
  notes?: string;
  rating?: number;
  feedback?: string;
  preparationMaterials?: SessionMaterial[];
  followUpActions?: string[];
  transcription?: string;
  duration: number; // tatsächliche Dauer in Minuten
}

export interface SessionMaterial {
  id: string;
  type: 'video' | 'audio' | 'document' | 'exercise' | 'meditation';
  title: string;
  description: string;
  url: string;
  duration?: number;
  isRequired: boolean;
}

export interface Review {
  id: string;
  sessionId: string;
  professionalId: string;
  clientId: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: Date;
  isVerified: boolean;
  helpfulVotes: number;
  specialization: string;
}

export interface ProfessionalMatch {
  professional: WellnessProfessional;
  matchScore: number;
  matchReasons: MatchReason[];
  recommendationStrength: 'low' | 'medium' | 'high' | 'perfect';
}

export interface MatchReason {
  category: 'specialization' | 'language' | 'availability' | 'location' | 'experience' | 'rating' | 'price';
  description: string;
  weight: number;
}

export interface WellnessAssessment {
  id: string;
  userId: string;
  completedAt: Date;
  categories: AssessmentCategory[];
  overallScore: number;
  recommendations: string[];
  riskFactors: string[];
  strengths: string[];
  suggestedSpecializations: string[];
}

export interface AssessmentCategory {
  name: string;
  score: number;
  maxScore: number;
  questions: AssessmentQuestion[];
  insights: string[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  answer: string | number | boolean;
  type: 'scale' | 'multiple-choice' | 'text' | 'boolean';
  weight: number;
}

export interface TherapistPortal {
  professional: WellnessProfessional;
  dashboard: {
    todaySessions: Session[];
    upcomingSessions: Session[];
    pendingRequests: SessionRequest[];
    recentReviews: Review[];
    earningsThisMonth: number;
    clientRetentionRate: number;
    averageRating: number;
  };
  clients: ClientProgress[];
  schedule: ScheduleSlot[];
  resources: TherapistResource[];
  analytics: TherapistAnalytics;
}

export interface ClientProgress {
  clientId: string;
  clientName: string;
  startDate: Date;
  totalSessions: number;
  lastSession: Date;
  nextSession?: Date;
  goals: WellnessGoal[];
  progressNotes: ProgressNote[];
  riskLevel: 'low' | 'medium' | 'high';
  engagement: 'low' | 'medium' | 'high';
}

export interface WellnessGoal {
  id: string;
  description: string;
  category: string;
  targetDate: Date;
  progress: number; // 0-100
  milestones: Milestone[];
  isActive: boolean;
}

export interface Milestone {
  id: string;
  description: string;
  targetDate: Date;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface ProgressNote {
  id: string;
  sessionId: string;
  content: string;
  createdAt: Date;
  tags: string[];
  mood: number; // 1-10
  highlights: string[];
  concernsRaised: string[];
}

export interface ScheduleSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  status: 'available' | 'booked' | 'blocked' | 'break';
  sessionId?: string;
  notes?: string;
}

export interface TherapistResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'audio' | 'worksheet' | 'assessment';
  category: string;
  description: string;
  url: string;
  tags: string[];
  rating: number;
  downloadCount: number;
}

export interface TherapistAnalytics {
  sessionStats: {
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    completionRate: number;
    averageDuration: number;
  };
  clientStats: {
    totalClients: number;
    activeClients: number;
    newClientsThisMonth: number;
    retentionRate: number;
  };
  performanceMetrics: {
    averageRating: number;
    responseTime: number;
    clientSatisfaction: number;
    goalAchievementRate: number;
  };
  earnings: {
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    averageSessionValue: number;
  };
}

export interface SessionRequest {
  id: string;
  clientId: string;
  clientName: string;
  consultationType: ConsultationType;
  preferredTimes: Date[];
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  reasonForConsultation: string;
  previousExperience: string;
  specificRequests: string;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'declined' | 'scheduled';
}

export interface VideoConsultation {
  sessionId: string;
  meetingId: string;
  status: 'waiting' | 'active' | 'ended';
  participants: VideoParticipant[];
  startTime: Date;
  endTime?: Date;
  recordingUrl?: string;
  isRecorded: boolean;
  quality: VideoQuality;
  features: VideoFeature[];
}

export interface VideoParticipant {
  userId: string;
  name: string;
  role: 'professional' | 'client';
  isConnected: boolean;
  joinedAt?: Date;
  leftAt?: Date;
  audioEnabled: boolean;
  videoEnabled: boolean;
}

export interface VideoQuality {
  resolution: string;
  bandwidth: number;
  latency: number;
  connectionStability: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface VideoFeature {
  name: 'screen-share' | 'recording' | 'whiteboard' | 'chat' | 'breakout-rooms';
  isEnabled: boolean;
  isActive: boolean;
}

export interface WellnessCommunity {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  isPrivate: boolean;
  moderators: string[];
  rules: string[];
  topics: CommunityTopic[];
  events: CommunityEvent[];
  resources: CommunityResource[];
}

export interface CommunityTopic {
  id: string;
  title: string;
  description: string;
  authorId: string;
  createdAt: Date;
  lastActivity: Date;
  replyCount: number;
  viewCount: number;
  tags: string[];
  isPinned: boolean;
  isLocked: boolean;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  organizer: string;
  startTime: Date;
  endTime: Date;
  location: 'online' | 'in-person' | 'hybrid';
  meetingLink?: string;
  maxParticipants?: number;
  currentParticipants: number;
  cost: number;
  category: string;
  tags: string[];
}

export interface CommunityResource {
  id: string;
  title: string;
  type: 'guide' | 'worksheet' | 'meditation' | 'exercise' | 'reading';
  description: string;
  url: string;
  authorId: string;
  createdAt: Date;
  downloads: number;
  rating: number;
  reviews: number;
}
