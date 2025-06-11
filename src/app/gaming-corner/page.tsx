'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  StarIcon,
  PlayIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChartBarIcon,
  LightBulbIcon,
  FireIcon,
  MapIcon,
  CubeTransparentIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface GameGuide {
  id: string;
  title: string;
  game: 'wild-rift' | 'minecraft';
  category: string;
  difficulty: 'anfänger' | 'fortgeschritten' | 'experte';
  duration: string;
  description: string;
  steps: string[];
  tips: string[];
  images?: string[];
  videoUrl?: string;
  relatedGuides: string[];
}

interface Champion {
  id: string;
  name: string;
  role: string;
  difficulty: number;
  description: string;
  abilities: string[];
  buildOrder: string[];
  counters: string[];
  synergies: string[];
  tips: string[];
}

interface MinecraftProject {
  id: string;
  name: string;
  category: 'building' | 'redstone' | 'survival' | 'creative';
  difficulty: 'einfach' | 'mittel' | 'schwer';
  materials: string[];
  steps: string[];
  timeEstimate: string;
  description: string;
  tips: string[];
}

const wildRiftChampions: Champion[] = [
  {
    id: 'yasuo',
    name: 'Yasuo',
    role: 'Mid Lane',
    difficulty: 4,
    description: 'Ein mobiler Melee-Kämpfer mit Wind-basierten Fähigkeiten und einem starken Late-Game.',
    abilities: [
      'Q - Stählerner Sturm (Stackbarer Skillshot)',
      'W - Windwall (Blockiert Projektile)',
      'E - Sweeping Blade (Dash durch Gegner)',  
      'R - Last Breath (Ultimate auf Airborne Gegner)'
    ],
    buildOrder: [
      'Infinity Edge (Kern-Item)',
      'Phantom Dancer (Attackspeed + Crit)',
      'Immortal Shieldbow (Survivability)',
      'Bloodthirster (Lifesteal)',
      'Guardian Angel (Resurrection)'
    ],
    counters: ['Malphite', 'Rammus', 'Pantheon'],
    synergies: ['Malphite', 'Alistar', 'Gragas'],
    tips: [
      'Nutze E-Q Combo für maximalen Schaden',
      'Spare deine Windwall für wichtige Projektile',
      'Stack Q bevor du all-in gehst',
      'Positioniere dich für Multi-Person Ultimates'
    ]
  },
  {
    id: 'jinx',
    name: 'Jinx',
    role: 'ADC',
    difficulty: 2,
    description: 'Ein Range-DPS Carry mit AoE-Fähigkeiten und starkem Teamfight-Potential.',
    abilities: [
      'Passive - Get Excited! (Attackspeed nach Takedown)',
      'Q - Switcheroo! (Wechsel zwischen Range/AoE)',
      'W - Zap! (Slow + Damage Skillshot)',
      'E - Flame Chompers! (Root-Trap)',
      'R - Super Mega Death Rocket! (Global Execute)'
    ],
    buildOrder: [
      'Kraken Slayer (DPS)',
      'Runaan\'s Hurricane (AoE Attacks)',
      'Infinity Edge (Crit Damage)',
      'Rapid Firecannon (Range)',
      'Guardian Angel (Survivability)'
    ],
    counters: ['Draven', 'Lucian', 'Tristana'],
    synergies: ['Braum', 'Thresh', 'Nautilus'],
    tips: [
      'Nutze Fishbones (Q) für Poke und Teamfights',
      'Platziere Traps defensiv oder für Zoning',
      'Timing deiner Ultimate für Executes',
      'Bleibe hinten und fokussiere Positioning'
    ]
  }
];

