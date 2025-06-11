/**
 * Erweiterte Gamification-Features
 * RPG-ähnliche Elemente für die Wellness-Reise
 */

// Character System
export interface WellnessCharacter {
  id: string;
  name: string;
  avatar: string;
  class: CharacterClass;
  level: number;
  experience: number;
  health: HealthStats;
  attributes: CharacterAttributes;
  skills: CharacterSkill[];
  equipment: Equipment[];
  quests: Quest[];
  achievements: Achievement[];
  relationships: Relationship[];
  backstory: string;
  createdAt: Date;
  lastActive: Date;
}

export type CharacterClass = 
  | 'mindful-monk'      // 🧘 Meditation & Achtsamkeit
  | 'heart-healer'      // 💖 Emotionale Heilung
  | 'joy-warrior'       // ⚔️ Positives Denken & Motivation
  | 'wise-scholar'      // 📚 Wissen & Selbstreflexion
  | 'nature-guardian'   // 🌿 Nachhaltigkeit & Natur
  | 'social-connector'  // 🤝 Beziehungen & Community
  | 'creative-artist'   // 🎨 Kreativität & Ausdruck
  | 'balance-master';   // ⚖️ Work-Life-Balance

export interface HealthStats {
  mental: number;      // 0-100 Mentale Gesundheit
  emotional: number;   // 0-100 Emotionale Stabilität
  physical: number;    // 0-100 Körperliche Fitness
  spiritual: number;   // 0-100 Spirituelle Verbindung
  social: number;      // 0-100 Soziale Beziehungen
  creative: number;    // 0-100 Kreative Energie
}

export interface CharacterAttributes {
  mindfulness: number;     // Achtsamkeit
  compassion: number;      // Mitgefühl
  resilience: number;      // Widerstandsfähigkeit
  wisdom: number;          // Weisheit
  courage: number;         // Mut
  gratitude: number;       // Dankbarkeit
  creativity: number;      // Kreativität
  discipline: number;      // Disziplin
}

export interface CharacterSkill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;          // 1-100
  experience: number;
  maxLevel: number;
  description: string;
  effects: SkillEffect[];
  prerequisites: string[];
  unlockConditions: string[];
}

export type SkillCategory = 
  | 'meditation' | 'emotional-regulation' | 'stress-management' 
  | 'goal-setting' | 'habit-formation' | 'self-reflection'
  | 'communication' | 'empathy' | 'creativity' | 'leadership';

export interface SkillEffect {
  attribute: keyof CharacterAttributes;
  bonus: number;
  duration?: number; // in Tagen, undefined = permanent
}

// Equipment System
export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  rarity: Rarity;
  description: string;
  effects: EquipmentEffect[];
  requirements: EquipmentRequirement[];
  obtainedAt: Date;
  isEquipped: boolean;
}

export type EquipmentType = 
  | 'meditation-tool' | 'journal' | 'app' | 'book' | 'practice'
  | 'mentor' | 'community' | 'environment' | 'routine' | 'mindset';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface EquipmentEffect {
  type: 'attribute-boost' | 'skill-boost' | 'experience-multiplier' | 'special';
  target: string;
  value: number;
  description: string;
}

export interface EquipmentRequirement {
  type: 'level' | 'skill' | 'achievement' | 'quest';
  target: string;
  value: number;
}

// Quest System
export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  difficulty: QuestDifficulty;
  objectives: QuestObjective[];
  rewards: QuestReward[];
  timeLimit?: Date;
  isActive: boolean;
  isCompleted: boolean;
  startedAt?: Date;
  completedAt?: Date;
  prerequisites: string[];
  followUpQuests: string[];
}

export type QuestType = 
  | 'daily' | 'weekly' | 'monthly' | 'story' | 'challenge' 
  | 'community' | 'personal-growth' | 'habit-building';

export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'legendary';

export interface QuestObjective {
  id: string;
  description: string;
  type: ObjectiveType;
  target: string;
  currentValue: number;
  targetValue: number;
  isCompleted: boolean;
}

export type ObjectiveType = 
  | 'meditation-minutes' | 'gratitude-entries' | 'goals-achieved'
  | 'days-streak' | 'activities-completed' | 'social-interactions'
  | 'learning-sessions' | 'creative-projects' | 'acts-of-kindness';

export interface QuestReward {
  type: RewardType;
  item: string;
  quantity: number;
  description: string;
}

export type RewardType = 
  | 'experience' | 'equipment' | 'skill-points' | 'character-customization'
  | 'unlock-feature' | 'badge' | 'title' | 'virtual-currency';

// Achievement System (erweitert)
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: Rarity;
  requirements: AchievementRequirement[];
  rewards: QuestReward[];
  unlockedAt?: Date;
  progress: number; // 0-100
  isHidden: boolean; // Secret achievements
  seriesId?: string; // For achievement chains
}

export type AchievementCategory = 
  | 'milestone' | 'streak' | 'mastery' | 'discovery' | 'social'
  | 'challenge' | 'seasonal' | 'rare' | 'funny' | 'dedication';

export interface AchievementRequirement {
  type: string;
  target: string;
  value: number;
  operator: '=' | '>' | '<' | '>=' | '<=';
}

// Battle System (gegen innere Dämonen)
export interface BattleSession {
  id: string;
  demonType: DemonType;
  battleGround: BattleGround;
  playerCharacter: string; // Character ID
  startTime: Date;
  endTime?: Date;
  turns: BattleTurn[];
  result?: BattleResult;
  experienceGained: number;
  lootDropped: Equipment[];
}

