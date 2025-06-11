'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { activitiesStorage, sessionStorage, moodStorage, userStatsStorage } from '@/utils/wellnessStorage';

interface SessionTrackerProps {
  module: string;
  moduleName: string;
  onSessionComplete?: (duration: number, moodImprovement: number) => void;
}

export default function SessionTracker({ module, moduleName, onSessionComplete }: SessionTrackerProps) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0); // Zeit in Sekunden
  const [sessionStarted, setSessionStarted] = useState(false);
  const [moodBefore, setMoodBefore] = useState<number | null>(null);
  const [moodAfter, setMoodAfter] = useState<number | null>(null);
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  // Timer-Logik
  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!sessionStarted) {
      setShowMoodCheck(true);
    } else {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handleMoodBeforeSubmit = (mood: number) => {
    setMoodBefore(mood);
    setShowMoodCheck(false);
    setSessionStarted(true);
    setIsActive(true);
    startTimeRef.current = new Date();
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    if (time > 30) { // Mindestens 30 Sekunden für eine gültige Session
      setShowCompletion(true);
    } else {
      handleReset();
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
    setSessionStarted(false);
    setMoodBefore(null);
    setMoodAfter(null);
    setShowMoodCheck(false);
    setShowCompletion(false);
    setSessionNotes('');
    startTimeRef.current = null;
  };

  const handleSessionComplete = (finalMood: number) => {
    setMoodAfter(finalMood);
    
    const endTime = new Date();
    const duration = Math.round(time / 60); // Dauer in Minuten
    const moodImprovement = moodBefore ? finalMood - moodBefore : 0;

    // Session speichern
    if (startTimeRef.current) {
      sessionStorage.add({
        module,
        startTime: startTimeRef.current,
        endTime,
        duration,
        completed: true,
        moodBefore: moodBefore || undefined,
        moodAfter: finalMood,
        notes: sessionNotes || undefined
      });
    }    // Aktivität speichern
    activitiesStorage.add({
      moduleId: module,
      activityName: 'Session',
      type: 'session',
      duration,
      pointsEarned: Math.max(5, Math.round(duration * 1.5)),
      moodBefore: moodBefore || undefined,
      moodAfter: finalMood
    });

    // Stimmungseintrag speichern
    moodStorage.add({
      date: new Date(),
      mood: finalMood,
      module,
      beforeActivity: moodBefore || undefined,
      afterActivity: finalMood,
      notes: sessionNotes || undefined
    });

    // Benutzerstatistiken aktualisieren
    const currentStats = userStatsStorage.get();
    const newStats = {
      ...currentStats,
      totalActivities: currentStats.totalActivities + 1,
      totalMinutes: currentStats.totalMinutes + duration,
      totalPoints: currentStats.totalPoints + Math.max(5, Math.round(duration * 1.5)),
      monthlyProgress: {
        ...currentStats.monthlyProgress,
        [module]: Math.min(100, currentStats.monthlyProgress[module] + Math.round(duration / 2))
      }
    };
    userStatsStorage.save(newStats);

    // Callback aufrufen
    if (onSessionComplete) {
      onSessionComplete(duration, moodImprovement);
    }

    setShowCompletion(false);
    handleReset();
  };

  const MoodSelector = ({ title, onSelect }: { title: string; onSelect: (mood: number) => void }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Wie fühlst du dich gerade? (1 = sehr schlecht, 10 = ausgezeichnet)
        </p>
        
        <div className="grid grid-cols-5 gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
            <motion.button
              key={mood}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(mood)}
              className={`
                aspect-square rounded-xl font-bold text-white text-sm
                ${mood <= 3 ? 'bg-red-500 hover:bg-red-600' : 
                  mood <= 6 ? 'bg-yellow-500 hover:bg-yellow-600' : 
                  'bg-green-500 hover:bg-green-600'}
                transition-colors duration-200
              `}
            >
              {mood}
            </motion.button>
          ))}
        </div>
        
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowMoodCheck(false);
              setShowCompletion(false);
            }}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Überspringen
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  const CompletionModal = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-2xl text-white">🎉</span>
          </motion.div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Session abgeschlossen!
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Du hast {formatTime(time)} in {moduleName} verbracht
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notizen zu deiner Session (optional):
          </label>
          <textarea
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            rows={3}
            placeholder="Wie war deine Session? Was hast du gelernt?"
          />
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Wie fühlst du dich jetzt nach der Session?
          </p>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
              <motion.button
                key={mood}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSessionComplete(mood)}
                className={`
                  aspect-square rounded-xl font-bold text-white text-sm
                  ${mood <= 3 ? 'bg-red-500 hover:bg-red-600' : 
                    mood <= 6 ? 'bg-yellow-500 hover:bg-yellow-600' : 
                    'bg-green-500 hover:bg-green-600'}
                  transition-colors duration-200
                `}
              >
                {mood}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSessionComplete(moodBefore || 5)}
            className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Überspringen
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <motion.div 
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        whileHover={{ scale: 1.02 }}
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Session Timer
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Verfolge deine Zeit in {moduleName}
          </p>
        </div>

        <div className="text-center mb-8">
          <motion.div
            key={time}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-6xl font-bold text-gray-800 dark:text-white mb-2 font-mono"
          >
            {formatTime(time)}
          </motion.div>
          {moodBefore && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Startstimmung: {moodBefore}/10
            </p>
          )}
        </div>

        <div className="flex justify-center gap-4">
          {!isActive && !sessionStarted ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold flex items-center gap-2 transition-colors"
            >
              <span>▶️</span>
              Starten
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePause}
                className={`px-6 py-3 ${isPaused ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white rounded-xl font-semibold flex items-center gap-2 transition-colors`}
              >
                <span>{isPaused ? '▶️' : '⏸️'}</span>
                {isPaused ? 'Fortsetzen' : 'Pausieren'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStop}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold flex items-center gap-2 transition-colors"
              >
                <span>⏹️</span>
                Beenden
              </motion.button>
            </>
          )}
          
          {(sessionStarted || time > 0) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold flex items-center gap-2 transition-colors"
            >
              <span>🔄</span>
              Reset
            </motion.button>
          )}
        </div>

        {time > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
          >
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Geschätzte Punkte:</span>
              <span className="font-semibold">{Math.max(5, Math.round((time / 60) * 1.5))}</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {showMoodCheck && (
          <MoodSelector 
            title="Wie fühlst du dich vor der Session?"
            onSelect={handleMoodBeforeSubmit}
          />
        )}
        
        {showCompletion && (
          <CompletionModal />
        )}
      </AnimatePresence>
    </>
  );
}
