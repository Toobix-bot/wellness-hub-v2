// Wellness Blockchain & NFT System Typen
export interface WellnessNFT {
  id: string;
  tokenId: number;
  name: string;
  description: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  type: 'achievement_badge' | 'wellness_art' | 'meditation_moment' | 'transformation_story' | 'community_impact';
  attributes: NFTAttribute[];
  metadata: NFTMetadata;
  owner: string;
  creator: string;
  mintedAt: Date;
  transferHistory: NFTTransfer[];
  marketValue: number; // in WellnessCoins
  isListed: boolean;
  utilities: NFTUtility[];
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: 'boost_number' | 'boost_percentage' | 'number' | 'date';
  max_value?: number;
}

export interface NFTMetadata {
  wellness_category: WellnessCategory;
  achievement_date: Date;
  difficulty_level: number; // 1-10
  emotional_impact: number; // 1-10
  scientific_backing: number; // 1-10
  community_validation: number; // votes
  energy_signature: string; // unique wellness energy pattern
  inspiration_source?: string;
}

export interface NFTTransfer {
  from: string;
  to: string;
  timestamp: Date;
  transaction_hash: string;
  price?: number;
  reason: 'mint' | 'gift' | 'trade' | 'sale' | 'reward';
}

export interface NFTUtility {
  type: 'meditation_boost' | 'experience_multiplier' | 'exclusive_access' | 'voting_power' | 'profile_enhancement';
  description: string;
  value: number;
  duration?: number; // in days, undefined = permanent
  conditions?: string[];
}

export interface WellnessCoin {
  symbol: 'WLC';
  name: 'WellnessCoin';
  decimals: 18;
  totalSupply: number;
  userBalance: number;
  earnedToday: number;
  earnedTotal: number;
  spentTotal: number;
  stakingBalance: number;
  stakingRewards: number;
}

export interface WellnessDAO {
  id: string;
  name: string;
  description: string;
  members: DAOMember[];
  proposals: DAOProposal[];
  treasury: DAOTreasury;
  governance: GovernanceRules;
  votingPower: VotingPower;
}

export interface DAOMember {
  userId: string;
  username: string;
  avatar: string;
  joinedAt: Date;
  tokenHoldings: number;
  votingPower: number;
  proposalsCreated: number;
  votesParticipated: number;
  reputation: number;
  badges: string[];
}

export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  type: 'feature_request' | 'funding_request' | 'governance_change' | 'community_initiative' | 'research_project';
  creator: string;
  createdAt: Date;
  votingEnds: Date;
  status: 'draft' | 'active' | 'passed' | 'rejected' | 'executed';
  votes: ProposalVote[];
  requiredQuorum: number;
  fundingAmount?: number;
  impact: ProposalImpact;
}

export interface ProposalVote {
  voter: string;
  choice: 'for' | 'against' | 'abstain';
  weight: number;
  timestamp: Date;
  reason?: string;
}

export interface ProposalImpact {
  category: WellnessCategory;
  expectedBeneficiaries: number;
  scientificEvidence: number; // 1-10
  implementationComplexity: number; // 1-10
  timeframe: string;
  measurableOutcomes: string[];
}

export interface DAOTreasury {
  totalFunds: number;
  allocatedFunds: number;
  availableFunds: number;
  monthlyInflow: number;
  monthlyOutflow: number;
  fundingSources: FundingSource[];
  allocations: FundAllocation[];
}

