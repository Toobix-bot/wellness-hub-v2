'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  EyeIcon,
  MoonIcon,
  SunIcon,
  CircleStackIcon,
  PuzzlePieceIcon,
  LightBulbIcon,
  SparklesIcon,
  BeakerIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface DualityPrinciple {
  id: string;
  title: string;
  symbol: string;
  description: string;
  examples: string[];
  practicalApplication: string;
  exercises: Exercise[];
  level: 'grundlagen' | 'fortgeschritten' | 'experte';
  category: 'dualität' | 'matrix' | 'bewusstsein' | 'realität';
  relatedPrinciples: string[];
}

interface Exercise {
  title: string;
  description: string;
  duration: string;
  steps: string[];
  insight: string;
}

interface MatrixLayer {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  howToTranscend: string[];
  color: string;
  depth: number;
}

const dualityPrinciples: DualityPrinciple[] = [
  {
    id: 'yin-yang',
    title: 'Yin und Yang - Das Grundprinzip der Polarität',
    symbol: '☯',
    description: 'Das fundamentale Prinzip der Dualität, das zeigt, wie entgegengesetzte Kräfte sich ergänzen und ein Ganzes bilden.',
    examples: [
      'Licht und Schatten',
      'Aktivität und Ruhe',
      'Maskulin und Feminin',
      'Logik und Intuition',
      'Geburt und Tod'
    ],
    practicalApplication: 'Erkenne beide Aspekte in jeder Situation und suche die Balance zwischen den Polen.',
    exercises: [
      {
        title: 'Polaritäts-Meditation',
        description: 'Eine Meditation zur Erkennung der Dualität in dir selbst',
        duration: '15-20 Minuten',
        steps: [
          'Setze dich bequem hin und schließe die Augen',
          'Atme tief ein und aus, bis du entspannt bist',
          'Denke an einen Aspekt deiner Persönlichkeit (z.B. deine Stärke)',
          'Erkenne nun den gegenteiligen Aspekt (z.B. deine Verletzlichkeit)',
          'Beobachte, wie beide Aspekte in dir existieren können',
          'Spüre, wie sie sich ergänzen und vervollständigen',
          'Akzeptiere beide Seiten als Teil deines Ganzen'
        ],
        insight: 'Wahre Ganzheit entsteht durch die Akzeptanz und Integration beider Polaritäten.'
      }
    ],
    level: 'grundlagen',
    category: 'dualität',
    relatedPrinciples: ['hermetic-laws', 'as-above-so-below']
  },
  {
    id: 'hermetic-laws',
    title: 'Die Hermetischen Gesetze',
    symbol: '🔺',
    description: 'Sieben universelle Prinzipien, die das Funktionieren des Universums auf allen Ebenen beschreiben.',
    examples: [
      'Wie oben, so unten (Entsprechung)',
      'Alles schwingt (Schwingung)',
      'Alles fließt (Rhythmus)',
      'Alles hat zwei Pole (Polarität)',
      'Alles hat ein Geschlecht (Geschlecht)',
      'Jede Ursache hat eine Wirkung (Kausalität)',
      'Alles ist Geist (Mentalismus)'
    ],
    practicalApplication: 'Nutze diese Gesetze als Schlüssel zum Verständnis der Realität und zur bewussten Gestaltung deines Lebens.',
    exercises: [
      {
        title: 'Gesetz der Entsprechung anwenden',
        description: 'Erkenne Muster zwischen verschiedenen Ebenen der Realität',
        duration: '10-15 Minuten täglich',
        steps: [
          'Wähle eine Herausforderung in deinem Leben',
          'Betrachte sie auf der emotionalen Ebene',
          'Suche entsprechende Muster auf der mentalen Ebene',
          'Erkenne die Entsprechung auf der spirituellen Ebene',
          'Finde Lösungsansätze durch diese Perspektiven',
          'Wende die Erkenntnisse praktisch an'
        ],
        insight: 'Die Lösung auf einer Ebene spiegelt sich in allen anderen Ebenen wider.'
      }
    ],
    level: 'fortgeschritten',
    category: 'matrix',
    relatedPrinciples: ['yin-yang', 'reality-layers']
  },
  {
    id: 'maya-illusion',
    title: 'Maya - Die Illusion der Trennung',
    symbol: '🎭',
    description: 'Das Konzept, dass die wahrgenommene Trennung zwischen Selbst und Universum eine Illusion ist.',
    examples: [
      'Ich vs. Du - Dualität des Ego',
      'Innen vs. Außen - Projektionen',
      'Vergangenheit vs. Zukunft - Zeitillusion',
      'Gut vs. Böse - Moralische Dualität',
      'Materie vs. Geist - Substanzdualität'
    ],
    practicalApplication: 'Erkenne die Einheit hinter der scheinbaren Vielheit und löse dich von der Illusion der Trennung.',
    exercises: [
      {
        title: 'Einheits-Erfahrung',
        description: 'Eine Übung zur direkten Erfahrung der Nicht-Dualität',
        duration: '20-30 Minuten',
        steps: [
          'Setze dich vor einen Spiegel',
          'Schaue in deine eigenen Augen',
          'Frage: "Wer schaut hier wen an?"',
          'Lass die Grenzen zwischen Beobachter und Beobachtetem verschwimmen',
          'Spüre die Einheit des Bewusstseins',
          'Übertrage diese Erfahrung auf andere Begegnungen'
        ],
        insight: 'Der Beobachter und das Beobachtete sind eins - Trennung ist nur eine Illusion des Geistes.'
      }
    ],
    level: 'experte',
    category: 'bewusstsein',
    relatedPrinciples: ['consciousness-levels', 'reality-layers']
  },
  {
    id: 'consciousness-levels',
    title: 'Bewusstseinsebenen und ihre Matrix',
    symbol: '🧠',
    description: 'Verschiedene Ebenen des Bewusstseins, die jeweils ihre eigene Realitätsmatrix erschaffen.',
    examples: [
      'Unbewusstes - Instinktive Reaktionen',
      'Unterbewusstes - Automatische Muster',
      'Bewusstes - Rationale Entscheidungen',
      'Überbewusstes - Intuitive Weisheit',
      'Kosmisches Bewusstsein - Einheit'
    ],
    practicalApplication: 'Erkenne, auf welcher Bewusstseinsebene du operierst und lerne, bewusst zwischen ihnen zu wechseln.',
    exercises: [
      {
        title: 'Bewusstseinsebenen-Scan',
        description: 'Tägliche Überprüfung deiner aktuellen Bewusstseinsebene',
        duration: '5-10 Minuten',
        steps: [
          'Halte mehrmals am Tag inne',
          'Frage: "Von welcher Ebene aus handle ich gerade?"',
          'Erkenne automatische vs. bewusste Reaktionen',
          'Identifiziere emotionale vs. rationale Entscheidungen',
          'Spüre intuitive Impulse',
          'Wähle bewusst die angemessene Ebene'
        ],
        insight: 'Bewusstheit über deine Bewusstseinsebene gibt dir die Macht der Wahl.'
      }
    ],
    level: 'fortgeschritten',
    category: 'bewusstsein',
    relatedPrinciples: ['maya-illusion', 'reality-creation']
  },
  {
    id: 'reality-creation',
    title: 'Realitätserstellung durch Bewusstsein',
    symbol: '🌐',
    description: 'Das Prinzip, dass Bewusstsein die Realität formt und nicht umgekehrt.',
    examples: [
      'Gedanken erschaffen Emotionen',
      'Überzeugungen formen Erfahrungen',
      'Aufmerksamkeit lenkt Manifestation',
      'Intention bestimmt Richtung',
      'Bewusstsein kollabiert Wahrscheinlichkeiten'
    ],
    practicalApplication: 'Übernimm bewusst Verantwortung für deine Realität durch bewusste Gedanken und Intentionen.',
    exercises: [
      {
        title: 'Realitäts-Experiment',
        description: 'Bewusste Manifestation kleiner Veränderungen',
        duration: '1 Woche täglich 10 Minuten',
        steps: [
          'Wähle eine kleine, messbare Veränderung',
          'Visualisiere sie täglich 10 Minuten',
          'Fühle die Emotion des bereits Erreichten',
          'Handle so, als wäre es bereits Realität',
          'Beobachte Synchronizitäten und Möglichkeiten',
          'Dokumentiere Veränderungen und Erkenntnisse'
        ],
        insight: 'Deine Realität ist ein Spiegel deines Bewusstseinszustandes.'
      }
    ],
    level: 'fortgeschritten',
    category: 'realität',
    relatedPrinciples: ['consciousness-levels', 'quantum-field']
  }
];

