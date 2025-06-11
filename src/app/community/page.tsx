'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CommunityPost, WellnessGroup, User } from '@/types/community';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'groups' | 'privacy' | 'safety'>('feed');
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [groups, setGroups] = useState<WellnessGroup[]>([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [privacyMode, setPrivacyMode] = useState<'public' | 'private'>('public');

  useEffect(() => {
    loadCommunityData();
  }, []);

  const loadCommunityData = () => {
    // Beispiel-Posts
    const examplePosts: CommunityPost[] = [
      {
        id: '1',
        authorId: 'user1',
        type: 'achievement',
        title: '30-Tage Meditation geschafft! 🎉',
        content: 'Ich kann es kaum glauben - heute habe ich meine 30-tägige Meditation-Streak vollendet! Die Veränderung in meiner Stimmung und Konzentration ist unglaublich.',
        isAnonymous: false,
        tags: ['meditation', 'streak', 'achievement'],
        reactions: [
          { type: 'heart', count: 23, users: ['user2', 'user3'] },
          { type: 'clap', count: 15, users: ['user4'] }
        ],
        comments: [],
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        privacy: 'public',
        moderated: true
      },
      {
        id: '2',
        authorId: 'user2',
        type: 'question',
        title: 'Tipps für Morgen-Routine?',
        content: 'Ich struggle damit, eine konsistente Morgen-Routine zu entwickeln. Was funktioniert für euch am besten?',
        isAnonymous: true,
        tags: ['routine', 'morning', 'advice'],
        reactions: [
          { type: 'heart', count: 8, users: ['user1'] }
        ],
        comments: [],
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        privacy: 'public',
        moderated: true
      },
      {
        id: '3',
        authorId: 'user3',
        type: 'insight',
        title: 'Wissenschaft: Dankbarkeit & Gehirn',
        content: 'Interessante Studie gefunden: Dankbarkeits-Praktiken können die Neuroplastizität um 25% erhöhen! 🧠✨',
        isAnonymous: false,
        tags: ['science', 'gratitude', 'neuroscience'],
        reactions: [
          { type: 'wow', count: 12, users: ['user1', 'user2'] },
          { type: 'star', count: 7, users: ['user4'] }
        ],
        comments: [],
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        privacy: 'public',
        moderated: true
      }
    ];
    setPosts(examplePosts);

    // Beispiel-Gruppen
    const exampleGroups: WellnessGroup[] = [
      {
        id: 'meditation_circle',
        name: 'Täglicher Meditations-Kreis',
        description: 'Gemeinsam meditieren, Erfahrungen teilen und sich gegenseitig motivieren',
        category: 'meditation',
        privacy: 'public',
        memberCount: 234,
        moderators: ['mod1', 'mod2'],
        rules: [
          'Respektvoller Umgang miteinander',
          'Keine Werbung oder Spam',
          'Persönliche Erfahrungen sind willkommen'
        ],
        activities: [],
        resources: []
      },
      {
        id: 'mental_health_support',
        name: 'Mental Health Support',
        description: 'Sicherer Raum für Austausch über mentale Gesundheit',
        category: 'mental_health',
        privacy: 'private',
        memberCount: 89,
        moderators: ['therapist1', 'counselor1'],
        rules: [
          'Vertraulichkeit wird respektiert',
          'Professionelle Unterstützung wird gefördert',
          'Trigger-Warnungen verwenden'
        ],
        activities: [],
        resources: []
      },
      {
        id: 'creative_flow',
        name: 'Kreativer Flow',
        description: 'Kreativität als Weg zum Wohlbefinden entdecken',
        category: 'creativity',
        privacy: 'public',
        memberCount: 156,
        moderators: ['artist1'],
        rules: [
          'Alle Kunstformen willkommen',
          'Konstruktives Feedback',
          'Inspiration teilen'
        ],
        activities: [],
        resources: []
      }
    ];
    setGroups(exampleGroups);
  };

  const tabs = [
    { id: 'feed', name: 'Community Feed', icon: '🌟', color: 'from-blue-500 to-purple-600' },
    { id: 'groups', name: 'Gruppen', icon: '👥', color: 'from-green-500 to-teal-600' },
    { id: 'privacy', name: 'Privatsphäre', icon: '🔒', color: 'from-purple-500 to-pink-600' },
    { id: 'safety', name: 'Sicherheit', icon: '🛡️', color: 'from-orange-500 to-red-600' }
  ];

  const postTypes = [
    { type: 'achievement', name: 'Erfolg teilen', icon: '🏆', color: 'from-yellow-500 to-orange-600' },
    { type: 'question', name: 'Frage stellen', icon: '❓', color: 'from-blue-500 to-cyan-600' },
    { type: 'insight', name: 'Erkenntnis', icon: '💡', color: 'from-purple-500 to-indigo-600' },
    { type: 'support', name: 'Unterstützung', icon: '🤗', color: 'from-green-500 to-emerald-600' }
  ];

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Gerade eben';
    if (diffHours < 24) return `vor ${diffHours} Stunden`;
    return `vor ${Math.floor(diffHours / 24)} Tagen`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border-b border-white/20 p-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">🌍 Wellness Community</h1>
              <p className="text-purple-200">Verbinde dich, teile deine Reise und wachse gemeinsam</p>
            </div>
            
            {/* Privacy Mode Toggle */}
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-sm text-purple-200 mb-2">Modus:</div>
                <div className="flex rounded-lg bg-white/20 p-1">
                  <button
                    onClick={() => setPrivacyMode('public')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      privacyMode === 'public'
                        ? 'bg-white text-gray-800'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    🌍 Öffentlich
                  </button>
                  <button
                    onClick={() => setPrivacyMode('private')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      privacyMode === 'private'
                        ? 'bg-white text-gray-800'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    🔒 Privat
                  </button>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNewPost(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-xl font-bold shadow-lg"
              >
                ✍️ Beitrag verfassen
              </motion.button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-800'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {privacyMode === 'private' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-700 p-6 rounded-2xl"
                >
                  <h3 className="text-xl font-bold mb-2">🔒 Privater Modus aktiviert</h3>
                  <p className="text-purple-100">
                    Im privaten Modus siehst du nur deine eigenen Beiträge und Interaktionen. 
                    Wechsle zum öffentlichen Modus, um die Community zu erkunden.
                  </p>
                </motion.div>
              )}

              {/* Community Feed */}
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
                          {post.isAnonymous ? '?' : 'U'}
                        </div>
                        <div>
                          <h4 className="font-bold">
                            {post.isAnonymous ? 'Anonymer Nutzer' : `Nutzer ${post.authorId}`}
                          </h4>
                          <p className="text-sm text-purple-300">{formatTimeAgo(post.timestamp)}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        post.type === 'achievement' ? 'bg-yellow-500' :
                        post.type === 'question' ? 'bg-blue-500' :
                        post.type === 'insight' ? 'bg-purple-500' :
                        'bg-green-500'
                      }`}>
                        {post.type === 'achievement' ? '🏆 Erfolg' :
                         post.type === 'question' ? '❓ Frage' :
                         post.type === 'insight' ? '💡 Erkenntnis' :
                         '🤗 Unterstützung'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="text-purple-100 mb-4 leading-relaxed">{post.content}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Reactions */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        {post.reactions.map((reaction, i) => (
                          <button
                            key={i}
                            className="flex items-center space-x-1 px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                          >
                            <span>
                              {reaction.type === 'heart' ? '❤️' :
                               reaction.type === 'clap' ? '👏' :
                               reaction.type === 'wow' ? '😮' :
                               reaction.type === 'hug' ? '🤗' : '⭐'}
                            </span>
                            <span className="text-sm">{reaction.count}</span>
                          </button>
                        ))}
                      </div>
                      <button className="text-sm text-purple-300 hover:text-white transition-colors">
                        💬 Kommentieren
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'groups' && (
            <motion.div
              key="groups"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6">🏘️ Wellness-Gruppen</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groups.map((group, index) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-xl hover:scale-105 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold">{group.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          group.privacy === 'public' ? 'bg-green-500' :
                          group.privacy === 'private' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}>
                          {group.privacy === 'public' ? '🌍 Öffentlich' :
                           group.privacy === 'private' ? '🔒 Privat' : '📧 Einladung'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-purple-100 mb-4">{group.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <div className="text-purple-200">👥 {group.memberCount} Mitglieder</div>
                          <div className="text-purple-300 capitalize">{group.category.replace('_', ' ')}</div>
                        </div>
                        <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                          Beitreten
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <button className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all">
                    + Neue Gruppe erstellen
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6">🔒 Privatsphäre-Einstellungen</h3>
                
                <div className="space-y-6">
                  <div className="bg-blue-500/20 p-4 rounded-xl">
                    <h4 className="font-bold mb-2">🛡️ Datenschutz-Prinzipien</h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Alle persönlichen Daten bleiben auf deinem Gerät</li>
                      <li>• Du entscheidest, was geteilt wird</li>
                      <li>• Anonyme Teilnahme ist immer möglich</li>
                      <li>• Keine Daten-Verkäufe an Dritte</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold">👤 Profil-Sichtbarkeit</h4>
                      {[
                        { label: 'Profil öffentlich', key: 'profile' },
                        { label: 'Aktivitäten sichtbar', key: 'activities' },
                        { label: 'Erfolge zeigen', key: 'achievements' }
                      ].map((setting) => (
                        <div key={setting.key} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                          <span>{setting.label}</span>
                          <div className="flex rounded-lg bg-white/20 p-1">
                            {['Privat', 'Freunde', 'Öffentlich'].map((option) => (
                              <button
                                key={option}
                                className="px-3 py-1 rounded text-xs hover:bg-white/20 transition-all"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-bold">📊 Datennutzung</h4>
                      {[
                        { label: 'Anonyme Analytics', desc: 'Hilft bei der Verbesserung der App' },
                        { label: 'Personalisierung', desc: 'Bessere Empfehlungen basierend auf Nutzung' },
                        { label: 'Forschung', desc: 'Anonyme Daten für Wellness-Forschung' }
                      ].map((setting, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                          <div>
                            <div className="font-medium">{setting.label}</div>
                            <div className="text-xs text-purple-300">{setting.desc}</div>
                          </div>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'safety' && (
            <motion.div
              key="safety"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6">🛡️ Sicherheit & Wohlbefinden</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4">🚨 Melden & Blockieren</h4>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-left hover:bg-red-500/30 transition-all">
                        <div className="font-medium">Unangemessenen Inhalt melden</div>
                        <div className="text-sm text-red-200">Spam, Belästigung oder schädliche Inhalte</div>
                      </button>
                      <button className="w-full p-3 bg-orange-500/20 border border-orange-500/50 rounded-lg text-left hover:bg-orange-500/30 transition-all">
                        <div className="font-medium">Nutzer blockieren</div>
                        <div className="text-sm text-orange-200">Verhindert zukünftige Interaktionen</div>
                      </button>
                      <button className="w-full p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-left hover:bg-blue-500/30 transition-all">
                        <div className="font-medium">Hilfe suchen</div>
                        <div className="text-sm text-blue-200">Professionelle Unterstützung finden</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-4">💚 Community-Richtlinien</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-green-500/20 rounded-lg">
                        <div className="font-medium mb-1">✓ Respektvoller Umgang</div>
                        <div className="text-green-200">Behandle andere so, wie du behandelt werden möchtest</div>
                      </div>
                      <div className="p-3 bg-green-500/20 rounded-lg">
                        <div className="font-medium mb-1">✓ Unterstützung & Ermutigung</div>
                        <div className="text-green-200">Teile positive Energie und hilfreiche Inhalte</div>
                      </div>
                      <div className="p-3 bg-green-500/20 rounded-lg">
                        <div className="font-medium mb-1">✓ Wissenschaftlich fundiert</div>
                        <div className="text-green-200">Belege Gesundheitsaussagen mit Quellen</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-xl">
                  <h5 className="font-bold mb-2">⚠️ Wichtiger Hinweis</h5>
                  <p className="text-sm text-yellow-200">
                    Diese Community ersetzt keine professionelle medizinische oder psychologische Beratung. 
                    Bei ernsthaften gesundheitlichen Problemen wende dich an qualifizierte Fachkräfte.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewPost(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-gradient-to-br from-slate-800 to-purple-800 max-w-2xl w-full rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-white mb-6">✍️ Neuer Beitrag</h2>
              
              <div className="space-y-6">
                {/* Post Type Selection */}
                <div>
                  <label className="block text-purple-200 mb-3">Art des Beitrags</label>
                  <div className="grid grid-cols-2 gap-3">
                    {postTypes.map((type) => (
                      <button
                        key={type.type}
                        className={`p-4 rounded-xl transition-all bg-gradient-to-r ${type.color} hover:scale-105`}
                      >
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="font-medium">{type.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Anonymous Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                  <div>
                    <div className="font-medium">Anonym posten</div>
                    <div className="text-sm text-purple-300">Dein Name wird nicht angezeigt</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                  </button>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-purple-200 mb-2">Titel</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-purple-300 border border-white/20 focus:border-white/40 focus:outline-none"
                    placeholder="Worum geht es in deinem Beitrag?"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Inhalt</label>
                  <textarea
                    className="w-full h-32 p-3 rounded-xl bg-white/10 text-white placeholder-purple-300 border border-white/20 focus:border-white/40 focus:outline-none resize-none"
                    placeholder="Teile deine Gedanken, Erfahrungen oder Fragen..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowNewPost(false)}
                    className="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-xl font-bold transition-all"
                  >
                    Abbrechen
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 rounded-xl font-bold transition-all">
                    Veröffentlichen
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
