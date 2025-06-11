'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { settingsStorage, exportData, importData, WellnessSettings } from '@/utils/wellnessStorage';

export default function SettingsPage() {
  const [settings, setSettings] = useState<WellnessSettings | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'privacy' | 'data'>('general');
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  useEffect(() => {
    const currentSettings = settingsStorage.get();
    setSettings(currentSettings);
  }, []);

  const updateSettings = (updates: Partial<WellnessSettings>) => {
    if (!settings) return;
    
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    settingsStorage.save(newSettings);
    
    // Custom Event für andere Komponenten
    window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: newSettings }));
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importData(file).then((success) => {
        if (success) {
          alert('Daten erfolgreich importiert! 🎉');
          window.location.reload();
        } else {
          alert('Fehler beim Importieren der Daten. ❌');
        }
      });
    }
  };

  const handleExport = () => {
    exportData();
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  if (!settings) {
    return <div className="p-6">Lade Einstellungen...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            ⚙️ Einstellungen
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Personalisiere deine Wellness-Erfahrung
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8 overflow-hidden"
        >
          <nav className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'general', label: 'Allgemein', icon: '⚙️' },
              { id: 'notifications', label: 'Benachrichtigungen', icon: '🔔' },
              { id: 'privacy', label: 'Privatsphäre', icon: '🔒' },
              { id: 'data', label: 'Daten', icon: '💾' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </div>
              </motion.button>
            ))}
          </nav>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Theme Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  🎨 Erscheinungsbild
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Design-Modus
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'light', label: 'Hell', icon: '☀️' },
                        { value: 'dark', label: 'Dunkel', icon: '🌙' },
                        { value: 'system', label: 'System', icon: '💻' },
                      ].map((theme) => (
                        <motion.button
                          key={theme.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateSettings({ theme: theme.value as any })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            settings.theme === theme.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="text-2xl mb-2">{theme.icon}</div>
                          <div className="text-sm font-medium text-gray-800 dark:text-white">
                            {theme.label}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sprache
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => updateSettings({ language: e.target.value as any })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="de">Deutsch 🇩🇪</option>
                      <option value="en">English 🇺🇸</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Goal Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  🎯 Persönliche Ziele
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tägliche Minuten (Ziel)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="180"
                      value={settings.goals.dailyMinutes}
                      onChange={(e) => updateSettings({
                        goals: { ...settings.goals, dailyMinutes: parseInt(e.target.value) }
                      })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Wöchentliche Aktivitäten (Ziel)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="21"
                      value={settings.goals.weeklyActivities}
                      onChange={(e) => updateSettings({
                        goals: { ...settings.goals, weeklyActivities: parseInt(e.target.value) }
                      })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bevorzugte Module
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'stille', name: 'Meditation' },
                        { id: 'dankbarkeit', name: 'Dankbarkeit' },
                        { id: 'fortschritt', name: 'Fortschritt' },
                        { id: 'freude', name: 'Freude' },
                        { id: 'therapie', name: 'Therapie' },
                        { id: 'transformation', name: 'Transformation' },
                      ].map((module) => (
                        <label
                          key={module.id}
                          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={settings.goals.preferredModules.includes(module.id)}
                            onChange={(e) => {
                              const modules = e.target.checked
                                ? [...settings.goals.preferredModules, module.id]
                                : settings.goals.preferredModules.filter(m => m !== module.id);
                              updateSettings({
                                goals: { ...settings.goals, preferredModules: modules }
                              });
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {module.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  🔔 Benachrichtigungen
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        Benachrichtigungen aktivieren
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Erhalte Updates über Achievements und Erinnerungen
                      </p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateSettings({ notifications: !settings.notifications })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.notifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <motion.span
                        animate={{ x: settings.notifications ? 20 : 2 }}
                        className="inline-block h-4 w-4 transform rounded-full bg-white transition"
                      />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        Tägliche Erinnerungen
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Erinnere mich an meine tägliche Wellness-Routine
                      </p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateSettings({ dailyReminders: !settings.dailyReminders })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.dailyReminders ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <motion.span
                        animate={{ x: settings.dailyReminders ? 20 : 2 }}
                        className="inline-block h-4 w-4 transform rounded-full bg-white transition"
                      />
                    </motion.button>
                  </div>

                  {settings.dailyReminders && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="ml-4 border-l-2 border-blue-200 dark:border-blue-800 pl-4"
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Erinnerungszeit
                      </label>
                      <input
                        type="time"
                        value={settings.reminderTime}
                        onChange={(e) => updateSettings({ reminderTime: e.target.value })}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        Sound-Effekte
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Akustische Rückmeldung bei Aktionen
                      </p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.soundEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <motion.span
                        animate={{ x: settings.soundEnabled ? 20 : 2 }}
                        className="inline-block h-4 w-4 transform rounded-full bg-white transition"
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  🔒 Privatsphäre & Sicherheit
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        Fortschritt mit Community teilen
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Zeige deine Achievements in der Community
                      </p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateSettings({
                        privacy: { ...settings.privacy, shareProgress: !settings.privacy.shareProgress }
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.privacy.shareProgress ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <motion.span
                        animate={{ x: settings.privacy.shareProgress ? 20 : 2 }}
                        className="inline-block h-4 w-4 transform rounded-full bg-white transition"
                      />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        Anonyme Nutzung
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Keine persönlichen Daten in Statistiken verwenden
                      </p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateSettings({
                        privacy: { ...settings.privacy, anonymous: !settings.privacy.anonymous }
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.privacy.anonymous ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <motion.span
                        animate={{ x: settings.privacy.anonymous ? 20 : 2 }}
                        className="inline-block h-4 w-4 transform rounded-full bg-white transition"
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  💾 Datenverwaltung
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                      Daten exportieren
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Lade alle deine Wellness-Daten als JSON-Datei herunter
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleExport}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
                    >
                      <span>📦</span>
                      <span>Daten exportieren</span>
                    </motion.button>
                    {showExportSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg text-sm"
                      >
                        ✅ Export erfolgreich! Download gestartet.
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                      Daten importieren
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Importiere deine Wellness-Daten aus einer JSON-Datei
                    </p>
                    <label className="inline-block">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors cursor-pointer flex items-center space-x-2"
                      >
                        <span>📤</span>
                        <span>Datei auswählen</span>
                      </motion.div>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="font-medium text-red-600 dark:text-red-400 mb-2">
                      ⚠️ Danger Zone
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Diese Aktionen können nicht rückgängig gemacht werden
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (confirm('Alle Daten löschen? Dies kann nicht rückgängig gemacht werden!')) {
                          localStorage.clear();
                          window.location.reload();
                        }
                      }}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
                    >
                      <span>🗑️</span>
                      <span>Alle Daten löschen</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Save Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          ✅ Änderungen werden automatisch gespeichert
        </motion.div>
      </div>
    </div>
  );
}
