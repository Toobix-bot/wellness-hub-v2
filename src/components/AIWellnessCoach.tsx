'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { userStatsStorage, moodStorage, activitiesStorage } from '@/utils/wellnessStorage';
import { scientificSources } from '@/utils/scientificData';

interface CoachingSession {
  id: string;
  type: 'assessment' | 'guidance' | 'intervention' | 'reflection';
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  scientificBasis: string;
  steps: CoachingStep[];
  personalizedContent?: PersonalizedContent;
}

interface CoachingStep {
  id: string;
  type: 'instruction' | 'exercise' | 'reflection' | 'breathing' | 'visualization';
  title: string;
  content: string;
  duration?: number;
  audioGuide?: string;
  scientificNote?: string;
}

interface PersonalizedContent {
  greeting: string;
  customTips: string[];
  focusAreas: string[];
  encouragement: string;
  nextSteps: string[];
}

interface CoachPersonality {
  name: string;
  avatar: string;
  specialty: string;
  style: 'gentle' | 'motivational' | 'scientific' | 'playful';
  description: string;
}

const coachPersonalities: CoachPersonality[] = [
  {
    name: 'Dr. Sarah Mindful',
    avatar: '👩‍⚕️',
    specialty: 'Achtsamkeit & Stressreduktion',
    style: 'gentle',
    description: 'Sanfte, wissenschaftlich fundierte Begleitung für innere Ruhe und Achtsamkeit'
  },
  {
    name: 'Prof. Max Energy',
    avatar: '🧑‍🏫',
    specialty: 'Motivation & Zielerreichung',
    style: 'motivational',
    description: 'Energetische Unterstützung für deine Ziele mit evidenzbasierten Methoden'
  },
  {
    name: 'Dr. Alex Research',
    avatar: '🔬',
    specialty: 'Neurowissenschaft & Optimization',
    style: 'scientific',
    description: 'Präzise, datenbasierte Coaching-Ansätze mit neuesten wissenschaftlichen Erkenntnissen'
  },
  {
    name: 'Luna Creative',
    avatar: '🎨',
    specialty: 'Kreativität & Transformation',
    style: 'playful',
    description: 'Spielerische und kreative Methoden für persönliche Entwicklung und Freude'
  }
];

