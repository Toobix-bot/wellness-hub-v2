'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserGroupIcon,
  ArrowTrendingUpIcon,
  HeartIcon,
  SparklesIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyEuroIcon,
  HandRaisedIcon,
  CheckCircleIcon,
  FireIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { CommunityImpact } from '@/types/realWorldChallenges';
import { realWorldChallenges } from '@/utils/realWorldChallengesData';

interface CommunityImpactDashboardProps {
  className?: string;
}

// Mock Community Impact Data - In einer echten App würden diese Daten aus einer Datenbank kommen
const generateCommunityImpactData = (): CommunityImpact[] => {
  return realWorldChallenges.map((challenge, index) => ({
    challengeId: challenge.id,
    totalParticipants: Math.floor(Math.random() * 5000) + 1000,
    activeUsers: Math.floor(Math.random() * 1000) + 200,
    averageImprovement: Math.floor(Math.random() * 40) + 40, // 40-80%
    successRate: Math.floor(Math.random() * 30) + 60, // 60-90%
    communitySupport: {
      mentors: Math.floor(Math.random() * 50) + 10,
      peerSupport: Math.floor(Math.random() * 200) + 50,
      successStories: Math.floor(Math.random() * 100) + 20
    },
    collectiveImpact: {
      totalHoursInvested: Math.floor(Math.random() * 50000) + 10000,
      livesImproved: Math.floor(Math.random() * 2000) + 500,
      costSavings: Math.floor(Math.random() * 500000) + 100000 // Euro
    }
  }));
};

