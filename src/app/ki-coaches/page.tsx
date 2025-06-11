'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  AcademicCapIcon,
  LightBulbIcon,
  HeartIcon,
  BoltIcon,
  BeakerIcon,
  SparklesIcon,
  ClockIcon,
  StarIcon,
  TrophyIcon,
  ChartBarIcon,
  SunIcon
} from '@heroicons/react/24/outline';
import AICoachingHub from '@/components/AICoachingHub';
import { aiPersonalities, getAvailablePersonalities, matchPersonalityToUser } from '@/utils/aiPersonalitiesData';
import { AIPersonality, SessionType } from '@/types/aiPersonalities';

interface AICoachSelectPageProps {}

const AICoachSelectPage: React.FC<AICoachSelectPageProps> = () => {
  const [selectedCoach, setSelectedCoach] = useState<AIPersonality | null>(null);
  const [showCoachingHub, setShowCoachingHub] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>('daily-checkin');
  const [userMood, setUserMood] = useState<number>(5);
  const [userNeeds, setUserNeeds] = useState<string[]>([]);
  const [availableCoaches, setAvailableCoaches] = useState<AIPersonality[]>([]);
  const [coachingHistory, setCoachingHistory] = useState<any[]>([]);

  useEffect(() => {
    // Verfügbare Coaches basierend auf Tageszeit laden
    const available = getAvailablePersonalities();
    setAvailableCoaches(available.length > 0 ? available : aiPersonalities);

    // Coaching-Historie laden
    const saved = localStorage.getItem('wellness-coaching-history');
    if (saved) {
      setCoachingHistory(JSON.parse(saved));
    }
  }, []);

  const sessionTypes: { type: SessionType; label: string; description: string; icon: any }[] = [
    {
      type: 'daily-checkin',
      label: 'Täglicher Check-in',
      description: 'Kurze Reflektion und Tagesplanung',
      icon: SunIcon
    },
    {
      type: 'crisis-intervention',
      label: 'Krisenunterstützung',
      description: 'Sofortige Hilfe in schwierigen Momenten',
      icon: HeartIcon
    },
    {
      type: 'goal-planning',
      label: 'Ziele setzen',
      description: 'Strategische Planung für persönliche Ziele',
      icon: TrophyIcon
    },
    {
      type: 'skill-building',
      label: 'Fähigkeiten entwickeln',
      description: 'Neue Wellness-Techniken erlernen',
      icon: AcademicCapIcon
    },
    {
      type: 'reflection',
      label: 'Tiefe Reflektion',
      description: 'Selbsterkenntnis und Bewusstseinsentwicklung',
      icon: LightBulbIcon
    },
    {
      type: 'celebration',
      label: 'Erfolge feiern',
      description: 'Fortschritte würdigen und motivieren',
      icon: SparklesIcon
    }
  ];

  const needsOptions = [
    'motivation', 'emotional-support', 'creativity', 'spiritual-guidance', 
    'evidence-based', 'practical-advice', 'crisis-help', 'goal-setting'
  ];

  const getCoachIcon = (personality: AIPersonality) => {
    switch (personality.personality) {
      case 'nurturing-healer': return <HeartIcon className="w-6 h-6" />;
      case 'motivational-warrior': return <BoltIcon className="w-6 h-6" />;
      case 'scientific-analyst': return <BeakerIcon className="w-6 h-6" />;
      case 'creative-trickster': return <SparklesIcon className="w-6 h-6" />;
      case 'spiritual-sage': return <AcademicCapIcon className="w-6 h-6" />;
      default: return <ChatBubbleLeftRightIcon className="w-6 h-6" />;
    }
  };

  const getCoachColor = (personality: AIPersonality) => {
    switch (personality.personality) {
      case 'nurturing-healer': return 'from-pink-500 to-rose-600';
      case 'motivational-warrior': return 'from-red-500 to-orange-600';
      case 'scientific-analyst': return 'from-blue-500 to-indigo-600';
      case 'creative-trickster': return 'from-purple-500 to-pink-600';
      case 'spiritual-sage': return 'from-indigo-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleCoachSelect = (coach: AIPersonality) => {
    setSelectedCoach(coach);
    setShowCoachingHub(true);
  };

  const getSmartRecommendation = () => {
    return matchPersonalityToUser(
      {}, // User preferences - würde in echter App gespeichert
      userMood < 4 ? 'crisis' : userMood > 7 ? 'excited' : 'neutral',
      userNeeds
    );
  };

  if (showCoachingHub && selectedCoach) {
    return (
      <AICoachingHub 
        initialPersonality={selectedCoach.id}
        sessionType={sessionType}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
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
                🤖 KI-Wellness-Coaches
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Wähle deinen persönlichen KI-Coach für verschiedene Bedürfnisse
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {coachingHistory.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Sessions</div>
            </div>
          </div>
        </motion.div>

        {/* Benutzer-Setup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Session-Setup
          </h2>
          
          {/* Stimmung */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Wie fühlst du dich gerade? ({userMood}/10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={userMood}
              onChange={(e) => setUserMood(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>😔 Schlecht</span>
              <span>😐 Neutral</span>
              <span>😊 Großartig</span>
            </div>
          </div>

          {/* Session-Typ */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Was möchtest du heute machen?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sessionTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.type}
                    onClick={() => setSessionType(type.type)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      sessionType === type.type
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {type.label}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      {type.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bedürfnisse */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Was brauchst du besonders? (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {needsOptions.map((need) => (
                <button
                  key={need}
                  onClick={() => {
                    setUserNeeds(prev => 
                      prev.includes(need) 
                        ? prev.filter(n => n !== need)
                        : [...prev, need]
                    );
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    userNeeds.includes(need)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-200 dark:hover:bg-purple-800'
                  }`}
                >
                  {need.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Smart Recommendation */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <LightBulbIcon className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Smart-Empfehlung
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Basierend auf deiner Stimmung und Bedürfnissen empfehlen wir: 
                  <span className="font-medium text-purple-600 ml-1">
                    {getSmartRecommendation().name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verfügbare Coaches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Verfügbare KI-Coaches
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCoaches.map((coach, index) => (
              <motion.div
                key={coach.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCoachSelect(coach)}
                className="cursor-pointer"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                  {/* Coach Avatar & Gradient */}
                  <div className={`h-32 bg-gradient-to-br ${getCoachColor(coach)} flex items-center justify-center relative`}>
                    <div className="text-6xl">{coach.avatar}</div>
                    <div className="absolute top-4 right-4">
                      {getCoachIcon(coach)}
                    </div>
                    {coach.availability.emergencyAvailable && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        24/7
                      </div>
                    )}
                  </div>
                  
                  {/* Coach Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {coach.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {coach.title}
                    </p>
                    
                    {/* Specializations */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {coach.specializations.slice(0, 2).map((spec, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full"
                        >
                          {spec.area.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                    
                    {/* Trust Level */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Vertrauen: {coach.trustLevel}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {coach.availability.responseDelay.immediate}% sofort
                        </span>
                      </div>
                    </div>
                    
                    {/* Favorite Quote */}
                    <blockquote className="text-sm italic text-gray-600 dark:text-gray-300 border-l-4 border-purple-300 pl-3">
                      "{coach.quotes[0]}"
                    </blockquote>
                    
                    {/* Action Button */}
                    <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium">
                      Mit {coach.name} sprechen
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coaching-Historie */}
        {coachingHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Deine Coaching-Historie
            </h2>
            <div className="space-y-3">
              {coachingHistory.slice(0, 5).map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🤖</div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Session #{session.id}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {session.type} • {session.duration}min
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {session.date}
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < session.satisfaction 
                              ? 'text-yellow-500' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AICoachSelectPage;
