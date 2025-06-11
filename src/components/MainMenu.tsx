'use client';

import { motion } from 'framer-motion';
import WellnessCard from '@/components/WellnessCard';
import { wellnessModules } from '@/utils/wellnessConfig';

export default function MainMenu() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 wellness-text-gradient">
          Wellness Hub
        </h1>        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          Wissenschaftlich fundierte Lösungen für reale Probleme und ganzheitliches Wohlbefinden
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <div className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
            Evidenzbasiert
          </div>
          <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
            Reale Lösungen
          </div>
          <div className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
            Community-getrieben
          </div>
        </div>
        <motion.div 
          className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </motion.header>

      {/* Hauptmenü Grid */}
      <main className="container mx-auto px-4 pb-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {wellnessModules.map((module, index) => (
            <WellnessCard 
              key={module.id} 
              module={module} 
              index={index}
            />
          ))}
        </motion.div>

        {/* Call-to-Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-white/70 text-lg mb-6">
            Beginnen Sie Ihre Reise zu mehr Wohlbefinden und innerer Balance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300"
            >
              Ersten Schritt machen
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-wellness-primary to-wellness-secondary rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300"
            >
              Fortschritt anzeigen
            </motion.button>
          </div>
        </motion.div>
      </main>

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-2 border-white/30 rounded-full"
        />
      </div>
      <div className="fixed bottom-20 right-10 opacity-20">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm"
        />
      </div>
    </div>
  );
}
