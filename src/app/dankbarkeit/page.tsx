'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface DankbarkeitEintrag {
  id: string;
  text: string;
  datum: Date;
  category: 'klein' | 'groß' | 'menschen' | 'natur' | 'erfahrung';
}

export default function DankbarkeitPage() {
  const [eintraege, setEintraege] = useState<DankbarkeitEintrag[]>([]);
  const [neuerEintrag, setNeuerEintrag] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DankbarkeitEintrag['category']>('klein');

  const kategorien = [
    { key: 'klein' as const, name: 'Kleine Freuden', icon: '✨', color: 'from-yellow-400 to-orange-500' },
    { key: 'groß' as const, name: 'Große Momente', icon: '🌟', color: 'from-purple-400 to-pink-500' },
    { key: 'menschen' as const, name: 'Menschen', icon: '👥', color: 'from-blue-400 to-indigo-500' },
    { key: 'natur' as const, name: 'Natur', icon: '🌿', color: 'from-green-400 to-teal-500' },
    { key: 'erfahrung' as const, name: 'Erfahrungen', icon: '🎯', color: 'from-red-400 to-pink-500' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (neuerEintrag.trim()) {
      const neuer: DankbarkeitEintrag = {
        id: Date.now().toString(),
        text: neuerEintrag.trim(),
        datum: new Date(),
        category: selectedCategory
      };
      setEintraege([neuer, ...eintraege]);
      setNeuerEintrag('');
    }
  };

  const getCategoryInfo = (category: DankbarkeitEintrag['category']) => {
    return kategorien.find(k => k.key === category) || kategorien[0];
  };

  return (    <div className="p-6">
      <main className="max-w-6xl mx-auto">
        {/* Header Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            🙏 Dankbarkeit
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Kultiviere eine Haltung der Dankbarkeit und entdecke die kleinen Wunder des Alltags
          </p>
        </motion.div>
        {/* Eingabeformular */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Wofür bist du heute dankbar?
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Kategorie-Auswahl */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {kategorien.map((kategorie) => (
                <motion.button
                  key={kategorie.key}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(kategorie.key)}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                    selectedCategory === kategorie.key
                      ? `bg-gradient-to-r ${kategorie.color} text-white border-transparent shadow-lg`
                      : 'bg-white/50 border-gray-200 text-gray-700 hover:bg-white/70'
                  }`}
                >
                  <div className="text-xl mb-1">{kategorie.icon}</div>
                  <div className="text-sm font-medium">{kategorie.name}</div>
                </motion.button>
              ))}
            </div>

            {/* Texteingabe */}
            <div>
              <textarea
                value={neuerEintrag}
                onChange={(e) => setNeuerEintrag(e.target.value)}
                placeholder="Beschreibe, wofür du dankbar bist..."
                className="w-full p-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                rows={3}
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Dankbarkeit hinzufügen ✨
            </motion.button>
          </form>
        </motion.div>

        {/* Dankbarkeits-Einträge */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Deine Dankbarkeits-Momente ({eintraege.length})
          </h2>
          
          {eintraege.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500 dark:text-gray-400"
            >
              <div className="text-6xl mb-4">🌱</div>
              <p className="text-lg">Noch keine Einträge vorhanden.</p>
              <p>Beginne mit deinem ersten Dankbarkeits-Moment!</p>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              {eintraege.map((eintrag, index) => {
                const categoryInfo = getCategoryInfo(eintrag.category);
                return (
                  <motion.div
                    key={eintrag.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${categoryInfo.color} flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
                        {categoryInfo.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {categoryInfo.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {eintrag.datum.toLocaleDateString('de-DE')}
                          </span>
                        </div>
                        <p className="text-gray-800 dark:text-white leading-relaxed">
                          {eintrag.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Motivations-Zitate */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">💫 Inspiration</h3>          <blockquote className="text-lg italic mb-4">
            &ldquo;Dankbarkeit macht das, was wir haben, zu genug.&rdquo;
          </blockquote>
          <p className="text-purple-100">- Anonymus</p>        </motion.div>
      </main>
    </div>
  );
}
