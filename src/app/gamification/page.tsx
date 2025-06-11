'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  TrophyIcon,
  StarIcon,
  FireIcon,
  HeartIcon,
  BoltIcon,
  ShieldCheckIcon,
  GiftIcon,
  UserGroupIcon,
  MapIcon,
  WrenchScrewdriverIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClockIcon,
  PlusIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';
import { WellnessCharacter, Quest, Achievement, BattleSession } from '@/types/gamification';

interface GamificationDashboardProps {}

const GamificationDashboard: React.FC<GamificationDashboardProps> = () => {
  const [characters, setCharacters] = useState<WellnessCharacter[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<WellnessCharacter | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'quests' | 'battles' | 'social'>('overview');
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = () => {
    const saved = localStorage.getItem('wellness-characters');
    if (saved) {
      const loadedCharacters = JSON.parse(saved);
      setCharacters(loadedCharacters);
      if (loadedCharacters.length > 0) {
        setSelectedCharacter(loadedCharacters[0]);
      }
    }
  };

  const getExperienceForLevel = (level: number): number => {
    return level * 100; // Einfache Formel, kann komplexer gemacht werden
  };

  const getProgressToNextLevel = (character: WellnessCharacter): number => {
    const currentLevelXP = getExperienceForLevel(character.level - 1);
    const nextLevelXP = getExperienceForLevel(character.level);
    const progress = character.experience - currentLevelXP;
    const needed = nextLevelXP - currentLevelXP;
    return Math.min(100, (progress / needed) * 100);
  };

  const checkLevelUp = (character: WellnessCharacter): boolean => {
    const neededXP = getExperienceForLevel(character.level);
    return character.experience >= neededXP;
  };

  const getHealthColor = (value: number): string => {
    if (value >= 80) return 'text-green-500';
    if (value >= 60) return 'text-yellow-500';
    if (value >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const mockQuests: Quest[] = [
    {
      id: 'daily-meditation',
      title: '🧘‍♀️ Tägliche Meditation',
      description: 'Meditiere 10 Minuten täglich für eine Woche',
      type: 'weekly',
      difficulty: 'easy',
      objectives: [{
        id: 'meditate-days',
        description: 'Tage meditiert',
        type: 'days-streak',
        target: 'meditation',
        currentValue: 3,
        targetValue: 7,
        isCompleted: false
      }],
      rewards: [{
        type: 'experience',
        item: 'XP',
        quantity: 150,
        description: '150 Erfahrungspunkte'
      }],
      isActive: true,
      isCompleted: false,
      prerequisites: []
    },
    {
      id: 'gratitude-warrior',
      title: '💖 Dankbarkeits-Krieger',
      description: 'Schreibe 30 Dankbarkeitseinträge',
      type: 'monthly',
      difficulty: 'medium',
      objectives: [{
        id: 'gratitude-entries',
        description: 'Dankbarkeitseinträge',
        type: 'gratitude-entries',
        target: 'gratitude',
        currentValue: 12,
        targetValue: 30,
        isCompleted: false
      }],
      rewards: [{
        type: 'equipment',
        item: 'Goldenes Dankbarkeitstagebuch',
        quantity: 1,
        description: '+10% XP für Dankbarkeitsaktivitäten'
      }],
      isActive: true,
      isCompleted: false,
      prerequisites: []
    }
  ];

  const mockAchievements: Achievement[] = [
    {
      id: 'first-steps',
      title: '👶 Erste Schritte',
      description: 'Erste Wellness-Aktivität abgeschlossen',
      icon: '🎯',
      category: 'milestone',
      rarity: 'common',
      requirements: [],
      rewards: [],
      unlockedAt: new Date(),
      progress: 100,
      isHidden: false
    },
    {
      id: 'meditation-master',
      title: '🧘‍♂️ Meditations-Meister',
      description: '100 Stunden meditiert',
      icon: '🕉️',
      category: 'mastery',
      rarity: 'rare',
      requirements: [],
      rewards: [],
      progress: 45,
      isHidden: false
    }
  ];

  if (characters.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🎮</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Keine Charaktere gefunden
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Erstelle deinen ersten Wellness-Charakter und beginne dein Abenteuer!
          </p>
          <Link
            href="/charakter-erstellen"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Charakter erstellen</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedCharacter) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                🎮 Wellness-RPG Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Deine gamifizierte Wellness-Reise
              </p>
            </div>
          </div>
          
          <Link
            href="/charakter-erstellen"
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Neuer Charakter</span>
          </Link>
        </motion.div>

        {/* Character Selection */}
        {characters.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Charakter auswählen
            </h2>
            <div className="flex space-x-4 overflow-x-auto">
              {characters.map((char) => (
                <button
                  key={char.id}
                  onClick={() => setSelectedCharacter(char)}
                  className={`flex-shrink-0 p-4 rounded-lg border-2 transition-all ${
                    selectedCharacter?.id === char.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{char.avatar}</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {char.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Level {char.level}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Character Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Character Info */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="text-8xl mb-4">{selectedCharacter.avatar}</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedCharacter.name}
                </h2>
                <div className="text-purple-600 font-medium mb-4">
                  Level {selectedCharacter.level}
                </div>
                
                {/* XP Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span>Erfahrung</span>
                    <span>{selectedCharacter.experience} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressToNextLevel(selectedCharacter)}%` }}
                    />
                  </div>
                  {checkLevelUp(selectedCharacter) && (
                    <button
                      onClick={() => setShowLevelUp(true)}
                      className="mt-2 flex items-center space-x-2 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors mx-auto"
                    >
                      <ArrowUpIcon className="w-4 h-4" />
                      <span>Level Up!</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Health Stats */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Gesundheitsstatus
              </h3>
              <div className="space-y-3">
                {Object.entries(selectedCharacter.health).map(([stat, value]) => (
                  <div key={stat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">
                        {stat.charAt(0).toUpperCase() + stat.slice(1)}
                      </span>
                      <span className={`font-medium ${getHealthColor(value)}`}>
                        {value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          value >= 80 ? 'bg-green-500' :
                          value >= 60 ? 'bg-yellow-500' :
                          value >= 40 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attributes */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Attribute
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(selectedCharacter.attributes).map(([attr, value]) => (
                  <div key={attr} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {attr.replace(/[A-Z]/g, ' $&').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8"
        >
          <div className="flex overflow-x-auto">            {[
              { id: 'overview', label: 'Übersicht', icon: ChartBarIcon },
              { id: 'quests', label: 'Quests', icon: MapIcon },
              { id: 'battles', label: 'Kämpfe', icon: WrenchScrewdriverIcon },
              { id: 'social', label: 'Sozial', icon: UserGroupIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-purple-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Recent Achievements */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <TrophyIcon className="w-5 h-5 text-yellow-500" />
                  <span>Achievements</span>
                </h3>
                <div className="space-y-3">
                  {mockAchievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {achievement.title}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">
                          {achievement.progress}% abgeschlossen
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <ClockIcon className="w-5 h-5 text-blue-500" />
                  <span>Heute</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Meditation</span>
                    <span className="font-medium text-gray-900 dark:text-white">15 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Dankbarkeit</span>
                    <span className="font-medium text-gray-900 dark:text-white">3 Einträge</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Aktivitäten</span>
                    <span className="font-medium text-gray-900 dark:text-white">5 erledigt</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">XP verdient</span>
                    <span className="font-medium text-purple-600">+85 XP</span>
                  </div>
                </div>
              </div>

              {/* Equipment */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                  <span>Ausrüstung</span>
                </h3>
                <div className="text-center">
                  <div className="text-6xl mb-4">🎒</div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Keine Ausrüstung
                  </div>
                  <button className="mt-2 text-purple-600 hover:underline text-sm">
                    Ausrüstung finden
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quests Tab */}
          {activeTab === 'quests' && (
            <motion.div
              key="quests"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-6">
                Aktive Quests
              </h3>
              <div className="space-y-6">
                {mockQuests.map((quest) => (
                  <div key={quest.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {quest.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {quest.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          quest.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          quest.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {quest.difficulty}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          quest.type === 'daily' ? 'bg-blue-100 text-blue-800' :
                          quest.type === 'weekly' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {quest.type}
                        </span>
                      </div>
                    </div>
                    
                    {/* Objectives */}
                    <div className="space-y-2 mb-4">
                      {quest.objectives.map((objective) => (
                        <div key={objective.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-300">
                              {objective.description}
                            </span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {objective.currentValue} / {objective.targetValue}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(objective.currentValue / objective.targetValue) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Rewards */}
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Belohnung:</span>
                      {quest.rewards.map((reward, index) => (
                        <span key={index} className="text-yellow-600 font-medium">
                          {reward.description}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Battles Tab */}
          {activeTab === 'battles' && (
            <motion.div
              key="battles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-6">
                Kämpfe gegen innere Dämonen
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Angst-Schatten', emoji: '😰', difficulty: 'Leicht', status: 'Verfügbar' },
                  { name: 'Zweifel-Phantom', emoji: '👻', difficulty: 'Mittel', status: 'Gesperrt' },
                  { name: 'Wut-Flamme', emoji: '🔥', difficulty: 'Schwer', status: 'Gesperrt' }
                ].map((demon) => (
                  <div key={demon.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                    <div className="text-6xl mb-4">{demon.emoji}</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {demon.name}
                    </h4>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Schwierigkeit: {demon.difficulty}
                    </div>
                    <button 
                      disabled={demon.status === 'Gesperrt'}
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        demon.status === 'Verfügbar'
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {demon.status === 'Verfügbar' ? 'Kampf beginnen' : 'Gesperrt'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Social Tab */}
          {activeTab === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-6">
                Soziale Features
              </h3>
              
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <div className="text-gray-600 dark:text-gray-300">
                  Soziale Features kommen bald!
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Gilden, Freunde, gemeinsame Quests und mehr
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamificationDashboard;