const minecraftProjects: MinecraftProject[] = [
  {
    id: 'starter-base',
    name: 'Anfänger Survival Base',
    category: 'survival',
    difficulty: 'einfach',
    materials: [
      '200+ Holzblöcke',
      '64 Stein',
      '32 Glas',
      '16 Fackeln',
      '1 Bett',
      '1 Ofen',
      '1 Crafting Table',
      '1 Truhe'
    ],
    timeEstimate: '1-2 Stunden',
    description: 'Eine sichere und funktionale Basis für die ersten Minecraft-Nächte mit allen wichtigen Elementen.',
    steps: [
      'Wähle einen sicheren Ort (erhöht, near Ressourcen)',
      'Baue ein 7x7 Fundament aus Holz',
      'Errichte 4 Blöcke hohe Wände',
      'Füge Fenster hinzu (2x1 Glas)',
      'Baue ein einfaches Dach',
      'Platziere eine Tür',
      'Füge Fackeln für Beleuchtung hinzu',
      'Stelle Bett, Ofen, Crafting Table und Truhe auf',
      'Baue einen kleinen Garten vor der Basis'
    ],
    tips: [
      'Baue immer auf Höhe 70+ für bessere Sicht',
      'Nutze verschiedene Holzarten für Optik',
      'Baue einen Zaun um die Basis',
      'Grabe einen Keller für mehr Lagerplatz'
    ]
  },
  {
    id: 'redstone-door',
    name: 'Versteckte Redstone Tür',
    category: 'redstone',
    difficulty: 'mittel',
    materials: [
      '12 Redstone Dust',
      '4 Redstone Repeater',
      '2 Sticky Pistons',
      '2 Blöcke (zum Verschieben)',
      '1 Pressure Plate oder Button',
      '20+ Baustein-Blöcke'
    ],
    timeEstimate: '2-3 Stunden',
    description: 'Eine geheime Tür, die sich mit Redstone-Mechanik öffnet und perfekt in die Wand integriert ist.',
    steps: [
      'Baue eine 3x3 Wand mit 2x1 Öffnung in der Mitte',
      'Platziere Sticky Pistons hinter der Öffnung',
      'Verbinde die Pistons mit Redstone',
      'Baue den Aktivierungsmechanismus (versteckter Button)',
      'Teste die Schaltung',
      'Verstecke alle Redstone-Komponenten',
      'Decoriere die Umgebung natürlich'
    ],
    tips: [
      'Nutze Repeater für längere Redstone-Strecken',
      'Teste alle Verbindungen schrittweise',
      'Verstecke Redstone unter Blöcken oder in Wänden',
      'Baue einen Reset-Mechanismus für Notfälle'
    ]
  },
  {
    id: 'castle-build',
    name: 'Mittelalterliche Burg',
    category: 'building',
    difficulty: 'schwer',
    materials: [
      '1000+ Steinblöcke',
      '500+ Steinziegel',
      '200+ Holzblöcke',
      '100+ Glas',
      '50+ Fackeln',
      '32+ Eisengitter',
      'Verschiedene Deko-Blöcke'
    ],
    timeEstimate: '10-20 Stunden',
    description: 'Eine imposante mittelalterliche Burg mit Türmen, Mauern, Thronsaal und funktionalen Räumen.',
    steps: [
      'Plane das Layout (Hauptburg + 4 Türme)',
      'Baue das Fundament (30x30 Base)',
      'Errichte die Außenwände (15 Blöcke hoch)',
      'Baue die vier Ecktürme',
      'Füge das Haupttor mit Fallgitter hinzu',
      'Baue den Innenhof',
      'Errichte die Haupthalle',
      'Füge Innenräume hinzu (Thronsaal, Küche, Schlafgemächer)',
      'Decoriere mit Details (Fahnen, Rüstungen, Möbel)',
      'Baue die Außenanlagen (Garten, Ställe)'
    ],
    tips: [
      'Nutze verschiedene Steinarten für Textur',
      'Baue asymmetrisch für Realismus',
      'Füge Wachtürme an den Mauern hinzu',
      'Verwende Shaders für bessere Optik'
    ]
  }
];

const gameGuides: GameGuide[] = [
  {
    id: 'wr-basics',
    title: 'Wild Rift Grundlagen für Anfänger',
    game: 'wild-rift',
    category: 'Grundlagen',
    difficulty: 'anfänger',
    duration: '30 Min',
    description: 'Lerne die Basics von League of Legends: Wild Rift - von der Map bis zu den ersten Spielzügen.',
    steps: [
      'Verstehe die Map: 3 Lanes + Jungle',
      'Lerne die 5 Rollen: Top, Jungle, Mid, ADC, Support',
      'Verstehe Minion Waves und Last Hitting',
      'Lerne Warding und Map Control',
      'Verstehe Objectives: Dragon, Baron, Towers',
      'Praktiziere Team Fighting Basics'
    ],
    tips: [
      'Fokussiere auf 2-3 Champions am Anfang',
      'Schaue immer auf die Minimap',
      'Farm ist wichtiger als Kills',
      'Kommuniziere mit deinem Team'
    ],
    relatedGuides: ['wr-champion-guide', 'wr-itemization']
  },
  {
    id: 'mc-survival-guide',
    title: 'Minecraft Survival Meistern',
    game: 'minecraft',
    category: 'Survival',
    difficulty: 'anfänger',
    duration: '45 Min',
    description: 'Der komplette Guide zum Überleben in Minecraft - von der ersten Nacht bis zum Ende.',
    steps: [
      'Tag 1: Sammle Holz und baue Tools',
      'Tag 1: Finde Stein und baue bessere Tools',
      'Nacht 1: Baue einen sicheren Unterschlupf',
      'Tag 2-3: Finde Kohle und Eisen',
      'Woche 1: Baue eine permanente Basis',
      'Fortschritt: Finde Diamanten',
      'End Game: Besiege den Ender Dragon'
    ],
    tips: [
      'Nie ohne Essen oder Fackeln reisen',
      'Markiere wichtige Orte mit Koordinaten',
      'Baue immer Backup-Equipment',
      'Nutze Enchantments für bessere Ausrüstung'
    ],
    relatedGuides: ['mc-building', 'mc-redstone']
  }
];

