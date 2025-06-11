'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface TransformationArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'mindset' | 'habits' | 'goals' | 'identity' | 'relationships' | 'purpose';
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  name: string;
  duration: string;
  description: string;
  steps: string[];
  reflection: string[];
}

interface PersonalInsight {
  date: string;
  insight: string;
  area: string;
}

export default function TransformationPage() {
  const [selectedArea, setSelectedArea] = useState<TransformationArea | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [insights, setInsights] = useState<PersonalInsight[]>([]);
  const [currentInsight, setCurrentInsight] = useState('');

  const transformationAreas: TransformationArea[] = [
    {
      id: 'mindset',
      title: 'Mindset & Glaubenssätze',
      description: 'Limitierende Überzeugungen erkennen und transformieren',
      icon: '🧠',
      category: 'mindset',
      exercises: [
        {
          id: 'limiting-beliefs',
          name: 'Glaubenssatz-Detektor',
          duration: '15 Min',
          description: 'Erkenne und verwandle limitierende Überzeugungen',
          steps: [
            'Denke an ein Ziel, das du nicht erreichst',
            'Frage dich: "Was glaube ich, warum das nicht möglich ist?"',
            'Schreibe alle Gedanken ungefiltert auf',
            'Identifiziere das Grundmuster: "Ich bin nicht...", "Ich kann nicht..."',
            'Verwandle jeden Glaubenssatz in eine positive Möglichkeit'
          ],
          reflection: [
            'Welcher Glaubenssatz hat mich am meisten überrascht?',
            'Welche neuen Möglichkeiten eröffnen sich durch die Transformation?',
            'Welchen ersten kleinen Schritt kann ich heute gehen?'
          ]
        },
        {
          id: 'growth-mindset',
          name: 'Wachstums-Mindset aktivieren',
          duration: '10 Min',
          description: 'Von "Ich kann das nicht" zu "Ich kann das noch nicht"',
          steps: [
            'Denke an eine aktuelle Herausforderung',
            'Formuliere sie als "Ich kann das nicht"-Statement',
            'Füge das Wort "noch" hinzu: "Ich kann das noch nicht"',
            'Frage: "Was müsste ich lernen, um es zu können?"',
            'Erstelle einen Lernplan mit 3 konkreten Schritten'
          ],
          reflection: [
            'Wie verändert sich mein Gefühl durch das "noch"?',
            'Welche Lernmöglichkeiten sehe ich jetzt?',
            'Wer könnte mir beim Lernen helfen?'
          ]
        }
      ]
    },
    {
      id: 'habits',
      title: 'Gewohnheiten & Routinen',
      description: 'Positive Gewohnheiten aufbauen und schlechte ablegen',
      icon: '🔄',
      category: 'habits',
      exercises: [
        {
          id: 'habit-stacking',
          name: 'Gewohnheits-Verkettung',
          duration: '12 Min',
          description: 'Neue Gewohnheiten an bestehende koppeln',
          steps: [
            'Wähle eine neue Gewohnheit, die du etablieren willst',
            'Identifiziere eine bestehende, stabile Gewohnheit',
            'Formuliere: "Nachdem ich [bestehende Gewohnheit], werde ich [neue Gewohnheit]"',
            'Starte mit einer Mini-Version (2 Minuten oder weniger)',
            'Plane genau, wo und wann du es tun wirst'
          ],
          reflection: [
            'Welche bestehende Gewohnheit eignet sich am besten als Anker?',
            'Wie kann ich die neue Gewohnheit so klein wie möglich machen?',
            'Was sind mögliche Hindernisse und wie gehe ich damit um?'
          ]
        }
      ]
    },
    {
      id: 'identity',
      title: 'Identität & Selbstbild',
      description: 'Wer bin ich und wer will ich werden?',
      icon: '🦋',
      category: 'identity',
      exercises: [
        {
          id: 'future-self',
          name: 'Dialog mit dem zukünftigen Ich',
          duration: '20 Min',
          description: 'Verbindung zu deiner besten Version aufbauen',
          steps: [
            'Stelle dir dein Leben in 5 Jahren vor - bestmögliche Version',
            'Visualisiere: Wie siehst du aus? Was machst du? Wie fühlst du dich?',
            'Schreibe einen Brief von diesem zukünftigen Ich an dich heute',
            'Was würde dein zukünftiges Ich dir raten?',
            'Welche eine Entscheidung würdest du heute anders treffen?'
          ],
          reflection: [
            'Was hat mich an meiner zukünftigen Version am meisten inspiriert?',
            'Welche Eigenschaften will ich entwickeln?',
            'Welche erste Veränderung kann ich heute beginnen?'
          ]
        }
      ]
    },
    {
      id: 'purpose',
      title: 'Sinn & Zweck',
      description: 'Deine Lebensmission und Werte entdecken',
      icon: '🌟',
      category: 'purpose',
      exercises: [
        {
          id: 'values-discovery',
          name: 'Werte-Kompass',
          duration: '25 Min',
          description: 'Deine Kernwerte identifizieren und leben',
          steps: [
            'Schreibe 20 Werte auf, die dir wichtig sind (Familie, Freiheit, etc.)',
            'Reduziere auf die 10 wichtigsten',
            'Dann auf die 5 wichtigsten',
            'Definiere für jeden Wert: Was bedeutet er konkret für mich?',
            'Bewerte: Wie sehr lebe ich jeden Wert aktuell? (1-10)'
          ],
          reflection: [
            'Welche Diskrepanz zwischen Werten und Realität erkenne ich?',
            'Welcher Wert braucht mehr Aufmerksamkeit in meinem Leben?',
            'Wie kann ich meine wichtigsten Werte mehr leben?'
          ]
        }
      ]
    },
    {
      id: 'relationships',
      title: 'Beziehungen & Kommunikation',
      description: 'Tiefere Verbindungen zu dir und anderen schaffen',
      icon: '💞',
      category: 'relationships',
      exercises: [
        {
          id: 'communication-upgrade',
          name: 'Kommunikations-Upgrade',
          duration: '15 Min',
          description: 'Bewusster und empathischer kommunizieren',
          steps: [
            'Denke an eine herausfordernde Beziehung',
            'Schreibe auf: Was ist meine Geschichte über diese Person?',
            'Frage: Welche positiven Absichten könnte sie haben?',
            'Überlege: Wie trage ich zu den Problemen bei?',
            'Plane ein ehrliches, empathisches Gespräch'
          ],
          reflection: [
            'Welche neuen Perspektiven habe ich gewonnen?',
            'Wo kann ich mehr Verantwortung übernehmen?',
            'Wie will ich zukünftig anders kommunizieren?'
          ]
        }
      ]
    },
    {
      id: 'goals',
      title: 'Vision & Ziele',
      description: 'Klarheit über deine Richtung und den Weg dorthin',
      icon: '🎯',
      category: 'goals',
      exercises: [
        {
          id: 'vision-board',
          name: 'Inneres Vision Board',
          duration: '18 Min',
          description: 'Deine Träume visualisieren und konkretisieren',
          steps: [
            'Schließe die Augen und träume 5 Min von deinem idealen Leben',
            'Öffne die Augen und skizziere/beschreibe diese Vision',
            'Teile sie in 6 Lebensbereiche: Karriere, Beziehungen, Gesundheit, etc.',
            'Wähle für jeden Bereich ein konkretes 1-Jahres-Ziel',
            'Bestimme für jedes Ziel den ersten Schritt'
          ],
          reflection: [
            'Was in meiner Vision fühlt sich am wichtigsten an?',
            'Welche Ziele energetisieren mich am meisten?',
            'Welchen ersten Schritt kann ich diese Woche gehen?'
          ]
        }
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      mindset: 'from-purple-500 to-indigo-600',
      habits: 'from-blue-500 to-cyan-600',
      goals: 'from-green-500 to-teal-600',
      identity: 'from-pink-500 to-rose-600',
      relationships: 'from-red-500 to-pink-600',
      purpose: 'from-yellow-500 to-orange-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const saveInsight = () => {
    if (currentInsight.trim()) {
      const newInsight: PersonalInsight = {
        date: new Date().toLocaleDateString('de-DE'),
        insight: currentInsight,
        area: selectedArea?.title || 'Allgemein'
      };
      setInsights([newInsight, ...insights]);
      setCurrentInsight('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <span className="text-2xl">←</span>
                <span className="font-medium">Zurück zum Dashboard</span>
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">🦋 Transformation</h1>
              <p className="text-gray-600 mt-1">Persönliche Entwicklung und positiver Wandel</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedArea ? (
          <div className="space-y-8">
            {/* Personal Insights Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Meine Erkenntnisse</h3>
              {insights.length > 0 ? (
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {insights.slice(0, 3).map((insight, index) => (
                    <div key={index} className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-gray-700 text-sm">{insight.insight}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>{insight.area}</span>
                        <span>{insight.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Beginne mit einer Übung, um deine ersten Erkenntnisse zu sammeln.</p>
              )}
            </motion.div>

            {/* Transformation Areas */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Wähle deinen Transformationsbereich
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Jeder Bereich bietet tiefgreifende Übungen für persönliches Wachstum. 
                  Beginne dort, wo du die größte Veränderung suchst.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transformationAreas.map((area, index) => (
                  <motion.div
                    key={area.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gradient-to-br ${getCategoryColor(area.category)} p-6 rounded-2xl text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
                    onClick={() => setSelectedArea(area)}
                  >
                    <div className="text-4xl mb-4">{area.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{area.description}</p>
                    <div className="text-xs opacity-75">
                      {area.exercises.length} {area.exercises.length === 1 ? 'Übung' : 'Übungen'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Transformation Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                ⚡ Tägliche Transformations-Impulse
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: '🌱', text: 'Eine neue Sache lernen', tip: '15 Min täglich' },
                  { icon: '📚', text: 'Reflektions-Journal', tip: '5 Min abends' },
                  { icon: '🤝', text: 'Jemandem helfen', tip: 'Eine gute Tat' },
                  { icon: '🎯', text: 'Komfortzone verlassen', tip: 'Ein kleiner Schritt' }
                ].map((impulse, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-xl text-center"
                  >
                    <div className="text-2xl mb-2">{impulse.icon}</div>
                    <p className="text-sm font-medium text-gray-800 mb-1">{impulse.text}</p>
                    <p className="text-xs text-gray-600">{impulse.tip}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : !selectedExercise ? (
          // Area Details
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 mb-8"
            >
              <button
                onClick={() => setSelectedArea(null)}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <span className="text-xl">←</span>
                <span>Zurück zur Übersicht</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-br ${getCategoryColor(selectedArea.category)} p-8 rounded-2xl text-white mb-8`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-5xl">{selectedArea.icon}</span>
                <div>
                  <h2 className="text-3xl font-bold">{selectedArea.title}</h2>
                  <p className="text-xl opacity-90">{selectedArea.description}</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedArea.exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedExercise(exercise)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{exercise.name}</h3>
                    <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      {exercise.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>
                  <div className="text-sm text-gray-500">
                    {exercise.steps.length} Schritte • {exercise.reflection.length} Reflexionsfragen
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          // Exercise Details
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={() => setSelectedExercise(null)}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <span className="text-xl">←</span>
                <span>Zurück zu {selectedArea.title}</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedExercise.name}</h2>
                <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  {selectedExercise.duration}
                </span>
              </div>
              <p className="text-gray-600 mb-8">{selectedExercise.description}</p>

              {/* Steps */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Durchführung:</h3>
                <div className="space-y-4">
                  {selectedExercise.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 flex-1">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Reflection Questions */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🤔 Reflexion:</h3>
                <div className="space-y-3">
                  {selectedExercise.reflection.map((question, index) => (
                    <div key={index} className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <p className="text-gray-700">{question}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insight Input */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Meine wichtigste Erkenntnis:</h3>
                <textarea
                  value={currentInsight}
                  onChange={(e) => setCurrentInsight(e.target.value)}
                  placeholder="Was habe ich über mich gelernt? Welche Veränderung will ich umsetzen?"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveInsight}
                  disabled={!currentInsight.trim()}
                  className="mt-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💾 Erkenntnis speichern
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-8"
        >
          <blockquote className="text-xl italic mb-4">
            &ldquo;Sei du selbst die Veränderung, die du dir wünschst für diese Welt.&rdquo;
          </blockquote>
          <p className="text-purple-100">- Mahatma Gandhi</p>
        </motion.div>
      </main>
    </div>
  );
}
