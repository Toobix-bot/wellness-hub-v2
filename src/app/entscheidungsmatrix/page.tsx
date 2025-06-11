'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Decision {
  id: string;
  title: string;
  description: string;
  options: DecisionOption[];
  criteria: DecisionCriteria[];
  deadline?: string;
  priority: 'niedrig' | 'mittel' | 'hoch' | 'kritisch';
  category: 'persönlich' | 'beruflich' | 'gesundheit' | 'beziehungen' | 'finanzen';
  status: 'offen' | 'entschieden' | 'umgesetzt';
  createdAt: string;
  decidedAt?: string;
  chosenOption?: string;
  reflection?: string;
}

interface DecisionOption {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  score?: number;
  effort: 'niedrig' | 'mittel' | 'hoch';
  risk: 'niedrig' | 'mittel' | 'hoch';
  timeframe: 'kurz' | 'mittel' | 'lang';
}

interface DecisionCriteria {
  id: string;
  name: string;
  weight: number; // 1-10
  description: string;
}

interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'niedrig' | 'mittel' | 'hoch' | 'dringend';
  category: 'sofort' | 'heute' | 'diese_woche' | 'diesen_monat' | 'langfristig';
  deadline?: string;
  completed: boolean;
  estimatedTime: number; // in Minuten
  energy: 'niedrig' | 'mittel' | 'hoch';
  context: 'zuhause' | 'arbeit' | 'unterwegs' | 'online' | 'telefon';
  tags: string[];
  createdAt: string;
  completedAt?: string;
}

interface DecisionTemplate {
  id: string;
  name: string;
  description: string;
  commonCriteria: string[];
  suggestedOptions: string[];
}

