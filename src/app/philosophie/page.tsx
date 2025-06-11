'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { philosophicalPerspectives, innerBattleChallenges, culturalWisdom } from '@/utils/journalData';
import { PhilosophicalPerspective, InnerBattleChallenge, CulturalWisdom } from '@/types/journal';

export default function PhilosophicalUniversePage() {
  const [activeSection, setActiveSection] = useState<'perspectives' | 'battles' | 'wisdom'>('perspectives');
  const [selectedPerspective, setSelectedPerspective] = useState<PhilosophicalPerspective | null>(null);
  const [selectedBattle, setSelectedBattle] = useState<InnerBattleChallenge | null>(null);
  const [selectedWisdom, setSelectedWisdom] = useState<CulturalWisdom | null>(null);
  const [battleProgress, setBattleProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    // Lade Battle-Fortschritt aus localStorage
    const saved = localStorage.getItem('battleProgress');
    if (saved) {
      setBattleProgress(JSON.parse(saved));
    }
  }, []);

  const saveBattleProgress = (battleId: string, progress: number) => {
    const newProgress = { ...battleProgress, [battleId]: progress };
    setBattleProgress(newProgress);
    localStorage.setItem('battleProgress', JSON.stringify(newProgress));
  };

  const sections = [
    { id: 'perspectives', name: 'Perspektiven', icon: '🌍', color: 'from-blue-500 to-purple-600' },
    { id: 'battles', name: 'Innere Kämpfe', icon: '⚔️', color: 'from-red-500 to-orange-600' },
    { id: 'wisdom', name: 'Weltweisheit', icon: '📚', color: 'from-green-500 to-teal-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Mystischer Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center py-16 px-6">
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
          >
            ⚖️ Philosophisches Universum
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-purple-200 max-w-4xl mx-auto"
          >
            Erkunde die ewigen Fragen von Gut und Böse, Himmel und Hölle aus verschiedenen Kulturen und Perspektiven
          </motion.p>
          
          {/* Schwebende mystische Symbole */}
          <div className="absolute top-10 left-10 text-4xl animate-pulse">✨</div>
          <div className="absolute top-20 right-20 text-3xl animate-bounce">🌙</div>
          <div className="absolute bottom-10 left-1/4 text-5xl animate-spin-slow">☯️</div>
          <div className="absolute bottom-20 right-1/3 text-4xl animate-pulse">🕉️</div>
        </div>
      </motion.div>

      {/* Navigations-Tabs */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section.id as any)}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeSection === section.id
                  ? `bg-gradient-to-r ${section.color} shadow-2xl`
                  : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{section.icon}</span>
                <span>{section.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <AnimatePresence mode="wait">
          {activeSection === 'perspectives' && (
            <motion.div
              key="perspectives"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">🌍 Kulturelle Perspektiven</h2>
                <p className="text-xl text-purple-200">
                  Entdecke, wie verschiedene Kulturen die ewigen Fragen von Gut und Böse betrachten
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {philosophicalPerspectives.map((perspective, index) => (
                  <motion.div
                    key={perspective.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`bg-gradient-to-br ${perspective.color} p-6 rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-all`}
                    onClick={() => setSelectedPerspective(perspective)}
                  >
                    <div className="text-4xl mb-4 text-center">{perspective.avatar}</div>
                    <h3 className="text-xl font-bold mb-2">{perspective.culture}</h3>
                    <h4 className="text-lg mb-4 text-white/90">{perspective.title}</h4>
                    <p className="text-sm text-white/80 mb-4">{perspective.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {perspective.teachings.slice(0, 2).map((teaching, i) => (
                        <div key={i} className="bg-white/20 px-3 py-1 rounded-full text-xs">
                          {teaching.substring(0, 25)}...
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'battles' && (
            <motion.div
              key="battles"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">⚔️ Innere Kämpfe</h2>
                <p className="text-xl text-purple-200">
                  Bekämpfe deine inneren Dämonen mit Weisheit und Achtsamkeit
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {innerBattleChallenges.map((battle, index) => {
                  const progress = battleProgress[battle.id] || 0;
                  const isCompleted = progress >= 100;
                  
                  return (
                    <motion.div
                      key={battle.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`relative p-6 rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-all ${
                        isCompleted 
                          ? 'bg-gradient-to-br from-green-600 to-emerald-700' 
                          : battle.difficulty === 'easy' 
                            ? 'bg-gradient-to-br from-blue-600 to-cyan-700'
                            : battle.difficulty === 'medium'
                              ? 'bg-gradient-to-br from-yellow-600 to-orange-700'
                              : 'bg-gradient-to-br from-red-600 to-pink-700'
                      }`}
                      onClick={() => setSelectedBattle(battle)}
                    >
                      {isCompleted && (
                        <div className="absolute top-2 right-2 text-2xl">✅</div>
                      )}
                      
                      <div className="text-4xl mb-4 text-center">{battle.opponent.avatar}</div>
                      <h3 className="text-xl font-bold mb-2">{battle.name}</h3>
                      <p className="text-sm text-white/90 mb-4">{battle.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Fortschritt</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="bg-white h-2 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          battle.difficulty === 'easy' ? 'bg-blue-500' :
                          battle.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}>
                          {battle.difficulty.toUpperCase()}
                        </span>
                        <span className="text-sm">+{battle.rewards.xp} XP</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeSection === 'wisdom' && (
            <motion.div
              key="wisdom"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">📚 Weltweisheit</h2>
                <p className="text-xl text-purple-200">
                  Lerne von den weisesten Traditionen der Menschheit
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {culturalWisdom.map((wisdom, index) => (
                  <motion.div
                    key={wisdom.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-all"
                    onClick={() => setSelectedWisdom(wisdom)}
                  >
                    <div className="text-4xl mb-4 text-center">{wisdom.aiAvatar.appearance}</div>
                    <h3 className="text-xl font-bold mb-2">{wisdom.culture}</h3>
                    <h4 className="text-lg mb-4 text-white/90">{wisdom.title}</h4>
                    <p className="text-sm text-white/80 mb-4">{wisdom.translation}</p>
                    <div className="bg-white/20 px-3 py-2 rounded-lg text-sm">
                      <strong>Mit {wisdom.aiAvatar.name}:</strong> {wisdom.aiAvatar.personality}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals für detaillierte Ansichten */}
      <AnimatePresence>
        {selectedPerspective && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPerspective(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className={`bg-gradient-to-br ${selectedPerspective.color} max-w-2xl w-full rounded-2xl p-8 max-h-[80vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{selectedPerspective.avatar}</div>
                <h2 className="text-3xl font-bold mb-2">{selectedPerspective.culture}</h2>
                <h3 className="text-xl text-white/90">{selectedPerspective.title}</h3>
              </div>

              <div className="mb-6">
                <p className="text-lg leading-relaxed">{selectedPerspective.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold mb-4">🎓 Lehren</h4>
                {selectedPerspective.teachings.map((teaching, index) => (
                  <div key={index} className="bg-white/20 p-3 rounded-lg mb-2">
                    {teaching}
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold mb-4">🧘 Praktiken</h4>
                {selectedPerspective.practices.map((practice, index) => (
                  <div key={index} className="bg-white/20 p-3 rounded-lg mb-2 flex items-center">
                    <span className="text-lg mr-3">•</span>
                    {practice}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedPerspective(null)}
                className="w-full bg-white/20 hover:bg-white/30 py-3 rounded-xl font-bold text-lg transition-all"
              >
                Schließen
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
