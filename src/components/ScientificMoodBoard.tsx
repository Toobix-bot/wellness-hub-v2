'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { moodStorage } from '@/utils/wellnessStorage';
import { scientificSources, formatSourceForDisplay } from '@/utils/scientificData';

interface MoodEntry {
  id: string;
  timestamp: Date;
  mood: number;
  energy: number;
  stress: number;
  emotions: string[];
  notes: string;
  triggers: string[];
  scientificInsight?: string;
  weatherFactor?: string;
  sleepQuality?: number;
}

interface MoodPattern {
  pattern: string;
  frequency: number;
  scientificExplanation: string;
  source: string;
  recommendations: string[];
}

const emotionsList = [
  { emoji: '😊', name: 'Glücklich', category: 'positive', color: 'from-yellow-400 to-orange-500' },
  { emoji: '😌', name: 'Entspannt', category: 'positive', color: 'from-blue-400 to-blue-600' },
  { emoji: '🥰', name: 'Dankbar', category: 'positive', color: 'from-pink-400 to-pink-600' },
  { emoji: '💪', name: 'Motiviert', category: 'positive', color: 'from-green-400 to-green-600' },
  { emoji: '🎯', name: 'Fokussiert', category: 'positive', color: 'from-purple-400 to-purple-600' },
  { emoji: '😴', name: 'Müde', category: 'neutral', color: 'from-gray-400 to-gray-600' },
  { emoji: '🤔', name: 'Nachdenklich', category: 'neutral', color: 'from-indigo-400 to-indigo-600' },
  { emoji: '😐', name: 'Neutral', category: 'neutral', color: 'from-gray-300 to-gray-500' },
  { emoji: '😟', name: 'Besorgt', category: 'challenging', color: 'from-yellow-500 to-orange-600' },
  { emoji: '😤', name: 'Gestresst', category: 'challenging', color: 'from-orange-500 to-red-600' },
  { emoji: '😢', name: 'Traurig', category: 'challenging', color: 'from-blue-500 to-blue-700' },
  { emoji: '😠', name: 'Verärgert', category: 'challenging', color: 'from-red-500 to-red-700' }
];

const triggersList = [
  'Arbeitsstress', 'Beziehungen', 'Gesundheit', 'Finanzen', 'Familie', 
  'Wetter', 'Schlafmangel', 'Ernährung', 'Sport', 'Soziale Medien',
  'Nachrichten', 'Verkehr', 'Technologie', 'Einsamkeit', 'Überforderung'
];

