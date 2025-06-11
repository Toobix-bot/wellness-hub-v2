'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ActivityGoal, ActivityChallenge, SmartRecommendation, ActivityInsight } from '@/types/activityTracking';

export default function ActivityTrackingPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [goals, setGoals] = useState<ActivityGoal[]>([]);
  const [challenges, setChallenges] = useState<ActivityChallenge[]>([]);
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [insights, setInsights] = useState<ActivityInsight[]>([]);
  const [showNewActivity, setShowNewActivity] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Partial<Activity>>({});
  const [activeView, setActiveView] = useState<'dashboard' | 'log' | 'goals' | 'insights'>('dashboard');

  const activityTypes = [
    { type: 'meditation', name: 'Meditation', icon: '🧘', color: 'from-purple-500 to-indigo-600' },
    { type: 'exercise', name: 'Sport', icon: '💪', color: 'from-red-500 to-orange-600' },
    { type: 'reading', name: 'Lesen', icon: '📚', color: 'from-blue-500 to-cyan-600' },
    { type: 'social', name: 'Sozial', icon: '👥', color: 'from-green-500 to-teal-600' },
    { type: 'creative', name: 'Kreativ', icon: '🎨', color: 'from-pink-500 to-rose-600' },
    { type: 'learning', name: 'Lernen', icon: '🎓', color: 'from-yellow-500 to-amber-600' },
    { type: 'nature', name: 'Natur', icon: '🌿', color: 'from-emerald-500 to-green-600' },
    { type: 'rest', name: 'Ruhe', icon: '😴', color: 'from-slate-500 to-gray-600' }
  ];

  useEffect(() => {
    loadActivityData();
    generateSmartRecommendations();
    generateInsights();
  }, []);

  const loadActivityData = () => {
    const savedActivities = localStorage.getItem('activities');
    const savedGoals = localStorage.getItem('activityGoals');
    
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
    
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
    
    // Lade Beispiel-Challenges
    const exampleChallenges: ActivityChallenge[] = [
      {
        id: 'daily_mindfulness',
        title: '7-Tage Achtsamkeits-Challenge',
        description: 'Jeden Tag 10 Minuten Meditation oder Achtsamkeitsübung',
        type: 'weekly',
        requirements: {
          activities: ['meditation'],
          minDuration: 10,
          minFrequency: 7,
          specificConditions: ['Täglich für 7 Tage']
        },
        rewards: {
          xp: 200,
          coins: 50,
          badge: '🧘 Achtsamkeits-Meister',
          unlocks: ['Erweiterte Meditationstechniken']
        },
        progress: {
          current: 0,
          target: 7,
          isCompleted: false
        },
        timeframe: {
          start: new Date().toISOString(),
          end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      },
      {
        id: 'movement_month',
        title: 'Bewegungs-Monat',
        description: '30 Tage lang täglich mindestens 20 Minuten Bewegung',
        type: 'monthly',
        requirements: {
          activities: ['exercise'],
          minDuration: 20,
          minFrequency: 30
        },
        rewards: {
          xp: 500,
          coins: 100,
          badge: '💪 Bewegungs-Champion',
          unlocks: ['Fortgeschrittene Workout-Routinen']
        },
        progress: {
          current: 0,
          target: 30,
          isCompleted: false
        },
        timeframe: {
          start: new Date().toISOString(),
          end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      }
    ];
    setChallenges(exampleChallenges);
  };

  const generateSmartRecommendations = () => {
    // Simuliere KI-basierte Empfehlungen
    const now = new Date();
    const hour = now.getHours();
    
    const recs: SmartRecommendation[] = [];
    
    if (hour < 10) {
      recs.push({
        id: 'morning_meditation',
        type: 'activity',
        title: 'Morgen-Meditation',
        description: 'Starte deinen Tag mit 10 Minuten Achtsamkeit',
        reasoning: 'Morgendliche Meditation kann die Konzentration um 23% steigern',
        suggestedActivity: {
          type: 'meditation',
          duration: 10,
          intensity: 'low',
          location: 'home'
        },
        confidence: 0.85,
        basedOn: ['Tageszeit', 'Optimale Cortisol-Level', 'Wissenschaftliche Studien'],
        priority: 'medium'
      });
    } else if (hour > 14 && hour < 18) {
      recs.push({
        id: 'afternoon_movement',
        type: 'activity',
        title: 'Nachmittags-Bewegung',
        description: 'Ein kurzer Spaziergang kann Energie und Kreativität steigern',
        reasoning: 'Bewegung am Nachmittag verbessert die kognitive Leistung um 20%',
        suggestedActivity: {
          type: 'exercise',
          duration: 15,
          intensity: 'low',
          location: 'outdoor'
        },
        confidence: 0.78,
        basedOn: ['Circadiane Rhythmen', 'Energielevel-Vorhersage'],
        priority: 'medium'
      });
    }
    
    setRecommendations(recs);
  };

  const generateInsights = () => {
    // Simuliere Datenanalyse und Insights
    const sampleInsights: ActivityInsight[] = [
      {
        id: 'mood_correlation',
        category: 'correlation',
        title: 'Aktivität & Stimmung Verbindung',
        description: 'Meditation zeigt die stärkste positive Korrelation mit deiner Stimmungsverbesserung',
        data: { correlation: 0.78, activities: ['meditation', 'nature', 'reading'] },
        actionable: true,
        suggestions: ['Erhöhe die Meditationsfrequenz', 'Verbinde Meditation mit Naturerlebnissen'],
        scientificBacking: {
          source: 'Harvard Medical School, 2021',
          credibility: 9,
          summary: 'Meditation reduziert Stresshormone um 23% und erhöht Serotonin-Level'
        }
      },
      {
        id: 'optimal_time',
        category: 'pattern',
        title: 'Deine optimale Zeit',
        description: 'Du zeigst die beste Leistung bei Aktivitäten zwischen 9-11 Uhr',
        data: { optimalHours: [9, 10, 11], performanceIncrease: '15%' },
        actionable: true,
        suggestions: ['Plane wichtige Aktivitäten am Vormittag', 'Nutze den natürlichen Energieschub']
      }
    ];
    
    setInsights(sampleInsights);
  };

  const logActivity = () => {
    if (!currentActivity.type || !currentActivity.duration) {
      alert('Bitte wähle eine Aktivität und Dauer aus');
      return;
    }

    const newActivity: Activity = {
      id: Date.now().toString(),
      type: currentActivity.type as Activity['type'],
      name: currentActivity.name || activityTypes.find(t => t.type === currentActivity.type)?.name || 'Aktivität',
      duration: currentActivity.duration,
      intensity: currentActivity.intensity || 'medium',
      mood_before: currentActivity.mood_before || 5,
      mood_after: currentActivity.mood_after || 6,
      location: currentActivity.location || 'home',
      companions: currentActivity.companions || 'alone',
      notes: currentActivity.notes,
      timestamp: new Date().toISOString(),
      energy_level: currentActivity.energy_level || 5,
      tags: currentActivity.tags || []
    };

    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
    
    setCurrentActivity({});
    setShowNewActivity(false);
    
    // Update challenges
    updateChallengeProgress(newActivity);
  };

  const updateChallengeProgress = (activity: Activity) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.requirements.activities.includes(activity.type) && 
          activity.duration >= challenge.requirements.minDuration) {
        return {
          ...challenge,
          progress: {
            ...challenge.progress,
            current: challenge.progress.current + 1,
            isCompleted: challenge.progress.current + 1 >= challenge.progress.target
          }
        };
      }
      return challenge;
    });
    
    setChallenges(updatedChallenges);
  };

  const getTodaysActivities = () => {
    const today = new Date().toDateString();
    return activities.filter(activity => 
      new Date(activity.timestamp).toDateString() === today
    );
  };

  const getWeeklyStats = () => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weeklyActivities = activities.filter(activity => 
      new Date(activity.timestamp) >= weekAgo
    );
    
    const totalDuration = weeklyActivities.reduce((sum, activity) => sum + activity.duration, 0);
    const averageMoodImprovement = weeklyActivities.length > 0 
      ? weeklyActivities.reduce((sum, activity) => sum + (activity.mood_after - activity.mood_before), 0) / weeklyActivities.length
      : 0;
    
    return {
      totalActivities: weeklyActivities.length,
      totalDuration,
      averageMoodImprovement: averageMoodImprovement.toFixed(1)
    };
  };

  const weeklyStats = getWeeklyStats();
  const todaysActivities = getTodaysActivities();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border-b border-white/20 p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">📊 Aktivitäts-Tracking</h1>
              <p className="text-purple-200">Verfolge deine Aktivitäten und entdecke Muster für optimales Wohlbefinden</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNewActivity(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-xl font-bold shadow-lg"
            >
              + Aktivität erfassen
            </motion.button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'log', name: 'Aktivitäten', icon: '📝' },
              { id: 'goals', name: 'Ziele & Challenges', icon: '🎯' },
              { id: 'insights', name: 'Insights', icon: '🧠' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeView === tab.id
                    ? 'bg-white text-gray-800'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {activeView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Weekly Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-2xl"
                >
                  <h3 className="text-xl font-bold mb-2">Diese Woche</h3>
                  <div className="text-3xl font-bold">{weeklyStats.totalActivities}</div>
                  <div className="text-blue-200">Aktivitäten</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-green-600 to-teal-700 p-6 rounded-2xl"
                >
                  <h3 className="text-xl font-bold mb-2">Gesamtdauer</h3>
                  <div className="text-3xl font-bold">{weeklyStats.totalDuration}</div>
                  <div className="text-green-200">Minuten</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-yellow-600 to-orange-700 p-6 rounded-2xl"
                >
                  <h3 className="text-xl font-bold mb-2">⌀ Stimmung</h3>
                  <div className="text-3xl font-bold">+{weeklyStats.averageMoodImprovement}</div>
                  <div className="text-yellow-200">Verbesserung</div>
                </motion.div>
              </div>

              {/* Smart Recommendations */}
              {recommendations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                >
                  <h3 className="text-2xl font-bold mb-4">🤖 KI-Empfehlungen</h3>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="bg-white/10 p-4 rounded-xl"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg">{rec.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            rec.priority === 'high' ? 'bg-red-500' :
                            rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}>
                            {rec.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-purple-200 mb-3">{rec.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-purple-300">
                            Vertrauen: {(rec.confidence * 100).toFixed(0)}%
                          </div>
                          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                            Jetzt machen
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Today's Activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold mb-4">📅 Heute's Aktivitäten</h3>
                {todaysActivities.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🎯</div>
                    <p className="text-purple-200">Noch keine Aktivitäten heute erfasst</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todaysActivities.map((activity, index) => {
                      const activityType = activityTypes.find(t => t.type === activity.type);
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between bg-white/10 p-4 rounded-xl"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl">{activityType?.icon}</div>
                            <div>
                              <h4 className="font-medium">{activity.name}</h4>
                              <p className="text-sm text-purple-300">
                                {activity.duration} Min • {activity.intensity} Intensität
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-purple-300">Stimmung</div>
                            <div className="text-lg">
                              {activity.mood_before} → {activity.mood_after}
                              {activity.mood_after > activity.mood_before && (
                                <span className="text-green-400 ml-2">↗️</span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {activeView === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6">🏆 Aktive Challenges</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-xl ${
                        challenge.progress.isCompleted
                          ? 'bg-gradient-to-br from-green-600 to-emerald-700'
                          : 'bg-gradient-to-br from-purple-600 to-blue-700'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold">{challenge.title}</h4>
                        {challenge.progress.isCompleted && (
                          <span className="text-2xl">✅</span>
                        )}
                      </div>
                      
                      <p className="text-white/90 mb-4">{challenge.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Fortschritt</span>
                          <span>{challenge.progress.current}/{challenge.progress.target}</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(challenge.progress.current / challenge.progress.target) * 100}%` }}
                            className="bg-white h-3 rounded-full"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <div>🏆 {challenge.rewards.badge}</div>
                          <div>+{challenge.rewards.xp} XP</div>
                        </div>
                        <div className="text-sm text-right">
                          <div>{challenge.type === 'daily' ? 'Täglich' : challenge.type === 'weekly' ? 'Wöchentlich' : 'Monatlich'}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6">🧠 Persönliche Insights</h3>
                <div className="space-y-6">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 p-6 rounded-xl"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold mb-2">{insight.title}</h4>
                          <p className="text-purple-200">{insight.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          insight.category === 'achievement' ? 'bg-green-500' :
                          insight.category === 'warning' ? 'bg-red-500' :
                          insight.category === 'correlation' ? 'bg-blue-500' :
                          'bg-purple-500'
                        }`}>
                          {insight.category.toUpperCase()}
                        </span>
                      </div>
                      
                      {insight.suggestions && (
                        <div className="mb-4">
                          <h5 className="font-medium mb-2">💡 Handlungsempfehlungen:</h5>
                          <ul className="space-y-1">
                            {insight.suggestions.map((suggestion, i) => (
                              <li key={i} className="text-sm text-purple-200 flex items-center">
                                <span className="text-green-400 mr-2">•</span>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {insight.scientificBacking && (
                        <div className="bg-blue-500/20 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h6 className="font-medium">🔬 Wissenschaftliche Grundlage</h6>
                            <span className="text-xs px-2 py-1 bg-blue-500 rounded-full">
                              {insight.scientificBacking.credibility}/10
                            </span>
                          </div>
                          <p className="text-sm text-blue-200 mb-1">{insight.scientificBacking.summary}</p>
                          <p className="text-xs text-blue-300">{insight.scientificBacking.source}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* New Activity Modal */}
      <AnimatePresence>
        {showNewActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewActivity(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-gradient-to-br from-slate-800 to-purple-800 max-w-2xl w-full rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-white mb-6">📝 Aktivität erfassen</h2>
              
              {/* Activity Type Selection */}
              <div className="mb-6">
                <label className="block text-purple-200 mb-3">Aktivitäts-Typ</label>
                <div className="grid grid-cols-4 gap-3">
                  {activityTypes.map((type) => (
                    <button
                      key={type.type}
                      onClick={() => setCurrentActivity(prev => ({ ...prev, type: type.type }))}
                      className={`p-3 rounded-xl transition-all ${
                        currentActivity.type === type.type
                          ? 'bg-white text-gray-800 scale-105'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-xs font-medium">{type.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-purple-200 mb-2">
                  Dauer: {currentActivity.duration || 0} Minuten
                </label>
                <input
                  type="range"
                  min="5"
                  max="180"
                  step="5"
                  value={currentActivity.duration || 30}
                  onChange={(e) => setCurrentActivity(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>

              {/* Mood Before/After */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-purple-200 mb-2">
                    Stimmung vorher: {currentActivity.mood_before || 5}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentActivity.mood_before || 5}
                    onChange={(e) => setCurrentActivity(prev => ({ ...prev, mood_before: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 mb-2">
                    Stimmung nachher: {currentActivity.mood_after || 6}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentActivity.mood_after || 6}
                    onChange={(e) => setCurrentActivity(prev => ({ ...prev, mood_after: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowNewActivity(false)}
                  className="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-xl font-bold transition-all"
                >
                  Abbrechen
                </button>
                <button
                  onClick={logActivity}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 rounded-xl font-bold transition-all"
                >
                  Aktivität speichern
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
