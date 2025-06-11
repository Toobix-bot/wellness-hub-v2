'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { wellnessCategories, wellnessModules } from '@/utils/wellnessConfig';

interface CategorizedNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function CategorizedNavigation({ isOpen, onToggle }: CategorizedNavigationProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const getModulesForCategory = (categoryId: string) => {
    return wellnessModules.filter(module => 
      wellnessCategories.find(cat => cat.id === categoryId)?.modules.includes(module.id)
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>      {/* Navigation Sidebar */}
      <motion.nav
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -320,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed left-0 top-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md 
          shadow-xl border-r border-gray-200 dark:border-gray-700 z-50
          lg:static lg:translate-x-0 lg:w-80
          ${isOpen ? 'block' : 'hidden lg:block'}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold wellness-heading">
              Wellness Hub
            </h1>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Ganzheitliches Wohlbefinden
          </p>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-2">
            {/* Dashboard Link */}
            <Link href="/" onClick={() => setExpandedCategory(null)}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  pathname === '/'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <div className="font-semibold">Dashboard</div>
                    <div className={`text-sm ${pathname === '/' ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                      Übersicht & Analytics
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Category Sections */}
            {wellnessCategories.map((category, index) => (
              <div key={category.id} className="space-y-1">
                {/* Category Header */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                    expandedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{category.icon}</span>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className={`text-xs ${
                          expandedCategory === category.id 
                            ? 'text-white/80' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {category.modules.length} Module
                        </div>
                      </div>
                    </div>
                    <motion.span
                      animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`text-sm ${
                        expandedCategory === category.id 
                          ? 'text-white' 
                          : 'text-gray-400'
                      }`}
                    >
                      ▼
                    </motion.span>
                  </div>
                </motion.button>

                {/* Category Modules */}
                <AnimatePresence>
                  {expandedCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 space-y-1 overflow-hidden"
                    >
                      {getModulesForCategory(category.id).map((module) => (
                        <Link key={module.id} href={module.path}>
                          <motion.div
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 rounded-lg transition-all duration-300 ${
                              pathname === module.path
                                ? `bg-gradient-to-r ${module.color} text-white shadow-md`
                                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{module.icon}</span>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{module.name}</div>
                                <div className={`text-xs ${
                                  pathname === module.path 
                                    ? 'text-white/80' 
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                  {module.description?.substring(0, 40)}...
                                </div>
                              </div>
                              {module.isActive && (
                                <div className={`w-2 h-2 rounded-full ${
                                  pathname === module.path 
                                    ? 'bg-white' 
                                    : 'bg-green-500'
                                }`} />
                              )}
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-8">
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              <div>Wellness Hub v2.0</div>
              <div className="mt-1">Life-RPG Revolution</div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
