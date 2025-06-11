'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  SparklesIcon,
  EyeIcon,
  MoonIcon,
  SunIcon,
  CloudIcon,
  StarIcon,
  MapIcon,
  LightBulbIcon,
  HeartIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  BookOpenIcon,
  PlayIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface AstralTechnique {
  id: string;
  name: string;
  difficulty: 'anfänger' | 'fortgeschritten' | 'experte';
  duration: string;
  description: string;
  preparation: string[];
  steps: string[];
  tips: string[];
  warnings: string[];
  benefits: string[];
  scientificBasis?: string;
  category: 'projection' | 'meditation' | 'lucid_dreaming' | 'energy_work';
}

interface SoulJourneyExperience {
  id: string;
  title: string;
  type: 'guided_meditation' | 'visualization' | 'inner_journey' | 'past_life';
  duration: string;
  description: string;
  intention: string;
  journey_script: string[];
  integration_questions: string[];
  safety_notes: string[];
  frequency: string;
}

interface ConsciousnessMap {
  id: string;
  level: string;
  name: string;
  description: string;
  characteristics: string[];
  access_methods: string[];
  experiences: string[];
  integration_tips: string[];
  color: string;
  depth: number;
}

const astralTechniques: AstralTechnique[] = [
  {
    id: 'rope-technique',
    name: 'Seil-Technik (Rope Technique)',
    difficulty: 'anfänger',
    duration: '30-60 Minuten',
    description: 'Eine der bekanntesten Techniken für Astralprojektion, entwickelt von Robert Bruce',
    preparation: [
      'Entspannten, ruhigen Raum schaffen',
      'Bequeme Kleidung tragen',
      'Keine schweren Mahlzeiten 2-3 Stunden vorher',
      'Entspannungsmusik oder Stille wählen',
      'Handy auf stumm schalten'
    ],
    steps: [
      'Lege dich entspannt auf den Rücken',
      'Führe eine progressive Muskelentspannung durch',
      'Konzentriere dich auf deinen Atem, bis er natürlich wird',
      'Visualisiere ein unsichtbares Seil über dir hängend',
      'Stelle dir vor, wie deine astralen Hände nach dem Seil greifen',
      'Ziehe dich mental am Seil hoch, ohne den physischen Körper zu bewegen',
      'Spüre das Gefühl des Aufsteigens und der Trennung',
      'Wenn Vibrationen auftreten, bleibe ruhig und konzentriert',
      'Lass die Trennung natürlich geschehen'
    ],
    tips: [
      'Übe regelmäßig zur gleichen Tageszeit',
      'Sei geduldig - es kann Wochen oder Monate dauern',
      'Führe ein Traum- und Projektions-Tagebuch',
      'Verwende Affirmationen vor der Praxis',
      'Experimentiere mit verschiedenen Visualisierungen'
    ],
    warnings: [
      'Nie unter Drogen- oder Alkoholeinfluss praktizieren',
      'Bei Herzproblemen vorher ärztlich abklären',
      'Nicht praktizieren wenn emotional instabil',
      'Immer mit Schutz-Intention beginnen'
    ],
    benefits: [
      'Erweiterte Bewusstseinszustände',
      'Spirituelle Entwicklung',
      'Überwindung der Todesangst',
      'Zugang zu höheren Weisheitsebenen',
      'Verbesserte Traumkontrolle'
    ],
    scientificBasis: 'Neurowissenschaftlich als out-of-body experience (OBE) erforscht. Temporoparietaler Übergang zeigt Aktivität bei OBE-Erfahrungen.',
    category: 'projection'
  },
  {
    id: 'wake-back-to-bed',
    name: 'Wake-Back-to-Bed (WBTB)',
    difficulty: 'anfänger',
    duration: '6-8 Stunden Schlaf + 30-60 Min',
    description: 'Technik die den natürlichen REM-Schlaf nutzt für bewusste Out-of-Body Erfahrungen',
    preparation: [
      'Normale Schlafenszeit einhalten',
      'Wecker 4-6 Stunden nach dem Einschlafen stellen',
      'Traumtagebuch neben dem Bett bereithalten',
      'Intention vor dem Schlafen setzen'
    ],
    steps: [
      'Schlafe normal 4-6 Stunden',
      'Wache auf und bleibe 15-30 Minuten wach',
      'Denke über Astralprojektion nach, ohne dich aufzuregen',
      'Lege dich wieder hin mit der starken Intention zu projizieren',
      'Entspanne dich und lass den Körper einschlafen',
      'Halte das Bewusstsein wach während der Körper schläft',
      'Nutze die natürliche REM-Phase für die Projektion'
    ],
    tips: [
      'Nicht zu lange wach bleiben (max. 30 Min)',
      'Verwende diese Zeit für leichte Meditation',
      'Lies über Astralprojektion während der Wachphase',
      'Visualisiere erfolgreiche Projektionen'
    ],
    warnings: [
      'Kann den normalen Schlafrhythmus stören',
      'Nicht mehr als 2-3x pro Woche praktizieren',
      'Bei Schlafstörungen pausieren'
    ],
    benefits: [
      'Nutzt natürliche REM-Zyklen',
      'Höhere Erfolgsrate',
      'Weniger körperliche Anstrengung',
      'Natürlicherer Übergang'
    ],
    category: 'projection'
  },
  {
    id: 'chakra-projection',
    name: 'Chakra-Aktivierung für Astralreisen',
    difficulty: 'fortgeschritten',
    duration: '45-90 Minuten',
    description: 'Nutzt die Energie der Chakras für bewusste Seelenreisen',
    preparation: [
      'Grundkenntnisse über das Chakra-System',
      'Erfahrung in Energiearbeit',
      'Ruhige, energetisch gereinigte Umgebung',
      'Kristalle oder ätherische Öle optional'
    ],
    steps: [
      'Aktiviere systematisch alle 7 Hauptchakras',
      'Beginne mit dem Wurzelchakra und arbeite dich nach oben',
      'Visualisiere jedes Chakra in seiner Farbe und spüre seine Energie',
      'Konzentriere dich besonders auf das Stirnchakra (3. Auge)',
      'Aktiviere das Kronenchakra für spirituelle Verbindung',
      'Lasse die vereinte Chakra-Energie deinen Astralkörper aktivieren',
      'Verwende die Energie für den Projektionsvorgang'
    ],
    tips: [
      'Arbeite regelmäßig mit deinen Chakras',
      'Nutze passende Mantras für jedes Chakra',
      'Spüre die Energieverschiebungen bewusst',
      'Dokumentiere energetische Erfahrungen'
    ],
    warnings: [
      'Kann intensive Energieerfahrungen auslösen',
      'Bei Energieblockaden professionelle Hilfe suchen',
      'Nicht forcieren - Energie muss frei fließen'
    ],
    benefits: [
      'Ganzheitlicher energetischer Ansatz',
      'Spirituelle Entwicklung',
      'Erhöhte Sensitivität',
      'Bessere Energiekontrolle'
    ],
    category: 'energy_work'
  }
];

