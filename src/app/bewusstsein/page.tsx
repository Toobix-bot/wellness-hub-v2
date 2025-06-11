'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  LightBulbIcon,
  EyeIcon,
  HeartIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { consciousnessFactsWithSources, formatSourceForDisplay } from '@/utils/scientificData';

interface ConsciousnessState {
  id: string;
  name: string;
  description: string;
  brainwaveFrequency: string;
  characteristics: string[];
  benefits: string[];
  howToAchieve: string[];
  practicalExercise: {
    title: string;
    duration: string;
    steps: string[];
  };
  scientificEvidence: string;
  commonMisconceptions: string[];
}

const consciousnessStates: ConsciousnessState[] = [
  {
    id: 'beta',
    name: 'Beta-Zustand (Normales Wachbewusstsein)',
    description: 'Der Zustand des aktiven, analytischen Denkens und der fokussierten Aufmerksamkeit im Alltag.',
    brainwaveFrequency: '13-30 Hz',
    characteristics: [
      'Logisches, analytisches Denken',
      'Aktive Problemlösung',
      'Fokussierte Aufmerksamkeit nach außen',
      'Hohe mentale Aktivität'
    ],
    benefits: [
      'Effektive Entscheidungsfindung',
      'Konzentriertes Arbeiten',
      'Kritisches Denken',
      'Zielorientiertes Handeln'
    ],
    howToAchieve: [
      'Mentale Herausforderungen annehmen',
      'Komplexe Aufgaben bearbeiten',
      'Aktive Diskussionen führen',
      'Neue Fertigkeiten erlernen'
    ],
    practicalExercise: {
      title: 'Fokussierte Problemlösung',
      duration: '10-15 Minuten',
      steps: [
        'Wähle ein konkretes Problem aus deinem Leben',
        'Schreibe alle Aspekte des Problems auf',
        'Analysiere systematisch mögliche Lösungsansätze',
        'Bewerte jeden Ansatz rational',
        'Erstelle einen Aktionsplan'
      ]
    },
    scientificEvidence: 'EEG-Studien zeigen erhöhte Beta-Aktivität bei kognitiven Aufgaben und Entscheidungsprozessen.',
    commonMisconceptions: [
      'Beta-Zustand ist immer gestresst - falsch, er kann entspannt und fokussiert sein',
      'Mehr Beta ist immer besser - übermäßige Beta-Aktivität kann zu Angst führen'
    ]
  },
  {
    id: 'alpha',
    name: 'Alpha-Zustand (Entspannte Aufmerksamkeit)',
    description: 'Ein Zustand entspannter Wachheit, der Kreativität und innere Ruhe fördert.',
    brainwaveFrequency: '8-12 Hz',
    characteristics: [
      'Entspannte, aber wache Aufmerksamkeit',
      'Erhöhte Kreativität',
      'Innere Ruhe und Gelassenheit',
      'Verbesserte Intuition'
    ],
    benefits: [
      'Stressreduktion',
      'Erhöhte Kreativität',
      'Bessere Lernfähigkeit',
      'Emotionale Balance'
    ],
    howToAchieve: [
      'Achtsamkeitsmeditation',
      'Entspannte Spaziergänge in der Natur',
      'Kreative Tätigkeiten ohne Leistungsdruck',
      'Leichte körperliche Aktivität'
    ],
    practicalExercise: {
      title: 'Alpha-Atemmeditation',
      duration: '10 Minuten',
      steps: [
        'Setze dich bequem hin und schließe die Augen',
        'Atme natürlich und konzentriere dich auf den Atem',
        'Zähle beim Einatmen "Ein" und beim Ausatmen "Aus"',
        'Wenn Gedanken kommen, beobachte sie ohne zu bewerten',
        'Kehre sanft zum Atem zurück'
      ]
    },
    scientificEvidence: 'Harvard-Studien belegen, dass Alpha-Zustände Stress reduzieren und die Kreativität um bis zu 40% steigern können.',
    commonMisconceptions: [
      'Alpha bedeutet passiv sein - falsch, es ist aktive entspannte Aufmerksamkeit',
      'Nur Meditation erzeugt Alpha - viele Aktivitäten können Alpha-Zustände auslösen'
    ]
  },
  {
    id: 'theta',
    name: 'Theta-Zustand (Tiefe Meditation)',
    description: 'Ein Zustand tiefer innerer Erkenntnis, Intuition und spiritueller Verbindung.',
    brainwaveFrequency: '4-8 Hz',
    characteristics: [
      'Tiefe meditative Zustände',
      'Erhöhte Intuition und Einsicht',
      'Zugang zum Unterbewusstsein',
      'Intensive emotionale Erfahrungen'
    ],
    benefits: [
      'Tiefe emotionale Heilung',
      'Spirituelle Einsichten',
      'Kreative Durchbrüche',
      'Traumhafte Visionen und Lösungen'
    ],
    howToAchieve: [
      'Längere Meditationspraxis (20+ Minuten)',
      'Geführte Visualisierungen',
      'Schamanische Praktiken',
      'Tiefe Entspannungstechniken'
    ],
    practicalExercise: {
      title: 'Theta-Visualisationsmeditation',
      duration: '20-30 Minuten',
      steps: [
        'Lege dich in einen ruhigen, dunklen Raum',
        'Entspanne systematisch jeden Körperteil',
        'Stelle dir einen Ort vor, an dem du dich völlig sicher fühlst',
        'Erlaube Bildern und Einsichten zu entstehen',
        'Stelle eine wichtige Lebensfrage und lausche der Antwort'
      ]
    },
    scientificEvidence: 'Neurowissenschaftliche Studien zeigen, dass Theta-Wellen mit Gedächtniskonsolidierung und kreativen Einsichten verbunden sind.',
    commonMisconceptions: [
      'Theta ist nur für spirituelle Menschen - wissenschaftlich messbar für jeden',
      'Theta-Zustände sind gefährlich - sie sind natürlich und heilsam bei richtiger Anwendung'
    ]
  },
  {
    id: 'delta',
    name: 'Delta-Zustand (Tiefschlaf & Heilung)',
    description: 'Der Zustand tiefster körperlicher und geistiger Regeneration.',
    brainwaveFrequency: '0.5-4 Hz',
    characteristics: [
      'Tiefste Entspannung',
      'Körperliche Regeneration',
      'Immunsystem-Stärkung',
      'Traumloser Schlaf'
    ],
    benefits: [
      'Körperliche Heilung und Reparatur',
      'Immunsystem-Stärkung',
      'Gedächtniskonsolidierung',
      'Hormonelle Balance'
    ],
    howToAchieve: [
      'Qualitätsvoller Tiefschlaf',
      'Sehr tiefe Entspannungstechniken',
      'Yoga Nidra (Schlafyoga)',
      'Bestimmte Atemtechniken'
    ],
    practicalExercise: {
      title: 'Delta-Induzierende Entspannung',
      duration: '30-45 Minuten',
      steps: [
        'Lege dich bequem hin, Raum sollte kühl und dunkel sein',
        'Spanne alle Muskeln 5 Sekunden an, dann vollständig entspannen',
        'Atme sehr langsam: 4 Sekunden ein, 8 Sekunden aus',
        'Visualisiere, wie jede Zelle deines Körpers heilt',
        'Erlaube dir komplett loszulassen'
      ]
    },
    scientificEvidence: 'Schlafforschung zeigt, dass Delta-Wellen essentiell für Wachstumshormon-Freisetzung und Immunfunktion sind.',
    commonMisconceptions: [
      'Delta nur im Schlaf möglich - auch bewusst im Wachzustand erreichbar',
      'Delta ist unwichtig - einer der wichtigsten Zustände für Gesundheit'
    ]
  }
];

