'use client';

import { WellnessModule } from '@/types/wellness';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface WellnessCardProps {
  module: WellnessModule;
  index: number;
}

export default function WellnessCard({ module, index }: WellnessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="group"
    >
      <Link href={module.path}>
        <div className={`wellness-card h-64 relative overflow-hidden bg-gradient-to-br ${module.color} hover:shadow-2xl transform transition-all duration-300`}>
          {/* Hintergrund-Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Inhalt */}
          <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
            {/* Icon und Status */}
            <div className="flex justify-between items-start">
              <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                {module.icon}
              </div>
              {module.isActive && (
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              )}
            </div>
            
            {/* Titel und Beschreibung */}
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                {module.name}
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                {module.description}
              </p>
            </div>
            
            {/* Hover-Effekt */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>
          
          {/* Glassmorphism-Effekt */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}
