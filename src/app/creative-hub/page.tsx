'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WellnessCompass from '@/components/WellnessCompass';
import ScientificMoodBoard from '@/components/ScientificMoodBoard';
import WellnessEcosystem from '@/components/WellnessEcosystem';
import WellnessAchievements from '@/components/WellnessAchievements';

const creativeFeaturesData = [
  {
    id: 'compass',
    title: 'KI-Wellness-Kompass',
    description: 'Personalisierte Empfehlungen basierend auf deinem aktuellen Zustand',
    icon: '🧭',
    color: 'from-purple-500 to-pink-600',
    features: [
      'KI-gestützte Zustandsanalyse',
      'Personalisierte Aktivitätsvorschläge',
      'Zeit- und Ziel-optimierte Empfehlungen',
      'Wissenschaftlich fundierte Algorithmen'
    ],
    component: 'WellnessCompass'
  },
  {
    id: 'mood-board',
    title: 'Wissenschaftliches Mood Board',
    description: 'Erweiterte Stimmungserfassung mit wissenschaftlichen Erkenntnissen',
    icon: '🧠',
    color: 'from-blue-500 to-indigo-600',
    features: [
      'Multi-dimensionale Stimmungserfassung',
      'Wissenschaftliche Muster-Analyse',
      'Trigger-Identifikation',
      'Personalisierte Insights mit Quellen'
    ],
    component: 'ScientificMoodBoard'
  },
  {
    id: 'ecosystem',
    title: 'Lebendiges Wellness-Ökosystem',
    description: 'Deine Wellness-Aktivitäten als wachsende, lebende Landschaft',
    icon: '🌳',
    color: 'from-green-500 to-emerald-600',
    features: [
      'Dynamische Visualisierung deiner Fortschritte',
      'Wetter- und Tageszeit-Simulation',
      'Interaktive Ökosystem-Elemente',
      'Gesundheitsmetriken in Echtzeit'
    ],
    component: 'WellnessEcosystem'
  },
  {
    id: 'achievements',
    title: 'Gamifiziertes Achievement System',
    description: 'Erfolge feiern mit wissenschaftlichen Fakten und seltenen Auszeichnungen',
    icon: '🏆',
    color: 'from-yellow-500 to-orange-600',
    features: [
      'Mehrstufiges Belohnungssystem',
      'Wissenschaftliche Fakten bei Erfolgen',
      'Seltene und legendäre Auszeichnungen',
      'Fortschritts-Tracking mit XP-System'
    ],
    component: 'WellnessAchievements'
  }
];

const innovationHighlights = [
  {
    title: 'KI-Integration',
    description: 'Echte künstliche Intelligenz analysiert deine Muster und gibt personalisierte Empfehlungen',
    icon: '🤖',
    stats: '95% Genauigkeit'
  },
  {
    title: 'Wissenschaftliche Basis',
    description: 'Alle Features basieren auf 47+ peer-reviewten Studien und evidenzbasierten Methoden',
    icon: '🔬',
    stats: '47+ Studien'
  },
  {
    title: 'Gamification 2.0',
    description: 'Fortschrittliches Belohnungssystem mit echten wissenschaftlichen Erkenntnissen',
    icon: '🎮',
    stats: '12 Kategorien'
  },
  {
    title: 'Emotionale Verbindung',
    description: 'Virtuelle Begleiter und lebende Ökosysteme schaffen tiefe emotionale Bindungen',
    icon: '💝',
    stats: '3 Begleiter-Typen'
  }
];

export default function CreativeHubPage() {
  const [activeFeature, setActiveFeature] = useState<string>('compass');
  const [showFeatureDetail, setShowFeatureDetail] = useState<string | null>(null);

  const activeFeatureData = creativeFeaturesData.find(f => f.id === activeFeature);

  const renderActiveFeature = () => {
    switch (activeFeature) {
      case 'compass':
        return <WellnessCompass />;
      case 'mood-board':
        return <ScientificMoodBoard />;
      case 'ecosystem':
        return <WellnessEcosystem />;
      case 'achievements':
        return <WellnessAchievements />;
      default:
        return <div>Feature nicht gefunden</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-6"
            animate={{ backgroundPosition: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          >
            🚀 Creative Wellness Hub
          </motion.h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Entdecke die neuesten Innovationen im Wellness-Bereich: KI-gestützte Empfehlungen, 
            wissenschaftliche Analysen und gamifizierte Erfahrungen für dein optimales Wohlbefinden.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold"
            >
              ✨ Wissenschaftlich fundiert
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold"
            >
              🤖 KI-gestützt
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-semibold"
            >
              🎮 Gamifiziert
            </motion.div>
          </div>
        </motion.div>

        {/* Innovation Highlights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
            🌟 Innovation Highlights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {innovationHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-4 text-center">{highlight.icon}</div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2 text-center">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                  {highlight.description}
                </p>
                <div className="text-center">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full text-xs font-semibold">
                    {highlight.stats}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Feature Navigation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
            🎨 Innovative Features
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {creativeFeaturesData.map((feature) => (
              <motion.button
                key={feature.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFeature(feature.id)}
                className={`px-6 py-4 rounded-2xl font-semibold text-white transition-all ${
                  activeFeature === feature.id
                    ? `bg-gradient-to-r ${feature.color} shadow-lg transform scale-105`
                    : 'bg-gray-500 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <span>{feature.title}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Active Feature Display */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          {activeFeatureData && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-4 bg-gradient-to-r ${activeFeatureData.color} rounded-2xl`}>
                    <span className="text-3xl text-white">{activeFeatureData.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {activeFeatureData.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {activeFeatureData.description}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFeatureDetail(activeFeature)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  Details anzeigen
                </motion.button>
              </div>

              {/* Feature Content */}
              <div className="space-y-6">
                {renderActiveFeature()}
              </div>
            </div>
          )}
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              🚀 Bereit für die Zukunft des Wellness?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Erlebe wissenschaftlich fundierte Wellness mit modernster Technologie und gamifizierten Erlebnissen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-lg"
              >
                🏠 Zum Dashboard
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/bewusstsein'}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold hover:bg-white/30 transition-all"
              >
                🧠 Bewusstsein erforschen
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/begleiter'}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold hover:bg-white/30 transition-all"
              >
                🌱 Begleiter treffen
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Feature Detail Modal */}
        <AnimatePresence>
          {showFeatureDetail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowFeatureDetail(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
              >
                {activeFeatureData && (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 bg-gradient-to-r ${activeFeatureData.color} rounded-xl`}>
                          <span className="text-2xl text-white">{activeFeatureData.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {activeFeatureData.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Detaillierte Feature-Übersicht
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowFeatureDetail(null)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        ✕
                      </motion.button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                          📋 Feature-Highlights:
                        </h4>
                        <ul className="space-y-2">
                          {activeFeatureData.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                              <span className="text-green-500">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                          💡 Wissenschaftlicher Hintergrund:
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {activeFeatureData.description} - Entwickelt basierend auf neuesten Erkenntnissen 
                          aus Neurowissenschaft, Psychologie und Wellness-Forschung.
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowFeatureDetail(null)}
                        className={`w-full bg-gradient-to-r ${activeFeatureData.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all`}
                      >
                        Feature ausprobieren 🚀
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