const soulJourneyExperiences: SoulJourneyExperience[] = [
  {
    id: 'inner-child-healing',
    title: 'Heilungsreise zum Inneren Kind',
    type: 'guided_meditation',
    duration: '45-60 Minuten',
    description: 'Eine tiefe Reise zur Heilung alter Wunden und zur Wiederbelebung der kindlichen Freude',
    intention: 'Heilung, Integration und Liebe für das innere Kind',
    journey_script: [
      'Stelle dir vor, du gehst durch einen wunderschönen Garten...',
      'Du findest einen sicheren, gemütlichen Ort...',
      'Dort wartet ein Kind - dein jüngeres Selbst...',
      'Nähere dich mit bedingungsloser Liebe...',
      'Frage das Kind, was es braucht...',
      'Höre zu ohne zu urteilen...',
      'Biete Trost, Verständnis und Heilung an...',
      'Integriere die Geschenke des Kindes in dein erwachsenes Selbst...',
      'Verspreche regelmäßige Besuche...',
      'Kehre langsam in das Hier und Jetzt zurück...'
    ],
    integration_questions: [
      'Welche Emotionen sind während der Reise aufgekommen?',
      'Was hat dein inneres Kind dir mitgeteilt?',
      'Welche Eigenschaften des Kindes möchtest du mehr leben?',
      'Welche Heilung ist geschehen?',
      'Wie kannst du diese Erfahrung in deinen Alltag integrieren?'
    ],
    safety_notes: [
      'Sorge für einen sicheren, ungestörten Raum',
      'Habe Unterstützung bereit falls intensive Emotionen aufkommen',
      'Gehe sanft mit dir um - erzwinge nichts',
      'Suche professionelle Hilfe bei traumatischen Erinnerungen'
    ],
    frequency: 'Monatlich oder bei Bedarf'
  },
  {
    id: 'higher-self-guidance',
    title: 'Kommunikation mit dem Höheren Selbst',
    type: 'inner_journey',
    duration: '30-45 Minuten',
    description: 'Verbindung mit der weisen, höheren Perspektive deines Bewusstseins',
    intention: 'Klarheit, Führung und spirituelle Weisheit erhalten',
    journey_script: [
      'Steige eine Lichtspirale nach oben...',
      'Erreiche einen Raum aus purem Licht...',
      'Spüre die Präsenz deines Höheren Selbst...',
      'Stelle deine wichtigste Frage...',
      'Empfange die Antwort in Form von Bildern, Gefühlen oder Wissen...',
      'Bitte um weitere Führung für deinen Lebensweg...',
      'Empfange Geschenke der Weisheit...',
      'Bedanke dich für die Führung...',
      'Steige langsam die Lichtspirale wieder hinab...'
    ],
    integration_questions: [
      'Welche Führung hast du erhalten?',
      'Wie fühlte sich die Verbindung zu deinem Höheren Selbst an?',
      'Welche praktischen Schritte wurden dir gezeigt?',
      'Welche Geschenke oder Einsichten hast du erhalten?',
      'Wie kannst du diese Weisheit in deinem Leben umsetzen?'
    ],
    safety_notes: [
      'Vertraue deiner inneren Weisheit',
      'Unterscheide zwischen Ego-Stimme und höherer Führung',
      'Teste empfangene Führung mit deinem Herzen',
      'Integriere Erkenntnisse schrittweise'
    ],
    frequency: 'Wöchentlich oder bei wichtigen Entscheidungen'
  }
];

