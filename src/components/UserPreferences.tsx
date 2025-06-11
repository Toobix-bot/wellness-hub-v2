'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'de' | 'en';
  notifications: {
    enabled: boolean;
    reminders: boolean;
    achievements: boolean;
    scientificFacts: boolean;
  };
  wellness: {
    preferredCoach: 'gentle' | 'motivational' | 'scientific' | 'playful';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    focusAreas: string[];
  };
  privacy: {
    dataCollection: boolean;
    analytics: boolean;
    sharing: boolean;
  };
}

const defaultPreferences: UserPreferences = {
  theme: 'auto',
  language: 'de',
  notifications: {
    enabled: true,
    reminders: true,
    achievements: true,
    scientificFacts: true
  },
  wellness: {
    preferredCoach: 'gentle',
    difficulty: 'beginner',
    focusAreas: ['meditation', 'stress-relief']
  },
  privacy: {
    dataCollection: true,
    analytics: true,
    sharing: false
  }
};

export default function UserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    // Präferenzen aus localStorage laden
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  const savePreferences = (newPrefs: UserPreferences) => {
    setPreferences(newPrefs);
    localStorage.setItem('userPreferences', JSON.stringify(newPrefs));
    
    // Event für andere Komponenten
    window.dispatchEvent(new CustomEvent('preferencesUpdated', { 
      detail: newPrefs 
    }));
  };

  const tabs = [
    { id: 'general', name: 'Allgemein', icon: '⚙️' },
    { id: 'wellness', name: 'Wellness', icon: '🧘' },
    { id: 'notifications', name: 'Benachrichtigungen', icon: '🔔' },
    { id: 'privacy', name: 'Datenschutz', icon: '🔒' }
  ];

  const focusAreaOptions = [
    'meditation', 'stress-relief', 'sleep', 'mindfulness', 
    'gratitude', 'relationships', 'productivity', 'creativity'
  ];

  const focusAreaLabels: Record<string, string> = {
    'meditation': 'Meditation',
    'stress-relief': 'Stressabbau',
    'sleep': 'Schlaf',
    'mindfulness': 'Achtsamkeit',
    'gratitude': 'Dankbarkeit',
    'relationships': 'Beziehungen',
    'productivity': 'Produktivität',
    'creativity': 'Kreativität'
  };

  return (
    <>
      {/* Settings Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="text-xl">⚙️</span>
      </motion.button>

      {/* Settings Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-4 md:inset-10 lg:inset-16 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex h-full">
                {/* Tabs Sidebar */}
                <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Einstellungen
                    </h2>
                  </div>
                  
                  <nav className="p-4 space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="text-lg">{tab.icon}</span>
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {tabs.find(t => t.id === activeTab)?.name}
                    </h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <span className="text-xl text-gray-500">✕</span>
                    </button>
                  </div>

                  {/* Settings Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'general' && (
                      <div className="space-y-6">
                        {/* Theme Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Design-Modus
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {['light', 'dark', 'auto'].map((theme) => (
                              <button
                                key={theme}
                                onClick={() => savePreferences({
                                  ...preferences,
                                  theme: theme as 'light' | 'dark' | 'auto'
                                })}
                                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                                  preferences.theme === theme
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                                }`}
                              >
                                <div className="text-2xl mb-1">
                                  {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🌗'}
                                </div>
                                <div className="text-sm font-medium capitalize">
                                  {theme === 'light' ? 'Hell' : theme === 'dark' ? 'Dunkel' : 'Auto'}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Language Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Sprache
                          </label>
                          <select
                            value={preferences.language}
                            onChange={(e) => savePreferences({
                              ...preferences,
                              language: e.target.value as 'de' | 'en'
                            })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            <option value="de">Deutsch</option>
                            <option value="en">English</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {activeTab === 'wellness' && (
                      <div className="space-y-6">
                        {/* Preferred Coach */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Bevorzugter KI-Coach
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { id: 'gentle', name: 'Sanft & Einfühlsam', icon: '🌸' },
                              { id: 'motivational', name: 'Motivierend & Energisch', icon: '💪' },
                              { id: 'scientific', name: 'Wissenschaftlich & Präzise', icon: '🧬' },
                              { id: 'playful', name: 'Spielerisch & Kreativ', icon: '🎈' }
                            ].map((coach) => (
                              <button
                                key={coach.id}
                                onClick={() => savePreferences({
                                  ...preferences,
                                  wellness: { ...preferences.wellness, preferredCoach: coach.id as any }
                                })}
                                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                                  preferences.wellness.preferredCoach === coach.id
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                                }`}
                              >
                                <div className="text-2xl mb-2">{coach.icon}</div>
                                <div className="font-medium text-sm">{coach.name}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Focus Areas */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Fokus-Bereiche
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {focusAreaOptions.map((area) => (
                              <label
                                key={area}
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={preferences.wellness.focusAreas.includes(area)}
                                  onChange={(e) => {
                                    const newAreas = e.target.checked
                                      ? [...preferences.wellness.focusAreas, area]
                                      : preferences.wellness.focusAreas.filter(a => a !== area);
                                    savePreferences({
                                      ...preferences,
                                      wellness: { ...preferences.wellness, focusAreas: newAreas }
                                    });
                                  }}
                                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm">{focusAreaLabels[area]}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'notifications' && (
                      <div className="space-y-6">
                        {Object.entries(preferences.notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {key === 'enabled' ? 'Benachrichtigungen aktiviert' :
                                 key === 'reminders' ? 'Erinnerungen' :
                                 key === 'achievements' ? 'Erfolge' :
                                 'Wissenschaftliche Fakten'}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {key === 'enabled' ? 'Grundlegende Benachrichtigungen' :
                                 key === 'reminders' ? 'Tägliche Wellness-Erinnerungen' :
                                 key === 'achievements' ? 'Benachrichtigungen bei Erfolgen' :
                                 'Tägliche wissenschaftliche Fakten'}
                              </div>
                            </div>
                            <button
                              onClick={() => savePreferences({
                                ...preferences,
                                notifications: { ...preferences.notifications, [key]: !value }
                              })}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                value ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'privacy' && (
                      <div className="space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <span className="text-blue-500 text-xl">🔒</span>
                            <div>
                              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                                Datenschutz ist uns wichtig
                              </h4>
                              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                Alle Daten werden lokal auf Ihrem Gerät gespeichert. Wir respektieren Ihre Privatsphäre.
                              </p>
                            </div>
                          </div>
                        </div>

                        {Object.entries(preferences.privacy).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {key === 'dataCollection' ? 'Datensammlung' :
                                 key === 'analytics' ? 'Analyse-Daten' :
                                 'Daten teilen'}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {key === 'dataCollection' ? 'Nutzungsdaten für Verbesserungen' :
                                 key === 'analytics' ? 'Anonyme Nutzungsstatistiken' :
                                 'Fortschritte mit der Community teilen'}
                              </div>
                            </div>
                            <button
                              onClick={() => savePreferences({
                                ...preferences,
                                privacy: { ...preferences.privacy, [key]: !value }
                              })}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                value ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
