'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MeditationSession {
  id: string;
  name: string;
  duration: number; // in Minuten
  type: 'atemmeditation' | 'bodyscan' | 'achtsamkeit' | 'loving-kindness';
  description: string;
  icon: string;
}

export default function StillePage() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 Minuten Standard
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [breathingPhase, setBreathingPhase] = useState<'einatmen' | 'halten' | 'ausatmen'>('einatmen');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const meditationsSessions: MeditationSession[] = [
    {
      id: 'atemmeditation',
      name: 'Atemmeditation',
      duration: 5,
      type: 'atemmeditation',
      description: 'Konzentriere dich auf deinen natürlichen Atem',
      icon: '🫁'
    },
    {
      id: 'bodyscan',
      name: 'Body Scan',
      duration: 10,
      type: 'bodyscan',
      description: 'Entspanne deinen Körper von Kopf bis Fuß',
      icon: '🧘‍♀️'
    },
    {
      id: 'achtsamkeit',
      name: 'Achtsamkeit',
      duration: 8,
      type: 'achtsamkeit',
      description: 'Bewusstes Wahrnehmen des gegenwärtigen Moments',
      icon: '🌸'
    },
    {
      id: 'loving-kindness',
      name: 'Liebende Güte',
      duration: 12,
      type: 'loving-kindness',
      description: 'Kultiviere Mitgefühl für dich und andere',
      icon: '💕'
    }
  ];

  // Timer-Logik
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Meditation beendet - Benachrichtigung oder Aktion
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  // Atemrhythmus-Logik
  useEffect(() => {
    if (isActive && selectedSession?.type === 'atemmeditation') {
      breathingIntervalRef.current = setInterval(() => {
        setBreathingPhase(phase => {
          switch (phase) {
            case 'einatmen': return 'halten';
            case 'halten': return 'ausatmen';
            case 'ausatmen': return 'einatmen';
            default: return 'einatmen';
          }
        });
      }, 4000); // 4 Sekunden pro Phase
    }

    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    };
  }, [isActive, selectedSession]);

  const startMeditation = (session: MeditationSession) => {
    setSelectedSession(session);
    setTimeLeft(session.duration * 60);
    setIsActive(true);
    setBreathingPhase('einatmen');
  };

  const pauseResume = () => {
    setIsActive(!isActive);
  };

  const stopMeditation = () => {
    setIsActive(false);
    setSelectedSession(null);
    setTimeLeft(300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'einatmen': return 'Einatmen...';
      case 'halten': return 'Halten...';
      case 'ausatmen': return 'Ausatmen...';
      default: return 'Atmen...';
    }
  };

  const getBreathingColor = () => {
    switch (breathingPhase) {
      case 'einatmen': return 'from-blue-400 to-cyan-500';
      case 'halten': return 'from-purple-400 to-purple-600';
      case 'ausatmen': return 'from-green-400 to-teal-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl hover:scale-110 transition-transform duration-300">
                🏠
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  🧘 Stille & Meditation
                </h1>
                <p className="text-purple-200">
                  Finde innere Ruhe und Achtsamkeit
                </p>
              </div>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl"
            >
              ☮️
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedSession ? (
            // Meditations-Auswahl
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Wähle deine Meditation
                </h2>
                <p className="text-purple-200 text-lg">
                  Jede Reise zu mehr Achtsamkeit beginnt mit einem ersten Schritt
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {meditationsSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                    onClick={() => startMeditation(session)}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-4">{session.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {session.name}
                      </h3>
                      <p className="text-purple-200 mb-4 leading-relaxed">
                        {session.description}
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-purple-300">
                        <span>⏱️</span>
                        <span>{session.duration} Minuten</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            // Aktive Meditation
            <motion.div
              key="meditation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto text-center"
            >
              {/* Timer Display */}
              <motion.div 
                className="mb-12"
                animate={{ scale: isActive ? [1, 1.02, 1] : 1 }}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              >
                <div className="text-8xl font-bold text-white mb-4">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-purple-200 text-xl">
                  {selectedSession.name}
                </p>
              </motion.div>

              {/* Atemführung für Atemmeditation */}
              {selectedSession.type === 'atemmeditation' && isActive && (
                <motion.div 
                  className="mb-12"
                  key={breathingPhase}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <motion.div 
                    className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${getBreathingColor()} mb-6`}
                    animate={{ 
                      scale: breathingPhase === 'einatmen' ? 1.2 : breathingPhase === 'halten' ? 1.2 : 0.8,
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                  />
                  <p className="text-2xl text-white font-semibold">
                    {getBreathingInstruction()}
                  </p>
                </motion.div>
              )}

              {/* Allgemeine Meditationsführung */}
              {selectedSession.type !== 'atemmeditation' && isActive && (
                <motion.div 
                  className="mb-12"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="text-6xl mb-6">{selectedSession.icon}</div>
                  <p className="text-xl text-purple-200">
                    {selectedSession.description}
                  </p>
                </motion.div>
              )}

              {/* Kontrollen */}
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={pauseResume}
                  className="px-8 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300"
                >
                  {isActive ? '⏸️ Pausieren' : '▶️ Fortsetzen'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={stopMeditation}
                  className="px-8 py-3 bg-red-500/80 backdrop-blur-md border border-red-400/50 rounded-full text-white font-semibold hover:bg-red-500 transition-all duration-300"
                >
                  ⏹️ Beenden
                </motion.button>
              </div>

              {/* Meditation beendet */}
              {timeLeft === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 bg-green-500/20 backdrop-blur-md rounded-2xl p-8 border border-green-400/30"
                >
                  <div className="text-6xl mb-4">🌟</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Meditation abgeschlossen!
                  </h3>
                  <p className="text-green-200 mb-6">
                    Du hast {selectedSession.duration} Minuten in Achtsamkeit verbracht.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stopMeditation}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Neue Meditation starten
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inspirations-Zitat */}
        {!isActive && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >            <blockquote className="text-xl text-purple-200 italic mb-4">
              &ldquo;In der Stille findest du die Antworten, die dein Herz sucht.&rdquo;
            </blockquote>
            <p className="text-purple-300">- Buddha</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
