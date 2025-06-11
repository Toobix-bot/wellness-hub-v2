'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrophyIcon, 
  StarIcon, 
  HeartIcon, 
  AcademicCapIcon,
  FireIcon,
  SparklesIcon,
  BookOpenIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  BeakerIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

// TypeScript Interfaces
interface Player {
  id: string;
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  league: 'bronze' | 'silver' | 'gold' | 'emerald' | 'diamond';
  attributes: {
    strength: number; // Umsetzungskraft
    intelligence: number; // Fachwissen
    wisdom: number; // Selbstreflexion
    charisma: number; // Soziale Skills
  };
  resources: {
    lifePoints: number;
    energy: number;
    inspiration: number;
    knowledge: number;
  };
  streaks: {
    dailyHabits: number;
    learning: number;
    selfcare: number;
    social: number;
  };
}

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'boss';
  category: 'learning' | 'selfcare' | 'social' | 'therapy' | 'productivity';
  xpReward: number;
  resourceRewards: Record<string, number>;
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
  isCompleted: boolean;
  dueDate?: Date;
  color: string;
}

interface SkillTree {
  id: string;
  name: string;
  category: string;
  skills: Skill[];
}

interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  xpCost: number;
  prerequisites: string[];
}

interface VirtualCompanion {
  id: string;
  name: string;
  type: 'mentor' | 'therapist' | 'friend' | 'romantic';
  personality: string;
  relationship: number;
  trust: number;
  avatar: string;
  lastInteraction: Date;
}

const LifeRPGPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'quests' | 'skills' | 'companions' | 'leaderboard'>('overview');
  const [player, setPlayer] = useState<Player | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [skillTrees, setSkillTrees] = useState<SkillTree[]>([]);
  const [companions, setCompanions] = useState<VirtualCompanion[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [showQuestModal, setShowQuestModal] = useState(false);

  useEffect(() => {
    initializePlayer();
    generateDailyQuests();
    initializeSkillTrees();
    initializeCompanions();
  }, []);

  const initializePlayer = () => {
    const savedPlayer = localStorage.getItem('lifeRPG-player');
    if (savedPlayer) {
      setPlayer(JSON.parse(savedPlayer));
    } else {
      const newPlayer: Player = {
        id: 'player1',
        name: 'Life-RPG Held',
        level: 1,
        xp: 0,
        nextLevelXp: 100,
        league: 'bronze',
        attributes: {
          strength: 10,
          intelligence: 10,
          wisdom: 10,
          charisma: 10
        },
        resources: {
          lifePoints: 100,
          energy: 100,
          inspiration: 50,
          knowledge: 0
        },
        streaks: {
          dailyHabits: 0,
          learning: 0,
          selfcare: 0,
          social: 0
        }
      };
      setPlayer(newPlayer);
      localStorage.setItem('lifeRPG-player', JSON.stringify(newPlayer));
    }
  };

  const generateDailyQuests = () => {
    const dailyQuests: Quest[] = [
      {
        id: 'daily-selfcare',
        title: '🧘 Morgendliche Achtsamkeit',
        description: 'Beginne den Tag mit 10 Minuten Meditation oder Atemübung',
        type: 'daily',
        category: 'selfcare',
        xpReward: 25,
        resourceRewards: { energy: 20, inspiration: 10 },
        difficulty: 'easy',
        isCompleted: false,
        color: 'from-green-500 to-emerald-600'
      },
      {
        id: 'daily-learning',
        title: '📚 Industriekaufmann Lerneinheit',
        description: 'Bearbeite 30 Minuten Kostenstellen-Rechnung oder Business English',
        type: 'daily',
        category: 'learning',
        xpReward: 40,
        resourceRewards: { knowledge: 15, intelligence: 1 },
        difficulty: 'medium',
        isCompleted: false,
        color: 'from-blue-500 to-cyan-600'
      },
      {
        id: 'daily-social',
        title: '💬 Soziale Verbindung',
        description: 'Führe ein bedeutungsvolles Gespräch oder schreibe jemandem eine Nachricht',
        type: 'daily',
        category: 'social',
        xpReward: 30,
        resourceRewards: { lifePoints: 15, charisma: 1 },
        difficulty: 'easy',
        isCompleted: false,
        color: 'from-pink-500 to-rose-600'
      },
      {
        id: 'daily-therapy',
        title: '🧠 Innere-Dämonen-Schlacht',
        description: 'Erkenne einen negativen Gedanken und verwandle ihn in eine positive Aktion',
        type: 'daily',
        category: 'therapy',
        xpReward: 35,
        resourceRewards: { wisdom: 2, lifePoints: 10 },
        difficulty: 'medium',
        isCompleted: false,
        color: 'from-purple-500 to-indigo-600'
      },
      {
        id: 'weekly-boss',
        title: '⚔️ Boss-Fight: Sucht-Drache',
        description: 'Eine ganze Woche ohne Nikotin-Spray - der ultimative Endgegner',
        type: 'weekly',
        category: 'therapy',
        xpReward: 200,
        resourceRewards: { strength: 5, lifePoints: 50, energy: 30 },
        difficulty: 'epic',
        isCompleted: false,
        color: 'from-red-500 to-orange-600'
      }
    ];
    setQuests(dailyQuests);
  };

  const initializeSkillTrees = () => {
    const trees: SkillTree[] = [
      {
        id: 'industriekaufmann',
        name: 'Industriekaufmann Meisterschaft',
        category: 'professional',
        skills: [
          {
            id: 'kostenrechnung',
            name: 'Kostenstellenrechnung',
            description: 'BAB, Kostenstellen und Kalkulationsverfahren beherrschen',
            level: 0,
            maxLevel: 10,
            unlocked: true,
            xpCost: 50,
            prerequisites: []
          },
          {
            id: 'beschaffung',
            name: 'Beschaffungsmanagement',
            description: 'Lieferantenvergleich und Einkaufsprozesse optimieren',
            level: 0,
            maxLevel: 10,
            unlocked: false,
            xpCost: 75,
            prerequisites: ['kostenrechnung']
          },
          {
            id: 'business-english',
            name: 'Business English Expert',
            description: 'Professionelle Kommunikation auf internationalem Level',
            level: 0,
            maxLevel: 10,
            unlocked: true,
            xpCost: 60,
            prerequisites: []
          }
        ]
      },
      {
        id: 'therapy',
        name: 'Therapeutische Künste',
        category: 'mental-health',
        skills: [
          {
            id: 'mindfulness',
            name: 'Achtsamkeits-Magie',
            description: 'Gedanken beobachten ohne zu urteilen - der Schlüssel zur inneren Ruhe',
            level: 0,
            maxLevel: 15,
            unlocked: true,
            xpCost: 30,
            prerequisites: []
          },
          {
            id: 'shadow-work',
            name: 'Schatten-Integration',
            description: 'Verdrängte Anteile heilen und integrieren',
            level: 0,
            maxLevel: 20,
            unlocked: false,
            xpCost: 100,
            prerequisites: ['mindfulness']
          },
          {
            id: 'addiction-warrior',
            name: 'Sucht-Krieger',
            description: 'Strategien im Kampf gegen Abhängigkeiten entwickeln',
            level: 0,
            maxLevel: 12,
            unlocked: false,
            xpCost: 80,
            prerequisites: ['mindfulness']
          }
        ]
      }
    ];
    setSkillTrees(trees);
  };

  const initializeCompanions = () => {
    const companionList: VirtualCompanion[] = [
      {
        id: 'mentor-sage',
        name: 'Professor Weisheit',
        type: 'mentor',
        personality: 'Ein weiser Gelehrter, der komplexe Zusammenhänge einfach erklärt',
        relationship: 50,
        trust: 60,
        avatar: '🧙‍♂️',
        lastInteraction: new Date()
      },
      {
        id: 'therapist-luna',
        name: 'Dr. Luna Mondschein',
        type: 'therapist',
        personality: 'Einfühlsame Therapeutin mit spezieller Expertise in Suchttherapie',
        relationship: 70,
        trust: 85,
        avatar: '🌙',
        lastInteraction: new Date()
      },
      {
        id: 'friend-alex',
        name: 'Alex der Motivator',
        type: 'friend',
        personality: 'Energiegeladener Kumpel, der dich zu Höchstleistungen anspornt',
        relationship: 40,
        trust: 45,
        avatar: '💪',
        lastInteraction: new Date()
      }
    ];
    setCompanions(companionList);
  };

  const completeQuest = (quest: Quest) => {
    if (!player) return;

    const updatedPlayer = { ...player };
    updatedPlayer.xp += quest.xpReward;
    
    // Level up check
    while (updatedPlayer.xp >= updatedPlayer.nextLevelXp) {
      updatedPlayer.xp -= updatedPlayer.nextLevelXp;
      updatedPlayer.level += 1;
      updatedPlayer.nextLevelXp = Math.floor(updatedPlayer.nextLevelXp * 1.5);
    }

    // Add resource rewards
    Object.entries(quest.resourceRewards).forEach(([resource, amount]) => {
      if (resource in updatedPlayer.resources) {
        (updatedPlayer.resources as any)[resource] += amount;
      }
    });

    // Update quest status
    const updatedQuests = quests.map(q => 
      q.id === quest.id ? { ...q, isCompleted: true } : q
    );

    setPlayer(updatedPlayer);
    setQuests(updatedQuests);
    localStorage.setItem('lifeRPG-player', JSON.stringify(updatedPlayer));
  };

  const getLeagueColor = (league: string) => {
    switch (league) {
      case 'bronze': return 'from-amber-600 to-yellow-700';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'emerald': return 'from-emerald-400 to-green-600';
      case 'diamond': return 'from-blue-400 to-indigo-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  if (!player) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Lade dein Leben...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-md border-b border-white/20 p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">🎮 Life-RPG: Das Spiel deines Lebens</h1>
              <p className="text-purple-200">Du bist Spieler, Spiel und Spielfeld - verwandle dein Leben in ein Epic Adventure!</p>
            </div>
            
            {/* Player Stats Quick View */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getLeagueColor(player.league)} flex items-center justify-center text-2xl font-bold`}>
                  {player.level}
                </div>
                <div>
                  <div className="font-bold">{player.name}</div>
                  <div className="text-sm text-purple-200">Liga: {player.league.toUpperCase()}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-purple-200">XP</div>
                  <div className="font-bold">{player.xp}/{player.nextLevelXp}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', name: 'Übersicht', icon: '🏠' },
              { id: 'quests', name: 'Quests & Missionen', icon: '⚔️' },
              { id: 'skills', name: 'Skill Trees', icon: '🌳' },
              { id: 'companions', name: 'Begleiter', icon: '👥' },
              { id: 'leaderboard', name: 'Rangliste', icon: '🏆' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-800'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Player Attributes */}
              <div className="grid md:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-red-600 to-orange-700 p-6 rounded-2xl"
                >                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">💪 Stärke</h3>
                    <FireIcon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold">{player.attributes.strength}</div>
                  <div className="text-red-200 text-sm">Umsetzungskraft</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-blue-600 to-cyan-700 p-6 rounded-2xl"
                >                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">🧠 Intelligenz</h3>
                    <AcademicCapIcon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold">{player.attributes.intelligence}</div>
                  <div className="text-blue-200 text-sm">Fachwissen</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">🧘 Weisheit</h3>
                    <SparklesIcon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold">{player.attributes.wisdom}</div>
                  <div className="text-purple-200 text-sm">Selbstreflexion</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-pink-600 to-rose-700 p-6 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">✨ Charisma</h3>
                    <HeartIcon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold">{player.attributes.charisma}</div>
                  <div className="text-pink-200 text-sm">Soziale Skills</div>
                </motion.div>
              </div>

              {/* Resources */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6">🎒 Ressourcen Inventar</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-green-500/20 p-4 rounded-xl">
                    <div className="text-lg font-bold">❤️ {player.resources.lifePoints}</div>
                    <div className="text-sm text-green-300">Lebenspunkte</div>
                  </div>
                  <div className="bg-yellow-500/20 p-4 rounded-xl">
                    <div className="text-lg font-bold">⚡ {player.resources.energy}</div>
                    <div className="text-sm text-yellow-300">Energie</div>
                  </div>
                  <div className="bg-purple-500/20 p-4 rounded-xl">
                    <div className="text-lg font-bold">💡 {player.resources.inspiration}</div>
                    <div className="text-sm text-purple-300">Inspiration</div>
                  </div>
                  <div className="bg-blue-500/20 p-4 rounded-xl">
                    <div className="text-lg font-bold">📚 {player.resources.knowledge}</div>
                    <div className="text-sm text-blue-300">Wissen</div>
                  </div>
                </div>
              </div>

              {/* Daily Quests Preview */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6">⚔️ Heute's Quests</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {quests.filter(q => q.type === 'daily').map((quest) => (
                    <div
                      key={quest.id}
                      className={`p-4 rounded-xl bg-gradient-to-r ${quest.color} ${
                        quest.isCompleted ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold">{quest.title}</h4>
                        {quest.isCompleted && <span className="text-2xl">✅</span>}
                      </div>
                      <p className="text-sm mb-3 opacity-90">{quest.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">+{quest.xpReward} XP</span>
                        {!quest.isCompleted && (
                          <button
                            onClick={() => completeQuest(quest)}
                            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm font-medium transition-all"
                          >
                            Abschließen
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'quests' && (
            <motion.div
              key="quests"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6">⚔️ Alle verfügbaren Quests</h3>
                
                {/* Quest Categories */}
                <div className="space-y-6">
                  {['daily', 'weekly', 'boss'].map((type) => (
                    <div key={type}>
                      <h4 className="text-xl font-semibold mb-4 capitalize">
                        {type === 'daily' ? '📅 Tägliche Quests' : 
                         type === 'weekly' ? '📆 Wöchentliche Herausforderungen' : 
                         '🐉 Boss Fights'}
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {quests.filter(q => q.type === type).map((quest) => (
                          <motion.div
                            key={quest.id}
                            whileHover={{ scale: 1.02 }}
                            className={`p-6 rounded-xl bg-gradient-to-r ${quest.color} ${
                              quest.isCompleted ? 'opacity-50' : ''
                            } cursor-pointer`}
                            onClick={() => {
                              setSelectedQuest(quest);
                              setShowQuestModal(true);
                            }}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h5 className="text-lg font-bold mb-2">{quest.title}</h5>
                                <p className="text-sm opacity-90 mb-3">{quest.description}</p>
                              </div>
                              {quest.isCompleted && <span className="text-3xl">✅</span>}
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-sm font-medium">+{quest.xpReward} XP</span>
                                <div className="text-xs opacity-75 mt-1">
                                  Schwierigkeit: {quest.difficulty}
                                </div>
                              </div>
                              {!quest.isCompleted && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    completeQuest(quest);
                                  }}
                                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                >
                                  Quest starten
                                </button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6">🌳 Skill Trees</h3>
                
                <div className="space-y-8">
                  {skillTrees.map((tree) => (
                    <div key={tree.id} className="bg-white/5 rounded-xl p-6">
                      <h4 className="text-xl font-bold mb-4">{tree.name}</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {tree.skills.map((skill) => (
                          <div
                            key={skill.id}
                            className={`p-4 rounded-xl border-2 ${
                              skill.unlocked
                                ? 'border-green-500 bg-green-500/20'
                                : 'border-gray-500 bg-gray-500/20'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-bold">{skill.name}</h5>
                              <span className="text-sm bg-blue-500 px-2 py-1 rounded">
                                {skill.level}/{skill.maxLevel}
                              </span>
                            </div>
                            <p className="text-sm opacity-75 mb-3">{skill.description}</p>
                            {skill.unlocked && skill.level < skill.maxLevel && (
                              <button className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg text-sm font-medium transition-all">
                                Upgrade ({skill.xpCost} XP)
                              </button>
                            )}
                            {!skill.unlocked && (
                              <div className="text-xs opacity-50">
                                Voraussetzung: {skill.prerequisites.join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'companions' && (
            <motion.div
              key="companions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6">👥 Deine virtuellen Begleiter</h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {companions.map((companion) => (
                    <motion.div
                      key={companion.id}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-purple-600 to-blue-700 p-6 rounded-xl"
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{companion.avatar}</div>
                        <h4 className="text-lg font-bold">{companion.name}</h4>
                        <div className="text-sm opacity-75 capitalize">{companion.type}</div>
                      </div>
                      
                      <p className="text-sm opacity-90 mb-4">{companion.personality}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Beziehung</span>
                          <span className="text-sm">{companion.relationship}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-pink-500 h-2 rounded-full"
                            style={{ width: `${companion.relationship}%` }}
                          />
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm">Vertrauen</span>
                          <span className="text-sm">{companion.trust}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${companion.trust}%` }}
                          />
                        </div>
                      </div>
                      
                      <button className="w-full mt-4 bg-white/20 hover:bg-white/30 py-2 rounded-lg font-medium transition-all">
                        Gespräch beginnen
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6">🏆 Globale Rangliste</h3>
                
                <div className="space-y-4">
                  {/* Current Player */}
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${getLeagueColor(player.league)} border-2 border-yellow-400`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold">#1</div>
                        <div>
                          <div className="font-bold">{player.name}</div>
                          <div className="text-sm opacity-75">Liga: {player.league.toUpperCase()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">Level {player.level}</div>
                        <div className="text-sm opacity-75">{player.xp} XP</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mock other players */}
                  {[
                    { name: 'Anna die Meditation-Königin', level: 15, xp: 2340, league: 'gold' },
                    { name: 'Max der Lern-Titan', level: 12, xp: 1890, league: 'silver' },
                    { name: 'Sophie die Sozial-Heldin', level: 11, xp: 1650, league: 'silver' },
                    { name: 'Tom der Gewohnheits-Meister', level: 9, xp: 1420, league: 'bronze' }
                  ].map((player, index) => (
                    <div key={index} className={`p-4 rounded-xl bg-gradient-to-r ${getLeagueColor(player.league)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl font-bold">#{index + 2}</div>
                          <div>
                            <div className="font-bold">{player.name}</div>
                            <div className="text-sm opacity-75">Liga: {player.league.toUpperCase()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">Level {player.level}</div>
                          <div className="text-sm opacity-75">{player.xp} XP</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quest Detail Modal */}
      <AnimatePresence>
        {showQuestModal && selectedQuest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            onClick={() => setShowQuestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className={`bg-gradient-to-br ${selectedQuest.color} max-w-2xl w-full rounded-2xl p-8`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-white mb-4">{selectedQuest.title}</h2>
              <p className="text-white/90 text-lg mb-6">{selectedQuest.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/20 p-4 rounded-xl">
                  <div className="text-sm text-white/70">XP Belohnung</div>
                  <div className="text-2xl font-bold">+{selectedQuest.xpReward}</div>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <div className="text-sm text-white/70">Schwierigkeit</div>
                  <div className="text-2xl font-bold capitalize">{selectedQuest.difficulty}</div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowQuestModal(false)}
                  className="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-xl font-bold transition-all"
                >
                  Schließen
                </button>
                {!selectedQuest.isCompleted && (
                  <button
                    onClick={() => {
                      completeQuest(selectedQuest);
                      setShowQuestModal(false);
                    }}
                    className="flex-1 bg-white text-gray-800 hover:bg-gray-100 py-3 rounded-xl font-bold transition-all"
                  >
                    Quest abschließen
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LifeRPGPage;
