'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AIContentEngine, 
  GeneratedContent, 
  ContentGenerationRequest,
  PersonalizationProfile,
  QualityMetrics
} from '@/types/aiContent';

export default function AIGeneratedContentEngine() {
  const [activeTab, setActiveTab] = useState<'generate' | 'library' | 'analytics' | 'settings'>('generate');
  const [contentEngine, setContentEngine] = useState<AIContentEngine | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [personalizationProfile, setPersonalizationProfile] = useState<PersonalizationProfile | null>(null);
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetrics | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAIEngine();
  }, []);

  const initializeAIEngine = () => {
    setIsLoading(true);

    setTimeout(() => {
      // AI Content Engine initialisieren
      const sampleEngine: AIContentEngine = {
        models: [
          {
            id: 'gpt-4-wellness',
            name: 'GPT-4 Wellness Specialist',
            type: 'text_generation',
            provider: 'openai',
            version: '4.0',
            capabilities: [
              {
                name: 'Meditation Scripts',
                description: 'Personalisierte Meditationsanleitungen',
                accuracy: 92,
                supportedLanguages: ['de', 'en', 'es', 'fr'],
                maxInputLength: 8000,
                maxOutputLength: 4000
              },
              {
                name: 'Affirmationen',
                description: 'Positive Bestärkungen und Selbstgespräche',
                accuracy: 95,
                supportedLanguages: ['de', 'en'],
                maxInputLength: 2000,
                maxOutputLength: 500
              }
            ],
            limitations: [
              'Keine medizinischen Diagnosen',
              'Begrenzte kulturelle Kontexte',
              'Qualitätsschwankungen bei seltenen Themen'
            ],
            costPerRequest: 0.05,
            averageResponseTime: 3.2,
            qualityScore: 9.1,
            ethicalCompliance: 9.5
          },
          {
            id: 'elevenlabs-wellness-voice',
            name: 'ElevenLabs Wellness Voice',
            type: 'audio_synthesis',
            provider: 'elevenlabs',
            version: '2.0',
            capabilities: [
              {
                name: 'Beruhigende Stimme',
                description: 'Warme, beruhigende Sprachausgabe',
                accuracy: 88,
                supportedLanguages: ['de', 'en'],
                maxInputLength: 5000,
                maxOutputLength: 600 // seconds
              }
            ],
            limitations: [
              'Emotionale Nuancen begrenzt',
              'Lange Generierungszeit',
              'Hohe Kosten'
            ],
            costPerRequest: 0.25,
            averageResponseTime: 12.8,
            qualityScore: 8.7,
            ethicalCompliance: 9.2
          }
        ],
        contentTypes: [
          {
            id: 'guided-meditation',
            name: 'Geführte Meditation',
            description: 'Personalisierte Meditationsanleitung mit Atemführung',
            category: 'meditation',
            aiModel: 'gpt-4-wellness',
            template: {
              structure: [
                {
                  section: 'Einleitung',
                  required: true,
                  minLength: 50,
                  maxLength: 200,
                  guidelines: ['Warme Begrüßung', 'Zielsetzung', 'Komfort schaffen']
                },
                {
                  section: 'Vorbereitung',
                  required: true,
                  minLength: 100,
                  maxLength: 300,
                  guidelines: ['Körperhaltung', 'Atemfokus', 'Entspannung']
                },
                {
                  section: 'Hauptteil',
                  required: true,
                  minLength: 400,
                  maxLength: 1200,
                  guidelines: ['Geführte Visualisierung', 'Achtsamkeitsübungen', 'Positive Verstärkung']
                },
                {
                  section: 'Abschluss',
                  required: true,
                  minLength: 100,
                  maxLength: 250,
                  guidelines: ['Sanfte Rückkehr', 'Integration', 'Motivation']
                }
              ],
              variables: [
                {
                  name: 'duration',
                  type: 'number',
                  description: 'Meditationsdauer in Minuten',
                  defaultValue: 10,
                  possibleValues: [5, 10, 15, 20, 30],
                  validation: [
                    {
                      type: 'range',
                      value: [5, 30],
                      message: 'Dauer muss zwischen 5 und 30 Minuten liegen'
                    }
                  ]
                },
                {
                  name: 'theme',
                  type: 'text',
                  description: 'Meditationsthema',
                  defaultValue: 'Achtsamkeit',
                  possibleValues: ['Achtsamkeit', 'Stressabbau', 'Selbstliebe', 'Dankbarkeit', 'Energie'],
                  validation: []
                }
              ],
              examples: [
                'Willkommen zu dieser 10-minütigen Achtsamkeitsmeditation...',
                'Lass uns gemeinsam eine Reise der Entspannung beginnen...'
              ],
              constraints: [
                {
                  type: 'tone',
                  value: 'beruhigend und unterstützend',
                  importance: 'critical'
                },
                {
                  type: 'scientific_accuracy',
                  value: 'evidenzbasierte Techniken',
                  importance: 'high'
                }
              ]
            },
            personalizationFactors: [
              {
                name: 'experience_level',
                weight: 0.4,
                dataSource: 'user_profile',
                extractionMethod: 'meditation_hours_logged',
                influence: [
                  {
                    inputValue: 'beginner',
                    outputModification: 'mehr Grundlagen, einfache Sprache',
                    confidence: 0.9
                  },
                  {
                    inputValue: 'experienced',
                    outputModification: 'fortgeschrittene Techniken, weniger Erklärungen',
                    confidence: 0.8
                  }
                ]
              },
              {
                name: 'stress_level',
                weight: 0.3,
                dataSource: 'mood',
                extractionMethod: 'recent_mood_entries',
                influence: [
                  {
                    inputValue: 'high_stress',
                    outputModification: 'mehr Entspannungsanweisungen, längere Atemübungen',
                    confidence: 0.7
                  }
                ]
              }
            ],
            qualityRequirements: [
              {
                name: 'coherence',
                minimumScore: 8.0,
                weight: 0.3,
                description: 'Logischer Aufbau und Zusammenhang'
              },
              {
                name: 'scientific_accuracy',
                minimumScore: 9.0,
                weight: 0.4,
                description: 'Evidenzbasierte Meditationstechniken'
              }
            ],
            ethicalConsiderations: [
              'Keine unrealistischen Heilungsversprechen',
              'Respekt vor verschiedenen spirituellen Überzeugungen',
              'Warnung bei Traumata oder psychischen Problemen'
            ]
          },
          {
            id: 'daily-affirmations',
            name: 'Tägliche Affirmationen',
            description: 'Personalisierte positive Bestärkungen',
            category: 'affirmation',
            aiModel: 'gpt-4-wellness',
            template: {
              structure: [
                {
                  section: 'Morgendliche Bestärkung',
                  required: true,
                  minLength: 30,
                  maxLength: 80,
                  guidelines: ['Positiv', 'Präsens', 'Persönlich']
                },
                {
                  section: 'Selbstwert-Affirmation',
                  required: true,
                  minLength: 25,
                  maxLength: 70,
                  guidelines: ['Selbstliebe', 'Wertschätzung', 'Kraft']
                },
                {
                  section: 'Ziel-Motivation',
                  required: true,
                  minLength: 30,
                  maxLength: 90,
                  guidelines: ['Zielgerichtet', 'Motivierend', 'Erreichbar']
                }
              ],
              variables: [
                {
                  name: 'focus_area',
                  type: 'text',
                  description: 'Schwerpunkt der Affirmationen',
                  possibleValues: ['Selbstvertrauen', 'Erfolg', 'Gesundheit', 'Beziehungen', 'Kreativität']
                },
                {
                  name: 'intensity',
                  type: 'text',
                  description: 'Emotionale Intensität',
                  possibleValues: ['sanft', 'kraftvoll', 'energetisch'],
                  defaultValue: 'kraftvoll'
                }
              ],
              examples: [
                'Ich bin stark, fähig und bereit für alles, was dieser Tag bringt.',
                'Meine Träume sind gültig und ich verdiene es, sie zu verwirklichen.'
              ],
              constraints: [
                {
                  type: 'tone',
                  value: 'positiv und bestärkend',
                  importance: 'critical'
                }
              ]
            },
            personalizationFactors: [
              {
                name: 'current_challenges',
                weight: 0.5,
                dataSource: 'activity_history',
                extractionMethod: 'recent_wellness_goals',
                influence: []
              }
            ],
            qualityRequirements: [],
            ethicalConsiderations: [
              'Realistische und erreichbare Ziele',
              'Keine Manipulation oder falscher Optimismus'
            ]
          }
        ],
        personalization: {
          userId: 'user123',
          preferences: {
            tone: 'gentle',
            complexity: 'moderate',
            duration: 'medium',
            themes: ['Achtsamkeit', 'Selbstliebe', 'Dankbarkeit'],
            avoidTopics: ['Trauma', 'Religion'],
            languageStyle: 'warm',
            culturalContext: 'German',
            accessibility: {
              visualImpairment: false,
              hearingImpairment: false,
              cognitiveConsiderations: [],
              languageLevel: 'native',
              readingDifficulties: false
            }
          },
          history: [],
          patterns: [
            {
              type: 'time_preference',
              description: 'Bevorzugt Morgen-Meditationen',
              strength: 0.8,
              confidence: 0.9,
              examples: ['85% der Sessions zwischen 6-9 Uhr'],
              lastObserved: new Date('2024-06-10')
            }
          ],
          adaptations: [],
          lastUpdated: new Date('2024-06-11')
        },
        qualityMetrics: {
          averageQualityScore: 8.7,
          humanApprovalRate: 94.2,
          userSatisfactionRate: 91.8,
          flaggedContentRate: 2.1,
          improvementTrend: 0.15,
          benchmarkComparison: [
            {
              metric: 'User Satisfaction',
              ourScore: 91.8,
              industryBenchmark: 85.0,
              competitorAverage: 82.3,
              trend: 'outperforming'
            }
          ]
        },
        ethicalGuidelines: {
          principles: [
            {
              name: 'Do No Harm',
              description: 'Inhalte dürfen nicht schädlich oder manipulativ sein',
              implementation: ['Automatische Schadensprüfung', 'Menschliche Überprüfung'],
              metrics: ['Schadensberichte', 'Nutzerfeedback'],
              importance: 'fundamental'
            }
          ],
          prohibitions: [
            'Medizinische Diagnosen oder Behandlungsempfehlungen',
            'Extreme oder gefährliche Praktiken',
            'Diskriminierende oder verletzende Inhalte'
          ],
          requirements: [
            'Wissenschaftliche Genauigkeit bei Gesundheitsthemen',
            'Kulturelle Sensibilität',
            'Transparenz über AI-Generierung'
          ],
          reviewProcess: {
            automaticChecks: ['Schädlichkeitserkennung', 'Bias-Detection', 'Qualitätsprüfung'],
            humanReviewTriggers: ['Niedrige Qualitätsbewertung', 'Nutzerberichte', 'Neue Themen'],
            escalationProcedure: ['Level 1: Automatische Korrektur', 'Level 2: Menschliche Überprüfung', 'Level 3: Expertenrat'],
            appealProcess: ['Nutzerbeschwerden', 'Überprüfungsantrag', 'Unabhängige Bewertung']
          },
          continuousImprovement: {
            feedbackLoop: ['Nutzerfeedback', 'Qualitätsmetriken', 'Expertenbewertungen'],
            learningMechanism: ['Model Fine-tuning', 'Template Updates', 'Guideline Refinement'],
            updateFrequency: 'Wöchentlich für Metriken, Monatlich für Guidelines',
            stakeholderInvolvement: ['Nutzer', 'Wellness-Experten', 'Ethik-Kommission']
          }
        }
      };

      // Beispiel generierter Inhalte
      const sampleContent: GeneratedContent[] = [
        {
          id: 'content-001',
          type: 'guided-meditation',
          title: 'Achtsamkeits-Meditation für den Morgen',
          content: {
            text: 'Willkommen zu dieser 10-minütigen Achtsamkeitsmeditation für einen bewussten Start in den Tag...',
            audioUrl: '/assets/audio/morning-meditation.mp3',
            duration: 600, // 10 Minuten
            sections: [
              {
                title: 'Einleitung',
                content: 'Nimm eine bequeme Position ein und lass deinen Körper zur Ruhe kommen...',
                type: 'introduction',
                duration: 60
              },
              {
                title: 'Atemfokus',
                content: 'Richte deine Aufmerksamkeit sanft auf deinen natürlichen Atem...',
                type: 'main',
                duration: 480
              },
              {
                title: 'Abschluss',
                content: 'Kehre langsam in das Hier und Jetzt zurück...',
                type: 'conclusion',
                duration: 60
              }
            ]
          },
          metadata: {
            generatedAt: new Date('2024-06-11T08:00:00'),
            aiModel: 'gpt-4-wellness',
            version: '4.0',
            promptTokens: 245,
            responseTokens: 892,
            generationTime: 3.2,
            cost: 0.05,
            language: 'de',
            tags: ['meditation', 'morning', 'mindfulness'],
            scientificSources: [
              'Mindfulness-Based Stress Reduction (MBSR)',
              'Studies on morning meditation benefits'
            ]
          },
          personalization: {
            factors: ['experience_level', 'time_preference', 'stress_level'],
            modifications: [
              {
                factor: 'experience_level',
                originalValue: 'generic guidance',
                modifiedValue: 'beginner-friendly explanations',
                reason: 'User profile indicates beginner level',
                impact: 0.7
              }
            ],
            confidence: 0.85,
            fallbackUsed: false,
            customizations: ['Extended breathing section', 'Simplified language']
          },
          quality: {
            overall: 9.2,
            criteria: [
              {
                name: 'Coherence',
                score: 9.0,
                weight: 0.3,
                details: 'Logical flow and structure',
                improvementSuggestion: 'Could add smoother transitions'
              },
              {
                name: 'Scientific Accuracy',
                score: 9.5,
                weight: 0.4,
                details: 'Evidence-based mindfulness techniques'
              }
            ],
            flags: [],
            humanReview: {
              reviewerId: 'wellness-expert-01',
              score: 9.0,
              feedback: 'Excellent beginner-friendly content with good pacing',
              approved: true,
              improvementNotes: ['Consider adding optional advanced techniques'],
              reviewedAt: new Date('2024-06-11T10:00:00')
            },
            autoImprovement: []
          },
          ethics: {
            overall: 9.7,
            guidelines: [
              {
                name: 'Do No Harm',
                description: 'Content must not be harmful',
                compliance: 1.0,
                importance: 'critical',
                checkMethod: 'automated + human review'
              }
            ],
            violations: [],
            culturalSensitivity: {
              score: 9.5,
              considerations: ['German cultural context', 'Secular approach'],
              potentialIssues: [],
              adaptations: ['Avoided religious references']
            },
            harmfulnessPrevention: {
              harmfulnessScore: 0.05,
              potentialHarms: [],
              mitigations: ['Clear disclaimers', 'Gentle guidance'],
              safeguards: ['Trauma-informed approach']
            },
            biasDetection: {
              overallBias: 0.1,
              biasTypes: [],
              corrections: []
            }
          },
          performance: {
            views: 1247,
            completions: 1089,
            averageRating: 4.6,
            shareCount: 23,
            bookmarkCount: 189,
            reportCount: 0,
            effectivenessMetrics: [
              {
                name: 'Stress Reduction',
                value: 0.78,
                benchmark: 0.65,
                trend: 'improving',
                significance: 'high'
              }
            ],
            userSegmentPerformance: [
              {
                segment: 'Beginners',
                performance: 0.92,
                sampleSize: 456,
                confidence: 0.95
              }
            ]
          }
        }
      ];

      setContentEngine(sampleEngine);
      setPersonalizationProfile(sampleEngine.personalization);
      setQualityMetrics(sampleEngine.qualityMetrics);
      setGeneratedContent(sampleContent);
      setIsLoading(false);
    }, 1000);
  };

  const generateContent = async (request: Partial<ContentGenerationRequest>) => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simuliere AI-Generierung mit Progress
    const progressSteps = [
      'Initialisiere AI-Modell...',
      'Analysiere Personalisierungsfaktoren...',
      'Generiere Grundinhalt...',
      'Wende Personalisierung an...',
      'Führe Qualitätsprüfung durch...',
      'Prüfe ethische Richtlinien...',
      'Finalisiere Inhalt...'
    ];

    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(((i + 1) / progressSteps.length) * 100);
    }

    // Simuliere generierten Inhalt
    const newContent: GeneratedContent = {
      id: `content-${Date.now()}`,
      type: request.type || 'guided-meditation',
      title: 'Neue personalisierte Meditation',
      content: {
        text: 'Dies ist ein neu generierter Meditationsinhalt, speziell für dich personalisiert...',
        duration: 900
      },
      metadata: {
        generatedAt: new Date(),
        aiModel: 'gpt-4-wellness',
        version: '4.0',
        promptTokens: 234,
        responseTokens: 756,
        generationTime: 4.8,
        cost: 0.06,
        language: 'de',
        tags: ['meditation', 'personalized', 'new']
      },
      personalization: {
        factors: ['experience_level', 'current_mood'],
        modifications: [],
        confidence: 0.89,
        fallbackUsed: false,
        customizations: []
      },
      quality: {
        overall: 8.9,
        criteria: [],
        flags: [],
        humanReview: null,
        autoImprovement: []
      },
      ethics: {
        overall: 9.5,
        guidelines: [],
        violations: [],
        culturalSensitivity: {
          score: 9.0,
          considerations: [],
          potentialIssues: [],
          adaptations: []
        },
        harmfulnessPrevention: {
          harmfulnessScore: 0.02,
          potentialHarms: [],
          mitigations: [],
          safeguards: []
        },
        biasDetection: {
          overallBias: 0.05,
          biasTypes: [],
          corrections: []
        }
      },
      performance: {
        views: 0,
        completions: 0,
        averageRating: 0,
        shareCount: 0,
        bookmarkCount: 0,
        reportCount: 0,
        effectivenessMetrics: [],
        userSegmentPerformance: []
      }
    };

    setGeneratedContent(prev => [newContent, ...prev]);
    setIsGenerating(false);
    setGenerationProgress(0);
  };

  const tabs = [
    { id: 'generate', label: 'Content generieren', icon: '🤖', count: 0 },
    { id: 'library', label: 'Content-Bibliothek', icon: '📚', count: generatedContent.length },
    { id: 'analytics', label: 'Analytics', icon: '📊', count: 0 },
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
          AI-Generated Content Engine
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          🤖 Personalisierte Meditationen, Affirmationen und Wellness-Inhalte mit KI
        </p>
      </motion.div>

      {/* AI Engine Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-medium text-blue-800 dark:text-blue-200">
              AI-Engine online: {contentEngine?.models.length} Modelle aktiv
            </span>
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400">
            Qualitätsscore: {qualityMetrics?.averageQualityScore}/10
          </div>
        </div>
      </motion.div>

      {/* Generation Progress */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Generiere personalisierten Content...</span>
            <span className="text-sm">{Math.round(generationProgress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${generationProgress}%` }}
            />
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
          {activeTab === 'generate' && <GenerateTab onGenerate={generateContent} isGenerating={isGenerating} />}
          {activeTab === 'library' && <LibraryTab content={generatedContent} />}
          {activeTab === 'analytics' && <AnalyticsTab metrics={qualityMetrics} />}
          {activeTab === 'settings' && <SettingsTab profile={personalizationProfile} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Generate Tab Component
function GenerateTab({ 
  onGenerate, 
  isGenerating 
}: { 
  onGenerate: (request: Partial<ContentGenerationRequest>) => void;
  isGenerating: boolean;
}) {
  const [contentType, setContentType] = useState('guided-meditation');
  const [duration, setDuration] = useState(10);
  const [theme, setTheme] = useState('Achtsamkeit');
  const [personalization, setPersonalization] = useState(true);

  const handleGenerate = () => {
    onGenerate({
      type: contentType,
      parameters: {
        topic: theme,
        duration: duration * 60, // Convert to seconds
        complexity: 'moderate',
        tone: 'gentle',
        format: 'text',
        language: 'de',
        additionalRequirements: []
      },
      personalization: {
        usePersonalization: personalization,
        personalityFactors: ['experience_level', 'stress_level'],
        contextualFactors: ['time_of_day', 'recent_mood'],
        customInstructions: []
      },
      quality: {
        minimumScore: 8.0,
        criticalCriteria: ['scientific_accuracy', 'coherence'],
        humanReviewRequired: false,
        scientificAccuracy: true
      },
      constraints: {
        maxTokens: 2000,
        maxCost: 0.10,
        maxTime: 30,
        prohibitedContent: ['medical_advice', 'extreme_practices'],
        requiredElements: ['safe_guidance', 'positive_reinforcement']
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Content Type Selection */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🎯 Content-Typ auswählen
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'guided-meditation', name: 'Geführte Meditation', icon: '🧘‍♀️', desc: 'Personalisierte Meditationsanleitung' },
            { id: 'daily-affirmations', name: 'Tägliche Affirmationen', icon: '💫', desc: 'Positive Bestärkungen für den Tag' },
            { id: 'breathing-exercise', name: 'Atemübung', icon: '💨', desc: 'Angeleitete Atemtechniken' },
            { id: 'visualization', name: 'Visualisierung', icon: '🌈', desc: 'Geführte Vorstellungsübungen' },
            { id: 'body-scan', name: 'Body Scan', icon: '🫴', desc: 'Körperwahrnehmungs-Meditation' },
            { id: 'gratitude-practice', name: 'Dankbarkeits-Praxis', icon: '🙏', desc: 'Strukturierte Dankbarkeitsübung' }
          ].map((type) => (
            <motion.button
              key={type.id}
              onClick={() => setContentType(type.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl text-left transition-all ${
                contentType === type.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 text-gray-900 dark:text-white'
              }`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <h4 className="font-medium mb-1">{type.name}</h4>
              <p className="text-sm opacity-80">{type.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Generation Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            ⚙️ Parameter
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dauer (Minuten)
              </label>
              <select 
                value={duration} 
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-gray-900 dark:text-white"
              >
                <option value={5}>5 Minuten</option>
                <option value={10}>10 Minuten</option>
                <option value={15}>15 Minuten</option>
                <option value={20}>20 Minuten</option>
                <option value={30}>30 Minuten</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thema
              </label>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-gray-900 dark:text-white"
              >
                <option value="Achtsamkeit">Achtsamkeit</option>
                <option value="Stressabbau">Stressabbau</option>
                <option value="Selbstliebe">Selbstliebe</option>
                <option value="Dankbarkeit">Dankbarkeit</option>
                <option value="Energie">Energie</option>
                <option value="Heilung">Heilung</option>
                <option value="Kreativität">Kreativität</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="personalization"
                checked={personalization}
                onChange={(e) => setPersonalization(e.target.checked)}
                className="mr-3"
              />
              <label htmlFor="personalization" className="text-sm text-gray-700 dark:text-gray-300">
                Personalisierung aktivieren
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            🎨 Vorschau
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Content-Typ</div>
              <div className="font-medium">{contentType.replace('-', ' ')}</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Dauer</div>
              <div className="font-medium">{duration} Minuten</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Thema</div>
              <div className="font-medium">{theme}</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Personalisierung</div>
              <div className="font-medium">{personalization ? 'Aktiviert' : 'Deaktiviert'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <motion.button
          onClick={handleGenerate}
          disabled={isGenerating}
          whileHover={{ scale: isGenerating ? 1 : 1.05 }}
          whileTap={{ scale: isGenerating ? 1 : 0.95 }}
          className={`px-12 py-4 rounded-xl font-bold text-lg transition-all ${
            isGenerating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-xl'
          } text-white`}
        >
          {isGenerating ? '🤖 Generiere Content...' : '✨ Content generieren'}
        </motion.button>
      </div>
    </div>
  );
}

// Library Tab Component
function LibraryTab({ content }: { content: GeneratedContent[] }) {
  return (
    <div className="space-y-6">
      {content.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Typ: {item.type}</span>
                <span>•</span>
                <span>Erstellt: {item.metadata.generatedAt.toLocaleDateString()}</span>
                <span>•</span>
                <span>Dauer: {Math.round((item.content.duration || 0) / 60)}min</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.quality.overall >= 9 ? 'bg-green-100 text-green-800' :
                item.quality.overall >= 7 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Qualität: {item.quality.overall}/10
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {item.performance.views} Views
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
              {item.content.text?.substring(0, 200)}...
            </p>
          </div>
          
          {/* Personalization Info */}
          {item.personalization.confidence > 0 && (
            <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-1">
                Personalisierung angewendet
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-300">
                Vertrauen: {Math.round(item.personalization.confidence * 100)}% • 
                Faktoren: {item.personalization.factors.join(', ')}
              </div>
            </div>
          )}
          
          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {Math.round((item.performance.completions / item.performance.views) * 100)}%
              </div>
              <div className="text-xs text-gray-500">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {item.performance.averageRating.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">Bewertung</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {item.performance.shareCount}
              </div>
              <div className="text-xs text-gray-500">Geteilt</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {item.performance.bookmarkCount}
              </div>
              <div className="text-xs text-gray-500">Gespeichert</div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Anhören/Lesen
            </button>
            <button className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
              Teilen
            </button>
            <button className="px-4 bg-gray-500 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors">
              ⭐
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Analytics Tab Component
function AnalyticsTab({ metrics }: { metrics: QualityMetrics | null }) {
  if (!metrics) return null;

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{metrics.averageQualityScore.toFixed(1)}</div>
          <div className="text-white/80">Ø Qualitätsscore</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{metrics.humanApprovalRate.toFixed(1)}%</div>
          <div className="text-white/80">Approval Rate</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{metrics.userSatisfactionRate.toFixed(1)}%</div>
          <div className="text-white/80">Nutzerzufriedenheit</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="text-3xl font-bold">{metrics.flaggedContentRate.toFixed(1)}%</div>
          <div className="text-white/80">Flagged Content</div>
        </div>
      </div>

      {/* Benchmark Comparison */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          📊 Benchmark-Vergleich
        </h3>
        <div className="space-y-4">
          {metrics.benchmarkComparison.map((benchmark) => (
            <div key={benchmark.metric} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{benchmark.metric}</div>
                <div className="text-sm text-gray-500">
                  Trend: {benchmark.trend}
                </div>
              </div>
              <div className="text-right">
                <div className="flex space-x-4 text-sm">
                  <div>
                    <div className="text-gray-500">Unser Score</div>
                    <div className="font-bold text-blue-600">{benchmark.ourScore}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Benchmark</div>
                    <div className="font-bold text-gray-600">{benchmark.industryBenchmark}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Konkurrenz</div>
                    <div className="font-bold text-orange-600">{benchmark.competitorAverage}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Trend */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          📈 Verbesserungs-Trend
        </h3>
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-green-600">
            +{(metrics.improvementTrend * 100).toFixed(1)}%
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              Kontinuierliche Verbesserung
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Qualität steigt durch maschinelles Lernen und Nutzerfeedback
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Tab Component
function SettingsTab({ profile }: { profile: PersonalizationProfile | null }) {
  if (!profile) return null;

  return (
    <div className="space-y-6">
      {/* Personalization Preferences */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🎯 Personalisierungs-Einstellungen
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bevorzugter Ton
            </label>
            <select 
              value={profile.preferences.tone}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="gentle">Sanft</option>
              <option value="motivational">Motivierend</option>
              <option value="scientific">Wissenschaftlich</option>
              <option value="playful">Verspielt</option>
              <option value="spiritual">Spirituell</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Komplexität
            </label>
            <select 
              value={profile.preferences.complexity}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="simple">Einfach</option>
              <option value="moderate">Moderat</option>
              <option value="advanced">Fortgeschritten</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bevorzugte Dauer
            </label>
            <select 
              value={profile.preferences.duration}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="short">Kurz (5-10 Min)</option>
              <option value="medium">Mittel (10-20 Min)</option>
              <option value="long">Lang (20+ Min)</option>
              <option value="flexible">Flexibel</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sprachstil
            </label>
            <select 
              value={profile.preferences.languageStyle}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="formal">Formal</option>
              <option value="casual">Locker</option>
              <option value="poetic">Poetisch</option>
              <option value="direct">Direkt</option>
            </select>
          </div>
        </div>
      </div>

      {/* Learned Patterns */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🧠 Erkannte Muster
        </h3>
        <div className="space-y-3">
          {profile.patterns.map((pattern, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {pattern.description}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-500">
                    Stärke: {Math.round(pattern.strength * 100)}%
                  </div>
                  <div className="text-sm text-gray-500">
                    Vertrauen: {Math.round(pattern.confidence * 100)}%
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {pattern.examples.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          ♿ Barrierefreiheit
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white">Sprachniveau</span>
            <select 
              value={profile.preferences.accessibility.languageLevel}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="beginner">Anfänger</option>
              <option value="intermediate">Mittelstufe</option>
              <option value="advanced">Fortgeschritten</option>
              <option value="native">Muttersprachler</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white">Sehbeeinträchtigung berücksichtigen</span>
            <input
              type="checkbox"
              checked={profile.preferences.accessibility.visualImpairment}
              className="rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white">Hörbeeinträchtigung berücksichtigen</span>
            <input
              type="checkbox"
              checked={profile.preferences.accessibility.hearingImpairment}
              className="rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white">Leseschwierigkeiten berücksichtigen</span>
            <input
              type="checkbox"
              checked={profile.preferences.accessibility.readingDifficulties}
              className="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
