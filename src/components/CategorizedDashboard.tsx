'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { wellnessCategories, wellnessModules, getModulesForCategory } from '@/utils/wellnessConfig';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import SessionTracker from '@/components/SessionTracker';
import CommunityFeatures from '@/components/CommunityFeatures';
import WellnessInsights from '@/components/WellnessInsights';
import WellnessCompass from '@/components/WellnessCompass';
import ScientificMoodBoard from '@/components/ScientificMoodBoard';
import WellnessEcosystem from '@/components/WellnessEcosystem';
import WellnessAchievements from '@/components/WellnessAchievements';
import RealWorldChallenges from '@/components/RealWorldChallenges';
import PersonalImpactTracker from '@/components/PersonalImpactTracker';
import ExpertResourceSystem from '@/components/ExpertResourceSystem';
import CommunityImpactDashboard from '@/components/CommunityImpactDashboard';
import UserPreferences from '@/components/UserPreferences';
import EnhancedWellnessCard from '@/components/EnhancedWellnessCard';
import { UserStats } from '@/types/analytics';
import { userStatsStorage } from '@/utils/wellnessStorage';

export default function CategorizedDashboard() {  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showSessionTracker, setShowSessionTracker] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [selectedModuleName, setSelectedModuleName] = useState<string>('');
  const [userStats, setUserStats] = useState<UserStats>({
    totalActivities: 0,
    totalMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
    level: 1,
    totalPoints: 0,
    averageMoodImprovement: 0,
    favoriteModule: '',
    achievements: [],
    weeklyActivity: {},
    monthlyProgress: {}
  });  const [activeView, setActiveView] = useState<'overview' | 'categories' | 'analytics'>('overview');
    // Handler für Stats Updates
  const handleStatsUpdate = (newStats: UserStats) => {
    setUserStats(newStats);
    userStatsStorage.save(newStats);
  };

  // Benutzerstatistiken beim Mount laden
  useEffect(() => {
    const loadUserStats = () => {
      try {
        const stats = userStatsStorage.get();
        if (stats) {
          setUserStats(stats);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Benutzerstatistiken:', error);
      }
    };

    loadUserStats();
    const interval = setInterval(loadUserStats, 30000); // Alle 30 Sekunden aktualisieren

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white py-16">
        <div className="container-wellness">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Wellness Hub Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Deine zentrale Schaltstelle für ganzheitliches Wohlbefinden und persönliche Transformation
            </p>
              {/* Quick Stats */}
            {userStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">{userStats.totalActivities || 0}</div>
                  <div className="text-sm text-white/80">Aktivitäten</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">{userStats.level || 1}</div>
                  <div className="text-sm text-white/80">Level</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">{userStats.achievements.length}</div>
                  <div className="text-sm text-white/80">Erfolge</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">{Math.round((userStats.totalMinutes || 0) / 60)}</div>
                  <div className="text-sm text-white/80">Stunden</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-20">
        <div className="container-wellness">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Übersicht', icon: '🏠' },
              { id: 'categories', label: 'Kategorien', icon: '📂' },
              { id: 'analytics', label: 'Analytics', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                  activeView === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="container-wellness py-12">
        {activeView === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Quick Actions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold wellness-heading mb-6">Schnellzugriff</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wellnessModules.slice(0, 6).map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EnhancedWellnessCard
                      title={module.name}
                      description={module.description}
                      icon={module.icon}
                      path={module.path}
                      color={module.color}
                      isActive={module.isActive}
                      features={module.features}
                      difficulty={module.difficulty}
                      estimatedTime={module.estimatedTime}
                      premium={module.premium}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Wellness Insights */}
            <WellnessInsights />
            
            {/* Community Features */}
            <CommunityFeatures />
            
            {/* Achievements */}
            <WellnessAchievements />
          </motion.div>
        )}

        {activeView === 'categories' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold wellness-heading mb-8">Wellness-Kategorien</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wellnessCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={category.path}>
                    <div className={`
                      wellness-card p-8 cursor-pointer group relative overflow-hidden
                      bg-gradient-to-br ${category.color} text-white
                      hover:scale-105 transform transition-all duration-300
                    `}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 text-6xl opacity-30">
                          {category.icon}
                        </div>
                      </div>

                      <div className="relative z-10">
                        <div className="text-4xl mb-4">{category.icon}</div>
                        <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                        <p className="text-white/90 mb-6">{category.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {category.features?.slice(0, 3).map((feature) => (
                            <span
                              key={feature}
                              className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">
                            {category.modules.length} Module
                          </span>
                          <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* All Modules Overview */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold wellness-heading mb-8">Alle Module</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wellnessModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <EnhancedWellnessCard
                      title={module.name}
                      description={module.description}
                      icon={module.icon}
                      path={module.path}
                      color={module.color}
                      isActive={module.isActive}
                      features={module.features}
                      difficulty={module.difficulty}
                      estimatedTime={module.estimatedTime}
                      premium={module.premium}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}        {activeView === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnalyticsDashboard 
              userStats={userStats}
              onStatsUpdate={handleStatsUpdate}
            />
            <div className="mt-8">
              <PersonalImpactTracker />
            </div>
            <div className="mt-8">
              <CommunityImpactDashboard />
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSessionTracker(true)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg"
        >
          <span className="text-xl">⏱️</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAnalytics(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg"
        >
          <span className="text-xl">📊</span>
        </motion.button>
      </div>

      {/* Modals */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl max-h-[90vh] overflow-y-auto">            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Analytics Dashboard</h3>
              <button
                onClick={() => setShowAnalytics(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <AnalyticsDashboard 
              userStats={userStats}
              onStatsUpdate={handleStatsUpdate}
            />
          </div>
        </div>
      )}      {showSessionTracker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Session Tracker</h3>
              <button
                onClick={() => setShowSessionTracker(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <SessionTracker
              module={selectedModule}
              moduleName={selectedModuleName}
              onSessionComplete={(duration, moodImprovement) => {
                setShowSessionTracker(false);
                // Update user stats
                const updatedStats = {
                  ...userStats,
                  totalActivities: userStats.totalActivities + 1,
                  totalMinutes: userStats.totalMinutes + duration
                };
                handleStatsUpdate(updatedStats);
              }}
            />
          </div>
        </div>
      )}

      {/* Additional Components */}
      <WellnessCompass />
      <ScientificMoodBoard />
      <WellnessEcosystem />
      <RealWorldChallenges />
      <ExpertResourceSystem />
      <UserPreferences />
    </div>
  );
}
