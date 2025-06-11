'use client';

import { useState } from 'react';
import Link from 'next/link';
import { wellnessCategories, wellnessModules } from '@/utils/wellnessConfig';

export default function SimpleNavigation() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('mental-emotional');

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const getModulesForCategory = (categoryId: string) => {
    return wellnessModules.filter(module => 
      wellnessCategories.find(cat => cat.id === categoryId)?.modules.includes(module.id)
    );
  };

  return (
    <div className="w-80 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          🌟 Wellness Hub
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Kategorisierte Navigation
        </p>
      </div>

      {/* Categories */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Kategorien
        </h2>
        
        {wellnessCategories.map((category) => (
          <div key={category.id} className="mb-4">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {category.modules.length} Module
                  </div>
                </div>
              </div>
              <span className="text-gray-400">
                {expandedCategory === category.id ? '▼' : '▶'}
              </span>
            </button>

            {/* Modules List */}
            {expandedCategory === category.id && (
              <div className="mt-2 ml-6 space-y-1">
                {getModulesForCategory(category.id).map((module) => (
                  <Link
                    key={module.id}
                    href={module.path}
                    className="block p-2 rounded text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span className="mr-2">{module.icon}</span>
                    {module.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {wellnessModules.length} Module verfügbar
        </div>
      </div>
    </div>
  );
}
