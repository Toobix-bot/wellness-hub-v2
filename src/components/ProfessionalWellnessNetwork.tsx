'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUserMd, 
  FaVideo, 
  FaCalendarAlt, 
  FaCertificate, 
  FaStar,
  FaMapMarkerAlt,
  FaSearch,
  FaFilter,
  FaHeartbeat,
  FaBrain,
  FaLeaf,
  FaUsers,
  FaShieldAlt,
  FaCrown,
  FaGraduationCap,
  FaAward,
  FaHandHoldingHeart,
  FaComments
} from 'react-icons/fa';
import { 
  WellnessProfessional, 
  ProfessionalSpecialty, 
  ConsultationSession,
  CertificationLevel,
  ProfessionalMatchingCriteria 
} from '../types/professionalNetwork';

const ProfessionalWellnessNetwork: React.FC = () => {
  const [professionals, setProfessionals] = useState<WellnessProfessional[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<WellnessProfessional[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<WellnessProfessional | null>(null);
  const [activeTab, setActiveTab] = useState<'browse' | 'sessions' | 'favorites'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<ProfessionalSpecialty | 'all'>('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [userSessions, setUserSessions] = useState<ConsultationSession[]>([]);

  // Mock-Daten für Wellness-Profis
  const mockProfessionals: WellnessProfessional[] = [
    {
      id: 'prof-1',
      name: 'Dr. Sarah Wellness',
      title: 'Ganzheitliche Gesundheitsberaterin',
      specialties: ['mental-health', 'stress-management', 'nutrition'],
      certifications: [
        { name: 'Zertifizierte Psychotherapeutin', level: 'expert', issuer: 'Deutsche Psychologen Akademie' },
        { name: 'Ernährungsberatung', level: 'advanced', issuer: 'Wellness Institut Deutschland' }
      ],
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: 95,
      availability: ['montag', 'dienstag', 'mittwoch'],
      location: 'Berlin, Deutschland',
      languages: ['deutsch', 'englisch'],
      bio: 'Mit über 10 Jahren Erfahrung in der ganzheitlichen Gesundheitsberatung helfe ich Menschen dabei, ihre mentale und körperliche Gesundheit zu optimieren.',
      profileImage: '/api/placeholder/150/150',
      isVerified: true,
      responseTime: '< 2 Stunden',
      successRate: 94,
      sessionTypes: ['video', 'audio', 'chat'],
      pricing: {
        consultation: 95,
        package3Sessions: 270,
        package10Sessions: 850
      }
    },
    {
      id: 'prof-2',
      name: 'Marcus Zen',
      title: 'Meditations- & Achtsamkeitslehrer',
      specialties: ['meditation', 'mindfulness', 'spiritual-guidance'],
      certifications: [
        { name: 'Zertifizierter Meditationslehrer', level: 'master', issuer: 'Internationale Meditation Akademie' },
        { name: 'Achtsamkeitstrainer', level: 'expert', issuer: 'Mindfulness Institute' }
      ],
      rating: 4.8,
      reviewCount: 89,
      hourlyRate: 75,
      availability: ['dienstag', 'donnerstag', 'freitag', 'samstag'],
      location: 'München, Deutschland',
      languages: ['deutsch', 'englisch', 'spanisch'],
      bio: 'Seit 15 Jahren praktiziere und lehre ich Meditation. Meine Mission ist es, Menschen zu innerem Frieden und Klarheit zu führen.',
      profileImage: '/api/placeholder/150/150',
      isVerified: true,
      responseTime: '< 1 Stunde',
      successRate: 96,
      sessionTypes: ['video', 'audio'],
      pricing: {
        consultation: 75,
        package3Sessions: 210,
        package10Sessions: 650
      }
    },
    {
      id: 'prof-3',
      name: 'Dr. Lisa Bewegung',
      title: 'Sportwissenschaftlerin & Fitness Coach',
      specialties: ['fitness', 'rehabilitation', 'sports-psychology'],
      certifications: [
        { name: 'Sportwissenschaft PhD', level: 'expert', issuer: 'Universität Köln' },
        { name: 'Personal Trainer', level: 'advanced', issuer: 'Fitness Academy' }
      ],
      rating: 4.7,
      reviewCount: 156,
      hourlyRate: 85,
      availability: ['montag', 'mittwoch', 'freitag'],
      location: 'Hamburg, Deutschland',
      languages: ['deutsch', 'englisch'],
      bio: 'Als Sportwissenschaftlerin und Personal Trainerin entwickle ich individuelle Fitness- und Rehabilitationsprogramme.',
      profileImage: '/api/placeholder/150/150',
      isVerified: true,
      responseTime: '< 3 Stunden',
      successRate: 91,
      sessionTypes: ['video', 'in-person'],
      pricing: {
        consultation: 85,
        package3Sessions: 240,
        package10Sessions: 750
      }
    }
  ];

  const specialtyIcons = {
    'mental-health': FaBrain,
    'stress-management': FaHeartbeat,
    'nutrition': FaLeaf,
    'meditation': FaUsers,
    'mindfulness': FaShieldAlt,
    'spiritual-guidance': FaCrown,
    'fitness': FaGraduationCap,
    'rehabilitation': FaAward,
    'sports-psychology': FaHandHoldingHeart
  };

  const specialtyLabels = {
    'mental-health': 'Mentale Gesundheit',
    'stress-management': 'Stressmanagement',
    'nutrition': 'Ernährung',
    'meditation': 'Meditation',
    'mindfulness': 'Achtsamkeit',
    'spiritual-guidance': 'Spirituelle Führung',
    'fitness': 'Fitness',
    'rehabilitation': 'Rehabilitation',
    'sports-psychology': 'Sportpsychologie'
  };

  useEffect(() => {
    setProfessionals(mockProfessionals);
    setFilteredProfessionals(mockProfessionals);
  }, []);

  useEffect(() => {
    let filtered = professionals;

    if (searchQuery) {
      filtered = filtered.filter(prof => 
        prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.bio.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(prof => 
        prof.specialties.includes(selectedSpecialty as ProfessionalSpecialty)
      );
    }

    setFilteredProfessionals(filtered);
  }, [searchQuery, selectedSpecialty, professionals]);

  const getCertificationBadgeColor = (level: CertificationLevel) => {
    switch (level) {
      case 'master': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'expert': return 'bg-gold-100 text-gold-800 border-gold-200';
      case 'advanced': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'intermediate': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderProfessionalCard = (professional: WellnessProfessional) => (
    <motion.div
      key={professional.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={professional.profileImage}
            alt={professional.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {professional.isVerified && (
            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
              <FaShieldAlt className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{professional.name}</h3>
            <div className="flex items-center space-x-1">
              <FaStar className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">{professional.rating}</span>
              <span className="text-xs text-gray-500">({professional.reviewCount})</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3">{professional.title}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {professional.specialties.map((specialty) => {
              const IconComponent = specialtyIcons[specialty];
              return (
                <div
                  key={specialty}
                  className="flex items-center space-x-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs"
                >
                  <IconComponent className="w-3 h-3" />
                  <span>{specialtyLabels[specialty]}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <FaMapMarkerAlt className="w-3 h-3" />
              <span>{professional.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaComments className="w-3 h-3" />
              <span>{professional.responseTime}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-900">
              €{professional.hourlyRate}/Stunde
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setSelectedProfessional(professional)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Profil ansehen
              </button>
              <button
                onClick={() => {
                  setSelectedProfessional(professional);
                  setShowBookingModal(true);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
              >
                Buchen
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderProfessionalProfile = () => {
    if (!selectedProfessional) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="bg-white rounded-xl p-8 shadow-lg"
      >
        <div className="flex items-start space-x-6 mb-6">
          <img
            src={selectedProfessional.profileImage}
            alt={selectedProfessional.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{selectedProfessional.name}</h2>
              {selectedProfessional.isVerified && (
                <FaShieldAlt className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <p className="text-lg text-gray-600 mb-3">{selectedProfessional.title}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <FaStar className="w-4 h-4 text-yellow-400" />
                <span>{selectedProfessional.rating} ({selectedProfessional.reviewCount} Bewertungen)</span>
              </div>
              <div>Erfolgsrate: {selectedProfessional.successRate}%</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Über mich</h3>
          <p className="text-gray-700 leading-relaxed">{selectedProfessional.bio}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Zertifizierungen</h3>
          <div className="space-y-2">
            {selectedProfessional.certifications.map((cert, index) => (
              <div
                key={index}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getCertificationBadgeColor(cert.level)} mr-2 mb-2`}
              >
                <FaCertificate className="w-3 h-3 mr-2" />
                {cert.name} - {cert.issuer}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Preise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Einzelberatung</div>
              <div className="text-xl font-bold">€{selectedProfessional.pricing.consultation}</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-sm text-indigo-600">3er Paket</div>
              <div className="text-xl font-bold text-indigo-700">€{selectedProfessional.pricing.package3Sessions}</div>
              <div className="text-xs text-indigo-600">€{Math.round(selectedProfessional.pricing.package3Sessions / 3)} pro Session</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600">10er Paket</div>
              <div className="text-xl font-bold text-green-700">€{selectedProfessional.pricing.package10Sessions}</div>
              <div className="text-xs text-green-600">€{Math.round(selectedProfessional.pricing.package10Sessions / 10)} pro Session</div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setShowBookingModal(true)}
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <FaCalendarAlt className="inline w-4 h-4 mr-2" />
            Termin buchen
          </button>
          <button
            onClick={() => setSelectedProfessional(null)}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Zurück
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professionelles Wellness-Netzwerk
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Verbinden Sie sich mit verifizierten Wellness-Experten und erhalten Sie 
            professionelle Beratung für Ihre Gesundheits- und Wellness-Ziele.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {[
              { id: 'browse', label: 'Experten durchsuchen', icon: FaSearch },
              { id: 'sessions', label: 'Meine Sessions', icon: FaVideo },
              { id: 'favorites', label: 'Favoriten', icon: FaStar }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="inline w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'browse' && !selectedProfessional && (
          <div>
            {/* Search and Filter */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Nach Experten, Spezialisierungen oder Standorten suchen..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value as any)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="all">Alle Spezialisierungen</option>
                    {Object.entries(specialtyLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Professionals Grid */}
            <div className="space-y-6">
              <AnimatePresence>
                {filteredProfessionals.map(renderProfessionalCard)}
              </AnimatePresence>
            </div>
          </div>
        )}

        {selectedProfessional && renderProfessionalProfile()}

        {activeTab === 'sessions' && (
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Meine Sessions</h2>
            <div className="text-center py-12">
              <FaVideo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Noch keine Sessions gebucht.</p>
              <button
                onClick={() => setActiveTab('browse')}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Experten entdecken
              </button>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Meine Favoriten</h2>
            <div className="text-center py-12">
              <FaStar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Noch keine Favoriten gespeichert.</p>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        <AnimatePresence>
          {showBookingModal && selectedProfessional && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Termin buchen mit {selectedProfessional.name}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session-Typ
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProfessional.sessionTypes.map((type) => (
                        <button
                          key={type}
                          className="p-3 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                        >
                          {type === 'video' && <FaVideo className="w-5 h-5 mx-auto mb-1" />}
                          {type === 'audio' && <FaComments className="w-5 h-5 mx-auto mb-1" />}
                          {type === 'in-person' && <FaUsers className="w-5 h-5 mx-auto mb-1" />}
                          <div className="text-sm capitalize">{type}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verfügbare Termine
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Heute 14:00', 'Morgen 10:00', 'Morgen 16:00', 'Übermorgen 09:00'].map((time) => (
                        <button
                          key={time}
                          className="p-3 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-sm"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nachricht (optional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Termin bestätigen
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfessionalWellnessNetwork;
