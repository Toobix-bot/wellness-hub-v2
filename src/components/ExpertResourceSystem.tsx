'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AcademicCapIcon,
  BookOpenIcon,
  PlayIcon,
  MicrophoneIcon,
  GlobeAltIcon,
  StarIcon,
  EyeIcon,
  CheckBadgeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  MapPinIcon,
  XMarkIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { ExpertResource } from '@/types/realWorldChallenges';
import { realWorldChallenges } from '@/utils/realWorldChallengesData';

interface ExpertResourceSystemProps {
  challengeId?: string;
  className?: string;
}

// Mock Expert Resources Data - In einer echten App würde dies von einer API kommen
const expertResources: ExpertResource[] = [
  {
    id: 'depression-mbct-guide',
    challengeId: 'depression',
    type: 'article',
    title: 'MBCT bei Depression: Ein praktischer Leitfaden',
    author: 'Dr. Sarah Müller',
    credentials: 'Professorin für Klinische Psychologie, Charité Berlin',
    content: 'Mindfulness-Based Cognitive Therapy (MBCT) kombiniert Achtsamkeitsmeditation mit kognitiver Verhaltenstherapie...',
    verified: true,
    lastUpdated: new Date('2024-12-01'),
    rating: 4.8,
    views: 15420
  },
  {
    id: 'anxiety-breathing-video',
    challengeId: 'anxiety-disorders',
    type: 'video',
    title: '4-7-8 Atemtechnik bei Panikattacken',
    author: 'Prof. Dr. Michael Weber',
    credentials: 'Facharzt für Psychiatrie und Psychotherapie, Universitätsklinik München',
    content: 'In diesem Video lernen Sie die wissenschaftlich validierte 4-7-8 Atemtechnik...',
    url: 'https://example.com/breathing-technique',
    verified: true,
    lastUpdated: new Date('2025-01-15'),
    rating: 4.9,
    views: 28340
  },
  {
    id: 'burnout-podcast',
    challengeId: 'burnout-syndrome',
    type: 'podcast',
    title: 'Burnout-Prävention im Arbeitsalltag',
    author: 'Dr. Lisa Schmidt',
    credentials: 'Arbeitspsychologin, Expertin für Stressmanagement',
    content: 'Ein tiefgehender Podcast über die Früherkennung und Prävention von Burnout...',
    url: 'https://example.com/burnout-podcast',
    verified: true,
    lastUpdated: new Date('2025-02-10'),
    rating: 4.7,
    views: 12580
  },
  {
    id: 'loneliness-research',
    challengeId: 'social-isolation',
    type: 'research',
    title: 'Meta-Analyse: Interventionen gegen Einsamkeit',
    author: 'Dr. Thomas Richter et al.',
    credentials: 'Sozialpsychologie Institut, Universität Hamburg',
    content: 'Eine umfassende Meta-Analyse von 147 Studien zu evidenzbasierten Interventionen...',
    url: 'https://example.com/loneliness-meta-analysis',
    verified: true,
    lastUpdated: new Date('2024-11-20'),
    rating: 4.6,
    views: 8420
  },
  {
    id: 'climate-anxiety-therapist',
    challengeId: 'climate-anxiety',
    type: 'professional_contact',
    title: 'Spezialisierte Therapie für Klimaangst',
    author: 'Dr. Anna Grün',
    credentials: 'Eco-Therapy Spezialistin, Zertifizierte Verhaltenstherapeutin',
    content: 'Telefonische und Online-Beratung für Menschen mit Klimaangst und Umweltsorgen...',
    url: 'tel:+49-30-12345678',
    verified: true,
    lastUpdated: new Date('2025-01-05'),
    rating: 4.9,
    views: 3240
  }
];

// Mock Professional Services Data
const professionalServices = [
  {
    id: 'online-therapy',
    type: 'Psychotherapie',
    name: 'Online-Therapie Deutschland',
    description: 'Lizenzierte Psychotherapeuten für Online-Sessions',
    url: 'https://example.com/online-therapy',
    available: '24/7 Terminbuchung',
    languages: ['Deutsch', 'Englisch'],
    specializations: ['Depression', 'Angststörungen', 'Burnout'],
    verified: true
  },
  {
    id: 'crisis-hotline',
    type: 'Krisenintervention',
    name: 'Telefonseelsorge Deutschland',
    description: 'Kostenlose, anonyme Beratung in Krisen',
    url: 'tel:0800-111-0-111',
    available: '24/7 kostenlos',
    languages: ['Deutsch'],
    specializations: ['Suizidprävention', 'Akute Krisen', 'Seelische Nöte'],
    verified: true
  },
  {
    id: 'mindfulness-center',
    type: 'Achtsamkeitstraining',
    name: 'MBSR-Zentrum Berlin',
    description: 'Zertifizierte MBSR und MBCT Kurse',
    url: 'https://example.com/mbsr-berlin',
    available: 'Kurse 2x monatlich',
    languages: ['Deutsch', 'Englisch'],
    specializations: ['MBSR', 'MBCT', 'Achtsamkeitsmeditation'],
    verified: true
  }
];

