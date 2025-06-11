'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  MusicalNoteIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  PlayIcon,
  PauseIcon,
  HeartIcon,
  ShareIcon,
  ListBulletIcon,
  BookOpenIcon,
  AcademicCapIcon,
  LightBulbIcon,
  StarIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface Playlist {
  id: string;
  name: string;
  description: string;
  mood: string;
  genre: string;
  duration: string;
  trackCount: number;
  coverColor: string;
  tracks: Track[];
  tags: string[];
  creator: string;
  isPublic: boolean;
  likes: number;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  mood: string;
  lyrics?: string;
  analysis?: TrackAnalysis;
}

interface TrackAnalysis {
  theme: string;
  literaryDevices: string[];
  culturalReferences: string[];
  emotionalImpact: string;
  wellness_connection: string;
}

interface BeatTutorial {
  id: string;
  title: string;
  difficulty: 'anfänger' | 'fortgeschritten' | 'experte';
  genre: string;
  duration: string;
  description: string;
  tools: string[];
  steps: string[];
  audioExample?: string;
  tags: string[];
}

const wellnessPlaylists: Playlist[] = [
  {
    id: 'meditation-vibes',
    name: 'Meditative Vibes',
    description: 'Entspannende Beats und Ambient-Sounds für tiefe Meditation',
    mood: 'entspannt',
    genre: 'Ambient/Lo-Fi',
    duration: '2h 15min',
    trackCount: 25,
    coverColor: 'blue',
    creator: 'WellnessBeats',
    isPublic: true,
    likes: 1247,
    tags: ['meditation', 'entspannung', 'fokus', 'ambient'],
    tracks: [
      {
        id: '1',
        title: 'Inner Peace Flow',
        artist: 'Zen Collective',
        duration: '4:32',
        genre: 'Ambient',
        mood: 'friedlich'
      },
      {
        id: '2',
        title: 'Mindful Breathing',
        artist: 'Meditation Masters',
        duration: '6:18',
        genre: 'Nature Sounds',
        mood: 'entspannt'
      }
    ]
  },
  {
    id: 'motivation-rap',
    name: 'Motivation & Transformation',
    description: 'Kraftvolle Rap-Tracks über Überwindung und persönliches Wachstum',
    mood: 'motiviert',
    genre: 'Rap/Hip-Hop',
    duration: '1h 45min',
    trackCount: 18,
    coverColor: 'orange',
    creator: 'MotivationNation',
    isPublic: true,
    likes: 892,
    tags: ['motivation', 'transformation', 'rap', 'empowerment'],
    tracks: [
      {
        id: '3',
        title: 'Rise Above',
        artist: 'MindElevator',
        duration: '3:47',
        genre: 'Conscious Rap',
        mood: 'inspirierend',
        lyrics: `Verse 1:
Started from the bottom, now I'm climbing every day
Mental chains are breaking, won't let doubt get in my way
Mirror shows reflection of the person I can be
Transformation starts within, that's the only way to see...`,
        analysis: {
          theme: 'Persönliche Transformation und Selbstüberwindung',
          literaryDevices: ['Metapher (climbing)', 'Alliteration', 'Imagery'],
          culturalReferences: ['Drake - Started from the Bottom', 'Self-help culture'],
          emotionalImpact: 'Empowerment und Selbstvertrauen stärkend',
          wellness_connection: 'Fördert Growth Mindset und Resilienz'
        }
      }
    ]
  },
  {
    id: 'healing-frequencies',
    name: 'Heilende Frequenzen',
    description: '432Hz und Solfeggio Frequenzen für emotionale Heilung',
    mood: 'heilend',
    genre: 'Frequency Healing',
    duration: '3h 20min',
    trackCount: 12,
    coverColor: 'purple',
    creator: 'FrequencyHealer',
    isPublic: true,
    likes: 2156,
    tags: ['heilung', 'frequenzen', 'chakras', 'spirituell'],
    tracks: [
      {
        id: '4',
        title: '528Hz - Liebesfrequenz',
        artist: 'Sacred Frequencies',
        duration: '15:00',
        genre: 'Healing Tones',
        mood: 'liebevoll'
      }
    ]
  }
];

