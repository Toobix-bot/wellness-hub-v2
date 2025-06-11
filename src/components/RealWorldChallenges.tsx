'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowTrendingUpIcon, 
  HeartIcon, 
  UserGroupIcon, 
  LightBulbIcon,
  ExclamationTriangleIcon,
  BeakerIcon,
  ChartBarIcon,
  PlayIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { RealWorldChallenge, IndividualSolution } from '@/types/realWorldChallenges';
import { realWorldChallenges, individualSolutions, getChallengeById, getSolutionsByChallenge } from '@/utils/realWorldChallengesData';

interface RealWorldChallengesProps {
  className?: string;
}

const RealWorldChallenges: React.FC<RealWorldChallengesProps> = ({ className = '' }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<RealWorldChallenge | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<IndividualSolution | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'solutions' | 'statistics' | 'community'>('overview');
  const [startedSolutions, setStartedSolutions] = useState<Set<string>>(new Set());

  // Lade gestartete Solutions aus localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wellness-started-solutions');
    if (saved) {
      setStartedSolutions(new Set(JSON.parse(saved)));
    }
  }, []);

  // Speichere gestartete Solutions
  const toggleSolutionStart = (solutionId: string) => {
    const newStarted = new Set(startedSolutions);
    if (newStarted.has(solutionId)) {
      newStarted.delete(solutionId);
    } else {
      newStarted.add(solutionId);
    }
    setStartedSolutions(newStarted);
    localStorage.setItem('wellness-started-solutions', JSON.stringify(Array.from(newStarted)));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mental_health': return <HeartIcon className="w-6 h-6" />;
      case 'physical_health': return <BeakerIcon className="w-6 h-6" />;
      case 'social_issues': return <UserGroupIcon className="w-6 h-6" />;
      case 'environmental': return <ArrowTrendingUpIcon className="w-6 h-6" />;
      default: return <ExclamationTriangleIcon className="w-6 h-6" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'from-green-500 to-green-600';
      case 'moderate': return 'from-yellow-500 to-orange-600';
      case 'severe': return 'from-orange-500 to-red-600';
      case 'critical': return 'from-red-500 to-red-700';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEffectivenessStars = (effectiveness: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(effectiveness / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 p-3 rounded-lg">
            <ExclamationTriangleIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Reale Herausforderungen</h2>
            <p className="text-sm text-gray-600">Wissenschaftlich fundierte Lösungen für echte Probleme</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-600">{realWorldChallenges.length}</div>
          <div className="text-xs text-gray-500">Herausforderungen</div>
        </div>
      </div>

      {!selectedChallenge ? (
        <div className="space-y-4">
          {/* Kategorien Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { category: 'mental_health', name: 'Psychische Gesundheit', count: realWorldChallenges.filter(c => c.category === 'mental_health').length },
              { category: 'physical_health', name: 'Körperliche Gesundheit', count: realWorldChallenges.filter(c => c.category === 'physical_health').length },
              { category: 'social_issues', name: 'Soziale Probleme', count: realWorldChallenges.filter(c => c.category === 'social_issues').length },
              { category: 'environmental', name: 'Umwelt & Klima', count: realWorldChallenges.filter(c => c.category === 'environmental').length }
            ].map((cat) => (
              <div key={cat.category} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">
                  {getCategoryIcon(cat.category)}
                </div>
                <div className="text-2xl font-bold text-gray-900">{cat.count}</div>
                <div className="text-xs text-gray-600">{cat.name}</div>
              </div>
            ))}
          </div>

          {/* Challenge Cards */}
          <div className="grid gap-4">
            {realWorldChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedChallenge(challenge)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-3xl">{challenge.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getSeverityColor(challenge.severity)} text-white`}>
                          {challenge.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">                        <div className="flex items-center space-x-1">
                          <ArrowTrendingUpIcon className="w-4 h-4" />
                          <span>{challenge.prevalence}% betroffen</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <UserGroupIcon className="w-4 h-4" />
                          <span>{(challenge.statistics.globalAffected / 1000000).toFixed(0)}M weltweit</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <LightBulbIcon className="w-4 h-4" />
                          <span>{getSolutionsByChallenge(challenge.id).length} Lösungen</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Header mit Back Button */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedChallenge(null);
                  setSelectedSolution(null);
                  setActiveTab('overview');
                }}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowRightIcon className="w-4 h-4 rotate-180" />
                <span>Zurück zur Übersicht</span>
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-3xl">{selectedChallenge.icon}</span>
                <h2 className="text-xl font-bold text-gray-900">{selectedChallenge.title}</h2>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', name: 'Übersicht', icon: BookOpenIcon },
                  { id: 'solutions', name: 'Lösungen', icon: LightBulbIcon },
                  { id: 'statistics', name: 'Statistiken', icon: ChartBarIcon },
                  { id: 'community', name: 'Community', icon: UserGroupIcon }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Challenge Info */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">{selectedChallenge.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">🎯 Hauptsymptome</h4>
                        <ul className="space-y-1">
                          {selectedChallenge.symptoms.slice(0, 5).map((symptom, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">⚠️ Risikofaktoren</h4>
                        <ul className="space-y-1">
                          {selectedChallenge.riskFactors.slice(0, 5).map((factor, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                              <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Medizinische Informationen */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <BeakerIcon className="w-5 h-5" />
                      <span>Medizinische & Wissenschaftliche Informationen</span>
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Ursachen</h5>
                        <ul className="space-y-1 mb-4">
                          {selectedChallenge.medicalInfo.causes.map((cause, index) => (
                            <li key={index} className="text-sm text-gray-600">• {cause}</li>
                          ))}
                        </ul>
                        
                        <h5 className="font-medium text-gray-800 mb-2">Komplikationen</h5>
                        <ul className="space-y-1">
                          {selectedChallenge.medicalInfo.complications.map((comp, index) => (
                            <li key={index} className="text-sm text-gray-600">• {comp}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Diagnostik</h5>
                        <ul className="space-y-1 mb-4">
                          {selectedChallenge.medicalInfo.diagnosis.map((diag, index) => (
                            <li key={index} className="text-sm text-gray-600">• {diag}</li>
                          ))}
                        </ul>
                        
                        <h5 className="font-medium text-gray-800 mb-2">Konventionelle Behandlung</h5>
                        <ul className="space-y-1">
                          {selectedChallenge.medicalInfo.conventionalTreatments.map((treatment, index) => (
                            <li key={index} className="text-sm text-gray-600">• {treatment}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'solutions' && (
                <div className="space-y-4">
                  {getSolutionsByChallenge(selectedChallenge.id).map((solution) => (
                    <motion.div
                      key={solution.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{solution.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(solution.difficulty)}`}>
                              {solution.difficulty}
                            </span>
                            <div className="flex items-center space-x-1">
                              {getEffectivenessStars(solution.effectiveness)}
                              <span className="text-sm text-gray-600 ml-1">({solution.effectiveness}/10)</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{solution.description}</p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                            <div className="flex items-center space-x-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>{solution.timeCommitment}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BeakerIcon className="w-4 h-4" />
                              <span>{solution.scientificBacking.studies} Studien</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ArrowTrendingUpIcon className="w-4 h-4" />
                              <span>{solution.scientificBacking.evidenceLevel} Evidenz</span>
                            </div>
                          </div>

                          {/* Key Findings */}
                          <div className="bg-green-50 rounded-lg p-4 mb-4">
                            <h5 className="font-medium text-green-800 mb-2">🔬 Wichtige Forschungsergebnisse</h5>
                            <ul className="space-y-1">
                              {solution.scientificBacking.keyFindings.slice(0, 3).map((finding, index) => (
                                <li key={index} className="text-sm text-green-700">• {finding}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Success Stories */}
                          {solution.successStories.length > 0 && (
                            <div className="bg-blue-50 rounded-lg p-4 mb-4">
                              <h5 className="font-medium text-blue-800 mb-2">✨ Erfolgsgeschichte</h5>
                              <div className="text-sm text-blue-700">
                                <div className="font-medium">{solution.successStories[0].anonymizedCase}</div>
                                <div className="mt-1">
                                  <strong>Verbesserung:</strong> {solution.successStories[0].improvement}
                                </div>
                                <div className="mt-1">
                                  <strong>Zeitraum:</strong> {solution.successStories[0].timeframe}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setSelectedSolution(solution)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <BookOpenIcon className="w-4 h-4" />
                          <span>Details ansehen</span>
                        </button>
                        
                        <button
                          onClick={() => toggleSolutionStart(solution.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                            startedSolutions.has(solution.id)
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {startedSolutions.has(solution.id) ? (
                            <>
                              <CheckCircleIcon className="w-4 h-4" />
                              <span>Gestartet</span>
                            </>
                          ) : (
                            <>
                              <PlayIcon className="w-4 h-4" />
                              <span>Jetzt starten</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'statistics' && (
                <div className="space-y-6">
                  {/* Global Statistics */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <ChartBarIcon className="w-5 h-5" />
                      <span>Globale Statistiken</span>
                    </h4>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {(selectedChallenge.statistics.globalAffected / 1000000).toFixed(0)}M
                        </div>
                        <div className="text-sm text-gray-600">Betroffene weltweit</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">
                          {selectedChallenge.prevalence}%
                        </div>
                        <div className="text-sm text-gray-600">Prävalenz</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {getSolutionsByChallenge(selectedChallenge.id).length}
                        </div>
                        <div className="text-sm text-gray-600">Verfügbare Lösungen</div>
                      </div>
                    </div>
                  </div>

                  {/* Age Groups */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h5 className="font-medium text-gray-800 mb-4">Betroffenheit nach Altersgruppen</h5>
                    <div className="space-y-3">
                      {selectedChallenge.statistics.ageGroups.map((group, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{group.range} Jahre</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(group.percentage / 100) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 w-12 text-right">
                              {group.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trends */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h5 className="font-medium text-gray-800 mb-4">Entwicklungstrend (2019-2023)</h5>
                    <div className="space-y-2">
                      {selectedChallenge.statistics.trends.map((trend, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{trend.year}</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-red-500 h-2 rounded-full"
                                style={{ width: `${(trend.prevalence / 50) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 w-12 text-right">
                              {trend.prevalence}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'community' && (
                <div className="text-center py-12">
                  <UserGroupIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Community-Features</h4>
                  <p className="text-gray-600 mb-6">
                    Verbinde dich mit anderen, die ähnliche Herausforderungen bewältigen.
                  </p>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Bald verfügbar
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Solution Detail Modal */}
      <AnimatePresence>
        {selectedSolution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSolution(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{selectedSolution.title}</h3>
                  <button
                    onClick={() => setSelectedSolution(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Implementation Steps */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">🔄 Umsetzung Schritt für Schritt</h4>
                    <div className="space-y-3">
                      {selectedSolution.implementation.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="text-sm text-gray-700">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Resources */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">🛠️ Benötigte Tools & Ressourcen</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedSolution.implementation.tools.map((tool, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          <span>{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Metrics */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">📊 Fortschritt messen</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ul className="space-y-2">
                        {selectedSolution.implementation.progressMetrics.map((metric, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-center space-x-2">
                            <ArrowTrendingUpIcon className="w-4 h-4 text-blue-500" />
                            <span>{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Scientific Sources */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">📚 Wissenschaftliche Quellen</h4>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <ul className="space-y-1">
                        {selectedSolution.scientificBacking.sources.slice(0, 3).map((source, index) => (
                          <li key={index} className="text-xs text-blue-700">• {source}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <strong>Zeitaufwand:</strong> {selectedSolution.timeCommitment}
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedSolution(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Schließen
                      </button>
                      <button
                        onClick={() => {
                          toggleSolutionStart(selectedSolution.id);
                          setSelectedSolution(null);
                        }}
                        className={`px-6 py-2 rounded-lg transition-colors ${
                          startedSolutions.has(selectedSolution.id)
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {startedSolutions.has(selectedSolution.id) ? '✓ Gestartet' : 'Jetzt starten'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RealWorldChallenges;