const CommunityImpactDashboard: React.FC<CommunityImpactDashboardProps> = ({ className = '' }) => {
  const [communityData, setCommunityData] = useState<CommunityImpact[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    setCommunityData(generateCommunityImpactData());
  }, []);

  // Gesamtstatistiken berechnen
  const totalStats = communityData.reduce((acc, data) => ({
    totalParticipants: acc.totalParticipants + data.totalParticipants,
    activeUsers: acc.activeUsers + data.activeUsers,
    averageImprovement: acc.averageImprovement + data.averageImprovement,
    totalHours: acc.totalHours + data.collectiveImpact.totalHoursInvested,
    livesImproved: acc.livesImproved + data.collectiveImpact.livesImproved,
    costSavings: acc.costSavings + data.collectiveImpact.costSavings
  }), {
    totalParticipants: 0,
    activeUsers: 0,
    averageImprovement: 0,
    totalHours: 0,
    livesImproved: 0,
    costSavings: 0
  });

  // Durchschnittliche Verbesserung berechnen
  const avgImprovement = communityData.length > 0 
    ? Math.round(totalStats.averageImprovement / communityData.length) 
    : 0;

  // Aktive Challenges sortiert nach Impact
  const topChallenges = [...communityData]
    .sort((a, b) => b.collectiveImpact.livesImproved - a.collectiveImpact.livesImproved)
    .slice(0, 5);

  const getChallenge = (challengeId: string) => {
    return realWorldChallenges.find(c => c.id === challengeId);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatHours = (hours: number): string => {
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    
    if (years > 0) return `${years} Jahre`;
    if (months > 0) return `${months} Monate`;
    if (days > 0) return `${days} Tage`;
    return `${hours} Stunden`;
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-lg">
            <GlobeAltIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Community Impact</h2>
            <p className="text-sm text-gray-600">Kollektive Veränderungen der Wellness-Community</p>
          </div>
        </div>
        
        {/* Zeitraum-Filter */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'week', name: 'Woche' },
            { id: 'month', name: 'Monat' },
            { id: 'year', name: 'Jahr' }
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => setTimeframe(period.id as any)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeframe === period.id
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>
      </div>

      {/* Haupt-Statistiken */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2 mb-2">
            <UserGroupIcon className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Teilnehmer</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">
            {formatNumber(totalStats.totalParticipants)}
          </div>
          <div className="text-xs text-blue-700">
            {formatNumber(totalStats.activeUsers)} aktiv
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4"
        >          <div className="flex items-center space-x-2 mb-2">
            <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Verbesserung</span>
          </div>
          <div className="text-2xl font-bold text-green-900">
            {avgImprovement}%
          </div>
          <div className="text-xs text-green-700">
            Durchschnitt
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2 mb-2">
            <HeartIcon className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Leben verbessert</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {formatNumber(totalStats.livesImproved)}
          </div>
          <div className="text-xs text-purple-700">
            Menschen geholfen
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2 mb-2">
            <ClockIcon className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Investiert</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">
            {formatHours(totalStats.totalHours)}
          </div>
          <div className="text-xs text-orange-700">
            Gemeinschaftszeit
          </div>
        </motion.div>
      </div>

      {/* Impact Highlights */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <SparklesIcon className="w-6 h-6 text-emerald-600" />
          <h3 className="text-lg font-semibold text-emerald-800">Community Impact Highlights</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-1">
              €{formatNumber(totalStats.costSavings)}
            </div>
            <div className="text-sm text-emerald-700">
              Geschätzte Gesundheitskosteneinsparungen
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-1">
              {formatNumber(totalStats.totalHours / 24)}
            </div>
            <div className="text-sm text-emerald-700">
              Tage kollektiver Wellness-Arbeit
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-1">
              {Math.round((totalStats.livesImproved / totalStats.totalParticipants) * 100)}%
            </div>
            <div className="text-sm text-emerald-700">
              Erfolgsrate der Community
            </div>
          </div>
        </div>
      </div>

      {/* Top Impact Challenges */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <FireIcon className="w-5 h-5 text-red-500" />
          <span>Top Impact Herausforderungen</span>
        </h3>
        
        <div className="space-y-3">
          {topChallenges.map((challengeData, index) => {
            const challenge = getChallenge(challengeData.challengeId);
            if (!challenge) return null;

            return (
              <motion.div
                key={challengeData.challengeId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setSelectedChallenge(challengeData.challengeId)}
              >
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-bold text-sm">
                  {index + 1}
                </div>
                
                <div className="text-2xl">{challenge.icon}</div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{formatNumber(challengeData.totalParticipants)} Teilnehmer</span>
                    <span>{challengeData.averageImprovement}% Verbesserung</span>
                    <span>{formatNumber(challengeData.collectiveImpact.livesImproved)} geholfen</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(challengeData.successRate / 20) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Community Support Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <HandRaisedIcon className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Mentoren</span>
          </div>
          <div className="text-xl font-bold text-blue-900">
            {communityData.reduce((sum, data) => sum + data.communitySupport.mentors, 0)}
          </div>
          <div className="text-xs text-blue-700">Aktive Mentoren</div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <UserGroupIcon className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Peer Support</span>
          </div>
          <div className="text-xl font-bold text-green-900">
            {formatNumber(communityData.reduce((sum, data) => sum + data.communitySupport.peerSupport, 0))}
          </div>
          <div className="text-xs text-green-700">Unterstützende Peers</div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircleIcon className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Erfolgsgeschichten</span>
          </div>
          <div className="text-xl font-bold text-purple-900">
            {communityData.reduce((sum, data) => sum + data.communitySupport.successStories, 0)}
          </div>
          <div className="text-xs text-purple-700">Geteilte Erfolge</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-6 text-white"
        >
          <h3 className="text-lg font-semibold mb-2">
            Werde Teil dieser Bewegung! 🌟
          </h3>
          <p className="text-green-100 mb-4">
            Schließe dich unserer Community an und hilf dabei, reale Probleme zu lösen.
          </p>
          <button className="px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
            Jetzt mitmachen
          </button>
        </motion.div>
      </div>

      {/* Detail Modal für Challenge */}
      <AnimatePresence>
        {selectedChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedChallenge(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const challengeData = communityData.find(c => c.challengeId === selectedChallenge);
                const challenge = getChallenge(selectedChallenge);
                
                if (!challengeData || !challenge) return null;

                return (
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="text-3xl">{challenge.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{challenge.title}</h3>
                        <p className="text-gray-600">Community Impact Details</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Teilnahme</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Gesamtteilnehmer:</span>
                            <span className="font-medium">{formatNumber(challengeData.totalParticipants)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Aktive Nutzer:</span>
                            <span className="font-medium">{formatNumber(challengeData.activeUsers)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Erfolgsrate:</span>
                            <span className="font-medium">{challengeData.successRate}%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Impact</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Leben verbessert:</span>
                            <span className="font-medium">{formatNumber(challengeData.collectiveImpact.livesImproved)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Investierte Zeit:</span>
                            <span className="font-medium">{formatHours(challengeData.collectiveImpact.totalHoursInvested)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Kosteneinsparung:</span>
                            <span className="font-medium">€{formatNumber(challengeData.collectiveImpact.costSavings)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                      <button
                        onClick={() => setSelectedChallenge(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Schließen
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommunityImpactDashboard;
