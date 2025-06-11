'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  PhoneIcon,
  UserGroupIcon,
  BookOpenIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  ClockIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

interface MentalHealthCondition {
  id: string;
  name: string;
  icon: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  myths: Array<{ myth: string; reality: string }>;
  resources: Array<{ title: string; type: 'hotline' | 'website' | 'app' | 'book'; link?: string; phone?: string }>;
  selfHelpTips: string[];
  whenToSeekHelp: string[];
}

const mentalHealthConditions: MentalHealthCondition[] = [
  {
    id: 'addiction',
    name: 'Sucht & Abhängigkeit',
    icon: '🔗',
    description: 'Sucht ist eine komplexe Erkrankung des Gehirns, die durch wiederholten Substanzmissbrauch oder zwanghaftes Verhalten gekennzeichnet ist.',
    symptoms: [
      'Kontrollverlust über den Konsum',
      'Fortgesetzter Gebrauch trotz negativer Konsequenzen',
      'Starkes Verlangen (Craving)',
      'Vernachlässigung von Verantwortlichkeiten',
      'Toleranzentwicklung (höhere Mengen nötig)',
      'Entzugserscheinungen bei Verzicht',
      'Sozialer Rückzug',
      'Lügen über den Konsum'
    ],
    causes: [
      'Genetische Veranlagung (40-60% des Risikos)',
      'Umweltfaktoren (Familie, Peer-Group)',
      'Früher Erstkonsum',
      'Traumatische Erfahrungen',
      'Andere psychische Erkrankungen',
      'Stress und Lebenskrisen',
      'Verfügbarkeit der Substanz',
      'Neurobiologische Veränderungen'
    ],
    treatments: [
      'Entgiftung unter medizinischer Aufsicht',
      'Stationäre oder ambulante Therapie',
      'Kognitive Verhaltenstherapie',
      'Substitutionstherapie (bei Opioidabhängigkeit)',
      'Selbsthilfegruppen (AA, NA, etc.)',
      'Medikamentöse Unterstützung',
      'Familientherapie',
      'Rückfallprävention'
    ],
    myths: [
      {
        myth: 'Sucht ist ein Charakterschwäche oder mangelnde Willenskraft',
        reality: 'Sucht ist eine anerkannte Krankheit mit neurobiologischen Grundlagen, nicht ein moralisches Versagen'
      },
      {
        myth: 'Süchtige müssen erst ganz unten ankommen, bevor sie Hilfe annehmen',
        reality: 'Frühe Intervention ist effektiver - jeder Zeitpunkt ist richtig für eine Behandlung'
      },
      {
        myth: 'Einmal süchtig, immer süchtig',
        reality: 'Sucht ist behandelbar und viele Menschen erreichen langfristige Abstinenz'
      },
      {
        myth: 'Rückfälle bedeuten, dass die Behandlung versagt hat',
        reality: 'Rückfälle sind oft Teil des Genesungsprozesses und bedeuten nicht das Ende der Behandlung'
      }
    ],
    resources: [
      { title: 'Sucht & Drogen Hotline', type: 'hotline', phone: '01806-313031' },
      { title: 'Deutsche Hauptstelle für Suchtfragen', type: 'website', link: 'https://www.dhs.de' },
      { title: 'Suchtberatung Online', type: 'website', link: 'https://www.suchtberatung-online.de' },
      { title: 'Nemo App - Suchtprävention', type: 'app' },
      { title: '"Dry" von Augusten Burroughs', type: 'book' }
    ],
    selfHelpTips: [
      'Erkenne Trigger und entwickle Vermeidungsstrategien',
      'Baue ein starkes soziales Unterstützungsnetzwerk auf',
      'Entwickle gesunde Bewältigungsstrategien (Sport, Meditation)',
      'Führe ein Tagebuch über Gefühle und Situationen',
      'Setze dir realistische, kurzfristige Ziele',
      'Belohne dich für abstinente Tage',
      'Informiere dich über deine Sucht',
      'Suche professionelle Hilfe - es ist ein Zeichen von Stärke'
    ],
    whenToSeekHelp: [
      'Du kannst nicht alleine aufhören, obwohl du es willst',
      'Körperliche Entzugserscheinungen treten auf',
      'Beziehungen, Arbeit oder Gesundheit leiden',
      'Du hast Selbstmordgedanken',
      'Du hast bereits erfolglos versucht aufzuhören',
      'Andere machen sich Sorgen um dich'
    ]
  },
  {
    id: 'schizophrenia',
    name: 'Schizophrenie',
    icon: '🧠',
    description: 'Schizophrenie ist eine komplexe psychische Erkrankung, die Wahrnehmung, Denken, Gefühle und Verhalten beeinflusst.',
    symptoms: [
      'Halluzinationen (meist auditive)',
      'Wahnvorstellungen',
      'Desorganisiertes Denken/Sprechen',
      'Abnorme motorische Verhaltensweisen',
      'Verminderte emotionale Ausdrucksfähigkeit',
      'Sozialer Rückzug',
      'Konzentrationsprobleme',
      'Gedächtnisprobleme'
    ],
    causes: [
      'Genetische Faktoren (Vererbung spielt eine Rolle)',
      'Neurobiologische Veränderungen im Gehirn',
      'Neurotransmitter-Ungleichgewicht',
      'Umweltfaktoren (Stress, Trauma)',
      'Drogenkonsum (besonders Cannabis in der Jugend)',
      'Geburtskomplikationen',
      'Virale Infektionen während der Schwangerschaft',
      'Soziale Faktoren'
    ],
    treatments: [
      'Antipsychotische Medikamente',
      'Psychotherapie (kognitive Verhaltenstherapie)',
      'Familientherapie und -edukation',
      'Soziales Kompetenztraining',
      'Berufliche Rehabilitation',
      'Wohnbetreuung',
      'Krisenintervention',
      'Langzeit-Betreuung und -unterstützung'
    ],
    myths: [
      {
        myth: 'Menschen mit Schizophrenie sind gewalttätig und gefährlich',
        reality: 'Die meisten Menschen mit Schizophrenie sind nicht gewalttätig. Sie sind eher Opfer als Täter von Gewalt'
      },
      {
        myth: 'Schizophrenie bedeutet multiple Persönlichkeiten',
        reality: 'Das ist ein weit verbreiteter Irrtum. Multiple Persönlichkeitsstörung ist eine andere Erkrankung'
      },
      {
        myth: 'Schizophrenie ist unheilbar',
        reality: 'Mit der richtigen Behandlung können viele Menschen mit Schizophrenie ein erfülltes Leben führen'
      },
      {
        myth: 'Schizophrenie entsteht durch schlechte Erziehung',
        reality: 'Schizophrenie ist eine neurobiologische Erkrankung, nicht das Ergebnis von Erziehungsfehlern'
      }
    ],
    resources: [
      { title: 'Psychiatrische Notfallnummer', type: 'hotline', phone: '112 oder örtliche Psychiatrie' },
      { title: 'Bundesverband der Angehörigen psychisch Kranker', type: 'website', link: 'https://www.bapk.de' },
      { title: 'Deutsche Gesellschaft für Psychiatrie', type: 'website', link: 'https://www.dgppn.de' },
      { title: 'DGBS - Bipolar und Schizophrenie', type: 'website', link: 'https://www.dgbs.de' },
      { title: '"Das Eden-Projekt" von Elyn Saks', type: 'book' }
    ],
    selfHelpTips: [
      'Nimm Medikamente regelmäßig und zuverlässig',
      'Erkenne frühe Warnzeichen einer Episode',
      'Baue eine stabile Tagesroutine auf',
      'Vermeide Alkohol und Drogen',
      'Pflege soziale Kontakte',
      'Reduziere Stress durch Entspannungstechniken',
      'Führe ein Stimmungstagebuch',
      'Informiere Vertrauenspersonen über deine Erkrankung'
    ],
    whenToSeekHelp: [
      'Du hörst Stimmen oder siehst Dinge, die andere nicht wahrnehmen',
      'Du hast Wahnvorstellungen oder paranoide Gedanken',
      'Dein Denken ist verwirrt oder unorganisiert',
      'Du ziehst dich stark von Familie und Freunden zurück',
      'Du vernachlässigst deine Körperpflege',
      'Du hast Selbstmord- oder Gewaltgedanken'
    ]
  },
  {
    id: 'depression',
    name: 'Depression',
    icon: '🌧️',
    description: 'Depression ist mehr als nur Traurigkeit - es ist eine ernste psychische Erkrankung, die behandelt werden kann.',
    symptoms: [
      'Anhaltende Traurigkeit oder Leere',
      'Verlust des Interesses an Aktivitäten',
      'Energiemangel und Müdigkeit',
      'Schlafstörungen',
      'Appetitveränderungen',
      'Konzentrationsprobleme',
      'Gefühle von Wertlosigkeit oder Schuld',
      'Selbstmordgedanken'
    ],
    causes: [
      'Genetische Veranlagung',
      'Neurochemische Ungleichgewichte',
      'Traumatische Lebensereignisse',
      'Chronischer Stress',
      'Andere Erkrankungen',
      'Medikamentennebenwirkungen',
      'Jahreszeitliche Faktoren',
      'Hormonelle Veränderungen'
    ],
    treatments: [
      'Psychotherapie (insb. kognitive Verhaltenstherapie)',
      'Antidepressiva',
      'Kombinationsbehandlung',
      'Lichttherapie (bei saisonaler Depression)',
      'Elektrokonvulsionstherapie (bei schweren Fällen)',
      'Sport- und Bewegungstherapie',
      'Achtsamkeitsbasierte Therapien',
      'Soziale Unterstützung'
    ],
    myths: [
      {
        myth: 'Depression ist nur eine schlechte Phase',
        reality: 'Depression ist eine ernste medizinische Erkrankung, die professionelle Behandlung benötigt'
      },
      {
        myth: 'Man kann sich einfach zusammenreißen',
        reality: 'Depression ist nicht durch Willenskraft allein überwindbar - es ist eine Krankheit'
      },
      {
        myth: 'Antidepressiva machen süchtig',
        reality: 'Antidepressiva machen nicht süchtig, können aber Absetzerscheinungen haben'
      },
      {
        myth: 'Therapie hilft nur schwachen Menschen',
        reality: 'Hilfe zu suchen ist ein Zeichen von Stärke und Selbstfürsorge'
      }
    ],
    resources: [
      { title: 'Telefonseelsorge', type: 'hotline', phone: '0800-111 0 111 oder 0800-111 0 222' },
      { title: 'Nummer gegen Kummer', type: 'hotline', phone: '116 123' },
      { title: 'Deutsche Depressionshilfe', type: 'website', link: 'https://www.deutsche-depressionshilfe.de' },
      { title: 'Mood Meter App', type: 'app' },
      { title: '"Feeling Good" von David Burns', type: 'book' }
    ],
    selfHelpTips: [
      'Etabliere eine regelmäßige Tagesroutine',
      'Sorge für ausreichend Schlaf',
      'Bewege dich regelmäßig, auch wenn es schwerfällt',
      'Iss gesund und regelmäßig',
      'Vermeide Alkohol und Drogen',
      'Pflege soziale Kontakte',
      'Praktiziere Achtsamkeit oder Meditation',
      'Setze dir kleine, erreichbare Ziele'
    ],
    whenToSeekHelp: [
      'Symptome halten länger als 2 Wochen an',
      'Du hast Selbstmordgedanken',
      'Du kannst alltägliche Aktivitäten nicht mehr bewältigen',
      'Du verwendest Alkohol oder Drogen zur Bewältigung',
      'Familie oder Freunde äußern Bedenken',
      'Du fühlst dich hoffnungslos oder hilflos'
    ]
  }
];