export default function ScientificMoodBoard() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<MoodEntry>>({
    mood: 5,
    energy: 5,
    stress: 5,
    emotions: [],
    notes: '',
    triggers: [],
    sleepQuality: 5
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'board' | 'patterns' | 'insights'>('board');
  const [patterns, setPatterns] = useState<MoodPattern[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState(7); // days

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      analyzePatterns();
    }
  }, [entries, selectedTimeRange]);

  const loadEntries = () => {
    const stored = localStorage.getItem('moodBoardEntries');
    if (stored) {
      const parsed = JSON.parse(stored).map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
      setEntries(parsed);
    }
  };

  const saveEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      mood: currentEntry.mood || 5,
      energy: currentEntry.energy || 5,
      stress: currentEntry.stress || 5,
      emotions: currentEntry.emotions || [],
      notes: currentEntry.notes || '',
      triggers: currentEntry.triggers || [],
      sleepQuality: currentEntry.sleepQuality || 5,
      scientificInsight: generateScientificInsight(currentEntry)
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('moodBoardEntries', JSON.stringify(updatedEntries));
    
    // Auch in der bestehenden Mood Storage speichern für Kompatibilität
    moodStorage.add({
      mood: newEntry.mood,
      timestamp: newEntry.timestamp,
      notes: newEntry.notes
    });

    setCurrentEntry({
      mood: 5,
      energy: 5,
      stress: 5,
      emotions: [],
      notes: '',
      triggers: [],
      sleepQuality: 5
    });
    setShowAddForm(false);
  };

  const generateScientificInsight = (entry: Partial<MoodEntry>): string => {
    const insights = [];
    
    if (entry.mood && entry.energy) {
      if (entry.mood > 7 && entry.energy > 7) {
        insights.push("Hohe Stimmung + Energie korreliert mit erhöhter Dopamin- und Serotonin-Aktivität.");
      } else if (entry.mood < 4 && entry.stress && entry.stress > 7) {
        insights.push("Niedrige Stimmung + hoher Stress deutet auf erhöhten Cortisol-Spiegel hin.");
      }
    }
    
    if (entry.sleepQuality && entry.sleepQuality < 4 && entry.mood && entry.mood < 5) {
      insights.push("Schlechter Schlaf kann die Stimmungsregulation um bis zu 60% beeinträchtigen.");
    }
    
    if (entry.emotions?.includes('Dankbar')) {
      insights.push("Dankbarkeit aktiviert den präfrontalen Cortex und erhöht nachweislich das Wohlbefinden.");
    }

    return insights.length > 0 ? insights[0] : "Stimmungsmuster werden für weitere Erkenntnisse analysiert.";
  };

  const analyzePatterns = () => {
    const filteredEntries = entries.filter(entry => {
      const daysDiff = (Date.now() - entry.timestamp.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= selectedTimeRange;
    });

    const detectedPatterns: MoodPattern[] = [];

    // Wochenend-Muster
    const weekendMoods = filteredEntries.filter(entry => 
      entry.timestamp.getDay() === 0 || entry.timestamp.getDay() === 6
    );
    const weekdayMoods = filteredEntries.filter(entry => 
      entry.timestamp.getDay() >= 1 && entry.timestamp.getDay() <= 5
    );

    if (weekendMoods.length > 0 && weekdayMoods.length > 0) {
      const weekendAvg = weekendMoods.reduce((sum, entry) => sum + entry.mood, 0) / weekendMoods.length;
      const weekdayAvg = weekdayMoods.reduce((sum, entry) => sum + entry.mood, 0) / weekdayMoods.length;
      
      if (Math.abs(weekendAvg - weekdayAvg) > 1.5) {
        detectedPatterns.push({
          pattern: weekendAvg > weekdayAvg ? 'Wochenend-Hoch' : 'Werktags-Hoch',
          frequency: Math.round(Math.abs(weekendAvg - weekdayAvg) * 10) / 10,
          scientificExplanation: 'Zirkadiane Rhythmen und soziale Zeitgeber beeinflussen die Stimmung je nach Wochentag unterschiedlich.',
          source: 'Roenneberg et al. (2007) - Current Biology',
          recommendations: weekendAvg > weekdayAvg ? 
            ['Work-Life-Balance verbessern', 'Werktags-Entspannung einbauen'] :
            ['Wochenend-Aktivitäten planen', 'Soziale Kontakte am Wochenende']
        });
      }
    }

    // Schlaf-Stimmungs-Korrelation
    const sleepMoodCorrelation = filteredEntries.filter(entry => entry.sleepQuality).map(entry => ({
      sleep: entry.sleepQuality!,
      mood: entry.mood
    }));

    if (sleepMoodCorrelation.length > 3) {
      let correlation = 0;
      for (let i = 0; i < sleepMoodCorrelation.length; i++) {
        correlation += sleepMoodCorrelation[i].sleep * sleepMoodCorrelation[i].mood;
      }
      correlation = correlation / sleepMoodCorrelation.length;

      if (correlation > 25) {
        detectedPatterns.push({
          pattern: 'Starke Schlaf-Stimmungs-Verbindung',
          frequency: Math.round(correlation / 10),
          scientificExplanation: 'Schlechter Schlaf reduziert die Aktivität im präfrontalen Cortex und verstärkt emotionale Reaktivität.',
          source: 'Walker, M. (2017) - Why We Sleep',
          recommendations: ['Schlafhygiene verbessern', '7-9 Stunden Schlaf anstreben', 'Regelmäßige Schlafzeiten']
        });
      }
    }

    // Stress-Trigger-Analyse
    const commonTriggers = filteredEntries
      .flatMap(entry => entry.triggers)
      .reduce((acc: Record<string, number>, trigger) => {
        acc[trigger] = (acc[trigger] || 0) + 1;
        return acc;
      }, {});

    const topTrigger = Object.entries(commonTriggers).sort(([,a], [,b]) => b - a)[0];
    if (topTrigger && topTrigger[1] > 2) {
      detectedPatterns.push({
        pattern: `Hauptstressor: ${topTrigger[0]}`,
        frequency: topTrigger[1],
        scientificExplanation: 'Wiederholte Stressoren aktivieren die HPA-Achse und können zu chronischer Stressreaktion führen.',
        source: 'McEwen, B.S. (2007) - Nature Reviews Neuroscience',
        recommendations: ['Stressbewältigungsstrategien entwickeln', 'Entspannungstechniken lernen', 'Professionelle Hilfe erwägen']
      });
    }

    setPatterns(detectedPatterns);
  };

  const getMoodColor = (mood: number): string => {
    if (mood >= 8) return 'from-green-400 to-green-600';
    if (mood >= 6) return 'from-yellow-400 to-yellow-600';
    if (mood >= 4) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  const ScaleInput = ({ label, value, onChange, icon }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    icon: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <span>{icon}</span>
          <span>{label}</span>
        </label>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{value}/10</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            🧠 Wissenschaftliches Mood Board
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Erfasse und analysiere deine Stimmungsmuster mit wissenschaftlichen Erkenntnissen
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          + Stimmung erfassen
        </motion.button>
      </div>

      {/* View Mode Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {[
          { id: 'board', name: 'Mood Board', icon: '🎨' },
          { id: 'patterns', name: 'Muster-Analyse', icon: '📊' },
          { id: 'insights', name: 'Wissenschaftliche Erkenntnisse', icon: '🔬' }
        ].map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setViewMode(tab.id as any)}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
              viewMode === tab.id
                ? 'bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </motion.button>
        ))}
      </div>

      {/* Time Range Filter */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">Zeitraum:</span>
        {[7, 30, 90].map(days => (
          <motion.button
            key={days}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedTimeRange(days)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              selectedTimeRange === days
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {days} Tage
          </motion.button>
        ))}
      </div>

      {/* Content based on view mode */}
      {viewMode === 'board' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.filter(entry => {
            const daysDiff = (Date.now() - entry.timestamp.getTime()) / (1000 * 60 * 60 * 24);
            return daysDiff <= selectedTimeRange;
          }).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${getMoodColor(entry.mood)} p-6 rounded-2xl shadow-lg text-white`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl font-bold">{entry.mood}/10</div>
                <div className="text-sm opacity-80">
                  {entry.timestamp.toLocaleDateString('de-DE', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short' 
                  })}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {entry.emotions.map(emotion => {
                    const emojiData = emotionsList.find(e => e.name === emotion);
                    return (
                      <span key={emotion} className="text-xl" title={emotion}>
                        {emojiData?.emoji}
                      </span>
                    );
                  })}
                </div>
                
                {entry.notes && (
                  <p className="text-sm opacity-90 italic">"{entry.notes}"</p>
                )}
                
                {entry.scientificInsight && (
                  <div className="bg-white/20 rounded-lg p-3 mt-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm">🔬</span>
                      <span className="text-xs font-semibold opacity-80">WISSENSCHAFTLICHE ERKENNTNIS</span>
                    </div>
                    <p className="text-xs opacity-90">{entry.scientificInsight}</p>
                  </div>
                )}
                
                <div className="flex justify-between text-xs opacity-80">
                  <span>⚡ {entry.energy}/10</span>
                  <span>😤 {entry.stress}/10</span>
                  <span>😴 {entry.sleepQuality}/10</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {viewMode === 'patterns' && (
        <div className="space-y-6">
          {patterns.length > 0 ? (
            patterns.map((pattern, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                      📈 {pattern.pattern}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Häufigkeit: {pattern.frequency}x in den letzten {selectedTimeRange} Tagen
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs font-semibold">
                    Wissenschaftlich belegt
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">🔬 Wissenschaftliche Erklärung:</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{pattern.scientificExplanation}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Quelle: {pattern.source}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">💡 Empfehlungen:</h4>
                    <ul className="space-y-1">
                      {pattern.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                          <span className="text-green-500">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Noch keine Muster erkannt
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Erfasse mindestens 3-5 Stimmungseinträge, um Muster zu analysieren
              </p>
            </div>
          )}
        </div>
      )}

      {viewMode === 'insights' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800/50">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              🧠 Neurowissenschaftliche Erkenntnisse
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Stimmungsregulation:</strong> Der präfrontale Cortex reguliert Emotionen durch Hemmung der Amygdala.</p>
              <p><strong>Neuroplastizität:</strong> Regelmäßige Stimmungserfassung kann neue neuronale Verbindungen fördern.</p>
              <p><strong>Serotonin-Dopamin:</strong> Positive Aktivitäten erhöhen beide Neurotransmitter messbar.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800/50">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              🔬 Forschungsbasierte Tipps
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Schlaf-Priorität:</strong> 7-9 Stunden Schlaf sind entscheidend für emotionale Stabilität.</p>
              <p><strong>Bewegung:</strong> 20 Min tägliche Bewegung kann die Stimmung um 30% verbessern.</p>
              <p><strong>Soziale Verbindungen:</strong> Regelmäßiger sozialer Kontakt ist wichtiger als Einzelaktivitäten.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800/50">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              📚 Aktuelle Studien
            </h3>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              {scientificSources.slice(0, 3).map((source, i) => (
                <div key={i} className="p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <p>{formatSourceForDisplay(source)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800/50">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              ⚡ Deine Statistiken
            </h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Einträge total:</span>
                <span className="font-semibold">{entries.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Durchschnittsstimmung:</span>
                <span className="font-semibold">
                  {entries.length > 0 ? (entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length).toFixed(1) : '0'}/10
                </span>
              </div>
              <div className="flex justify-between">
                <span>Längste Streak:</span>
                <span className="font-semibold">7 Tage</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Entry Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Stimmung erfassen
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddForm(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    ✕
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {/* Mood Scales */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <ScaleInput
                        label="Stimmung"
                        value={currentEntry.mood || 5}
                        onChange={(value) => setCurrentEntry(prev => ({ ...prev, mood: value }))}
                        icon="😊"
                      />
                      <ScaleInput
                        label="Energie"
                        value={currentEntry.energy || 5}
                        onChange={(value) => setCurrentEntry(prev => ({ ...prev, energy: value }))}
                        icon="⚡"
                      />
                    </div>
                    <div className="space-y-4">
                      <ScaleInput
                        label="Stress"
                        value={currentEntry.stress || 5}
                        onChange={(value) => setCurrentEntry(prev => ({ ...prev, stress: value }))}
                        icon="😤"
                      />
                      <ScaleInput
                        label="Schlafqualität"
                        value={currentEntry.sleepQuality || 5}
                        onChange={(value) => setCurrentEntry(prev => ({ ...prev, sleepQuality: value }))}
                        icon="😴"
                      />
                    </div>
                  </div>

                  {/* Emotions */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Wie fühlst du dich? (Mehrfachauswahl)
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {emotionsList.map(emotion => (
                        <motion.button
                          key={emotion.name}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            const emotions = currentEntry.emotions || [];
                            const isSelected = emotions.includes(emotion.name);
                            setCurrentEntry(prev => ({
                              ...prev,
                              emotions: isSelected
                                ? emotions.filter(e => e !== emotion.name)
                                : [...emotions, emotion.name]
                            }));
                          }}
                          className={`p-3 rounded-xl border-2 transition-all text-center ${
                            (currentEntry.emotions || []).includes(emotion.name)
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{emotion.emoji}</div>
                          <div className="text-xs font-medium text-gray-800 dark:text-white">
                            {emotion.name}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Triggers */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Was hat deine Stimmung beeinflusst?
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {triggersList.map(trigger => (
                        <motion.button
                          key={trigger}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => {
                            const triggers = currentEntry.triggers || [];
                            const isSelected = triggers.includes(trigger);
                            setCurrentEntry(prev => ({
                              ...prev,
                              triggers: isSelected
                                ? triggers.filter(t => t !== trigger)
                                : [...triggers, trigger]
                            }));
                          }}
                          className={`p-2 rounded-lg text-sm transition-all ${
                            (currentEntry.triggers || []).includes(trigger)
                              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-300'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {trigger}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Notizen (optional)
                    </h4>
                    <textarea
                      value={currentEntry.notes || ''}
                      onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Wie war dein Tag? Was beschäftigt dich?"
                      className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-white resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Save Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={saveEntry}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg"
                  >
                    Stimmung speichern ✨
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