export interface FundingSource {
  type: 'nft_sales' | 'platform_fees' | 'donations' | 'staking_rewards' | 'partnerships';
  amount: number;
  percentage: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface FundAllocation {
  category: 'development' | 'research' | 'community' | 'marketing' | 'operations';
  amount: number;
  percentage: number;
  projects: string[];
}

export interface GovernanceRules {
  proposalCreationRequirement: number; // minimum tokens needed
  votingDuration: number; // in days
  quorumRequirement: number; // percentage
  passingThreshold: number; // percentage
  executionDelay: number; // in days
  vetoRights: string[]; // roles that can veto
}

export interface VotingPower {
  baseTokenWeight: number;
  achievementMultiplier: number;
  stakingBonus: number;
  activityBonus: number;
  reputationBonus: number;
  maxVotingPower: number;
}

export interface WellnessMarketplace {
  nfts: MarketplaceListing[];
  categories: NFTCategory[];
  trending: TrendingNFT[];
  recentSales: RecentSale[];
  priceHistory: PriceHistoryEntry[];
  featuredCollections: NFTCollection[];
}

export interface MarketplaceListing {
  nft: WellnessNFT;
  price: number;
  currency: 'WLC' | 'ETH' | 'USD';
  seller: string;
  listedAt: Date;
  expiresAt?: Date;
  views: number;
  favorites: number;
  offers: MarketplaceOffer[];
}

export interface MarketplaceOffer {
  buyer: string;
  amount: number;
  currency: 'WLC' | 'ETH' | 'USD';
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}

export interface NFTCategory {
  name: string;
  description: string;
  icon: string;
  count: number;
  floorPrice: number;
  volume24h: number;
  trending: boolean;
}

export interface TrendingNFT {
  nft: WellnessNFT;
  priceChange24h: number;
  volumeChange24h: number;
  popularityScore: number;
}

export interface RecentSale {
  nft: WellnessNFT;
  price: number;
  currency: string;
  buyer: string;
  seller: string;
  timestamp: Date;
}

export interface PriceHistoryEntry {
  timestamp: Date;
  price: number;
  volume: number;
  sales_count: number;
}

export interface NFTCollection {
  id: string;
  name: string;
  description: string;
  creator: string;
  image: string;
  nfts: WellnessNFT[];
  totalVolume: number;
  floorPrice: number;
  owners: number;
  royalties: number; // percentage
  verified: boolean;
  categories: WellnessCategory[];
}

export interface BlockchainTransaction {
  hash: string;
  type: 'mint' | 'transfer' | 'sale' | 'stake' | 'reward' | 'governance';
  from: string;
  to: string;
  amount: number;
  currency: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
  gasUsed?: number;
  gasFee?: number;
  blockNumber?: number;
}

export interface WellnessStaking {
  pools: StakingPool[];
  userStakes: UserStake[];
  totalStaked: number;
  totalRewards: number;
  apy: number; // Annual Percentage Yield
}

export interface StakingPool {
  id: string;
  name: string;
  description: string;
  tokenRequired: 'WLC' | 'NFT';
  minimumStake: number;
  lockPeriod: number; // in days
  apy: number;
  totalStaked: number;
  participants: number;
  rewards: StakingReward[];
  isActive: boolean;
}

export interface UserStake {
  poolId: string;
  amount: number;
  stakedAt: Date;
  unlocksAt: Date;
  earnedRewards: number;
  claimedRewards: number;
  isLocked: boolean;
}

export interface StakingReward {
  type: 'tokens' | 'nft' | 'boost' | 'access';
  amount: number;
  description: string;
  rarity?: string;
}

export interface DeFiIntegration {
  liquidityPools: LiquidityPool[];
  yieldFarming: YieldFarm[];
  lending: LendingProtocol[];
  crossChainBridges: CrossChainBridge[];
}

export interface LiquidityPool {
  id: string;
  name: string;
  tokens: [string, string]; // trading pair
  liquidity: number;
  volume24h: number;
  fees24h: number;
  apy: number;
  userLiquidity?: number;
  userRewards?: number;
}

export interface YieldFarm {
  id: string;
  name: string;
  stakingToken: string;
  rewardToken: string;
  apy: number;
  totalStaked: number;
  endDate: Date;
  userStaked?: number;
  userRewards?: number;
}

export interface LendingProtocol {
  name: string;
  supportedTokens: string[];
  lendingRates: { [token: string]: number };
  borrowingRates: { [token: string]: number };
  userDeposits?: { [token: string]: number };
  userBorrows?: { [token: string]: number };
}

export interface CrossChainBridge {
  fromChain: string;
  toChain: string;
  supportedTokens: string[];
  fees: number;
  transferTime: string;
  isActive: boolean;
}

export interface WellnessIdentity {
  did: string; // Decentralized Identifier
  walletAddress: string;
  ens: string; // Ethereum Name Service
  reputation: ReputationScore;
  achievements: BlockchainAchievement[];
  socialRecovery: SocialRecovery;
  privacy: PrivacySettings;
}

export interface ReputationScore {
  overall: number;
  categories: {
    [category in WellnessCategory]: number;
  };
  factors: ReputationFactor[];
  history: ReputationHistoryEntry[];
}

export interface ReputationFactor {
  name: string;
  weight: number;
  currentScore: number;
  trend: 'up' | 'down' | 'stable';
}

export interface ReputationHistoryEntry {
  timestamp: Date;
  action: string;
  impact: number;
  category: WellnessCategory;
  verifier?: string;
}

export interface BlockchainAchievement {
  id: string;
  name: string;
  description: string;
  category: WellnessCategory;
  rarity: string;
  nftTokenId?: number;
  verifiedBy: string[];
  timestamp: Date;
  onChainProof: string;
}

export interface SocialRecovery {
  guardians: string[]; // trusted addresses
  threshold: number; // minimum guardians needed for recovery
  recoveryRequests: RecoveryRequest[];
}

export interface RecoveryRequest {
  id: string;
  initiator: string;
  newAddress: string;
  approvals: string[];
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected' | 'executed';
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  activityVisibility: 'public' | 'anonymous' | 'private';
  nftVisibility: 'public' | 'private';
  achievementVisibility: 'public' | 'friends' | 'private';
  dataSharing: DataSharingSettings;
}

export interface DataSharingSettings {
  research: boolean;
  analytics: boolean;
  marketing: boolean;
  thirdParty: boolean;
  anonymized: boolean;
}

type WellnessCategory = 'therapie' | 'transformation' | 'dankbarkeit' | 'freude' | 'stille' | 'fortschritt' | 'liebe' | 'herausforderungen';
