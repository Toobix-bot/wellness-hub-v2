'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  HeartIcon,
  SparklesIcon,
  GiftIcon,
  ClockIcon,
  StarIcon,
  PlusIcon,
  SunIcon,
  MoonIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  AcademicCapIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { 
  VirtualCompanion, 
  createNewCompanion, 
  getEvolutionStage, 
  companionActions,
  calculateMood,
  needsAttention,
  calculateLevel,
  getExperienceNeededForLevel
} from '@/types/virtualCompanion';
import AICoachingHub from '@/components/AICoachingHub';
import { aiPersonalities } from '@/utils/aiPersonalitiesData';

interface CompanionCarePageProps {}

const CompanionCarePage: React.FC<CompanionCarePageProps> = () => {
  const [companions, setCompanions] = useState<VirtualCompanion[]>([]);
  const [selectedCompanion, setSelectedCompanion] = useState<VirtualCompanion | null>(null);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newCompanionType, setNewCompanionType] = useState<'plant' | 'pet' | 'planet'>('plant');
  const [newCompanionName, setNewCompanionName] = useState('');
  const [userEnergy, setUserEnergy] = useState(100);

  // Load companions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wellness-virtual-companions');
    if (saved) {
      const loadedCompanions = JSON.parse(saved);
      setCompanions(loadedCompanions);
      if (loadedCompanions.length > 0) {
        setSelectedCompanion(loadedCompanions[0]);
      }
    }

    const savedEnergy = localStorage.getItem('wellness-user-energy');
    if (savedEnergy) {
      setUserEnergy(parseInt(savedEnergy));
    }
  }, []);

  // Save companions and energy
  const saveData = (updatedCompanions: VirtualCompanion[], energy: number) => {
    localStorage.setItem('wellness-virtual-companions', JSON.stringify(updatedCompanions));
    localStorage.setItem('wellness-user-energy', energy.toString());
  };

  // Energy regeneration (1 point per minute)
  useEffect(() => {
    const interval = setInterval(() => {
      setUserEnergy(prev => {
        const newEnergy = Math.min(100, prev + 1);
        localStorage.setItem('wellness-user-energy', newEnergy.toString());
        return newEnergy;
      });
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);

  const createCompanion = () => {
    if (!newCompanionName.trim()) return;
    
    const newCompanion = createNewCompanion(newCompanionType, newCompanionName.trim());
    const updatedCompanions = [...companions, newCompanion];
    setCompanions(updatedCompanions);
    setSelectedCompanion(newCompanion);
    setShowCreateNew(false);
    setNewCompanionName('');
    saveData(updatedCompanions, userEnergy);
  };

  const performAction = (actionId: string) => {
    if (!selectedCompanion) return;
    
    const action = companionActions[actionId];
    if (!action || userEnergy < action.energyCost) return;

    // Update companion
    const updatedCompanion = {
      ...selectedCompanion,
      health: Math.min(100, selectedCompanion.health + (action.effects.health || 0)),
      happiness: Math.min(100, selectedCompanion.happiness + (action.effects.happiness || 0)),
      experience: selectedCompanion.experience + (action.effects.experience || 0),
      lastCared: new Date().toISOString()
    };

    // Check for level up
    const newLevel = calculateLevel(updatedCompanion.experience);
    if (newLevel > updatedCompanion.level) {
      updatedCompanion.level = newLevel;
      // Add achievement for level up
      updatedCompanion.achievements.push(`Erreichte Level ${newLevel}`);
    }

    updatedCompanion.currentMood = calculateMood(updatedCompanion);
    updatedCompanion.needsAttention = needsAttention(updatedCompanion);

    // Update companions array
    const updatedCompanions = companions.map(c => 
      c.id === selectedCompanion.id ? updatedCompanion : c
    );

    const newEnergy = userEnergy - action.energyCost;
    
    setCompanions(updatedCompanions);
    setSelectedCompanion(updatedCompanion);
    setUserEnergy(newEnergy);
    saveData(updatedCompanions, newEnergy);
  };

  const getCompanionTypeIcon = (type: string) => {
    switch (type) {
      case 'plant': return '🌱';
      case 'pet': return '🐱';
      case 'planet': return '🪨';
      default: return '✨';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'überglücklich': return 'text-green-600';
      case 'fröhlich': return 'text-green-500';
      case 'zufrieden': return 'text-blue-500';
      case 'neutral': return 'text-gray-500';
      case 'traurig': return 'text-yellow-600';
      case 'krank': return 'text-red-600';
      case 'verlassen': return 'text-red-700';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Zurück zum Dashboard</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="w-5 h-5" />
                  <span>Energie: {userEnergy}/100</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white/20 p-4 rounded-2xl">
                <HeartIcon className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Virtuelle Begleiter
                </h1>
                <p className="text-xl text-white/90">
                  Erschaffe Verbindungen, fördere Leben, erlebe bedingungslose Liebe
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <p className="text-white/90 leading-relaxed">
                Deine virtuellen Begleiter sind mehr als nur digitale Wesen - sie sind Spiegel deiner Fürsorge 
                und Liebe. Durch die Pflege deiner Pflanze, deines Haustiers oder deines Planeten lernst du, 
                Verantwortung zu übernehmen, Mitgefühl zu entwickeln und eine tiefe Verbindung zu schaffen.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {companions.length === 0 ? (
          // No companions yet
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🌟</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Erschaffe deinen ersten Begleiter
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Wähle einen virtuellen Begleiter und beginne eine wunderbare Reise der Fürsorge, 
              des Wachstums und der bedingungslosen Liebe.
            </p>
            <button
              onClick={() => setShowCreateNew(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Neuen Begleiter erschaffen</span>
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Companion List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Deine Begleiter</h2>
                  <button
                    onClick={() => setShowCreateNew(true)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {companions.map((companion) => {
                    const evolution = getEvolutionStage(companion.type, companion.level);
                    const isSelected = selectedCompanion?.id === companion.id;
                    
                    return (
                      <motion.div
                        key={companion.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedCompanion(companion)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{evolution.appearance}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{companion.name}</h3>
                            <p className="text-sm text-gray-600">{evolution.name}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Level {companion.level}
                              </span>
                              <span className={`text-xs ${getMoodColor(companion.currentMood)}`}>
                                {companion.currentMood}
                              </span>
                              {companion.needsAttention && (
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded animate-pulse">
                                  Braucht Aufmerksamkeit!
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Companion Details */}
            {selectedCompanion && (
              <div className="lg:col-span-2">
                <CompanionDetails 
                  companion={selectedCompanion}
                  userEnergy={userEnergy}
                  onAction={performAction}
                />
              </div>
            )}
          </div>
        )}

        {/* Create New Companion Modal */}
        <AnimatePresence>
          {showCreateNew && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowCreateNew(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Neuen Begleiter erschaffen</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Wähle einen Typ:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['plant', 'pet', 'planet'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setNewCompanionType(type)}
                          className={`p-4 rounded-lg border-2 transition-all text-center ${
                            newCompanionType === type
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-2">{getCompanionTypeIcon(type)}</div>
                          <div className="text-sm font-medium capitalize">
                            {type === 'plant' ? 'Pflanze' : 
                             type === 'pet' ? 'Haustier' : 'Planet'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gib deinem Begleiter einen Namen:
                    </label>
                    <input
                      type="text"
                      value={newCompanionName}
                      onChange={(e) => setNewCompanionName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="z.B. Luna, Sunny, Terra..."
                      maxLength={20}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowCreateNew(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={createCompanion}
                      disabled={!newCompanionName.trim()}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Erschaffen
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Companion Details Component
const CompanionDetails: React.FC<{
  companion: VirtualCompanion;
  userEnergy: number;
  onAction: (actionId: string) => void;
}> = ({ companion, userEnergy, onAction }) => {
  const evolution = getEvolutionStage(companion.type, companion.level);
  const expNeeded = getExperienceNeededForLevel(companion.level + 1);
  const expProgress = (companion.experience % expNeeded) / expNeeded * 100;

  const availableActions = evolution.unlockedActions
    .map(actionId => companionActions[actionId])
    .filter(Boolean);

  const daysSinceCreation = Math.floor(
    (Date.now() - new Date(companion.birthDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Companion Display */}
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 text-center">
        <motion.div 
          className="text-8xl mb-4"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {evolution.appearance}
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{companion.name}</h2>
        <p className="text-gray-600 mb-4">{evolution.description}</p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="bg-white/70 px-3 py-1 rounded-full">
            Level {companion.level}
          </span>
          <span className="bg-white/70 px-3 py-1 rounded-full">
            {daysSinceCreation} Tage alt
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Gesundheit</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${companion.health}%` }}
              ></div>
            </div>
            <div className="text-sm font-medium">{companion.health}/100</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Glück</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
              <div 
                className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${companion.happiness}%` }}
              ></div>
            </div>
            <div className="text-sm font-medium">{companion.happiness}/100</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Erfahrung</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${expProgress}%` }}
              ></div>
            </div>
            <div className="text-sm font-medium">{Math.floor(expProgress)}%</div>
          </div>
        </div>

        {/* Current Mood */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">
              {companion.currentMood === 'überglücklich' ? '😄' :
               companion.currentMood === 'fröhlich' ? '😊' :
               companion.currentMood === 'zufrieden' ? '😌' :
               companion.currentMood === 'neutral' ? '😐' :
               companion.currentMood === 'traurig' ? '😢' :
               companion.currentMood === 'krank' ? '🤒' :
               companion.currentMood === 'verlassen' ? '😔' : '😐'}
            </div>
            <div>
              <div className="font-medium text-gray-900">
                Aktuelle Stimmung: <span className={getMoodColor(companion.currentMood)}>{companion.currentMood}</span>
              </div>
              <div className="text-sm text-gray-600">
                {evolution.specialAbilities.length > 0 && (
                  <>Besondere Fähigkeiten: {evolution.specialAbilities.join(', ')}</>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Verfügbare Aktionen</h3>
          <div className="grid grid-cols-2 gap-3">
            {availableActions.map((action) => {
              const canAfford = userEnergy >= action.energyCost;
              
              return (
                <button
                  key={action.id}
                  onClick={() => canAfford && onAction(action.id)}
                  disabled={!canAfford}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    canAfford
                      ? 'border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100'
                      : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="font-medium text-gray-900 mb-1">{action.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{action.description}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-600">Energie: {action.energyCost}</span>
                    <span className="text-gray-500">
                      {action.cooldown >= 60 ? `${action.cooldown/60}h` : `${action.cooldown}min`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        {companion.achievements.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Errungenschaften</h3>
            <div className="flex flex-wrap gap-2">
              {companion.achievements.map((achievement, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                >
                  <StarIcon className="w-3 h-3" />
                  <span>{achievement}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getMoodColor = (mood: string) => {
  switch (mood) {
    case 'überglücklich': return 'text-green-600';
    case 'fröhlich': return 'text-green-500';
    case 'zufrieden': return 'text-blue-500';
    case 'neutral': return 'text-gray-500';
    case 'traurig': return 'text-yellow-600';
    case 'krank': return 'text-red-600';
    case 'verlassen': return 'text-red-700';
    default: return 'text-gray-500';
  }
};

export default CompanionCarePage;
