'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  UserGroupIcon,
  HeartIcon,
  UserIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  VideoCameraIcon,
  MapPinIcon,
  CalendarIcon,
  HandRaisedIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface SocialCircle {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  members: SocialContact[];
  features: string[];
  privacyLevel: 'öffentlich' | 'privat' | 'vertrauensvoll' | 'professionell';
}

interface SocialContact {
  id: string;
  name: string;
  relationship: string;
  contactInfo: {
    phone?: string;
    email?: string;
    emergencyContact: boolean;
  };
  supportType: ('emotional' | 'practical' | 'professional' | 'spiritual')[];
  availability: string;
  lastContact: string;
  notes: string;
  trustLevel: number; // 1-10
}

const socialCircles: SocialCircle[] = [
  {
    id: 'family',
    name: 'Familie',
    description: 'Engste Familienmitglieder und Verwandte',
    icon: HeartIcon,
    color: 'rose',
    privacyLevel: 'vertrauensvoll',
    features: [
      'Notfallkontakte',
      'Familienchat',
      'Gemeinsame Termine',
      'Erinnerungen & Geburtstage'
    ],
    members: [
      {
        id: '1',
        name: 'Maria Schmidt',
        relationship: 'Mutter',
        contactInfo: { phone: '+49 123 456789', emergencyContact: true },
        supportType: ['emotional', 'practical'],
        availability: 'Immer erreichbar',
        lastContact: '2024-01-15',
        notes: 'Beste Unterstützung bei emotionalen Herausforderungen',
        trustLevel: 10
      }
    ]
  },
  {
    id: 'friends',
    name: 'Freunde',
    description: 'Enge Freunde und Vertraute',
    icon: UserGroupIcon,
    color: 'blue',
    privacyLevel: 'privat',
    features: [
      'Gruppenaktivitäten',
      'Gemeinsame Ziele',
      'Gegenseitige Unterstützung',
      'Freizeitplanung'
    ],
    members: []
  },
  {
    id: 'professional',
    name: 'Professionelle Hilfe',
    description: 'Therapeuten, Berater und Gesundheitsexperten',
    icon: ShieldCheckIcon,
    color: 'green',
    privacyLevel: 'professionell',
    features: [
      'Terminverwaltung',
      'Behandlungsnotizen',
      'Medikamentenerinnerungen',
      'Krisenintervention'
    ],
    members: []
  },
  {
    id: 'community',
    name: 'Gemeinschaft',
    description: 'Selbsthilfegruppen und spirituelle Gemeinschaften',
    icon: HandRaisedIcon,
    color: 'purple',
    privacyLevel: 'öffentlich',
    features: [
      'Gruppentreffen',
      'Erfahrungsaustausch',
      'Gemeinsame Praktiken',
      'Anonyme Unterstützung'
    ],
    members: []
  }
];