const matrixLayers: MatrixLayer[] = [
  {
    id: 'physical',
    name: 'Physische Matrix',
    description: 'Die materielle Welt der Sinneswahrnehmung',
    characteristics: [
      'Scheinbare Festigkeit der Materie',
      'Lineare Zeitwahrnehmung',
      'Raumbegrenzungen',
      'Kausalität',
      'Dualität von Subjekt und Objekt'
    ],
    howToTranscend: [
      'Erkenne die Quantennatur der Materie',
      'Praktiziere Achtsamkeit im Hier und Jetzt',
      'Meditiere über die Raumlosigkeit des Bewusstseins',
      'Verstehe synchronistische Verbindungen',
      'Erfahre die Einheit hinter der Vielheit'
    ],
    color: 'red',
    depth: 1
  },
  {
    id: 'emotional',
    name: 'Emotionale Matrix',
    description: 'Die Welt der Gefühle und reaktiven Muster',
    characteristics: [
      'Automatische emotionale Reaktionen',
      'Identifikation mit Gefühlen',
      'Drama und Konflikt',
      'Opfer-Täter-Retter Dynamiken',
      'Emotionale Abhängigkeiten'
    ],
    howToTranscend: [
      'Beobachte Emotionen ohne Identifikation',
      'Erkenne Emotionen als Energie in Bewegung',
      'Praktiziere emotionale Alchemie',
      'Löse dich von reaktiven Mustern',
      'Kultiviere inneren Frieden'
    ],
    color: 'orange',
    depth: 2
  },
  {
    id: 'mental',
    name: 'Mentale Matrix',
    description: 'Die Welt der Gedanken und Konzepte',
    characteristics: [
      'Endlose Gedankenschleifen',
      'Identifikation mit dem Verstand',
      'Konzeptuelle Begrenzungen',
      'Dualistische Denkweisen',
      'Mentale Konditionierungen'
    ],
    howToTranscend: [
      'Erkenne dich als Beobachter der Gedanken',
      'Praktiziere gedankenfreie Zustände',
      'Hinterfrage grundlegende Annahmen',
      'Löse dich von konzeptuellen Identitäten',
      'Kultiviere stille Präsenz'
    ],
    color: 'yellow',
    depth: 3
  },
  {
    id: 'spiritual',
    name: 'Spirituelle Matrix',
    description: 'Die Welt der spirituellen Konzepte und Praktiken',
    characteristics: [
      'Spirituelle Identitäten und Rollen',
      'Konzepte von Erleuchtung',
      'Hierarchische Bewusstseinsmodelle',
      'Spiritueller Materialismus',
      'Suche nach höheren Zuständen'
    ],
    howToTranscend: [
      'Erkenne auch spirituelle Konzepte als Konstrukte',
      'Lass alle Identitäten los, auch die spirituelle',
      'Erkenne die Perfektion des gegenwärtigen Moments',
      'Löse dich von der Suche nach Erfahrungen',
      'Erkenne die Suchende als das Gesuchte'
    ],
    color: 'purple',
    depth: 4
  },
  {
    id: 'unity',
    name: 'Einheits-Bewusstsein',
    description: 'Jenseits aller Matrizen - Reines Sein',
    characteristics: [
      'Keine Subjekt-Objekt Trennung',
      'Zeitlose Präsenz',
      'Bedingungslose Liebe',
      'Absolute Stille',
      'Reines Gewahrsein'
    ],
    howToTranscend: [
      'Es gibt nichts zu transzendieren',
      'Du bist bereits das, was du suchst',
      'Erkenne dein wahres Wesen als Bewusstsein selbst',
      'Ruhe als das, was du wirklich bist',
      'Erkenne: Es gibt nur EINS'
    ],
    color: 'white',
    depth: 5
  }
];