const beatTutorials: BeatTutorial[] = [
  {
    id: 'lo-fi-basics',
    title: 'Lo-Fi Hip-Hop Beat erstellen',
    difficulty: 'anfänger',
    genre: 'Lo-Fi Hip-Hop',
    duration: '30 Minuten',
    description: 'Lerne die Grundlagen der Lo-Fi Beat-Produktion mit einfachen Tools',
    tools: ['FL Studio (oder kostenlose Alternative)', 'Vinyl-Samples', 'Piano VST'],
    steps: [
      'Lade ein Vinyl-Crackle Sample',
      'Erstelle einen 4/4 Drum-Pattern (Kick, Snare, Hi-Hat)',
      'Füge einen warmen Bass hinzu',
      'Komponiere eine einfache Piano-Melodie',
      'Wende Lo-Fi Effekte an (EQ, Reverb, Saturation)',
      'Mixe alle Elemente zusammen',
      'Exportiere den Beat'
    ],
    tags: ['lo-fi', 'hip-hop', 'entspannend', 'study-beats']
  },
  {
    id: 'trap-energy',
    title: 'Energetischer Trap Beat',
    difficulty: 'fortgeschritten',
    genre: 'Trap',
    duration: '45 Minuten',
    description: 'Erstelle einen kraftvollen Trap-Beat mit modernen Sounds',
    tools: ['DAW (Digital Audio Workstation)', '808-Samples', 'Synthesizer'],
    steps: [
      'Programmiere das Trap-Drum-Pattern',
      'Erstelle eine rollende 808-Bassline',
      'Füge Lead-Synths hinzu',
      'Gestalte Drop und Breaks',
      'Nutze Sidechain-Compression',
      'Füge Vocal-Chops ein',
      'Master den Track'
    ],
    tags: ['trap', 'energetisch', '808', 'modern']
  },
  {
    id: 'ambient-healing',
    title: 'Heilende Ambient-Soundscape',
    difficulty: 'fortgeschritten',
    genre: 'Ambient',
    duration: '60 Minuten',
    description: 'Komponiere atmosphärische Musik für Meditation und Heilung',
    tools: ['Synthesizer/VST', 'Field Recording', 'Reverb-Plugins', 'Audio Editor'],
    steps: [
      'Sammle oder wähle Natur-Samples',
      'Erstelle Pad-Texturen mit langem Sustain',
      'Komponiere einfache, wiederholende Melodien',
      'Schichte verschiedene Ambient-Elemente',
      'Nutze räumliche Effekte (Reverb, Delay)',
      'Achte auf fließende Übergänge',
      'Teste die Wirkung in Ruhe-Momenten'
    ],
    tags: ['ambient', 'meditation', 'heilung', 'natur']
  }
];

const culturalAnalysis = [
  {
    id: 'rap-evolution',
    title: 'Evolution des Conscious Rap',
    description: 'Wie Hip-Hop zur Plattform für soziales Bewusstsein wurde',
    content: `
**Die Wurzeln des Conscious Rap**

Conscious Rap entstand in den 1980ern als Reaktion auf gesellschaftliche Ungerechtigkeiten. 
Künstler wie Grandmaster Flash mit "The Message" (1982) zeigten, dass Hip-Hop mehr sein kann 
als Party-Musik - es kann Aufklärung und sozialer Kommentar sein.

**Wellness-Verbindung:**
- Thematisiert mentale Gesundheit in marginalisierten Communities
- Fördert Selbstreflexion und kritisches Denken
- Bietet positive Rolemodels und Lösungsansätze
- Schafft Gemeinschaftsgefühl und Identität

**Moderne Vertreter:**
- Kendrick Lamar: Trauma und Heilung
- J. Cole: Selbstakzeptanz und Wachstum  
- Chance the Rapper: Spiritualität und Hoffnung
- Logic: Mental Health Awareness
    `,
    tags: ['conscious-rap', 'sozial', 'wellness', 'kultur']
  }
];