export default function SozialesNetzwerkPage() {
  const [selectedCircle, setSelectedCircle] = useState<SocialCircle | null>(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const emergencyContacts = socialCircles
    .flatMap(circle => circle.members)
    .filter(member => member.contactInfo.emergencyContact);

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
                Soziales Netzwerk
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Dein Unterstützungssystem verwalten und stärken
              </p>
            </div>
          </div>

          {/* Notfall-Button */}
          <motion.button
            onClick={() => setEmergencyMode(!emergencyMode)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              emergencyMode 
                ? 'bg-red-500 text-white shadow-xl' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExclamationTriangleIcon className="h-5 w-5 inline mr-2" />
            Notfall-Hilfe
          </motion.button>
        </div>

        {/* Notfall-Modus */}
        <AnimatePresence>
          {emergencyMode && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8"
            >
              <h2 className="text-xl font-bold text-red-800 mb-4">
                🚨 Notfall-Kontakte
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.length > 0 ? (
                  emergencyContacts.map(contact => (
                    <div key={contact.id} className="bg-white rounded-lg p-4 border border-red-200">
                      <h3 className="font-semibold text-red-800">{contact.name}</h3>
                      <p className="text-sm text-red-600">{contact.relationship}</p>
                      <a 
                        href={`tel:${contact.contactInfo.phone}`}
                        className="mt-2 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <PhoneIcon className="h-4 w-4 mr-2" />
                        Anrufen
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-red-600 mb-4">Keine Notfallkontakte eingerichtet</p>
                    <button 
                      onClick={() => setShowAddContact(true)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Notfallkontakt hinzufügen
                    </button>
                  </div>
                )}
              </div>
              
              {/* Professionelle Hilfe */}
              <div className="mt-6 pt-6 border-t border-red-200">
                <h3 className="font-semibold text-red-800 mb-3">Professionelle Krisenunterstützung:</h3>
                <div className="space-y-2">
                  <a href="tel:08001110111" className="block text-red-700 hover:text-red-800">
                    📞 Telefonseelsorge: 0800 111 0 111 (kostenlos, 24/7)
                  </a>
                  <a href="tel:08001110222" className="block text-red-700 hover:text-red-800">
                    📞 Telefonseelsorge: 0800 111 0 222 (kostenlos, 24/7)
                  </a>
                  <a href="tel:112" className="block text-red-700 hover:text-red-800">
                    🚑 Notruf: 112 (bei akuter Lebensgefahr)
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Soziale Kreise */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {socialCircles.map((circle) => (
            <motion.div
              key={circle.id}
              onClick={() => setSelectedCircle(circle)}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-${circle.color}-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-12 h-12 bg-${circle.color}-100 dark:bg-${circle.color}-900 rounded-lg flex items-center justify-center mb-4`}>
                <circle.icon className={`h-6 w-6 text-${circle.color}-600 dark:text-${circle.color}-400`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {circle.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {circle.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {circle.members.length} Kontakte
                </span>
                <span className={`px-2 py-1 text-xs rounded-full bg-${circle.color}-100 text-${circle.color}-700`}>
                  {circle.privacyLevel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailansicht eines sozialen Kreises */}
        <AnimatePresence>
          {selectedCircle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-${selectedCircle.color}-100 dark:bg-${selectedCircle.color}-900 rounded-xl flex items-center justify-center`}>
                    <selectedCircle.icon className={`h-8 w-8 text-${selectedCircle.color}-600 dark:text-${selectedCircle.color}-400`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {selectedCircle.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedCircle.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCircle(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Verfügbare Funktionen:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedCircle.features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kontakte */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Kontakte ({selectedCircle.members.length})
                  </h3>
                  <button
                    onClick={() => setShowAddContact(true)}
                    className={`px-4 py-2 bg-${selectedCircle.color}-600 text-white rounded-lg hover:bg-${selectedCircle.color}-700 transition-colors`}
                  >
                    Kontakt hinzufügen
                  </button>
                </div>

                {selectedCircle.members.length > 0 ? (
                  <div className="space-y-4">
                    {selectedCircle.members.map((member) => (
                      <div key={member.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-gray-800 dark:text-white">
                                {member.name}
                              </h4>
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {member.relationship}
                              </span>
                              {member.contactInfo.emergencyContact && (
                                <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                                  Notfallkontakt
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {member.supportType.map((type) => (
                                <span key={type} className={`px-2 py-1 text-xs bg-${selectedCircle.color}-100 text-${selectedCircle.color}-700 rounded-full`}>
                                  {type}
                                </span>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Verfügbarkeit: {member.availability}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Letzter Kontakt: {member.lastContact}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            {member.contactInfo.phone && (
                              <a 
                                href={`tel:${member.contactInfo.phone}`}
                                className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                              >
                                <PhoneIcon className="h-4 w-4" />
                              </a>
                            )}
                            <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                              <ChatBubbleLeftIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        {member.notes && (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <strong>Notizen:</strong> {member.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Noch keine Kontakte in diesem Kreis
                    </p>
                    <button
                      onClick={() => setShowAddContact(true)}
                      className={`px-6 py-2 bg-${selectedCircle.color}-600 text-white rounded-lg hover:bg-${selectedCircle.color}-700 transition-colors`}
                    >
                      Ersten Kontakt hinzufügen
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Dein Netzwerk
            </h3>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {socialCircles.reduce((total, circle) => total + circle.members.length, 0)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gesamte Kontakte
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Notfallkontakte
            </h3>
            <div className="text-3xl font-bold text-red-600 mb-1">
              {emergencyContacts.length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Für Krisenzeiten
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Letzte Aktivität
            </h3>
            <div className="text-3xl font-bold text-green-600 mb-1">
              Heute
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Letzter Kontakt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
