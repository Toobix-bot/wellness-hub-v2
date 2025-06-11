'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  calculateLevel, 
  getPointsForNextLevel, 
  calculateWellnessScore,
  getMotivationalMessage,
  getRarityColor,
  generateDailyChallenges,
  checkAchievements
} from '@/utils/gamification';
import { UserStats, DailyChallenge, Achievement } from '@/types/analytics';

interface AnalyticsDashboardProps {
  userStats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
}

export default function AnalyticsDashboard({ userStats, onStatsUpdate }: AnalyticsDashboardProps) {
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);

  useEffect(() => {
    // Generate daily challenges
    const challenges = generateDailyChallenges();
    setDailyChallenges(challenges);

    // Check for new achievements
    const newAchievements = checkAchievements(userStats);
    if (newAchievements.length > 0) {
      setNewAchievements(newAchievements);
      setShowAchievementModal(true);
    }
  }, [userStats]);

  const wellnessScore = calculateWellnessScore(userStats);
  const level = calculateLevel(userStats.totalPoints);
  const pointsToNextLevel = getPointsForNextLevel(userStats.totalPoints);
  const motivationalMessage = getMotivationalMessage(userStats);

  const completeChallenge = (challengeId: string) => {
    const challenge = dailyChallenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
      // Update challenge
      setDailyChallenges(prev => 
        prev.map(c => 
          c.id === challengeId ? { ...c, completed: true } : c
        )
      );

      // Update user stats
      const updatedStats = {
        ...userStats,
        totalPoints: userStats.totalPoints + challenge.points,
        totalActivities: userStats.totalActivities + 1
      };
      onStatsUpdate(updatedStats);
    }
  };

  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const currentWeekActivity = weekDays.map(day => userStats.weeklyActivity[day] || 0);

  return (
    <div className="space-y-6">
      {/* Achievement Modal */}
      <AnimatePresence>
        {showAchievementModal && newAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowAchievementModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Neues Achievement freigeschaltet!
              </h2>
              {newAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white p-4 rounded-xl mb-4`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className="font-bold text-lg">{achievement.title}</h3>
                  <p className="text-sm opacity-90">{achievement.description}</p>
                  <div className="text-xs mt-2 opacity-75">+{achievement.points} Punkte</div>
                </motion.div>
              ))}
              <button
                onClick={() => setShowAchievementModal(false)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium"
              >
                Awesome! 🚀
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Wellness Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-400 to-green-500 p-6 rounded-2xl text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Wellness Score</h3>
            <div className="text-4xl font-bold mb-2">{wellnessScore}/100</div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${wellnessScore}%` }}
              />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">📊</div>
        </motion.div>

        {/* Level & XP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-400 to-indigo-500 p-6 rounded-2xl text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Level {level}</h3>
            <div className="text-2xl font-bold mb-2">{userStats.totalPoints} XP</div>
            <div className="text-xs opacity-80">
              {pointsToNextLevel} XP bis Level {level + 1}
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ 
                  width: `${100 - (pointsToNextLevel / (Math.pow(level, 2) * 50)) * 100}%` 
                }}
              />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">⭐</div>
        </motion.div>

        {/* Current Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-2xl text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Streak</h3>
            <div className="text-4xl font-bold mb-2">{userStats.currentStreak}</div>
            <div className="text-sm opacity-80">Tage in Folge</div>
            <div className="text-xs opacity-60 mt-1">
              Rekord: {userStats.longestStreak} Tage
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">🔥</div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-2xl text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Achievements</h3>
            <div className="text-4xl font-bold mb-2">{userStats.achievements.length}</div>
            <div className="text-sm opacity-80">freigeschaltet</div>
            <div className="flex space-x-1 mt-2">
              {userStats.achievements.slice(-3).map((achievement, index) => (
                <div key={index} className="text-lg opacity-80">
                  {achievement.icon}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">🏆</div>
        </motion.div>
      </div>

      {/* Motivational Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-6 rounded-2xl text-center"
      >
        <div className="text-3xl mb-2">💪</div>
        <p className="text-lg font-medium">{motivationalMessage}</p>
      </motion.div>

      {/* Weekly Activity & Daily Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Diese Woche</h3>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              const activityCount = currentWeekActivity[index];
              const intensity = Math.min(activityCount / 3, 1); // Max 3 activities = full intensity
              return (
                <div key={day} className="text-center">
                  <div className="text-xs text-gray-600 mb-1">{day}</div>
                  <div 
                    className="w-8 h-8 rounded-lg mx-auto transition-all duration-300"
                    style={{
                      backgroundColor: activityCount > 0 
                        ? `rgba(34, 197, 94, ${0.2 + intensity * 0.8})` 
                        : '#f3f4f6'
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold">
                      {activityCount > 0 ? activityCount : ''}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Daily Challenges */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Heutige Challenges</h3>
          <div className="space-y-3">
            {dailyChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  challenge.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{challenge.icon}</span>
                    <div>
                      <h4 className={`font-medium ${challenge.completed ? 'text-green-800' : 'text-gray-800'}`}>
                        {challenge.title}
                      </h4>
                      <p className={`text-xs ${challenge.completed ? 'text-green-600' : 'text-gray-600'}`}>
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {challenge.completed ? (
                      <div className="text-green-600 text-xl">✅</div>
                    ) : (
                      <button
                        onClick={() => completeChallenge(challenge.id)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:shadow-lg transition-all duration-300"
                      >
                        +{challenge.points} XP
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Module Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Modul-Fortschritt</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(userStats.monthlyProgress).map(([moduleId, progress]) => (
            <div key={moduleId} className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray={`${progress}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">{Math.round(progress)}%</span>
                </div>
              </div>
              <div className="text-xs text-gray-600 capitalize">{moduleId}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