const sessionTemplates: Omit<CoachingSession, 'id' | 'personalizedContent'>[] = [
  {
    type: 'assessment',
    title: 'Wellness-Gesundheitscheck',
    description: 'Umfassende Analyse deines aktuellen Wellness-Zustands',
    duration: 15,
    difficulty: 'beginner',
    scientificBasis: 'Basiert auf validiertem Stress-Assessment und Wohlbefindens-Indizes aus der positiven Psychologie',
    steps: [
      {
        id: 'intro',
        type: 'instruction',
        title: 'Willkommen zum Wellness-Check',
        content: 'In den nächsten 15 Minuten analysieren wir gemeinsam deinen aktuellen Wellness-Zustand. Sei ehrlich zu dir selbst - das ist der Schlüssel für optimale Empfehlungen.',
        scientificNote: 'Selbstreflexion aktiviert den präfrontalen Cortex und verbessert die Selbstwahrnehmung.'
      },
      {
        id: 'body-scan',
        type: 'exercise',
        title: 'Körperlicher Zustand',
        content: 'Schließe die Augen und scanne deinen Körper von Kopf bis Fuß. Wo spürst du Anspannungen? Wo fühlst du dich entspannt?',
        duration: 3,
        scientificNote: 'Body-Scan aktiviert die Insula und verbessert die Körperwahrnehmung.'
      },
      {
        id: 'emotion-check',
        type: 'reflection',
        title: 'Emotionale Bewertung',
        content: 'Wie würdest du deine emotionale Verfassung beschreiben? Welche Gefühle dominieren gerade?',
        duration: 2
      },
      {
        id: 'energy-assessment',
        type: 'reflection',
        title: 'Energie-Level',
        content: 'Auf einer Skala von 1-10: Wie energiegeladen fühlst du dich? Was könnte dein Energielevel beeinflussen?',
        duration: 2
      },
      {
        id: 'stress-evaluation',
        type: 'reflection',
        title: 'Stress-Faktoren',
        content: 'Identifiziere deine Hauptstressoren. Was belastet dich gerade am meisten?',
        duration: 3
      },
      {
        id: 'summary',
        type: 'instruction',
        title: 'Assessment-Zusammenfassung',
        content: 'Basierend auf deinen Antworten erstelle ich nun deine personalisierte Wellness-Strategie.',
        duration: 5
      }
    ]
  },
  {
    type: 'guidance',
    title: 'Stress-Transformation Session',
    description: 'Wissenschaftlich fundierte Techniken zur sofortigen Stressreduktion',
    duration: 20,
    difficulty: 'intermediate',
    scientificBasis: 'Kombiniert MBSR (Mindfulness-Based Stress Reduction) mit kognitiver Neubewertung',
    steps: [
      {
        id: 'stress-recognition',
        type: 'instruction',
        title: 'Stress verstehen',
        content: 'Stress ist eine natürliche Reaktion deines Körpers. Das Ziel ist nicht, Stress zu eliminieren, sondern ihn zu transformieren.',
        scientificNote: 'Stress aktiviert die HPA-Achse. Achtsamkeit kann diese Reaktion modulieren.'
      },
      {
        id: 'breathing-reset',
        type: 'breathing',
        title: '4-7-8 Atemtechnik',
        content: 'Atme 4 Sekunden ein, halte 7 Sekunden an, atme 8 Sekunden aus. Wiederhole 4 Zyklen.',
        duration: 5,
        scientificNote: 'Diese Technik aktiviert den Parasympathikus und reduziert Cortisol.'
      },
      {
        id: 'cognitive-reframe',
        type: 'exercise',
        title: 'Gedankentransformation',
        content: 'Identifiziere einen Stressgedanken. Frage dich: "Ist das wirklich wahr? Gibt es eine andere Perspektive?"',
        duration: 5
      },
      {
        id: 'body-relaxation',
        type: 'exercise',
        title: 'Progressive Muskelentspannung',
        content: 'Spanne verschiedene Muskelgruppen an und entspanne sie bewusst. Beginne mit den Füßen.',
        duration: 7
      },
      {
        id: 'integration',
        type: 'reflection',
        title: 'Integration & Commitment',
        content: 'Wie fühlst du dich jetzt? Welche Technik war am wirksamsten? Wann wirst du sie wieder anwenden?',
        duration: 3
      }
    ]
  },
  {
    type: 'intervention',
    title: 'Notfall-Ruhe-Protokoll',
    description: 'Sofortige Beruhigung in akuten Stress- oder Angstsituationen',
    duration: 10,
    difficulty: 'beginner',
    scientificBasis: 'Basiert auf Trauma-informierter Stabilisierungstechnik und Vagus-Nerv-Aktivierung',
    steps: [
      {
        id: 'grounding-54321',
        type: 'exercise',
        title: '5-4-3-2-1 Grounding',
        content: 'Benenne: 5 Dinge die du siehst, 4 die du hörst, 3 die du fühlst, 2 die du riechst, 1 das du schmeckst.',
        duration: 3,
        scientificNote: 'Grounding aktiviert den präfrontalen Cortex und reduziert Amygdala-Aktivität.'
      },
      {
        id: 'emergency-breathing',
        type: 'breathing',
        title: 'Box-Breathing',
        content: 'Atme 4 Sekunden ein, halte 4 Sekunden, atme 4 Sekunden aus, halte 4 Sekunden. Wiederhole.',
        duration: 4
      },
      {
        id: 'self-compassion',
        type: 'instruction',
        title: 'Selbstmitgefühl',
        content: 'Lege eine Hand auf dein Herz. Sage dir: "Das ist ein Moment des Leidens. Leiden gehört zum Menschsein. Möge ich mir Mitgefühl geben."',
        duration: 2
      },
      {
        id: 'safety-affirmation',
        type: 'instruction',
        title: 'Sicherheits-Affirmation',
        content: 'Wiederhole: "Ich bin jetzt sicher. Dieser Moment wird vorübergehen. Ich habe schon schwierige Zeiten überstanden."',
        duration: 1
      }
    ]
  }
];

