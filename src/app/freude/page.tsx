'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface JoyActivity {
  id: string;
  title: string;
  category: 'humor' | 'bewegung' | 'kreativität' | 'sozial' | 'natur' | 'sinnlich';
  description: string;
  icon: string;
  duration: string;
  instructions: string[];
  benefits: string[];
}

interface DailyJoke {
  id: string;
  joke: string;
  category: string;
}

export default function FreudePage() {
  const [selectedActivity, setSelectedActivity] = useState<JoyActivity | null>(null);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [dailyJoke, setDailyJoke] = useState<DailyJoke | null>(null);
  const [joyScore, setJoyScore] = useState(7);

  useEffect(() => {
    // Load daily joke
    const jokes = [
      { id: '1', joke: 'Warum nehmen Geister keine Medikamente? Weil sie Buh-tabletten sind! 👻', category: 'wortspiel' },
      { id: '2', joke: 'Was ist grün und klopft an der Tür? Ein Klopfsalat! 🥬', category: 'kalauer' },
      { id: '3', joke: 'Wie nennt man einen Bären ohne Ohren? B! 🐻', category: 'wortspiel' },
      { id: '4', joke: 'Was ist rot und sitzt auf dem Klo? Eine Klomate! 🍅', category: 'kalauer' },
      { id: '5', joke: 'Warum sind Fische so schlecht in der Schule? Weil sie unter dem Meeresspiegel leben! 🐠', category: 'wortspiel' }
    ];
    
    const todayJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setDailyJoke(todayJoke);
  }, []);

  const joyActivities: JoyActivity[] = [
    {
      id: 'lach-yoga',
      title: 'Lach-Yoga',
      category: 'humor',
      description: 'Künstliches Lachen wird zu echtem Lachen',
      icon: '😂',
      duration: '5 Min',
      instructions: [
        'Stehe oder sitze bequem',
        'Beginne mit einem künstlichen "Ha-ha-ha"',
        'Steigere dich zu einem herzhaften Lachen',
        'Füge Körperbewegungen hinzu (Arme schwingen)',
        'Lache 2 Minuten ohne Unterbrechung'
      ],
      benefits: ['Endorphine freisetzen', 'Stress abbauen', 'Immunsystem stärken']
    },
    {
      id: 'tanz-party',
      title: 'Solo-Tanzparty',
      category: 'bewegung',
      description: 'Ausgelassenes Tanzen zu deiner Lieblingsmusik',
      icon: '💃',
      duration: '10 Min',
      instructions: [
        'Wähle 3-4 deiner liebsten Gute-Laune-Songs',
        'Räume etwas Platz frei',
        'Tanze, als würde niemand zusehen',
        'Übertreibe bewusst deine Bewegungen',
        'Singe laut mit!'
      ],
      benefits: ['Energie steigern', 'Selbstvertrauen stärken', 'Glückshormone aktivieren']
    },
    {
      id: 'dankbarkeits-selfie',
      title: 'Albernes Dankbarkeits-Selfie',
      category: 'kreativität',
      description: 'Lustige Fotos mit Dankbarkeits-Botschaften',
      icon: '🤳',
      duration: '8 Min',
      instructions: [
        'Denke an 3 Dinge, für die du dankbar bist',
        'Mache ein albernes Selfie für jedes Dankbarkeits-Thema',
        'Verwende lustige Gesichtsausdrücke oder Gegenstände',
        'Schreibe eine witzige Bildunterschrift',
        'Teile sie mit einem Freund oder behalte sie für dich'
      ],
      benefits: ['Dankbarkeit verstärken', 'Kreativität fördern', 'Erinnerungen schaffen']
    },
    {
      id: 'kompliment-dusche',
      title: 'Kompliment-Dusche geben',
      category: 'sozial',
      description: 'Anderen und dir selbst ehrliche Komplimente machen',
      icon: '💝',
      duration: '15 Min',
      instructions: [
        'Schreibe 5 ehrliche Komplimente für dich selbst auf',
        'Sende 3 Komplimente an Freunde/Familie',
        'Mache einem Fremden ein ehrliches Kompliment',
        'Bedanke dich bei jemandem für etwas Bestimmtes',
        'Notiere, wie es sich angefühlt hat'
      ],
      benefits: ['Beziehungen stärken', 'Selbstwertgefühl steigern', 'Positive Energie verbreiten']
    },
    {
      id: 'natur-freude',
      title: 'Natur-Entdeckungstour',
      category: 'natur',
      description: 'Spielerische Erforschung der Natur um dich herum',
      icon: '🌸',
      duration: '20 Min',
      instructions: [
        'Gehe nach draußen (Garten, Park, Balkon)',
        'Suche nach 5 verschiedenen Farben in der Natur',
        'Berühre 3 verschiedene Texturen',
        'Lausche 2 Minuten nur den Naturgeräuschen',
        'Sammle etwas Schönes (Blatt, Stein) als Erinnerung'
      ],
      benefits: ['Achtsamkeit steigern', 'Stress reduzieren', 'Verbindung zur Natur']
    },
    {
      id: 'genuss-meditation',
      title: 'Sinnliche Genuss-Meditation',
      category: 'sinnlich',
      description: 'Bewusster Genuss eines Lieblings-Snacks',
      icon: '🍫',
      duration: '10 Min',
      instructions: [
        'Wähle einen Lieblings-Snack (Schokolade, Obst, etc.)',
        'Betrachte ihn 1 Minute lang genau',
        'Rieche intensiv daran',
        'Iss extrem langsam und bewusst',
        'Konzentriere dich nur auf Geschmack und Textur'
      ],
      benefits: ['Achtsamkeit kultivieren', 'Genuss verstärken', 'Präsenz fördern']
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      humor: 'from-yellow-400 to-orange-500',
      bewegung: 'from-pink-400 to-red-500',
      kreativität: 'from-purple-400 to-pink-500',
      sozial: 'from-green-400 to-blue-500',
      natur: 'from-green-500 to-teal-500',
      sinnlich: 'from-orange-400 to-red-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const completeActivity = (activityId: string) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities([...completedActivities, activityId]);
    }
    setSelectedActivity(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-yellow-200 sticky top-0 z-50">
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
              <h1 className="text-3xl font-bold text-gray-800">😊 Freude & Lachen</h1>
              <p className="text-gray-600 mt-1">Positive Energie und Glücksmomente erschaffen</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedActivity ? (
          <div className="space-y-8">
            {/* Daily Joy Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Joy Score */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-2xl text-white"
              >
                <h3 className="text-lg font-bold mb-2">Heutiges Freude-Level</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold">{joyScore}/10</span>
                  <div className="flex space-x-1">
                    {[...Array(10)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setJoyScore(i + 1)}
                        className="w-4 h-4 rounded-full border-2 border-white hover:bg-white/30 transition-colors"
                        style={{ 
                          backgroundColor: i < joyScore ? 'white' : 'transparent' 
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Completed Activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">Heute geschafft</h3>
                <div className="text-3xl font-bold text-green-600">
                  {completedActivities.length}/{joyActivities.length}
                </div>
                <p className="text-sm text-gray-600">Freude-Aktivitäten</p>
              </motion.div>

              {/* Daily Joke */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-pink-400 to-purple-500 p-6 rounded-2xl text-white"
              >
                <h3 className="text-lg font-bold mb-2">Witz des Tages</h3>
                {dailyJoke && (
                  <p className="text-sm">{dailyJoke.joke}</p>
                )}
              </motion.div>
            </div>

            {/* Joy Activities */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Wähle deine Freude-Aktivität
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Kleine Aktivitäten mit großer Wirkung auf dein Wohlbefinden. 
                  Jede Übung ist wissenschaftlich fundiert und einfach umsetzbar.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {joyActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`relative bg-gradient-to-br ${getCategoryColor(activity.category)} p-6 rounded-2xl text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
                    onClick={() => setSelectedActivity(activity)}
                  >
                    {completedActivities.includes(activity.id) && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                    
                    <div className="text-4xl mb-4">{activity.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{activity.description}</p>
                    <div className="flex items-center justify-between text-xs opacity-75">
                      <span>{activity.duration}</span>
                      <span className="capitalize">{activity.category}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Mood Boosters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                ⚡ Schnelle Stimmungs-Booster (30 Sekunden)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: '😄', text: 'Lächle 30 Sekunden lang', color: 'bg-yellow-100 text-yellow-800' },
                  { icon: '🤗', text: 'Umarme dich selbst', color: 'bg-pink-100 text-pink-800' },
                  { icon: '🎵', text: 'Singe deinen Lieblingssong', color: 'bg-purple-100 text-purple-800' },
                  { icon: '🌈', text: 'Denke an etwas Schönes', color: 'bg-blue-100 text-blue-800' }
                ].map((booster, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`${booster.color} p-4 rounded-xl text-center cursor-pointer transition-transform`}
                  >
                    <div className="text-2xl mb-2">{booster.icon}</div>
                    <p className="text-sm font-medium">{booster.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          // Activity Details
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={() => setSelectedActivity(null)}
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
              >
                <span className="text-xl">←</span>
                <span>Zurück zur Übersicht</span>
              </button>
            </div>

            <div className={`bg-gradient-to-br ${getCategoryColor(selectedActivity.category)} p-8 rounded-2xl text-white mb-8`}>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-5xl">{selectedActivity.icon}</span>
                <div>
                  <h2 className="text-3xl font-bold">{selectedActivity.title}</h2>
                  <p className="text-xl opacity-90">{selectedActivity.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm opacity-75">
                    <span>⏱️ {selectedActivity.duration}</span>
                    <span className="capitalize">📂 {selectedActivity.category}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Instructions */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    🎯 So geht's:
                  </h3>
                  <div className="space-y-4">
                    {selectedActivity.instructions.map((instruction, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 flex-1">{instruction}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => completeActivity(selectedActivity.id)}
                    className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
                  >
                    ✅ Aktivität abgeschlossen!
                  </motion.button>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  ✨ Positive Effekte:
                </h3>
                <div className="space-y-3">
                  {selectedActivity.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-green-500">•</span>
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    💡 <strong>Wissenschaft:</strong> Positive Aktivitäten setzen Endorphine 
                    und Dopamin frei - die körpereigenen Glückshormone!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-8"
        >
          <blockquote className="text-xl italic mb-4">
            &ldquo;Freude ist nicht das Ziel des Lebens, sondern der Treibstoff.&rdquo;
          </blockquote>
          <p className="text-yellow-100">- Eckhart Tolle</p>
        </motion.div>
      </main>
    </div>
  );
}