export default function DualitaetMatrixPage() {
  const [selectedPrinciple, setSelectedPrinciple] = useState<DualityPrinciple | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<MatrixLayer | null>(null);
  const [activeTab, setActiveTab] = useState<'principles' | 'matrix' | 'integration'>('principles');
  const [practiceMode, setPracticeMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeftIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Dualität & Matrix Grundlagen
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Verstehe die fundamentalen Prinzipien der Realitätsstruktur
              </p>
            </div>
          </div>
          <div className="text-4xl">☯️</div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-xl p-1 mb-8 shadow-lg">
          {[
            { id: 'principles', label: 'Dualitäts-Prinzipien', icon: CircleStackIcon },
            { id: 'matrix', label: 'Matrix-Ebenen', icon: CircleStackIcon },
            { id: 'integration', label: 'Integration & Praxis', icon: PuzzlePieceIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dualitäts-Prinzipien Tab */}
        {activeTab === 'principles' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dualityPrinciples.map((principle) => (
                <motion.div
                  key={principle.id}
                  onClick={() => setSelectedPrinciple(principle)}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-3xl">{principle.symbol}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {principle.title.split(' - ')[0]}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        principle.level === 'grundlagen' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : principle.level === 'fortgeschritten'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {principle.level}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {principle.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-indigo-600 dark:text-indigo-400">
                      {principle.examples.length} Beispiele
                    </span>
                    <span className="text-sm text-purple-600 dark:text-purple-400">
                      {principle.exercises.length} Übung{principle.exercises.length !== 1 ? 'en' : ''}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Detailansicht Prinzip */}
            <AnimatePresence>
              {selectedPrinciple && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{selectedPrinciple.symbol}</div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {selectedPrinciple.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                          {selectedPrinciple.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPrinciple(null)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Beispiele */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        📝 Praktische Beispiele:
                      </h3>
                      <div className="space-y-2">
                        {selectedPrinciple.examples.map((example, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            <span className="text-gray-700 dark:text-gray-300">{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Anwendung */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        🎯 Praktische Anwendung:
                      </h3>
                      <div className="p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300">
                          {selectedPrinciple.practicalApplication}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Übungen */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                      🧘‍♀️ Praktische Übungen:
                    </h3>
                    {selectedPrinciple.exercises.map((exercise, index) => (
                      <div key={index} className="bg-purple-50 dark:bg-purple-900 rounded-xl p-6 mb-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-semibold text-purple-800 dark:text-purple-200">
                              {exercise.title}
                            </h4>
                            <p className="text-purple-600 dark:text-purple-300 mt-1">
                              {exercise.description}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                            {exercise.duration}
                          </span>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                            Schritte:
                          </h5>
                          <ol className="space-y-2">
                            {exercise.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start space-x-3">
                                <span className="flex items-center justify-center w-6 h-6 bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full text-sm font-semibold">
                                  {stepIndex + 1}
                                </span>
                                <span className="text-purple-700 dark:text-purple-300">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="p-4 bg-purple-100 dark:bg-purple-800 rounded-lg">
                          <h5 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                            💡 Erkenntnis:
                          </h5>
                          <p className="text-purple-700 dark:text-purple-300 italic">
                            "{exercise.insight}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Matrix-Ebenen Tab */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                🌐 Die Ebenen der Matrix
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Jede Bewusstseinsebene erschafft ihre eigene Realitätsmatrix. Um wahrhaft frei zu sein, 
                müssen wir alle Ebenen erkennen und transzendieren.
              </p>
            </div>

            <div className="space-y-4">
              {matrixLayers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  className={`bg-gradient-to-r from-${layer.color}-50 to-white dark:from-${layer.color}-900 dark:to-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedLayer(selectedLayer?.id === layer.id ? null : layer)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-${layer.color}-200 dark:bg-${layer.color}-800 rounded-full flex items-center justify-center font-bold text-${layer.color}-800 dark:text-${layer.color}-200`}>
                        {layer.depth}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {layer.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {layer.description}
                        </p>
                      </div>
                    </div>
                    <ChevronDownIcon className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
                      selectedLayer?.id === layer.id ? 'rotate-180' : ''
                    }`} />
                  </div>

                  <AnimatePresence>
                    {selectedLayer?.id === layer.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                              🎭 Charakteristika:
                            </h4>
                            <ul className="space-y-2">
                              {layer.characteristics.map((char, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <ExclamationTriangleIcon className="h-4 w-4 text-orange-500 mt-0.5" />
                                  <span className="text-gray-700 dark:text-gray-300 text-sm">{char}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                              🚀 Wie transzendieren:
                            </h4>
                            <ul className="space-y-2">
                              {layer.howToTranscend.map((method, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span className="text-gray-700 dark:text-gray-300 text-sm">{method}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Integration & Praxis Tab */}
        {activeTab === 'integration' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                🎯 Integration in den Alltag
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Wahre Transformation geschieht durch die praktische Anwendung dieser Prinzipien im täglichen Leben.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Morgendliche Matrix-Reflexion',
                    description: 'Beginne jeden Tag mit der Frage: "Aus welcher Bewusstseinsebene heraus möchte ich heute leben?"',
                    icon: SunIcon,
                    color: 'yellow'
                  },
                  {
                    title: 'Dualitäts-Bewusstsein',
                    description: 'Erkenne in Konflikten beide Seiten und suche die Balance zwischen den Polen.',
                    icon: CircleStackIcon,
                    color: 'blue'
                  },
                  {
                    title: 'Realitäts-Check',
                    description: 'Frage dich regelmäßig: "Welche Matrix-Ebene bestimmt gerade meine Wahrnehmung?"',
                    icon: EyeIcon,
                    color: 'purple'
                  },
                  {
                    title: 'Einheits-Momente',
                    description: 'Suche täglich Momente der Stille, um das Einheitsbewusstsein zu kultivieren.',
                    icon: SparklesIcon,
                    color: 'indigo'
                  },
                  {
                    title: 'Polaritäts-Integration',
                    description: 'Akzeptiere und integriere alle Aspekte deiner Persönlichkeit als Ganzes.',
                    icon: MoonIcon,
                    color: 'gray'
                  },
                  {
                    title: 'Bewusste Schöpfung',
                    description: 'Erschaffe bewusst deine Realität durch Gedanken, Gefühle und Handlungen.',
                    icon: LightBulbIcon,
                    color: 'green'
                  }
                ].map((practice, index) => (
                  <div key={index} className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md`}>
                    <div className={`w-12 h-12 bg-${practice.color}-100 dark:bg-${practice.color}-900 rounded-lg flex items-center justify-center mb-4`}>
                      <practice.icon className={`h-6 w-6 text-${practice.color}-600 dark:text-${practice.color}-400`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {practice.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {practice.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fortschritts-Tracker */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                📈 Dein Bewusstseins-Fortschritt
              </h3>
              <div className="space-y-4">
                {matrixLayers.slice(0, -1).map((layer, index) => (
                  <div key={layer.id} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 bg-${layer.color}-200 dark:bg-${layer.color}-800 rounded-full flex items-center justify-center text-sm font-bold text-${layer.color}-800 dark:text-${layer.color}-200`}>
                      {layer.depth}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {layer.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {Math.floor(Math.random() * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`bg-${layer.color}-500 h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Hilfsfunktion für Chevron Icon
function ChevronDownIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
