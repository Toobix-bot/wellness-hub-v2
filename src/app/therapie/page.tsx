'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface TherapieRessource {
  id: string;
  title: string;
  category: 'selbsthilfe' | 'uebungen' | 'ressourcen' | 'notfallhilfe';
  description: string;
  content: string;
  icon: string;
  duration?: number;
}

interface StimmungsEintrag {
  id: string;
  datum: Date;
  stimmung: number; // 1-10
  notizen: string;
  trigger?: string;
}

export default function TherapiePage() {
  const [activeTab, setActiveTab] = useState<'ressourcen' | 'stimmung' | 'notfallhilfe'>('ressourcen');
  const [selectedRessource, setSelectedRessource] = useState<TherapieRessource | null>(null);
  const [stimmungsEintraege, setStimmungsEintraege] = useState<StimmungsEintrag[]>([]);
  const [neueStimmung, setNeueStimmung] = useState(5);
  const [neueNotizen, setNeueNotizen] = useState('');

  const therapieRessourcen: TherapieRessource[] = [
    {
      id: 'atemtechnik',
      title: '4-7-8 Atemtechnik',
      category: 'uebungen',
      description: 'Beruhigende Atemübung gegen Stress und Angst',
      content: '1. Atme 4 Sekunden ein\n2. Halte 7 Sekunden an\n3. Atme 8 Sekunden aus\n4. Wiederhole 4 Zyklen',
      icon: '🫁',
      duration: 5
    },
    {
      id: 'grounding',
      title: '5-4-3-2-1 Grounding-Technik',
      category: 'uebungen',
      description: 'Erdung bei Panik oder Überforderung',
      content: '5 Dinge die du SIEHST\n4 Dinge die du HÖRST\n3 Dinge die du FÜHLST\n2 Dinge die du RIECHST\n1 Ding das du SCHMECKST',
      icon: '🌱'
    },
    {
      id: 'selbstmitgefuehl',
      title: 'Selbstmitgefühl-Übung',
      category: 'selbsthilfe',
      description: 'Liebevoller Umgang mit sich selbst',
      content: '1. Erkenne dein Leiden an\n2. Erinnere dich: Du bist nicht allein\n3. Sprich zu dir wie zu einem guten Freund\n4. Lege eine Hand auf dein Herz',
      icon: '💝'
    },
    {
      id: 'gedanken-stopp',
      title: 'Gedanken-Stopp-Technik',
      category: 'uebungen',
      description: 'Unterbreche negative Gedankenspiralen',
      content: '1. Sage laut "STOPP!"\n2. Atme 3 mal tief durch\n3. Nenne 3 positive Fakten über dich\n4. Lenke deine Aufmerksamkeit auf die Gegenwart',
      icon: '✋'
    }
  ];

  const notfallRessourcen = [
    {
      title: 'Telefonseelsorge',
      nummer: '0800 111 0 111',
      verfuegbarkeit: '24/7 kostenlos',
      beschreibung: 'Anonyme Beratung in Krisensituationen'
    },
    {
      title: 'Nummer gegen Kummer',
      nummer: '116 123',
      verfuegbarkeit: '24/7 kostenlos',
      beschreibung: 'Für Kinder, Jugendliche und Erwachsene'
    },
    {
      title: 'Kriseninterventionszentrum',
      nummer: '01/406 95 95',
      verfuegbarkeit: 'Mo-Fr 10-17 Uhr',
      beschreibung: 'Professionelle Krisenberatung'
    }
  ];

  const handleStimmungsEintrag = () => {
    if (neueNotizen.trim()) {
      const neuerEintrag: StimmungsEintrag = {
        id: Date.now().toString(),
        datum: new Date(),
        stimmung: neueStimmung,
        notizen: neueNotizen.trim()
      };
      setStimmungsEintraege([neuerEintrag, ...stimmungsEintraege]);
      setNeueNotizen('');
      setNeueStimmung(5);
    }
  };

  const getStimmungsColor = (stimmung: number) => {
    if (stimmung <= 3) return 'from-red-400 to-red-600';
    if (stimmung <= 5) return 'from-orange-400 to-orange-600';
    if (stimmung <= 7) return 'from-yellow-400 to-yellow-600';
    return 'from-green-400 to-green-600';
  };

  const getStimmungsEmoji = (stimmung: number) => {
    if (stimmung <= 2) return '😢';
    if (stimmung <= 4) return '😔';
    if (stimmung <= 6) return '😐';
    if (stimmung <= 8) return '🙂';
    return '😊';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl hover:scale-110 transition-transform duration-300">
                🏠
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  🧘‍♀️ Therapie & Heilung
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Ressourcen für mentale Gesundheit und emotionale Heilung
                </p>
              </div>
            </div>
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-4xl"
            >
              🌈
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-2">
            {[
              { key: 'ressourcen' as const, label: 'Ressourcen', icon: '📚' },
              { key: 'stimmung' as const, label: 'Stimmungs-Tracker', icon: '📊' },
              { key: 'notfallhilfe' as const, label: 'Notfallhilfe', icon: '🆘' }
            ].map((tab) => (
              <motion.button
                key={tab.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Ressourcen Tab */}
          {activeTab === 'ressourcen' && (
            <motion.div
              key="ressourcen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {!selectedRessource ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {therapieRessourcen.map((ressource, index) => (
                    <motion.div
                      key={ressource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedRessource(ressource)}
                    >
                      <div className="text-4xl mb-4 text-center">{ressource.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        {ressource.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {ressource.description}
                      </p>
                      {ressource.duration && (
                        <div className="flex items-center text-sm text-gray-500">
                          <span>⏱️</span>
                          <span className="ml-1">{ressource.duration} Minuten</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-8">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">{selectedRessource.icon}</div>
                      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                        {selectedRessource.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedRessource.description}
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 mb-6">
                      <pre className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                        {selectedRessource.content}
                      </pre>
                    </div>
                    
                    <div className="flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedRessource(null)}
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        ← Zurück zu den Ressourcen
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Stimmungs-Tracker Tab */}
          {activeTab === 'stimmung' && (
            <motion.div
              key="stimmung"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Stimmungs-Eingabe */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Wie fühlst du dich heute?
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Stimmung (1 = sehr schlecht, 10 = ausgezeichnet)
                    </label>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{getStimmungsEmoji(neueStimmung)}</span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={neueStimmung}
                        onChange={(e) => setNeueStimmung(parseInt(e.target.value))}
                        className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-lg font-bold w-8">{neueStimmung}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notizen zu deiner Stimmung
                    </label>
                    <textarea
                      value={neueNotizen}
                      onChange={(e) => setNeueNotizen(e.target.value)}
                      placeholder="Was beschäftigt dich heute? Wie geht es dir?"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      rows={3}
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStimmungsEintrag}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Stimmung erfassen 📝
                  </motion.button>
                </div>
              </div>

              {/* Stimmungs-Verlauf */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Dein Stimmungs-Verlauf ({stimmungsEintraege.length} Einträge)
                </h3>
                
                {stimmungsEintraege.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-lg">Noch keine Stimmungs-Einträge vorhanden.</p>
                    <p>Beginne mit dem Tracking deiner emotionalen Gesundheit!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stimmungsEintraege.map((eintrag, index) => (
                      <motion.div
                        key={eintrag.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-6"
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getStimmungsColor(eintrag.stimmung)} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}>
                            {getStimmungsEmoji(eintrag.stimmung)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                              <span className="text-lg font-bold text-gray-800 dark:text-white">
                                Stimmung: {eintrag.stimmung}/10
                              </span>
                              <span className="text-sm text-gray-500">
                                {eintrag.datum.toLocaleDateString('de-DE')} - {eintrag.datum.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {eintrag.notizen}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Notfallhilfe Tab */}
          {activeTab === 'notfallhilfe' && (
            <motion.div
              key="notfallhilfe"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
                <h3 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
                  🆘 Notfallhilfe
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  Wenn du in einer akuten Krise bist und sofortige Hilfe benötigst, zögere nicht, professionelle Hilfe zu suchen.
                </p>
                <p className="text-red-600 dark:text-red-400 font-semibold">
                  Bei akuter Selbst- oder Fremdgefährdung: Notruf 112
                </p>
              </div>

              <div className="grid md:grid-cols-1 gap-4">
                {notfallRessourcen.map((ressource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                          {ressource.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {ressource.beschreibung}
                        </p>
                        <p className="text-sm text-gray-500">
                          {ressource.verfuegbarkeit}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {ressource.nummer}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                          onClick={() => window.open(`tel:${ressource.nummer}`, '_self')}
                        >
                          📞 Anrufen
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Beruhigungs-Techniken für Krisen */}
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">
                  🌸 Schnelle Beruhigungs-Techniken
                </h4>
                <ul className="space-y-2 text-green-700 dark:text-green-300">
                  <li>• 4-7-8 Atemtechnik (siehe Ressourcen)</li>
                  <li>• 5-4-3-2-1 Grounding-Technik</li>
                  <li>• Kaltes Wasser über die Handgelenke laufen lassen</li>
                  <li>• Eine vertraute Person anrufen</li>
                  <li>• Sich an einen sicheren Ort begeben</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Motivations-Bereich */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">💜 Erinnerung</h3>          <blockquote className="text-lg italic mb-4">
            &ldquo;Heilung ist ein Prozess, kein Ziel. Sei geduldig und liebevoll mit dir selbst.&rdquo;
          </blockquote>
          <p className="text-purple-100">Du bist nicht allein auf diesem Weg.</p>
        </motion.div>
      </main>
    </div>
  );
}
