'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  UserIcon,
  SparklesIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  HeartIcon,
  BoltIcon,
  PaintBrushIcon,
  ScaleIcon,
  UserGroupIcon,
  StarIcon,
  TrophyIcon,
  FireIcon,
  GiftIcon,
  ChevronRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { 
  WellnessCharacter, 
  CharacterClass, 
  CharacterAttributes, 
  HealthStats 
} from '@/types/gamification';

interface CharacterCreatorProps {}

const CharacterCreator: React.FC<CharacterCreatorProps> = () => {
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState<Partial<WellnessCharacter>>({
    name: '',
    avatar: '🧘‍♀️',
    class: 'mindful-monk',
    level: 1,
    experience: 0,
    health: {
      mental: 50,
      emotional: 50,
      physical: 50,
      spiritual: 50,
      social: 50,
      creative: 50
    },
    attributes: {
      mindfulness: 10,
      compassion: 10,
      resilience: 10,
      wisdom: 10,
      courage: 10,
      gratitude: 10,
      creativity: 10,
      discipline: 10
    },
    skills: [],
    equipment: [],
    quests: [],
    achievements: [],
    relationships: [],
    backstory: ''
  });

  const characterClasses: Array<{
    id: CharacterClass;
    name: string;
    description: string;
    avatar: string;
    color: string;
    primaryAttributes: (keyof CharacterAttributes)[];
    startingBonus: string;
    playstyle: string;
  }> = [
    {
      id: 'mindful-monk',
      name: 'Achtsamer Mönch',
      description: 'Spezialist für Meditation und innere Ruhe',
      avatar: '🧘‍♀️',
      color: 'from-blue-500 to-cyan-600',
      primaryAttributes: ['mindfulness', 'wisdom', 'discipline'],
      startingBonus: '+20 Meditation Erfahrung',
      playstyle: 'Ruhig, reflektiert, fokussiert auf innere Entwicklung'
    },
    {
      id: 'heart-healer',
      name: 'Herz-Heiler',
      description: 'Experte für emotionale Heilung und Selbstliebe',
      avatar: '💖',
      color: 'from-pink-500 to-rose-600',
      primaryAttributes: ['compassion', 'gratitude', 'resilience'],
      startingBonus: '+20 Emotionale Heilung Erfahrung',
      playstyle: 'Empathisch, heilend, fokussiert auf Selbstliebe'
    },
    {
      id: 'joy-warrior',
      name: 'Freude-Krieger',
      description: 'Kämpfer gegen negative Gedanken mit positivem Denken',
      avatar: '⚔️',
      color: 'from-yellow-500 to-orange-600',
      primaryAttributes: ['courage', 'resilience', 'gratitude'],
      startingBonus: '+20 Motivations-Boost',
      playstyle: 'Energisch, motivierend, bekämpft Negativität aktiv'
    },
    {
      id: 'wise-scholar',
      name: 'Weiser Gelehrter',
      description: 'Sammler von Wissen und Selbstreflexions-Experte',
      avatar: '📚',
      color: 'from-indigo-500 to-purple-600',
      primaryAttributes: ['wisdom', 'mindfulness', 'discipline'],
      startingBonus: '+20 Lern-Effizienz',
      playstyle: 'Analytisch, wissbegierig, reflektiert über Erfahrungen'
    },
    {
      id: 'nature-guardian',
      name: 'Natur-Hüter',
      description: 'Verbunden mit der Natur und Nachhaltigkeit',
      avatar: '🌿',
      color: 'from-green-500 to-emerald-600',
      primaryAttributes: ['mindfulness', 'gratitude', 'wisdom'],
      startingBonus: '+20 Natur-Verbindung',
      playstyle: 'Erdverbunden, nachhaltig, findet Kraft in der Natur'
    },
    {
      id: 'social-connector',
      name: 'Sozialer Verbinder',
      description: 'Experte für Beziehungen und Community-Building',
      avatar: '🤝',
      color: 'from-blue-500 to-teal-600',
      primaryAttributes: ['compassion', 'gratitude', 'courage'],
      startingBonus: '+20 Soziale Interaktion',
      playstyle: 'Kommunikativ, hilfsbereit, baut starke Beziehungen auf'
    },
    {
      id: 'creative-artist',
      name: 'Kreativer Künstler',
      description: 'Nutzt Kreativität als Weg zur Selbstentfaltung',
      avatar: '🎨',
      color: 'from-purple-500 to-pink-600',
      primaryAttributes: ['creativity', 'courage', 'mindfulness'],
      startingBonus: '+20 Kreative Projekte',
      playstyle: 'Expressiv, innovativ, findet Heilung durch Kunst'
    },
    {
      id: 'balance-master',
      name: 'Balance-Meister',
      description: 'Experte für Work-Life-Balance und Harmonie',
      avatar: '⚖️',
      color: 'from-gray-500 to-slate-600',
      primaryAttributes: ['discipline', 'wisdom', 'resilience'],
      startingBonus: '+20 Balance-Effizienz',
      playstyle: 'Ausgeglichen, organisiert, optimiert alle Lebensbereiche'
    }
  ];

  const avatarOptions = [
    '🧘‍♀️', '🧘‍♂️', '💖', '⚔️', '📚', '🌿', '🤝', '🎨', '⚖️',
    '🦋', '🌟', '🔥', '🌊', '🏔️', '🌸', '🎭', '🦅', '🐺',
    '👑', '🎯', '💎', '🌙', '☀️', '⚡', '🌈', '🦄', '🐉'
  ];

  const steps = [
    { number: 1, title: 'Name & Avatar', description: 'Wähle deinen Namen und Avatar' },
    { number: 2, title: 'Charakter-Klasse', description: 'Bestimme deinen Wellness-Pfad' },
    { number: 3, title: 'Attribute', description: 'Verteile deine Startpunkte' },
    { number: 4, title: 'Hintergrund', description: 'Erzähle deine Geschichte' },
    { number: 5, title: 'Fertigstellung', description: 'Bestätige deinen Charakter' }
  ];

  const totalAttributePoints = 80;
  const getUsedPoints = () => {
    if (!character.attributes) return 0;
    return Object.values(character.attributes).reduce((sum, val) => sum + val, 0);
  };

  const updateAttribute = (attr: keyof CharacterAttributes, value: number) => {
    if (!character.attributes) return;
    
    const currentUsed = getUsedPoints();
    const currentValue = character.attributes[attr];
    const difference = value - currentValue;
    
    if (currentUsed + difference <= totalAttributePoints && value >= 1 && value <= 20) {
      setCharacter(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes!,
          [attr]: value
        }
      }));
    }
  };
  const saveCharacter = () => {
    const completeCharacter: WellnessCharacter = {
      ...character as WellnessCharacter,
      id: `char-${Date.now()}`,
      createdAt: new Date(),
      lastActive: new Date()
    };

    const existingCharacters = JSON.parse(
      localStorage.getItem('wellness-characters') || '[]'
    );
    
    existingCharacters.push(completeCharacter);
    localStorage.setItem('wellness-characters', JSON.stringify(existingCharacters));
    
    // Navigate to character dashboard
    window.location.href = '/gamification';
  };

  const getSelectedClass = () => {
    return characterClasses.find(c => c.id === character.class);
  };

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
                🎮 Wellness-Charakter erstellen
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Erschaffe deinen persönlichen Wellness-Avatar
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex items-center space-x-3 ${
                  step >= stepItem.number ? 'text-purple-600' : 'text-gray-400'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step >= stepItem.number 
                      ? 'border-purple-600 bg-purple-100 dark:bg-purple-900' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {step > stepItem.number ? (
                      <CheckCircleIcon className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{stepItem.number}</span>
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className="font-medium">{stepItem.title}</div>
                    <div className="text-xs text-gray-500">{stepItem.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Name & Avatar */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Name & Avatar wählen
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Charaktername
                  </label>
                  <input
                    type="text"
                    value={character.name}
                    onChange={(e) => setCharacter(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Gib deinem Charakter einen Namen..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Avatar Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Avatar auswählen
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar}
                        onClick={() => setCharacter(prev => ({ ...prev, avatar }))}
                        className={`w-12 h-12 rounded-lg text-2xl flex items-center justify-center transition-all ${
                          character.avatar === avatar
                            ? 'bg-purple-100 dark:bg-purple-900 ring-2 ring-purple-500'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-800'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Vorschau</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{character.avatar}</div>
                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {character.name || 'Unbenannter Charakter'}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Level 1 Wellness-Abenteurer</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setStep(2)}
                  disabled={!character.name?.trim()}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Weiter zu Charakter-Klasse
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Character Class */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Wähle deine Charakter-Klasse
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {characterClasses.map((charClass) => (
                  <motion.div
                    key={charClass.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCharacter(prev => ({ ...prev, class: charClass.id }))}
                    className={`cursor-pointer rounded-2xl overflow-hidden transition-all ${
                      character.class === charClass.id
                        ? 'ring-4 ring-purple-500 shadow-xl'
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <div className={`h-32 bg-gradient-to-br ${charClass.color} flex items-center justify-center`}>
                      <div className="text-6xl">{charClass.avatar}</div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {charClass.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {charClass.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                          {charClass.startingBonus}
                        </div>
                        <div className="text-xs text-gray-500">
                          Primär: {charClass.primaryAttributes.join(', ')}
                        </div>
                        <div className="text-xs text-gray-500 italic">
                          {charClass.playstyle}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Weiter zu Attributen
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Attributes */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Attribute verteilen
              </h2>
              
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {totalAttributePoints - getUsedPoints()} / {totalAttributePoints}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Verfügbare Punkte
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(character.attributes || {}).map(([attr, value]) => {
                  const isPrimary = getSelectedClass()?.primaryAttributes.includes(attr as keyof CharacterAttributes);
                  return (
                    <div key={attr} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className={`font-medium ${
                          isPrimary 
                            ? 'text-purple-600 dark:text-purple-400' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {attr.charAt(0).toUpperCase() + attr.slice(1).replace(/[A-Z]/g, ' $&')}
                          {isPrimary && <span className="text-xs ml-1">(Primär)</span>}
                        </label>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {value}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateAttribute(attr as keyof CharacterAttributes, Math.max(1, value - 1))}
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500"
                        >
                          -
                        </button>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={value}
                          onChange={(e) => updateAttribute(attr as keyof CharacterAttributes, Number(e.target.value))}
                          className="flex-1"
                        />
                        <button
                          onClick={() => updateAttribute(attr as keyof CharacterAttributes, Math.min(20, value + 1))}
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={getUsedPoints() !== totalAttributePoints}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Weiter zu Hintergrund
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Backstory */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Erzähle deine Geschichte
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Hintergrundgeschichte (optional)
                  </label>
                  <textarea
                    value={character.backstory}
                    onChange={(e) => setCharacter(prev => ({ ...prev, backstory: e.target.value }))}
                    placeholder="Was hat dich auf diese Wellness-Reise gebracht? Was ist deine Motivation? Was möchtest du erreichen?"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setCharacter(prev => ({ 
                      ...prev, 
                      backstory: "Ich suche nach innerer Ruhe und möchte lernen, mit Stress besser umzugehen. Meditation und Achtsamkeit sind meine Werkzeuge für ein ausgeglicheneres Leben." 
                    }))}
                    className="p-4 text-left bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors"
                  >
                    <div className="font-medium text-purple-600 mb-2">🧘‍♀️ Suchender</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Fokus auf innere Ruhe und Stressabbau
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setCharacter(prev => ({ 
                      ...prev, 
                      backstory: "Nach schwierigen Zeiten möchte ich meine emotionalen Wunden heilen und wieder Freude am Leben finden. Selbstliebe und Heilung stehen im Mittelpunkt." 
                    }))}
                    className="p-4 text-left bg-pink-50 dark:bg-pink-900 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-800 transition-colors"
                  >
                    <div className="font-medium text-pink-600 mb-2">💖 Heilender</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Fokus auf emotionale Heilung und Selbstliebe
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setCharacter(prev => ({ 
                      ...prev, 
                      backstory: "Ich möchte meine Ziele erreichen und mein volles Potenzial entfalten. Mit Motivation und positiver Einstellung verwandle ich Träume in Realität." 
                    }))}
                    className="p-4 text-left bg-yellow-50 dark:bg-yellow-900 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors"
                  >
                    <div className="font-medium text-yellow-600 mb-2">⚔️ Eroberer</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Fokus auf Ziele und Potenzialentfaltung
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Zur Fertigstellung
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Final Review */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Charakter bestätigen
              </h2>
              
              <div className="space-y-6">
                {/* Character Preview */}
                <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 rounded-lg">
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="text-6xl">{character.avatar}</div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {character.name}
                      </div>
                      <div className="text-lg text-purple-600">
                        {getSelectedClass()?.name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        Level 1 • 0 XP
                      </div>
                    </div>
                  </div>

                  {/* Attributes Preview */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {Object.entries(character.attributes || {}).map(([attr, value]) => (
                      <div key={attr} className="text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {attr.charAt(0).toUpperCase() + attr.slice(1)}
                        </div>
                        <div className="text-xl font-bold text-purple-600">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Backstory */}
                  {character.backstory && (
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hintergrundgeschichte:
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 italic">
                        "{character.backstory}"
                      </div>
                    </div>
                  )}
                </div>

                {/* Starting Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <GiftIcon className="w-5 h-5 text-green-600" />
                      <div className="font-medium text-green-600">Startbonus</div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {getSelectedClass()?.startingBonus}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <StarIcon className="w-5 h-5 text-blue-600" />
                      <div className="font-medium text-blue-600">Spezialität</div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {getSelectedClass()?.primaryAttributes.join(', ')}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrophyIcon className="w-5 h-5 text-purple-600" />
                      <div className="font-medium text-purple-600">Erster Quest</div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Tägliche Wellness-Aktivität
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={saveCharacter}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
                >
                  🎮 Abenteuer beginnen!
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CharacterCreator;
