'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowTrendingUpIcon, 
  CalendarIcon, 
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  HeartIcon,
  ArrowRightIcon,
  StarIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { PersonalImpactPlan } from '@/types/realWorldChallenges';
import { RealWorldChallenge, IndividualSolution } from '@/types/realWorldChallenges';
import { realWorldChallenges, individualSolutions } from '@/utils/realWorldChallengesData';

interface PersonalImpactTrackerProps {
  className?: string;
}

interface ImpactEntry {
  id: string;
  challengeId: string;
  solutionId: string;
  startDate: Date;
  targetWeeks: number;
  currentWeek: number;
  weeklyProgress: {
    week: number;
    date: Date;
    adherence: number; // 0-100%
    symptomReduction: number; // 0-100%
    qualityOfLife: number; // 1-10
    notes: string;
    challenges: string[];
    breakthroughs: string[];
  }[];
  status: 'active' | 'completed' | 'paused' | 'discontinued';
}

const PersonalImpactTracker: React.FC<PersonalImpactTrackerProps> = ({ className = '' }) => {
  const [impactPlans, setImpactPlans] = useState<ImpactEntry[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<ImpactEntry | null>(null);
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<string>('');
  const [selectedSolution, setSelectedSolution] = useState<string>('');

  // Lade gespeicherte Impact Plans
  useEffect(() => {
    const saved = localStorage.getItem('wellness-impact-plans');
    if (saved) {
      const plans = JSON.parse(saved);
      // Konvertiere Datumsstrings zurück zu Date-Objekten
      const parsedPlans = plans.map((plan: any) => ({
        ...plan,
        startDate: new Date(plan.startDate),
        weeklyProgress: plan.weeklyProgress.map((week: any) => ({
          ...week,
          date: new Date(week.date)
        }))
      }));
      setImpactPlans(parsedPlans);
    }
  }, []);

  // Speichere Impact Plans
  const saveImpactPlans = (plans: ImpactEntry[]) => {
    localStorage.setItem('wellness-impact-plans', JSON.stringify(plans));
    setImpactPlans(plans);
  };

  // Neuen Impact Plan erstellen
  const createImpactPlan = () => {
    if (!selectedChallenge || !selectedSolution) return;

    const newPlan: ImpactEntry = {
      id: Date.now().toString(),
      challengeId: selectedChallenge,
      solutionId: selectedSolution,
      startDate: new Date(),
      targetWeeks: 12, // Standard: 12 Wochen
      currentWeek: 1,
      weeklyProgress: [{
        week: 1,
        date: new Date(),
        adherence: 100,
        symptomReduction: 0,
        qualityOfLife: 5,
        notes: 'Plan gestartet',
        challenges: [],
        breakthroughs: []
      }],
      status: 'active'
    };

    const updatedPlans = [...impactPlans, newPlan];
    saveImpactPlans(updatedPlans);
    setShowAddPlan(false);
    setSelectedChallenge('');
    setSelectedSolution('');
  };

  // Wöchentlichen Fortschritt hinzufügen
  const addWeeklyProgress = (planId: string, progress: any) => {
    const updatedPlans = impactPlans.map(plan => {
      if (plan.id === planId) {
        return {
          ...plan,
          currentWeek: plan.currentWeek + 1,
          weeklyProgress: [...plan.weeklyProgress, progress]
        };
      }
      return plan;
    });
    saveImpactPlans(updatedPlans);
  };

  // Plan-Status ändern
  const updatePlanStatus = (planId: string, status: ImpactEntry['status']) => {
    const updatedPlans = impactPlans.map(plan => 
      plan.id === planId ? { ...plan, status } : plan
    );
    saveImpactPlans(updatedPlans);
  };

  const getChallenge = (challengeId: string): RealWorldChallenge | undefined => {
    return realWorldChallenges.find(c => c.id === challengeId);
  };

  const getSolution = (solutionId: string): IndividualSolution | undefined => {
    return individualSolutions.find(s => s.id === solutionId);
  };

  const getProgressColor = (value: number) => {
    if (value >= 80) return 'text-green-600 bg-green-100';
    if (value >= 60) return 'text-yellow-600 bg-yellow-100';
    if (value >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'discontinued': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-lg">
            <ArrowTrendingUpIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Personal Impact Tracker</h2>
            <p className="text-sm text-gray-600">Verfolge deinen Fortschritt bei realen Herausforderungen</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddPlan(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <LightBulbIcon className="w-4 h-4" />
          <span>Neuen Plan starten</span>
        </button>
      </div>

      {/* Aktive Pläne Overview */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Aktive Pläne</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {impactPlans.filter(p => p.status === 'active').length}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <StarIcon className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Abgeschlossen</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {impactPlans.filter(p => p.status === 'completed').length}
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ChartBarIcon className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-800">Ø Verbesserung</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {impactPlans.length > 0 
              ? Math.round(impactPlans.reduce((sum, plan) => {
                  const lastWeek = plan.weeklyProgress[plan.weeklyProgress.length - 1];
                  return sum + (lastWeek?.symptomReduction || 0);
                }, 0) / impactPlans.length)
              : 0
            }%
          </div>
        </div>
      </div>

      {/* Impact Plans Liste */}
      <div className="space-y-4">        {impactPlans.length === 0 ? (
          <div className="text-center py-12">
            <ArrowTrendingUpIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Noch keine Impact Plans</h3>
            <p className="text-gray-600 mb-6">
              Starte deinen ersten Personal Impact Plan und beginne, reale Veränderungen zu bewirken.
            </p>
            <button
              onClick={() => setShowAddPlan(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Ersten Plan erstellen
            </button>
          </div>
        ) : (
          impactPlans.map((plan) => {
            const challenge = getChallenge(plan.challengeId);
            const solution = getSolution(plan.solutionId);
            const lastWeek = plan.weeklyProgress[plan.weeklyProgress.length - 1];
            const progressPercentage = (plan.currentWeek / plan.targetWeeks) * 100;

            return (
              <motion.div
                key={plan.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-2xl">{challenge?.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{challenge?.title}</h3>
                        <p className="text-sm text-gray-600">{solution?.title}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>Woche {plan.currentWeek}/{plan.targetWeeks}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>
                          {Math.floor((Date.now() - plan.startDate.getTime()) / (1000 * 60 * 60 * 24))} Tage
                        </span>
                      </div>
                    </div>

                    {/* Fortschrittsbalken */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>

                    {/* Aktuelle Metriken */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getProgressColor(lastWeek?.adherence || 0)}`}>
                          {lastWeek?.adherence || 0}%
                        </div>
                        <div className="text-xs text-gray-500">Einhaltung</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getProgressColor(lastWeek?.symptomReduction || 0)}`}>
                          {lastWeek?.symptomReduction || 0}%
                        </div>
                        <div className="text-xs text-gray-500">Symptom-Reduktion</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          {lastWeek?.qualityOfLife || 0}/10
                        </div>
                        <div className="text-xs text-gray-500">Lebensqualität</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                      {plan.status}
                    </span>
                    <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Add Plan Modal */}
      <AnimatePresence>
        {showAddPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddPlan(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Neuen Impact Plan erstellen</h3>
                  <button
                    onClick={() => setShowAddPlan(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Challenge auswählen */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Herausforderung wählen
                    </label>
                    <select
                      value={selectedChallenge}
                      onChange={(e) => {
                        setSelectedChallenge(e.target.value);
                        setSelectedSolution(''); // Reset solution when challenge changes
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">-- Herausforderung auswählen --</option>
                      {realWorldChallenges.map((challenge) => (
                        <option key={challenge.id} value={challenge.id}>
                          {challenge.icon} {challenge.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Solution auswählen */}
                  {selectedChallenge && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lösung wählen
                      </label>
                      <select
                        value={selectedSolution}
                        onChange={(e) => setSelectedSolution(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">-- Lösung auswählen --</option>
                        {individualSolutions
                          .filter(solution => solution.challengeId === selectedChallenge)
                          .map((solution) => (
                            <option key={solution.id} value={solution.id}>
                              {solution.title} (Wirksamkeit: {solution.effectiveness}/10)
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {/* Solution Preview */}
                  {selectedSolution && (
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">
                        {individualSolutions.find(s => s.id === selectedSolution)?.title}
                      </h4>
                      <p className="text-sm text-purple-700 mb-3">
                        {individualSolutions.find(s => s.id === selectedSolution)?.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="font-medium">Zeitaufwand:</span>{' '}
                          {individualSolutions.find(s => s.id === selectedSolution)?.timeCommitment}
                        </div>
                        <div>
                          <span className="font-medium">Schwierigkeit:</span>{' '}
                          {individualSolutions.find(s => s.id === selectedSolution)?.difficulty}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setShowAddPlan(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={createImpactPlan}
                      disabled={!selectedChallenge || !selectedSolution}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        selectedChallenge && selectedSolution
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Plan starten
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plan Detail Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPlan(null)}
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
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getChallenge(selectedPlan.challengeId)?.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {getChallenge(selectedPlan.challengeId)?.title}
                      </h3>
                      <p className="text-gray-600">{getSolution(selectedPlan.solutionId)?.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Fortschritts-Chart */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Fortschrittsverlauf</h4>
                  <div className="space-y-4">
                    {selectedPlan.weeklyProgress.map((week, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="text-sm font-medium text-gray-600 w-16">
                          Woche {week.week}
                        </div>
                        
                        <div className="flex-1 grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-500">Einhaltung</div>
                            <div className={`font-semibold ${getProgressColor(week.adherence)}`}>
                              {week.adherence}%
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm text-gray-500">Symptom-Reduktion</div>
                            <div className={`font-semibold ${getProgressColor(week.symptomReduction)}`}>
                              {week.symptomReduction}%
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm text-gray-500">Lebensqualität</div>
                            <div className="font-semibold text-blue-600">
                              {week.qualityOfLife}/10
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updatePlanStatus(selectedPlan.id, 'paused')}
                      className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      Pausieren
                    </button>
                    <button
                      onClick={() => updatePlanStatus(selectedPlan.id, 'completed')}
                      className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      Abschließen
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Schließen
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalImpactTracker;
