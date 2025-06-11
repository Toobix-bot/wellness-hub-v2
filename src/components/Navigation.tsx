'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { wellnessModules } from '@/utils/wellnessConfig';

interface NavigationItem {
  path: string;
  name: string;
  fullName?: string;
  icon: string;
  color: string;
  description?: string;
}

interface NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Dashboard als erstes Element, dann alle Wellness-Module
const navigationItems: NavigationItem[] = [
  { path: '/', name: 'Dashboard', icon: '🏠', color: 'from-blue-500 to-purple-600' },
  ...wellnessModules.filter(module => module.isActive).map(module => ({
    path: module.path,
    name: module.name.length > 12 ? module.name.split(' ')[0] + '...' : module.name,
    fullName: module.name,
    icon: module.icon,
    color: module.color,
    description: module.description
  }))
];

export default function Navigation({ isOpen, onToggle }: NavigationProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.nav
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 z-50 lg:translate-x-0 lg:opacity-100"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold"
                >
                  W
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                    Wellness Hub
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ganzheitliches Wohlbefinden
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggle}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <span className="text-xl">✕</span>
              </motion.button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-2 px-4">              {navigationItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative group"
                  >
                    <Link
                      href={item.path}
                      className={`group flex items-center space-x-3 w-full p-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                      onMouseEnter={() => setHoveredItem(item.path)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => onToggle()}
                    >
                      <motion.div
                        animate={{ 
                          scale: hoveredItem === item.path ? 1.2 : 1,
                          rotate: hoveredItem === item.path ? 10 : 0
                        }}
                        transition={{ type: 'spring', damping: 15 }}
                        className="text-2xl"
                      >
                        {item.icon}
                      </motion.div>
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        {item.fullName && item.name !== item.fullName && (
                          <p className="text-xs opacity-70 mt-1">{item.fullName}</p>
                        )}
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </Link>
                    
                    {/* Tooltip für truncated Namen */}
                    {item.description && hoveredItem === item.path && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-50 bg-gray-900 text-white text-sm p-3 rounded-lg shadow-lg max-w-xs hidden lg:block"
                      >
                        <div className="font-medium">{item.fullName || item.name}</div>
                        <div className="text-xs opacity-80 mt-1">{item.description}</div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 text-white text-center">
              <div className="text-2xl mb-2">🌟</div>
              <p className="text-sm font-medium mb-1">Wellness-Streak</p>
              <p className="text-xs opacity-90">7 Tage in Folge</p>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