export default function EntscheidungsmatrixPage() {
  const [activeTab, setActiveTab] = useState<'decisions' | 'actions' | 'templates' | 'analytics'>('decisions');
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [showDecisionForm, setShowDecisionForm] = useState(false);
  const [showActionForm, setShowActionForm] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);
  const [newDecision, setNewDecision] = useState<Partial<Decision>>({
    title: '',
    description: '',
    options: [],
    criteria: [],
    priority: 'mittel',
    category: 'persönlich',
    status: 'offen'
  });
  const [newAction, setNewAction] = useState<Partial<ActionItem>>({
    title: '',
    description: '',
    priority: 'mittel',
    category: 'heute',
    completed: false,
    estimatedTime: 30,
    energy: 'mittel',
    context: 'zuhause',
    tags: []
  });

  // Entscheidungsvorlagen
  const decisionTemplates: DecisionTemplate[] = [
    {
      id: '1',
      name: 'Karrierewechsel',
      description: 'Hilft bei der Entscheidung für einen beruflichen Wechsel',
      commonCriteria: ['Gehalt', 'Work-Life-Balance', 'Entwicklungsmöglichkeiten', 'Arbeitsatmosphäre', 'Sicherheit', 'Interesse'],
      suggestedOptions: ['Aktuellen Job behalten', 'Internen Wechsel', 'Neuen Job suchen', 'Selbstständigkeit']
    },
    {
      id: '2',
      name: 'Wohnortwechsel',
      description: 'Bewertung verschiedener Wohnoptionen',
      commonCriteria: ['Kosten', 'Lage', 'Verkehrsanbindung', 'Größe', 'Ausstattung', 'Nachbarschaft'],
      suggestedOptions: ['Aktuelle Wohnung behalten', 'Umzug in der Stadt', 'Umzug in andere Stadt', 'Hauskauf']
    },
    {
      id: '3',
      name: 'Studien-/Ausbildungswahl',
      description: 'Entscheidung für Bildungsweg',
      commonCriteria: ['Interesse', 'Zukunftsperspektiven', 'Dauer', 'Kosten', 'Schwierigkeit', 'Standort'],
      suggestedOptions: ['Studium A', 'Studium B', 'Ausbildung', 'Gap Year', 'Praktikum']
    },
    {
      id: '4',
      name: 'Gesundheitsentscheidung',
      description: 'Bewertung von Behandlungsoptionen',
      commonCriteria: ['Wirksamkeit', 'Nebenwirkungen', 'Kosten', 'Zeitaufwand', 'Verfügbarkeit', 'Natürlichkeit'],
      suggestedOptions: ['Konventionelle Behandlung', 'Alternative Behandlung', 'Kombination', 'Abwarten']
    },
    {
      id: '5',
      name: 'Beziehungsentscheidung',
      description: 'Bewertung wichtiger Beziehungsentscheidungen',
      commonCriteria: ['Emotionale Erfüllung', 'Gemeinsame Ziele', 'Kommunikation', 'Vertrauen', 'Kompatibilität', 'Timing'],
      suggestedOptions: ['Beziehung vertiefen', 'Status quo', 'Pause einlegen', 'Beziehung beenden']
    }
  ];

  // Eisenhower-Matrix Kategorien
  const eisenhowerCategories = [
    { id: 'sofort', name: 'Dringend & Wichtig', description: 'Sofort erledigen', color: 'from-red-500 to-red-600', icon: '🚨' },
    { id: 'heute', name: 'Wichtig, nicht dringend', description: 'Planen und heute angehen', color: 'from-orange-500 to-orange-600', icon: '📅' },
    { id: 'diese_woche', name: 'Dringend, nicht wichtig', description: 'Delegieren oder schnell erledigen', color: 'from-yellow-500 to-yellow-600', icon: '⚡' },
    { id: 'diesen_monat', name: 'Weder dringend noch wichtig', description: 'Später oder eliminieren', color: 'from-gray-500 to-gray-600', icon: '📋' },
    { id: 'langfristig', name: 'Langfristige Ziele', description: 'Strategisch planen', color: 'from-blue-500 to-blue-600', icon: '🎯' }
  ];

  // Local Storage
  useEffect(() => {
    const savedDecisions = localStorage.getItem('decisions');
    const savedActions = localStorage.getItem('actions');
    
    if (savedDecisions) setDecisions(JSON.parse(savedDecisions));
    if (savedActions) setActions(JSON.parse(savedActions));
  }, []);

  const saveDecision = () => {
    if (!newDecision.title || !newDecision.description) return;

    const decision: Decision = {
      id: Date.now().toString(),
      title: newDecision.title!,
      description: newDecision.description!,
      options: newDecision.options || [],
      criteria: newDecision.criteria || [],
      priority: newDecision.priority!,
      category: newDecision.category!,
      status: 'offen',
      createdAt: new Date().toISOString(),
      deadline: newDecision.deadline
    };

    const updatedDecisions = [...decisions, decision];
    setDecisions(updatedDecisions);
    localStorage.setItem('decisions', JSON.stringify(updatedDecisions));
    
    setNewDecision({
      title: '',
      description: '',
      options: [],
      criteria: [],
      priority: 'mittel',
      category: 'persönlich',
      status: 'offen'
    });
    setShowDecisionForm(false);
  };

  const saveAction = () => {
    if (!newAction.title) return;

    const action: ActionItem = {
      id: Date.now().toString(),
      title: newAction.title!,
      description: newAction.description || '',
      priority: newAction.priority!,
      category: newAction.category!,
      completed: false,
      estimatedTime: newAction.estimatedTime!,
      energy: newAction.energy!,
      context: newAction.context!,
      tags: newAction.tags || [],
      createdAt: new Date().toISOString(),
      deadline: newAction.deadline
    };

    const updatedActions = [...actions, action];
    setActions(updatedActions);
    localStorage.setItem('actions', JSON.stringify(updatedActions));
    
    setNewAction({
      title: '',
      description: '',
      priority: 'mittel',
      category: 'heute',
      completed: false,
      estimatedTime: 30,
      energy: 'mittel',
      context: 'zuhause',
      tags: []
    });
    setShowActionForm(false);
  };

  const toggleActionComplete = (actionId: string) => {
    const updatedActions = actions.map(action => 
      action.id === actionId 
        ? { 
            ...action, 
            completed: !action.completed,
            completedAt: !action.completed ? new Date().toISOString() : undefined
          }
        : action
    );
    setActions(updatedActions);
    localStorage.setItem('actions', JSON.stringify(updatedActions));
  };

  const addDecisionOption = () => {
    const newOption: DecisionOption = {
      id: Date.now().toString(),
      name: 'Neue Option',
      description: '',
      pros: [],
      cons: [],
      effort: 'mittel',
      risk: 'mittel',
      timeframe: 'mittel'
    };
    
    setNewDecision(prev => ({
      ...prev,
      options: [...(prev.options || []), newOption]
    }));
  };

  const addDecisionCriteria = () => {
    const newCriteria: DecisionCriteria = {
      id: Date.now().toString(),
      name: 'Neues Kriterium',
      weight: 5,
      description: ''
    };
    
    setNewDecision(prev => ({
      ...prev,
      criteria: [...(prev.criteria || []), newCriteria]
    }));
  };

  const calculateDecisionMatrix = (decision: Decision) => {
    if (!decision.options.length || !decision.criteria.length) return [];
    
    return decision.options.map(option => {
      const totalScore = decision.criteria.reduce((sum, criteria) => {
        // Vereinfachte Bewertung basierend auf Pros/Cons
        const prosScore = option.pros.length * 2;
        const consScore = option.cons.length * -1;
        const baseScore = prosScore + consScore;
        
        return sum + (baseScore * criteria.weight);
      }, 0);
      
      return {
        ...option,
        totalScore,
        normalizedScore: Math.max(0, Math.min(100, (totalScore + 50))) // Normalisiert auf 0-100
      };
    }).sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'kritisch': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'hoch': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'mittel': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'niedrig': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'persönlich': return '👤';
      case 'beruflich': return '💼';
      case 'gesundheit': return '🏥';
      case 'beziehungen': return '❤️';
      case 'finanzen': return '💰';
      default: return '📝';
    }
  };

  const renderDecisionsTab = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          🤔 Entscheidungen treffen
        </h3>
        <button
          onClick={() => setShowDecisionForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
        >
          Neue Entscheidung
        </button>
      </div>

      {/* Entscheidungs-Formular */}
      <AnimatePresence>
        {showDecisionForm && (
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
                    Entscheidung:
                  </label>
                  <input
                    type="text"
                    value={newDecision.title || ''}
                    onChange={(e) => setNewDecision(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="z.B. Soll ich den Job wechseln?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kategorie:
                  </label>
                  <select
                    value={newDecision.category || 'persönlich'}
                    onChange={(e) => setNewDecision(prev => ({ ...prev, category: e.target.value as Decision['category'] }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="persönlich">👤 Persönlich</option>
                    <option value="beruflich">💼 Beruflich</option>
                    <option value="gesundheit">🏥 Gesundheit</option>
                    <option value="beziehungen">❤️ Beziehungen</option>
                    <option value="finanzen">💰 Finanzen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Beschreibung:
                </label>
                <textarea
                  value={newDecision.description || ''}
                  onChange={(e) => setNewDecision(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Beschreibe die Situation und warum diese Entscheidung wichtig ist..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priorität:
                  </label>
                  <select
                    value={newDecision.priority || 'mittel'}
                    onChange={(e) => setNewDecision(prev => ({ ...prev, priority: e.target.value as Decision['priority'] }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="niedrig">Niedrig</option>
                    <option value="mittel">Mittel</option>
                    <option value="hoch">Hoch</option>
                    <option value="kritisch">Kritisch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deadline (optional):
                  </label>
                  <input
                    type="date"
                    value={newDecision.deadline || ''}
                    onChange={(e) => setNewDecision(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={saveDecision}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  Entscheidung erstellen
                </button>
                <button
                  onClick={() => setShowDecisionForm(false)}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entscheidungen-Liste */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decisions.map((decision) => (
          <motion.div
            key={decision.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all"
            onClick={() => setSelectedDecision(decision)}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{getCategoryIcon(decision.category)}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(decision.priority)}`}>
                {decision.priority}
              </span>
            </div>
            
            <h4 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
              {decision.title}
            </h4>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {decision.description.substring(0, 100)}...
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{decision.options.length} Optionen</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                decision.status === 'offen' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                decision.status === 'entschieden' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              }`}>
                {decision.status}
              </span>
            </div>
            
            {decision.deadline && (
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Deadline: {new Date(decision.deadline).toLocaleDateString('de-DE')}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {decisions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤔</div>
          <h4 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Noch keine Entscheidungen angelegt
          </h4>
          <p className="text-gray-500 dark:text-gray-500">
            Erstelle deine erste Entscheidung und nutze die Kraft der strukturierten Analyse
          </p>
        </div>
      )}
    </div>
  );

  const renderActionsTab = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          ⚡ Aktionsplan
        </h3>
        <button
          onClick={() => setShowActionForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
        >
          Neue Aktion
        </button>
      </div>

      {/* Aktions-Formular */}
      <AnimatePresence>
        {showActionForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aktion:
                </label>
                <input
                  type="text"
                  value={newAction.title || ''}
                  onChange={(e) => setNewAction(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="z.B. Bewerbung bei Firma X schreiben"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Beschreibung (optional):
                </label>
                <textarea
                  value={newAction.description || ''}
                  onChange={(e) => setNewAction(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-20 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Weitere Details zur Aufgabe..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priorität:
                  </label>
                  <select
                    value={newAction.priority || 'mittel'}
                    onChange={(e) => setNewAction(prev => ({ ...prev, priority: e.target.value as ActionItem['priority'] }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="niedrig">Niedrig</option>
                    <option value="mittel">Mittel</option>
                    <option value="hoch">Hoch</option>
                    <option value="dringend">Dringend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kategorie:
                  </label>
                  <select
                    value={newAction.category || 'heute'}
                    onChange={(e) => setNewAction(prev => ({ ...prev, category: e.target.value as ActionItem['category'] }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="sofort">🚨 Sofort</option>
                    <option value="heute">📅 Heute</option>
                    <option value="diese_woche">⚡ Diese Woche</option>
                    <option value="diesen_monat">📋 Diesen Monat</option>
                    <option value="langfristig">🎯 Langfristig</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Energie:
                  </label>
                  <select
                    value={newAction.energy || 'mittel'}
                    onChange={(e) => setNewAction(prev => ({ ...prev, energy: e.target.value as ActionItem['energy'] }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="niedrig">🟢 Niedrig</option>
                    <option value="mittel">🟡 Mittel</option>
                    <option value="hoch">🔴 Hoch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kontext:
                  </label>
                  <select
                    value={newAction.context || 'zuhause'}
                    onChange={(e) => setNewAction(prev => ({ ...prev, context: e.target.value as ActionItem['context'] }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="zuhause">🏠 Zuhause</option>
                    <option value="arbeit">💼 Arbeit</option>
                    <option value="unterwegs">🚗 Unterwegs</option>
                    <option value="online">💻 Online</option>
                    <option value="telefon">📞 Telefon</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Geschätzte Zeit (Minuten):
                  </label>
                  <input
                    type="number"
                    value={newAction.estimatedTime || 30}
                    onChange={(e) => setNewAction(prev => ({ ...prev, estimatedTime: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    min="5"
                    step="5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deadline (optional):
                  </label>
                  <input
                    type="date"
                    value={newAction.deadline || ''}
                    onChange={(e) => setNewAction(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={saveAction}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  Aktion erstellen
                </button>
                <button
                  onClick={() => setShowActionForm(false)}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Eisenhower-Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {eisenhowerCategories.map((category) => {
          const categoryActions = actions.filter(action => action.category === category.id);
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 bg-gradient-to-r ${category.color} text-white rounded-xl`}>
                  <span className="text-xl">{category.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">
                    {category.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                {categoryActions.slice(0, 5).map((action) => (
                  <div
                    key={action.id}
                    className={`p-3 rounded-lg border transition-all ${
                      action.completed 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleActionComplete(action.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          action.completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                        }`}
                      >
                        {action.completed && '✓'}
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${
                          action.completed 
                            ? 'text-green-700 dark:text-green-300 line-through' 
                            : 'text-gray-800 dark:text-white'
                        }`}>
                          {action.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>⏱️ {action.estimatedTime}min</span>
                          <span>⚡ {action.energy}</span>
                          <span>📍 {action.context}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {categoryActions.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                    Keine Aktionen in dieser Kategorie
                  </p>
                )}
                
                {categoryActions.length > 5 && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs text-center">
                    +{categoryActions.length - 5} weitere Aktionen
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderTemplatesTab = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          📋 Entscheidungsvorlagen
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Nutze bewährte Vorlagen für häufige Entscheidungssituationen
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {decisionTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              {template.name}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {template.description}
            </p>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Häufige Kriterien:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {template.commonCriteria.map((criteria, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >
                      {criteria}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Typische Optionen:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {template.suggestedOptions.map((option, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => {
                const templateDecision: Partial<Decision> = {
                  title: template.name,
                  description: template.description,
                  criteria: template.commonCriteria.map((name, index) => ({
                    id: (Date.now() + index).toString(),
                    name,
                    weight: 5,
                    description: ''
                  })),
                  options: template.suggestedOptions.map((name, index) => ({
                    id: (Date.now() + index + 100).toString(),
                    name,
                    description: '',
                    pros: [],
                    cons: [],
                    effort: 'mittel' as const,
                    risk: 'mittel' as const,
                    timeframe: 'mittel' as const
                  })),
                  priority: 'mittel',
                  category: 'persönlich',
                  status: 'offen'
                };
                
                setNewDecision(templateDecision);
                setShowDecisionForm(true);
              }}
              className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all"
            >
              Vorlage verwenden
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => {
    const completedActions = actions.filter(action => action.completed);
    const pendingActions = actions.filter(action => !action.completed);
    const decidedDecisions = decisions.filter(decision => decision.status === 'entschieden');
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            📊 Deine Entscheidungs-Statistiken
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
            <div className="text-3xl font-bold">{decisions.length}</div>
            <div className="text-blue-100">Entscheidungen</div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
            <div className="text-3xl font-bold">{decidedDecisions.length}</div>
            <div className="text-green-100">Getroffen</div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
            <div className="text-3xl font-bold">{actions.length}</div>
            <div className="text-purple-100">Aktionen</div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6">
            <div className="text-3xl font-bold">{completedActions.length}</div>
            <div className="text-orange-100">Abgeschlossen</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8">
          <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            🎯 Produktivitäts-Insights
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Entscheidungsverteilung:
              </h5>
              <div className="space-y-2">
                {['persönlich', 'beruflich', 'gesundheit', 'beziehungen', 'finanzen'].map(category => {
                  const count = decisions.filter(d => d.category === category).length;
                  const percentage = decisions.length > 0 ? (count / decisions.length) * 100 : 0;
                  
                  return (
                    <div key={category} className="flex items-center space-x-3">
                      <span className="text-sm w-20">{getCategoryIcon(category)} {category}</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Aktions-Effizienz:
              </h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Erledigte Aktionen:</span>
                  <span className="font-semibold">{completedActions.length}/{actions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Erfolgsrate:</span>
                  <span className="font-semibold">
                    {actions.length > 0 ? Math.round((completedActions.length / actions.length) * 100) : 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ø Zeit pro Aktion:</span>
                  <span className="font-semibold">
                    {actions.length > 0 ? Math.round(actions.reduce((sum, a) => sum + a.estimatedTime, 0) / actions.length) : 0} min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Entscheidungsmatrix-Helfer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Treffe bessere Entscheidungen und setze Prioritäten mit strukturierten Methoden und bewährten Frameworks
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2">
          {[
            { id: 'decisions', label: 'Entscheidungen', icon: '🤔' },
            { id: 'actions', label: 'Aktionsplan', icon: '⚡' },
            { id: 'templates', label: 'Vorlagen', icon: '📋' },
            { id: 'analytics', label: 'Statistiken', icon: '📊' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
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
          {activeTab === 'decisions' && renderDecisionsTab()}
          {activeTab === 'actions' && renderActionsTab()}
          {activeTab === 'templates' && renderTemplatesTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
        </motion.div>
      </div>
    </div>
  );
}