const consciousnessMaps: ConsciousnessMap[] = [
  {
    id: 'physical-plane',
    level: '1',
    name: 'Physische Ebene',
    description: 'Die materielle Welt der fünf Sinne',
    characteristics: [
      'Dichte Materie und physische Gesetze',
      'Zeitlineare Erfahrung',
      'Begrenzte Sinneswahrnehmung',
      'Raum-Zeit Beschränkungen'
    ],
    access_methods: [
      'Normale Wachbewusstsein',
      'Körperliche Aktivitäten',
      'Sinnliche Erfahrungen'
    ],
    experiences: [
      'Alltägliches Leben',
      'Körperliche Empfindungen',
      'Materielle Interaktionen'
    ],
    integration_tips: [
      'Achtsame Präsenz im Körper',
      'Wertschätzung für physische Erfahrungen',
      'Erdung und Zentrierung'
    ],
    color: 'red',
    depth: 1
  },
  {
    id: 'etheric-plane',
    level: '2',
    name: 'Ätherische Ebene',
    description: 'Die Energieebene des physischen Körpers',
    characteristics: [
      'Energie- und Vitalitätsfelder',
      'Chakras und Meridiane',
      'Aura und bioelektrische Felder',
      'Emotionale Energien'
    ],
    access_methods: [
      'Energiearbeit und Heilung',
      'Breathwork und Pranayama',
      'Tai Chi und Qigong',
      'Reiki und therapeutische Berührung'
    ],
    experiences: [
      'Energie spüren und lenken',
      'Aura-Wahrnehmung',
      'Emotionale Heilung',
      'Vitalitätssteigerung'
    ],
    integration_tips: [
      'Regelmäßige Energiearbeit',
      'Chakra-Balancing',
      'Emotionale Hygiene',
      'Energetische Abgrenzung'
    ],
    color: 'orange',
    depth: 2
  },
  {
    id: 'astral-plane',
    level: '3',
    name: 'Astralebene',
    description: 'Die Ebene der Emotionen und niedrigeren mentalen Aktivitäten',
    characteristics: [
      'Gedankenformen und Emotionen',
      'Traumrealitäten',
      'Kollektive unbewusste Inhalte',
      'Verstorbene Seelen und Geistführer'
    ],
    access_methods: [
      'Astralprojektion',
      'Luzides Träumen',
      'Tiefe Meditation',
      'Schamanische Reisen'
    ],
    experiences: [
      'Out-of-Body Erfahrungen',
      'Begegnungen mit Geistführern',
      'Zugang zu aktueller Leben-Informationen',
      'Emotionale Heilungsarbeit'
    ],
    integration_tips: [
      'Traumtagebuch führen',
      'Regelmäßige Meditation',
      'Emotionale Verarbeitung',
      'Spirituelle Praxis'
    ],
    color: 'yellow',
    depth: 3
  },
  {
    id: 'mental-plane',
    level: '4',
    name: 'Mentalebene',
    description: 'Die Ebene des höheren Denkens und spiritueller Erkenntnisse',
    characteristics: [
      'Reine Gedanken und Ideen',
      'Archetypische Energien',
      'Universelle Prinzipien',
      'Spirituelle Lehrer und Meister'
    ],
    access_methods: [
      'Kontemplation und Studium',
      'Philosophische Meditation',
      'Künstlerische Inspiration',
      'Wissenschaftliche Intuition'
    ],
    experiences: [
      'Universelle Wahrheiten verstehen',
      'Kontakt mit spirituellen Lehrern',
      'Kreative Durchbrüche',
      'Philosophische Erkenntnisse'
    ],
    integration_tips: [
      'Spirituelles Studium',
      'Kreative Ausdrucksformen',
      'Philosophische Reflexion',
      'Weisheit in Handlung umsetzen'
    ],
    color: 'green',
    depth: 4
  },
  {
    id: 'causal-plane',
    level: '5',
    name: 'Kausalebene',
    description: 'Die Ebene der Seele und höheren spirituellen Realitäten',
    characteristics: [
      'Akasha-Chronik',
      'Karma und Seelenzweck',
      'Höheres Selbst',
      'Spirituelle Hierarchien'
    ],
    access_methods: [
      'Tiefe spirituelle Praxis',
      'Samadhi-Zustände',
      'Einheitserfahrungen',
      'Reine Bewusstseinsmeditation'
    ],
    experiences: [
      'Zugang zu vergangenen Leben',
      'Karmic Verstehen',
      'Seelenzielerkennung',
      'Kosmisches Bewusstsein'
    ],
    integration_tips: [
      'Dharma leben',
      'Selbstloser Dienst',
      'Spirituelle Hingabe',
      'Universelle Liebe praktizieren'
    ],
    color: 'blue',
    depth: 5
  },
  {
    id: 'cosmic-consciousness',
    level: '6',
    name: 'Kosmisches Bewusstsein',
    description: 'Die Ebene der Einheit mit allem was ist',
    characteristics: [
      'Absolute Einheit',
      'Bedingungslose Liebe',
      'Unendliches Bewusstsein',
      'Göttliche Präsenz'
    ],
    access_methods: [
      'Reine Hingabe',
      'Ego-Auflösung',
      'Mystische Erfahrungen',
      'Göttliche Gnade'
    ],
    experiences: [
      'Einheitsbewusstsein',
      'Göttliche Liebe',
      'Absolute Erkenntnis',
      'Zeitlose Existenz'
    ],
    integration_tips: [
      'Demut und Dankbarkeit',
      'Universeller Dienst',
      'Bedingungslose Liebe',
      'Göttliches Handeln'
    ],
    color: 'indigo',
    depth: 6
  }
];