export default function ConsciousnessEducationPage() {
  const [selectedState, setSelectedState] = useState<ConsciousnessState | null>(null);
  const [showSources, setShowSources] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const markExerciseComplete = (stateId: string) => {
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      newSet.add(stateId);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Zurück zum Dashboard</span>
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">              <div className="bg-white/20 p-4 rounded-2xl">
                <span className="text-4xl">🧠</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Bewusstseinszustände verstehen
                </h1>
                <p className="text-xl text-white/90">
                  Wissenschaftlich fundiertes Wissen für jedermann verständlich erklärt
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <LightBulbIcon className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Warum ist das wichtig?</h3>
                  <p className="text-white/90 leading-relaxed">
                    Dein Bewusstseinszustand bestimmt, wie du denkst, fühlst und handelst. 
                    Wenn du verstehst, wie dein Gehirn in verschiedenen Zuständen arbeitet, 
                    kannst du bewusst den optimalen Zustand für jede Situation wählen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consciousness States Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {consciousnessStates.map((state, index) => (
            <motion.div
              key={state.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedState(state)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{state.name}</h3>
                  <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {state.brainwaveFrequency}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{state.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Hauptmerkmale:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {state.characteristics.slice(0, 2).map((char, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircleIcon className="w-4 h-4 text-green-600" />
                          <span>{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium">
                      <BookOpenIcon className="w-4 h-4" />
                      <span>Mehr erfahren & Übung ausprobieren</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scientific Sources Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowSources(!showSources)}
            className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg transition-colors"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span>Wissenschaftliche Quellen anzeigen</span>
          </button>
        </div>

        {/* Sources Section */}
        <AnimatePresence>
          {showSources && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Wissenschaftliche Grundlagen
              </h3>
              <div className="space-y-3">
                {consciousnessFactsWithSources.map((fact, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <p className="text-gray-800 mb-2">{fact.fact}</p>
                    <div className="text-sm text-gray-600">
                      <strong>Quellen:</strong>
                      {fact.sources.map((source, idx) => (
                        <div key={idx} className="ml-2 mt-1">
                          • {formatSourceForDisplay(source)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detailed State Modal */}
      <AnimatePresence>
        {selectedState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedState(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedState.name}</h2>
                  <button
                    onClick={() => setSelectedState(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="sr-only">Schließen</span>
                    ✕
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Vorteile</h3>
                    <ul className="space-y-2 mb-6">
                      {selectedState.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <HeartIcon className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold mb-3">Wie erreichen?</h3>
                    <ul className="space-y-2 mb-6">
                      {selectedState.howToAchieve.map((method, idx) => (                        <li key={idx} className="flex items-center space-x-2">
                          <span className="text-blue-600">✨</span>
                          <span className="text-gray-700">{method}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Praktische Übung</h3>
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-blue-900">{selectedState.practicalExercise.title}</h4>
                        <span className="text-sm text-blue-700">{selectedState.practicalExercise.duration}</span>
                      </div>
                      <ol className="space-y-2">
                        {selectedState.practicalExercise.steps.map((step, idx) => (
                          <li key={idx} className="text-blue-800 text-sm">
                            {idx + 1}. {step}
                          </li>
                        ))}
                      </ol>
                      <button
                        onClick={() => markExerciseComplete(selectedState.id)}
                        className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          completedExercises.has(selectedState.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {completedExercises.has(selectedState.id) ? '✓ Übung abgeschlossen' : 'Übung als erledigt markieren'}
                      </button>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                        <QuestionMarkCircleIcon className="w-4 h-4 mr-2" />
                        Häufige Missverständnisse
                      </h4>
                      <ul className="space-y-1">
                        {selectedState.commonMisconceptions.map((misconception, idx) => (
                          <li key={idx} className="text-yellow-800 text-sm">
                            • {misconception}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600">
                    <strong>Wissenschaftlicher Hintergrund:</strong> {selectedState.scientificEvidence}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
