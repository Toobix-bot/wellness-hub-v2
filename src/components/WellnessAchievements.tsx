'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { userStatsStorage, activitiesStorage } from '@/utils/wellnessStorage';
import { wellnessModules } from '@/utils/wellnessConfig';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'beginner' | 'advanced' | 'expert' | 'legendary' | 'scientific';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  progress: number; // 0-100
  requirements: {
    type: 'sessions' | 'streak' | 'modules' | 'points' | 'specific';
    value: number;
    moduleId?: string;
    description: string;
  };
  rewards: {
    xp: number;
    title?: string;
    feature?: string;
  };
  scientificFact?: string;
  rarenessBadge?: string;
}

const achievementDefinitions: Achievement[] = [
  // Beginner Achievements
  {
    id: 'first-session',
    title: 'Wellness-Entdecker',
    description: 'Deine erste Wellness-Session abgeschlossen',
    icon: '🌱',
    category: 'beginner',
    rarity: 'common',
    progress: 0,
    requirements: {
      type: 'sessions',
      value: 1,
      description: 'Schließe eine Wellness-Session ab'
    },
    rewards: { xp: 50 },
    scientificFact: 'Bereits eine einzige Meditation kann das Stresslevel messbar reduzieren.'
  },
  {
    id: 'week-warrior',
    title: 'Wochen-Krieger',
    description: '7 Tage in Folge aktiv',
    icon: '🔥',
    category: 'beginner',
    rarity: 'common',
    progress: 0,
    requirements: {
      type: 'streak',
      value: 7,
      description: '7 Tage Streak erreichen'
    },
    rewards: { xp: 200, title: 'Wochen-Krieger' },
    scientificFact: 'Es dauert durchschnittlich 66 Tage, um eine neue Gewohnheit zu etablieren.'
  },

  // Advanced Achievements
  {
    id: 'month-master',
    title: 'Monats-Meister',
    description: '30 Tage Wellness-Streak',
    icon: '👑',
    category: 'advanced',
    rarity: 'rare',
    progress: 0,
    requirements: {
      type: 'streak',
      value: 30,
      description: '30 Tage Streak halten'
    },
    rewards: { xp: 1000, title: 'Monats-Meister', feature: 'Advanced Analytics' },
    scientificFact: 'Nach 30 Tagen regelmäßiger Praxis zeigen Gehirnscans strukturelle Veränderungen.'
  },
  {
    id: 'module-explorer',
    title: 'Modul-Entdecker',
    description: 'Alle Wellness-Module ausprobiert',
    icon: '🗺️',
    category: 'advanced',
    rarity: 'rare',
    progress: 0,
    requirements: {
      type: 'modules',
      value: 8,
      description: 'In allen Hauptmodulen aktiv sein'
    },
    rewards: { xp: 800, title: 'Wellness-Explorer' },
    scientificFact: 'Vielfältige Wellness-Praktiken aktivieren verschiedene Gehirnregionen optimal.'
  },

  // Expert Achievements
  {
    id: 'meditation-master',
    title: 'Meditations-Meister',
    description: '100 Stunden Meditation',
    icon: '🧘‍♂️',
    category: 'expert',
    rarity: 'epic',
    progress: 0,
    requirements: {
      type: 'specific',
      value: 6000, // 100 hours in minutes
      moduleId: 'stille',
      description: '100 Stunden in Meditation verbringen'
    },
    rewards: { xp: 2000, title: 'Zen-Meister', feature: 'Custom Meditation Sounds' },
    scientificFact: 'Nach 100 Stunden Meditation zeigt sich eine 25% Zunahme der grauen Substanz im Hippocampus.'
  },
  {
    id: 'transformation-titan',
    title: 'Transformations-Titan',
    description: 'Tiefgreifende persönliche Veränderung',
    icon: '🦋',
    category: 'expert',
    rarity: 'epic',
    progress: 0,
    requirements: {
      type: 'points',
      value: 10000,
      description: '10.000 Wellness-Punkte sammeln'
    },
    rewards: { xp: 2500, title: 'Transformations-Guru' },
    scientificFact: 'Neuroplastizität ermöglicht lebenslange Veränderung der Gehirnstruktur.'
  },

  // Legendary Achievements
  {
    id: 'year-legend',
    title: 'Jahres-Legende',
    description: '365 Tage Wellness-Streak',
    icon: '🌟',
    category: 'legendary',
    rarity: 'legendary',
    progress: 0,
    requirements: {
      type: 'streak',
      value: 365,
      description: 'Ein ganzes Jahr aktiv bleiben'
    },
    rewards: { xp: 10000, title: 'Wellness-Legende', feature: 'Legendary Status' },
    scientificFact: 'Ein Jahr konsequenter Wellness-Praxis kann die Lebenserwartung um 2-3 Jahre erhöhen.',
    rarenessBadge: '✨ Nur 0.1% erreichen dies'
  },

  // Scientific Achievements
  {
    id: 'consciousness-scientist',
    title: 'Bewusstseins-Wissenschaftler',
    description: 'Alle Bewusstseinszustände erforscht',
    icon: '🧠',
    category: 'scientific',
    rarity: 'epic',
    progress: 0,
    requirements: {
      type: 'specific',
      value: 20,
      moduleId: 'bewusstsein',
      description: '20 Sessions im Bewusstseins-Modul'
    },
    rewards: { xp: 1500, title: 'Bewusstseins-Forscher' },
    scientificFact: 'Verschiedene Bewusstseinszustände produzieren messbar unterschiedliche Gehirnwellen.'
  },
  {
    id: 'data-driven-wellness',
    title: 'Datengetriebener Wellness-Pionier',
    description: 'Wissenschaftliche Ansätze gemeistert',
    icon: '📊',
    category: 'scientific',
    rarity: 'rare',
    progress: 0,
    requirements: {
      type: 'specific',
      value: 50,
      description: '50 wissenschaftliche Erkenntnisse erforscht'
    },
    rewards: { xp: 1200, title: 'Wellness-Wissenschaftler' },
    scientificFact: 'Evidenzbasierte Wellness-Praktiken sind 300% effektiver als zufällige Ansätze.'
  },
  {
    id: 'companion-bond',
    title: 'Virtueller Begleiter-Meister',
    description: 'Tiefe Verbindung zu virtuellen Begleitern',
    icon: '🤝',
    category: 'scientific',
    rarity: 'rare',
    progress: 0,
    requirements: {
      type: 'specific',
      value: 30,
      moduleId: 'begleiter',
      description: '30 Tage Begleiter-Pflege'
    },
    rewards: { xp: 1000, title: 'Digitaler Naturfreund' },
    scientificFact: 'Virtuelle Begleiter können echte emotionale Bindungen und Wohlbefinden fördern.'
  }
];