export default function AIWellnessCoach() {
  const [selectedCoach, setSelectedCoach] = useState<CoachPersonality>(coachPersonalities[0]);
  const [currentSession, setCurrentSession] = useState<CoachingSession | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [personalizedSessions, setPersonalizedSessions] = useState<CoachingSession[]>([]);
  const [sessionNotes, setSessionNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    generatePersonalizedSessions();
  }, [selectedCoach]);

  const generatePersonalizedSessions = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const userStats = userStatsStorage.get();
      const recentMoods = moodStorage.get().slice(0, 7);
      const recentActivities = activitiesStorage.get().slice(0, 20);

      const personalizedContent: PersonalizedContent = {
        greeting: generatePersonalizedGreeting(selectedCoach, userStats),
        customTips: generateCustomTips(selectedCoach, userStats, recentMoods),
        focusAreas: generateFocusAreas(userStats, recentMoods, recentActivities),
        encouragement: generateEncouragement(selectedCoach, userStats),
        nextSteps: generateNextSteps(selectedCoach, userStats)
      };

      const sessions = sessionTemplates.map(template => ({
        ...template,
        id: `${template.type}-${Date.now()}-${Math.random()}`,
        personalizedContent
      }));

      setPersonalizedSessions(sessions);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generatePersonalizedGreeting = (coach: CoachPersonality, stats: any): string => {
    const greetings = {
      gentle: `Hallo! Ich bin ${coach.name}. Es freut mich, dich heute begleiten zu dürfen. Lass uns gemeinsam einen Moment der Ruhe schaffen.`,
      motivational: `Hey Champion! ${coach.name} hier! Bereit, heute wieder ein Stück weiterzukommen? Ich glaube an dich!`,
      scientific: `Grüßt Sie, ich bin ${coach.name}. Basierend auf aktueller Forschung erstelle ich für Sie optimierte Wellness-Strategien.`,
      playful: `Hi! ${coach.name} hier! 🌈 Lass uns heute etwas Magisches für dein Wohlbefinden entdecken!`
    };
    return greetings[coach.style];
  };

  const generateCustomTips = (coach: CoachPersonality, stats: any, moods: any[]): string[] => {
    const tips = [];
    
    if (stats.currentStreak > 7) {
      tips.push(`Wow! ${stats.currentStreak} Tage Streak - dein Gehirn bildet bereits neue neuronale Pfade!`);
    }
    
    if (moods.length > 0) {
      const avgMood = moods.reduce((sum, m) => sum + m.mood, 0) / moods.length;
      if (avgMood < 5) {
        tips.push('Deine Stimmungsdaten zeigen Raum für Verbesserung - lass uns das angehen!');
      } else if (avgMood > 7) {
        tips.push('Deine positive Stimmungstendenz ist großartig - so erhalten wir sie!');
      }
    }

    tips.push('Bereits 8 Wochen regelmäßiger Praxis können messbare Gehirnveränderungen bewirken.');
    
    return tips;
  };

  const generateFocusAreas = (stats: any, moods: any[], activities: any[]): string[] => {
    const areas = [];
    
    if (stats.currentStreak === 0) areas.push('Konsistenz aufbauen');
    if (moods.some(m => m.mood < 4)) areas.push('Stimmungsregulation');
    if (activities.filter(a => a.moduleId === 'stille').length < 3) areas.push('Achtsamkeitspraxis');
    
    return areas.length > 0 ? areas : ['Ganzheitliches Wohlbefinden', 'Selbstfürsorge'];
  };

  const generateEncouragement = (coach: CoachPersonality, stats: any): string => {
    const encouragements = {
      gentle: 'Du machst bereits den wichtigsten Schritt - du kümmerst dich um dich selbst. Das ist mutig und wertvoll.',
      motivational: 'Du hast schon so viel erreicht! Jeder kleine Schritt bringt dich deinem besten Selbst näher!',
      scientific: 'Ihre Bereitschaft zur Selbstoptimierung zeigt hohe emotionale Intelligenz - ein Prädiktor für Lebenserfolg.',
      playful: 'Du bist ein Wellness-Abenteurer! Jede Session ist wie ein neues Level in deinem Lebensspiel! 🎮'
    };
    return encouragements[coach.style];
  };

  const generateNextSteps = (coach: CoachPersonality, stats: any): string[] => {
    return [
      'Tägliche 5-Minuten Achtsamkeitspraxis',
      'Wöchentliche Fortschrittsbewertung',
      'Experimentieren mit verschiedenen Techniken',
      'Aufbau einer personalisierten Wellness-Routine'
    ];
  };

  const startSession = (session: CoachingSession) => {
    setCurrentSession(session);
    setCurrentStepIndex(0);
    setSessionStarted(true);
    setSessionCompleted(false);
    setSessionNotes({});
  };

  const nextStep = () => {
    if (currentSession && currentStepIndex < currentSession.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      completeSession();
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const completeSession = () => {
    setSessionCompleted(true);
    
    // Statistiken aktualisieren
    if (currentSession) {
      activitiesStorage.add({
        moduleId: 'ai-coach',
        name: currentSession.title,
        duration: currentSession.duration,
        timestamp: new Date(),
        notes: 'KI-Coach Session abgeschlossen'
      });

      // XP vergeben
      const userStats = userStatsStorage.get();
      userStats.totalPoints += currentSession.duration * 10;
      userStatsStorage.update(userStats);
    }
  };

  const resetSession = () => {
    setCurrentSession(null);
    setCurrentStepIndex(0);
    setSessionStarted(false);
    setSessionCompleted(false);
    setSessionNotes({});
  };

  const currentStep = currentSession?.steps[currentStepIndex];

  return (
    <div className="space-y-6">
      {/* Coach Selection */}
      {!sessionStarted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              🤖 KI-Wellness-Coach
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Wähle deinen persönlichen KI-Coach für evidenzbasierte Wellness-Sessions
            </p>
          </div>

          {/* Coach Personalities */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coachPersonalities.map((coach) => (
              <motion.div
                key={coach.name}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => setSelectedCoach(coach)}
                className={`p-6 rounded-2xl cursor-pointer transition-all ${
                  selectedCoach.name === coach.name
                    ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 hover:shadow-lg border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{coach.avatar}</div>
                  <h3 className={`font-bold mb-1 ${
                    selectedCoach.name === coach.name ? 'text-white' : 'text-gray-800 dark:text-white'
                  }`}>
                    {coach.name}
                  </h3>
                  <p className={`text-sm mb-2 ${
                    selectedCoach.name === coach.name ? 'text-purple-100' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {coach.specialty}
                  </p>
                  <p className={`text-xs ${
                    selectedCoach.name === coach.name ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {coach.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Personalized Sessions */}
          {isAnalyzing ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-4"
              >
                🧠
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                KI analysiert deine Daten...
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedCoach.name} erstellt personalisierte Sessions für dich
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-3xl">{selectedCoach.avatar}</div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">
                      {selectedCoach.personalizedContent?.greeting || selectedCoach.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Bereit für deine personalisierte Wellness-Session?
                    </p>
                  </div>
                </div>
                
                {personalizedSessions[0]?.personalizedContent && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        💡 Personalisierte Tipps:
                      </h4>
                      <ul className="space-y-1">
                        {personalizedSessions[0].personalizedContent.customTips.map((tip, index) => (
                          <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start space-x-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3">
                      <p className="text-sm italic text-gray-700 dark:text-gray-300">
                        "{personalizedSessions[0].personalizedContent.encouragement}"
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {personalizedSessions.map((session) => (
                  <motion.div
                    key={session.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl">
                        {session.type === 'assessment' && '📊'}
                        {session.type === 'guidance' && '🧭'}
                        {session.type === 'intervention' && '🚨'}
                        {session.type === 'reflection' && '🤔'}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                          {session.duration} Min
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          session.difficulty === 'beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                          session.difficulty === 'intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' :
                          'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                        }`}>
                          {session.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                      {session.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {session.description}
                    </p>
                    
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        <strong>Wissenschaftliche Basis:</strong> {session.scientificBasis}
                      </p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startSession(session)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
                    >
                      Session starten 🚀
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Active Session */}
      {sessionStarted && currentSession && !sessionCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
            {/* Session Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{selectedCoach.avatar}</div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      {currentSession.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      mit {selectedCoach.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Schritt {currentStepIndex + 1} von {currentSession.steps.length}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={resetSession}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    ✕
                  </motion.button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStepIndex + 1) / currentSession.steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Current Step Content */}
            {currentStep && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="text-5xl mb-4">
                    {currentStep.type === 'instruction' && '📝'}
                    {currentStep.type === 'exercise' && '🏃‍♂️'}
                    {currentStep.type === 'reflection' && '🤔'}
                    {currentStep.type === 'breathing' && '🫁'}
                    {currentStep.type === 'visualization' && '🎨'}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {currentStep.title}
                  </h3>
                  {currentStep.duration && (
                    <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold mb-4">
                      ⏱️ {currentStep.duration} Minuten
                    </div>
                  )}
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
                    <p className="text-gray-800 dark:text-white leading-relaxed text-lg">
                      {currentStep.content}
                    </p>
                  </div>

                  {currentStep.scientificNote && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-blue-500">🔬</span>
                        <span className="font-semibold text-blue-800 dark:text-blue-200 text-sm">
                          Wissenschaftlicher Hintergrund
                        </span>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        {currentStep.scientificNote}
                      </p>
                    </div>
                  )}

                  {/* Notes Section */}
                  {(currentStep.type === 'reflection' || currentStep.type === 'exercise') && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        💭 Deine Notizen (optional):
                      </label>
                      <textarea
                        value={sessionNotes[currentStep.id] || ''}
                        onChange={(e) => setSessionNotes(prev => ({
                          ...prev,
                          [currentStep.id]: e.target.value
                        }))}
                        placeholder="Schreibe deine Gedanken, Erkenntnisse oder Erfahrungen auf..."
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-white resize-none"
                        rows={3}
                      />
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={previousStep}
                    disabled={currentStepIndex === 0}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                  >
                    ← Zurück
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg"
                  >
                    {currentStepIndex === currentSession.steps.length - 1 ? 'Session beenden ✨' : 'Weiter →'}
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Session Completed */}
      {sessionCompleted && currentSession && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800/50">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🎉
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Session erfolgreich abgeschlossen!
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Fantastisch! Du hast "{currentSession.title}" gemeistert. 
              {selectedCoach.name} ist stolz auf dich!
            </p>

            <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">Dauer:</span>
                  <div className="text-purple-600 dark:text-purple-400">{currentSession.duration} Minuten</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">XP erhalten:</span>
                  <div className="text-green-600 dark:text-green-400">+{currentSession.duration * 10} XP</div>
                </div>
              </div>
            </div>

            {currentSession.personalizedContent?.nextSteps && (
              <div className="text-left mb-6">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                  🎯 Empfohlene nächste Schritte:
                </h3>
                <ul className="space-y-2">
                  {currentSession.personalizedContent.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetSession}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
              >
                Neue Session starten
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Zum Dashboard
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
