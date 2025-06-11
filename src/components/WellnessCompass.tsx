'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wellnessModules } from '@/utils/wellnessConfig';
import { userStatsStorage, moodStorage } from '@/utils/wellnessStorage';

interface WellnessRecommendation {
  module: any;
  score: number;
  reason: string;
  timeEstimate: string;
  benefits: string[];
}

interface UserState {
  energy: number; // 1-10
  stress: number; // 1-10
  motivation: number; // 1-10
  timeAvailable: number; // in minutes
  primaryGoal: 'relax' | 'energize' | 'focus' | 'heal' | 'grow';
}

export default function WellnessCompass() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userState, setUserState] = useState<UserState>({
    energy: 5,
    stress: 5,
    motivation: 5,
    timeAvailable: 15,
    primaryGoal: 'relax'
  });
  const [recommendations, setRecommendations] = useState<WellnessRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const questions = [
    {
      title: "Wie ist dein aktuelles Energielevel?",
      subtitle: "Hilft uns, die richtige Intensität zu wählen",
      key: 'energy' as keyof UserState,
      lowLabel: "Erschöpft",
      highLabel: "Voller Energie",
      icon: "⚡"
    },
    {
      title: "Wie gestresst fühlst du dich?",
      subtitle: "Wichtig für die Art der Entspannung",
      key: 'stress' as keyof UserState,
      lowLabel: "Sehr entspannt",
      highLabel: "Sehr gestresst",
      icon: "😤"
    },
    {
      title: "Wie motiviert bist du gerade?",
      subtitle: "Bestimmt die Herausforderung der Aktivität",
      key: 'motivation' as keyof UserState,
      lowLabel: "Keine Motivation",
      highLabel: "Hochmotiviert",
      icon: "🎯"
    }
  ];

  const timeOptions = [5, 10, 15, 30, 45, 60];
  const goalOptions = [
    { id: 'relax', label: 'Entspannen & Beruhigen', icon: '🧘‍♀️', color: 'from-blue-400 to-blue-600' },
    { id: 'energize', label: 'Energie tanken', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
    { id: 'focus', label: 'Fokus & Klarheit', icon: '🎯', color: 'from-purple-400 to-purple-600' },
    { id: 'heal', label: 'Heilen & Regenerieren', icon: '💚', color: 'from-green-400 to-green-600' },
    { id: 'grow', label: 'Wachsen & Lernen', icon: '🌱', color: 'from-teal-400 to-teal-600' }
  ];

  const analyzeWellnessNeeds = () => {
    setIsAnalyzing(true);
    
    // Simuliere KI-Analyse
    setTimeout(() => {
      const recs: WellnessRecommendation[] = [];
      
      // Algorithmus basierend auf Benutzerzustand
      if (userState.stress > 7 && userState.energy < 4) {
        // Hochgestresst und müde - sanfte Entspannung
        recs.push({
          module: wellnessModules.find(m => m.id === 'stille'),
          score: 95,
          reason: "Dein hoher Stress und niedrige Energie deuten auf Überforderung hin. Meditation wird dir helfen, zur Ruhe zu kommen.",
          timeEstimate: `${userState.timeAvailable} Min`,
          benefits: ["Stressreduktion um 40%", "Bessere Schlafqualität", "Mentale Klarheit"]
        });
      } else if (userState.energy > 7 && userState.motivation > 6) {
        // Hohe Energie und Motivation - Herausforderungen
        recs.push({
          module: wellnessModules.find(m => m.id === 'herausforderungen'),
          score: 90,
          reason: "Du hast viel Energie und Motivation! Zeit für eine Herausforderung, die dich weiterbringt.",
          timeEstimate: `${userState.timeAvailable} Min`,
          benefits: ["Resilienz aufbauen", "Selbstvertrauen stärken", "Neue Fähigkeiten"]
        });
      } else if (userState.primaryGoal === 'heal') {
        // Heilungsfokus
        recs.push({
          module: wellnessModules.find(m => m.id === 'therapie'),
          score: 88,
          reason: "Dein Fokus auf Heilung ist wichtig. Therapeutische Übungen können tiefgreifende Veränderungen bewirken.",
          timeEstimate: `${userState.timeAvailable} Min`,
          benefits: ["Emotionale Heilung", "Trauma-Verarbeitung", "Innere Balance"]
        });
      }
      
      // Weitere Empfehlungen basierend auf anderen Faktoren
      if (userState.primaryGoal === 'grow') {
        recs.push({
          module: wellnessModules.find(m => m.id === 'wissen'),
          score: 85,
          reason: "Perfekt für persönliches Wachstum! Erweitere dein Bewusstsein mit wissenschaftlichen Erkenntnissen.",
          timeEstimate: `${Math.max(userState.timeAvailable, 10)} Min`,
          benefits: ["Neues Wissen", "Bewusstseinserweiterung", "Praktische Anwendung"]
        });
      }
      
      // Immer Dankbarkeit als sanfte Option
      recs.push({
        module: wellnessModules.find(m => m.id === 'dankbarkeit'),
        score: 75,
        reason: "Dankbarkeit funktioniert in jedem Zustand und hebt nachweislich die Stimmung.",
        timeEstimate: "5-10 Min",
        benefits: ["Positive Gedanken", "Bessere Stimmung", "Leicht umsetzbar"]
      });

      // Virtueller Begleiter für emotionale Unterstützung
      if (userState.stress > 5 || userState.energy < 4) {
        recs.push({
          module: wellnessModules.find(m => m.id === 'begleiter'),
          score: 80,
          reason: "Ein virtueller Begleiter kann dir emotionale Unterstützung und Struktur geben.",
          timeEstimate: `${Math.min(userState.timeAvailable, 20)} Min`,
          benefits: ["Emotionale Verbindung", "Routine aufbauen", "Spielerisches Lernen"]
        });
      }

      setRecommendations(recs.sort((a, b) => b.score - a.score).slice(0, 3));
      setIsAnalyzing(false);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < questions.length + 1) {
      setCurrentStep(currentStep + 1);
    } else {
      analyzeWellnessNeeds();
    }
  };

  const resetCompass = () => {
    setCurrentStep(0);
    setRecommendations([]);
    setUserState({
      energy: 5,
      stress: 5,
      motivation: 5,
      timeAvailable: 15,
      primaryGoal: 'relax'
    });
  };

  const ScaleSelector = ({ question, value, onChange }: any) => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-4">{question.icon}</div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {question.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {question.subtitle}
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{question.lowLabel}</span>
          <span>{question.highLabel}</span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => onChange(question.key, parseInt(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <span key={num} className={num === value ? 'text-blue-600 font-bold' : ''}>
                {num}
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
            Aktuell: {value}/10
          </span>
        </div>
      </div>
    </div>
  );

  if (!isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all z-40"
      >
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🧭</span>
          <span className="hidden sm:block font-semibold">Wellness-Kompass</span>
        </div>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                  <span className="text-white text-xl">🧭</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Wellness-Kompass
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    KI-gestützte personalisierte Empfehlungen
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                ✕
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>Schritt {currentStep + 1} von {questions.length + 2}</span>
                <span>{Math.round(((currentStep + 1) / (questions.length + 2)) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / (questions.length + 2)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {currentStep < questions.length ? (
                <ScaleSelector
                  question={questions[currentStep]}
                  value={userState[questions[currentStep].key]}
                  onChange={(key: keyof UserState, value: number) => 
                    setUserState(prev => ({ ...prev, [key]: value }))
                  }
                />
              ) : currentStep === questions.length ? (
                // Zeit und Ziel Auswahl
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">⏰</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      Wie viel Zeit hast du?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Wir passen die Empfehlungen an deine verfügbare Zeit an
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {timeOptions.map(time => (
                      <motion.button
                        key={time}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setUserState(prev => ({ ...prev, timeAvailable: time }))}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          userState.timeAvailable === time
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <div className="font-semibold">{time} Min</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="text-center mt-6">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      Was ist dein Hauptziel?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Hilft uns, die perfekte Aktivität für dich zu finden
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {goalOptions.map(goal => (
                      <motion.button
                        key={goal.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setUserState(prev => ({ ...prev, primaryGoal: goal.id as any }))}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          userState.primaryGoal === goal.id
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 bg-gradient-to-r ${goal.color} rounded-lg`}>
                            <span className="text-white">{goal.icon}</span>
                          </div>
                          <span className="font-semibold text-gray-800 dark:text-white text-sm">
                            {goal.label}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : isAnalyzing ? (
                // Analyse läuft
                <div className="text-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-6xl mb-6"
                  >
                    🧭
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    KI analysiert deine Bedürfnisse...
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Basierend auf wissenschaftlichen Wellness-Prinzipien
                  </p>
                  <div className="mt-6">
                    <div className="flex justify-center space-x-1">
                      {[1, 2, 3].map(i => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 bg-purple-500 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Empfehlungen zeigen
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      Deine personalisierten Empfehlungen
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Basierend auf deinem aktuellen Zustand und Zielen
                    </p>
                  </div>

                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-3xl">{rec.module?.icon}</div>
                            <div>
                              <h4 className="font-bold text-gray-800 dark:text-white">
                                {rec.module?.name}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  {rec.timeEstimate}
                                </span>
                                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs font-semibold">
                                  {rec.score}% Match
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                          {rec.reason}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {rec.benefits.map((benefit, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                              {benefit}
                            </span>
                          ))}
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setIsOpen(false);
                            window.location.href = rec.module?.path;
                          }}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
                        >
                          Jetzt starten →
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetCompass}
                      className="text-purple-600 dark:text-purple-400 font-semibold text-sm hover:underline"
                    >
                      🔄 Neue Analyse starten
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {currentStep <= questions.length && !isAnalyzing && recommendations.length === 0 && (
              <div className="flex justify-between mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-6 py-2 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                >
                  ← Zurück
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
                >
                  {currentStep === questions.length ? 'Analyse starten' : 'Weiter →'}
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
