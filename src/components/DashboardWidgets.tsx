'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { userStatsStorage, activitiesStorage, moodStorage, sessionStorage } from '@/utils/wellnessStorage';
import { UserStats } from '@/types/analytics';

export default function DashboardWidgets() {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [todaysMood, setTodaysMood] = useState<number | null>(null);
  const [weeklyProgress, setWeeklyProgress] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  // Daten beim Mount laden und bei Storage-Änderungen aktualisieren
  useEffect(() => {
    const loadData = () => {
      const stats = userStatsStorage.get();
      setUserStats(stats);
      setCurrentStreak(stats.currentStreak);

      // Heutige Stimmung laden
      const todayMood = moodStorage.getAverageMood(1);
      setTodaysMood(todayMood);

      // Wöchentlichen Fortschritt berechnen
      const weeklyMinutes = sessionStorage.getTotalDuration();
      const weeklyGoal = 140; // 20 Minuten × 7 Tage
      setWeeklyProgress(Math.min(100, (weeklyMinutes / weeklyGoal) * 100));
    };

    loadData();

    // Storage-Event-Listener für Updates
    const handleStorageUpdate = () => loadData();
    window.addEventListener('storage', handleStorageUpdate);
    
    // Custom Events für App-interne Updates
    window.addEventListener('wellnessDataUpdated', handleStorageUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('wellnessDataUpdated', handleStorageUpdate);
    };
  }, []);

  if (!userStats) {
    return <div className="animate-pulse">Lade Dashboard-Daten...</div>;
  }
  const todayStats = {
    meditation: sessionStorage.get().filter(s => 
      s.module === 'stille' && 
      new Date(s.startTime).toDateString() === new Date().toDateString()
    ).reduce((total, s) => total + s.duration, 0),
    
    gratitude: activitiesStorage.getTodaysActivities().filter(a => a.moduleId === 'dankbarkeit').length,
    
    goals: activitiesStorage.getTodaysActivities().filter(a => a.moduleId === 'fortschritt').length,
    
    mood: todaysMood || 0
  };

  const quickActions = [
    { 
      name: '5-Min Meditation', 
      icon: '🧘', 
      action: () => window.location.href = '/stille',
      color: 'from-blue-500 to-indigo-600' 
    },
    { 
      name: 'Dankbarkeit', 
      icon: '🙏', 
      action: () => window.location.href = '/dankbarkeit',
      color: 'from-green-500 to-teal-600' 
    },
    { 
      name: 'Ziel setzen', 
      icon: '🎯', 
      action: () => window.location.href = '/fortschritt',
      color: 'from-purple-500 to-pink-600' 
    },
    { 
      name: 'Mood Check', 
      icon: '😊', 
      action: () => {
        const mood = parseInt(prompt('Wie fühlst du dich? (1-10)') || '5');
        if (mood >= 1 && mood <= 10) {
          moodStorage.add({ date: new Date(), mood });
          window.dispatchEvent(new CustomEvent('wellnessDataUpdated'));
        }
      },
      color: 'from-yellow-500 to-orange-600' 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Heute
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Meditation
            </span>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {todayStats.meditation} min
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Dankbarkeit
            </span>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {todayStats.gratitude} Einträge
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Ziele
            </span>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {todayStats.goals} Fortschritte
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Stimmung
            </span>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              {todayStats.mood}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Fortschritt
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Wöchentlicher Fortschritt
          </div>
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {weeklyProgress}%
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${weeklyProgress}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Aktueller Streak
          </div>
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {currentStreak} Tage
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md col-span-1 sm:col-span-2 lg:col-span-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Schnelle Aktionen
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map(action => (
            <motion.div
              key={action.name}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center p-4 rounded-lg shadow-md cursor-pointer ${action.color}`}
              onClick={action.action}
            >
              <div className="text-2xl mr-3">
                {action.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  {action.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
