'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  ClockIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
  StarIcon,
  CalendarIcon,
  CodeBracketIcon,
  HeartIcon,
  SparklesIcon,
  UserGroupIcon,
  BeakerIcon,
  MusicalNoteIcon,
  BookOpenIcon,
  ChevronRightIcon,
  TrophyIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Version {
  version: string;
  name: string;
  releaseDate: string;
  status: 'released' | 'beta' | 'planned' | 'in-development';
  features: Feature[];
  impact: 'minor' | 'major' | 'revolutionary';
  description: string;
}

interface Feature {
  name: string;
  description: string;
  category: 'wellness' | 'gamification' | 'ai' | 'social' | 'content' | 'tech';
  status: 'completed' | 'in-progress' | 'planned';
}

const versionHistory: Version[] = [
  {
    version: "1.0.0",
    name: "Genesis - Grundstein",
    releaseDate: "2024-12-01",
    status: "released",
    impact: "major",
    description: "Die Geburt des Wellness Hub - Grundlegende Module für ganzheitliches Wohlbefinden",
    features: [
      { name: "Dankbarkeits-Journal", description: "Tägliche Dankbarkeitspraxis mit Tracking", category: "wellness", status: "completed" },
      { name: "Meditation & Stille", description: "Geführte Meditationen und Timer", category: "wellness", status: "completed" },
      { name: "Fortschritts-Tracking", description: "Ziele setzen und verfolgen", category: "wellness", status: "completed" },
      { name: "Responsive Design", description: "Mobile-optimierte Benutzeroberfläche", category: "tech", status: "completed" },
      { name: "LocalStorage System", description: "Sichere lokale Datenspeicherung", category: "tech", status: "completed" }
    ]
  },
  {
    version: "2.0.0",
    name: "Evolution - Wissenschaftliche Transformation",
    releaseDate: "2025-03-15",
    status: "released",
    impact: "revolutionary",
    description: "Wissenschaftlich fundierte Erweiterung mit 47+ peer-reviewed Studien",
    features: [
      { name: "Wissenschaftliche Integration", description: "47+ reale Studien integriert", category: "content", status: "completed" },
      { name: "Analytics Dashboard", description: "Erweiterte Statistiken und Insights", category: "wellness", status: "completed" },
      { name: "Real-World Challenges", description: "Echte Probleme mit evidenzbasierten Lösungen", category: "wellness", status: "completed" },
      { name: "Expert Resource System", description: "Kuratierte Expertenressourcen", category: "content", status: "completed" },
      { name: "Creative Hub", description: "Innovative Wellness-Features", category: "wellness", status: "completed" }
    ]
  },
  {
    version: "3.0.0",
    name: "Renaissance - KI & Gamification Revolution",
    releaseDate: "2025-06-10",
    status: "released",
    impact: "revolutionary",
    description: "KI-Persönlichkeiten und vollständiges RPG-System für Wellness",
    features: [
      { name: "5 KI-Wellness-Coaches", description: "Einzigartige KI-Persönlichkeiten mit Spezialisierungen", category: "ai", status: "completed" },
      { name: "Wellness-RPG System", description: "8 Charakter-Klassen, Level-System, Quests", category: "gamification", status: "completed" },
      { name: "Philosophisches Universum", description: "6 kulturelle Perspektiven auf Gut/Böse", category: "content", status: "completed" },
      { name: "Privates Tagebuch", description: "Wachsende virtuelle Welten", category: "wellness", status: "completed" },
      { name: "Community System", description: "Sichere soziale Interaktionen", category: "social", status: "completed" },
      { name: "Aktivitäts-Tracking", description: "KI-gestützte Muster-Erkennung", category: "ai", status: "completed" }
    ]
  },
  {
    version: "4.0.0",
    name: "Omniversum - Ganzheitliche Lebensplattform",
    releaseDate: "2025-08-01",
    status: "in-development",
    impact: "revolutionary",
    description: "Vollständige Lebens- und Wellness-Plattform mit Sucht-/Mental Health Support",
    features: [
      { name: "Sucht & Schizophrenie Aufklärung", description: "Fachlich fundierte Informationen und Ressourcen", category: "content", status: "in-progress" },
      { name: "Soziales Netzwerk", description: "Familie, Freunde, Professionelle Hilfe", category: "social", status: "in-progress" },
      { name: "Externe Linksammlung", description: "Kuratierte Plattformen und Ressourcen", category: "content", status: "planned" },
      { name: "Dualität & Matrix Grundlagen", description: "Einfach erklärte spirituelle Prinzipien", category: "content", status: "planned" },
      { name: "Astral- & Seelenreisen", description: "Techniken für außerkörperliche Erfahrungen", category: "content", status: "planned" },
      { name: "Gaming-Ecke", description: "Wild Rift & Minecraft Guides", category: "content", status: "planned" },
      { name: "Musik & Kultur Hub", description: "Playlists, Rap-Analysen, Beat-Tutorials", category: "content", status: "planned" },
      { name: "Programmier-Werkstatt", description: "Python, JavaScript, KI-Integration", category: "tech", status: "planned" },
      { name: "Shop & Premium", description: "Erweiterte Features und Merchandise", category: "tech", status: "planned" }
    ]
  },
  {
    version: "5.0.0",
    name: "Transcendence - AR/VR & Biometrik",
    releaseDate: "2025-12-01",
    status: "planned",
    impact: "revolutionary",
    description: "Immersive Technologien und Biometrische Integration",
    features: [
      { name: "AR/VR Wellness-Räume", description: "Immersive Meditation und Therapie", category: "tech", status: "planned" },
      { name: "Biometrische Integration", description: "Smartwatch, Herzfrequenz, Schlaftracking", category: "tech", status: "planned" },
      { name: "Predictive Analytics", description: "KI-gestützte Stimmungsvorhersage", category: "ai", status: "planned" },
      { name: "Holographische KI-Coaches", description: "3D-KI-Avatare für immersive Beratung", category: "ai", status: "planned" },
      { name: "Global Community", description: "Weltweite Wellness-Challenges", category: "social", status: "planned" }
    ]
  }
];

