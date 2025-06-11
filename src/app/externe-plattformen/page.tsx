'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  LinkIcon,
  StarIcon,
  MagnifyingGlassIcon,
  TagIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  FolderIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  MusicalNoteIcon,
  GameController2Icon,
  CameraIcon,
  PaintBrushIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

interface ExternalPlatform {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  subcategory: string;
  rating: number;
  userCount?: string;
  features: string[];
  advantages: string[];
  disadvantages?: string[];
  cost: 'kostenlos' | 'freemium' | 'kostenpflichtig';
  platforms: ('web' | 'ios' | 'android' | 'desktop')[];
  tags: string[];
  recommendedFor: string[];
  icon: string;
  color: string;
  lastUpdated: string;
  verified: boolean;
}

const platformCategories = [
  {
    id: 'wellness',
    name: 'Wellness & Gesundheit',
    icon: HeartIcon,
    color: 'rose',
    subcategories: ['Meditation', 'Fitness', 'Ernährung', 'Mental Health', 'Schlaf', 'Therapie']
  },
  {
    id: 'education',
    name: 'Bildung & Lernen',
    icon: AcademicCapIcon,
    color: 'blue',
    subcategories: ['Programmierung', 'Sprachen', 'Wissenschaft', 'Kreativität', 'Business', 'Persönlichkeitsentwicklung']
  },
  {
    id: 'entertainment',
    name: 'Unterhaltung & Medien',
    icon: MusicalNoteIcon,
    color: 'purple',
    subcategories: ['Musik', 'Videos', 'Gaming', 'Podcasts', 'Bücher', 'Streaming']
  },
  {
    id: 'social',
    name: 'Soziale Netzwerke',
    icon: UserGroupIcon,
    color: 'green',
    subcategories: ['Community', 'Dating', 'Familie', 'Beruf', 'Hobbys', 'Spiritualität']
  },
  {
    id: 'productivity',
    name: 'Produktivität & Tools',
    icon: ComputerDesktopIcon,
    color: 'orange',
    subcategories: ['Projektmanagement', 'Notizen', 'Zeitmanagement', 'Design', 'Kommunikation', 'Finanzen']
  },
  {
    id: 'creative',
    name: 'Kreativ & Kunst',
    icon: PaintBrushIcon,
    color: 'indigo',
    subcategories: ['Fotografie', 'Design', 'Musik', 'Schreiben', 'Video', 'Handwerk']
  }
];

