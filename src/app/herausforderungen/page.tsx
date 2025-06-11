'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Challenge {
  id: string;
  title: string;
  category: 'stress' | 'angst' | 'einsamkeit' | 'überforderung' | 'trauer' | 'ärger';
  description: string;
  icon: string;
  quickTips: string[];
  tools: Tool[];
}

interface Tool {
  name: string;
  duration: string;
  description: string;
  steps: string[];
}

export default function HerausforderungenPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);

  const challenges: Challenge[] = [
    {
      id: 'stress',
      title: 'Akuter Stress',
      category: 'stress',
      description: 'Sofortige Techniken bei überwältigenden Stressmomenten',
      icon: '😤',
      quickTips: [
        '4-7-8 Atemtechnik: 4 sec einatmen, 7 sec halten, 8 sec ausatmen',
        'Kalt-Warme Gesichtsdusche für 30 Sekunden',
        '5-4-3-2-1 Grounding: 5 Dinge sehen, 4 hören, 3 fühlen, 2 riechen, 1 schmecken'
      ],
      tools: [
        {
          name: 'Stress-Reset in 2 Minuten',
          duration: '2 Min',
          description: 'Blitzschnelle Stressreduktion für akute Situationen',
          steps: [
            'Atme 4 tiefe Atemzüge (4-4-4-4 Rhythmus)',
            'Spanne alle Muskeln 5 Sekunden an, dann locker lassen',
            'Sage dir: "Das ist temporär, ich schaffe das"',
            'Trinke ein Glas kaltes Wasser bewusst'
          ]
        },
        {
          name: 'Gedanken-Stopp-Technik',
          duration: '1 Min',
          description: 'Unterbricht Gedankenkreisläufe sofort',
          steps: [
            'Sage laut "STOPP!" oder klatsche einmal',
            'Zähle rückwärts von 10 bis 1',
            'Benenne 3 Dinge, die du siehst',
            'Atme 3x tief ein und aus'
          ]
        }
      ]
    },
    {
      id: 'angst',
      title: 'Angst & Panik',
      category: 'angst',
      description: 'Beruhigende Techniken bei Angstzuständen',
      icon: '😰',
      quickTips: [
        'Box-Breathing: 4-4-4-4 Sekunden ein-halten-aus-halten',
        'Eiskaltes Wasser über die Handgelenke laufen lassen',
        'Mentales "Safe Place" aufsuchen'
      ],
      tools: [
        {
          name: '5-4-3-2-1 Grounding',
          duration: '3 Min',
          description: 'Erdung durch Sinneswahrnehmung',
          steps: [
            '5 Dinge benennen, die du SIEHST',
            '4 Dinge benennen, die du HÖRST',
            '3 Dinge benennen, die du FÜHLST',
            '2 Dinge benennen, die du RIECHST',
            '1 Ding benennen, das du SCHMECKST'
          ]
        }
      ]
    },
    {
      id: 'überforderung',
      title: 'Überforderung',
      category: 'überforderung',
      description: 'Struktur schaffen, wenn alles zu viel wird',
      icon: '🤯',
      quickTips: [
        'Brain Dump: Alles ungefiltert aufschreiben (5 Min)',
        'Prioritäten-Matrix: Wichtig/Dringend sortieren',
        'One-Thing-Rule: Nur eine Sache gleichzeitig'
      ],
      tools: [
        {
          name: 'Chaos-zu-Klarheit in 10 Min',
          duration: '10 Min',
          description: 'Vom Gefühlschaos zur klaren Struktur',
          steps: [
            'Brain Dump: Schreibe 5 Min alles auf, was dich beschäftigt',
            'Sortiere in: "Kann ich ändern" / "Kann ich nicht ändern"',
            'Wähle die 3 wichtigsten "Kann ich ändern"-Punkte',
            'Plane den ersten winzigen Schritt für heute'
          ]
        }
      ]
    },
    {
      id: 'einsamkeit',
      title: 'Einsamkeit',
      category: 'einsamkeit',
      description: 'Verbindung zu sich selbst und anderen finden',
      icon: '😔',
      quickTips: [
        'Selbst-Mitgefühl: "Es ist menschlich, sich einsam zu fühlen"',
        'Virtuelle Verbindung: Jemandem eine Nachricht schreiben',
        'Natur-Verbindung: 10 Min draußen spazieren'
      ],
      tools: [
        {
          name: 'Selbst-Freundschaft aktivieren',
          duration: '5 Min',
          description: 'Die Beziehung zu dir selbst stärken',
          steps: [
            'Setze dich bequem hin und lege eine Hand auf dein Herz',
            'Sage zu dir: "Du bist nicht allein mit diesem Gefühl"',
            'Schreibe 3 Dinge auf, die du an dir schätzt',
            'Plane eine kleine Freude für heute'
          ]
        }
      ]
    },
    {
      id: 'ärger',
      title: 'Wut & Ärger',
      category: 'ärger',
      description: 'Konstruktiver Umgang mit starken Emotionen',
      icon: '😡',
      quickTips: [
        'Physisch: 20 Hampelmänner oder Treppen steigen',
        'Kognitiv: "Was würde ich einem Freund raten?"',
        'Emotional: Wut in einem Brief ausschreiben, dann zerreißen'
      ],
      tools: [
        {
          name: 'Wut-Transformation',
          duration: '8 Min',
          description: 'Von destruktiver Wut zu konstruktiver Energie',
          steps: [
            'Körperlich: 2 Min Bewegung (Hampelmänner, Liegestütze)',
            'Emotional: Wut auf Papier schreiben - ungefiltert',
            'Rational: "Was ist die Botschaft hinter meiner Wut?"',
            'Konstruktiv: "Welche eine Aktion kann ich setzen?"'
          ]
        }
      ]
    },
    {
      id: 'trauer',
      title: 'Trauer & Verlust',
      category: 'trauer',
      description: 'Raum für Trauer schaffen und Heilung ermöglichen',
      icon: '😢',
      quickTips: [
        'Trauer hat ihre eigene Zeit - sei geduldig mit dir',
        'Körperliche Tröstung: Warme Dusche oder Tee',
        'Erinnerungen ehren: Schöne Momente aufschreiben'
      ],
      tools: [
        {
          name: 'Trauer-Ritual',
          duration: '15 Min',
          description: 'Heilsamer Raum für schwere Gefühle',
          steps: [
            'Schaffe einen ruhigen Ort mit einer Kerze',
            'Erlaube dir 5 Min zu weinen oder still zu sein',
            'Schreibe einen Brief an das, was du verloren hast',
            'Schließe mit Dankbarkeit für das, was war'
          ]
        }
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      stress: 'from-red-500 to-orange-600',
      angst: 'from-blue-500 to-indigo-600',
      überforderung: 'from-purple-500 to-pink-600',
      einsamkeit: 'from-gray-500 to-blue-500',
      ärger: 'from-orange-500 to-red-600',
      trauer: 'from-blue-600 to-gray-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
              >
                <span className="text-2xl">←</span>
                <span className="font-medium">Zurück zum Dashboard</span>
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">💪 Herausforderungen meistern</h1>
              <p className="text-gray-600 mt-1">Praktische Tools für schwierige Momente</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedChallenge ? (
          // Challenge Selection
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Welche Herausforderung beschäftigt dich gerade?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Wähle die Situation, die am besten beschreibt, womit du gerade kämpfst. 
                Du bekommst sofortige, praktische Hilfe.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-gradient-to-br ${getCategoryColor(challenge.category)} p-6 rounded-2xl text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
                  onClick={() => setSelectedChallenge(challenge)}
                >
                  <div className="text-4xl mb-4">{challenge.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{challenge.description}</p>
                  <div className="text-xs opacity-75">
                    {challenge.tools.length} Tools • {challenge.quickTips.length} Schnell-Tipps
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          // Challenge Details
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 mb-8"
            >
              <button
                onClick={() => {
                  setSelectedChallenge(null);
                  setCurrentTool(null);
                }}
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
              >
                <span className="text-xl">←</span>
                <span>Zurück zur Übersicht</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-br ${getCategoryColor(selectedChallenge.category)} p-8 rounded-2xl text-white mb-8`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-5xl">{selectedChallenge.icon}</span>
                <div>
                  <h2 className="text-3xl font-bold">{selectedChallenge.title}</h2>
                  <p className="text-xl opacity-90">{selectedChallenge.description}</p>
                </div>
              </div>
            </motion.div>

            {!currentTool ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Tips */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    ⚡ Schnell-Hilfe (30 Sekunden)
                  </h3>
                  <div className="space-y-3">
                    {selectedChallenge.quickTips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="text-orange-500 font-bold">{index + 1}.</span>
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Tools */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    🛠️ Tiefere Tools
                  </h3>
                  {selectedChallenge.tools.map((tool, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-all duration-300"
                      onClick={() => setCurrentTool(tool)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-800">{tool.name}</h4>
                        <span className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                          {tool.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{tool.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ) : (
              // Tool Details
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setCurrentTool(null)}
                    className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    <span className="text-xl">←</span>
                    <span>Zurück</span>
                  </button>
                  <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                    {currentTool.duration}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentTool.name}</h3>
                <p className="text-gray-600 mb-8">{currentTool.description}</p>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-800">Schritt-für-Schritt:</h4>
                  {currentTool.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 flex-1">{step}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-green-800 text-sm">
                    💡 <strong>Tipp:</strong> Es ist normal, wenn nicht alles beim ersten Mal funktioniert. 
                    Sei geduldig mit dir und probiere verschiedene Techniken aus.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Emergency Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-red-50 border border-red-200 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
            🆘 Notfall-Ressourcen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-red-700">Bei akuten Krisen:</p>
              <p className="text-red-600">Telefonseelsorge: 0800 111 0 111 oder 0800 111 0 222</p>
            </div>
            <div>
              <p className="font-semibold text-red-700">Online-Beratung:</p>
              <p className="text-red-600">www.telefonseelsorge.de • www.youth-life-line.de</p>
            </div>
          </div>
        </motion.div>

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-2xl p-8"
        >
          <blockquote className="text-xl italic mb-4">
            &ldquo;Du bist stärker als du glaubst und mutiger als du denkst.&rdquo;
          </blockquote>
          <p className="text-orange-100">- Winnie the Pooh</p>
        </motion.div>
      </main>
    </div>
  );
}