export default function AstralSoulJourneyPage() {
  const [activeTab, setActiveTab] = useState<'techniques' | 'journeys' | 'consciousness-map' | 'safety'>('techniques');
  const [selectedTechnique, setSelectedTechnique] = useState<AstralTechnique | null>(null);
  const [selectedJourney, setSelectedJourney] = useState<SoulJourneyExperience | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<ConsciousnessMap | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeftIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Astral & Soul Journey Guide
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Sichere Techniken für Out-of-Body Erfahrungen und Seelenreisen
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="text-2xl">✨</div>
            <div className="text-2xl">🌟</div>
            <div className="text-2xl">🔮</div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">
                Wichtige Sicherheitshinweise
              </h3>
              <p className="text-amber-700 text-sm mb-2">
                Astralprojektion und Seelenreisen sind fortgeschrittene spirituelle Praktiken. 
                Bitte beachte die Sicherheitshinweise und beginne langsam mit grundlegenden Techniken.
              </p>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• Nie unter Einfluss von Substanzen praktizieren</li>
                <li>• Bei psychischen Erkrankungen vorher professionelle Beratung</li>
                <li>• Immer mit Schutz-Intention beginnen</li>
                <li>• Bei negativen Erfahrungen sofort abbrechen</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-xl p-1 mb-8 shadow-lg">
          {[
            { id: 'techniques', label: 'Astral-Techniken', icon: SparklesIcon },
            { id: 'journeys', label: 'Seelenreisen', icon: HeartIcon },
            { id: 'consciousness-map', label: 'Bewusstseins-Karte', icon: MapIcon },
            { id: 'safety', label: 'Sicherheit & Schutz', icon: ShieldCheckIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Astral-Techniken Tab */}
        {activeTab === 'techniques' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              ✨ Astralprojektion Techniken
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {astralTechniques.map((technique) => (
                <motion.div
                  key={technique.id}
                  onClick={() => setSelectedTechnique(selectedTechnique?.id === technique.id ? null : technique)}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {technique.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      technique.difficulty === 'anfänger' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : technique.difficulty === 'fortgeschritten'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {technique.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {technique.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-indigo-600 dark:text-indigo-400">
                      🔮 {technique.category.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-500">
                      ⏱️ {technique.duration}
                    </span>
                  </div>

                  <AnimatePresence>
                    {selectedTechnique?.id === technique.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
                      >
                        {/* Vorbereitung */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            🛡️ Vorbereitung:
                          </h4>
                          <ul className="space-y-2">
                            {technique.preparation.map((prep, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">{prep}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Schritte */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            📋 Schritt-für-Schritt Anleitung:
                          </h4>
                          <ol className="space-y-3">
                            {technique.steps.map((step, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <span className="w-6 h-6 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Tipps */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            💡 Profi-Tipps:
                          </h4>
                          <ul className="space-y-2">
                            {technique.tips.map((tip, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <LightBulbIcon className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Warnungen */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            ⚠️ Wichtige Warnungen:
                          </h4>
                          <ul className="space-y-2">
                            {technique.warnings.map((warning, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-red-600 dark:text-red-400">{warning}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Benefits */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            🌟 Potentielle Vorteile:
                          </h4>
                          <ul className="space-y-2">
                            {technique.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <StarIcon className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {technique.scientificBasis && (
                          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                            <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                              🧬 Wissenschaftliche Basis:
                            </h5>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              {technique.scientificBasis}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Seelenreisen Tab */}
        {activeTab === 'journeys' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              💖 Geführte Seelenreisen
            </h2>

            <div className="space-y-6">
              {soulJourneyExperiences.map((journey) => (
                <motion.div
                  key={journey.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => setSelectedJourney(selectedJourney?.id === journey.id ? null : journey)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {journey.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full text-sm">
                          {journey.type.replace('_', ' ')}
                        </span>
                        <ClockIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">{journey.duration}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {journey.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        🎯 Intention:
                      </h4>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {journey.intention}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedJourney?.id === journey.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 dark:border-gray-600"
                      >
                        {/* Journey Script */}
                        <div className="p-6 bg-purple-50 dark:bg-purple-900">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            🎭 Reise-Skript:
                          </h4>
                          <div className="space-y-3">
                            {journey.journey_script.map((step, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <span className="w-6 h-6 bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                                  {step}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Integration Questions */}
                        <div className="p-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            🤔 Integrations-Fragen:
                          </h4>
                          <ul className="space-y-2">
                            {journey.integration_questions.map((question, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-purple-500">•</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">{question}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Safety Notes */}
                        <div className="p-6 bg-amber-50 dark:bg-amber-900">
                          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">
                            🛡️ Sicherheitshinweise:
                          </h4>
                          <ul className="space-y-2">
                            {journey.safety_notes.map((note, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <ShieldCheckIcon className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-amber-700 dark:text-amber-300">{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Empfohlene Häufigkeit: {journey.frequency}
                            </span>
                            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                              <PlayIcon className="h-4 w-4 inline mr-2" />
                              Reise beginnen
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Bewusstseins-Karte Tab */}
        {activeTab === 'consciousness-map' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🗺️ Karte der Bewusstseinsebenen
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Diese Karte zeigt verschiedene Bewusstseinsebenen, die bei Astralreisen und spirituellen Praktiken 
                erfahren werden können. Jede Ebene hat ihre eigenen Charakteristika und Zugriffsmethoden.
              </p>
            </div>

            <div className="space-y-4">
              {consciousnessMaps.map((level, index) => (
                <motion.div
                  key={level.id}
                  className={`bg-gradient-to-r from-${level.color}-50 to-white dark:from-${level.color}-900 dark:to-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedLevel(selectedLevel?.id === level.id ? null : level)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-${level.color}-200 dark:bg-${level.color}-800 rounded-full flex items-center justify-center font-bold text-${level.color}-800 dark:text-${level.color}-200`}>
                        {level.level}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {level.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {level.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedLevel?.id === level.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                              🎭 Charakteristika:
                            </h4>
                            <ul className="space-y-1">
                              {level.characteristics.map((char, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                                  • {char}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                              🔑 Zugriffsmethoden:
                            </h4>
                            <ul className="space-y-1">
                              {level.access_methods.map((method, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                                  • {method}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                              ✨ Typische Erfahrungen:
                            </h4>
                            <ul className="space-y-1">
                              {level.experiences.map((exp, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                                  • {exp}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                              🧘 Integration:
                            </h4>
                            <ul className="space-y-1">
                              {level.integration_tips.map((tip, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                                  • {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Sicherheit & Schutz Tab */}
        {activeTab === 'safety' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🛡️ Sicherheit & Schutz bei spirituellen Praktiken
            </h2>

            {/* Grundlegende Sicherheitsregeln */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                📋 Grundlegende Sicherheitsregeln
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                    ✅ Do's - Das solltest du tun:
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Beginne immer mit einer Schutz-Intention',
                      'Praktiziere in einer sicheren, ruhigen Umgebung',
                      'Halte ein spirituelles Tagebuch',
                      'Beginne mit einfachen Techniken',
                      'Höre auf deinen Körper und deine Intuition',
                      'Suche dir einen erfahrenen Mentor',
                      'Informiere dich gründlich über die Praktiken',
                      'Baue langsam und beständig auf'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">
                    ❌ Don'ts - Das solltest du vermeiden:
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Nie unter Drogen- oder Alkoholeinfluss praktizieren',
                      'Nicht bei psychischen Instabilitäten',
                      'Vermeide erzwungene oder forcierte Erfahrungen',
                      'Praktiziere nicht bei Müdigkeit oder Krankheit',
                      'Keine Praktiken ohne ausreichende Vorbereitung',
                      'Vermeide gefährliche oder unseriöse Quellen',
                      'Nicht übertreiben - Pausen sind wichtig',
                      'Ignoriere keine Warnzeichen'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Schutzrituale */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                🔮 Schutzrituale und -techniken
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'Weißes Licht Visualisation',
                    description: 'Stelle dir vor, wie du von einem hellen, weißen Licht umhüllt wirst, das alle negativen Energien abwehrt.',
                    steps: ['Entspanne dich und atme tief', 'Visualisiere ein strahlendes weißes Licht über dir', 'Lass das Licht deinen ganzen Körper umhüllen', 'Setze die Intention für Schutz und positive Erfahrungen']
                  },
                  {
                    title: 'Energetische Grenzen setzen',
                    description: 'Erschaffe bewusst energetische Grenzen um deinen physischen und astralen Körper.',
                    steps: ['Spüre deine natürlichen energetischen Grenzen', 'Stärke sie durch bewusste Intention', 'Visualisiere eine schützende Barriere', 'Bekräftige: "Nur Liebe und Licht dürfen passieren"']
                  },
                  {
                    title: 'Anrufung spiritueller Hilfe',
                    description: 'Bitte deine Geistführer, Schutzengel oder höhere Wesen um Begleitung und Schutz.',
                    steps: ['Rufe deine spirituellen Helfer', 'Bitte um Schutz und Führung', 'Spüre ihre Präsenz', 'Bedanke dich für ihre Unterstützung']
                  }
                ].map((ritual, index) => (
                  <div key={index} className="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-6">
                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                      {ritual.title}
                    </h4>
                    <p className="text-indigo-700 dark:text-indigo-300 text-sm mb-4">
                      {ritual.description}
                    </p>
                    <div className="space-y-2">
                      {ritual.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start space-x-2">
                          <span className="w-5 h-5 bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {stepIndex + 1}
                          </span>
                          <span className="text-sm text-indigo-700 dark:text-indigo-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notfall-Protokoll */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-red-800 mb-6">
                🚨 Notfall-Protokoll bei negativen Erfahrungen
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Sofortige Maßnahmen:</h4>
                  <ol className="space-y-2">
                    {[
                      'Ruhe bewahren und tief atmen',
                      'Sofort alle spirituellen Praktiken beenden',
                      'Körperliche Erdung: Füße fest auf den Boden, kaltes Wasser trinken',
                      'Licht anmachen und normale Aktivitäten aufnehmen',
                      'Bei Bedarf jemanden anrufen oder professionelle Hilfe suchen'
                    ].map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="w-6 h-6 bg-red-200 text-red-800 rounded-full text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-sm text-red-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="mt-6 p-4 bg-red-100 rounded-lg">
                  <h5 className="font-semibold text-red-800 mb-2">Wichtige Notfall-Kontakte:</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>📞 Telefonseelsorge: 0800 111 0 111 (kostenlos, 24/7)</li>
                    <li>🚑 Notruf: 112 (bei akuter Gefahr)</li>
                    <li>🏥 Nächste psychiatrische Notaufnahme</li>
                    <li>👥 Vertrauensperson oder spiritueller Mentor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