export default function MusikKulturHubPage() {
  const [activeTab, setActiveTab] = useState<'playlists' | 'analysis' | 'tutorials' | 'community'>('playlists');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [selectedTutorial, setSelectedTutorial] = useState<BeatTutorial | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
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
                Musik & Kultur Hub
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Wellness-Playlists, Rap-Analyse und Beat-Tutorials
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="text-2xl">🎵</div>
            <div className="text-2xl">🎤</div>
            <div className="text-2xl">🎛️</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-xl p-1 mb-8 shadow-lg">
          {[
            { id: 'playlists', label: 'Wellness Playlists', icon: ListBulletIcon },
            { id: 'analysis', label: 'Rap & Kultur Analyse', icon: BookOpenIcon },
            { id: 'tutorials', label: 'Beat Tutorials', icon: AcademicCapIcon },
            { id: 'community', label: 'Music Community', icon: UserGroupIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Wellness Playlists Tab */}
        {activeTab === 'playlists' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                🎵 Wellness Playlists
              </h2>
              <button
                onClick={() => setShowCreatePlaylist(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Neue Playlist</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wellnessPlaylists.map((playlist) => (
                <motion.div
                  key={playlist.id}
                  onClick={() => setSelectedPlaylist(playlist)}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-full h-32 bg-gradient-to-br from-${playlist.coverColor}-400 to-${playlist.coverColor}-600 rounded-lg mb-4 flex items-center justify-center`}>
                    <MusicalNoteIcon className="h-12 w-12 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {playlist.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {playlist.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500">
                      {playlist.trackCount} Tracks • {playlist.duration}
                    </span>
                    <span className="text-sm text-purple-600 dark:text-purple-400">
                      {playlist.genre}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {playlist.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(!isPlaying);
                        }}
                        className="p-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800"
                      >
                        {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                      </button>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ❤️ {playlist.likes}
                      </span>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      <ShareIcon className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Playlist Detail Modal */}
            <AnimatePresence>
              {selectedPlaylist && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                  onClick={() => setSelectedPlaylist(null)}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-20 h-20 bg-gradient-to-br from-${selectedPlaylist.coverColor}-400 to-${selectedPlaylist.coverColor}-600 rounded-lg flex items-center justify-center`}>
                          <MusicalNoteIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {selectedPlaylist.name}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-300">
                            von {selectedPlaylist.creator}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedPlaylist(null)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {selectedPlaylist.description}
                    </p>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                        Tracklist ({selectedPlaylist.trackCount} Songs)
                      </h3>
                      <div className="space-y-3">
                        {selectedPlaylist.tracks.map((track, index) => (
                          <div key={track.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span className="text-sm text-gray-500 w-8">
                              {index + 1}
                            </span>
                            <button className="p-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full">
                              <PlayIcon className="h-3 w-3" />
                            </button>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800 dark:text-white">
                                {track.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {track.artist} • {track.duration}
                              </p>
                            </div>
                            {track.analysis && (
                              <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg">
                                <BookOpenIcon className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Rap & Kultur Analyse Tab */}
        {activeTab === 'analysis' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🎤 Rap & Kultur Analyse
            </h2>

            {/* Track Analysis Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                📈 Detaillierte Track-Analyse
              </h3>
              
              {wellnessPlaylists
                .flatMap(p => p.tracks)
                .filter(t => t.analysis)
                .map((track) => (
                  <div key={track.id} className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <MicrophoneIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {track.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {track.artist}
                        </p>
                      </div>
                    </div>

                    {track.analysis && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-gray-800 dark:text-white mb-2">
                            🎯 Hauptthema:
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {track.analysis.theme}
                          </p>

                          <h5 className="font-semibold text-gray-800 dark:text-white mb-2">
                            📝 Literarische Mittel:
                          </h5>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {track.analysis.literaryDevices.map((device, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm">
                                {device}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-semibold text-gray-800 dark:text-white mb-2">
                            🌍 Cultural References:
                          </h5>
                          <ul className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {track.analysis.culturalReferences.map((ref, index) => (
                              <li key={index} className="mb-1">• {ref}</li>
                            ))}
                          </ul>

                          <h5 className="font-semibold text-gray-800 dark:text-white mb-2">
                            💚 Wellness-Verbindung:
                          </h5>
                          <p className="text-green-600 dark:text-green-400 text-sm">
                            {track.analysis.wellness_connection}
                          </p>
                        </div>

                        {track.lyrics && (
                          <div className="md:col-span-2 mt-4">
                            <h5 className="font-semibold text-gray-800 dark:text-white mb-2">
                              📄 Lyrics (Auszug):
                            </h5>
                            <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-4">
                              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                                {track.lyrics}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Cultural Analysis Articles */}
            <div className="space-y-6">
              {culturalAnalysis.map((article) => (
                <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {article.description}
                  </p>
                  <div className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ 
                      __html: article.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                    }} />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Beat Tutorials Tab */}
        {activeTab === 'tutorials' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🎛️ Beat Production Tutorials
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beatTutorials.map((tutorial) => (
                <motion.div
                  key={tutorial.id}
                  onClick={() => setSelectedTutorial(selectedTutorial?.id === tutorial.id ? null : tutorial)}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {tutorial.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      tutorial.difficulty === 'anfänger' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : tutorial.difficulty === 'fortgeschritten'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {tutorial.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-purple-600 dark:text-purple-400">
                      🎵 {tutorial.genre}
                    </span>
                    <span className="text-sm text-gray-500">
                      ⏱️ {tutorial.duration}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {tutorial.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <AnimatePresence>
                    {selectedTutorial?.id === tutorial.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
                      >
                        {/* Required Tools */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            🛠️ Benötigte Tools:
                          </h4>
                          <ul className="space-y-1">
                            {tutorial.tools.map((tool, index) => (
                              <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                {tool}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tutorial Steps */}
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            📝 Schritt-für-Schritt Anleitung:
                          </h4>
                          <ol className="space-y-3">
                            {tutorial.steps.map((step, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <span className="w-6 h-6 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  {step}
                                </span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <button className="w-full mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          Tutorial starten
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              👥 Music Community
            </h2>

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Aktive Musiker', value: '1.2K', icon: MicrophoneIcon, color: 'purple' },
                { label: 'Geteilte Playlists', value: '350+', icon: ListBulletIcon, color: 'blue' },
                { label: 'Beat Tutorials', value: '89', icon: SpeakerWaveIcon, color: 'green' },
                { label: 'Community Rating', value: '4.9★', icon: StarIcon, color: 'yellow' }
              ].map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg flex items-center justify-center mb-4`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Latest Community Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                🔥 Neueste Community-Aktivitäten
              </h3>
              <div className="space-y-4">
                {[
                  {
                    user: 'BeatMaker_Pro',
                    action: 'hat einen neuen Lo-Fi Beat hochgeladen',
                    title: '"Rainy Day Vibes"',
                    time: 'vor 2 Stunden',
                    likes: 34,
                    type: 'beat'
                  },
                  {
                    user: 'RapAnalyst',
                    action: 'hat eine Analyse veröffentlicht',
                    title: '"The Psychology of Trap Music"',
                    time: 'vor 4 Stunden',
                    likes: 67,
                    type: 'analysis'
                  },
                  {
                    user: 'PlaylistCurator',
                    action: 'hat eine neue Playlist erstellt',
                    title: '"Motivation Monday Mix"',
                    time: 'vor 6 Stunden',
                    likes: 89,
                    type: 'playlist'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      activity.type === 'beat' ? 'bg-purple-100 dark:bg-purple-900' :
                      activity.type === 'analysis' ? 'bg-blue-100 dark:bg-blue-900' :
                      'bg-green-100 dark:bg-green-900'
                    }`}>
                      {activity.type === 'beat' ? '🎵' : activity.type === 'analysis' ? '📊' : '📃'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {activity.user}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {activity.action}
                        </span>
                      </div>
                      <h4 className="text-purple-600 dark:text-purple-400 font-medium">
                        {activity.title}
                      </h4>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{activity.time}</span>
                        <span>❤️ {activity.likes}</span>
                        <button className="text-purple-600 dark:text-purple-400 hover:underline">
                          Anhören
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
