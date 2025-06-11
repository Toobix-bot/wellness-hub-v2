'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Story {
  id: string;
  title: string;
  content: string;
  author: string;
  category: 'transformation' | 'herausforderung' | 'dankbarkeit' | 'liebe' | 'heilung' | 'inspiration';
  tags: string[];
  emotion: string;
  date: string;
  isPublic: boolean;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  supportEmoji: string;
}

interface StoryPrompt {
  id: string;
  prompt: string;
  category: string;
  icon: string;
}

export default function GeschichtenErzaehlungenPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'write' | 'prompts' | 'myStories'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('alle');
  const [showStoryModal, setShowStoryModal] = useState<Story | null>(null);
  const [newStory, setNewStory] = useState({
    title: '',
    content: '',
    author: 'Anonym',
    category: 'transformation' as Story['category'],
    tags: [] as string[],
    emotion: '',
    isPublic: false
  });
  const [currentTag, setCurrentTag] = useState('');

  // Story-Prompts für Inspiration
  const storyPrompts: StoryPrompt[] = [
    {
      id: '1',
      prompt: 'Erzähle von einem Moment, in dem du über dich selbst hinausgewachsen bist',
      category: 'transformation',
      icon: '🦋'
    },
    {
      id: '2',
      prompt: 'Beschreibe eine Zeit, in der dir ein Fremder unerwartet Freundlichkeit gezeigt hat',
      category: 'dankbarkeit',
      icon: '🙏'
    },
    {
      id: '3',
      prompt: 'Erzähle von einem Moment, in dem du echte, bedingungslose Liebe erfahren hast',
      category: 'liebe',
      icon: '💕'
    },
    {
      id: '4',
      prompt: 'Beschreibe deine größte Herausforderung und wie sie dich stärker gemacht hat',
      category: 'herausforderung',
      icon: '💪'
    },
    {
      id: '5',
      prompt: 'Erzähle von einem Moment tiefer innerer Ruhe und Frieden',
      category: 'heilung',
      icon: '🕊️'
    },
    {
      id: '6',
      prompt: 'Beschreibe einen Augenblick, der deine Perspektive für immer verändert hat',
      category: 'inspiration',
      icon: '✨'
    },
    {
      id: '7',
      prompt: 'Erzähle von einem Zeitpunkt, an dem du dich vollkommen lebendig gefühlt hast',
      category: 'inspiration',
      icon: '🌟'
    },
    {
      id: '8',
      prompt: 'Beschreibe einen Moment der Vergebung - dir selbst oder anderen gegenüber',
      category: 'heilung',
      icon: '🤝'
    },
    {
      id: '9',
      prompt: 'Erzähle von einer Zeit, in der du wahre Dankbarkeit für das Leben empfunden hast',
      category: 'dankbarkeit',
      icon: '🌺'
    },
    {
      id: '10',
      prompt: 'Beschreibe den Moment, in dem du erkannt hast, wer du wirklich bist',
      category: 'transformation',
      icon: '🔍'
    }
  ];

  // Beispiel-Geschichten
  const exampleStories: Story[] = [
    {
      id: '1',
      title: 'Der Moment, als ich lernte loszulassen',
      content: 'Jahrelang hielt ich an einer toxischen Freundschaft fest, weil ich Angst vor der Einsamkeit hatte. Bis zu dem Tag, als ich erkannte, dass wahre Einsamkeit nicht bedeutet, allein zu sein, sondern sich in Gesellschaft von Menschen zu befinden, die einen nicht verstehen oder wertschätzen. Als ich den Mut fasste, diese Beziehung zu beenden, öffnete sich plötzlich Raum in meinem Leben für Menschen, die mich wirklich sehen und lieben. Manchmal ist Loslassen der erste Schritt zur wahren Verbindung.',
      author: 'Sarah M.',
      category: 'transformation',
      tags: ['loslassen', 'freundschaft', 'mut', 'selbstliebe'],
      emotion: 'befreit',
      date: new Date().toISOString(),
      isPublic: true,
      likes: 23,
      comments: [
        {
          id: '1',
          author: 'Maria K.',
          content: 'Danke fürs Teilen! Das hat mir geholfen zu verstehen, was ich gerade durchmache.',
          date: new Date().toISOString(),
          supportEmoji: '🤗'
        }
      ]
    },
    {
      id: '2',
      title: 'Die Kraft der kleinen Dankbarkeit',
      content: 'Es war ein grauer Dienstag und ich fühlte mich innerlich genauso grau. Auf dem Weg zur Arbeit bemerkte ich eine kleine Blume, die durch einen Riss im Gehweg gewachsen war. In diesem Moment realisierte ich: Wenn diese winzige Blume es schafft, durch Beton zu wachsen und zu blühen, dann kann ich auch durch meine schwierigen Zeiten wachsen. Seitdem sammle ich täglich solche kleinen Wunder - und mein Leben fühlt sich reicher an.',
      author: 'Alex D.',
      category: 'dankbarkeit',
      tags: ['dankbarkeit', 'achtsamkeit', 'natur', 'perspektive'],
      emotion: 'dankbar',
      date: new Date().toISOString(),
      isPublic: true,
      likes: 31,
      comments: []
    },
    {
      id: '3',
      title: 'Liebe finden, indem ich mich selbst fand',
      content: 'Ich suchte jahrelang in anderen Menschen nach der Liebe, die ich mir selbst nicht geben konnte. Durch Meditation und Selbstreflexion lernte ich, mich selbst mit den Augen eines liebenden Freundes zu betrachten. Als ich aufhörte, Liebe von außen zu erwarten, und anfing, sie in mir zu kultivieren, zog ich plötzlich Menschen in mein Leben, die diese Selbstliebe widerspiegelten. Die größte Liebesgeschichte meines Lebens begann mit mir selbst.',
      author: 'Jennifer L.',
      category: 'liebe',
      tags: ['selbstliebe', 'meditation', 'beziehungen', 'heilung'],
      emotion: 'liebevoll',
      date: new Date().toISOString(),
      isPublic: true,
      likes: 45,
      comments: [
        {
          id: '2',
          author: 'Thomas R.',
          content: 'Wunderschön geschrieben. Das inspiriert mich sehr.',
          date: new Date().toISOString(),
          supportEmoji: '💝'
        }
      ]
    }
  ];

  // Kategorien für Filter
  const categories = [
    { id: 'alle', name: 'Alle Geschichten', icon: '📚', color: 'from-purple-500 to-pink-600' },
    { id: 'transformation', name: 'Transformation', icon: '🦋', color: 'from-blue-500 to-purple-600' },
    { id: 'herausforderung', name: 'Herausforderungen', icon: '💪', color: 'from-red-500 to-orange-600' },
    { id: 'dankbarkeit', name: 'Dankbarkeit', icon: '🙏', color: 'from-green-500 to-teal-600' },
    { id: 'liebe', name: 'Liebe', icon: '💕', color: 'from-pink-500 to-rose-600' },
    { id: 'heilung', name: 'Heilung', icon: '🕊️', color: 'from-indigo-500 to-blue-600' },
    { id: 'inspiration', name: 'Inspiration', icon: '✨', color: 'from-yellow-500 to-orange-600' }
  ];

  useEffect(() => {
    // Lade gespeicherte Geschichten
    const savedStories = localStorage.getItem('userStories');
    if (savedStories) {
      setStories([...exampleStories, ...JSON.parse(savedStories)]);
    } else {
      setStories(exampleStories);
    }
  }, []);

  const saveStory = () => {
    if (!newStory.title || !newStory.content) return;

    const story: Story = {
      id: Date.now().toString(),
      title: newStory.title,
      content: newStory.content,
      author: newStory.author,
      category: newStory.category,
      tags: newStory.tags,
      emotion: newStory.emotion,
      date: new Date().toISOString(),
      isPublic: newStory.isPublic,
      likes: 0,
      comments: []
    };

    const userStories = stories.filter(s => !exampleStories.find(ex => ex.id === s.id));
    const updatedUserStories = [...userStories, story];
    
    localStorage.setItem('userStories', JSON.stringify(updatedUserStories));
    setStories([...exampleStories, ...updatedUserStories]);
    
    // Reset form
    setNewStory({
      title: '',
      content: '',
      author: 'Anonym',
      category: 'transformation',
      tags: [],
      emotion: '',
      isPublic: false
    });
    
    setActiveTab('browse');
  };

  const addTag = () => {
    if (currentTag && !newStory.tags.includes(currentTag)) {
      setNewStory(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewStory(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const likeStory = (storyId: string) => {
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, likes: story.likes + 1 }
        : story
    ));
  };

  const filteredStories = selectedCategory === 'alle' 
    ? stories.filter(story => story.isPublic)
    : stories.filter(story => story.category === selectedCategory && story.isPublic);

  const myStories = stories.filter(story => 
    !exampleStories.find(ex => ex.id === story.id)
  );

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.icon || '📖';
  };

  const renderBrowseTab = () => (
    <div className="space-y-8">
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

      {/* Geschichten-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setShowStoryModal(story)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(story.category)} text-white rounded-full text-sm font-medium`}>
                  {getCategoryIcon(story.category)} {story.category}
                </span>
                {story.emotion && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                    {story.emotion}
                  </span>
                )}
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-3">
                {story.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                {story.content.substring(0, 150)}...
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>von {story.author}</span>
                <div className="flex items-center space-x-3">
                  <span>❤️ {story.likes}</span>
                  <span>💬 {story.comments.length}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  const renderWriteTab = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          ✍️ Deine Geschichte schreiben
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Titel deiner Geschichte:
            </label>
            <input
              type="text"
              value={newStory.title}
              onChange={(e) => setNewStory(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="z.B. Der Tag, der alles veränderte..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kategorie:
              </label>
              <select
                value={newStory.category}
                onChange={(e) => setNewStory(prev => ({ ...prev, category: e.target.value as Story['category'] }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="transformation">Transformation</option>
                <option value="herausforderung">Herausforderung</option>
                <option value="dankbarkeit">Dankbarkeit</option>
                <option value="liebe">Liebe</option>
                <option value="heilung">Heilung</option>
                <option value="inspiration">Inspiration</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autor/in (optional):
              </label>
              <input
                type="text"
                value={newStory.author}
                onChange={(e) => setNewStory(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Dein Name oder 'Anonym'"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deine Geschichte:
            </label>
            <textarea
              value={newStory.content}
              onChange={(e) => setNewStory(prev => ({ ...prev, content: e.target.value }))}
              className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Erzähle deine Geschichte hier... Sei authentisch und teile, was du möchtest. Jede Geschichte kann jemand anderem helfen."
            />
            <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
              {newStory.content.length} Zeichen
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags (Schlagwörter):
            </label>
            <div className="flex items-center space-x-2 mb-3">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Tag hinzufügen..."
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
              >
                Hinzufügen
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newStory.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>#{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-purple-500 hover:text-purple-700 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Aktuelle Emotion (optional):
              </label>
              <select
                value={newStory.emotion}
                onChange={(e) => setNewStory(prev => ({ ...prev, emotion: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Keine Angabe</option>
                <option value="dankbar">Dankbar</option>
                <option value="hoffnungsvoll">Hoffnungsvoll</option>
                <option value="befreit">Befreit</option>
                <option value="inspiriert">Inspiriert</option>
                <option value="friedlich">Friedlich</option>
                <option value="liebevoll">Liebevoll</option>
                <option value="stark">Stark</option>
                <option value="nachdenklich">Nachdenklich</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newStory.isPublic}
                  onChange={(e) => setNewStory(prev => ({ ...prev, isPublic: e.target.checked }))}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Geschichte öffentlich teilen
                </span>
              </label>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={saveStory}
              disabled={!newStory.title || !newStory.content}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Geschichte speichern
            </button>
            <button
              onClick={() => setNewStory({
                title: '',
                content: '',
                author: 'Anonym',
                category: 'transformation',
                tags: [],
                emotion: '',
                isPublic: false
              })}
              className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              Zurücksetzen
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPromptsTab = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          ✨ Schreibimpulse für deine Geschichten
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Manchmal brauchen wir einen kleinen Impuls, um unsere Geschichten zu entdecken. 
          Wähle einen Schreibimpuls und lass deine Erinnerungen fließen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {storyPrompts.map((prompt) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{prompt.icon}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(prompt.category)} text-white rounded-full text-sm font-medium capitalize`}>
                    {prompt.category}
                  </span>
                </div>
                <p className="text-gray-800 dark:text-white font-medium text-lg mb-4">
                  {prompt.prompt}
                </p>
                <button
                  onClick={() => {
                    setNewStory(prev => ({
                      ...prev,
                      title: prompt.prompt.substring(0, 50) + '...',
                      category: prompt.category as Story['category']
                    }));
                    setActiveTab('write');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
                >
                  Geschichte schreiben
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderMyStoriesTab = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          📚 Meine Geschichten ({myStories.length})
        </h3>
        <button
          onClick={() => setActiveTab('write')}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
        >
          Neue Geschichte
        </button>
      </div>

      {myStories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h4 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Noch keine Geschichten geschrieben
          </h4>
          <p className="text-gray-500 dark:text-gray-500 mb-6">
            Beginne deine Reise des Erzählens und teile deine Erfahrungen
          </p>
          <button
            onClick={() => setActiveTab('write')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
          >
            Erste Geschichte schreiben
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myStories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(story.category)} text-white rounded-full text-sm font-medium`}>
                  {getCategoryIcon(story.category)} {story.category}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  story.isPublic 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
                }`}>
                  {story.isPublic ? 'Öffentlich' : 'Privat'}
                </span>
              </div>
              
              <h4 className="font-bold text-lg text-gray-800 dark:text-white mb-3">
                {story.title}
              </h4>
              
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                {story.content.substring(0, 150)}...
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(story.date).toLocaleDateString('de-DE')}</span>
                {story.isPublic && (
                  <div className="flex items-center space-x-3">
                    <span>❤️ {story.likes}</span>
                    <span>💬 {story.comments.length}</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setShowStoryModal(story)}
                className="mt-3 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Vollständig lesen
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  // Story Modal
  const StoryModal = ({ story, onClose }: { story: Story; onClose: () => void }) => (
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
          <div className="flex items-center space-x-3">
            <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(story.category)} text-white rounded-full font-medium`}>
              {getCategoryIcon(story.category)} {story.category}
            </span>
            {story.emotion && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                {story.emotion}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {story.title}
        </h2>
        
        <div className="flex items-center justify-between mb-6 text-sm text-gray-500 dark:text-gray-400">
          <span>von {story.author}</span>
          <span>{new Date(story.date).toLocaleDateString('de-DE')}</span>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {story.content}
          </p>
        </div>
        
        {story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => likeStory(story.id)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              <span>❤️</span>
              <span>{story.likes}</span>
            </button>
            <span className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <span>💬</span>
              <span>{story.comments.length} Kommentare</span>
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all"
          >
            Schließen
          </button>
        </div>
      </motion.div>
    </motion.div>
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
            Geschichten & Erzählungen
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Teile deine Erfahrungen, inspiriere andere und finde Verbindung durch die Kraft des Erzählens
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2">
          {[
            { id: 'browse', label: 'Geschichten entdecken', icon: '🔍' },
            { id: 'write', label: 'Geschichte schreiben', icon: '✍️' },
            { id: 'prompts', label: 'Schreibimpulse', icon: '✨' },
            { id: 'myStories', label: 'Meine Geschichten', icon: '📚' }
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
          {activeTab === 'browse' && renderBrowseTab()}
          {activeTab === 'write' && renderWriteTab()}
          {activeTab === 'prompts' && renderPromptsTab()}
          {activeTab === 'myStories' && renderMyStoriesTab()}
        </motion.div>

        {/* Story Modal */}
        <AnimatePresence>
          {showStoryModal && (
            <StoryModal 
              story={showStoryModal} 
              onClose={() => setShowStoryModal(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