export type DemonType = 
  | 'anxiety-shadow' | 'depression-void' | 'anger-flame' | 'jealousy-viper'
  | 'pride-colossus' | 'greed-dragon' | 'sloth-bog' | 'fear-phantom';

export interface BattleGround {
  id: string;
  name: string;
  theme: string;
  backgroundMusic: string;
  effects: BattleGroundEffect[];
  unlockConditions: string[];
}

export interface BattleGroundEffect {
  type: 'attribute-modifier' | 'skill-modifier' | 'special-action';
  description: string;
  value: number;
}

export interface BattleTurn {
  turnNumber: number;
  playerAction: BattleAction;
  demonAction: DemonAction;
  playerDamage: number;
  demonDamage: number;
  playerHealth: number;
  demonHealth: number;
  statusEffects: StatusEffect[];
}

export interface BattleAction {
  type: ActionType;
  skillUsed?: string;
  equipmentUsed?: string;
  description: string;
  effectiveness: number; // 0-100
}

export type ActionType = 
  | 'mindfulness-attack' | 'gratitude-heal' | 'wisdom-shield'
  | 'compassion-purify' | 'courage-charge' | 'acceptance-neutralize';

export interface DemonAction {
  type: DemonAttackType;
  description: string;
  damage: number;
  statusEffect?: StatusEffect;
}

export type DemonAttackType = 
  | 'negative-thoughts' | 'self-doubt' | 'overwhelm' | 'despair'
  | 'rage-burst' | 'comparison-trap' | 'perfectionism' | 'avoidance';

export interface StatusEffect {
  type: StatusEffectType;
  duration: number; // turns
  value: number;
  description: string;
}

export type StatusEffectType = 
  | 'inspired' | 'peaceful' | 'energized' | 'focused' | 'grateful'
  | 'anxious' | 'confused' | 'overwhelmed' | 'discouraged';

export interface BattleResult {
  outcome: 'victory' | 'defeat' | 'draw';
  lessonsLearned: string[];
  growthAreas: string[];
  recommendedPractices: string[];
  nextBattleUnlocked?: string;
}

// Relationship System
export interface Relationship {
  characterId: string;
  relationshipType: RelationshipType;
  level: number; // 1-10
  trust: number; // 0-100
  sharedExperiences: SharedExperience[];
  lastInteraction: Date;
  relationshipHistory: RelationshipEvent[];
}

export type RelationshipType = 
  | 'mentor' | 'student' | 'peer' | 'rival' | 'friend' | 'inspiration';

export interface SharedExperience {
  id: string;
  type: ExperienceType;
  description: string;
  date: Date;
  impact: number; // -10 to +10
}

export type ExperienceType = 
  | 'quest-completion' | 'battle-cooperation' | 'knowledge-sharing'
  | 'emotional-support' | 'celebration' | 'challenge-overcome';

export interface RelationshipEvent {
  date: Date;
  type: 'interaction' | 'gift' | 'help' | 'conflict' | 'milestone';
  description: string;
  impact: number;
}

// World Events & Seasons
export interface WorldEvent {
  id: string;
  name: string;
  description: string;
  type: WorldEventType;
  startDate: Date;
  endDate: Date;
  effects: WorldEventEffect[];
  participants: string[]; // Character IDs
  specialQuests: string[];
  uniqueRewards: Equipment[];
}

export type WorldEventType = 
  | 'gratitude-festival' | 'mindfulness-week' | 'kindness-challenge'
  | 'wisdom-gathering' | 'healing-circle' | 'transformation-season';

export interface WorldEventEffect {
  type: 'experience-bonus' | 'skill-bonus' | 'special-unlock' | 'community-boost';
  value: number;
  description: string;
}

// Guilds & Communities
export interface Guild {
  id: string;
  name: string;
  description: string;
  focus: GuildFocus;
  members: GuildMember[];
  level: number;
  experience: number;
  perks: GuildPerk[];
  activities: GuildActivity[];
  createdAt: Date;
  rules: string[];
}

export type GuildFocus = 
  | 'meditation' | 'fitness' | 'creativity' | 'study' | 'support'
  | 'adventure' | 'mindfulness' | 'goal-achievement';

export interface GuildMember {
  characterId: string;
  role: GuildRole;
  joinedAt: Date;
  contributionScore: number;
  lastActive: Date;
}

export type GuildRole = 'member' | 'officer' | 'leader' | 'founder';

export interface GuildPerk {
  id: string;
  name: string;
  description: string;
  effect: GuildPerkEffect;
  requirements: GuildRequirement[];
}

export interface GuildPerkEffect {
  type: 'experience-bonus' | 'skill-sharing' | 'group-quests' | 'special-access';
  value: number;
  description: string;
}

export interface GuildRequirement {
  type: 'guild-level' | 'member-count' | 'activity-level';
  value: number;
}

export interface GuildActivity {
  id: string;
  name: string;
  type: GuildActivityType;
  description: string;
  participants: string[];
  startTime: Date;
  duration: number; // minutes
  rewards: QuestReward[];
}

export type GuildActivityType = 
  | 'group-meditation' | 'study-session' | 'challenge-event'
  | 'support-circle' | 'creative-workshop' | 'goal-accountability';
