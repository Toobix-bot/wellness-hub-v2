'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RealWorldChallenges from '@/components/RealWorldChallenges';
import { 
  ChartBarIcon, 
  LightBulbIcon, 
  HeartIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  BeakerIcon,
  ArrowTrendingUpIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { realWorldChallenges } from '@/utils/realWorldChallengesData';

export default function RealWorldChallengesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl">Laden...</div>
    </div>;
  }

  const totalAffected = realWorldChallenges.reduce((sum, challenge) => 
    sum + challenge.statistics.globalAffected, 0
  );

  const averagePrevalence = realWorldChallenges.reduce((sum, challenge) => 
    sum + challenge.prevalence, 0
  ) / realWorldChallenges.length;

  const categoryStats = {
    mental_health: realWorldChallenges.filter(c => c.category === 'mental_health').length,
    physical_health: realWorldChallenges.filter(c => c.category === 'physical_health').length,
    social_issues: realWorldChallenges.filter(c => c.category === 'social_issues').length,
    environmental: realWorldChallenges.filter(c => c.category === 'environmental').length,
    personal_crisis: realWorldChallenges.filter(c => c.category === 'personal_crisis').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Zurück zum Dashboard</span>
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-4 mb-6"
            >
              <div className="bg-white/20 p-4 rounded-2xl">
                <ExclamationTriangleIcon className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-2">
                  Reale Herausforderungen
                </h1>
                <p className="text-xl text-white/90">
                  Wissenschaftlich fundierte Lösungen für echte Probleme
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <ArrowTrendingUpIcon className="w-6 h-6" />
                  <span className="font-semibold">Globale Reichweite</span>
                </div>
                <div className="text-3xl font-bold">
                  {(totalAffected / 1000000000).toFixed(1)}B
                </div>
                <div className="text-sm text-white/80">
                  Menschen weltweit betroffen
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <ChartBarIcon className="w-6 h-6" />
                  <span className="font-semibold">Durchschnittliche Prävalenz</span>
                </div>
                <div className="text-3xl font-bold">
                  {averagePrevalence.toFixed(1)}%
                </div>
                <div className="text-sm text-white/80">
                  der Bevölkerung betroffen
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <LightBulbIcon className="w-6 h-6" />
                  <span className="font-semibold">Verfügbare Lösungen</span>
                </div>
                <div className="text-3xl font-bold">
                  {realWorldChallenges.length}
                </div>
                <div className="text-sm text-white/80">
                  evidenzbasierte Herausforderungen
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Mission Statement</h3>
              <p className="text-white/90 leading-relaxed">
                Unser Ziel ist es, Menschen dabei zu helfen, reale Probleme mit wissenschaftlich 
                fundierten Methoden zu bewältigen. Jede Herausforderung wurde sorgfältig recherchiert 
                und die Lösungen basieren auf aktueller Forschung und bewährten Praktiken. 
                Wir glauben daran, dass jeder Einzelne positive Veränderungen bewirken kann - 
                sowohl für sich selbst als auch für die Gesellschaft.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Category Overview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Kategorien der Herausforderungen
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              category: 'mental_health',
              name: 'Psychische Gesundheit',
              icon: <HeartIcon className="w-8 h-8" />,
              color: 'from-blue-500 to-purple-600',
              description: 'Depression, Angststörungen, Burnout und andere mentale Herausforderungen',
              count: categoryStats.mental_health
            },
            {
              category: 'physical_health',
              name: 'Körperliche Gesundheit',
              icon: <BeakerIcon className="w-8 h-8" />,
              color: 'from-green-500 to-teal-600',
              description: 'Körperliche Beschwerden und gesundheitliche Herausforderungen',
              count: categoryStats.physical_health
            },
            {
              category: 'social_issues',
              name: 'Soziale Probleme',
              icon: <UserGroupIcon className="w-8 h-8" />,
              color: 'from-orange-500 to-red-600',
              description: 'Einsamkeit, soziale Isolation und zwischenmenschliche Konflikte',
              count: categoryStats.social_issues
            },
            {
              category: 'environmental',
              name: 'Umwelt & Klima',
              icon: <ArrowTrendingUpIcon className="w-8 h-8" />,
              color: 'from-emerald-500 to-green-600',
              description: 'Klimaangst, Umweltsorgen und nachhaltige Lebensstile',
              count: categoryStats.environmental
            },
            {
              category: 'personal_crisis',
              name: 'Persönliche Krisen',
              icon: <ExclamationTriangleIcon className="w-8 h-8" />,
              color: 'from-red-500 to-pink-600',
              description: 'Lebenskrisen, Verluste und schwierige Übergangsphasen',
              count: categoryStats.personal_crisis
            }
          ].filter(cat => cat.count > 0).map((category) => (
            <motion.div
              key={category.category}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`bg-gradient-to-r ${category.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  {category.icon}
                </div>
                <div className="text-2xl font-bold">
                  {category.count}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">
                {category.name}
              </h3>
              
              <p className="text-white/90 text-sm">
                {category.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Main Challenge Component */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="max-w-7xl mx-auto px-6 pb-12"
      >
        <RealWorldChallenges />
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-gray-900 text-white py-16"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Bereit, Veränderungen zu bewirken?
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            Starte noch heute mit evidenzbasierten Lösungen und werde Teil einer 
            Community, die echte Probleme angeht und positive Veränderungen schafft.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Zum Dashboard
            </Link>
            
            <Link
              href="/community"
              className="px-8 py-3 border border-gray-600 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Community beitreten
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
