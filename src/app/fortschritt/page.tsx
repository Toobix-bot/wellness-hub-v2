'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Goal, Milestone } from '@/types/wellness';

export default function FortschrittPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Tägliche Meditation',
      description: 'Jeden Tag 10 Minuten meditieren',
      category: 'stille',
      targetDate: new Date('2025-12-31'),
      progress: 65,
      milestones: [
        { id: '1', title: '7 Tage in Folge', completed: true, completedAt: new Date('2025-06-03') },
        { id: '2', title: '30 Tage in Folge', completed: true, completedAt: new Date('2025-06-15') },
        { id: '3', title: '100 Tage in Folge', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Dankbarkeits-Journal',
      description: 'Täglich 3 Dinge aufschreiben, für die ich dankbar bin',
      category: 'dankbarkeit',
      targetDate: new Date('2025-12-31'),
      progress: 40,
      milestones: [
        { id: '4', title: 'Erste Woche', completed: true, completedAt: new Date('2025-06-08') },
        { id: '5', title: 'Ersten Monat', completed: false },
        { id: '6', title: '100 Einträge', completed: false }
      ]
    }
  ]);

  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  const addNewGoal = () => {
    if (newGoalTitle.trim() && newGoalDescription.trim()) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        title: newGoalTitle.trim(),
        description: newGoalDescription.trim(),
        category: 'fortschritt',
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 Tage von heute
        progress: 0,
        milestones: [
          { id: Date.now().toString() + '_1', title: 'Ersten Schritt gemacht', completed: true, completedAt: new Date() },
          { id: Date.now().toString() + '_2', title: '25% erreicht', completed: false },
          { id: Date.now().toString() + '_3', title: '50% erreicht', completed: false },
          { id: Date.now().toString() + '_4', title: 'Ziel erreicht', completed: false }
        ]
      };
      setGoals([...goals, newGoal]);
      setNewGoalTitle('');
      setNewGoalDescription('');
      setShowNewGoalForm(false);
    }
  };

  const updateProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedGoal = { ...goal, progress: Math.max(0, Math.min(100, newProgress)) };
        
        // Automatisch Meilensteine markieren basierend auf Fortschritt
        const updatedMilestones = updatedGoal.milestones.map(milestone => {
          if (milestone.title.includes('25%') && updatedGoal.progress >= 25 && !milestone.completed) {
            return { ...milestone, completed: true, completedAt: new Date() };
          }
          if (milestone.title.includes('50%') && updatedGoal.progress >= 50 && !milestone.completed) {
            return { ...milestone, completed: true, completedAt: new Date() };
          }
          if (milestone.title.includes('Ziel erreicht') && updatedGoal.progress === 100 && !milestone.completed) {
            return { ...milestone, completed: true, completedAt: new Date() };
          }
          return milestone;
        });
        
        return { ...updatedGoal, milestones: updatedMilestones };
      }
      return goal;
    }));
  };

  const getProgressColor = (progress: number) => {
    if (progress < 25) return 'from-red-400 to-red-600';
    if (progress < 50) return 'from-orange-400 to-orange-600';
    if (progress < 75) return 'from-yellow-400 to-yellow-600';
    if (progress < 100) return 'from-blue-400 to-blue-600';
    return 'from-green-400 to-green-600';
  };

  const getDaysRemaining = (targetDate: Date) => {
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const completedGoals = goals.filter(goal => goal.progress === 100).length;
  const totalMilestones = goals.reduce((sum, goal) => sum + goal.milestones.length, 0);
  const completedMilestones = goals.reduce((sum, goal) => sum + goal.milestones.filter(m => m.completed).length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900">
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
                  📈 Fortschritt
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Verfolge deine Ziele und feiere deine Erfolge
                </p>
              </div>
            </div>
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-4xl"
            >
              🎯
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        {/* Übersichts-Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{goals.length}</div>
            <div className="text-gray-600 dark:text-gray-300">Aktive Ziele</div>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-600">{completedGoals}</div>
            <div className="text-gray-600 dark:text-gray-300">Erreichte Ziele</div>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-blue-600">{completedMilestones}/{totalMilestones}</div>
            <div className="text-gray-600 dark:text-gray-300">Meilensteine</div>
          </div>
        </motion.div>

        {/* Neues Ziel hinzufügen */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {!showNewGoalForm ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowNewGoalForm(true)}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>➕</span>
              <span>Neues Ziel hinzufügen</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Neues Ziel erstellen
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ziel-Titel..."
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                />
                <textarea
                  placeholder="Beschreibung des Ziels..."
                  value={newGoalDescription}
                  onChange={(e) => setNewGoalDescription(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                  rows={3}
                />
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addNewGoal}
                    className="flex-1 bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-300"
                  >
                    Ziel erstellen
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNewGoalForm(false)}
                    className="px-6 bg-gray-500 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                  >
                    Abbrechen
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Ziele-Liste */}
        <div className="space-y-6">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg"
            >
              {/* Ziel-Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {goal.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {goal.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {goal.progress}%
                  </div>
                  <div className="text-sm text-gray-500">
                    {getDaysRemaining(goal.targetDate)} Tage verbleibend
                  </div>
                </div>
              </div>

              {/* Fortschrittsbalken */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Fortschritt</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-full bg-gradient-to-r ${getProgressColor(goal.progress)} rounded-full`}
                  />
                </div>
              </div>

              {/* Fortschritt aktualisieren */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fortschritt aktualisieren:
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={goal.progress}
                    onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateProgress(goal.id, goal.progress - 5)}
                      className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                    >
                      -
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateProgress(goal.id, goal.progress + 5)}
                      className="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Meilensteine */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Meilensteine
                </h4>
                <div className="space-y-2">
                  {goal.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                        milestone.completed
                          ? 'bg-green-100 dark:bg-green-800/30 border border-green-200 dark:border-green-700'
                          : 'bg-gray-100 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        milestone.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}>
                        {milestone.completed ? '✓' : '○'}
                      </div>
                      <div className="flex-1">
                        <span className={`font-medium ${
                          milestone.completed
                            ? 'text-green-800 dark:text-green-200'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {milestone.title}
                        </span>
                        {milestone.completed && milestone.completedAt && (
                          <div className="text-sm text-green-600 dark:text-green-400">
                            Erreicht am {milestone.completedAt.toLocaleDateString('de-DE')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Motivations-Bereich */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">🌟 Motivation des Tages</h3>          <blockquote className="text-lg italic mb-4">
            &ldquo;Der Weg zu großen Zielen führt über kleine, konsequente Schritte.&rdquo;
          </blockquote>
          <p className="text-purple-100">- Konfuzius</p>
        </motion.div>
      </main>
    </div>
  );
}
