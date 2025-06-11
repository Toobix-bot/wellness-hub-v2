// Erweiterte Community & Social Features 2.0 - Typen

// Grundlegende Typen
export type WellnessCategory = 'therapie' | 'transformation' | 'dankbarkeit' | 'freude' | 'stille' | 'fortschritt' | 'liebe' | 'herausforderungen';

export interface GuildAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  category: WellnessCategory;
}

export interface SkillEffect {
  type: 'meditation_boost' | 'gratitude_multiplier' | 'mood_stability' | 'energy_regen';
  value: number;
  duration?: number;
}

export interface AbilityEffect {
  type: 'heal' | 'buff' | 'cleanse' | 'inspire';
  power: number;
  targets: 'self' | 'party' | 'all';
  duration: number;
}

export interface EquipmentStats {
  mindfulness: number;
  compassion: number;
  resilience: number;
  wisdom: number;
  joy: number;
}

export interface WellnessQuest {
  id: string;
  title: string;
  description: string;
  objectives: QuestObjective[];
  rewards: QuestReward[];
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  timeLimit?: number;
}

export interface QuestObjective {
  id: string;
  description: string;
  progress: number;
  target: number;
  isCompleted: boolean;
}

export interface QuestReward {
  type: 'xp' | 'item' | 'skill_point' | 'title';
  value: number;
  name: string;
}

export interface PartyFormation {
  formation: string;
  bonuses: FormationBonus[];
}

export interface FormationBonus {
  type: string;
  value: number;
  description: string;
}

export interface RaidReward {
  type: 'equipment' | 'title' | 'achievement' | 'xp' | 'coins';
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
}

export interface EventActivity {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  rewards: EventReward[];
  timeLimit: number;
}