const emergencyContacts = [
  { name: 'Polizei/Notarzt', number: '112', description: 'Bei akuter Lebensgefahr' },
  { name: 'Telefonseelsorge', number: '0800-111 0 111', description: '24/7 kostenlos und anonym' },
  { name: 'Nummer gegen Kummer', number: '116 123', description: 'Für Erwachsene in Krisen' },
  { name: 'Kinder- und Jugendtelefon', number: '116 111', description: 'Für Kinder und Jugendliche' },
  { name: 'Sucht & Drogen Hotline', number: '01806-313031', description: 'Suchtberatung' }
];

export default function MentalHealthPage() {
  const [selectedCondition, setSelectedCondition] = useState<MentalHealthCondition | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'symptoms' | 'treatment' | 'resources'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                🧠 Mental Health & Sucht-Aufklärung
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Fachlich fundierte Informationen und Unterstützung
              </p>
            </div>
          </div>
        </motion.div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            <h2 className="text-lg font-bold text-red-900 dark:text-red-100">
              Notfall-Kontakte
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <PhoneIcon className="w-4 h-4 text-red-600" />
                  <span className="font-bold text-red-600">{contact.number}</span>
                </div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  {contact.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {contact.description}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {!selectedCondition ? (
          /* Condition Overview */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mentalHealthConditions.map((condition, index) => (
              <motion.div
                key={condition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCondition(condition)}
                className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="h-32 bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center">
                  <div className="text-6xl">{condition.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {condition.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {condition.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      Mehr erfahren →
                    </span>
                    <InformationCircleIcon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Detailed Condition View */
          <div className="space-y-6">
            {/* Back Button */}
            <button
              onClick={() => setSelectedCondition(null)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Zurück zur Übersicht</span>
            </button>

            {/* Condition Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{selectedCondition.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedCondition.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedCondition.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
            >
              <div className="flex overflow-x-auto">
                {[
                  { id: 'overview', label: 'Übersicht', icon: InformationCircleIcon },
                  { id: 'symptoms', label: 'Symptome', icon: ExclamationTriangleIcon },
                  { id: 'treatment', label: 'Behandlung', icon: HeartIcon },
                  { id: 'resources', label: 'Hilfe & Ressourcen', icon: UserGroupIcon }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-500'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Ursachen
                    </h3>
                    <ul className="space-y-2">
                      {selectedCondition.causes.map((cause, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {cause}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Mythen vs. Realität
                    </h3>
                    <div className="space-y-4">
                      {selectedCondition.myths.slice(0, 2).map((myth, index) => (
                        <div key={index} className="border-l-4 border-red-500 pl-4">
                          <div className="text-sm font-medium text-red-600 mb-1">
                            Mythos: {myth.myth}
                          </div>
                          <div className="text-sm text-green-600">
                            Realität: {myth.reality}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'symptoms' && (
                <motion.div
                  key="symptoms"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                    Symptome und Warnzeichen
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                        Häufige Symptome:
                      </h4>
                      <ul className="space-y-2">
                        {selectedCondition.symptoms.map((symptom, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300 text-sm">
                              {symptom}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                        Wann professionelle Hilfe suchen:
                      </h4>
                      <ul className="space-y-2">
                        {selectedCondition.whenToSeekHelp.map((sign, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <PhoneIcon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300 text-sm">
                              {sign}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'treatment' && (
                <motion.div
                  key="treatment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Professionelle Behandlung
                    </h3>
                    <ul className="space-y-2">
                      {selectedCondition.treatments.map((treatment, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <HeartIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {treatment}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Selbsthilfe-Strategien
                    </h3>
                    <ul className="space-y-2">
                      {selectedCondition.selfHelpTips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <LightBulbIcon className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {tip}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'resources' && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                    Hilfe & Ressourcen
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedCondition.resources.map((resource, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          {resource.type === 'hotline' && <PhoneIcon className="w-4 h-4 text-red-500" />}
                          {resource.type === 'website' && <InformationCircleIcon className="w-4 h-4 text-blue-500" />}
                          {resource.type === 'app' && <AcademicCapIcon className="w-4 h-4 text-green-500" />}
                          {resource.type === 'book' && <BookOpenIcon className="w-4 h-4 text-purple-500" />}
                          <span className="font-medium text-gray-900 dark:text-white text-sm">
                            {resource.title}
                          </span>
                        </div>
                        {resource.phone && (
                          <div className="text-sm text-blue-600 dark:text-blue-400 font-mono">
                            {resource.phone}
                          </div>
                        )}
                        {resource.link && (
                          <a 
                            href={resource.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Website besuchen →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
