'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  WellnessGuild, 
  GuildChallenge, 
  MentorSession, 
  WellnessParty, 
  LifeRPGMultiplayer,
  SocialFeed,
  PlayerClass,
  WellnessRaid,
  SeasonalEvent,
  PvPChallenge,
  WellnessCategory
} from '@/types/community';

export default function CommunityFeatures2() {
  const [activeTab, setActiveTab] = useState<'guilds' | 'challenges' | 'mentoring' | 'parties' | 'rpg' | 'social'>('guilds');
  const [guilds, setGuilds] = useState<WellnessGuild[]>([]);
  const [challenges, setChallenges] = useState<GuildChallenge[]>([]);
  const [mentorSessions, setMentorSessions] = useState<MentorSession[]>([]);
  const [parties, setParties] = useState<WellnessParty[]>([]);
  const [rpgData, setRpgData] = useState<LifeRPGMultiplayer | null>(null);
  const [socialFeed, setSocialFeed] = useState<SocialFeed | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeCommunityFeatures();
  }, []);

  const initializeCommunityFeatures = async () => {
    setIsLoading(true);
    
    // Simuliere Datenladung
    setTimeout(() => {
      // Wellness Gilden initialisieren
      const sampleGuilds: WellnessGuild[] = [
        {
          id: 'mindful-masters',
          name: 'Achtsamkeits-Meister',
          description: 'Für alle, die ihre Meditation vertiefen möchten',
          icon: '🧘‍♀️',
          color: 'from-blue-500 to-purple-600',
          level: 12,
          members: [],
          challenges: [],
          achievements: [],
          foundedAt: new Date('2024-01-15'),
          memberCount: 48,
          averageWellnessLevel: 15,
          weeklyActivity: 92,
          specialization: 'stille'
        },
        {
          id: 'gratitude-guardians',
          name: 'Dankbarkeits-Wächter',
          description: 'Gemeinsam die Kraft der Dankbarkeit entdecken',
          icon: '🙏',
          color: 'from-green-500 to-teal-600',
          level: 8,
          members: [],
          challenges: [],
          achievements: [],
          foundedAt: new Date('2024-02-20'),
          memberCount: 35,
          averageWellnessLevel: 12,
          weeklyActivity: 87,
          specialization: 'dankbarkeit'
        },
        {
          id: 'transformation-titans',
          name: 'Transformations-Titanen',
          description: 'Für alle, die sich selbst neu erschaffen wollen',
          icon: '🦋',
          color: 'from-purple-500 to-pink-600',
          level: 15,
          members: [],
          challenges: [],
          achievements: [],
          foundedAt: new Date('2024-01-10'),
          memberCount: 62,
          averageWellnessLevel: 18,
          weeklyActivity: 95,
          specialization: 'transformation'
        }
      ];

      // Gilde Challenges
      const sampleChallenges: GuildChallenge[] = [
        {
          id: 'mindful-march',
          title: 'Achtsamkeits-März',
          description: '30 Tage täglich mindestens 10 Minuten meditieren',
          category: 'stille',
          type: 'guild',
          difficulty: 'medium',
          duration: 30,
          participants: ['user1', 'user2', 'user3'],
          requirements: [
            {
              type: 'meditation_minutes',
              target: 300,
              description: '300 Minuten Meditation in 30 Tagen'
            }
          ],
          rewards: [
            {
              type: 'badge',
              value: 1,
              name: 'Achtsamkeits-Meister',
              description: 'Für 30 Tage konstante Meditation',
              rarity: 'rare'
            },
            {
              type: 'xp',
              value: 500,
              name: 'Bonus XP',
              description: 'Erfahrungspunkte für Durchhaltevermögen',
              rarity: 'common'
            }
          ],
          startDate: new Date('2024-03-01'),
          endDate: new Date('2024-03-31'),
          status: 'active',
          leaderboard: [
            {
              userId: 'user1',
              username: 'ZenMaster',
              avatar: '🧘‍♂️',
              score: 285,
              progress: 95,
              rank: 1,
              achievements: ['early-bird', 'consistency-king']
            },
            {
              userId: 'user2',
              username: 'MindfulSoul',
              avatar: '🧘‍♀️',
              score: 240,
              progress: 80,
              rank: 2,
              achievements: ['meditation-streaker']
            }
          ]
        }
      ];

      // Life-RPG Multiplayer Data
      const sampleRPG: LifeRPGMultiplayer = {
        playerClass: {
          name: 'mindful_monk',
          level: 15,
          xp: 2800,
          skills: [
            {
              name: 'Tiefe Meditation',
              level: 8,
              xp: 1200,
              maxLevel: 10,
              description: 'Erhöht die Effektivität von Meditationssitzungen',
              icon: '🧘‍♂️',
              effects: [
                {
                  type: 'meditation_boost',
                  value: 25,
                  duration: 60
                }
              ]
            },
            {
              name: 'Emotionale Regulierung',
              level: 6,
              xp: 800,
              maxLevel: 10,
              description: 'Verbessert die Stimmungsstabilität',
              icon: '😌',
              effects: [
                {
                  type: 'mood_stability',
                  value: 20
                }
              ]
            }
          ],
          specialAbilities: [
            {
              name: 'Gruppenheilung',
              description: 'Teilt positive Energie mit allen Gruppenmitgliedern',
              cooldown: 24,
              effect: {
                type: 'heal',
                power: 50,
                targets: 'party',
                duration: 120
              }
            }
          ],
          equipment: [
            {
              slot: 'amulet',
              name: 'Amulett der Achtsamkeit',
              rarity: 'epic',
              stats: {
                mindfulness: 15,
                compassion: 10,
                resilience: 8,
                wisdom: 12,
                joy: 5
              },
              description: 'Ein seltenes Amulett, das die Achtsamkeit verstärkt',
              acquiredAt: new Date('2024-02-15')
            }
          ]
        },
        party: {
          id: 'wellness-warriors',
          name: 'Wellness-Krieger',
          members: ['user1', 'user2', 'user3', 'user4'],
          level: 12,
          achievements: ['first-raid-clear', 'perfect-harmony'],
          formation: {
            formation: 'balanced',
            bonuses: [
              {
                type: 'synergy_bonus',
                value: 15,
                description: 'Ausgewogene Klassen-Verteilung'
              }
            ]
          }
        },
        raids: [
          {
            id: 'stress-dragon',
            title: 'Der Stress-Drache',
            description: 'Gemeinsam den mächtigen Stress-Drachen besiegen',
            difficulty: 'hard',
            minPlayers: 4,
            maxPlayers: 8,
            duration: 7,
            objectives: [
              {
                id: 'collective-meditation',
                title: 'Kollektive Meditation',
                description: 'Gemeinsam 1000 Minuten meditieren',
                type: 'collective',
                target: 1000,
                progress: 650,
                isCompleted: false,
                category: 'stille'
              },
              {
                id: 'stress-reduction',
                title: 'Stressreduktion',
                description: 'Durchschnittliches Stresslevel um 30% senken',
                type: 'collective',
                target: 30,
                progress: 18,
                isCompleted: false,
                category: 'therapie'
              }
            ],
            rewards: [
              {
                type: 'equipment',
                name: 'Drachenschuppen-Schild',
                rarity: 'legendary',
                value: 1
              },
              {
                type: 'title',
                name: 'Drachenbesieger',
                rarity: 'epic',
                value: 1
              }
            ],
            participants: [
              {
                userId: 'user1',
                username: 'ZenMaster',
                class: 'mindful_monk',
                level: 15,
                contribution: 180,
                joinedAt: new Date('2024-03-01'),
                isActive: true
              }
            ],
            status: 'active',
            startDate: new Date('2024-03-01'),
            endDate: new Date('2024-03-08')
          }
        ],
        pvpChallenges: [
          {
            id: 'meditation-duel',
            challengerId: 'user1',
            challengedId: 'user2',
            category: 'stille',
            wager: 100,
            duration: 3,
            status: 'active',
            createdAt: new Date('2024-03-05')
          }
        ],
        seasonalEvents: [
          {
            id: 'spring-awakening',
            name: 'Frühlingserwachen',
            theme: 'Erneuerung und Wachstum',
            description: 'Feiere den Frühling mit besonderen Wellness-Aktivitäten',
            startDate: new Date('2024-03-20'),
            endDate: new Date('2024-04-20'),
            activities: [
              {
                id: 'nature-meditation',
                name: 'Natur-Meditation',
                description: 'Meditiere im Freien für Extra-Belohnungen',
                requirements: ['outdoor_location'],
                rewards: [
                  {
                    type: 'seasonal_item',
                    name: 'Frühlingsblüten-Krone',
                    description: 'Exklusiver Frühlingsschmuck',
                    rarity: 'rare'
                  }
                ],
                timeLimit: 30
              }
            ],
            rewards: [
              {
                type: 'exclusive_title',
                name: 'Frühlingserwachen-Champion',
                description: 'Für die Teilnahme am Frühlingserwachen-Event',
                rarity: 'epic'
              }
            ],
            leaderboard: {
              entries: [],
              season: 'Frühling 2024',
              prizes: [
                {
                  rank: 1,
                  reward: {
                    type: 'limited_badge',
                    name: 'Frühlings-Meister',
                    description: 'Platz 1 beim Frühlingserwachen',
                    rarity: 'legendary'
                  },
                  description: 'Für den ersten Platz'
                }
              ]
            },
            isActive: true
          }
        ]
      };

      // Social Feed
      const sampleSocialFeed: SocialFeed = {
        posts: [
          {
            id: 'post1',
            userId: 'user1',
            username: 'ZenMaster',
            avatar: '🧘‍♂️',
            content: 'Gerade meine 100-Tage Meditation-Serie abgeschlossen! 🎉 Die Reise hat mich so viel gelehrt.',
            type: 'achievement',
            timestamp: new Date('2024-03-05T10:30:00'),
            likes: 24,
            comments: [
              {
                id: 'comment1',
                userId: 'user2',
                username: 'MindfulSoul',
                avatar: '🧘‍♀️',
                content: 'Wow, das ist unglaublich! Welche Veränderungen hast du bemerkt?',
                timestamp: new Date('2024-03-05T11:00:00'),
                likes: 3,
                replies: []
              }
            ],
            shares: 5,
            tags: ['meditation', '100dayschallenge', 'achievement'],
            isLiked: false,
            isBookmarked: true
          }
        ],
        trending: [
          {
            tag: 'mindfulness',
            posts: 145,
            growth: 23,
            category: 'stille'
          },
          {
            tag: 'gratitude',
            posts: 89,
            growth: 18,
            category: 'dankbarkeit'
          }
        ],
        recommendations: [
          {
            userId: 'user3',
            username: 'WisdomSeeker',
            avatar: '🦉',
            reason: 'Ähnliche Meditation-Interessen',
            compatibility: 87,
            sharedInterests: ['stille', 'transformation']
          }
        ]
      };

      setGuilds(sampleGuilds);
      setChallenges(sampleChallenges);
      setRpgData(sampleRPG);
      setSocialFeed(sampleSocialFeed);
      setIsLoading(false);
    }, 1000);
  };

  const tabs = [
    { id: 'guilds', label: 'Wellness-Gilden', icon: '🏰', count: guilds.length },
    { id: 'challenges', label: 'Herausforderungen', icon: '⚔️', count: challenges.length },
    { id: 'mentoring', label: 'Mentoring', icon: '👨‍🏫', count: mentorSessions.length },
    { id: 'parties', label: 'Wellness-Parties', icon: '🎉', count: parties.length },
    { id: 'rpg', label: 'Life-RPG', icon: '🎮', count: rpgData?.raids.length || 0 },
    { id: 'social', label: 'Social Feed', icon: '📱', count: socialFeed?.posts.length || 0 }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
          Community & Social Features 2.0
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          🚀 Multiplayer Life-RPG, Wellness-Gilden, Mentoring und soziale Verbindungen
        </p>
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
          {activeTab === 'guilds' && <GuildsTab guilds={guilds} />}
          {activeTab === 'challenges' && <ChallengesTab challenges={challenges} />}
          {activeTab === 'mentoring' && <MentoringTab sessions={mentorSessions} />}
          {activeTab === 'parties' && <PartiesTab parties={parties} />}
          {activeTab === 'rpg' && <RPGTab rpgData={rpgData} />}
          {activeTab === 'social' && <SocialTab socialFeed={socialFeed} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Guilds Tab Component
function GuildsTab({ guilds }: { guilds: WellnessGuild[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guilds.map((guild) => (
        <motion.div
          key={guild.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className={`bg-gradient-to-br ${guild.color} rounded-2xl p-6 text-white shadow-xl`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">{guild.icon}</span>
            <div className="text-right">
              <div className="text-sm opacity-80">Level</div>
              <div className="text-2xl font-bold">{guild.level}</div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-2">{guild.name}</h3>
          <p className="text-white/80 mb-4">{guild.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold">{guild.memberCount}</div>
              <div className="text-xs opacity-80">Mitglieder</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{guild.weeklyActivity}%</div>
              <div className="text-xs opacity-80">Aktivität</div>
            </div>
          </div>
          
          <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl py-3 font-medium hover:bg-white/30 transition-colors">
            Beitreten
          </button>
        </motion.div>
      ))}
    </div>
  );
}

// Challenges Tab Component
function ChallengesTab({ challenges }: { challenges: GuildChallenge[] }) {
  return (
    <div className="space-y-6">
      {challenges.map((challenge) => (
        <motion.div
          key={challenge.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {challenge.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{challenge.description}</p>
            </div>
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                challenge.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {challenge.difficulty}
              </div>
              <div className="text-sm text-gray-500">
                {challenge.duration} Tage
              </div>
            </div>
          </div>
          
          {/* Leaderboard */}
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Bestenliste</h4>
            <div className="space-y-2">
              {challenge.leaderboard.slice(0, 3).map((entry, index) => (
                <div key={entry.userId} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-400 text-gray-900' :
                      'bg-orange-400 text-orange-900'
                    }`}>
                      {entry.rank}
                    </div>
                    <span className="text-gray-900 dark:text-white">{entry.username}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-white">{entry.score}p</div>
                    <div className="text-xs text-gray-500">{entry.progress}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl py-3 font-medium hover:shadow-lg transition-shadow">
            Challenge beitreten
          </button>
        </motion.div>
      ))}
    </div>
  );
}

// Mentoring Tab Component
function MentoringTab({ sessions }: { sessions: MentorSession[] }) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">👨‍🏫</div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Mentoring-System
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Finde erfahrene Mentoren oder werde selbst zum Mentor.
        Das Mentoring-System wird in der nächsten Version verfügbar sein.
      </p>
      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium">
        Als Mentor anmelden
      </button>
    </div>
  );
}

// Parties Tab Component
function PartiesTab({ parties }: { parties: WellnessParty[] }) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🎉</div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Wellness-Parties
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Gemeinsame Meditation-Sessions, Dankbarkeits-Runden und Wellness-Aktivitäten.
        Bald verfügbar!
      </p>
      <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium">
        Party erstellen
      </button>
    </div>
  );
}

// RPG Tab Component
function RPGTab({ rpgData }: { rpgData: LifeRPGMultiplayer | null }) {
  if (!rpgData) return null;

  return (
    <div className="space-y-8">
      {/* Player Class */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
        <h3 className="text-2xl font-bold mb-4">Deine Klasse: Achtsamkeits-Mönch</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{rpgData.playerClass.level}</div>
            <div className="text-white/80">Level</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{rpgData.playerClass.xp}</div>
            <div className="text-white/80">XP</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{rpgData.playerClass.skills.length}</div>
            <div className="text-white/80">Fähigkeiten</div>
          </div>
        </div>
      </div>

      {/* Active Raids */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Aktive Raids</h3>
        {rpgData.raids.map((raid) => (
          <div key={raid.id} className="bg-white/5 rounded-xl p-4 mb-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{raid.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{raid.description}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                raid.difficulty === 'normal' ? 'bg-green-100 text-green-800' :
                raid.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                raid.difficulty === 'nightmare' ? 'bg-purple-100 text-purple-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {raid.difficulty}
              </div>
            </div>
            
            <div className="space-y-2">
              {raid.objectives.map((objective) => (
                <div key={objective.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{objective.title}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                        style={{ width: `${(objective.progress / objective.target) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {objective.progress}/{objective.target}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Seasonal Events */}
      <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">🌸 Saisonales Event: Frühlingserwachen</h3>
        <p className="text-white/90 mb-4">
          Feiere den Frühling mit besonderen Wellness-Aktivitäten und erhalte exklusive Belohnungen!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-xl p-4">
            <h4 className="font-medium mb-2">Natur-Meditation</h4>
            <p className="text-sm text-white/80">Meditiere im Freien für Extra-Belohnungen</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <h4 className="font-medium mb-2">Frühlingserwachen-Challenge</h4>
            <p className="text-sm text-white/80">30 Tage Wellness-Aktivitäten</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Social Tab Component
function SocialTab({ socialFeed }: { socialFeed: SocialFeed | null }) {
  if (!socialFeed) return null;

  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 Trending</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialFeed.trending.map((topic) => (
            <div key={topic.tag} className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">#{topic.tag}</span>
                <span className="text-sm text-green-600 dark:text-green-400">+{topic.growth}%</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {topic.posts} Beiträge
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Posts */}
      <div className="space-y-4">
        {socialFeed.posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-start space-x-4">
              <div className="text-2xl">{post.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{post.username}</span>
                  <span className="text-sm text-gray-500">
                    {post.timestamp.toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    post.type === 'achievement' ? 'bg-yellow-100 text-yellow-800' :
                    post.type === 'insight' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {post.type}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-red-500">
                    <span>❤️</span>
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500">
                    <span>💬</span>
                    <span>{post.comments.length}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-500">
                    <span>🔄</span>
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