const externalPlatforms: ExternalPlatform[] = [
  // Wellness & Gesundheit
  {
    id: 'headspace',
    name: 'Headspace',
    description: 'Führende Meditations- und Achtsamkeits-App mit strukturierten Programmen',
    url: 'https://headspace.com',
    category: 'wellness',
    subcategory: 'Meditation',
    rating: 4.8,
    userCount: '100M+',
    features: ['Geführte Meditationen', 'Schlafgeschichten', 'Fokus-Musik', 'SOS-Übungen'],
    advantages: ['Benutzerfreundlich', 'Wissenschaftlich fundiert', 'Große Auswahl'],
    disadvantages: ['Kostenpflichtige Premium-Features'],
    cost: 'freemium',
    platforms: ['web', 'ios', 'android'],
    tags: ['meditation', 'achtsamkeit', 'schlaf', 'stress'],
    recommendedFor: ['Anfänger', 'Berufstätige', 'Studenten'],
    icon: '🧘‍♀️',
    color: 'orange',
    lastUpdated: '2024-01-15',
    verified: true
  },
  {
    id: 'calm',
    name: 'Calm',
    description: 'Preisgekrönte App für Meditation, Schlaf und Entspannung',
    url: 'https://calm.com',
    category: 'wellness',
    subcategory: 'Meditation',
    rating: 4.7,
    userCount: '50M+',
    features: ['Daily Calm', 'Masterclasses', 'Naturgeräusche', 'Bewegungsübungen'],
    advantages: ['Hochwertige Inhalte', 'Berühmte Sprecher', 'Vielfältige Programme'],
    cost: 'freemium',
    platforms: ['web', 'ios', 'android'],
    tags: ['meditation', 'schlaf', 'entspannung', 'angst'],
    recommendedFor: ['Alle Altersgruppen', 'Schlafprobleme', 'Stressabbau'],
    icon: '🌊',
    color: 'blue',
    lastUpdated: '2024-01-12',
    verified: true
  },
  {
    id: 'myfitnesspal',
    name: 'MyFitnessPal',
    description: 'Umfassende App für Kalorienzählung und Ernährungstracking',
    url: 'https://myfitnesspal.com',
    category: 'wellness',
    subcategory: 'Ernährung',
    rating: 4.5,
    userCount: '200M+',
    features: ['Kalorienzähler', 'Barcode-Scanner', 'Rezepte', 'Trainingstracker'],
    advantages: ['Große Lebensmitteldatenbank', 'Community-Support', 'Integration mit Fitness-Apps'],
    cost: 'freemium',
    platforms: ['web', 'ios', 'android'],
    tags: ['ernährung', 'kalorien', 'fitness', 'abnehmen'],
    recommendedFor: ['Gewichtsmanagement', 'Sportler', 'Gesundheitsbewusste'],
    icon: '🥗',
    color: 'green',
    lastUpdated: '2024-01-10',
    verified: true
  },

  // Bildung & Lernen
  {
    id: 'duolingo',
    name: 'Duolingo',
    description: 'Spielerisches Sprachenlernen mit über 40 Sprachen',
    url: 'https://duolingo.com',
    category: 'education',
    subcategory: 'Sprachen',
    rating: 4.6,
    userCount: '500M+',
    features: ['Gamification', 'Sprach-KI', 'Stories', 'Podcasts'],
    advantages: ['Kostenlos', 'Motivierend', 'Wissenschaftlich basiert'],
    cost: 'freemium',
    platforms: ['web', 'ios', 'android'],
    tags: ['sprachen', 'lernen', 'gamification', 'kostenlos'],
    recommendedFor: ['Sprachanfänger', 'Selbstlerner', 'Reisende'],
    icon: '🦜',
    color: 'green',
    lastUpdated: '2024-01-14',
    verified: true
  },
  {
    id: 'codecademy',
    name: 'Codecademy',
    description: 'Interaktive Plattform zum Programmieren lernen',
    url: 'https://codecademy.com',
    category: 'education',
    subcategory: 'Programmierung',
    rating: 4.4,
    userCount: '45M+',
    features: ['Hands-on Coding', 'Projekte', 'Zertifikate', 'Career Paths'],
    advantages: ['Praxisorientiert', 'Strukturierte Kurse', 'Community'],
    cost: 'freemium',
    platforms: ['web'],
    tags: ['programmierung', 'coding', 'webentwicklung', 'python'],
    recommendedFor: ['Programmier-Anfänger', 'Karrierewechsler', 'Entwickler'],
    icon: '💻',
    color: 'blue',
    lastUpdated: '2024-01-11',
    verified: true
  },

  // Unterhaltung & Medien
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Führender Musik-Streaming-Dienst mit Podcasts und Playlists',
    url: 'https://spotify.com',
    category: 'entertainment',
    subcategory: 'Musik',
    rating: 4.5,
    userCount: '500M+',
    features: ['Musik streaming', 'Podcasts', 'Personalisierte Playlists', 'Offline-Modus'],
    advantages: ['Riesige Musikbibliothek', 'Gute Empfehlungen', 'Soziale Features'],
    cost: 'freemium',
    platforms: ['web', 'ios', 'android', 'desktop'],
    tags: ['musik', 'podcasts', 'streaming', 'playlists'],
    recommendedFor: ['Musikliebhaber', 'Podcast-Fans', 'Alle Altersgruppen'],
    icon: '🎵',
    color: 'green',
    lastUpdated: '2024-01-13',
    verified: true
  },

  // Soziale Netzwerke
  {
    id: 'discord',
    name: 'Discord',
    description: 'Kommunikationsplattform für Communities und Gaming',
    url: 'https://discord.com',
    category: 'social',
    subcategory: 'Community',
    rating: 4.3,
    userCount: '150M+',
    features: ['Voice/Video Chat', 'Text Channels', 'Screen Sharing', 'Bots'],
    advantages: ['Kostenlos', 'Vielseitig', 'Gute Audioqualität'],
    cost: 'freemium',
    platforms: ['web', 'ios', 'android', 'desktop'],
    tags: ['chat', 'community', 'gaming', 'voice'],
    recommendedFor: ['Gamer', 'Communities', 'Online-Teams'],
    icon: '🎮',
    color: 'indigo',
    lastUpdated: '2024-01-09',
    verified: true
  },

  // Produktivität
  {
    id: 'notion',
    name: 'Notion',
    description: 'All-in-One Workspace für Notizen, Projekte und Zusammenarbeit',
    url: 'https://notion.so',
    category: 'productivity',
    subcategory: 'Notizen',
    rating: 4.7,
    userCount: '30M+',
    features: ['Datenbanken', 'Templates', 'Collaboration', 'Web Clipper'],
    advantages: ['Sehr flexibel', 'Schönes Design', 'Starke Community'],
    cost: 'freemium',
    platforms: ['web', 'ios', 'android', 'desktop'],
    tags: ['notizen', 'produktivität', 'datenbank', 'organisation'],
    recommendedFor: ['Studenten', 'Teams', 'Kreative', 'Unternehmer'],
    icon: '📝',
    color: 'gray',
    lastUpdated: '2024-01-08',
    verified: true
  }
];