export default function WellnessAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<Achievement | null>(null);

  useEffect(() => {
    loadAndUpdateAchievements();
  }, []);

  const loadAndUpdateAchievements = () => {
    const userStats = userStatsStorage.get();
    const activities = activitiesStorage.get();
    const stored = localStorage.getItem('wellnessAchievements');
    const existingAchievements = stored ? JSON.parse(stored) : [];

    const updatedAchievements = achievementDefinitions.map(def => {
      const existing = existingAchievements.find((a: Achievement) => a.id === def.id);
      const achievement = { ...def, ...existing };

      // Berechne aktuellen Fortschritt
      let currentProgress = 0;
      let isUnlocked = achievement.unlockedAt != null;

      switch (achievement.requirements.type) {
        case 'sessions':
          currentProgress = Math.min(100, (activities.length / achievement.requirements.value) * 100);
          if (activities.length >= achievement.requirements.value && !isUnlocked) {
            achievement.unlockedAt = new Date();
            setNewlyUnlocked(achievement);
          }
          break;

        case 'streak':
          currentProgress = Math.min(100, (userStats.currentStreak / achievement.requirements.value) * 100);
          if (userStats.currentStreak >= achievement.requirements.value && !isUnlocked) {
            achievement.unlockedAt = new Date();
            setNewlyUnlocked(achievement);
          }
          break;

        case 'modules':
          const uniqueModules = new Set(activities.map(a => a.moduleId)).size;
          currentProgress = Math.min(100, (uniqueModules / achievement.requirements.value) * 100);
          if (uniqueModules >= achievement.requirements.value && !isUnlocked) {
            achievement.unlockedAt = new Date();
            setNewlyUnlocked(achievement);
          }
          break;

        case 'points':
          currentProgress = Math.min(100, (userStats.totalPoints / achievement.requirements.value) * 100);
          if (userStats.totalPoints >= achievement.requirements.value && !isUnlocked) {
            achievement.unlockedAt = new Date();
            setNewlyUnlocked(achievement);
          }
          break;

        case 'specific':
          if (achievement.requirements.moduleId) {
            const moduleActivities = activities.filter(a => a.moduleId === achievement.requirements.moduleId);
            const totalTime = moduleActivities.reduce((sum, a) => sum + (a.duration || 0), 0);
            currentProgress = Math.min(100, (totalTime / achievement.requirements.value) * 100);
            if (totalTime >= achievement.requirements.value && !isUnlocked) {
              achievement.unlockedAt = new Date();
              setNewlyUnlocked(achievement);
            }
          }
          break;
      }

      achievement.progress = currentProgress;
      return achievement;
    });

    setAchievements(updatedAchievements);
    localStorage.setItem('wellnessAchievements', JSON.stringify(updatedAchievements));
  };

  const getRarityColor = (rarity: string): string => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'beginner': return '🌱';
      case 'advanced': return '🚀';
      case 'expert': return '💎';
      case 'legendary': return '👑';
      case 'scientific': return '🔬';
      default: return '🏆';
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  const totalXP = achievements
    .filter(a => a.unlockedAt)
    .reduce((sum, a) => sum + a.rewards.xp, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            🏆 Wellness-Auszeichnungen
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Feiere deine Erfolge und entdecke neue Herausforderungen
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {unlockedCount}/{achievements.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {totalXP} XP verdient
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Deine Erfolgsreise
          </h3>
          <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
            {Math.round((unlockedCount / achievements.length) * 100)}% Komplett
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['beginner', 'advanced', 'expert', 'legendary', 'scientific'].map(category => {
            const categoryAchievements = achievements.filter(a => a.category === category);
            const categoryUnlocked = categoryAchievements.filter(a => a.unlockedAt).length;
            
            return (
              <div key={category} className="text-center">
                <div className="text-2xl mb-1">{getCategoryIcon(category)}</div>
                <div className="text-sm font-semibold text-gray-800 dark:text-white">
                  {categoryUnlocked}/{categoryAchievements.length}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 capitalize">
                  {category}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', name: 'Alle', icon: '🏆' },
          { id: 'beginner', name: 'Anfänger', icon: '🌱' },
          { id: 'advanced', name: 'Fortgeschritten', icon: '🚀' },
          { id: 'expert', name: 'Experte', icon: '💎' },
          { id: 'legendary', name: 'Legendär', icon: '👑' },
          { id: 'scientific', name: 'Wissenschaftlich', icon: '🔬' }
        ].map(category => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              selectedCategory === category.id
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={() => setShowDetails(achievement)}
            className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 ${
              achievement.unlockedAt ? 'border-green-200 dark:border-green-800/50' : 'border-gray-200 dark:border-gray-700'
            } ${!achievement.unlockedAt ? 'opacity-75' : ''}`}
          >
            {/* Rarity Badge */}
            <div className={`absolute top-3 right-3 px-2 py-1 bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white text-xs font-bold rounded-full`}>
              {achievement.rarity.toUpperCase()}
            </div>

            {/* Unlock Badge */}
            {achievement.unlockedAt && (
              <div className="absolute top-3 left-3 text-green-500 text-lg">
                ✅
              </div>
            )}

            <div className="text-center mb-4">
              <div className={`text-4xl mb-3 ${!achievement.unlockedAt ? 'grayscale' : ''}`}>
                {achievement.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {achievement.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Fortschritt</span>
                <span>{Math.round(achievement.progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${achievement.unlockedAt ? 'from-green-400 to-green-600' : 'from-purple-400 to-purple-600'} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </div>

            {/* Rewards */}
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                +{achievement.rewards.xp} XP
              </span>
              {achievement.rewards.title && (
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-semibold">
                  "{achievement.rewards.title}"
                </span>
              )}
            </div>

            {/* Rarity Badge for Legendary */}
            {achievement.rarenessBadge && (
              <div className="mt-2 text-center">
                <span className="text-xs text-orange-600 dark:text-orange-400 font-semibold">
                  {achievement.rarenessBadge}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Achievement Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetails(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full p-6"
            >
              <div className="text-center mb-6">
                <div className={`text-6xl mb-3 ${!showDetails.unlockedAt ? 'grayscale' : ''}`}>
                  {showDetails.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {showDetails.title}
                </h3>
                <div className={`inline-block px-3 py-1 bg-gradient-to-r ${getRarityColor(showDetails.rarity)} text-white text-sm font-bold rounded-full mb-3`}>
                  {showDetails.rarity.toUpperCase()}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {showDetails.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    📋 Anforderungen:
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {showDetails.requirements.description}
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Fortschritt</span>
                      <span>{Math.round(showDetails.progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${showDetails.unlockedAt ? 'from-green-400 to-green-600' : 'from-purple-400 to-purple-600'} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${showDetails.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    🎁 Belohnungen:
                  </h4>
                  <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <div>• {showDetails.rewards.xp} Erfahrungspunkte</div>
                    {showDetails.rewards.title && (
                      <div>• Titel: "{showDetails.rewards.title}"</div>
                    )}
                    {showDetails.rewards.feature && (
                      <div>• Feature: {showDetails.rewards.feature}</div>
                    )}
                  </div>
                </div>

                {showDetails.scientificFact && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800/50">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                      🔬 Wissenschaftlicher Fakt:
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {showDetails.scientificFact}
                    </p>
                  </div>
                )}

                {showDetails.unlockedAt && (
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                      <span>✅</span>
                      <span>Freigeschaltet am {showDetails.unlockedAt.toLocaleDateString('de-DE')}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Achievement Notification */}
      <AnimatePresence>
        {newlyUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-6 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-2xl z-50 max-w-sm"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-3xl">{newlyUnlocked.icon}</div>
              <div>
                <h4 className="font-bold text-lg">Neue Auszeichnung!</h4>
                <p className="text-yellow-100 text-sm">{newlyUnlocked.title}</p>
              </div>
            </div>
            <p className="text-sm mb-3">{newlyUnlocked.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-yellow-100">+{newlyUnlocked.rewards.xp} XP</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNewlyUnlocked(null)}
                className="bg-white/20 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-white/30 transition-all"
              >
                Awesome! 🎉
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
