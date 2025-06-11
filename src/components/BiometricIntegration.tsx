'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartIcon, 
  MoonIcon, 
  BoltIcon,
  ChartBarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

// Biometric Integration Component für Wearables
const BiometricIntegration = () => {
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [biometricData, setBiometricData] = useState(null);
  const [healthInsights, setHealthInsights] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    loadBiometricData();
    checkDeviceConnections();
  }, []);

  const loadBiometricData = () => {
    // Simuliere biometrische Daten
    setBiometricData({
      heartRate: {
        current: 72,
        average: 68,
        resting: 62,
        max: 185,
        zones: {
          fat_burn: [124, 149],
          cardio: [149, 174],
          peak: [174, 185]
        },
        trend: 'stable',
        lastUpdated: new Date()
      },
      heartRateVariability: {
        current: 45,
        average: 42,
        optimal: 50,
        trend: 'improving',
        stressLevel: 'low'
      },
      sleep: {
        lastNight: {
          duration: 7.5,
          quality: 82,
          deepSleep: 1.8,
          remSleep: 1.2,
          awakenings: 2,
          bedtime: '23:15',
          wakeTime: '06:45'
        },
        weeklyAverage: 7.2,
        trend: 'improving'
      },
      activity: {
        steps: 8420,
        goal: 10000,
        activeMinutes: 35,
        caloriesBurned: 320,
        distance: 6.2, // km
        floors: 12
      },
      stress: {
        current: 25, // 0-100
        average: 30,
        peak: 65,
        recovery: 18,
        trend: 'improving'
      },
      recovery: {
        score: 78, // 0-100
        factors: {
          sleep: 85,
          hrv: 72,
          activity: 80,
          stress: 75
        },
        recommendation: 'Moderate training today'
      }
    });

    setHealthInsights([
      {
        type: 'positive',
        title: 'Ausgezeichnete Herzfrequenzvariabilität',
        description: 'Deine HRV ist 15% über dem Durchschnitt - ein Zeichen für gute Stressresistenz',
        action: 'Nutze diese hohe Erholung für ein intensiveres Training heute',
        confidence: 0.92
      },
      {
        type: 'warning',
        title: 'Leicht erhöhtes Stresslevel am Nachmittag',
        description: 'Zwischen 14:00-16:00 war dein Stresslevel erhöht',
        action: 'Plane eine 10-minütige Atemübung für diese Zeit ein',
        confidence: 0.78
      },
      {
        type: 'info',
        title: 'Schlafoptimierung möglich',
        description: 'Du gehst konsistent 15 Minuten später ins Bett als optimal',
        action: 'Versuche, 15 Minuten früher ins Bett zu gehen für bessere Erholung',
        confidence: 0.85
      }
    ]);
  };

  const checkDeviceConnections = () => {
    setConnectedDevices([
      {
        id: 'apple-watch',
        name: 'Apple Watch Series 9',
        type: 'smartwatch',
        status: 'connected',
        lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
        batteryLevel: 78,
        features: ['heart_rate', 'activity', 'sleep', 'stress', 'ecg'],
        icon: '⌚'
      },
      {
        id: 'iphone-health',
        name: 'iPhone Health App',
        type: 'smartphone',
        status: 'connected',
        lastSync: new Date(Date.now() - 2 * 60 * 1000), // 2 min ago
        features: ['steps', 'sleep', 'mindfulness'],
        icon: '📱'
      }
    ]);
  };

  const connectDevice = async (deviceType) => {
    setIsConnecting(true);
    
    // Simuliere Geräteverbindung
    setTimeout(() => {
      const newDevice = {
        id: `${deviceType}-${Date.now()}`,
        name: getDeviceName(deviceType),
        type: deviceType,
        status: 'connected',
        lastSync: new Date(),
        batteryLevel: Math.floor(Math.random() * 40) + 60,
        features: getDeviceFeatures(deviceType),
        icon: getDeviceIcon(deviceType)
      };
      
      setConnectedDevices(prev => [...prev, newDevice]);
      setIsConnecting(false);
    }, 2000);
  };

  const getDeviceName = (type) => {
    const names = {
      'fitbit': 'Fitbit Versa 4',
      'garmin': 'Garmin Vivosmart 5',
      'samsung': 'Samsung Galaxy Watch',
      'oura': 'Oura Ring Gen3',
      'whoop': 'WHOOP 4.0'
    };
    return names[type] || `${type} Device`;
  };

  const getDeviceFeatures = (type) => {
    const features = {
      'fitbit': ['heart_rate', 'activity', 'sleep', 'stress'],
      'garmin': ['heart_rate', 'activity', 'sleep', 'recovery', 'vo2max'],
      'samsung': ['heart_rate', 'activity', 'sleep', 'stress', 'ecg'],
      'oura': ['sleep', 'recovery', 'readiness', 'temperature'],
      'whoop': ['recovery', 'strain', 'sleep', 'hrv']
    };
    return features[type] || ['heart_rate', 'activity'];
  };

  const getDeviceIcon = (type) => {
    const icons = {
      'fitbit': '🏃‍♂️',
      'garmin': '🎯',
      'samsung': '⌚',
      'oura': '💍',
      'whoop': '🔋'
    };
    return icons[type] || '📱';
  };

  const renderBiometricOverview = () => {
    if (!biometricData) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Heart Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-500 to-pink-600 p-6 rounded-2xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <HeartIcon className="w-8 h-8" />
            <span className="text-sm opacity-75">Herzfrequenz</span>
          </div>
          <div className="text-3xl font-bold mb-2">{biometricData.heartRate.current} BPM</div>
          <div className="text-sm opacity-90">
            Ruhe: {biometricData.heartRate.resting} | Ø {biometricData.heartRate.average}
          </div>
          <div className="mt-3 w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full"
              style={{ width: `${(biometricData.heartRate.current / biometricData.heartRate.max) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Sleep */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <MoonIcon className="w-8 h-8" />
            <span className="text-sm opacity-75">Schlaf</span>
          </div>
          <div className="text-3xl font-bold mb-2">{biometricData.sleep.lastNight.duration}h</div>
          <div className="text-sm opacity-90">
            Qualität: {biometricData.sleep.lastNight.quality}%
          </div>
          <div className="mt-3 flex items-center space-x-2 text-xs">
            <span>Tiefschlaf: {biometricData.sleep.lastNight.deepSleep}h</span>
            <span>REM: {biometricData.sleep.lastNight.remSleep}h</span>
          </div>
        </motion.div>

        {/* Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-2xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <BoltIcon className="w-8 h-8" />
            <span className="text-sm opacity-75">Aktivität</span>
          </div>
          <div className="text-3xl font-bold mb-2">{biometricData.activity.steps.toLocaleString()}</div>
          <div className="text-sm opacity-90">
            Ziel: {biometricData.activity.goal.toLocaleString()} Schritte
          </div>
          <div className="mt-3 w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full"
              style={{ width: `${Math.min((biometricData.activity.steps / biometricData.activity.goal) * 100, 100)}%` }}
            />
          </div>
        </motion.div>

        {/* Recovery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500 to-yellow-600 p-6 rounded-2xl text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <ChartBarIcon className="w-8 h-8" />
            <span className="text-sm opacity-75">Erholung</span>
          </div>
          <div className="text-3xl font-bold mb-2">{biometricData.recovery.score}/100</div>
          <div className="text-sm opacity-90">{biometricData.recovery.recommendation}</div>
          <div className="mt-3 flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-6 rounded ${
                  i < Math.floor(biometricData.recovery.score / 20) ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  const renderDeviceConnections = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        📱 Verbundene Geräte
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {connectedDevices.map((device) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{device.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{device.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{device.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Verbunden</span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Letzte Sync:</span>
                <span className="text-gray-900 dark:text-white">
                  {Math.floor((Date.now() - device.lastSync) / 60000)} Min
                </span>
              </div>
              {device.batteryLevel && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Batterie:</span>
                  <span className="text-gray-900 dark:text-white">{device.batteryLevel}%</span>
                </div>
              )}
            </div>
            
            <div className="mt-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Features:</p>
              <div className="flex flex-wrap gap-1">
                {device.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                  >
                    {feature.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add New Device */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Neues Gerät hinzufügen
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {['fitbit', 'garmin', 'samsung', 'oura', 'whoop'].map((deviceType) => (
            <button
              key={deviceType}
              onClick={() => connectDevice(deviceType)}
              disabled={isConnecting}
              className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <span className="text-2xl mb-2">{getDeviceIcon(deviceType)}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}
              </span>
            </button>
          ))}
        </div>
        
        {isConnecting && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 text-blue-600">
              <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <span>Verbinde Gerät...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderHealthInsights = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        🔬 Gesundheits-Insights
      </h2>
      
      <div className="space-y-4">
        {healthInsights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border-l-4 ${
              insight.type === 'positive' ? 'bg-green-50 dark:bg-green-900/20 border-green-500' :
              insight.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
              'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {insight.type === 'positive' ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                ) : insight.type === 'warning' ? (
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                ) : (
                  <BoltIcon className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {insight.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {insight.description}
                </p>
                <div className={`text-sm font-medium ${
                  insight.type === 'positive' ? 'text-green-700 dark:text-green-300' :
                  insight.type === 'warning' ? 'text-yellow-700 dark:text-yellow-300' :
                  'text-blue-700 dark:text-blue-300'
                }`}>
                  💡 {insight.action}
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Konfidenz: {Math.round(insight.confidence * 100)}%
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          📊 Biometrische Integration
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Verbinde deine Wearables für tiefere Wellness-Insights
        </p>
      </div>

      {/* Biometric Overview */}
      {renderBiometricOverview()}

      {/* Device Connections */}
      {renderDeviceConnections()}

      {/* Health Insights */}
      {renderHealthInsights()}
    </div>
  );
};

export default BiometricIntegration;
