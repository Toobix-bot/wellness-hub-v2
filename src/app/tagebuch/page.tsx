'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JournalEntry, JournalStats } from '@/types/journal';
import { journalUtils } from '@/utils/journalData';

interface VirtualWorld {
  type: 'garden' | 'forest' | 'ocean' | 'mountains';
  level: number;
  elements: string[];
  weather: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'magical';
}

export default function PrivateJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({
    content: '',
    mood: 5,
    emotions: [],
    tags: [],
    privacy: 'private'
  });
  const [virtualWorld, setVirtualWorld] = useState<VirtualWorld>({
    type: 'garden',
    level: 1,
    elements: ['🌱'],
    weather: 'sunny'
  });
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string[]>([]);
  const [reflectionPrompts, setReflectionPrompts] = useState<string[]>([]);
  const [stats, setStats] = useState<JournalStats | null>(null);

  const emotions = [
    '😊', '😢', '😡', '😰', '🤗', '😴', '🤔', '😍', 
    '🙄', '😌', '🥳', '😓', '🤪', '😎', '🤗', '😭'
  ];

  const emotionLabels: Record<string, string> = {
    '😊': 'glücklich', '😢': 'traurig', '😡': 'wütend', '😰': 'ängstlich',
    '🤗': 'liebevoll', '😴': 'müde', '🤔': 'nachdenklich', '😍': 'verliebt',
    '🙄': 'genervt', '😌': 'entspannt', '🥳': 'aufgeregt', '😓': 'gestresst',
    '🤪': 'albern', '😎': 'selbstbewusst', '😭': 'überwältigt'
  };

  const worldTypes = [
    { id: 'garden', name: 'Magischer Garten', icon: '🌸', color: 'from-green-400 to-emerald-600' },
    { id: 'forest', name: 'Mystischer Wald', icon: '🌲', color: 'from-green-600 to-teal-700' },
    { id: 'ocean', name: 'Endloser Ozean', icon: '🌊', color: 'from-blue-400 to-cyan-600' },
    { id: 'mountains', name: 'Himmlische Berge', icon: '🏔️', color: 'from-purple-500 to-indigo-600' }
  ];

  useEffect(() => {
    loadJournalData();
  }, []);

  useEffect(() => {
    if (currentEntry.mood) {
      const prompts = journalUtils.generateReflectionPrompts(currentEntry.mood);
      setReflectionPrompts(prompts);
    }
  }, [currentEntry.mood]);

  const loadJournalData = () => {
    const savedEntries = localStorage.getItem('journalEntries');
    const savedWorld = localStorage.getItem('virtualWorld');
    
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      setEntries(parsedEntries);
      
      // Berechne Statistiken
      const analysis = journalUtils.analyzeEmotionPatterns(parsedEntries);
      const journalStats: JournalStats = {
        totalEntries: parsedEntries.length,
        streakDays: calculateStreak(parsedEntries),
        averageMood: analysis.averageMood || 5,
        mostUsedEmotions: analysis.mostCommonEmotions.map((e: any) => e.emotion),
        worldGrowthLevel: Math.floor(journalUtils.calculateWorldGrowth(parsedEntries) / 100),
        unlockedElements: calculateUnlockedElements(parsedEntries)
      };
      setStats(journalStats);
      
      // Update Virtual World
      updateVirtualWorld(parsedEntries);
    }
    
    if (savedWorld) {
      setVirtualWorld(JSON.parse(savedWorld));
    }
  };

  const calculateStreak = (entries: JournalEntry[]): number => {
    if (entries.length === 0) return 0;
    
    const today = new Date();
    const sortedEntries = entries
      .map(entry => new Date(entry.date))
      .sort((a, b) => b.getTime() - a.getTime());
    
    let streak = 0;
    let currentDate = today;
    
    for (const entryDate of sortedEntries) {
      const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= 1) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateUnlockedElements = (entries: JournalEntry[]): string[] => {
    const growth = journalUtils.calculateWorldGrowth(entries);
    const elements = ['🌱'];
    
    if (growth > 50) elements.push('🌿');
    if (growth > 150) elements.push('🌸');
    if (growth > 300) elements.push('🦋');
    if (growth > 500) elements.push('🌳');
    if (growth > 800) elements.push('🏠');
    if (growth > 1200) elements.push('🌈');
    if (growth > 1800) elements.push('✨');
    
    return elements;
  };

  const updateVirtualWorld = (entries: JournalEntry[]) => {
    const growth = journalUtils.calculateWorldGrowth(entries);
    const level = Math.floor(growth / 100) + 1;
    const elements = calculateUnlockedElements(entries);
    
    // Bestimme Wetter basierend auf letzter Stimmung
    let weather: VirtualWorld['weather'] = 'sunny';
    if (entries.length > 0) {
      const lastMood = entries[entries.length - 1].mood;
      if (lastMood <= 3) weather = 'stormy';
      else if (lastMood <= 5) weather = 'cloudy';
      else if (lastMood <= 7) weather = 'sunny';
      else weather = 'magical';
    }
    
    const newWorld: VirtualWorld = {
      type: virtualWorld.type,
      level,
      elements,
      weather
    };
    
    setVirtualWorld(newWorld);
    localStorage.setItem('virtualWorld', JSON.stringify(newWorld));
  };

  const saveEntry = () => {
    if (!currentEntry.content || currentEntry.content.trim().length < 10) {
      alert('Bitte schreibe mindestens 10 Zeichen in dein Tagebuch.');
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      title: currentEntry.title || `Eintrag vom ${new Date().toLocaleDateString('de-DE')}`,
      content: currentEntry.content,
      mood: currentEntry.mood || 5,
      emotions: selectedEmotion,
      tags: currentEntry.tags || [],
      privacy: currentEntry.privacy || 'private',
      reflectionPrompts: reflectionPrompts.map(q => ({ question: q, answer: '' })),
      worldImpact: {
        virtualWorld: virtualWorld.type,
        growthPoints: Math.floor(currentEntry.content.length / 10) + (currentEntry.mood || 0),
        elementsUnlocked: []
      }
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    // Reset form
    setCurrentEntry({ content: '', mood: 5, emotions: [], tags: [], privacy: 'private' });
    setSelectedEmotion([]);
    setShowNewEntry(false);
    
    // Update world and stats
    loadJournalData();
  };

  const getWorldBackground = () => {
    const worldType = worldTypes.find(w => w.id === virtualWorld.type);
    return worldType?.color || 'from-green-400 to-emerald-600';
  };

  const getWeatherEffect = () => {
    switch (virtualWorld.weather) {
      case 'rainy': return '🌧️';
      case 'stormy': return '⛈️';
      case 'cloudy': return '☁️';
      case 'magical': return '✨🌟✨';
      default: return '☀️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border-b border-white/20 p-6"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">📔 Mein privates Tagebuch</h1>
            <p className="text-purple-200">Deine Gedanken lassen eine magische Welt wachsen</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewEntry(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-xl text-white font-bold shadow-lg"
          >
            ✍️ Neuer Eintrag
          </motion.button>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-3 gap-8">
        {/* Virtual World Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`lg:col-span-1 bg-gradient-to-br ${getWorldBackground()} rounded-2xl p-6 text-white relative overflow-hidden`}
        >
          <div className="absolute top-4 right-4 text-2xl">
            {getWeatherEffect()}
          </div>
          
          <h3 className="text-2xl font-bold mb-4">
            {worldTypes.find(w => w.id === virtualWorld.type)?.name}
          </h3>
          
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">
              {worldTypes.find(w => w.id === virtualWorld.type)?.icon}
            </div>
            <div className="text-lg">Level {virtualWorld.level}</div>
          </div>
          
          {/* World Elements */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {virtualWorld.elements.map((element, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-3xl text-center p-2 bg-white/20 rounded-lg"
              >
                {element}
              </motion.div>
            ))}
          </div>

          {/* World Type Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Welt ändern:</label>
            <div className="grid grid-cols-2 gap-2">
              {worldTypes.map((world) => (
                <button
                  key={world.id}
                  onClick={() => setVirtualWorld(prev => ({ ...prev, type: world.id as any }))}
                  className={`p-2 rounded-lg text-sm font-medium transition-all ${
                    virtualWorld.type === world.id
                      ? 'bg-white text-gray-800'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {world.icon} {world.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          {stats && (
            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span>Einträge:</span>
                <span className="font-bold">{stats.totalEntries}</span>
              </div>
              <div className="flex justify-between">
                <span>Streak:</span>
                <span className="font-bold">{stats.streakDays} Tage</span>
              </div>
              <div className="flex justify-between">
                <span>⌀ Stimmung:</span>
                <span className="font-bold">{stats.averageMood.toFixed(1)}/10</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Journal Entries */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Entries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4">📖 Letzte Einträge</h3>
            
            {entries.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-purple-200 text-lg">
                  Noch keine Einträge vorhanden. Schreibe deinen ersten Eintrag!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {entries.slice(-5).reverse().map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 p-4 rounded-xl"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white">{entry.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-purple-200">
                          {new Date(entry.date).toLocaleDateString('de-DE')}
                        </span>
                        <div className="flex">
                          {entry.emotions.slice(0, 3).map((emotion, i) => (
                            <span key={i} className="text-lg">{emotion}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-purple-100 text-sm mb-2">
                      {entry.content.substring(0, 150)}
                      {entry.content.length > 150 && '...'}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-purple-300">Stimmung:</span>
                        <div className="flex">
                          {Array.from({ length: 10 }, (_, i) => (
                            <span
                              key={i}
                              className={`text-xs ${
                                i < entry.mood ? 'text-yellow-400' : 'text-gray-600'
                              }`}
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-purple-300">
                        +{entry.worldImpact.growthPoints} Wachstum
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* New Entry Modal */}
      <AnimatePresence>
        {showNewEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewEntry(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-gradient-to-br from-purple-800 to-blue-800 max-w-2xl w-full rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-white mb-6">✍️ Neuer Tagebuch-Eintrag</h2>
              
              {/* Title */}
              <div className="mb-6">
                <label className="block text-purple-200 mb-2">Titel (optional)</label>
                <input
                  type="text"
                  value={currentEntry.title || ''}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-purple-300 border border-white/20 focus:border-white/40 focus:outline-none"
                  placeholder="Wie möchtest du diesen Tag nennen?"
                />
              </div>

              {/* Content */}
              <div className="mb-6">
                <label className="block text-purple-200 mb-2">Deine Gedanken</label>
                <textarea
                  value={currentEntry.content || ''}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full h-32 p-3 rounded-xl bg-white/10 text-white placeholder-purple-300 border border-white/20 focus:border-white/40 focus:outline-none resize-none"
                  placeholder="Was beschäftigt dich heute? Lass deine Gedanken fließen..."
                />
                <div className="text-xs text-purple-300 mt-1">
                  {currentEntry.content?.length || 0} Zeichen (mindestens 10)
                </div>
              </div>

              {/* Mood Slider */}
              <div className="mb-6">
                <label className="block text-purple-200 mb-2">
                  Deine Stimmung: {currentEntry.mood}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentEntry.mood || 5}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, mood: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-purple-300 mt-1">
                  <span>😢 Sehr schlecht</span>
                  <span>😐 Neutral</span>
                  <span>😊 Großartig</span>
                </div>
              </div>

              {/* Emotions */}
              <div className="mb-6">
                <label className="block text-purple-200 mb-2">Emotionen auswählen</label>
                <div className="grid grid-cols-8 gap-2">
                  {emotions.map((emotion) => (
                    <button
                      key={emotion}
                      onClick={() => {
                        setSelectedEmotion(prev => 
                          prev.includes(emotion)
                            ? prev.filter(e => e !== emotion)
                            : [...prev, emotion]
                        );
                      }}
                      className={`text-2xl p-2 rounded-lg transition-all ${
                        selectedEmotion.includes(emotion)
                          ? 'bg-white/30 scale-110'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      title={emotionLabels[emotion]}
                    >
                      {emotion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reflection Prompts */}
              {reflectionPrompts.length > 0 && (
                <div className="mb-6">
                  <label className="block text-purple-200 mb-2">💭 Reflexionsfragen</label>
                  <div className="space-y-2">
                    {reflectionPrompts.map((prompt, index) => (
                      <div key={index} className="bg-white/10 p-3 rounded-lg">
                        <p className="text-purple-100 text-sm mb-2">{prompt}</p>
                        <input
                          type="text"
                          placeholder="Deine Antwort..."
                          className="w-full p-2 rounded bg-white/10 text-white placeholder-purple-300 text-sm border border-white/20 focus:border-white/40 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowNewEntry(false)}
                  className="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-xl font-bold text-white transition-all"
                >
                  Abbrechen
                </button>
                <button
                  onClick={saveEntry}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 py-3 rounded-xl font-bold text-white transition-all"
                >
                  Speichern & Welt wachsen lassen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