export default function ExterneLinkSammlung() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'userCount'>('rating');
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredPlatforms = externalPlatforms
    .filter(platform => {
      if (selectedCategory !== 'all' && platform.category !== selectedCategory) return false;
      if (selectedSubcategory !== 'all' && platform.subcategory !== selectedSubcategory) return false;
      if (searchTerm && !platform.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !platform.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !platform.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'userCount':
          // Einfache numerische Sortierung basierend auf userCount
          const aCount = a.userCount ? parseInt(a.userCount.replace(/[^\d]/g, '')) : 0;
          const bCount = b.userCount ? parseInt(b.userCount.replace(/[^\d]/g, '')) : 0;
          return bCount - aCount;
        default:
          return 0;
      }
    });

  const currentCategory = platformCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeftIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Externe Plattformen
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Discover und verwalte nützliche Online-Plattformen und Tools
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Plattformen durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory('all');
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Alle Kategorien</option>
              {platformCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Subcategory Filter */}
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              disabled={selectedCategory === 'all'}
            >
              <option value="all">Alle Unterkategorien</option>
              {currentCategory?.subcategories.map(subcategory => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="rating">Nach Bewertung</option>
              <option value="name">Nach Name</option>
              <option value="userCount">Nach Nutzerzahl</option>
            </select>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
            <span>📊 {filteredPlatforms.length} Plattformen gefunden</span>
            <span>⭐ Ø {(filteredPlatforms.reduce((sum, p) => sum + p.rating, 0) / filteredPlatforms.length).toFixed(1)} Sterne</span>
            <span>✅ {filteredPlatforms.filter(p => p.verified).length} verifiziert</span>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {platformCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedSubcategory('all');
              }}
              className={`p-4 rounded-xl transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-${category.color}-100 border-2 border-${category.color}-300 dark:bg-${category.color}-900`
                  : 'bg-white dark:bg-gray-800 border-2 border-transparent hover:border-gray-200'
              } shadow-lg hover:shadow-xl`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className={`h-8 w-8 mx-auto mb-2 ${
                selectedCategory === category.id 
                  ? `text-${category.color}-600` 
                  : 'text-gray-600 dark:text-gray-400'
              }`} />
              <div className={`text-sm font-medium ${
                selectedCategory === category.id 
                  ? `text-${category.color}-800 dark:text-${category.color}-200` 
                  : 'text-gray-800 dark:text-white'
              }`}>
                {category.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {externalPlatforms.filter(p => p.category === category.id).length}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlatforms.map((platform) => (
            <motion.div
              key={platform.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{platform.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {platform.name}
                      {platform.verified && (
                        <span className="ml-2 text-blue-500 text-sm">✓</span>
                      )}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(platform.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                          {platform.rating}
                        </span>
                      </div>
                      {platform.userCount && (
                        <span className="text-sm text-gray-500">
                          {platform.userCount} Nutzer
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <HeartIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {platform.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {platform.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 text-xs rounded-full bg-${platform.color}-100 text-${platform.color}-700 dark:bg-${platform.color}-900 dark:text-${platform.color}-300`}
                  >
                    {tag}
                  </span>
                ))}
                {platform.tags.length > 4 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    +{platform.tags.length - 4}
                  </span>
                )}
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                  Key Features:
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {platform.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Platforms and Cost */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  {platform.platforms.includes('web') && (
                    <GlobeAltIcon className="h-5 w-5 text-blue-500" title="Web" />
                  )}
                  {platform.platforms.includes('ios') && (
                    <DevicePhoneMobileIcon className="h-5 w-5 text-gray-600" title="iOS" />
                  )}
                  {platform.platforms.includes('android') && (
                    <DevicePhoneMobileIcon className="h-5 w-5 text-green-500" title="Android" />
                  )}
                  {platform.platforms.includes('desktop') && (
                    <ComputerDesktopIcon className="h-5 w-5 text-purple-500" title="Desktop" />
                  )}
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  platform.cost === 'kostenlos' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : platform.cost === 'freemium'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                }`}>
                  {platform.cost}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 px-4 py-2 bg-${platform.color}-600 text-white rounded-lg hover:bg-${platform.color}-700 transition-colors text-center text-sm font-medium`}
                >
                  <LinkIcon className="h-4 w-4 inline mr-2" />
                  Besuchen
                </a>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                  <EyeIcon className="h-4 w-4 inline mr-2" />
                  Details
                </button>
              </div>

              {/* Last Updated */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <span className="text-xs text-gray-500">
                  Zuletzt aktualisiert: {platform.lastUpdated}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlatforms.length === 0 && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Keine Plattformen gefunden
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Versuche andere Suchbegriffe oder Filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
