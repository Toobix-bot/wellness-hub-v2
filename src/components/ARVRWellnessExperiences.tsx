'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  VREnvironment, 
  ARExperience, 
  VRSession, 
  VRMetrics,
  XRCapabilities,
  ImmersiveStoryline
} from '@/types/arvr';

export default function ARVRWellnessExperiences() {
  const [activeTab, setActiveTab] = useState<'vr' | 'ar' | 'metrics' | 'settings'>('vr');
  const [vrEnvironments, setVrEnvironments] = useState<VREnvironment[]>([]);
  const [arExperiences, setArExperiences] = useState<ARExperience[]>([]);
  const [currentSession, setCurrentSession] = useState<VRSession | null>(null);
  const [xrCapabilities, setXrCapabilities] = useState<XRCapabilities | null>(null);
  const [metrics, setMetrics] = useState<VRMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    initializeARVR();
    checkXRSupport();
  }, []);

  const initializeARVR = () => {
    setIsLoading(true);

    setTimeout(() => {
      // VR Environments initialisieren
      const sampleVREnvironments: VREnvironment[] = [
        {
          id: 'zen-garden',
          name: 'Zen-Garten',
          description: 'Ein friedlicher japanischer Garten mit sanftem Wasserplätschern',
          type: 'meditation_room',
          thumbnail: '🏯',
          duration: 20,
          difficulty: 'beginner',
          features: [
            {
              name: 'Geführte Meditation',
              description: 'Sanfte Anleitung durch einen erfahrenen Meditationslehrer',
              type: 'guided_meditation',
              isActive: true
            },
            {
              name: 'Atemübungen',
              description: 'Visuelle Atemführung mit beruhigenden Elementen',
              type: 'breathing_exercise',
              isActive: true
            },
            {
              name: 'Interaktive Koi-Fische',
              description: 'Berührbare Koi-Fische, die auf Gesten reagieren',
              type: 'interactive_elements',
              isActive: true
            }
          ],
          audioTracks: [
            {
              id: 'zen-ambient',
              name: 'Zen-Ambiente',
              type: 'ambient',
              duration: 1200,
              url: '/assets/audio/zen-ambient.mp3'
            },
            {
              id: 'water-sounds',
              name: 'Wasserplätschern',
              type: 'nature',
              duration: 1800,
              url: '/assets/audio/water-sounds.mp3'
            }
          ],
          customization: {
            timeOfDay: 'sunset',
            weather: 'clear',
            ambientIntensity: 70,
            interactionLevel: 'interactive'
          },
          biometricIntegration: true,
          socialFeatures: false
        },
        {
          id: 'cosmic-meditation',
          name: 'Kosmische Meditation',
          description: 'Schwebe durch das Universum und finde inneren Frieden',
          type: 'cosmic_space',
          thumbnail: '🌌',
          duration: 30,
          difficulty: 'intermediate',
          features: [
            {
              name: 'Sternen-Visualisierung',
              description: 'Immersive Reise durch Galaxien und Nebel',
              type: 'visualization',
              isActive: true
            },
            {
              name: 'Binaural Beats',
              description: 'Theta-Wellen für tiefe Meditation',
              type: 'ambient_sounds',
              isActive: true
            },
            {
              name: 'Chakra-Ausrichtung',
              description: 'Energiezentren im kosmischen Raum visualisieren',
              type: 'visualization',
              isActive: true
            }
          ],
          audioTracks: [
            {
              id: 'theta-waves',
              name: 'Theta-Wellen',
              type: 'binaural',
              duration: 1800,
              url: '/assets/audio/theta-waves.mp3',
              frequency: 6
            },
            {
              id: 'cosmic-sounds',
              name: 'Kosmische Klänge',
              type: 'ambient',
              duration: 2400,
              url: '/assets/audio/cosmic-sounds.mp3'
            }
          ],
          customization: {
            timeOfDay: 'night',
            weather: 'clear',
            ambientIntensity: 90,
            interactionLevel: 'passive'
          },
          biometricIntegration: true,
          socialFeatures: true
        },
        {
          id: 'forest-sanctuary',
          name: 'Wald-Heiligtum',
          description: 'Ein alter Wald mit majestätischen Bäumen und singenden Vögeln',
          type: 'forest',
          thumbnail: '🌲',
          duration: 25,
          difficulty: 'beginner',
          features: [
            {
              name: 'Natur-Geräusche',
              description: 'Authentische Waldgeräusche in 3D-Audio',
              type: 'ambient_sounds',
              isActive: true
            },
            {
              name: 'Waldspaziergang',
              description: 'Interaktive Erkundung des Waldes',
              type: 'interactive_elements',
              isActive: true
            },
            {
              name: 'Achtsamkeits-Übungen',
              description: 'Naturfokussierte Achtsamkeitspraktiken',
              type: 'guided_meditation',
              isActive: true
            }
          ],
          audioTracks: [
            {
              id: 'forest-sounds',
              name: 'Waldgeräusche',
              type: 'nature',
              duration: 2000,
              url: '/assets/audio/forest-sounds.mp3'
            },
            {
              id: 'bird-songs',
              name: 'Vogelgesang',
              type: 'nature',
              duration: 1500,
              url: '/assets/audio/bird-songs.mp3'
            }
          ],
          customization: {
            timeOfDay: 'morning',
            weather: 'misty',
            ambientIntensity: 60,
            interactionLevel: 'full_control'
          },
          biometricIntegration: true,
          socialFeatures: false
        }
      ];

      // AR Experiences
      const sampleARExperiences: ARExperience[] = [
        {
          id: 'breathing-guide',
          name: 'AR Atemführung',
          description: 'Visuelle Atemhilfe, die sich an dein Tempo anpasst',
          type: 'breathing_guide',
          requiresCamera: false,
          requiresMotion: false,
          duration: 10,
          instructions: [
            'Halte dein Gerät vor dich',
            'Folge der pulsierenden Kugel mit deinem Atem',
            'Atme ein, wenn sie sich ausdehnt',
            'Atme aus, wenn sie sich zusammenzieht'
          ],
          benefits: [
            'Stressreduktion',
            'Verbesserte Konzentration',
            'Erhöhte Lungenkapazität',
            'Emotionale Regulierung'
          ]
        },
        {
          id: 'gratitude-garden',
          name: 'Dankbarkeits-Garten',
          description: 'Pflanze virtuelle Blumen für deine Dankbarkeitsgedanken',
          type: 'gratitude_garden',
          requiresCamera: true,
          requiresMotion: true,
          duration: 15,
          instructions: [
            'Richte die Kamera auf eine ebene Fläche',
            'Tippe, um einen Gedanken zu pflanzen',
            'Spreche deine Dankbarkeit aus',
            'Beobachte, wie dein Garten wächst'
          ],
          benefits: [
            'Positive Emotionen verstärken',
            'Dankbarkeit visualisieren',
            'Langfristige Einstellungsänderung',
            'Kreative Selbstexpression'
          ]
        },
        {
          id: 'wellness-pet',
          name: 'Wellness-Begleiter',
          description: 'Ein virtueller Begleiter, der auf dein Wohlbefinden reagiert',
          type: 'wellness_pet',
          requiresCamera: true,
          requiresMotion: false,
          duration: 0, // Always available
          instructions: [
            'Dein Begleiter erscheint in deiner Umgebung',
            'Er reagiert auf deine Stimmung und Aktivitäten',
            'Füttere ihn mit positiven Gedanken',
            'Erhalte Erinnerungen für Wellness-Pausen'
          ],
          benefits: [
            'Emotionale Unterstützung',
            'Regelmäßige Wellness-Erinnerungen',
            'Motivation durch Gamification',
            'Langfristige Bindung'
          ]
        }
      ];

      // Metrics
      const sampleMetrics: VRMetrics = {
        totalSessions: 127,
        totalDuration: 2840, // in minutes
        favoriteEnvironments: ['zen-garden', 'cosmic-meditation', 'forest-sanctuary'],
        averageEffectiveness: 8.7,
        stressReduction: 34, // percentage
        heartRateVariability: [
          { timestamp: new Date('2024-03-01'), value: 45, session: 'zen-garden' },
          { timestamp: new Date('2024-03-02'), value: 52, session: 'cosmic-meditation' },
          { timestamp: new Date('2024-03-03'), value: 48, session: 'forest-sanctuary' }
        ],
        achievements: [
          {
            id: 'first-flight',
            name: 'Erster Flug',
            description: 'Deine erste VR-Meditation abgeschlossen',
            icon: '🚀',
            rarity: 'common',
            unlockedAt: new Date('2024-02-01'),
            requirements: [
              {
                type: 'session_count',
                target: 1,
                description: 'Eine VR-Session abschließen'
              }
            ]
          },
          {
            id: 'zen-master',
            name: 'Zen-Meister',
            description: '50 Stunden im Zen-Garten verbracht',
            icon: '🧘‍♂️',
            rarity: 'epic',
            unlockedAt: new Date('2024-02-28'),
            requirements: [
              {
                type: 'total_duration',
                target: 3000,
                description: '50 Stunden in VR-Umgebungen'
              }
            ]
          }
        ]
      };

      setVrEnvironments(sampleVREnvironments);
      setArExperiences(sampleARExperiences);
      setMetrics(sampleMetrics);
      setIsLoading(false);
    }, 1000);
  };

  const checkXRSupport = async () => {
    // WebXR Unterstützung prüfen
    const capabilities: XRCapabilities = {
      vr: false,
      ar: false,
      mr: false,
      webXR: false,
      handTracking: false,
      eyeTracking: false,
      spatialMapping: false
    };

    if ('xr' in navigator) {
      capabilities.webXR = true;
      
      try {
        const vrSupported = await (navigator as any).xr.isSessionSupported('immersive-vr');
        const arSupported = await (navigator as any).xr.isSessionSupported('immersive-ar');
        
        capabilities.vr = vrSupported;
        capabilities.ar = arSupported;
      } catch (error) {
        console.log('XR Support Check:', error);
      }
    }

    setXrCapabilities(capabilities);
  };

  const startVRSession = async (environment: VREnvironment) => {
    if (!xrCapabilities?.vr) {
      alert('VR wird von deinem Gerät nicht unterstützt. Verwende eine VR-Brille oder einen VR-fähigen Browser.');
      return;
    }

    const session: VRSession = {
      id: `session-${Date.now()}`,
      userId: 'current-user',
      environmentId: environment.id,
      startTime: new Date(),
      duration: 0,
      immersionLevel: 8,
      effectiveness: 0,
      achievements: []
    };

    setCurrentSession(session);
    
    try {
      // WebXR Session starten (vereinfacht)
      console.log('Starting VR Session:', environment.name);
      
      // In einer echten Implementierung würde hier die WebXR API verwendet
      // const xrSession = await navigator.xr.requestSession('immersive-vr');
      
      // Simulierte Session für Demo
      setTimeout(() => {
        if (session) {
          session.endTime = new Date();
          session.duration = environment.duration;
          session.effectiveness = Math.floor(Math.random() * 3) + 8; // 8-10
          setCurrentSession(null);
          
          alert(`VR-Session beendet! Effektivität: ${session.effectiveness}/10`);
        }
      }, 5000);
      
    } catch (error) {
      console.error('VR Session Error:', error);
      setCurrentSession(null);
    }
  };

  const startARExperience = async (experience: ARExperience) => {
    if (!xrCapabilities?.ar && experience.requiresCamera) {
      // Fallback für Browser ohne AR-Unterstützung
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
          alert(`AR-Erfahrung "${experience.name}" gestartet (Kamera-Fallback)`);
        } catch (error) {
          alert('Kamera-Zugriff verweigert oder nicht verfügbar.');
        }
      } else {
        alert('AR wird von deinem Gerät nicht unterstützt.');
      }
      return;
    }

    console.log('Starting AR Experience:', experience.name);
    alert(`AR-Erfahrung "${experience.name}" würde jetzt starten.`);
  };

  const tabs = [
    { id: 'vr', label: 'VR Umgebungen', icon: '🥽', count: vrEnvironments.length },
    { id: 'ar', label: 'AR Erfahrungen', icon: '📱', count: arExperiences.length },
    { id: 'metrics', label: 'Metriken', icon: '📊', count: metrics?.achievements.length || 0 },
    { id: 'settings', label: 'Einstellungen', icon: '⚙️', count: 0 }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          AR/VR Wellness Experiences
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          🥽 Immersive Meditationsräume, interaktive AR-Erfahrungen und erweiterte Realität
        </p>
      </motion.div>

      {/* XR Support Status */}
      {xrCapabilities && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
        >
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Geräte-Kompatibilität</h3>
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              xrCapabilities.webXR ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              WebXR: {xrCapabilities.webXR ? '✅' : '❌'}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              xrCapabilities.vr ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              VR: {xrCapabilities.vr ? '✅' : '📱 Mobile'}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              xrCapabilities.ar ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              AR: {xrCapabilities.ar ? '✅' : '📷 Kamera'}
            </span>
          </div>
        </motion.div>
      )}

      {/* Current Session Status */}
      {currentSession && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Aktive VR-Session</h3>
              <p className="text-white/80">
                {vrEnvironments.find(env => env.id === currentSession.environmentId)?.name}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="animate-pulse w-3 h-3 bg-white rounded-full"></div>
              <span>Live</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                : 'bg-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/20'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'vr' && <VREnvironmentsTab environments={vrEnvironments} onStartSession={startVRSession} />}
          {activeTab === 'ar' && <ARExperiencesTab experiences={arExperiences} onStartExperience={startARExperience} videoRef={videoRef} />}
          {activeTab === 'metrics' && <MetricsTab metrics={metrics} />}
          {activeTab === 'settings' && <SettingsTab capabilities={xrCapabilities} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// VR Environments Tab
function VREnvironmentsTab({ 
  environments, 
  onStartSession 
}: { 
  environments: VREnvironment[]; 
  onStartSession: (env: VREnvironment) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {environments.map((environment) => (
        <motion.div
          key={environment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <div className="text-6xl mb-4 text-center">{environment.thumbnail}</div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {environment.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {environment.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              environment.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              environment.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {environment.difficulty}
            </span>
            <span className="text-sm text-gray-500">{environment.duration} Min</span>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Features:</h4>
            <div className="space-y-1">
              {environment.features.slice(0, 3).map((feature) => (
                <div key={feature.name} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  {feature.name}
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => onStartSession(environment)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl py-3 font-medium hover:shadow-lg transition-shadow"
          >
            VR-Session starten
          </button>
        </motion.div>
      ))}
    </div>
  );
}

// AR Experiences Tab
function ARExperiencesTab({ 
  experiences, 
  onStartExperience,
  videoRef 
}: { 
  experiences: ARExperience[]; 
  onStartExperience: (exp: ARExperience) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}) {
  return (
    <div className="space-y-6">
      {/* AR Camera Preview */}
      <div className="bg-black/20 rounded-2xl p-4 text-center">
        <video
          ref={videoRef}
          className="max-w-full h-48 rounded-xl bg-gray-800"
          style={{ display: 'none' }}
          autoPlay
          muted
        />
        <div className="text-4xl mb-2">📱</div>
        <p className="text-gray-600 dark:text-gray-300">
          AR-Kamera wird hier angezeigt, wenn eine AR-Erfahrung gestartet wird
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((experience) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {experience.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {experience.description}
            </p>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Anleitung:</h4>
              <div className="space-y-1">
                {experience.instructions.slice(0, 2).map((instruction, index) => (
                  <div key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                    <span className="text-purple-500 mr-2">{index + 1}.</span>
                    {instruction}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Vorteile:</h4>
              <div className="flex flex-wrap gap-1">
                {experience.benefits.slice(0, 3).map((benefit) => (
                  <span key={benefit} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                {experience.requiresCamera && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">📷 Kamera</span>
                )}
                {experience.requiresMotion && (
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">🏃 Bewegung</span>
                )}
              </div>
              {experience.duration > 0 && (
                <span className="text-sm text-gray-500">{experience.duration} Min</span>
              )}
            </div>
            
            <button
              onClick={() => onStartExperience(experience)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl py-3 font-medium hover:shadow-lg transition-shadow"
            >
              AR-Erfahrung starten
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Metrics Tab
function MetricsTab({ metrics }: { metrics: VRMetrics | null }) {
  if (!metrics) return null;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{metrics.totalSessions}</div>
          <div className="text-white/80">Gesamte Sessions</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{Math.round(metrics.totalDuration / 60)}h</div>
          <div className="text-white/80">Gesamte Zeit</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{metrics.averageEffectiveness}/10</div>
          <div className="text-white/80">Effektivität</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">-{metrics.stressReduction}%</div>
          <div className="text-white/80">Stress-Reduktion</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🏆 VR-Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.achievements.map((achievement) => (
            <div key={achievement.id} className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {achievement.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {achievement.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      achievement.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                      achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                      achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {achievement.rarity}
                    </span>
                    <span className="text-xs text-gray-500">
                      {achievement.unlockedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heart Rate Variability Chart */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          💓 Herzfrequenz-Variabilität
        </h3>
        <div className="space-y-2">
          {metrics.heartRateVariability.slice(0, 7).map((data, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {data.timestamp.toLocaleDateString()}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full"
                    style={{ width: `${(data.value / 60) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {data.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab({ capabilities }: { capabilities: XRCapabilities | null }) {
  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🔧 AR/VR Einstellungen
        </h3>
        
        {capabilities && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Geräte-Unterstützung</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-sm">WebXR API</span>
                  <span className={capabilities.webXR ? 'text-green-500' : 'text-red-500'}>
                    {capabilities.webXR ? '✅' : '❌'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-sm">VR Headset</span>
                  <span className={capabilities.vr ? 'text-green-500' : 'text-yellow-500'}>
                    {capabilities.vr ? '✅' : '📱'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-sm">AR Kamera</span>
                  <span className={capabilities.ar ? 'text-green-500' : 'text-yellow-500'}>
                    {capabilities.ar ? '✅' : '📷'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-sm">Hand Tracking</span>
                  <span className={capabilities.handTracking ? 'text-green-500' : 'text-gray-500'}>
                    {capabilities.handTracking ? '✅' : '⏳'}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Empfohlene Geräte</h4>
              <div className="space-y-2">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-medium text-sm">VR Headsets</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    Meta Quest 2/3, PlayStation VR2, Valve Index, HTC Vive
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-medium text-sm">AR-fähige Geräte</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    iPhone 12+, Android ARCore-Geräte, HoloLens 2
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            💡 Tipp für beste Erfahrung
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Verwende ein VR-Headset für die immersivsten Meditation-Erfahrungen. 
            Für AR-Features reicht ein modernes Smartphone mit Kamera.
          </p>
        </div>
      </div>
    </div>
  );
}
