'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { userStatsStorage, activitiesStorage, moodStorage } from '@/utils/wellnessStorage';
import { WellnessInsight } from '@/types/analytics';

export default function WellnessInsights() {
  const [insights, setInsights] = useState<WellnessInsight[]>([]);
  const [activeInsight, setActiveInsight] = useState<WellnessInsight | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights = () => {
    setIsLoading(true);
    
    // Simuliere AI-Verarbeitung
    setTimeout(() => {
      const userStats = userStatsStorage.get();
      const recentActivities = activitiesStorage.get().slice(0, 20);
      const moodEntries = moodStorage.get().slice(0, 14); // Letzte 2 Wochen
      
      const generatedInsights: WellnessInsight[] = [];

      // Stimmungsanalyse
      if (moodEntries.length > 0) {
        const avgMood = moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length;
        const moodTrend = moodEntries.length > 1 ? 
          moodEntries[0].mood - moodEntries[moodEntries.length - 1].mood : 0;

        if (avgMood >= 7) {
          generatedInsights.push({
            id: 'mood-positive',
            type: 'pattern',
            title: 'Positive Stimmungsentwicklung',
            message: `Deine durchschnittliche Stimmung liegt bei ${avgMood.toFixed(1)}/10. Du bist auf einem großartigen Weg! 🌟`,
            data: { avgMood, trend: moodTrend },
            priority: 'low',
            generatedAt: new Date(),
            seen: false
          });
        } else if (avgMood < 5) {
          generatedInsights.push({
            id: 'mood-concern',
            type: 'recommendation',
            title: 'Fokus auf Stimmungsverbesserung',
            message: 'Deine Stimmung könnte von mehr Meditation und Dankbarkeitspraxis profitieren. Möchtest du eine 7-Tage-Challenge starten?',
            data: { avgMood, recommendation: 'meditation-gratitude-combo' },
            priority: 'high',
            generatedAt: new Date(),
            seen: false
          });
        }

        if (moodTrend > 1) {
          generatedInsights.push({
            id: 'mood-improvement',
            type: 'encouragement',
            title: 'Aufwärtstrend erkannt',
            message: `Fantastisch! Deine Stimmung hat sich um ${moodTrend.toFixed(1)} Punkte verbessert. Was machst du anders? 📈`,
            data: { trend: moodTrend },
            priority: 'medium',
            generatedAt: new Date(),
            seen: false
          });
        }
      }

      // Aktivitätsmuster
      const moduleFrequency = recentActivities.reduce((acc, activity) => {
        acc[activity.moduleId] = (acc[activity.moduleId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const favoriteModule = Object.keys(moduleFrequency).reduce((a, b) => 
        moduleFrequency[a] > moduleFrequency[b] ? a : b, 'none'
      );

      if (favoriteModule !== 'none') {
        const moduleNames: Record<string, string> = {
          'stille': 'Meditation',
          'dankbarkeit': 'Dankbarkeit',
          'fortschritt': 'Ziele & Fortschritt',
          'freude': 'Freude & Lachen',
          'therapie': 'Therapie & Heilung',
          'transformation': 'Transformation',
          'liebe': 'Liebe & Beziehungen'
        };

        generatedInsights.push({
          id: 'favorite-module',
          type: 'pattern',
          title: 'Dein Lieblingsmodul',
          message: `Du verbringst die meiste Zeit mit ${moduleNames[favoriteModule] || favoriteModule}. Das zeigt deine Präferenz für ${getFocusDescription(favoriteModule)}.`,
          data: { module: favoriteModule, frequency: moduleFrequency[favoriteModule] },
          priority: 'low',
          generatedAt: new Date(),
          seen: false
        });
      }

      // Streak-Analyse
      if (userStats.currentStreak > 0) {
        if (userStats.currentStreak >= 7) {
          generatedInsights.push({
            id: 'streak-milestone',
            type: 'milestone',
            title: `${userStats.currentStreak}-Tage-Streak! 🔥`,
            message: 'Beeindruckend! Du hast eine starke Routine entwickelt. Kontinuität ist der Schlüssel zu nachhaltigem Wachstum.',
            data: { streak: userStats.currentStreak },
            priority: 'medium',
            generatedAt: new Date(),
            seen: false
          });
        } else if (userStats.currentStreak === userStats.longestStreak && userStats.currentStreak > 3) {
          generatedInsights.push({
            id: 'personal-record',
            type: 'milestone',
            title: 'Neuer persönlicher Rekord!',
            message: `Du hast deinen längsten Streak erreicht: ${userStats.currentStreak} Tage! Zeit, noch höher zu zielen! 🎯`,
            data: { streak: userStats.currentStreak },
            priority: 'high',
            generatedAt: new Date(),
            seen: false
          });
        }
      }

      // Level-basierte Insights
      if (userStats.level >= 5) {
        generatedInsights.push({
          id: 'advanced-user',
          type: 'recommendation',
          title: 'Bereit für Advanced Features',
          message: 'Mit Level ' + userStats.level + ' bist du bereit für erweiterte Techniken. Probiere längere Meditationssessions oder komplexere Challenges!',
          data: { level: userStats.level },
          priority: 'medium',
          generatedAt: new Date(),
          seen: false
        });
      }

      // Tageszeit-Analyse (simuliert)
      const currentHour = new Date().getHours();
      if (currentHour >= 6 && currentHour <= 9) {
        generatedInsights.push({
          id: 'morning-routine',
          type: 'recommendation',
          title: 'Perfekte Zeit für Morgenroutine',
          message: 'Morgens ist die ideale Zeit für Meditation und Zielsetzung. Möchtest du eine 10-minütige Morgenroutine starten?',
          data: { timeOfDay: 'morning' },
          priority: 'medium',
          generatedAt: new Date(),
          seen: false
        });
      } else if (currentHour >= 18 && currentHour <= 21) {
        generatedInsights.push({
          id: 'evening-reflection',
          type: 'recommendation',
          title: 'Zeit für Abendrückblick',
          message: 'Der Abend ist perfekt für Dankbarkeit und Reflexion. Wie war dein Tag? Wofür bist du dankbar?',
          data: { timeOfDay: 'evening' },
          priority: 'low',
          generatedAt: new Date(),
          seen: false
        });
      }

      // Motivational Insights
      if (userStats.totalPoints > 0) {
        const pointsToNextLevel = ((userStats.level + 1) * 100) - userStats.totalPoints;
        if (pointsToNextLevel <= 50) {
          generatedInsights.push({
            id: 'level-up-soon',
            type: 'encouragement',
            title: 'Level Up steht bevor!',
            message: `Nur noch ${pointsToNextLevel} Punkte bis Level ${userStats.level + 1}! Du schaffst das! 💪`,
            data: { pointsNeeded: pointsToNextLevel, nextLevel: userStats.level + 1 },
            priority: 'medium',
            generatedAt: new Date(),
            seen: false
          });
        }
      }

      setInsights(generatedInsights);
      setIsLoading(false);
    }, 1500); // Simuliere Verarbeitungszeit
  };

  const getFocusDescription = (module: string): string => {
    const descriptions: Record<string, string> = {
      'stille': 'innere Ruhe und Achtsamkeit',
      'dankbarkeit': 'Wertschätzung und positive Einstellung',
      'fortschritt': 'Zielerreichung und persönliche Entwicklung',
      'freude': 'Positivität und emotionales Wohlbefinden',
      'therapie': 'Heilung und mentale Gesundheit',
      'transformation': 'Veränderung und Wachstum',
      'liebe': 'Beziehungen und Selbstliebe'
    };
    return descriptions[module] || 'ganzheitliches Wohlbefinden';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-600';
      case 'medium': return 'from-yellow-500 to-orange-600';
      case 'low': return 'from-green-500 to-teal-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🚨';
      case 'medium': return '⚡';
      case 'low': return '💡';
      default: return '📝';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pattern': return '📊';
      case 'recommendation': return '💡';
      case 'milestone': return '🏆';
      case 'encouragement': return '🌟';
      default: return '📝';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            AI analysiert deine Wellness-Daten...
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Personalisierte Insights werden generiert 🤖
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          🤖 AI Wellness Insights
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Personalisierte Einblicke basierend auf deinen Aktivitäten und Mustern
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateInsights}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
        >
          <span>🔄</span>
          <span>Insights aktualisieren</span>
        </motion.button>
      </div>

      {insights.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Noch keine Insights verfügbar
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Nutze die App ein paar Tage, damit die AI deine Muster erkennen kann.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveInsight(insight)}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getTypeIcon(insight.type)}</div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                      {insight.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full text-white bg-gradient-to-r ${getPriorityColor(insight.priority)}`}>
                        {getPriorityIcon(insight.priority)} {insight.priority}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {insight.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {insight.message}
              </p>
              
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>Vor {Math.floor((Date.now() - insight.generatedAt.getTime()) / (1000 * 60))} Min</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Details →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Insight Detail Modal */}
      <AnimatePresence>
        {activeInsight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setActiveInsight(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{getTypeIcon(activeInsight.type)}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {activeInsight.title}
                      </h2>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-3 py-1 text-sm rounded-full text-white bg-gradient-to-r ${getPriorityColor(activeInsight.priority)}`}>
                          {getPriorityIcon(activeInsight.priority)} {activeInsight.priority} Priorität
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {activeInsight.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveInsight(null)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    ✕
                  </motion.button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Insight Details
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {activeInsight.message}
                    </p>
                  </div>
                  
                  {activeInsight.data && (
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                        Datenbasierte Erkenntnisse
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                        <pre className="text-sm text-gray-700 dark:text-gray-300">
                          {JSON.stringify(activeInsight.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      Empfehlung annehmen
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Später erinnern
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