export interface EventReward {
  type: 'seasonal_item' | 'exclusive_title' | 'limited_badge';
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface EventLeaderboard {
  entries: LeaderboardEntry[];
  season: string;
  prizes: EventPrize[];
}

export interface EventPrize {
  rank: number;
  reward: EventReward;
  description: string;
}

export interface PvPChallenge {
  id: string;
  challengerId: string;
  challengedId: string;
  category: WellnessCategory;
  wager: number;
  duration: number;
  status: 'pending' | 'active' | 'completed' | 'declined';
  winner?: string;
  createdAt: Date;
}

export interface SocialFeed {
  posts: SocialPost[];
  trending: TrendingTopic[];
  recommendations: UserRecommendation[];
}

export interface SocialPost {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  type: 'achievement' | 'insight' | 'question' | 'inspiration' | 'photo';
  media?: MediaAttachment[];
  timestamp: Date;
  likes: number;
  comments: Comment[];
  shares: number;
  tags: string[];
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface MediaAttachment {
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail?: string;
  duration?: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Comment[];
}

export interface TrendingTopic {
  tag: string;
  posts: number;
  growth: number;
  category: WellnessCategory;
}

export interface UserRecommendation {
  userId: string;
  username: string;
  avatar: string;
  reason: string;
  compatibility: number;
  sharedInterests: WellnessCategory[];
}

export interface WellnessGuild {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  level: number;
  members: GuildMember[];
  challenges: GuildChallenge[];
  achievements: GuildAchievement[];
  foundedAt: Date;
  memberCount: number;
  averageWellnessLevel: number;
  weeklyActivity: number;
  specialization: WellnessCategory;
}

export interface GuildMember {
  id: string;
  username: string;
  avatar: string;
  level: number;
  role: 'founder' | 'admin' | 'mentor' | 'member';
  contributions: number;
  joinedAt: Date;
  wellnessStreak: number;
  specialties: WellnessCategory[];
  mentorRating: number;
  isOnline: boolean;
}

export interface GuildChallenge {
  id: string;
  title: string;
  description: string;
  category: WellnessCategory;
  type: 'individual' | 'team' | 'guild';
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
  duration: number; // in days
  participants: string[];
  requirements: ChallengeRequirement[];
  rewards: ChallengeReward[];
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'completed' | 'expired';
  leaderboard: LeaderboardEntry[];
}

export interface ChallengeRequirement {
  type: 'meditation_minutes' | 'gratitude_entries' | 'mood_tracking' | 'activities_completed';
  target: number;
  description: string;
}

export interface ChallengeReward {
  type: 'xp' | 'badge' | 'nft' | 'coins' | 'title';
  value: number;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  score: number;
  progress: number;
  rank: number;
  achievements: string[];
}

export interface MentorSession {
  id: string;
  mentorId: string;
  menteeId: string;
  topic: WellnessCategory;
  scheduledAt: Date;
  duration: number;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  rating?: number;
  feedback?: string;
  notes: string;
  recordingUrl?: string;
}

export interface WellnessParty {
  id: string;
  hostId: string;
  title: string;
  description: string;
  activity: string;
  maxParticipants: number;
  currentParticipants: string[];
  scheduledAt: Date;
  duration: number;
  isPrivate: boolean;
  requirements: string[];
  category: WellnessCategory;
  status: 'upcoming' | 'active' | 'completed';
}

export interface LifeRPGMultiplayer {
  playerClass: PlayerClass;
  party: RPGParty;
  raids: WellnessRaid[];
  pvpChallenges: PvPChallenge[];
  seasonalEvents: SeasonalEvent[];
}

export interface PlayerClass {
  name: 'mindful_monk' | 'gratitude_guardian' | 'transformation_titan' | 'joy_jester' | 'love_alchemist';
  level: number;
  xp: number;
  skills: ClassSkill[];
  specialAbilities: SpecialAbility[];
  equipment: Equipment[];
}

export interface ClassSkill {
  name: string;
  level: number;
  xp: number;
  maxLevel: number;
  description: string;
  icon: string;
  effects: SkillEffect[];
}

export interface SpecialAbility {
  name: string;
  description: string;
  cooldown: number;
  lastUsed?: Date;
  effect: AbilityEffect;
}

export interface Equipment {
  slot: 'amulet' | 'ring' | 'charm' | 'crystal';
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  stats: EquipmentStats;
  description: string;
  acquiredAt: Date;
}

export interface RPGParty {
  id: string;
  name: string;
  members: string[];
  level: number;
  currentQuest?: WellnessQuest;
  achievements: string[];
  formation: PartyFormation;
}

export interface WellnessRaid {
  id: string;
  title: string;
  description: string;
  difficulty: 'normal' | 'hard' | 'nightmare' | 'legendary';
  minPlayers: number;
  maxPlayers: number;
  duration: number; // in days
  objectives: RaidObjective[];
  rewards: RaidReward[];
  participants: RaidParticipant[];
  status: 'upcoming' | 'active' | 'completed';
  startDate: Date;
  endDate: Date;
}

export interface RaidObjective {
  id: string;
  title: string;
  description: string;
  type: 'collective' | 'individual';
  target: number;
  progress: number;
  isCompleted: boolean;
  category: WellnessCategory;
}

export interface RaidParticipant {
  userId: string;
  username: string;
  class: string;
  level: number;
  contribution: number;
  joinedAt: Date;
  isActive: boolean;
}

export interface SeasonalEvent {
  id: string;
  name: string;
  theme: string;
  description: string;
  startDate: Date;
  endDate: Date;
  activities: EventActivity[];
  rewards: EventReward[];
  leaderboard: EventLeaderboard;
  isActive: boolean;
}

// Legacy User Interface - für Rückwärtskompatibilität
export interface User {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  privacy: {
    profile: 'private' | 'friends' | 'public';
    activities: 'private' | 'anonymous' | 'public';
    achievements: 'private' | 'friends' | 'public';
    journal: 'private' | 'anonymous_excerpts' | 'never';
  };
  preferences: {
    aiCoach: 'gentle' | 'motivational' | 'scientific' | 'playful';
    notifications: boolean;
    language: 'de' | 'en';
    theme: 'light' | 'dark' | 'auto';
  };
  stats: {
    joinDate: string;
    totalSessions: number;
    longestStreak: number;
    favoriteActivities: string[];
  };
}

export interface CommunityPost {
  id: string;
  authorId: string;
  type: 'achievement' | 'insight' | 'question' | 'support' | 'celebration';
  title: string;
  content: string;
  isAnonymous: boolean;
  tags: string[];
  reactions: {
    type: 'heart' | 'clap' | 'wow' | 'hug' | 'star';
    count: number;
    users: string[];
  }[];
  comments: CommunityComment[];
  timestamp: string;
  privacy: 'public' | 'friends' | 'group';
  moderated: boolean;
}

export interface CommunityComment {
  id: string;
  authorId: string;
  content: string;
  isAnonymous: boolean;
  timestamp: string;
  reactions: {
    type: string;
    count: number;
  }[];
}

export interface WellnessGroup {
  id: string;
  name: string;
  description: string;
  category: 'meditation' | 'fitness' | 'mental_health' | 'creativity' | 'spirituality';
  privacy: 'public' | 'private' | 'invite_only';
  memberCount: number;
  moderators: string[];
  rules: string[];
  activities: GroupActivity[];
  resources: GroupResource[];
}

export interface GroupActivity {
  id: string;
  groupId: string;
  type: 'challenge' | 'session' | 'discussion' | 'workshop';
  title: string;
  description: string;
  startTime: string;
  duration: number;
  maxParticipants?: number;
  currentParticipants: string[];
  requirements?: string[];
}

export interface GroupResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'audio' | 'exercise' | 'tool';
  url?: string;
  content?: string;
  tags: string[];
  rating: number;
  contributor: string;
}

export interface PrivacySettings {
  dataCollection: boolean;
  analytics: boolean;
  personalization: boolean;
  communityFeatures: boolean;
  aiTraining: boolean;
  thirdPartySharing: boolean;
}

export interface SafetyReport {
  id: string;
  reporterId: string;
  targetType: 'post' | 'comment' | 'user' | 'group';
  targetId: string;
  reason: 'spam' | 'harassment' | 'inappropriate' | 'misinformation' | 'other';
  description: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
}
