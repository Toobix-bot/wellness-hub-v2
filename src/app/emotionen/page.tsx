'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Emotion {
  id: string;
  name: string;
  category: 'basis' | 'komplex' | 'sozial' | 'self';
  description: string;
  purpose: string;
  triggers: string[];
  physicalSensations: string[];
  thoughts: string[];
  behaviors: string[];
  healthyExpression: string[];
  unhealthyExpression: string[];
  managementStrategies: string[];
  relatedEmotions: string[];
  intensity: number;
  color: string;
  icon: string;
  quotes: string[];
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'einfach' | 'mittel' | 'fortgeschritten';
  steps: string[];
  benefits: string[];
}

interface EmotionLog {
  id: string;
  emotion: string;
  intensity: number;
  trigger: string;
  thoughts: string;
  physicalSensations: string[];
  response: string;
  reflection: string;
  timestamp: string;
  context: string;
  duration: number; // in Minuten
}

interface MoodPattern {
  emotion: string;
  frequency: number;
  averageIntensity: number;
  commonTriggers: string[];
  timePatterns: { [key: string]: number };
}

export default function EmotionserklaerungsSystemPage() {
  const [activeTab, setActiveTab] = useState<'explore' | 'tracker' | 'patterns' | 'exercises'>('explore');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [emotionLogs, setEmotionLogs] = useState<EmotionLog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('alle');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLogForm, setShowLogForm] = useState(false);
  const [newLog, setNewLog] = useState<Partial<EmotionLog>>({
    emotion: '',
    intensity: 5,
    trigger: '',
    thoughts: '',
    physicalSensations: [],
    response: '',
    reflection: '',
    context: '',
    duration: 30
  });

  // Emotionen-Datenbank
  const emotions: Emotion[] = [
    {
      id: '1',
      name: 'Freude',
      category: 'basis',
      description: 'Ein positives Gefühl der Zufriedenheit, des Glücks und der Begeisterung',
      purpose: 'Motiviert uns, positive Erfahrungen zu wiederholen und stärkt soziale Bindungen',
      triggers: ['Erfolg', 'Überraschungen', 'Zeit mit geliebten Menschen', 'Erreichen von Zielen', 'Schöne Erinnerungen'],
      physicalSensations: ['Lächeln', 'Entspannte Muskeln', 'Erhöhte Herzfrequenz', 'Warmes Gefühl in der Brust', 'Energie'],
      thoughts: ['Das ist wunderbar', 'Ich fühle mich lebendig', 'Das Leben ist schön', 'Ich bin dankbar'],
      behaviors: ['Lachen', 'Teilen der Freude', 'Tanzen', 'Singen', 'Umarmungen geben'],
      healthyExpression: ['Freude mit anderen teilen', 'Dankbarkeit ausdrücken', 'Positive Momente bewusst wahrnehmen'],
      unhealthyExpression: ['Manische Episoden', 'Verleugnung negativer Realitäten', 'Oberflächlichkeit'],
      managementStrategies: ['Dankbarkeitstagebuch', 'Positive Erinnerungen sammeln', 'Freude bewusst kultivieren'],
      relatedEmotions: ['Begeisterung', 'Zufriedenheit', 'Liebe', 'Hoffnung'],
      intensity: 7,
      color: 'from-yellow-400 to-orange-500',
      icon: '😊',
      quotes: [
        'Freude ist das einfachste Gebet - Karl Barth',
        'Die Freude liegt im Kampf, im Versuch, im Leiden, nicht im Sieg selbst - Mahatma Gandhi'
      ],
      exercises: [
        {
          id: '1',
          name: 'Freude-Meditation',
          description: 'Eine geführte Meditation, um Freude zu kultivieren',
          duration: '10-15 Minuten',
          difficulty: 'einfach',
          steps: [
            'Setze dich bequem hin und schließe die Augen',
            'Atme tief ein und aus',
            'Denke an ein Moment purer Freude in deinem Leben',
            'Lass das Gefühl durch deinen Körper fließen',
            'Lächle bewusst und spüre die physischen Veränderungen'
          ],
          benefits: ['Erhöht das Wohlbefinden', 'Reduziert Stress', 'Stärkt positive Emotionen']
        }
      ]
    },
    {
      id: '2',
      name: 'Trauer',
      category: 'basis',
      description: 'Ein tiefes Gefühl des Verlustes, der Enttäuschung oder des Schmerzes',
      purpose: 'Hilft bei der Verarbeitung von Verlusten und signalisiert anderen unser Bedürfnis nach Unterstützung',
      triggers: ['Verlust', 'Enttäuschung', 'Trennung', 'Erinnerungen', 'Unerfüllte Erwartungen'],
      physicalSensations: ['Schwere in der Brust', 'Tränen', 'Müdigkeit', 'Kopfschmerzen', 'Verlangsamte Bewegungen'],
      thoughts: ['Es tut so weh', 'Ich vermisse...', 'Es wird nie wieder so sein', 'Warum ich?'],
      behaviors: ['Weinen', 'Rückzug', 'Schweigen', 'Langsame Bewegungen', 'Suche nach Trost'],
      healthyExpression: ['Weinen zulassen', 'Über Gefühle sprechen', 'Trauerrituale', 'Unterstützung suchen'],
      unhealthyExpression: ['Langanhaltende Depression', 'Isolation', 'Selbstschädigung', 'Substanzmissbrauch'],
      managementStrategies: ['Professionelle Hilfe suchen', 'Trauerprozess respektieren', 'Selbstfürsorge praktizieren'],
      relatedEmotions: ['Melancholie', 'Sehnsucht', 'Verlust', 'Schmerz'],
      intensity: 8,
      color: 'from-blue-600 to-indigo-700',
      icon: '😢',
      quotes: [
        'Trauer ist der Preis, den wir für die Liebe zahlen - Königin Elizabeth II',
        'Die Tränen sind die Sprache der Seele - Khalil Gibran'
      ],
      exercises: [
        {
          id: '2',
          name: 'Trauer-Ritual',
          description: 'Ein achtsames Ritual zur Verarbeitung von Trauer',
          duration: '20-30 Minuten',
          difficulty: 'mittel',
          steps: [
            'Schaffe einen ruhigen, sicheren Raum',
            'Zünde eine Kerze an als Symbol der Erinnerung',
            'Lass deine Tränen fließen, ohne sie zu bewerten',
            'Schreibe einen Brief an das, was du verloren hast',
            'Sprich deine Gefühle laut aus oder ins Kissen'
          ],
          benefits: ['Hilft bei der Verarbeitung', 'Reduziert emotionale Blockaden', 'Fördert Heilung']
        }
      ]
    },
    {
      id: '3',
      name: 'Angst',
      category: 'basis',
      description: 'Ein Gefühl der Unsicherheit und Sorge vor möglichen Bedrohungen oder Gefahren',
      purpose: 'Schützt uns vor Gefahren und bereitet uns auf Herausforderungen vor',
      triggers: ['Ungewissheit', 'Bedrohung', 'Neue Situationen', 'Leistungsdruck', 'Gesundheitssorgen'],
      physicalSensations: ['Herzrasen', 'Schwitzen', 'Zittern', 'Atemnot', 'Muskelverspannung', 'Übelkeit'],
      thoughts: ['Was wenn...', 'Ich kann das nicht', 'Es wird schlimm enden', 'Ich bin in Gefahr'],
      behaviors: ['Vermeidung', 'Unruhe', 'Kontrollverhalten', 'Flucht', 'Erstarrung'],
      healthyExpression: ['Ängste benennen', 'Unterstützung suchen', 'Entspannungstechniken anwenden'],
      unhealthyExpression: ['Panikattacken', 'Phobien', 'Zwangsverhalten', 'Soziale Isolation'],
      managementStrategies: ['Atemübungen', 'Progressive Muskelentspannung', 'Kognitive Umstrukturierung', 'Achtsamkeit'],
      relatedEmotions: ['Nervosität', 'Sorge', 'Panik', 'Furcht'],
      intensity: 6,
      color: 'from-red-500 to-orange-600',
      icon: '😰',
      quotes: [
        'Mut ist nicht die Abwesenheit von Angst, sondern die Beurteilung, dass etwas anderes wichtiger ist als die Angst - Ambrose Redmoon',
        'Das einzige, was wir zu fürchten haben, ist die Furcht selbst - Franklin D. Roosevelt'
      ],
      exercises: [
        {
          id: '3',
          name: '4-7-8 Atemtechnik',
          description: 'Eine bewährte Atemtechnik zur Angstreduzierung',
          duration: '5-10 Minuten',
          difficulty: 'einfach',
          steps: [
            'Atme vollständig durch den Mund aus',
            'Schließe den Mund und atme durch die Nase für 4 Sekunden ein',
            'Halte den Atem für 7 Sekunden an',
            'Atme durch den Mund für 8 Sekunden aus',
            'Wiederhole 3-4 Zyklen'
          ],
          benefits: ['Aktiviert das parasympathische Nervensystem', 'Reduziert Angst sofort', 'Verbessert die Kontrolle']
        }
      ]
    },
    {
      id: '4',
      name: 'Wut',
      category: 'basis',
      description: 'Eine intensive Emotion als Reaktion auf Frustration, Ungerechtigkeit oder Bedrohung',
      purpose: 'Mobilisiert Energie zur Verteidigung und zum Schutz unserer Grenzen',
      triggers: ['Ungerechtigkeit', 'Frustration', 'Verletzung', 'Machtlosigkeit', 'Grenzüberschreitung'],
      physicalSensations: ['Erhöhte Herzfrequenz', 'Angespannte Muskeln', 'Hitzegefühl', 'Geballte Fäuste', 'Zähneknirschen'],
      thoughts: ['Das ist nicht fair', 'Wie können sie nur', 'Ich könnte explodieren', 'Sie respektieren mich nicht'],
      behaviors: ['Schreien', 'Schlagen', 'Werfen', 'Sarkasmus', 'Rückzug'],
      healthyExpression: ['Grenzen kommunizieren', 'Energie in Sport umwandeln', 'Assertive Kommunikation'],
      unhealthyExpression: ['Gewalt', 'Zerstörung', 'Verletzende Worte', 'Langanhaltender Groll'],
      managementStrategies: ['Timeout nehmen', 'Körperliche Aktivität', 'Tiefes Atmen', 'Perspektivwechsel'],
      relatedEmotions: ['Frustration', 'Ärger', 'Empörung', 'Verachtung'],
      intensity: 8,
      color: 'from-red-600 to-red-700',
      icon: '😠',
      quotes: [
        'Wut ist ein Wind, der die Lampe des Geistes auslöscht - Robert Green Ingersoll',
        'Für jede Minute, die du wütend bist, verlierst du 60 Sekunden Glück - Ralph Waldo Emerson'
      ],
      exercises: [
        {
          id: '4',
          name: 'Wut-Entladung',
          description: 'Sichere Methoden, um Wut physisch zu entladen',
          duration: '10-15 Minuten',
          difficulty: 'einfach',
          steps: [
            'Finde einen sicheren, privaten Raum',
            'Schlage in ein Kissen oder schreie ins Kissen',
            'Mache schnelle Bewegungen wie Joggen oder Seilspringen',
            'Zerknülle Papier und wirf es in den Mülleimer',
            'Atme tief durch, bis sich die Intensität reduziert'
          ],
          benefits: ['Reduziert körperliche Anspannung', 'Verhindert explosive Ausbrüche', 'Schafft Klarheit']
        }
      ]
    },
    {
      id: '5',
      name: 'Scham',
      category: 'komplex',
      description: 'Ein schmerzhaftes Gefühl der eigenen Minderwertigkeit oder Unzulänglichkeit',
      purpose: 'Reguliert soziales Verhalten und motiviert zur Selbstverbesserung',
      triggers: ['Öffentliche Bloßstellung', 'Moralische Verfehlung', 'Ablehnung', 'Kritik', 'Versagen'],
      physicalSensations: ['Rotes Gesicht', 'Hitzegefühl', 'Zusammengesunkene Haltung', 'Vermeidung von Blickkontakt'],
      thoughts: ['Ich bin schlecht', 'Ich bin ein Versager', 'Alle sehen meine Schwächen', 'Ich bin es nicht wert'],
      behaviors: ['Verstecken', 'Rückzug', 'Perfektionismus', 'Selbstkritik', 'Überkompensation'],
      healthyExpression: ['Vulnerabilität zeigen', 'Um Vergebung bitten', 'Selbstmitgefühl entwickeln'],
      unhealthyExpression: ['Soziale Isolation', 'Selbstverletzung', 'Depression', 'Suchtverhalten'],
      managementStrategies: ['Selbstmitgefühl praktizieren', 'Perfektionismus loslassen', 'Vulnerabilität als Stärke sehen'],
      relatedEmotions: ['Peinlichkeit', 'Reue', 'Schuld', 'Verlegenheit'],
      intensity: 9,
      color: 'from-purple-600 to-purple-800',
      icon: '😳',
      quotes: [
        'Scham korrodiert den Teil von uns, der glaubt, dass wir zur Veränderung fähig sind - Brené Brown',
        'Die Scham ist ein Lügner - Jon Acuff'
      ],
      exercises: [
        {
          id: '5',
          name: 'Selbstmitgefühls-Übung',
          description: 'Eine Übung zur Heilung von Scham durch Selbstmitgefühl',
          duration: '15-20 Minuten',
          difficulty: 'mittel',
          steps: [
            'Erkenne deine Scham ohne Urteil an',
            'Lege eine Hand auf dein Herz',
            'Sage zu dir: "Das ist ein Moment des Leidens"',
            'Erinnere dich: "Leiden ist Teil der menschlichen Erfahrung"',
            'Sage liebevoll: "Möge ich mir Freundlichkeit schenken"'
          ],
          benefits: ['Reduziert Selbstkritik', 'Fördert emotionale Heilung', 'Stärkt Selbstakzeptanz']
        }
      ]
    },
    {
      id: '6',
      name: 'Stolz',
      category: 'komplex',
      description: 'Ein positives Gefühl der Zufriedenheit mit eigenen Leistungen oder Eigenschaften',
      purpose: 'Belohnt Erfolg und motiviert zu weiteren Leistungen',
      triggers: ['Persönliche Erfolge', 'Anerkennung', 'Zielerreichung', 'Überwindung von Hindernissen'],
      physicalSensations: ['Aufrechte Haltung', 'Erhobener Kopf', 'Lächeln', 'Warmes Gefühl in der Brust'],
      thoughts: ['Ich habe es geschafft', 'Ich bin stolz auf mich', 'Das war eine gute Leistung'],
      behaviors: ['Erfolg teilen', 'Selbstbewusste Körperhaltung', 'Lächeln', 'Anderen erzählen'],
      healthyExpression: ['Erfolge anerkennen', 'Bescheidenheit bewahren', 'Andere inspirieren'],
      unhealthyExpression: ['Arroganz', 'Überheblichkeit', 'Geringschätzung anderer', 'Narzissmus'],
      managementStrategies: ['Balance zwischen Selbstvertrauen und Demut', 'Erfolge mit anderen teilen'],
      relatedEmotions: ['Zufriedenheit', 'Selbstvertrauen', 'Triumph', 'Genugtuung'],
      intensity: 6,
      color: 'from-green-500 to-emerald-600',
      icon: '😌',
      quotes: [
        'Sei stolz auf wie weit du gekommen bist, und hab Vertrauen in wie weit du noch gehen kannst',
        'Stolz ist ein persönliches Engagement. Es ist eine Haltung, die die Qualität trennt'
      ],
      exercises: [
        {
          id: '6',
          name: 'Erfolgs-Reflexion',
          description: 'Eine Übung zur bewussten Würdigung eigener Erfolge',
          duration: '10-15 Minuten',
          difficulty: 'einfach',
          steps: [
            'Liste drei aktuelle Erfolge auf, auch kleine',
            'Beschreibe, welche Anstrengungen dazu geführt haben',
            'Spüre das Gefühl des Stolzes bewusst',
            'Teile einen Erfolg mit jemandem, der dir wichtig ist',
            'Plane, wie du diese Energie für neue Ziele nutzen kannst'
          ],
          benefits: ['Stärkt Selbstvertrauen', 'Motiviert zu neuen Zielen', 'Verbessert Selbstwahrnehmung']
        }
      ]
    }
  ];

  // Kategorien
  const categories = [
    { id: 'alle', name: 'Alle Emotionen', icon: '🎭', color: 'from-purple-500 to-pink-600' },
    { id: 'basis', name: 'Basis-Emotionen', icon: '💖', color: 'from-red-500 to-pink-600' },
    { id: 'komplex', name: 'Komplexe Emotionen', icon: '🧠', color: 'from-blue-500 to-indigo-600' },
    { id: 'sozial', name: 'Soziale Emotionen', icon: '👥', color: 'from-green-500 to-teal-600' },
    { id: 'self', name: 'Selbst-Emotionen', icon: '🪞', color: 'from-yellow-500 to-orange-600' }
  ];

  // Local Storage
  useEffect(() => {
    const savedLogs = localStorage.getItem('emotionLogs');
    if (savedLogs) {
      setEmotionLogs(JSON.parse(savedLogs));
    }
  }, []);

  const saveEmotionLog = () => {
    if (!newLog.emotion || !newLog.trigger) return;

    const log: EmotionLog = {
      id: Date.now().toString(),
      emotion: newLog.emotion!,
      intensity: newLog.intensity!,
      trigger: newLog.trigger!,
      thoughts: newLog.thoughts || '',
      physicalSensations: newLog.physicalSensations || [],
      response: newLog.response || '',
      reflection: newLog.reflection || '',
      timestamp: new Date().toISOString(),
      context: newLog.context || '',
      duration: newLog.duration || 30
    };

    const updatedLogs = [...emotionLogs, log];
    setEmotionLogs(updatedLogs);
    localStorage.setItem('emotionLogs', JSON.stringify(updatedLogs));
    
    setNewLog({
      emotion: '',
      intensity: 5,
      trigger: '',
      thoughts: '',
      physicalSensations: [],
      response: '',
      reflection: '',
      context: '',
      duration: 30
    });
    setShowLogForm(false);
  };

  const filteredEmotions = emotions.filter(emotion => {
    const matchesCategory = selectedCategory === 'alle' || emotion.category === selectedCategory;
    const matchesSearch = emotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emotion.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const generateMoodPatterns = (): MoodPattern[] => {
    const emotionGroups = emotionLogs.reduce((acc, log) => {
      if (!acc[log.emotion]) {
        acc[log.emotion] = [];
      }
      acc[log.emotion].push(log);
      return acc;
    }, {} as { [key: string]: EmotionLog[] });

    return Object.entries(emotionGroups).map(([emotion, logs]) => {
      const averageIntensity = logs.reduce((sum, log) => sum + log.intensity, 0) / logs.length;
      const triggers = logs.map(log => log.trigger);
      const commonTriggers = [...new Set(triggers)].slice(0, 3);
      
      return {
        emotion,
        frequency: logs.length,
        averageIntensity: Math.round(averageIntensity * 10) / 10,
        commonTriggers,
        timePatterns: {} // Vereinfacht für diese Implementierung
      };
    }).sort((a, b) => b.frequency - a.frequency);
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'from-gray-500 to-gray-600';
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    if (intensity <= 6) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
    if (intensity <= 8) return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
  };

  const renderExploreTab = () => (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Suche nach Emotionen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Kategorie-Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Emotionen-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredEmotions.map((emotion) => (
            <motion.div
              key={emotion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setSelectedEmotion(emotion)}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{emotion.icon}</span>
                <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(emotion.category)} text-white rounded-full text-sm font-medium`}>
                  {categories.find(c => c.id === emotion.category)?.name}
                </span>
              </div>
              
              <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-3">
                {emotion.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {emotion.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getIntensityColor(emotion.intensity)}`}>
                  Intensität: {emotion.intensity}/10
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {emotion.exercises.length} Übungen
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  const renderTrackerTab = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          📊 Emotions-Tracker
        </h3>
        <button
          onClick={() => setShowLogForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
        >
          Emotion erfassen
        </button>
      </div>

      {/* Emotion Log Form */}
      <AnimatePresence>
        {showLogForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Emotion:
                  </label>
                  <select
                    value={newLog.emotion || ''}
                    onChange={(e) => setNewLog(prev => ({ ...prev, emotion: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Wähle eine Emotion...</option>
                    {emotions.map(emotion => (
                      <option key={emotion.id} value={emotion.name}>
                        {emotion.icon} {emotion.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Intensität (1-10):
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newLog.intensity || 5}
                    onChange={(e) => setNewLog(prev => ({ ...prev, intensity: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Schwach</span>
                    <span className="font-bold">{newLog.intensity}</span>
                    <span>Stark</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Auslöser:
                </label>
                <input
                  type="text"
                  value={newLog.trigger || ''}
                  onChange={(e) => setNewLog(prev => ({ ...prev, trigger: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Was hat diese Emotion ausgelöst?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gedanken:
                </label>
                <textarea
                  value={newLog.thoughts || ''}
                  onChange={(e) => setNewLog(prev => ({ ...prev, thoughts: e.target.value }))}
                  className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Welche Gedanken hattest du?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kontext:
                  </label>
                  <input
                    type="text"
                    value={newLog.context || ''}
                    onChange={(e) => setNewLog(prev => ({ ...prev, context: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Wo/mit wem warst du?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Dauer (Minuten):
                  </label>
                  <input
                    type="number"
                    value={newLog.duration || 30}
                    onChange={(e) => setNewLog(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deine Reaktion:
                </label>
                <textarea
                  value={newLog.response || ''}
                  onChange={(e) => setNewLog(prev => ({ ...prev, response: e.target.value }))}
                  className="w-full h-20 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Wie hast du auf die Emotion reagiert?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reflexion:
                </label>
                <textarea
                  value={newLog.reflection || ''}
                  onChange={(e) => setNewLog(prev => ({ ...prev, reflection: e.target.value }))}
                  className="w-full h-20 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Was lernst du aus dieser Erfahrung?"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={saveEmotionLog}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  Eintrag speichern
                </button>
                <button
                  onClick={() => setShowLogForm(false)}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Logs */}
      <div>
        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Letzte Einträge ({emotionLogs.length})
        </h4>
        <div className="space-y-4">
          {emotionLogs.slice(-5).reverse().map((log) => {
            const emotion = emotions.find(e => e.name === log.emotion);
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{emotion?.icon || '😐'}</span>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-white">
                        {log.emotion}
                      </h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(log.timestamp).toLocaleDateString('de-DE')} um {new Date(log.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getIntensityColor(log.intensity)}`}>
                    {log.intensity}/10
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Auslöser:</span>
                    <p className="text-gray-600 dark:text-gray-400">{log.trigger}</p>
                  </div>
                  {log.context && (
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Kontext:</span>
                      <p className="text-gray-600 dark:text-gray-400">{log.context}</p>
                    </div>
                  )}
                </div>
                
                {log.thoughts && (
                  <div className="mt-3">
                    <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">Gedanken:</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{log.thoughts}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {emotionLogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h4 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Noch keine Emotionen erfasst
            </h4>
            <p className="text-gray-500 dark:text-gray-500">
              Beginne mit dem Tracking deiner Emotionen für bessere Selbstwahrnehmung
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPatternsTab = () => {
    const patterns = generateMoodPatterns();
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            📈 Deine Emotionsmuster
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Erkenne Muster in deinen Emotionen und lerne mehr über dich selbst
          </p>
        </div>

        {patterns.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📈</div>
            <h4 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Nicht genug Daten für Muster
            </h4>
            <p className="text-gray-500 dark:text-gray-500 mb-6">
              Erfasse mindestens 5 Emotionen, um Muster zu erkennen
            </p>
            <button
              onClick={() => setActiveTab('tracker')}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
            >
              Emotionen erfassen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patterns.map((pattern) => {
              const emotion = emotions.find(e => e.name === pattern.emotion);
              return (
                <motion.div
                  key={pattern.emotion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-3xl">{emotion?.icon || '😐'}</span>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                        {pattern.emotion}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {pattern.frequency} mal erfasst
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Durchschnittliche Intensität:
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getIntensityColor(pattern.averageIntensity)}`}>
                        {pattern.averageIntensity}/10
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Häufige Auslöser:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {pattern.commonTriggers.map((trigger, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                          >
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderExercisesTab = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          🧘‍♀️ Emotions-Übungen
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Praktische Übungen für den gesunden Umgang mit verschiedenen Emotionen
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emotions.map((emotion) => (
          emotion.exercises.map((exercise) => (
            <motion.div
              key={`${emotion.id}-${exercise.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">{emotion.icon}</span>
                <div>
                  <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                    {exercise.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    für {emotion.name}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {exercise.description}
              </p>
              
              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="flex items-center space-x-1">
                  <span>⏱️</span>
                  <span>{exercise.duration}</span>
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  exercise.difficulty === 'einfach' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                  exercise.difficulty === 'mittel' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {exercise.difficulty}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 text-sm">
                    Schritte:
                  </h5>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {exercise.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 text-sm">
                    Vorteile:
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {exercise.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))
        ))}
      </div>
    </div>
  );

  // Emotion Detail Modal
  const EmotionModal = ({ emotion, onClose }: { emotion: Emotion; onClose: () => void }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{emotion.icon}</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {emotion.name}
              </h2>
              <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(emotion.category)} text-white rounded-full text-sm font-medium`}>
                {categories.find(c => c.id === emotion.category)?.name}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                📝 Beschreibung
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{emotion.description}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                🎯 Zweck
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{emotion.purpose}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                ⚡ Auslöser
              </h3>
              <ul className="space-y-1">
                {emotion.triggers.map((trigger, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{trigger}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                🫀 Körperliche Empfindungen
              </h3>
              <ul className="space-y-1">
                {emotion.physicalSensations.map((sensation, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{sensation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                💭 Typische Gedanken
              </h3>
              <ul className="space-y-1">
                {emotion.thoughts.map((thought, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300 italic">"{thought}"</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                ✅ Gesunder Ausdruck
              </h3>
              <ul className="space-y-1">
                {emotion.healthyExpression.map((expression, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{expression}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                ⚠️ Ungesunder Ausdruck
              </h3>
              <ul className="space-y-1">
                {emotion.unhealthyExpression.map((expression, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700 dark:text-gray-300">{expression}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                🛠️ Management-Strategien
              </h3>
              <ul className="space-y-1">
                {emotion.managementStrategies.map((strategy, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">→</span>
                    <span className="text-gray-700 dark:text-gray-300">{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {emotion.quotes.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              💬 Inspirierende Zitate
            </h3>
            <div className="space-y-3">
              {emotion.quotes.map((quote, index) => (
                <blockquote key={index} className="italic text-gray-600 dark:text-gray-400 border-l-4 border-purple-500 pl-4">
                  "{quote}"
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Emotionserklärungs-System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Verstehe deine Emotionen, lerne sie zu regulieren und entwickle emotionale Intelligenz
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2">
          {[
            { id: 'explore', label: 'Emotionen erkunden', icon: '🎭' },
            { id: 'tracker', label: 'Emotions-Tracker', icon: '📊' },
            { id: 'patterns', label: 'Meine Muster', icon: '📈' },
            { id: 'exercises', label: 'Übungen', icon: '🧘‍♀️' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'explore' && renderExploreTab()}
          {activeTab === 'tracker' && renderTrackerTab()}
          {activeTab === 'patterns' && renderPatternsTab()}
          {activeTab === 'exercises' && renderExercisesTab()}
        </motion.div>

        {/* Emotion Detail Modal */}
        <AnimatePresence>
          {selectedEmotion && (
            <EmotionModal 
              emotion={selectedEmotion} 
              onClose={() => setSelectedEmotion(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