const ExpertResourceSystem: React.FC<ExpertResourceSystemProps> = ({ 
  challengeId, 
  className = '' 
}) => {
  const [selectedResource, setSelectedResource] = useState<ExpertResource | null>(null);
  const [activeTab, setActiveTab] = useState<'resources' | 'professionals'>('resources');
  const [filterType, setFilterType] = useState<string>('all');

  // Filtere Ressourcen basierend auf Challenge ID
  const filteredResources = challengeId 
    ? expertResources.filter(resource => resource.challengeId === challengeId)
    : expertResources;

  // Weitere Filterung basierend auf Typ
  const displayResources = filterType === 'all' 
    ? filteredResources 
    : filteredResources.filter(resource => resource.type === filterType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpenIcon className="w-5 h-5" />;
      case 'video': return <PlayIcon className="w-5 h-5" />;
      case 'podcast': return <MicrophoneIcon className="w-5 h-5" />;
      case 'research': return <AcademicCapIcon className="w-5 h-5" />;
      case 'professional_contact': return <PhoneIcon className="w-5 h-5" />;
      default: return <BookOpenIcon className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'text-blue-600 bg-blue-100';
      case 'video': return 'text-red-600 bg-red-100';
      case 'podcast': return 'text-purple-600 bg-purple-100';
      case 'research': return 'text-green-600 bg-green-100';
      case 'professional_contact': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case 'Psychotherapie': return <ChatBubbleLeftRightIcon className="w-6 h-6" />;
      case 'Krisenintervention': return <PhoneIcon className="w-6 h-6" />;
      case 'Achtsamkeitstraining': return <AcademicCapIcon className="w-6 h-6" />;
      default: return <ChatBubbleLeftRightIcon className="w-6 h-6" />;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-lg">
            <AcademicCapIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Expert Resources</h2>
            <p className="text-sm text-gray-600">Professionelle Hilfe und wissenschaftliche Ressourcen</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <CheckBadgeIcon className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-600 font-medium">Verifiziert</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'resources', name: 'Ressourcen', icon: BookOpenIcon },
            { id: 'professionals', name: 'Professionelle Hilfe', icon: PhoneIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'resources' && (
        <div className="space-y-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', name: 'Alle' },
              { id: 'article', name: 'Artikel' },
              { id: 'video', name: 'Videos' },
              { id: 'podcast', name: 'Podcasts' },
              { id: 'research', name: 'Forschung' },
              { id: 'professional_contact', name: 'Kontakte' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterType(filter.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterType === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {displayResources.map((resource) => (
              <motion.div
                key={resource.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedResource(resource)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                      {getTypeIcon(resource.type)}
                    </span>
                    {resource.verified && (
                      <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(resource.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({resource.rating})</span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                
                <div className="text-sm text-gray-600 mb-2">
                  <div className="font-medium">{resource.author}</div>
                  <div className="text-xs text-gray-500">{resource.credentials}</div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {resource.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <EyeIcon className="w-3 h-3" />
                    <span>{resource.views.toLocaleString()} Aufrufe</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-3 h-3" />
                    <span>
                      {resource.lastUpdated.toLocaleDateString('de-DE')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {displayResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Ressourcen gefunden</h3>
              <p className="text-gray-600">
                Für diese Kategorie sind derzeit keine Ressourcen verfügbar.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'professionals' && (
        <div className="space-y-4">
          {professionalServices.map((service) => (
            <motion.div
              key={service.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  {getServiceTypeIcon(service.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    {service.verified && (
                      <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                    )}
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {service.type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Verfügbarkeit:</span>
                      <div className="text-gray-600">{service.available}</div>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">Sprachen:</span>
                      <div className="text-gray-600">{service.languages.join(', ')}</div>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">Spezialisierung:</span>
                      <div className="text-gray-600">{service.specializations.slice(0, 2).join(', ')}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center space-x-3">
                    <a
                      href={service.url}
                      target={service.url.startsWith('tel:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      {service.url.startsWith('tel:') ? (
                        <PhoneIcon className="w-4 h-4" />
                      ) : (
                        <LinkIcon className="w-4 h-4" />
                      )}
                      <span>
                        {service.url.startsWith('tel:') ? 'Anrufen' : 'Website besuchen'}
                      </span>
                    </a>
                    
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Mehr Info
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Emergency Contacts */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
            <div className="flex items-center space-x-2 mb-4">
              <PhoneIcon className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Notfallkontakte</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-red-800">Telefonseelsorge</div>
                <div className="text-red-700">0800 111 0 111 (kostenlos, 24/7)</div>
              </div>
              
              <div>
                <div className="font-medium text-red-800">Notarzt</div>
                <div className="text-red-700">112 (bei akuter Gefahr)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resource Detail Modal */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <span className={`p-2 rounded-lg ${getTypeColor(selectedResource.type)}`}>
                      {getTypeIcon(selectedResource.type)}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedResource.title}</h3>
                      <p className="text-gray-600">{selectedResource.author}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{selectedResource.rating}/5</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <EyeIcon className="w-4 h-4 text-gray-500" />
                        <span>{selectedResource.views.toLocaleString()} Aufrufe</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4 text-gray-500" />
                        <span>Aktualisiert: {selectedResource.lastUpdated.toLocaleDateString('de-DE')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Autor-Qualifikationen</h4>
                    <p className="text-blue-700 text-sm">{selectedResource.credentials}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Inhalt</h4>
                    <p className="text-gray-700">{selectedResource.content}</p>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      {selectedResource.verified && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckBadgeIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">Verifiziert</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      {selectedResource.url && (
                        <a
                          href={selectedResource.url}
                          target={selectedResource.url.startsWith('tel:') ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                          <LinkIcon className="w-4 h-4" />
                          <span>Ressource öffnen</span>
                        </a>
                      )}
                      
                      <button
                        onClick={() => setSelectedResource(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Schließen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpertResourceSystem;