const upcomingMilestones = [
  {
    title: "Sucht & Mental Health Integration",
    description: "Fachlich fundierte Module für Aufklärung und Unterstützung",
    deadline: "Juli 2025",
    priority: "high",
    progress: 25
  },
  {
    title: "Soziales Netzwerk Launch",
    description: "Familie, Freunde und professionelle Hilfe vernetzen",
    deadline: "August 2025", 
    priority: "high",
    progress: 10
  },
  {
    title: "Gaming & Musik Integration",
    description: "Wild Rift, Minecraft, Rap-Tutorials, Beat-Making",
    deadline: "September 2025",
    priority: "medium",
    progress: 5
  },
  {
    title: "Shop & Premium Features",
    description: "Erweiterte Funktionen und Monetarisierung",
    deadline: "Oktober 2025",
    priority: "medium",
    progress: 0
  }
];

export default function VersionsRoadmapPage() {
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [activeTab, setActiveTab] = useState<'history' | 'roadmap' | 'milestones'>('history');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'released': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'beta': return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'in-development': return <CodeBracketIcon className="w-5 h-5 text-blue-500" />;
      case 'planned': return <ClockIcon className="w-5 h-5 text-gray-400" />;
      default: return <QuestionMarkCircleIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'revolutionary': return 'from-purple-500 to-pink-600';
      case 'major': return 'from-blue-500 to-indigo-600';
      case 'minor': return 'from-green-500 to-teal-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'wellness': return <HeartIcon className="w-4 h-4" />;
      case 'gamification': return <TrophyIcon className="w-4 h-4" />;
      case 'ai': return <BeakerIcon className="w-4 h-4" />;
      case 'social': return <UserGroupIcon className="w-4 h-4" />;
      case 'content': return <BookOpenIcon className="w-4 h-4" />;
      case 'tech': return <CodeBracketIcon className="w-4 h-4" />;
      default: return <SparklesIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                🚀 Versionsverlauf & Roadmap
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Die Evolution des Wellness Hub - Vergangenheit, Gegenwart und Zukunft
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8"
        >
          <div className="flex overflow-x-auto">
            {[
              { id: 'history', label: 'Versionsverlauf', icon: ClockIcon },
              { id: 'roadmap', label: 'Zukunft', icon: RocketLaunchIcon },
              { id: 'milestones', label: 'Meilensteine', icon: TrophyIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-purple-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Version History */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {versionHistory.filter(v => v.status === 'released').map((version, index) => (
                <motion.div
                  key={version.version}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${getImpactColor(version.impact)}`} />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(version.status)}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {version.name} <span className="text-purple-600">v{version.version}</span>
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Veröffentlicht am {version.releaseDate}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        version.impact === 'revolutionary' ? 'bg-purple-100 text-purple-800' :
                        version.impact === 'major' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {version.impact}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {version.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {version.features.map((feature, fIndex) => (
                        <div
                          key={fIndex}
                          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            {getCategoryIcon(feature.category)}
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                              {feature.name}
                            </h4>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Future Roadmap */}
          {activeTab === 'roadmap' && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {versionHistory.filter(v => v.status !== 'released').map((version, index) => (
                <motion.div
                  key={version.version}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${getImpactColor(version.impact)} opacity-60`} />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(version.status)}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {version.name} <span className="text-purple-600">v{version.version}</span>
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Geplant für {version.releaseDate}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        version.status === 'in-development' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {version.status === 'in-development' ? 'In Entwicklung' : 'Geplant'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {version.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {version.features.map((feature, fIndex) => (
                        <div
                          key={fIndex}
                          className={`p-4 rounded-lg ${
                            feature.status === 'completed' ? 'bg-green-50 dark:bg-green-900' :
                            feature.status === 'in-progress' ? 'bg-blue-50 dark:bg-blue-900' :
                            'bg-gray-50 dark:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getCategoryIcon(feature.category)}
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                {feature.name}
                              </h4>
                            </div>
                            {feature.status === 'completed' && <CheckCircleIcon className="w-4 h-4 text-green-500" />}
                            {feature.status === 'in-progress' && <ClockIcon className="w-4 h-4 text-blue-500" />}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Milestones */}
          {activeTab === 'milestones' && (
            <motion.div
              key="milestones"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {upcomingMilestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {milestone.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                        milestone.priority === 'high' ? 'bg-red-100 text-red-800' :
                        milestone.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {milestone.priority === 'high' ? 'Hohe Priorität' :
                         milestone.priority === 'medium' ? 'Mittlere Priorität' : 'Niedrige Priorität'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {milestone.deadline}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">Fortschritt</span>
                      <span className="text-gray-900 dark:text-white font-medium">{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
