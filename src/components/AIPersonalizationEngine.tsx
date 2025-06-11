'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainIcon, 
  ChartBarIcon, 
  LightBulbIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  ClockIcon,
  TrendingUpIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

// Advanced AI Personalization Engine Component
const AIPersonalizationEngine = () => {
  const [insights, setInsights] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [userPatterns, setUserPatterns] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('insights');

  useEffect(() => {
    loadPersonalizationData();
    startRealTimeAnalysis();
  }, []);

  const loadPersonalizationData = async () => {
    setIsAnalyzing(true);
    
    // Simuliere KI-Analyse
    setTimeout(() => {
      setInsights(generateMockInsights());
      setPredictions(generateMockPredictions());
      setRecommendations(generateMockRecommendations());
      setUserPatterns(generateMockUserPatterns());
      setIsAnalyzing(false);
    }, 2000);
  };

  const startRealTimeAnalysis = () => {
    // Simuliere Echtzeit-Updates alle 30 Sekunden
    const interval = setInterval(() => {
      updateRealTimeInsights();
    }, 30000);

    return () => clearInterval(interval);
  };

  const updateRealTimeInsights = () => {
    // Hier würde die echte KI-Engine neue Insights generieren
    console.log('🧠 Updating real-time AI insights...');
  };

  const generateMockInsights = () => [
    {
      id: 'insight-1',
      type: 'mood_prediction',
      title: 'Stimmungsvorhersage für heute',
      description: 'Basierend auf deinen Mustern könnte deine Energie heute Nachmittag um 15:30 sinken.',
      confidence: 0.87,
      predictedOutcome: 'Energietief zwischen 15:30-16:30',
      recommendedActions: [
        '10 Minuten Meditation um 15:00',
        'Kurzer Spaziergang an der frischen Luft',
        'Energizing Atemtechnik'
      ],
      priority: 'medium',
      icon: '🧠',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'insight-2',
      type: 'optimization_tip',
      title: 'Optimaler Meditationszeitpunkt',
      description: 'Deine Meditationssessions sind 40% effektiver, wenn du sie zwischen 7:00-8:00 Uhr durchführst.',
      confidence: 0.92,
      predictedOutcome: 'Verbesserte Achtsamkeit und Stressreduktion',
      recommendedActions: [
        'Morgendliche Meditation von 7:15-7:35',
        'Konsistente Routine aufbauen',
        'Wecker 10 Minuten früher stellen'
      ],
      priority: 'high',
      icon: '⏰',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'insight-3',
      type: 'risk_alert',
      title: 'Burnout-Früherkennung',
      description: 'Deine Aktivitätsmuster zeigen Anzeichen von Überlastung. Präventive Maßnahmen empfohlen.',
      confidence: 0.73,
      predictedOutcome: 'Mögliches Burnout-Risiko in 2-3 Wochen',
      recommendedActions: [
        'Tägliche Entspannungszeit von 30 Minuten',
        'Grenzen bei beruflichen Verpflichtungen',
        'Professionelle Beratung in Erwägung ziehen'
      ],
      priority: 'critical',
      icon: '⚠️',
      color: 'from-red-500 to-orange-600'
    }
  ];

  const generateMockPredictions = () => [
    {
      id: 'pred-1',
      timeframe: 'Nächste 2 Stunden',
      prediction: 'Erhöhte Produktivität',
      confidence: 0.84,
      factors: ['Optimale Tageszeit', 'Gute Schlafqualität', 'Regelmäßige Pausen'],
      suggestion: 'Nutze diese Zeit für wichtige Life-RPG Quests'
    },
    {
      id: 'pred-2',
      timeframe: 'Heute Abend',
      prediction: 'Entspannungsbedürfnis',
      confidence: 0.76,
      factors: ['Hohe Tagesaktivität', 'Stressindikatoren', 'Historische Muster'],
      suggestion: 'Plane eine beruhigende Wellness-Session ein'
    },
    {
      id: 'pred-3',
      timeframe: 'Diese Woche',
      prediction: 'Motivationshoch am Mittwoch',
      confidence: 0.89,
      factors: ['Wochenmuster', 'Soziale Aktivitäten', 'Energielevel-Trends'],
      suggestion: 'Plane herausfordernde Ziele für Mittwoch'
    }
  ];

  const generateMockRecommendations = () => [
    {
      id: 'rec-1',
      moduleId: 'stille',
      title: 'Personalisierte Morgenmeditation',
      description: 'KI-optimierte 15-Minuten Session basierend auf deinem Stresslevel',
      estimatedDuration: 15,
      difficulty: 'easy',
      predictedImpact: {
        energy: +2,
        stress: -3,
        motivation: +1,
        happiness: +2
      },
      confidence: 0.91,
      personalizedTips: [
        'Fokussiere dich heute besonders auf Atemtechniken',
        'Nutze die neue "Energie-Boost" Meditation',
        'Setze eine sanfte Erinnerung für 7:15 Uhr'
      ],
      scientificBasis: '12 Studien zeigen 23% Stressreduktion bei morgendlicher Meditation'
    },
    {
      id: 'rec-2',
      moduleId: 'life-rpg',
      title: 'Adaptive Quest: Sozialer Kontakt',
      description: 'Deine sozialen Interaktionen waren diese Woche niedrig - Zeit für eine Social-Quest!',
      estimatedDuration: 30,
      difficulty: 'medium',
      predictedImpact: {
        energy: +1,
        stress: -1,
        motivation: +3,
        happiness: +4
      },
      confidence: 0.78,
      personalizedTips: [
        'Rufe einen Freund für 10 Minuten an',
        'Schreibe eine Dankesnachricht an jemanden',
        'Plane ein gemeinsames Wellness-Abenteuer'
      ],
      scientificBasis: 'Soziale Verbindungen erhöhen Wohlbefinden um 25%'
    }
  ];

  const generateMockUserPatterns = () => ({
    activityFrequency: {
      meditation: 4.2, // pro Woche
      journaling: 2.8,
      exercise: 3.1,
      socialActivities: 1.9
    },
    optimalTimes: {
      meditation: '07:00-08:00',
      exercise: '18:00-19:00',
      journaling: '21:00-22:00'
    },
    successFactors: [
      'Konsistente Routine',
      'Kurze Sessions (10-20 Min)',
      'Reminder-Notifications',
      'Soziale Komponente'
    ],
    riskFactors: [
      'Unregelmäßiger Schlaf',
      'Hohe Arbeitsbelastung',
      'Wenig soziale Kontakte'
    ]
  });

  const renderInsights = () => (
    <div className="space-y-6">
      {insights.map((insight) => (
        <motion.div
          key={insight.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${insight.color} p-6 rounded-2xl text-white`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{insight.icon}</span>
              <div>
                <h3 className="text-xl font-bold">{insight.title}</h3>
                <p className="text-sm opacity-90">Konfidenz: {Math.round(insight.confidence * 100)}%</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              insight.priority === 'critical' ? 'bg-red-500' :
              insight.priority === 'high' ? 'bg-yellow-500 text-black' :
              'bg-green-500'
            }`}>
              {insight.priority.toUpperCase()}
            </span>
          </div>
          
          <p className="mb-4 opacity-90">{insight.description}</p>
          
          <div className="bg-white/20 rounded-lg p-4 mb-4">
            <h4 className="font-semibold mb-2">🎯 Vorhergesagtes Ergebnis:</h4>
            <p className="text-sm">{insight.predictedOutcome}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">💡 Empfohlene Maßnahmen:</h4>
            <ul className="space-y-1">
              {insight.recommendedActions.map((action, index) => (
                <li key={index} className="text-sm flex items-center space-x-2">
                  <span>•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderPredictions = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {predictions.map((prediction) => (
        <motion.div
          key={prediction.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="text-center mb-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">{prediction.timeframe}</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{prediction.prediction}</h3>
            <div className="mt-2">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(prediction.confidence * 100)}%
              </div>
              <div className="text-xs text-gray-500">Wahrscheinlichkeit</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Faktoren:</h4>
              <div className="flex flex-wrap gap-1">
                {prediction.factors.map((factor, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">💡 Empfehlung:</h4>
              <p className="text-sm text-green-700 dark:text-green-400">{prediction.suggestion}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      {recommendations.map((rec) => (
        <motion.div
          key={rec.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{rec.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{rec.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>⏱️ {rec.estimatedDuration} Min</span>
                <span>📊 {rec.difficulty}</span>
                <span>🎯 {Math.round(rec.confidence * 100)}% Konfidenz</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Vorhergesagte Wirkung:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Energie:</span>
                  <span className={rec.predictedImpact.energy > 0 ? 'text-green-600' : 'text-red-600'}>
                    {rec.predictedImpact.energy > 0 ? '+' : ''}{rec.predictedImpact.energy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Stress:</span>
                  <span className={rec.predictedImpact.stress < 0 ? 'text-green-600' : 'text-red-600'}>
                    {rec.predictedImpact.stress > 0 ? '+' : ''}{rec.predictedImpact.stress}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Motivation:</span>
                  <span className={rec.predictedImpact.motivation > 0 ? 'text-green-600' : 'text-red-600'}>
                    {rec.predictedImpact.motivation > 0 ? '+' : ''}{rec.predictedImpact.motivation}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Glück:</span>
                  <span className={rec.predictedImpact.happiness > 0 ? 'text-green-600' : 'text-red-600'}>
                    {rec.predictedImpact.happiness > 0 ? '+' : ''}{rec.predictedImpact.happiness}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Personalisierte Tipps:</h4>
                <ul className="space-y-1 text-sm">
                  {rec.personalizedTips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-500">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4">
            <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">🔬 Wissenschaftliche Basis:</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400">{rec.scientificBasis}</p>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
              Jetzt starten
            </button>
            <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Für später merken
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderAnalysisLoading = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <BrainIcon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">KI analysiert deine Daten...</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Erstelle personalisierte Insights basierend auf deinen Wellness-Mustern
      </p>
      <div className="mt-4 space-y-2 text-sm text-gray-500">
        <div>✓ Verhaltensanalyse abgeschlossen</div>
        <div>✓ Stimmungsmuster erkannt</div>
        <div className="text-blue-600">⏳ Generating recommendations...</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🧠 KI-Personalisierungs-Engine
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Intelligente Insights und personalisierte Empfehlungen für deine Wellness-Reise
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          {[
            { id: 'insights', label: 'KI-Insights', icon: LightBulbIcon },
            { id: 'predictions', label: 'Vorhersagen', icon: TrendingUpIcon },
            { id: 'recommendations', label: 'Empfehlungen', icon: SparklesIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderAnalysisLoading()}
          </motion.div>
        ) : (
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {selectedTab === 'insights' && renderInsights()}
            {selectedTab === 'predictions' && renderPredictions()}
            {selectedTab === 'recommendations' && renderRecommendations()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIPersonalizationEngine;
