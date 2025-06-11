'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  WellnessNFT, 
  WellnessCoin, 
  WellnessDAO, 
  WellnessMarketplace,
  WellnessStaking,
  WellnessIdentity,
  BlockchainTransaction
} from '@/types/blockchain';

export default function WellnessBlockchainNFTs() {
  const [activeTab, setActiveTab] = useState<'wallet' | 'nfts' | 'dao' | 'marketplace' | 'staking' | 'identity'>('wallet');
  const [wellnessCoin, setWellnessCoin] = useState<WellnessCoin | null>(null);
  const [userNFTs, setUserNFTs] = useState<WellnessNFT[]>([]);
  const [dao, setDao] = useState<WellnessDAO | null>(null);
  const [marketplace, setMarketplace] = useState<WellnessMarketplace | null>(null);
  const [staking, setStaking] = useState<WellnessStaking | null>(null);
  const [identity, setIdentity] = useState<WellnessIdentity | null>(null);
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    initializeBlockchain();
  }, []);

  const initializeBlockchain = () => {
    setIsLoading(true);

    setTimeout(() => {
      // WellnessCoin initialisieren
      const sampleWellnessCoin: WellnessCoin = {
        symbol: 'WLC',
        name: 'WellnessCoin',
        decimals: 18,
        totalSupply: 1000000000, // 1 Milliarde WLC
        userBalance: 2847.5,
        earnedToday: 125.0,
        earnedTotal: 15420.8,
        spentTotal: 12573.3,
        stakingBalance: 5000.0,
        stakingRewards: 245.7
      };

      // User NFTs
      const sampleNFTs: WellnessNFT[] = [
        {
          id: 'nft-zen-master',
          tokenId: 1001,
          name: 'Zen-Meister Badge',
          description: 'Erreicht durch 100 aufeinanderfolgende Meditationstage',
          image: '🧘‍♂️',
          rarity: 'epic',
          type: 'achievement_badge',
          attributes: [
            { trait_type: 'Meditation Days', value: 100, display_type: 'number' },
            { trait_type: 'Consistency', value: 'Perfect', display_type: undefined },
            { trait_type: 'Stress Reduction', value: 85, display_type: 'boost_percentage' }
          ],
          metadata: {
            wellness_category: 'stille',
            achievement_date: new Date('2024-02-15'),
            difficulty_level: 9,
            emotional_impact: 10,
            scientific_backing: 9,
            community_validation: 147,
            energy_signature: '0x7d4f2a8b3e1c5a9d6f8e2b4a7c1e9f3b5d8a2c6e9f1b4d7a3c6e9f2b5d8a1c4e'
          },
          owner: 'user123',
          creator: 'wellness-platform',
          mintedAt: new Date('2024-02-15'),
          transferHistory: [
            {
              from: '0x0000000000000000000000000000000000000000',
              to: 'user123',
              timestamp: new Date('2024-02-15'),
              transaction_hash: '0xabc123...',
              reason: 'mint'
            }
          ],
          marketValue: 850,
          isListed: false,
          utilities: [
            {
              type: 'meditation_boost',
              description: '+25% Erfahrung bei Meditationen',
              value: 25,
              duration: undefined
            },
            {
              type: 'exclusive_access',
              description: 'Zugang zu Premium-Meditationsräumen',
              value: 1,
              duration: undefined
            }
          ]
        },
        {
          id: 'nft-gratitude-garden',
          tokenId: 1002,
          name: 'Dankbarkeits-Garten',
          description: 'Einzigartige Kunst, generiert aus 365 Dankbarkeitseinträgen',
          image: '🌸',
          rarity: 'legendary',
          type: 'wellness_art',
          attributes: [
            { trait_type: 'Gratitude Entries', value: 365, display_type: 'number' },
            { trait_type: 'Emotional Depth', value: 95, display_type: 'boost_percentage' },
            { trait_type: 'Art Style', value: 'Generative Mandala' }
          ],
          metadata: {
            wellness_category: 'dankbarkeit',
            achievement_date: new Date('2024-03-01'),
            difficulty_level: 8,
            emotional_impact: 10,
            scientific_backing: 8,
            community_validation: 203,
            energy_signature: '0x9f2b5d8a1c4e7d4f2a8b3e1c5a9d6f8e2b4a7c1e9f3b5d8a2c6e9f1b4d7a3c6e'
          },
          owner: 'user123',
          creator: 'user123',
          mintedAt: new Date('2024-03-01'),
          transferHistory: [
            {
              from: '0x0000000000000000000000000000000000000000',
              to: 'user123',
              timestamp: new Date('2024-03-01'),
              transaction_hash: '0xdef456...',
              reason: 'mint'
            }
          ],
          marketValue: 2400,
          isListed: true,
          utilities: [
            {
              type: 'experience_multiplier',
              description: '2x Dankbarkeits-Erfahrung',
              value: 200,
              duration: undefined
            },
            {
              type: 'voting_power',
              description: '+50 Stimmen in der DAO',
              value: 50,
              duration: undefined
            }
          ]
        }
      ];

      // DAO Data
      const sampleDAO: WellnessDAO = {
        id: 'wellness-dao',
        name: 'Wellness Hub DAO',
        description: 'Dezentralisierte Governance für die Zukunft des Wellness',
        members: [],
        proposals: [
          {
            id: 'prop-mental-health',
            title: 'Mentale Gesundheits-Forschungsprogramm',
            description: 'Finanzierung einer wissenschaftlichen Studie über digitale Wellness-Interventionen',
            type: 'research_project',
            creator: 'researcher-alice',
            createdAt: new Date('2024-03-01'),
            votingEnds: new Date('2024-03-15'),
            status: 'active',
            votes: [
              {
                voter: 'user123',
                choice: 'for',
                weight: 150,
                timestamp: new Date('2024-03-02'),
                reason: 'Wichtige Forschung für die Community'
              }
            ],
            requiredQuorum: 25,
            fundingAmount: 50000,
            impact: {
              category: 'therapie',
              expectedBeneficiaries: 10000,
              scientificEvidence: 9,
              implementationComplexity: 6,
              timeframe: '12 Monate',
              measurableOutcomes: [
                'Peer-reviewed Publikation',
                'Verbesserte Intervention-Protokolle',
                'Open-Source Wellness-Tools'
              ]
            }
          }
        ],
        treasury: {
          totalFunds: 2500000,
          allocatedFunds: 750000,
          availableFunds: 1750000,
          monthlyInflow: 125000,
          monthlyOutflow: 85000,
          fundingSources: [
            {
              type: 'nft_sales',
              amount: 450000,
              percentage: 35,
              trend: 'increasing'
            },
            {
              type: 'platform_fees',
              amount: 320000,
              percentage: 25,
              trend: 'stable'
            }
          ],
          allocations: [
            {
              category: 'development',
              amount: 875000,
              percentage: 35,
              projects: ['AR/VR Features', 'AI Verbesserungen']
            },
            {
              category: 'research',
              amount: 625000,
              percentage: 25,
              projects: ['Mentale Gesundheit Studie', 'Biometric Integration']
            }
          ]
        },
        governance: {
          proposalCreationRequirement: 1000,
          votingDuration: 14,
          quorumRequirement: 25,
          passingThreshold: 51,
          executionDelay: 7,
          vetoRights: ['core-team']
        },
        votingPower: {
          baseTokenWeight: 1,
          achievementMultiplier: 1.5,
          stakingBonus: 2.0,
          activityBonus: 1.2,
          reputationBonus: 1.3,
          maxVotingPower: 10000
        }
      };

      // Staking Data
      const sampleStaking: WellnessStaking = {
        pools: [
          {
            id: 'wellness-vault',
            name: 'Wellness Vault',
            description: 'Stake WLC für passive Rewards und Governance-Power',
            tokenRequired: 'WLC',
            minimumStake: 100,
            lockPeriod: 30,
            apy: 12.5,
            totalStaked: 15000000,
            participants: 3247,
            rewards: [
              {
                type: 'tokens',
                amount: 12.5,
                description: '12.5% APY in WLC'
              },
              {
                type: 'boost',
                amount: 25,
                description: '+25% Erfahrung für alle Aktivitäten'
              }
            ],
            isActive: true
          },
          {
            id: 'nft-staking',
            name: 'NFT Power Staking',
            description: 'Stake deine Wellness NFTs für exklusive Belohnungen',
            tokenRequired: 'NFT',
            minimumStake: 1,
            lockPeriod: 14,
            apy: 8.0,
            totalStaked: 1247,
            participants: 892,
            rewards: [
              {
                type: 'tokens',
                amount: 8.0,
                description: '8% APY basierend auf NFT-Seltenheit'
              },
              {
                type: 'nft',
                amount: 1,
                description: 'Chance auf seltene Bonus-NFTs',
                rarity: 'rare'
              }
            ],
            isActive: true
          }
        ],
        userStakes: [
          {
            poolId: 'wellness-vault',
            amount: 5000,
            stakedAt: new Date('2024-02-01'),
            unlocksAt: new Date('2024-03-03'),
            earnedRewards: 245.7,
            claimedRewards: 123.4,
            isLocked: true
          }
        ],
        totalStaked: 5000,
        totalRewards: 245.7,
        apy: 12.5
      };

      // Wellness Identity
      const sampleIdentity: WellnessIdentity = {
        did: 'did:wellness:0x742d35cc6cf32eadb842f1b9cb3c7cf9c2a8e1f3',
        walletAddress: '0x742d35cc6cf32eadb842f1b9cb3c7cf9c2a8e1f3',
        ens: 'zenmaster.wellness',
        reputation: {
          overall: 8.7,
          categories: {
            stille: 9.2,
            dankbarkeit: 8.8,
            transformation: 8.1,
            freude: 7.9,
            therapie: 8.5,
            fortschritt: 8.9,
            liebe: 8.3,
            herausforderungen: 8.6
          },
          factors: [
            {
              name: 'Konsistenz',
              weight: 0.3,
              currentScore: 9.1,
              trend: 'up'
            },
            {
              name: 'Community Beitrag',
              weight: 0.2,
              currentScore: 8.4,
              trend: 'stable'
            }
          ],
          history: []
        },
        achievements: [],
        socialRecovery: {
          guardians: ['trusted-friend-1', 'trusted-friend-2', 'family-member'],
          threshold: 2,
          recoveryRequests: []
        },
        privacy: {
          profileVisibility: 'public',
          activityVisibility: 'friends',
          nftVisibility: 'public',
          achievementVisibility: 'public',
          dataSharing: {
            research: true,
            analytics: true,
            marketing: false,
            thirdParty: false,
            anonymized: true
          }
        }
      };

      // Recent Transactions
      const sampleTransactions: BlockchainTransaction[] = [
        {
          hash: '0xabc123def456...',
          type: 'reward',
          from: 'wellness-platform',
          to: 'user123',
          amount: 125.0,
          currency: 'WLC',
          timestamp: new Date('2024-03-05T10:30:00'),
          status: 'confirmed'
        },
        {
          hash: '0xdef456ghi789...',
          type: 'stake',
          from: 'user123',
          to: 'wellness-vault',
          amount: 1000.0,
          currency: 'WLC',
          timestamp: new Date('2024-03-04T15:20:00'),
          status: 'confirmed'
        }
      ];

      setWellnessCoin(sampleWellnessCoin);
      setUserNFTs(sampleNFTs);
      setDao(sampleDAO);
      setStaking(sampleStaking);
      setIdentity(sampleIdentity);
      setTransactions(sampleTransactions);
      setWalletConnected(true);
      setIsLoading(false);
    }, 1500);
  };

  const connectWallet = async () => {
    // Simulierte Wallet-Verbindung
    if ((window as any).ethereum) {
      try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
        alert('Wallet erfolgreich verbunden!');
      } catch (error) {
        alert('Wallet-Verbindung fehlgeschlagen.');
      }
    } else {
      alert('Keine Wallet gefunden. Bitte installiere MetaMask oder eine andere Web3-Wallet.');
    }
  };

  const tabs = [
    { id: 'wallet', label: 'Wallet', icon: '💰', count: transactions.length },
    { id: 'nfts', label: 'Meine NFTs', icon: '🖼️', count: userNFTs.length },
    { id: 'dao', label: 'DAO Governance', icon: '🏛️', count: dao?.proposals.length || 0 },
    { id: 'marketplace', label: 'Marktplatz', icon: '🛒', count: 0 },
    { id: 'staking', label: 'Staking', icon: '🏦', count: staking?.userStakes.length || 0 },
    { id: 'identity', label: 'Identität', icon: '🆔', count: 0 }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!walletConnected) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-12 text-white"
        >
          <div className="text-8xl mb-6">🔗</div>
          <h1 className="text-4xl font-bold mb-4">Wellness Blockchain</h1>
          <p className="text-xl text-white/90 mb-8">
            Verbinde deine Wallet, um auf NFTs, WellnessCoins und DAO-Features zuzugreifen
          </p>
          <button
            onClick={connectWallet}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Wallet verbinden
          </button>
          <div className="mt-8 text-white/80">
            <p className="text-sm">Unterstützte Wallets:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <span>MetaMask</span>
              <span>•</span>
              <span>WalletConnect</span>
              <span>•</span>
              <span>Coinbase Wallet</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Wellness Blockchain & NFTs
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          🔗 Achievement-NFTs, WellnessCoins, DAO-Governance und dezentrale Identität
        </p>
      </motion.div>

      {/* Wallet Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-medium text-green-800 dark:text-green-200">
              Wallet verbunden: {identity?.ens || 'zenmaster.wellness'}
            </span>
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            {wellnessCoin?.userBalance.toFixed(1)} WLC
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                : 'bg-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/20'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'wallet' && <WalletTab coin={wellnessCoin} transactions={transactions} />}
          {activeTab === 'nfts' && <NFTsTab nfts={userNFTs} />}
          {activeTab === 'dao' && <DAOTab dao={dao} />}
          {activeTab === 'marketplace' && <MarketplaceTab />}
          {activeTab === 'staking' && <StakingTab staking={staking} />}
          {activeTab === 'identity' && <IdentityTab identity={identity} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Wallet Tab Component
function WalletTab({ coin, transactions }: { coin: WellnessCoin | null; transactions: BlockchainTransaction[] }) {
  if (!coin) return null;

  return (
    <div className="space-y-6">
      {/* WellnessCoin Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{coin.userBalance.toFixed(1)}</div>
          <div className="text-white/80">WLC Balance</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">+{coin.earnedToday.toFixed(1)}</div>
          <div className="text-white/80">Heute verdient</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{coin.stakingBalance.toFixed(0)}</div>
          <div className="text-white/80">Im Staking</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">+{coin.stakingRewards.toFixed(1)}</div>
          <div className="text-white/80">Staking Rewards</div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          💳 Letzte Transaktionen
        </h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.hash} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'reward' ? 'bg-green-100 text-green-600' :
                  tx.type === 'stake' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {tx.type === 'reward' ? '🎁' : tx.type === 'stake' ? '🏦' : '💸'}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {tx.type === 'reward' ? 'Wellness Belohnung' :
                     tx.type === 'stake' ? 'Token Staking' :
                     'Transfer'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {tx.timestamp.toLocaleDateString()} {tx.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${
                  tx.type === 'reward' ? 'text-green-600' : 'text-gray-900 dark:text-white'
                }`}>
                  {tx.type === 'reward' ? '+' : '-'}{tx.amount} {tx.currency}
                </div>
                <div className="text-xs text-gray-500">{tx.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earn WellnessCoins */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">💰 WellnessCoins verdienen</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-xl p-4">
            <div className="font-medium mb-2">Tägliche Meditation</div>
            <div className="text-2xl font-bold">+50 WLC</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="font-medium mb-2">Dankbarkeits-Eintrag</div>
            <div className="text-2xl font-bold">+25 WLC</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="font-medium mb-2">Community Beitrag</div>
            <div className="text-2xl font-bold">+100 WLC</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// NFTs Tab Component
function NFTsTab({ nfts }: { nfts: WellnessNFT[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.map((nft) => (
        <motion.div
          key={nft.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <div className="text-center mb-4">
            <div className="text-6xl mb-2">{nft.image}</div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              nft.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
              nft.rarity === 'uncommon' ? 'bg-green-100 text-green-800' :
              nft.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
              nft.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
              nft.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {nft.rarity}
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
            {nft.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
            {nft.description}
          </p>
          
          <div className="space-y-2 mb-4">
            {nft.attributes.slice(0, 3).map((attr) => (
              <div key={attr.trait_type} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">{attr.trait_type}</span>
                <span className="font-medium text-gray-900 dark:text-white">{attr.value}</span>
              </div>
            ))}
          </div>
          
          <div className="mb-4">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Utilities:</div>
            {nft.utilities.slice(0, 2).map((utility) => (
              <div key={utility.type} className="text-xs bg-blue-50 dark:bg-blue-900/20 p-2 rounded mb-1">
                {utility.description}
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {nft.marketValue} WLC
            </div>
            <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
              nft.isListed
                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}>
              {nft.isListed ? 'Aus Markt nehmen' : 'Verkaufen'}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// DAO Tab Component
function DAOTab({ dao }: { dao: WellnessDAO | null }) {
  if (!dao) return null;

  return (
    <div className="space-y-6">
      {/* Treasury Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{(dao.treasury.totalFunds / 1000000).toFixed(1)}M</div>
          <div className="text-white/80">Gesamt-Treasury</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{(dao.treasury.availableFunds / 1000000).toFixed(1)}M</div>
          <div className="text-white/80">Verfügbar</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{dao.proposals.length}</div>
          <div className="text-white/80">Aktive Vorschläge</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">2.5K</div>
          <div className="text-white/80">DAO Mitglieder</div>
        </div>
      </div>

      {/* Active Proposals */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🏛️ Aktive Abstimmungen
        </h3>
        {dao.proposals.map((proposal) => (
          <div key={proposal.id} className="bg-white/5 rounded-xl p-6 mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {proposal.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {proposal.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Von: {proposal.creator}</span>
                  <span>•</span>
                  <span>Endet: {proposal.votingEnds.toLocaleDateString()}</span>
                  {proposal.fundingAmount && (
                    <>
                      <span>•</span>
                      <span>Finanzierung: {proposal.fundingAmount.toLocaleString()} WLC</span>
                    </>
                  )}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                proposal.status === 'active' ? 'bg-green-100 text-green-800' :
                proposal.status === 'passed' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {proposal.status}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Dafür: 75%</span>
                <span>Dagegen: 15%</span>
                <span>Enthaltung: 10%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-l-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600">
                Dafür stimmen
              </button>
              <button className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600">
                Dagegen stimmen
              </button>
              <button className="flex-1 bg-gray-500 text-white py-2 rounded-lg font-medium hover:bg-gray-600">
                Enthalten
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Marketplace Tab Component
function MarketplaceTab() {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🛒</div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        NFT Marktplatz
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Kaufe und verkaufe einzigartige Wellness-NFTs von der Community.
        Der Marktplatz wird in der nächsten Version verfügbar sein.
      </p>
      <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-xl font-medium">
        Marktplatz erkunden
      </button>
    </div>
  );
}

// Staking Tab Component
function StakingTab({ staking }: { staking: WellnessStaking | null }) {
  if (!staking) return null;

  return (
    <div className="space-y-6">
      {/* Staking Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{staking.totalStaked.toLocaleString()}</div>
          <div className="text-white/80">Gestakte WLC</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{staking.totalRewards.toFixed(1)}</div>
          <div className="text-white/80">Verdiente Rewards</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{staking.apy}%</div>
          <div className="text-white/80">Durchschnittl. APY</div>
        </div>
      </div>

      {/* Staking Pools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {staking.pools.map((pool) => (
          <div key={pool.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{pool.name}</h3>
              <div className="text-2xl font-bold text-green-600">{pool.apy}% APY</div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">{pool.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500">Min. Stake</div>
                <div className="font-medium">{pool.minimumStake} {pool.tokenRequired}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Lock-Zeit</div>
                <div className="font-medium">{pool.lockPeriod} Tage</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Teilnehmer</div>
                <div className="font-medium">{pool.participants.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Gesamt gestakt</div>
                <div className="font-medium">{pool.totalStaked.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">Belohnungen:</div>
              {pool.rewards.map((reward, index) => (
                <div key={index} className="text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded mb-1">
                  {reward.description}
                </div>
              ))}
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow">
              Staking starten
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Identity Tab Component
function IdentityTab({ identity }: { identity: WellnessIdentity | null }) {
  if (!identity) return null;

  return (
    <div className="space-y-6">
      {/* Identity Overview */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
        <h3 className="text-2xl font-bold mb-4">🆔 Dezentrale Wellness-Identität</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-white/80 text-sm">ENS Name</div>
            <div className="font-mono text-lg">{identity.ens}</div>
          </div>
          <div>
            <div className="text-white/80 text-sm">Wallet Adresse</div>
            <div className="font-mono text-sm">
              {identity.walletAddress.slice(0, 6)}...{identity.walletAddress.slice(-4)}
            </div>
          </div>
          <div>
            <div className="text-white/80 text-sm">DID</div>
            <div className="font-mono text-sm">
              {identity.did.slice(0, 20)}...
            </div>
          </div>
          <div>
            <div className="text-white/80 text-sm">Gesamt-Reputation</div>
            <div className="text-2xl font-bold">{identity.reputation.overall}/10</div>
          </div>
        </div>
      </div>

      {/* Reputation Breakdown */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🏆 Reputation nach Kategorien
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(identity.reputation.categories).map(([category, score]) => (
            <div key={category} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <span className="capitalize text-gray-900 dark:text-white">{category}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full"
                    style={{ width: `${(score / 10) * 100}%` }}
                  />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">{score.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🔒 Datenschutz-Einstellungen
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white">Profil-Sichtbarkeit</span>
            <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-900 dark:text-white">
              <option value="public">Öffentlich</option>
              <option value="friends">Freunde</option>
              <option value="private">Privat</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white">Aktivitäten-Sichtbarkeit</span>
            <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-900 dark:text-white">
              <option value="public">Öffentlich</option>
              <option value="anonymous">Anonym</option>
              <option value="private">Privat</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
