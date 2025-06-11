'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface LoveArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'self-love' | 'relationships' | 'communication' | 'boundaries' | 'intimacy' | 'healing';
  exercises: LoveExercise[];
}

interface LoveExercise {
  id: string;
  name: string;
  duration: string;
  description: string;
  forWho: 'alone' | 'partner' | 'both';
  steps: string[];
  benefits: string[];
}

export default function LiebePage() {
  const [selectedArea, setSelectedArea] = useState<LoveArea | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<LoveExercise | null>(null);
  const [loveJournal, setLoveJournal] = useState<string[]>([]);
  const [dailyAppreciation, setDailyAppreciation] = useState('');

  const loveAreas: LoveArea[] = [
    {
      id: 'self-love',
      title: 'Selbstliebe & Selbstfürsorge',
      description: 'Die wichtigste Beziehung - die zu dir selbst',
      icon: '💖',
      category: 'self-love',
      exercises: [
        {
          id: 'self-love-ritual',
          name: 'Tägliches Selbstliebe-Ritual',
          duration: '10 Min',
          description: 'Eine liebevolle Routine für dich selbst',
          forWho: 'alone',
          steps: [
            'Schaue dich 2 Minuten lang liebevoll im Spiegel an',
            'Sage dir 3 ehrliche Komplimente',
            'Lege eine Hand auf dein Herz und atme tief',
            'Frage: "Was brauchst du heute von mir?"',
            'Plane eine kleine Selbstfürsorge-Handlung für heute'
          ],
          benefits: ['Selbstakzeptanz stärken', 'Innere Kritik reduzieren', 'Selbstfürsorge kultivieren']
        },
        {
          id: 'inner-child',
          name: 'Inneres Kind heilen',
          duration: '15 Min',
          description: 'Verbindung zu deinem inneren Kind aufbauen',
          forWho: 'alone',
          steps: [
            'Betrachte ein Foto von dir als Kind',
            'Frage: "Was hat dieses Kind gebraucht?"',
            'Schreibe einen liebevollen Brief an dein jüngeres Ich',
            'Teile Weisheit und Ermutigung mit',
            'Umarme dich selbst für 30 Sekunden'
          ],
          benefits: ['Alte Wunden heilen', 'Selbstmitgefühl entwickeln', 'Innere Sicherheit stärken']
        }
      ]
    },
    {
      id: 'relationships',
      title: 'Tiefe Verbindungen',
      description: 'Authentische und nährende Beziehungen schaffen',
      icon: '💞',
      category: 'relationships',
      exercises: [
        {
          id: 'appreciation-practice',
          name: 'Wertschätzungs-Praxis',
          duration: '8 Min',
          description: 'Die Schönheit in anderen bewusst wahrnehmen',
          forWho: 'both',
          steps: [
            'Wähle eine wichtige Person in deinem Leben',
            'Schreibe 5 Dinge auf, die du an ihr schätzt',
            'Überlege: Wann hast du ihr das zuletzt gesagt?',
            'Sende eine Wertschätzungs-Nachricht oder rufe an',
            'Beobachte, wie es sich für dich anfühlt'
          ],
          benefits: ['Beziehungen vertiefen', 'Positive Energie schaffen', 'Dankbarkeit kultivieren']
        },
        {
          id: 'quality-time',
          name: 'Bewusste Zeit zu zweit',
          duration: '30 Min',
          description: 'Tiefe Verbindung durch Präsenz',
          forWho: 'partner',
          steps: [
            'Vereinbart 30 Min ohne Ablenkungen (Handy weg)',
            'Setzt euch gegenüber und schaut euch in die Augen',
            'Teilt abwechselnd: "Heute bin ich dankbar für..."',
            'Fragt: "Womit beschäftigst du dich gerade innerlich?"',
            'Hört zu, ohne zu bewerten oder Ratschläge zu geben'
          ],
          benefits: ['Intimität vertiefen', 'Verständnis fördern', 'Präsenz kultivieren']
        }
      ]
    },
    {
      id: 'communication',
      title: 'Liebevolle Kommunikation',
      description: 'Mit dem Herzen sprechen und hören',
      icon: '💬',
      category: 'communication',
      exercises: [
        {
          id: 'nonviolent-communication',
          name: 'Gewaltfreie Kommunikation',
          duration: '12 Min',
          description: 'Konflikte liebevoll und klar ansprechen',
          forWho: 'both',
          steps: [
            'Denke an einen aktuellen Konflikt',
            'Formuliere die Beobachtung ohne Bewertung',
            'Erkenne und benenne dein Gefühl',
            'Identifiziere dein dahinterliegendes Bedürfnis',
            'Äußere eine konkrete, erfüllbare Bitte'
          ],
          benefits: ['Konflikte lösen', 'Verständnis schaffen', 'Verbindung stärken']
        },
        {
          id: 'love-languages',
          name: 'Sprachen der Liebe entdecken',
          duration: '20 Min',
          description: 'Verstehen, wie du und andere Liebe ausdrücken',
          forWho: 'both',
          steps: [
            'Überlege: Womit fühlst du dich am meisten geliebt?',
            'Kategorisiere: Worte, Zeit, Geschenke, Dienste oder Berührung',
            'Frage wichtige Menschen: "Womit fühlst du dich geliebt?"',
            'Erkenne Unterschiede und Gemeinsamkeiten',
            'Plane, ihre Sprache der Liebe zu sprechen'
          ],
          benefits: ['Missverständnisse reduzieren', 'Liebe gezielter ausdrücken', 'Beziehungen harmonisieren']
        }
      ]
    },
    {
      id: 'boundaries',
      title: 'Gesunde Grenzen',
      description: 'Liebevoll Nein sagen und Ja zu dir selbst',
      icon: '🛡️',
      category: 'boundaries',
      exercises: [
        {
          id: 'boundary-check',
          name: 'Grenzen-Check',
          duration: '15 Min',
          description: 'Deine aktuellen Grenzen bewusst wahrnehmen',
          forWho: 'alone',
          steps: [
            'Liste 5 Situationen auf, in denen du dich unwohl fühlst',
            'Frage: "Welche Grenze wird hier überschritten?"',
            'Bewerte: Wie klar habe ich diese Grenze kommuniziert?',
            'Überlege: Was hindert mich daran, sie zu setzen?',
            'Wähle eine Grenze, die du diese Woche klarer ziehen willst'
          ],
          benefits: ['Selbstschutz stärken', 'Beziehungen klären', 'Selbstrespekt entwickeln']
        }
      ]
    },
    {
      id: 'healing',
      title: 'Beziehungsheilung',
      description: 'Alte Wunden heilen und Vergebung finden',
      icon: '🌱',
      category: 'healing',
      exercises: [
        {
          id: 'forgiveness-ritual',
          name: 'Vergebungs-Ritual',
          duration: '25 Min',
          description: 'Dich selbst oder andere liebevoll loslassen',
          forWho: 'alone',
          steps: [
            'Denke an eine Person, der du vergeben möchtest (inkl. dir)',
            'Schreibe einen ehrlichen Brief über deine Verletzung',
            'Erkenne: "Ich halte an diesem Schmerz fest"',
            'Schreibe: "Ich wähle Vergebung für mein eigenes Wohlbefinden"',
            'Verbrenne oder zerreiße den Brief als symbolische Befreiung'
          ],
          benefits: ['Emotionale Befreiung', 'Inneren Frieden finden', 'Platz für neue Liebe schaffen']
        }
      ]
    },
    {
      id: 'intimacy',
      title: 'Echte Intimität',
      description: 'Verletzlichkeit und tiefe Verbindung wagen',
      icon: '🕊️',
      category: 'intimacy',
      exercises: [
        {
          id: 'vulnerability-practice',
          name: 'Verletzlichkeits-Übung',
          duration: '18 Min',
          description: 'Authentisch und offen sein',
          forWho: 'partner',
          steps: [
            'Wählt eine ruhige, private Atmosphäre',
            'Teilt abwechselnd etwas, was euch beschäftigt',
            'Hört zu, ohne zu urteilen oder Lösungen anzubieten',
            'Bedankt euch für das Vertrauen',
            'Umarmt euch 2 Minuten lang schweigend'
          ],
          benefits: ['Vertrauen vertiefen', 'Authentizität leben', 'Emotionale Nähe schaffen']
        }
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'self-love': 'from-pink-400 to-rose-500',
      'relationships': 'from-red-400 to-pink-500',
      'communication': 'from-blue-400 to-indigo-500',
      'boundaries': 'from-purple-400 to-pink-500',
      'intimacy': 'from-rose-400 to-pink-600',
      'healing': 'from-green-400 to-emerald-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const getForWhoIcon = (forWho: string) => {
    const icons = {
      'alone': '👤',
      'partner': '👥',
      'both': '💫'
    };
    return icons[forWho as keyof typeof icons] || '💫';
  };

  const addToLoveJournal = () => {
    if (dailyAppreciation.trim()) {
      setLoveJournal([dailyAppreciation, ...loveJournal]);
      setDailyAppreciation('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 transition-colors"
              >
                <span className="text-2xl">←</span>
                <span className="font-medium">Zurück zum Dashboard</span>
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">💕 Liebe & Beziehungen</h1>
              <p className="text-gray-600 mt-1">Selbstliebe stärken und tiefe Verbindungen schaffen</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedArea ? (
          <div className="space-y-8">
            {/* Love Journal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                💝 Liebes-Tagebuch
              </h3>
              <div className="flex space-x-4 mb-4">
                <input
                  type="text"
                  value={dailyAppreciation}
                  onChange={(e) => setDailyAppreciation(e.target.value)}
                  placeholder="Wofür bin ich heute in der Liebe dankbar?"
                  className="flex-1 p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button
                  onClick={addToLoveJournal}
                  disabled={!dailyAppreciation.trim()}
                  className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  💖 Hinzufügen
                </button>
              </div>
              {loveJournal.length > 0 && (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {loveJournal.slice(0, 3).map((entry, index) => (
                    <div key={index} className="p-3 bg-pink-50 rounded-lg text-gray-700 text-sm">
                      {entry}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Love Areas */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Welchen Aspekt der Liebe möchtest du stärken?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Liebe beginnt bei dir selbst und strahlt in alle deine Beziehungen aus. 
                  Wähle den Bereich, der dich gerade am meisten anspricht.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loveAreas.map((area, index) => (
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

            {/* Love Affirmations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                💖 Liebes-Affirmationen für heute
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Ich bin es wert, geliebt zu werden',
                  'Ich liebe mich bedingungslos',
                  'Meine Beziehungen sind voller Liebe und Respekt',
                  'Ich vergebe mir und anderen mit Leichtigkeit',
                  'Ich teile meine Liebe großzügig mit der Welt',
                  'Ich bin offen für tiefe, authentische Verbindungen'
                ].map((affirmation, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl text-center cursor-pointer border-2 border-transparent hover:border-pink-300 transition-all"
                  >
                    <p className="text-gray-800 font-medium">{affirmation}</p>
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
                className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 transition-colors"
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
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getForWhoIcon(exercise.forWho)}</span>
                      <span className="text-sm bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                        {exercise.duration}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>
                  <div className="text-sm text-gray-500">
                    {exercise.steps.length} Schritte • {exercise.benefits.length} Vorteile
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
                className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 transition-colors"
              >
                <span className="text-xl">←</span>
                <span>Zurück zu {selectedArea.title}</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedExercise.name}</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getForWhoIcon(selectedExercise.forWho)}</span>
                  <span className="text-sm bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                    {selectedExercise.duration}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mb-8">{selectedExercise.description}</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Steps */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">💖 Durchführung:</h3>
                  <div className="space-y-4">
                    {selectedExercise.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 bg-pink-50 rounded-xl"
                      >
                        <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 flex-1">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">✨ Positive Effekte:</h3>
                  <div className="space-y-3">
                    {selectedExercise.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-pink-500">💕</span>
                        <p className="text-gray-700 text-sm">{benefit}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-rose-50 rounded-xl border border-rose-200">
                    <p className="text-rose-800 text-sm">
                      💝 <strong>Erinnerung:</strong> Liebe ist eine Praxis, kein Zustand. 
                      Jeder kleine Schritt zählt auf deinem Weg zu mehr Liebe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl p-8"
        >
          <blockquote className="text-xl italic mb-4">
            &ldquo;Dich selbst zu lieben ist der Beginn einer lebenslangen Romanze.&rdquo;
          </blockquote>
          <p className="text-pink-100">- Oscar Wilde</p>
        </motion.div>
      </main>
    </div>
  );
}