export default function GamingCornerPage() {
  const [selectedGame, setSelectedGame] = useState<'wild-rift' | 'minecraft' | null>(null);
  const [activeTab, setActiveTab] = useState<'guides' | 'champions' | 'projects' | 'community'>('guides');
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);
  const [selectedProject, setSelectedProject] = useState<MinecraftProject | null>(null);

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
                Gaming Corner
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Wild Rift & Minecraft Guides, Tipps und Community
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="text-2xl">🎮</div>
            <div className="text-2xl">⚔️</div>
            <div className="text-2xl">🏗️</div>
          </div>
        </div>

        {/* Game Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            onClick={() => setSelectedGame('wild-rift')}
            className={`bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl p-8 cursor-pointer transition-all duration-300 ${
              selectedGame === 'wild-rift' ? 'ring-4 ring-blue-300 shadow-xl' : 'hover:shadow-xl'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-xl flex items-center justify-center">
                <StarIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  League of Legends: Wild Rift
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  MOBA • Strategy • Competitive
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Guides</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">60+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Champions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">Pro</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tipps</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            onClick={() => setSelectedGame('minecraft')}
            className={`bg-gradient-to-r from-green-100 to-brown-100 dark:from-green-900 dark:to-yellow-900 rounded-xl p-8 cursor-pointer transition-all duration-300 ${
              selectedGame === 'minecraft' ? 'ring-4 ring-green-300 shadow-xl' : 'hover:shadow-xl'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-green-200 dark:bg-green-800 rounded-xl flex items-center justify-center">
                <CubeTransparentIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Minecraft
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Sandbox • Building • Creative
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">25+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projekte</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Redstone</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">∞</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Builds</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Game Content */}
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {[
                { id: 'guides', label: 'Guides', icon: BookOpenIcon },
                ...(selectedGame === 'wild-rift' ? [{ id: 'champions', label: 'Champions', icon: StarIcon }] : []),
                ...(selectedGame === 'minecraft' ? [{ id: 'projects', label: 'Projekte', icon: HomeIcon }] : []),
                { id: 'community', label: 'Community', icon: UserGroupIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-8">
              {/* Guides Tab */}
              {activeTab === 'guides' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    {selectedGame === 'wild-rift' ? '⚔️ Wild Rift Guides' : '🏗️ Minecraft Guides'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gameGuides
                      .filter(guide => guide.game === selectedGame)
                      .map((guide) => (
                        <div key={guide.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                              {guide.title}
                            </h3>
                            <span className={`px-3 py-1 text-xs rounded-full ${
                              guide.difficulty === 'anfänger' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : guide.difficulty === 'fortgeschritten'
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {guide.difficulty}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {guide.description}
                          </p>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-500">
                              📚 {guide.category}
                            </span>
                            <span className="text-sm text-gray-500">
                              ⏱️ {guide.duration}
                            </span>
                          </div>
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                              Schritte:
                            </h4>
                            <ul className="space-y-1">
                              {guide.steps.slice(0, 3).map((step, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                  <span className="w-4 h-4 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                    {index + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                              {guide.steps.length > 3 && (
                                <li className="text-sm text-gray-500 italic">
                                  ... und {guide.steps.length - 3} weitere Schritte
                                </li>
                              )}
                            </ul>
                          </div>
                          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Guide öffnen
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Champions Tab (Wild Rift) */}
              {activeTab === 'champions' && selectedGame === 'wild-rift' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    ⚔️ Champion Guides
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wildRiftChampions.map((champion) => (
                      <motion.div
                        key={champion.id}
                        onClick={() => setSelectedChampion(selectedChampion?.id === champion.id ? null : champion)}
                        className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                              {champion.name}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">
                              {champion.role}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < champion.difficulty
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {champion.description}
                        </p>

                        <AnimatePresence>
                          {selectedChampion?.id === champion.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
                            >
                              {/* Abilities */}
                              <div className="mb-6">
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                                  🎯 Fähigkeiten:
                                </h4>
                                <div className="space-y-2">
                                  {champion.abilities.map((ability, index) => (
                                    <div key={index} className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-lg p-3">
                                      {ability}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Build Order */}
                              <div className="mb-6">
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                                  🛡️ Empfohlene Items:
                                </h4>
                                <div className="space-y-1">
                                  {champion.buildOrder.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2 text-sm">
                                      <span className="w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full text-xs flex items-center justify-center">
                                        {index + 1}
                                      </span>
                                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Tips */}
                              <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                                  💡 Pro Tipps:
                                </h4>
                                <ul className="space-y-2">
                                  {champion.tips.map((tip, index) => (
                                    <li key={index} className="flex items-start space-x-2 text-sm">
                                      <LightBulbIcon className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Tab (Minecraft) */}
              {activeTab === 'projects' && selectedGame === 'minecraft' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    🏗️ Minecraft Projekte
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {minecraftProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
                        className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {project.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            project.difficulty === 'einfach' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                              : project.difficulty === 'mittel'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {project.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {project.description}
                        </p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-gray-500">
                            📦 {project.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            ⏱️ {project.timeEstimate}
                          </span>
                        </div>

                        <AnimatePresence>
                          {selectedProject?.id === project.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
                            >
                              {/* Materials */}
                              <div className="mb-6">
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                                  📦 Benötigte Materialien:
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {project.materials.map((material, index) => (
                                    <div key={index} className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded p-2">
                                      {material}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Steps */}
                              <div className="mb-6">
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                                  🔨 Bauanleitung:
                                </h4>
                                <ol className="space-y-2">
                                  {project.steps.map((step, index) => (
                                    <li key={index} className="flex items-start space-x-3 text-sm">
                                      <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {index + 1}
                                      </span>
                                      <span className="text-gray-600 dark:text-gray-300">{step}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>

                              {/* Tips */}
                              <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                                  💡 Profi-Tipps:
                                </h4>
                                <ul className="space-y-2">
                                  {project.tips.map((tip, index) => (
                                    <li key={index} className="flex items-start space-x-2 text-sm">
                                      <LightBulbIcon className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
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
                    👥 Gaming Community
                  </h2>

                  {/* Community Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Aktive Spieler', value: '2.3K', icon: UserGroupIcon, color: 'blue' },
                      { label: 'Guides erstellt', value: '45+', icon: BookOpenIcon, color: 'green' },
                      { label: 'Screenshots geteilt', value: '180+', icon: CameraIcon, color: 'purple' },
                      { label: 'Community Rating', value: '4.8★', icon: StarIcon, color: 'yellow' }
                    ].map((stat, index) => (
                      <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
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

                  {/* Latest Community Posts */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                      🔥 Neueste Community Beiträge
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          user: 'MinecraftMaster',
                          game: 'minecraft',
                          type: 'Build Showcase',
                          title: 'Meine neue Redstone-Fabrik!',
                          time: 'vor 2 Stunden',
                          likes: 23,
                          comments: 5
                        },
                        {
                          user: 'RiftChampion',
                          game: 'wild-rift',
                          type: 'Guide',
                          title: 'Yasuo Advanced Combos Guide',
                          time: 'vor 4 Stunden',
                          likes: 45,
                          comments: 12
                        },
                        {
                          user: 'BuilderPro',
                          game: 'minecraft',
                          type: 'Tutorial',
                          title: 'Wie baut man eine effiziente Mob Farm?',
                          time: 'vor 6 Stunden',
                          likes: 67,
                          comments: 18
                        }
                      ].map((post, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            post.game === 'minecraft' ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-100 dark:bg-blue-900'
                          }`}>
                            {post.game === 'minecraft' ? '🏗️' : '⚔️'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-gray-800 dark:text-white">
                                {post.user}
                              </span>
                              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full">
                                {post.type}
                              </span>
                            </div>
                            <h4 className="text-gray-800 dark:text-white font-medium">
                              {post.title}
                            </h4>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>{post.time}</span>
                              <span>❤️ {post.likes}</span>
                              <span>💬 {post.comments}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
