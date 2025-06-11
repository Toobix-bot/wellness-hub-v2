'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaAccessibleIcon, 
  FaEye, 
  FaEar, 
  FaHandPaper,
  FaBrain,
  FaKeyboard,
  FaMicrophone,
  FaVolumeUp,
  FaMousePointer,
  FaGamepad,
  FaRobot,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCog,
  FaPalette,
  FaTextHeight,
  FaAdjust,
  FaMoon,
  FaSun,
  FaVolumeOff,
  FaClosedCaptioning,
  FaUniversalAccess,
  FaHeart,
  FaLightbulb,
  FaGraduationCap,
  FaChartLine,
  FaMagic,
  FaUserFriends,
  FaSave,
  FaDownload,
  FaUpload
} from 'react-icons/fa';
import { 
  AccessibilityProfile, 
  AccessibilityPreferences,
  AccessibilityFeature,
  AccessibilityAudit,
  CognitiveSupport,
  BrainComputerInterface,
  AccessibilityMetrics,
  DisabilityType
} from '../types/accessibility';

const AccessibilityRevolution: React.FC = () => {
  const [userProfile, setUserProfile] = useState<AccessibilityProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'features' | 'ai-support' | 'bci' | 'audit' | 'analytics'>('profile');
  const [features, setFeatures] = useState<AccessibilityFeature[]>([]);
  const [auditResults, setAuditResults] = useState<AccessibilityAudit | null>(null);
  const [bciDevice, setBciDevice] = useState<BrainComputerInterface | null>(null);
  const [metrics, setMetrics] = useState<AccessibilityMetrics | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [previewMode, setPreviewMode] = useState<string | null>(null);

  // Mock-Daten für Accessibility-Features
  const mockFeatures: AccessibilityFeature[] = [
    {
      id: 'screen-reader-enhanced',
      name: 'KI-verbesserter Screenreader',
      description: 'Intelligente Beschreibungen von Bildern und komplexen UI-Elementen',
      category: 'visual',
      isEnabled: true,
      supportedDisabilities: ['visual-impairment', 'blindness'],
      implementation: {
        ariaAttributes: { 'aria-enhanced': 'true' },
        aiEnhanced: true
      }
    },
    {
      id: 'voice-navigation',
      name: 'Vollständige Sprachnavigation',
      description: 'Navigate durch die gesamte App nur mit Sprachbefehlen',
      category: 'motor',
      isEnabled: true,
      supportedDisabilities: ['motor-impairment', 'speech-impairment'],
      implementation: {
        voiceCommands: ['navigate to', 'click on', 'scroll down', 'go back'],
        aiEnhanced: true
      }
    },
    {
      id: 'cognitive-simplification',
      name: 'Adaptive kognitive Vereinfachung',
      description: 'Interface passt sich automatisch an kognitive Bedürfnisse an',
      category: 'cognitive',
      isEnabled: true,
      supportedDisabilities: ['cognitive-impairment', 'autism-spectrum', 'adhd'],
      implementation: {
        cssClass: 'cognitive-simplified',
        aiEnhanced: true
      }
    },
    {
      id: 'eye-tracking-control',
      name: 'Eye-Tracking Steuerung',
      description: 'Vollständige App-Steuerung durch Augenbewegungen',
      category: 'motor',
      isEnabled: false,
      supportedDisabilities: ['motor-impairment'],
      implementation: {
        gestureSupport: true,
        aiEnhanced: true
      }
    },
    {
      id: 'emotion-aware-interface',
      name: 'Emotionsbewusstes Interface',
      description: 'UI passt sich an emotionalen Zustand und Stress-Level an',
      category: 'universal',
      isEnabled: true,
      supportedDisabilities: ['autism-spectrum', 'adhd', 'cognitive-impairment'],
      implementation: {
        aiEnhanced: true
      }
    },
    {
      id: 'haptic-feedback-system',
      name: 'Erweiterte Haptik',
      description: 'Detailliertes haptisches Feedback für alle Interaktionen',
      category: 'visual',
      isEnabled: false,
      supportedDisabilities: ['visual-impairment', 'blindness', 'hearing-impairment'],
      implementation: {
        aiEnhanced: false
      }
    },
    {
      id: 'real-time-captions',
      name: 'KI-generierte Live-Untertitel',
      description: 'Automatische Untertitel für alle Audio-Inhalte mit Kontext',
      category: 'auditory',
      isEnabled: true,
      supportedDisabilities: ['hearing-impairment', 'deafness'],
      implementation: {
        aiEnhanced: true
      }
    },
    {
      id: 'gesture-recognition',
      name: 'Erweiterte Gestenerkennung',
      description: 'Kamerabasierte Gestensteuerung für berührungslose Navigation',
      category: 'motor',
      isEnabled: false,
      supportedDisabilities: ['motor-impairment'],
      implementation: {
        gestureSupport: true,
        aiEnhanced: true
      }
    }
  ];

  const mockAuditResults: AccessibilityAudit = {
    id: 'audit-2025-06-11',
    timestamp: new Date(),
    wcagLevel: 'AAA',
    compliance: {
      perceivable: 94,
      operable: 97,
      understandable: 91,
      robust: 96,
      overall: 95
    },
    issues: [
      {
        id: 'issue-1',
        severity: 'medium',
        wcagCriterion: '1.4.3',
        description: 'Kontrast in einigen sekundären Elementen könnte verbessert werden',
        element: '.secondary-button',
        location: '/dashboard',
        suggestedFix: 'Erhöhe Kontrast auf mindestens 4.5:1',
        canAutoFix: true
      },
      {
        id: 'issue-2',
        severity: 'low',
        wcagCriterion: '2.4.6',
        description: 'Einige Überschriften könnten aussagekräftiger sein',
        element: 'h3.section-title',
        location: '/settings',
        suggestedFix: 'Verwende beschreibendere Überschriften',
        canAutoFix: false
      }
    ],
    recommendations: [
      'Implementiere zusätzliche Fokusindikatoren',
      'Verbessere Alt-Texte für komplexe Grafiken',
      'Erhöhe Touch-Target-Größen auf mobilen Geräten'
    ],
    autoFixable: []
  };

  const mockBCIDevice: BrainComputerInterface = {
    deviceId: 'neuralink-v2',
    deviceName: 'NeuraLink Wellness BCI',
    isConnected: false,
    signalQuality: 0,
    calibrationStatus: 'uncalibrated',
    supportedCommands: [
      { id: 'meditation-start', name: 'Meditation starten', mentalTask: 'Entspannung fokussieren', accuracy: 0, trainingRequired: 5, isActive: false },
      { id: 'breathing-exercise', name: 'Atemübung', mentalTask: 'Atemrhythmus visualisieren', accuracy: 0, trainingRequired: 3, isActive: false },
      { id: 'stress-relief', name: 'Stressabbau', mentalTask: 'Ruhe herbeidenken', accuracy: 0, trainingRequired: 7, isActive: false },
      { id: 'focus-enhance', name: 'Fokus verstärken', mentalTask: 'Konzentration bündeln', accuracy: 0, trainingRequired: 4, isActive: false }
    ],
    userTrainingLevel: 0,
    adaptiveAlgorithm: true
  };

  const mockMetrics: AccessibilityMetrics = {
    usageStats: [
      { featureId: 'screen-reader-enhanced', usageCount: 1420, effectiveness: 0.94, userSatisfaction: 0.92 },
      { featureId: 'voice-navigation', usageCount: 890, effectiveness: 0.87, userSatisfaction: 0.89 },
      { featureId: 'cognitive-simplification', usageCount: 1120, effectiveness: 0.91, userSatisfaction: 0.95 },
      { featureId: 'real-time-captions', usageCount: 670, effectiveness: 0.96, userSatisfaction: 0.93 }
    ],
    performanceMetrics: {
      taskCompletionRate: 0.94,
      averageTaskTime: 32.5,
      errorRate: 0.06,
      satisfactionScore: 0.91
    },
    complianceMetrics: {
      wcagAACompliance: 97,
      wcagAAACompliance: 95,
      automatedTestsPassed: 98,
      userTestingScore: 92
    }
  };

  useEffect(() => {
    setFeatures(mockFeatures);
    setAuditResults(mockAuditResults);
    setBciDevice(mockBCIDevice);
    setMetrics(mockMetrics);

    // Mock-Benutzerprofil
    setUserProfile({
      userId: 'user-123',
      disabilities: ['visual-impairment', 'cognitive-impairment'],
      preferences: {
        visualPreferences: {
          highContrast: true,
          darkMode: true,
          fontSize: 'large',
          fontFamily: 'dyslexia-friendly',
          lineSpacing: 1.5,
          letterSpacing: 0.1,
          wordSpacing: 0.2,
          colorFilters: ['blue-light-filter'],
          animations: 'essential',
          flashingContent: 'disable'
        },
        auditoryPreferences: {
          captionsEnabled: true,
          captionStyle: {
            fontSize: 18,
            fontFamily: 'Arial',
            textColor: '#FFFFFF',
            backgroundColor: '#000000',
            textOpacity: 1,
            backgroundOpacity: 0.8,
            textEdge: 'outline',
            position: 'bottom'
          },
          audioDescriptions: true,
          soundEffects: true,
          backgroundMusic: false,
          voiceSpeed: 1.2,
          voicePitch: 1.0,
          preferredVoice: 'female-german',
          hearingAidCompatibility: false
        },
        motorPreferences: {
          keyboardNavigation: true,
          mouseAlternatives: true,
          touchTargetSize: 'large',
          dwellTime: 1000,
          stickyKeys: true,
          filterKeys: false,
          mouseKeys: false,
          voiceControl: true,
          eyeTracking: false
        },
        cognitivePreferences: {
          simplifiedInterface: true,
          reducedOptions: true,
          consistentNavigation: true,
          progressIndicators: true,
          timeoutExtensions: true,
          errorPrevention: true,
          confirmationDialogs: true,
          memoryAids: true,
          focusIndicators: 'enhanced'
        }
      },
      assistiveTechnologies: [],
      customizations: {
        layout: {
          compactMode: false,
          sidebarPosition: 'left',
          navigationStyle: 'vertical',
          widgetArrangement: []
        },
        interaction: {
          clickDelay: 200,
          hoverDelay: 500,
          dragSensitivity: 0.7,
          scrollSpeed: 0.8,
          keyboardShortcuts: {}
        },
        feedback: {
          visualFeedback: true,
          auditoreFeedback: true,
          hapticFeedback: false,
          confirmationSounds: true,
          errorSounds: true,
          successSounds: true
        }
      },
      cognitiveSupportLevel: 'high',
      lastUpdated: new Date()
    });
  }, []);

  const startBCICalibration = () => {
    setIsCalibrating(true);
    setBciDevice(prev => prev ? { ...prev, calibrationStatus: 'calibrating', isConnected: true } : null);

    // Simuliere Kalibrierung
    setTimeout(() => {
      setBciDevice(prev => prev ? {
        ...prev,
        calibrationStatus: 'calibrated',
        signalQuality: 85,
        supportedCommands: prev.supportedCommands.map(cmd => ({
          ...cmd,
          accuracy: 0.7 + Math.random() * 0.25,
          isActive: true
        })),
        userTrainingLevel: 60
      } : null);
      setIsCalibrating(false);
    }, 5000);
  };

  const toggleFeature = (featureId: string) => {
    setFeatures(prev => prev.map(feature =>
      feature.id === featureId
        ? { ...feature, isEnabled: !feature.isEnabled }
        : feature
    ));
  };

  const applyPreviewMode = (mode: string) => {
    setPreviewMode(mode);
    // Hier würden CSS-Klassen oder Styles angewendet werden
    document.body.className = mode === 'high-contrast' ? 'high-contrast-mode' :
                               mode === 'large-text' ? 'large-text-mode' :
                               mode === 'simplified' ? 'simplified-mode' : '';
  };

  const renderAccessibilityProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-6">Barrierefreiheits-Profil</h3>
        
        {userProfile && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visuelle Einstellungen */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center">
                <FaEye className="w-5 h-5 mr-2 text-blue-600" />
                Visuelle Anpassungen
              </h4>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span>Hoher Kontrast</span>
                  <input
                    type="checkbox"
                    checked={userProfile.preferences.visualPreferences.highContrast}
                    onChange={(e) => {
                      setUserProfile(prev => prev ? {
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          visualPreferences: {
                            ...prev.preferences.visualPreferences,
                            highContrast: e.target.checked
                          }
                        }
                      } : null);
                      if (e.target.checked) applyPreviewMode('high-contrast');
                    }}
                    className="w-4 h-4 text-indigo-600"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span>Dunkler Modus</span>
                  <input
                    type="checkbox"
                    checked={userProfile.preferences.visualPreferences.darkMode}
                    onChange={(e) => setUserProfile(prev => prev ? {
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        visualPreferences: {
                          ...prev.preferences.visualPreferences,
                          darkMode: e.target.checked
                        }
                      }
                    } : null)}
                    className="w-4 h-4 text-indigo-600"
                  />
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schriftgröße
                  </label>
                  <select
                    value={userProfile.preferences.visualPreferences.fontSize}
                    onChange={(e) => {
                      setUserProfile(prev => prev ? {
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          visualPreferences: {
                            ...prev.preferences.visualPreferences,
                            fontSize: e.target.value as any
                          }
                        }
                      } : null);
                      if (e.target.value === 'large' || e.target.value === 'extra-large') {
                        applyPreviewMode('large-text');
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="small">Klein</option>
                    <option value="medium">Mittel</option>
                    <option value="large">Groß</option>
                    <option value="extra-large">Sehr groß</option>
                    <option value="huge">Riesig</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schriftart
                  </label>
                  <select
                    value={userProfile.preferences.visualPreferences.fontFamily}
                    onChange={(e) => setUserProfile(prev => prev ? {
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        visualPreferences: {
                          ...prev.preferences.visualPreferences,
                          fontFamily: e.target.value as any
                        }
                      }
                    } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="default">Standard</option>
                    <option value="dyslexia-friendly">Dyslexie-freundlich</option>
                    <option value="high-legibility">Hohe Lesbarkeit</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Auditive Einstellungen */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center">
                <FaEar className="w-5 h-5 mr-2 text-green-600" />
                Auditive Anpassungen
              </h4>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span>Untertitel aktiviert</span>
                  <input
                    type="checkbox"
                    checked={userProfile.preferences.auditoryPreferences.captionsEnabled}
                    onChange={(e) => setUserProfile(prev => prev ? {
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        auditoryPreferences: {
                          ...prev.preferences.auditoryPreferences,
                          captionsEnabled: e.target.checked
                        }
                      }
                    } : null)}
                    className="w-4 h-4 text-indigo-600"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span>Audio-Beschreibungen</span>
                  <input
                    type="checkbox"
                    checked={userProfile.preferences.auditoryPreferences.audioDescriptions}
                    onChange={(e) => setUserProfile(prev => prev ? {
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        auditoryPreferences: {
                          ...prev.preferences.auditoryPreferences,
                          audioDescriptions: e.target.checked
                        }
                      }
                    } : null)}
                    className="w-4 h-4 text-indigo-600"
                  />
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sprachgeschwindigkeit: {userProfile.preferences.auditoryPreferences.voiceSpeed}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={userProfile.preferences.auditoryPreferences.voiceSpeed}
                    onChange={(e) => setUserProfile(prev => prev ? {
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        auditoryPreferences: {
                          ...prev.preferences.auditoryPreferences,
                          voiceSpeed: parseFloat(e.target.value)
                        }
                      }
                    } : null)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Motorische Einstellungen */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center">
                <FaHandPaper className="w-5 h-5 mr-2 text-purple-600" />
                Motorische Anpassungen
              </h4>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span>Tastaturnavigation</span>
                  <input
                    type="checkbox"
                    checked={userProfile.preferences.motorPreferences.keyboardNavigation}
                    onChange={(e) => setUserProfile(prev => prev ? {
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        motorPreferences: {
                          ...prev.preferences.motorPreferences,
                          keyboardNavigation: e.target.checked
                        }
                      }
                    } : null)}
                    className="w-4 h-4 text-indigo-600"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span>Sprachsteuerung</span>
                  <input
                    type="checkbox"
                    checked={userProfile.preferences.motorPreferences.voiceControl}
                    onChange={(e) => setUserProfile(prev => prev ? {
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        motorPreferences: {
                          ...prev.preferences.motorPreferences,
                          voiceControl: e.target.checked
                        }
                      }
                    } : null)}
                    className="w-4 h-4 text-indigo-600"
                  />
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Touch-Target-Größe
                  </label>
                  <select
                    value={userProfile.preferences.motorPreferences.touchTargetSize}
                    onChange={(e) => setUserProfile(prev => prev ? {
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        motorPreferences: {
                          ...prev.preferences.motorPreferences,
                          touchTargetSize: e.target.value as any
                        }
                      }
                    } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="default">Standard</option>
                    <option value="large">Groß</option>
                    <option value="extra-large">Sehr groß</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Kognitive Einstellungen */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center">
                <FaBrain className="w-5 h-5 mr-2 text-orange-600" />
                Kognitive Unterstützung
              </h4>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span>Vereinfachtes Interface</span>
                  <input
                    type="checkbox"
                    checked={userProfile.preferences.cognitivePreferences.simplifiedInterface}
                    onChange={(e) => {
                      setUserProfile(prev => prev ? {
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          cognitivePreferences: {
                            ...prev.preferences.cognitivePreferences,
                            simplifiedInterface: e.target.checked
                          }
                        }
                      } : null);
                      if (e.target.checked) applyPreviewMode('simplified');
                    }}
                    className="w-4 h-4 text-indigo-600"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span>Gedächtnisstützen</span>
                  <input
                    type="checkbox"
                    checked={userProfile.preferences.cognitivePreferences.memoryAids}
                    onChange={(e) => setUserProfile(prev => prev ? {
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        cognitivePreferences: {
                          ...prev.preferences.cognitivePreferences,
                          memoryAids: e.target.checked
                        }
                      }
                    } : null)}
                    className="w-4 h-4 text-indigo-600"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span>Fortschrittsindikatoren</span>
                  <input
                    type="checkbox"
                    checked={userProfile.preferences.cognitivePreferences.progressIndicators}
                    onChange={(e) => setUserProfile(prev => prev ? {
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        cognitivePreferences: {
                          ...prev.preferences.cognitivePreferences,
                          progressIndicators: e.target.checked
                        }
                      }
                    } : null)}
                    className="w-4 h-4 text-indigo-600"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex space-x-4">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <FaSave className="inline w-4 h-4 mr-2" />
            Profil speichern
          </button>
          <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            <FaDownload className="inline w-4 h-4 mr-2" />
            Profil exportieren
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <FaUpload className="inline w-4 h-4 mr-2" />
            Profil importieren
          </button>
        </div>
      </div>

      {/* Schnell-Vorschau */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h4 className="text-lg font-semibold mb-4">Schnell-Vorschau</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'high-contrast', label: 'Hoher Kontrast', icon: FaAdjust },
            { id: 'large-text', label: 'Große Schrift', icon: FaTextHeight },
            { id: 'simplified', label: 'Vereinfacht', icon: FaBrain },
            { id: 'dark-mode', label: 'Dunkler Modus', icon: FaMoon }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => applyPreviewMode(id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                previewMode === id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <Icon className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
              <div className="text-sm font-medium">{label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Barrierefreiheits-Features</h3>
        <div className="text-sm text-gray-600">
          {features.filter(f => f.isEnabled).length} von {features.length} aktiv
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {features.map((feature) => {
          const categoryIcons = {
            visual: FaEye,
            auditory: FaEar,
            motor: FaHandPaper,
            cognitive: FaBrain,
            universal: FaUniversalAccess
          };
          const IconComponent = categoryIcons[feature.category];

          return (
            <motion.div
              key={feature.id}
              layout
              className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all ${
                feature.isEnabled ? 'border-green-200' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${
                    feature.isEnabled ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      feature.isEnabled ? 'text-green-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{feature.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        feature.category === 'visual' ? 'bg-blue-100 text-blue-800' :
                        feature.category === 'auditory' ? 'bg-green-100 text-green-800' :
                        feature.category === 'motor' ? 'bg-purple-100 text-purple-800' :
                        feature.category === 'cognitive' ? 'bg-orange-100 text-orange-800' :
                        'bg-indigo-100 text-indigo-800'
                      }`}>
                        {feature.category}
                      </span>
                      {feature.implementation.aiEnhanced && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                          KI-verstärkt
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={feature.isEnabled}
                    onChange={() => toggleFeature(feature.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <p className="text-gray-600 text-sm mb-4">{feature.description}</p>

              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Unterstützt:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {feature.supportedDisabilities.map(disability => (
                      <span
                        key={disability}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {disability.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderBCIInterface = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-6">Brain-Computer Interface</h3>
        
        {bciDevice && (
          <div className="space-y-6">
            {/* Device Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${
                  bciDevice.isConnected ? 'text-green-600' : 'text-red-600'
                }`}>
                  {bciDevice.isConnected ? 'Verbunden' : 'Getrennt'}
                </div>
                <div className="text-sm text-gray-600">Verbindungsstatus</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {bciDevice.signalQuality}%
                </div>
                <div className="text-sm text-gray-600">Signalqualität</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {bciDevice.userTrainingLevel}%
                </div>
                <div className="text-sm text-gray-600">Training Level</div>
              </div>
            </div>

            {/* Calibration */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Kalibrierung</h4>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Status: {
                    bciDevice.calibrationStatus === 'uncalibrated' ? 'Nicht kalibriert' :
                    bciDevice.calibrationStatus === 'calibrating' ? 'Kalibrierung läuft...' :
                    'Kalibriert'
                  }</div>
                  <div className="text-sm text-gray-600">
                    {bciDevice.calibrationStatus === 'uncalibrated' && 'Kalibrierung erforderlich für beste Ergebnisse'}
                    {bciDevice.calibrationStatus === 'calibrating' && 'Bitte bleiben Sie entspannt und fokussiert'}
                    {bciDevice.calibrationStatus === 'calibrated' && 'System ist einsatzbereit'}
                  </div>
                </div>
                <button
                  onClick={startBCICalibration}
                  disabled={isCalibrating || bciDevice.calibrationStatus === 'calibrated'}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    isCalibrating || bciDevice.calibrationStatus === 'calibrated'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isCalibrating ? 'Kalibrierung läuft...' : 
                   bciDevice.calibrationStatus === 'calibrated' ? 'Kalibriert' : 'Kalibrierung starten'}
                </button>
              </div>
              
              {isCalibrating && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Mental Commands */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Mentale Befehle</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bciDevice.supportedCommands.map((command) => (
                  <div
                    key={command.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      command.isActive
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{command.name}</h5>
                      <div className={`w-3 h-3 rounded-full ${
                        command.isActive ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Mentale Aufgabe: {command.mentalTask}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Genauigkeit: {Math.round(command.accuracy * 100)}%</span>
                      <span>Training: {command.trainingRequired}h</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {metrics && (
        <>
          {/* Performance Metrics */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Performance-Metriken</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round(metrics.performanceMetrics.taskCompletionRate * 100)}%
                </div>
                <div className="text-sm text-gray-600">Aufgaben erfolgreich</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {metrics.performanceMetrics.averageTaskTime}s
                </div>
                <div className="text-sm text-gray-600">Durchschnittliche Zeit</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {Math.round(metrics.performanceMetrics.errorRate * 100)}%
                </div>
                <div className="text-sm text-gray-600">Fehlerrate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round(metrics.performanceMetrics.satisfactionScore * 100)}%
                </div>
                <div className="text-sm text-gray-600">Zufriedenheit</div>
              </div>
            </div>
          </div>

          {/* Feature Usage */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Feature-Nutzung</h3>
            <div className="space-y-4">
              {metrics.usageStats.map((stat) => {
                const feature = features.find(f => f.id === stat.featureId);
                return (
                  <div key={stat.featureId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{feature?.name || stat.featureId}</div>
                      <div className="text-sm text-gray-600">{stat.usageCount} Nutzungen</div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold">{Math.round(stat.effectiveness * 100)}%</div>
                        <div className="text-gray-600">Effektivität</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{Math.round(stat.userSatisfaction * 100)}%</div>
                        <div className="text-gray-600">Zufriedenheit</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WCAG Compliance */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">WCAG-Konformität</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {metrics.complianceMetrics.wcagAACompliance}%
                </div>
                <div className="text-sm text-gray-600">WCAG AA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {metrics.complianceMetrics.wcagAAACompliance}%
                </div>
                <div className="text-sm text-gray-600">WCAG AAA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {metrics.complianceMetrics.automatedTestsPassed}%
                </div>
                <div className="text-sm text-gray-600">Automatische Tests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {metrics.complianceMetrics.userTestingScore}%
                </div>
                <div className="text-sm text-gray-600">Nutzertests</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Accessibility Revolution
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bahnbrechende Barrierefreiheitstechnologie mit KI-gestützter Anpassung, 
            Brain-Computer-Interface und universellem Design für alle Menschen.
          </p>
        </div>

        {/* Accessibility Score */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {auditResults?.compliance.overall || 95}%
                </div>
                <div className="text-sm text-gray-600">Barrierefreiheits-Score</div>
              </div>
              <div className="flex items-center space-x-2">
                <FaUniversalAccess className="w-8 h-8 text-indigo-600" />
                <div>
                  <div className="font-semibold">WCAG 2.1 AAA</div>
                  <div className="text-sm text-gray-600">Zertifiziert</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FaCheckCircle className="w-4 h-4 text-green-500" />
                <span>Alle Features aktiv</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {[
              { id: 'profile', label: 'Profil', icon: FaAccessibleIcon },
              { id: 'features', label: 'Features', icon: FaMagic },
              { id: 'ai-support', label: 'KI-Unterstützung', icon: FaRobot },
              { id: 'bci', label: 'BCI', icon: FaBrain },
              { id: 'audit', label: 'Audit', icon: FaShieldAlt },
              { id: 'analytics', label: 'Analytics', icon: FaChartLine }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="inline w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && renderAccessibilityProfile()}
          {activeTab === 'features' && renderFeatures()}
          {activeTab === 'ai-support' && (
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <FaRobot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">KI-gestützte Barrierefreiheit</h3>
              <p className="text-gray-600">Intelligente Anpassung an individuelle Bedürfnisse und Lernfähigkeit.</p>
            </div>
          )}
          {activeTab === 'bci' && renderBCIInterface()}
          {activeTab === 'audit' && (
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <FaShieldAlt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Barrierefreiheits-Audit</h3>
              <p className="text-gray-600">Kontinuierliche Überwachung und Verbesserung der Barrierefreiheit.</p>
            </div>
          )}
          {activeTab === 'analytics' && renderAnalytics()}
        </AnimatePresence>

        {/* Impact Statement */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-6">Unser Zugänglichkeits-Versprechen</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <FaUniversalAccess className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Universal Design</h4>
              <p className="text-sm text-gray-600">
                Entwickelt für alle Menschen, unabhängig von ihren Fähigkeiten oder Einschränkungen.
              </p>
            </div>
            <div>
              <FaHeart className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Empathie-getrieben</h4>
              <p className="text-sm text-gray-600">
                Jedes Feature wird mit echter Empathie und Verständnis für Benutzerbedürfnisse entwickelt.
              </p>
            </div>
            <div>
              <FaGraduationCap className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Kontinuierliches Lernen</h4>
              <p className="text-sm text-gray-600">
                Ständige Verbesserung durch Forschung, Feedback und technologische Fortschritte.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Accessibility Styles */}
      <style jsx global>{`
        .high-contrast-mode {
          filter: contrast(150%) brightness(1.2);
        }
        .large-text-mode * {
          font-size: 120% !important;
          line-height: 1.6 !important;
        }
        .simplified-mode .secondary-element {
          display: none !important;
        }
        .simplified-mode {
          --tw-bg-opacity: 1;
          background-color: rgb(249 250 251 / var(--tw-bg-opacity));
        }
      `}</style>
    </div>
  );
};

export default AccessibilityRevolution;
