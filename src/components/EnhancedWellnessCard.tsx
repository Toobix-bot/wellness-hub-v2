'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface EnhancedWellnessCardProps {
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
  isActive?: boolean;
  features?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: string;
  premium?: boolean;
}

export default function EnhancedWellnessCard({ 
  title, 
  description, 
  icon, 
  path, 
  color, 
  isActive = true,
  features = [],
  difficulty,
  estimatedTime,
  premium = false
}: EnhancedWellnessCardProps) {
  const difficultyColors = {
    beginner: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
    intermediate: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300',
    advanced: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
  };

  const difficultyLabels = {
    beginner: 'Einsteiger',
    intermediate: 'Fortgeschritten',
    advanced: 'Experte'
  };

  return (
    <Link href={path}>
      <motion.div
        className={`wellness-card p-6 cursor-pointer relative overflow-hidden ${
          !isActive ? 'opacity-60' : ''
        }`}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Premium Badge */}
        {premium && (
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              PREMIUM
            </span>
          </div>
        )}

        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="text-4xl mb-2">{icon}</div>
            {!isActive && (
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                Bald verfügbar
              </span>
            )}
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-bold wellness-heading mb-3 line-clamp-2">
            {title}
          </h3>
          <p className="wellness-text text-sm mb-4 line-clamp-3">
            {description}
          </p>

          {/* Meta Information */}
          <div className="space-y-3">
            {/* Difficulty & Time */}
            <div className="flex items-center justify-between text-xs">
              {difficulty && (
                <span className={`px-2 py-1 rounded-full font-medium ${difficultyColors[difficulty]}`}>
                  {difficultyLabels[difficulty]}
                </span>
              )}
              {estimatedTime && (
                <span className="text-gray-500 dark:text-gray-400">
                  ⏱️ {estimatedTime}
                </span>
              )}
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {features.length > 3 && (
                  <span className="text-xs text-gray-400 dark:text-gray-500 px-2 py-1">
                    +{features.length - 3} mehr
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <div className={`
              w-full py-2 px-4 rounded-lg text-center font-medium text-sm
              bg-gradient-to-r ${color} text-white
              transform transition-all duration-200
              ${isActive ? 'hover:scale-105' : 'cursor-not-allowed'}
            `}>
              {isActive ? 'Entdecken →' : 'Kommt bald'}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
