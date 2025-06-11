'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SelfReflectionEntry {
  id: string;
  date: string;
  question: string;
  answer: string;
  emotion: string;
  insights: string[];
}

interface LifeGoal {
  id: string;
  title: string;
  description: string;
  category: 'persönlich' | 'beruflich' | 'spirituell' | 'beziehungen' | 'gesundheit';
  priority: 'niedrig' | 'mittel' | 'hoch';
  status: 'nicht_begonnen' | 'in_arbeit' | 'abgeschlossen';
  milestones: string[];
  deadline?: string;
  progress: number;
}

interface ValueAssessment {
  value: string;
  importance: number;
  currentFulfillment: number;
  description: string;
}

export default function SelbstverwirklichungPage() {
  const [activeTab, setActiveTab] = useState<'reflection' | 'goals' | 'values' | 'vision'>('reflection');
  const [reflectionEntries, setReflectionEntries] = useState<SelfReflectionEntry[]>([]);
  const [lifeGoals, setLifeGoals] = useState<LifeGoal[]>([]);
  const [values, setValues] = useState<ValueAssessment[]>([]);
  const [currentReflection, setCurrentReflection] = useState({
    question: '',
    answer: '',
    emotion: '',
  });
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<LifeGoal>>({
    title: '',
    description: '',
    category: 'persönlich',
    priority: 'mittel',
    status: 'nicht_begonnen',
    milestones: [],
    progress: 0
  });

  // Deep Self-Reflection Fragen
  const reflectionQuestions = [
    "Was bereitet mir in meinem Leben die größte Freude?",
    "Welche Aktivitäten lassen mich die Zeit vergessen?",
    "Was würde ich tun, wenn Geld keine Rolle spielen würde?",
    "Welche Eigenschaften bewundere ich an anderen Menschen?",
    "Was sind meine größten Stärken und wie nutze ich sie?",
    "Welche Ängste halten mich davon ab, mein volles Potenzial zu leben?",
    "Was möchte ich in 10 Jahren über mein Leben sagen können?",
    "Welche Werte sind mir am wichtigsten und warum?",
    "In welchen Bereichen meines Lebens fühle ich mich authentisch?",
    "Was würde ich meinem jüngeren Ich raten?",
    "Welche Erfahrungen haben mich am meisten geprägt?",
    "Was bedeutet Erfolg für mich persönlich?",
    "Welche Träume habe ich aufgegeben und warum?",
    "Wie möchte ich von anderen Menschen in Erinnerung behalten werden?",
    "Was bereitet mir echtes, tiefes Glück?"
  ];

  // Kern-Werte für Bewertung
  const coreValues = [
    { value: 'Authentizität', description: 'Ich selbst sein, ohne Verstellung' },
    { value: 'Kreativität', description: 'Neue Ideen entwickeln und umsetzen' },
    { value: 'Verbindung', description: 'Tiefe Beziehungen zu anderen Menschen' },
    { value: 'Wachstum', description: 'Kontinuierliche persönliche Entwicklung' },
    { value: 'Freiheit', description: 'Autonomie und Selbstbestimmung' },
    { value: 'Sicherheit', description: 'Stabilität und Vorhersehbarkeit' },
    { value: 'Abenteuer', description: 'Neue Erfahrungen und Herausforderungen' },
    { value: 'Spiritualität', description: 'Verbindung zu etwas Größerem' },
    { value: 'Mitgefühl', description: 'Empathie und Hilfsbereitschaft' },
    { value: 'Weisheit', description: 'Tiefes Verständnis und Erkenntnis' },
    { value: 'Schönheit', description: 'Ästhetik und Harmonie wertschätzen' },
    { value: 'Gerechtigkeit', description: 'Fairness und Gleichberechtigung' },
    { value: 'Gesundheit', description: 'Körperliches und geistiges Wohlbefinden' },
    { value: 'Familie', description: 'Enge Bindungen zu Verwandten' },
    { value: 'Karriere', description: 'Beruflicher Erfolg und Anerkennung' }
  ];

  // Lokale Speicherung
  useEffect(() => {
    const savedEntries = localStorage.getItem('selfReflectionEntries');
    const savedGoals = localStorage.getItem('lifeGoals');
    const savedValues = localStorage.getItem('valueAssessment');
    
    if (savedEntries) setReflectionEntries(JSON.parse(savedEntries));
    if (savedGoals) setLifeGoals(JSON.parse(savedGoals));
    if (savedValues) {
      setValues(JSON.parse(savedValues));
    } else {
      // Initialisiere Werte-Bewertung
      setValues(coreValues.map(cv => ({
        ...cv,
        importance: 5,
        currentFulfillment: 5
      })));
    }
  }, []);

  const saveReflectionEntry = () => {
    if (!currentReflection.question || !currentReflection.answer) return;

    const newEntry: SelfReflectionEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      question: currentReflection.question,
      answer: currentReflection.answer,
      emotion: currentReflection.emotion,
      insights: []
    };

    const updatedEntries = [...reflectionEntries, newEntry];
    setReflectionEntries(updatedEntries);
    localStorage.setItem('selfReflectionEntries', JSON.stringify(updatedEntries));
    
    setCurrentReflection({ question: '', answer: '', emotion: '' });
  };

  const saveLifeGoal = () => {
    if (!newGoal.title || !newGoal.description) return;

    const goal: LifeGoal = {
      id: Date.now().toString(),
      title: newGoal.title!,
      description: newGoal.description!,
      category: newGoal.category!,
      priority: newGoal.priority!,
      status: newGoal.status!,
      milestones: newGoal.milestones || [],
      progress: newGoal.progress || 0
    };

    const updatedGoals = [...lifeGoals, goal];
    setLifeGoals(updatedGoals);
    localStorage.setItem('lifeGoals', JSON.stringify(updatedGoals));
    
    setNewGoal({
      title: '',
      description: '',
      category: 'persönlich',
      priority: 'mittel',
      status: 'nicht_begonnen',
      milestones: [],
      progress: 0
    });
    setShowGoalForm(false);
  };

  const updateValueAssessment = (valueIndex: number, field: 'importance' | 'currentFulfillment', value: number) => {
    const updatedValues = [...values];
    updatedValues[valueIndex][field] = value;
    setValues(updatedValues);
    localStorage.setItem('valueAssessment', JSON.stringify(updatedValues));
  };

  const getRandomReflectionQuestion = () => {
    const randomIndex = Math.floor(Math.random() * reflectionQuestions.length);
    setCurrentReflection(prev => ({ ...prev, question: reflectionQuestions[randomIndex] }));
  };

  const renderReflectionTab = () => (
    <div className="space-y-8">
      {/* Aktuelle Reflexion */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Tiefe Selbstreflexion
        </h3>
        
        <div className="space-y-4">
          <div>
            <button
              onClick={getRandomReflectionQuestion}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
            >
              Neue Reflexionsfrage
            </button>
            {currentReflection.question && (
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-700">
                <p className="text-lg font-medium text-gray-800 dark:text-white">
                  {currentReflection.question}
                </p>
              </div>
            )}
          </div>

          {currentReflection.question && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deine Antwort:
                </label>
                <textarea
                  value={currentReflection.answer}
                  onChange={(e) => setCurrentReflection(prev => ({ ...prev, answer: e.target.value }))}
                  className="w-full h-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Nimm dir Zeit für eine ehrliche, tiefgehende Antwort..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aktuelle Emotion:
                </label>
                <select
                  value={currentReflection.emotion}
                  onChange={(e) => setCurrentReflection(prev => ({ ...prev, emotion: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Wähle eine Emotion...</option>
                  <option value="dankbar">Dankbar</option>
                  <option value="hoffnungsvoll">Hoffnungsvoll</option>
                  <option value="nachdenklich">Nachdenklich</option>
                  <option value="inspiriert">Inspiriert</option>
                  <option value="verwirrt">Verwirrt</option>
                  <option value="traurig">Traurig</option>
                  <option value="ängstlich">Ängstlich</option>
                  <option value="aufgeregt">Aufgeregt</option>
                  <option value="friedlich">Friedlich</option>
                  <option value="motiviert">Motiviert</option>
                </select>
              </div>

              <button
                onClick={saveReflectionEntry}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                Reflexion speichern
              </button>
            </>
          )}
        </div>
      </div>

      {/* Vergangene Reflexionen */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Vergangene Reflexionen ({reflectionEntries.length})
        </h3>
        <div className="space-y-4">
          {reflectionEntries.slice(-5).reverse().map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(entry.date).toLocaleDateString('de-DE')}
                </span>
                {entry.emotion && (
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                    {entry.emotion}
                  </span>
                )}
              </div>
              <p className="font-medium text-gray-800 dark:text-white mb-2">
                {entry.question}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {entry.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGoalsTab = () => (
    <div className="space-y-8">
      {/* Neue Ziel-Erstellung */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Lebensziele & Vision
        </h3>
        <button
          onClick={() => setShowGoalForm(!showGoalForm)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
        >
          Neues Ziel
        </button>
      </div>

      {/* Ziel-Formular */}
      <AnimatePresence>
        {showGoalForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ziel-Titel:
                </label>
                <input
                  type="text"
                  value={newGoal.title || ''}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="z.B. Mehr Zeit für kreative Projekte"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Beschreibung:
                </label>
                <textarea
                  value={newGoal.description || ''}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Detaillierte Beschreibung deines Ziels..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kategorie:
                  </label>
                  <select
                    value={newGoal.category || 'persönlich'}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="persönlich">Persönlich</option>
                    <option value="beruflich">Beruflich</option>
                    <option value="spirituell">Spirituell</option>
                    <option value="beziehungen">Beziehungen</option>
                    <option value="gesundheit">Gesundheit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priorität:
                  </label>
                  <select
                    value={newGoal.priority || 'mittel'}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="niedrig">Niedrig</option>
                    <option value="mittel">Mittel</option>
                    <option value="hoch">Hoch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status:
                  </label>
                  <select
                    value={newGoal.status || 'nicht_begonnen'}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="nicht_begonnen">Nicht begonnen</option>
                    <option value="in_arbeit">In Arbeit</option>
                    <option value="abgeschlossen">Abgeschlossen</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={saveLifeGoal}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  Ziel speichern
                </button>
                <button
                  onClick={() => setShowGoalForm(false)}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ziele-Übersicht */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lifeGoals.map((goal) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                goal.priority === 'hoch' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                goal.priority === 'mittel' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              }`}>
                {goal.priority}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                goal.status === 'abgeschlossen' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                goal.status === 'in_arbeit' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
              }`}>
                {goal.status.replace('_', ' ')}
              </span>
            </div>
            
            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              {goal.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              {goal.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span className="capitalize">{goal.category}</span>
              <span>{goal.progress}% abgeschlossen</span>
            </div>
            
            <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderValuesTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Werte-Bewertung
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Bewerte, wie wichtig dir verschiedene Lebenswerte sind und wie gut sie aktuell in deinem Leben erfüllt sind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((valueItem, index) => (
          <motion.div
            key={valueItem.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
          >
            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              {valueItem.value}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
              {valueItem.description}
            </p>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Wichtigkeit
                  </label>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {valueItem.importance}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={valueItem.importance}
                  onChange={(e) => updateValueAssessment(index, 'importance', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider-blue"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Aktuelle Erfüllung
                  </label>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">
                    {valueItem.currentFulfillment}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={valueItem.currentFulfillment}
                  onChange={(e) => updateValueAssessment(index, 'currentFulfillment', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider-green"
                />
              </div>
              
              {/* Werte-Gap Anzeige */}
              <div className="pt-2">
                {valueItem.importance > valueItem.currentFulfillment + 2 && (
                  <div className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full">
                    Verbesserungspotenzial: {valueItem.importance - valueItem.currentFulfillment} Punkte
                  </div>
                )}
                {Math.abs(valueItem.importance - valueItem.currentFulfillment) <= 2 && (
                  <div className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
                    Gut ausbalanciert
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Werte-Analyse */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6">
        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Deine Werte-Analyse
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h5 className="font-semibold text-gray-800 dark:text-white mb-2">
              Wichtigste Werte
            </h5>
            <div className="space-y-1">
              {values
                .sort((a, b) => b.importance - a.importance)
                .slice(0, 3)
                .map((value, index) => (
                  <div key={value.value} className="flex items-center space-x-2">
                    <span className="text-2xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {value.value}
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-800 dark:text-white mb-2">
              Gut erfüllte Bereiche
            </h5>
            <div className="space-y-1">
              {values
                .filter(v => v.currentFulfillment >= 8)
                .slice(0, 3)
                .map((value) => (
                  <div key={value.value} className="flex items-center space-x-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {value.value}
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-800 dark:text-white mb-2">
              Verbesserungsbereiche
            </h5>
            <div className="space-y-1">
              {values
                .filter(v => v.importance > v.currentFulfillment + 2)
                .sort((a, b) => (b.importance - b.currentFulfillment) - (a.importance - a.currentFulfillment))
                .slice(0, 3)
                .map((value) => (
                  <div key={value.value} className="flex items-center space-x-2">
                    <span className="text-orange-500">⚠️</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {value.value}
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVisionTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Zukunftsvision & Lebensmission
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Entwickle eine klare Vision für dein Leben und entdecke deine persönliche Mission.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vision Board */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
          <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            🎯 Meine 10-Jahres-Vision
          </h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Persönliches Leben:</h5>
              <textarea
                className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Wie sieht dein ideales persönliches Leben in 10 Jahren aus?"
              />
            </div>
            <div>
              <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Berufliches Leben:</h5>
              <textarea
                className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Welche beruflichen Ziele möchtest du erreicht haben?"
              />
            </div>
            <div>
              <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Beziehungen:</h5>
              <textarea
                className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Wie sehen deine idealen Beziehungen aus?"
              />
            </div>
          </div>
        </div>

        {/* Lebensmission */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
          <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            🌟 Meine Lebensmission
          </h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Mission Statement:</h5>
              <textarea
                className="w-full h-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Formuliere deine persönliche Mission in 2-3 Sätzen..."
              />
            </div>
            <div>
              <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Kern-Beitrag zur Welt:</h5>
              <textarea
                className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Welchen einzigartigen Beitrag möchtest du zur Welt leisten?"
              />
            </div>
            <div>
              <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Legacy (Vermächtnis):</h5>
              <textarea
                className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Woran sollen sich Menschen nach deinem Leben erinnern?"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Aktionsplan */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          🚀 Aktionsplan für die nächsten 90 Tage
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Nächste 30 Tage:</h5>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder={`Ziel ${i}`}
                />
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Nächste 60 Tage:</h5>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder={`Ziel ${i}`}
                />
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Nächste 90 Tage:</h5>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder={`Ziel ${i}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Selbstverwirklichungs-Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Entdecke dein wahres Selbst, definiere deine Werte und erschaffe eine authentische Lebensvision
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2">
          {[
            { id: 'reflection', label: 'Selbstreflexion', icon: '🤔' },
            { id: 'goals', label: 'Lebensziele', icon: '🎯' },
            { id: 'values', label: 'Werte-Bewertung', icon: '⚖️' },
            { id: 'vision', label: 'Zukunftsvision', icon: '🔮' }
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
          {activeTab === 'reflection' && renderReflectionTab()}
          {activeTab === 'goals' && renderGoalsTab()}
          {activeTab === 'values' && renderValuesTab()}
          {activeTab === 'vision' && renderVisionTab()}
        </motion.div>
      </div>
    </div>
  );
}
