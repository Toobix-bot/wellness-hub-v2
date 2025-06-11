'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wellnessModules } from '@/utils/wellnessConfig';
import { userStatsStorage, activitiesStorage } from '@/utils/wellnessStorage';
import { UserStats } from '@/types/analytics';

interface EcosystemElement {
  id: string;
  type: 'tree' | 'flower' | 'mountain' | 'river' | 'sun' | 'cloud' | 'bird';
  moduleId: string;
  growth: number; // 0-100
  lastActivity: Date | null;
  position: { x: number; y: number };
  size: number;
  color: string;
}

export default function WellnessEcosystem() {
  const [ecosystem, setEcosystem] = useState<EcosystemElement[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [selectedElement, setSelectedElement] = useState<EcosystemElement | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'day' | 'evening' | 'night'>('day');
  const [weather, setWeather] = useState<'sunny' | 'cloudy' | 'rainy' | 'stormy'>('sunny');

  useEffect(() => {
    initializeEcosystem();
    updateTimeAndWeather();
    
    const interval = setInterval(() => {
      updateTimeAndWeather();
      updateEcosystemGrowth();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const initializeEcosystem = () => {
    const stats = userStatsStorage.get();
    const activities = activitiesStorage.get();
    setUserStats(stats);

    const elements: EcosystemElement[] = [];
    
    // Erstelle Ökosystem-Elemente basierend auf Wellness-Modulen
    wellnessModules.forEach((module, index) => {
      const moduleActivities = activities.filter(a => a.moduleId === module.id);
      const totalSessions = moduleActivities.length;
      const lastActivity = moduleActivities.length > 0 ? 
        moduleActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0].timestamp : 
        null;

      // Verschiedene Elemente für verschiedene Module
      let elementType: EcosystemElement['type'] = 'tree';
      let color = module.color;

      switch(module.id) {
        case 'stille':
          elementType = 'mountain';
          break;
        case 'dankbarkeit':
          elementType = 'flower';
          break;
        case 'fortschritt':
          elementType = 'tree';
          break;
        case 'freude':
          elementType = 'sun';
          break;
        case 'therapie':
          elementType = 'river';
          break;
        case 'transformation':
          elementType = 'bird';
          break;
        case 'liebe':
          elementType = 'flower';
          break;
        case 'bewusstsein':
          elementType = 'cloud';
          break;
        case 'wissen':
          elementType = 'tree';
          break;
        case 'begleiter':
          elementType = 'bird';
          break;
      }

      const growth = Math.min(100, (totalSessions * 10) + (stats.totalPoints * 0.1));
      const size = 0.5 + (growth / 100) * 1.5; // 0.5x to 2x scale

      elements.push({
        id: `${module.id}-${elementType}`,
        type: elementType,
        moduleId: module.id,
        growth,
        lastActivity,
        position: {
          x: 10 + (index % 4) * 20 + Math.random() * 10,
          y: 20 + Math.floor(index / 4) * 25 + Math.random() * 10
        },
        size,
        color: color
      });
    });

    setEcosystem(elements);
  };

  const updateTimeAndWeather = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 5 && hour < 10) setTimeOfDay('morning');
    else if (hour >= 10 && hour < 17) setTimeOfDay('day');
    else if (hour >= 17 && hour < 22) setTimeOfDay('evening');
    else setTimeOfDay('night');

    // Simuliere Wetter basierend auf Benutzeraktivität
    const stats = userStatsStorage.get();
    const activities = activitiesStorage.get();
    const recentActivities = activities.filter(a => {
      const daysDiff = (Date.now() - a.timestamp.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 1;
    });

    if (recentActivities.length >= 3) setWeather('sunny');
    else if (recentActivities.length >= 1) setWeather('cloudy');
    else if (stats.currentStreak === 0) setWeather('stormy');
    else setWeather('rainy');
  };

  const updateEcosystemGrowth = () => {
    const activities = activitiesStorage.get();
    
    setEcosystem(prev => prev.map(element => {
      const moduleActivities = activities.filter(a => a.moduleId === element.moduleId);
      const recentActivity = moduleActivities.find(a => {
        const hoursDiff = (Date.now() - a.timestamp.getTime()) / (1000 * 60 * 60);
        return hoursDiff <= 24;
      });

      if (recentActivity) {
        return {
          ...element,
          growth: Math.min(100, element.growth + 2),
          lastActivity: recentActivity.timestamp,
          size: Math.min(2, element.size + 0.05)
        };
      }

      // Langsames Schrumpfen bei Inaktivität
      const daysSinceActivity = element.lastActivity ? 
        (Date.now() - element.lastActivity.getTime()) / (1000 * 60 * 60 * 24) : 30;
      
      if (daysSinceActivity > 7) {
        return {
          ...element,
          growth: Math.max(0, element.growth - 1),
          size: Math.max(0.3, element.size - 0.02)
        };
      }

      return element;
    }));
  };

  const getElementIcon = (element: EcosystemElement): string => {
    const healthiness = element.growth / 100;
    
    switch(element.type) {
      case 'tree':
        if (healthiness > 0.8) return '🌳';
        if (healthiness > 0.5) return '🌲';
        if (healthiness > 0.2) return '🌿';
        return '🌱';
      
      case 'flower':
        if (healthiness > 0.8) return '🌺';
        if (healthiness > 0.5) return '🌸';
        if (healthiness > 0.2) return '🌼';
        return '🌱';
        
      case 'mountain':
        if (healthiness > 0.8) return '🏔️';
        if (healthiness > 0.5) return '⛰️';
        return '🗻';
        
      case 'river':
        if (healthiness > 0.8) return '🌊';
        if (healthiness > 0.5) return '💧';
        return '💙';
        
      case 'sun':
        if (weather === 'stormy') return '⛈️';
        if (weather === 'rainy') return '🌧️';
        if (weather === 'cloudy') return '⛅';
        if (timeOfDay === 'night') return '🌙';
        if (timeOfDay === 'evening') return '🌅';
        return '☀️';
        
      case 'cloud':
        if (healthiness > 0.8) return '☁️';
        if (healthiness > 0.5) return '⛅';
        return '🌫️';
        
      case 'bird':
        if (healthiness > 0.8) return '🦅';
        if (healthiness > 0.5) return '🐦';
        return '🐣';
        
      default:
        return '🌿';
    }
  };

  const getBackgroundGradient = (): string => {
    const weatherColors = {
      sunny: timeOfDay === 'night' ? 'from-indigo-900 via-purple-900 to-pink-900' : 
             timeOfDay === 'evening' ? 'from-orange-400 via-pink-500 to-purple-600' :
             timeOfDay === 'morning' ? 'from-yellow-300 via-orange-400 to-pink-500' :
             'from-blue-400 via-cyan-300 to-yellow-300',
      cloudy: 'from-gray-400 via-gray-500 to-blue-600',
      rainy: 'from-gray-600 via-blue-700 to-gray-800',
      stormy: 'from-gray-800 via-purple-900 to-black'
    };
    
    return weatherColors[weather];
  };

  const getModuleName = (moduleId: string): string => {
    return wellnessModules.find(m => m.id === moduleId)?.name || moduleId;
  };

  const getDaysAgo = (date: Date | null): string => {
    if (!date) return 'Nie';
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Heute';
    if (days === 1) return 'Gestern';
    return `Vor ${days} Tagen`;
  };

  return (
    <div className="relative">
      {/* Ecosystem Visualization */}
      <div className={`relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br ${getBackgroundGradient()} p-8 shadow-2xl`}>
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-600 to-transparent"></div>
          {timeOfDay === 'night' && (
            <div className="absolute top-4 right-8 text-4xl">⭐</div>
          )}
          {weather === 'rainy' && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, 400] }}
                  transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
                  className="absolute text-blue-300 text-xs"
                  style={{ left: `${Math.random() * 100}%`, top: '-20px' }}
                >
                  💧
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Ecosystem Elements */}
        <div className="relative h-full">
          {ecosystem.map((element) => (
            <motion.div
              key={element.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: element.size, 
                opacity: Math.max(0.3, element.growth / 100),
                y: [0, -5, 0] 
              }}
              transition={{ 
                scale: { duration: 0.5 },
                y: { duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: element.size * 1.2, y: -10 }}
              onClick={() => setSelectedElement(element)}
              className="absolute cursor-pointer filter drop-shadow-lg"
              style={{
                left: `${element.position.x}%`,
                top: `${element.position.y}%`,
                fontSize: `${1 + element.size}rem`
              }}
            >
              {getElementIcon(element)}
              
              {/* Health Ring */}
              <div className="absolute -inset-2 rounded-full border-2 border-white/30 opacity-0 hover:opacity-100 transition-opacity">
                <div 
                  className="absolute inset-0 rounded-full border-2 border-green-400"
                  style={{
                    background: `conic-gradient(from 0deg, #10b981 ${element.growth}%, transparent ${element.growth}%)`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weather and Time Info */}
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-xl p-3 text-white">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-lg">
              {timeOfDay === 'morning' && '🌅'}
              {timeOfDay === 'day' && '☀️'}
              {timeOfDay === 'evening' && '🌇'}
              {timeOfDay === 'night' && '🌙'}
            </span>
            <span className="capitalize">{timeOfDay}</span>
            <span>•</span>
            <span className="text-lg">
              {weather === 'sunny' && '☀️'}
              {weather === 'cloudy' && '⛅'}
              {weather === 'rainy' && '🌧️'}
              {weather === 'stormy' && '⛈️'}
            </span>
            <span className="capitalize">{weather}</span>
          </div>
        </div>

        {/* Ecosystem Health */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-xl p-3 text-white">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {Math.round(ecosystem.reduce((sum, el) => sum + el.growth, 0) / ecosystem.length)}%
            </div>
            <div className="text-xs opacity-80">Ökosystem Gesundheit</div>
          </div>
        </div>
      </div>

      {/* Ecosystem Statistics */}
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800/50">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🌱</div>
            <div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">
                {ecosystem.filter(e => e.growth > 50).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Gesunde Elemente</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800/50">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">💧</div>
            <div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">
                {ecosystem.filter(e => {
                  const daysSince = e.lastActivity ? 
                    (Date.now() - e.lastActivity.getTime()) / (1000 * 60 * 60 * 24) : 30;
                  return daysSince <= 1;
                }).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Aktiv heute</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800/50">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">⭐</div>
            <div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">
                {ecosystem.filter(e => e.growth === 100).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Perfekte Balance</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800/50">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🚨</div>
            <div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">
                {ecosystem.filter(e => e.growth < 20).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Braucht Aufmerksamkeit</div>
            </div>
          </div>
        </div>
      </div>

      {/* Element Detail Modal */}
      <AnimatePresence>
        {selectedElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedElement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">{getElementIcon(selectedElement)}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                  {getModuleName(selectedElement.moduleId)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)} in deinem Wellness-Ökosystem
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Gesundheit:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-500"
                        style={{ width: `${selectedElement.growth}%` }}
                      />
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {Math.round(selectedElement.growth)}%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Größe:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {(selectedElement.size * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Letzte Aktivität:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {getDaysAgo(selectedElement.lastActivity)}
                  </span>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 mt-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Pflege-Tipps:</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {selectedElement.growth < 30 && (
                      <li>• Regelmäßige Aktivität in diesem Bereich würde helfen</li>
                    )}
                    {selectedElement.growth >= 30 && selectedElement.growth < 70 && (
                      <li>• Kontinuität beibehalten für weiteres Wachstum</li>
                    )}
                    {selectedElement.growth >= 70 && (
                      <li>• Großartig! Versuche die Balance zu halten</li>
                    )}
                    <li>• Täglich kleine Schritte sind effektiver als große Sprünge</li>
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedElement(null);
                    const module = wellnessModules.find(m => m.id === selectedElement.moduleId);
                    if (module) {
                      window.location.href = module.path;
                    }
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  🌱 Jetzt pflegen
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
