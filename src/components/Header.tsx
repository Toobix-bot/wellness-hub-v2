'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SmartNotificationSystem from './SmartNotificationSystem';

interface HeaderProps {
  onMenuToggle: () => void;
  title?: string;
  subtitle?: string;
}

export default function Header({ onMenuToggle, title = "Wellness Hub", subtitle }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30"
    >
      <div className="flex items-center justify-between px-6 py-4">        {/* Left Side - Menu & Title */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            title="Navigation ein-/ausblenden"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded"></div>
              <div className="w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded"></div>
              <div className="w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded"></div>
            </div>
          </motion.button>
            <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            )}
            {title === "Wellness Hub" && (
              <div className="flex items-center space-x-2 mt-1">
                <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Wissenschaftlich fundiert
                </div>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Reale Lösungen
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2"
          >
            <span className="text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Wellness-Inhalte suchen..."
              className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 w-48"
            />
          </motion.div>          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            {/* Smart Notifications System */}
            <SmartNotificationSystem />

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              <span className="text-xl">🌙</span>
            </motion.button>

            {/* User Profile */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  M
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Micha</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Wellness-Reisender</p>
                </div>
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                          M
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">Micha</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">micha@wellness.hub</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      {[
                        { icon: '👤', label: 'Profil', href: '/profile' },
                        { icon: '⚙️', label: 'Einstellungen', href: '/settings' },
                        { icon: '📊', label: 'Statistiken', href: '/stats' },
                        { icon: '🎯', label: 'Ziele', href: '/goals' },
                        { icon: '❓', label: 'Hilfe', href: '/help' },
                      ].map((item) => (
                        <motion.button
                          key={item.label}
                          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                        </motion.button>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                      <motion.button
                        whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
                      >
                        <span className="text-lg">🚪</span>
                        <span className="text-red-600 dark:text-red-400">Abmelden</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>      {/* Click outside to close menus */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </motion.header>
  );
}
