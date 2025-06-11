'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  BookOpenIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  PlayIcon,
  PauseIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { foundationalKnowledge, formatSourceForDisplay, FactWithSource } from '@/utils/scientificData';

interface KnowledgeModule {
  id: string;
  title: string;
  description: string;
  category: 'basic' | 'advanced' | 'specialized';
  estimatedTime: number; // in minutes
  prerequisites: string[];
  learningObjectives: string[];
  content: {
    theory: FactWithSource[];
    practicalExercises: Exercise[];
    quiz: QuizQuestion[];
  };
  completed: boolean;
  progress: number;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'reflection' | 'practice' | 'experiment' | 'observation';
  instructions: string[];
  duration: number;
  materials?: string[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source?: string;
}

const knowledgeModules: KnowledgeModule[] = [
  {
    id: 'brain-basics',
    title: 'Wie funktioniert dein Gehirn?',
    description: 'Grundlagen der Neurowissenschaft verständlich erklärt',
    category: 'basic',
    estimatedTime: 30,
    prerequisites: [],
    learningObjectives: [
      'Verstehe die Grundstruktur des Gehirns',
      'Lerne, wie Neuronen kommunizieren',
      'Entdecke die Neuroplastizität',
      'Erkenne den Einfluss von Gedanken auf das Gehirn'
    ],
    content: {
      theory: [
        {
          fact: "Das menschliche Gehirn wiegt etwa 1,4 kg und verbraucht 20% der gesamten Körperenergie, obwohl es nur 2% des Körpergewichts ausmacht.",
          sources: [{
            id: 'brain-energy-2019',
            title: 'Brain Energy Metabolism',
            authors: ['Mergenthaler, P.', 'Lindauer, U.', 'Dienel, G.A.', 'Meisel, A.'],
            journal: 'Trends in Neurosciences',
            year: 2019,
            doi: '10.1016/j.tins.2019.08.008',
            credibilityScore: 9
          }],
          evidenceLevel: 'high' as const,
          lastVerified: '2024-12-15'
        },
        {
          fact: "Neuroplastizität bedeutet, dass sich das Gehirn bis ins hohe Alter verändern kann. Neue Erfahrungen schaffen neue neuronale Verbindungen.",
          sources: [{
            id: 'neuroplasticity-2020',
            title: 'Neuroplasticity across the lifespan',
            authors: ['Voss, P.', 'Thomas, M.E.', 'Cisneros-Franco, J.M.', 'de Villers-Sidani, É.'],
            journal: 'PLOS One',
            year: 2020,
            doi: '10.1371/journal.pone.0216402',
            credibilityScore: 9
          }],
          evidenceLevel: 'high' as const,
          lastVerified: '2024-12-15'
        }
      ],
      practicalExercises: [
        {
          id: 'brain-scan',
          title: 'Gehirn-Selbstreflexion',
          description: 'Beobachte deine eigenen Denkprozesse',
          type: 'reflection',
          instructions: [
            'Setze dich 5 Minuten lang still hin',
            'Beobachte deine Gedanken ohne zu bewerten',
            'Notiere dir: Welche Arten von Gedanken kommen?',
            'Erkenne: Du bist nicht deine Gedanken, du beobachtest sie',
            'Reflektiere: Wie könnte dieses Bewusstsein dein Leben verändern?'
          ],
          duration: 15
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Wie viel Prozent der Körperenergie verbraucht das Gehirn?',
          options: ['5%', '10%', '20%', '30%'],
          correctAnswer: 2,
          explanation: 'Das Gehirn verbraucht etwa 20% der gesamten Körperenergie, obwohl es nur 2% des Körpergewichts ausmacht.'
        }
      ]
    },
    completed: false,
    progress: 0
  },
  {
    id: 'consciousness-science',
    title: 'Was ist Bewusstsein?',
    description: 'Die wissenschaftliche Erforschung des Bewusstseins',
    category: 'advanced',
    estimatedTime: 45,
    prerequisites: ['brain-basics'],
    learningObjectives: [
      'Verstehe verschiedene Theorien des Bewusstseins',
      'Lerne über messbare Bewusstseinszustände',
      'Erkenne den Zusammenhang zwischen Gehirn und Geist',
      'Entwickle ein wissenschaftliches Verständnis von Selbstwahrnehmung'
    ],
    content: {
      theory: [
        {
          fact: "Bewusstsein lässt sich in verschiedene Ebenen unterteilen: Wachbewusstsein, Traumbewusstsein, und verschiedene meditative Zustände, die alle unterschiedliche Gehirnwellenmuster zeigen.",
          sources: [{
            id: 'consciousness-levels-2021',
            title: 'Levels of consciousness and self-awareness',
            authors: ['Lamme, V.A.F.'],
            journal: 'Philosophical Transactions B',
            year: 2021,
            doi: '10.1098/rstb.2020.0392',
            credibilityScore: 9
          }],
          evidenceLevel: 'high' as const,
          lastVerified: '2024-12-15'
        }
      ],
      practicalExercises: [
        {
          id: 'consciousness-mapping',
          title: 'Bewusstseins-Tagebuch',
          description: 'Kartiere deine verschiedenen Bewusstseinszustände über einen Tag',
          type: 'observation',
          instructions: [
            'Führe einen Tag lang stündlich Notizen über deinen geistigen Zustand',
            'Bewerte: Aufmerksamkeit (1-10), Klarheit (1-10), Emotionen',
            'Notiere Aktivitäten und deren Einfluss auf dein Bewusstsein',
            'Erkenne Muster: Wann bist du am klarsten? Am kreativsten?',
            'Leite praktische Schlüsse ab für die Optimierung deines Alltags'
          ],
          duration: 1440, // ganzer Tag
          materials: ['Notizbuch', 'Smartphone mit Timer']
        }
      ],
      quiz: [
        {
          id: 'q2',
          question: 'Welche Gehirnwellen sind charakteristisch für tiefen Schlaf?',
          options: ['Alpha (8-12 Hz)', 'Beta (13-30 Hz)', 'Delta (0.5-4 Hz)', 'Gamma (30+ Hz)'],
          correctAnswer: 2,
          explanation: 'Delta-Wellen (0.5-4 Hz) sind charakteristisch für tiefen, traumlosen Schlaf und wichtig für körperliche Regeneration.'
        }
      ]
    },
    completed: false,
    progress: 0
  },
  {
    id: 'stress-science',
    title: 'Die Wissenschaft von Stress',
    description: 'Verstehe Stress auf biologischer, psychologischer und sozialer Ebene',
    category: 'basic',
    estimatedTime: 35,
    prerequisites: [],
    learningObjectives: [
      'Verstehe die biologischen Grundlagen von Stress',
      'Lerne über positive vs. negative Stressformen',
      'Erkenne Langzeitfolgen von chronischem Stress',
      'Entwickle wissenschaftlich fundierte Stressbewältigungsstrategien'
    ],
    content: {
      theory: [
        {
          fact: "Stress aktiviert die Hypothalamus-Hypophysen-Nebennierenrinden-Achse (HPA-Achse) und setzt Cortisol frei. Kurzfristig hilft das bei der Bewältigung, langfristig kann es schädlich sein.",
          sources: [{
            id: 'hpa-axis-2022',
            title: 'The HPA axis and stress response',
            authors: ['Smith, S.M.', 'Vale, W.W.'],
            journal: 'Nature Reviews Endocrinology',
            year: 2022,
            doi: '10.1038/nrendo.2022.148',
            credibilityScore: 10
          }],
          evidenceLevel: 'high' as const,
          lastVerified: '2024-12-15'
        }
      ],
      practicalExercises: [
        {
          id: 'stress-experiment',
          title: 'Persönliches Stress-Experiment',
          description: 'Messe deine Stressreaktionen und teste Bewältigungsstrategien',
          type: 'experiment',
          instructions: [
            'Woche 1: Dokumentiere Stresssituationen und körperliche Reaktionen',
            'Woche 2: Teste Atemtechniken bei Stress (4-7-8 Atmung)',
            'Woche 3: Teste Progressive Muskelentspannung',
            'Woche 4: Teste Achtsamkeits-Meditation',
            'Vergleiche die Wirksamkeit der verschiedenen Methoden für dich'
          ],
          duration: 10080, // 4 Wochen
          materials: ['Stress-Tagebuch', 'Herzfrequenz-Messer (optional)']
        }
      ],
      quiz: [
        {
          id: 'q3',
          question: 'Welches Hormon wird hauptsächlich bei Stress freigesetzt?',
          options: ['Insulin', 'Cortisol', 'Melatonin', 'Dopamin'],
          correctAnswer: 1,
          explanation: 'Cortisol ist das Hauptstresshormon, das bei Stress von den Nebennieren freigesetzt wird.'
        }
      ]
    },
    completed: false,
    progress: 0
  }
];

export default function KnowledgePlatformPage() {
  const [modules, setModules] = useState<KnowledgeModule[]>(knowledgeModules);
  const [selectedModule, setSelectedModule] = useState<KnowledgeModule | null>(null);
  const [currentSection, setCurrentSection] = useState<'overview' | 'theory' | 'practice' | 'quiz'>('overview');
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('wellness-knowledge-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedExercises(new Set(progress.exercises || []));
      setQuizAnswers(progress.quizAnswers || {});
    }
  }, []);

  const saveProgress = () => {
    const progress = {
      exercises: Array.from(completedExercises),
      quizAnswers
    };
    localStorage.setItem('wellness-knowledge-progress', JSON.stringify(progress));
  };    const completeExercise = (exerciseId: string) => {
      const newCompleted = new Set(completedExercises);
      newCompleted.add(exerciseId);
      setCompletedExercises(newCompleted);
      saveProgress();
    };

  const submitQuiz = () => {
    setShowQuizResults(true);
    saveProgress();
  };

  const getModuleIcon = (category: string) => {
    switch (category) {
      case 'basic': return '📚';
      case 'advanced': return '🔬';
      case 'specialized': return '🎓';
      default: return '📖';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'specialized': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white">
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
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white/20 p-4 rounded-2xl">
                <AcademicCapIcon className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Wissensplattform
                </h1>
                <p className="text-xl text-white/90">
                  Wissenschaftlich fundiertes Grund- und Allgemeinwissen für alle
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <BeakerIcon className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Lernen durch Verstehen</h3>
                  <p className="text-white/90 leading-relaxed">
                    Jedes Wissensmodul basiert auf wissenschaftlichen Erkenntnissen und ist so gestaltet, 
                    dass du nicht nur Fakten lernst, sondern verstehst, wie und warum etwas funktioniert. 
                    Praktische Übungen helfen dir, das Gelernte zu verinnerlichen und anzuwenden.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {!selectedModule ? (
          // Module Overview
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verfügbare Wissensmodule</h2>
              <p className="text-gray-600">
                Wähle ein Modul aus, um mit dem strukturierten Lernen zu beginnen. 
                Jedes Modul kombiniert Theorie, Praxis und Selbstüberprüfung.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => {
                const completedExercisesCount = module.content.practicalExercises.filter(
                  ex => completedExercises.has(ex.id)
                ).length;
                const totalExercises = module.content.practicalExercises.length;
                const completionPercentage = totalExercises > 0 ? (completedExercisesCount / totalExercises) * 100 : 0;

                return (
                  <motion.div
                    key={module.id}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                    onClick={() => setSelectedModule(module)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-3xl">{getModuleIcon(module.category)}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(module.category)}`}>
                          {module.category === 'basic' ? 'Grundlagen' :
                           module.category === 'advanced' ? 'Fortgeschritten' : 'Spezialisiert'}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                      <p className="text-gray-600 mb-4">{module.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Geschätzte Zeit:</span>
                          <span className="font-medium">{module.estimatedTime} Min</span>
                        </div>

                        {module.prerequisites.length > 0 && (
                          <div className="text-sm">
                            <span className="text-gray-500">Voraussetzungen:</span>
                            <div className="mt-1">
                              {module.prerequisites.map((prereq, idx) => (
                                <span key={idx} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mr-1">
                                  {prereq}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-3 border-t">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Fortschritt</span>
                            <span className="text-sm font-medium">{Math.round(completionPercentage)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${completionPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          // Selected Module Content
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Zurück zur Übersicht</span>
                </button>

                <h3 className="font-bold text-gray-900 mb-4">{selectedModule.title}</h3>

                <nav className="space-y-2">
                  {[
                    { id: 'overview', name: 'Überblick', icon: BookOpenIcon },
                    { id: 'theory', name: 'Theorie', icon: LightBulbIcon },
                    { id: 'practice', name: 'Praxis', icon: PlayIcon },
                    { id: 'quiz', name: 'Quiz', icon: QuestionMarkCircleIcon }
                  ].map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(section.id as any)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        currentSection === section.id
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <section.icon className="w-4 h-4" />
                      <span>{section.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <ModuleContent 
                module={selectedModule}
                currentSection={currentSection}
                completedExercises={completedExercises}
                onCompleteExercise={completeExercise}
                quizAnswers={quizAnswers}
                setQuizAnswers={setQuizAnswers}
                showQuizResults={showQuizResults}
                onSubmitQuiz={submitQuiz}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Module Content Component
const ModuleContent: React.FC<{
  module: KnowledgeModule;
  currentSection: string;
  completedExercises: Set<string>;
  onCompleteExercise: (id: string) => void;
  quizAnswers: Record<string, number>;
  setQuizAnswers: (answers: Record<string, number>) => void;
  showQuizResults: boolean;
  onSubmitQuiz: () => void;
}> = ({ 
  module, 
  currentSection, 
  completedExercises, 
  onCompleteExercise,
  quizAnswers,
  setQuizAnswers,
  showQuizResults,
  onSubmitQuiz
}) => {
  const renderContent = () => {
    switch (currentSection) {
      case 'overview':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{module.title}</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Lernziele</h3>
                <ul className="space-y-2">
                  {module.learningObjectives.map((objective, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <LightBulbIcon className="w-8 h-8 text-blue-600 mb-3" />
                  <h4 className="font-semibold text-blue-900 mb-2">Theorie</h4>
                  <p className="text-blue-800 text-sm">
                    {module.content.theory.length} wissenschaftlich belegte Konzepte
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <PlayIcon className="w-8 h-8 text-green-600 mb-3" />
                  <h4 className="font-semibold text-green-900 mb-2">Praxis</h4>
                  <p className="text-green-800 text-sm">
                    {module.content.practicalExercises.length} praktische Übungen
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <QuestionMarkCircleIcon className="w-8 h-8 text-purple-600 mb-3" />
                  <h4 className="font-semibold text-purple-900 mb-2">Quiz</h4>
                  <p className="text-purple-800 text-sm">
                    {module.content.quiz.length} Verständnisfragen
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <ClockIcon className="w-6 h-6 text-gray-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Zeitlicher Aufwand</h4>
                <p className="text-gray-700">
                  Geschätzte Lernzeit: <strong>{module.estimatedTime} Minuten</strong>
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Du kannst jederzeit pausieren und später weitermachen. Dein Fortschritt wird automatisch gespeichert.
                </p>
              </div>
            </div>
          </div>
        );

      case 'theory':
        return (
          <div className="space-y-6">
            {module.content.theory.map((fact, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <LightBulbIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Wissenschaftlicher Fakt #{idx + 1}
                    </h3>
                    <p className="text-gray-800 mb-6 leading-relaxed">{fact.fact}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Wissenschaftliche Quelle:</h4>
                      {fact.sources.map((source, sourceIdx) => (
                        <div key={sourceIdx} className="text-sm text-gray-700">
                          {formatSourceForDisplay(source)}
                        </div>
                      ))}
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Evidenzlevel: {fact.evidenceLevel}
                        </span>
                        <span className="text-xs text-gray-500">
                          Zuletzt verifiziert: {fact.lastVerified}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'practice':
        return (
          <div className="space-y-6">
            {module.content.practicalExercises.map((exercise, idx) => {
              const isCompleted = completedExercises.has(exercise.id);
              
              return (
                <div key={exercise.id} className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{exercise.title}</h3>
                      <p className="text-gray-600 mb-4">{exercise.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Typ: {exercise.type}</span>
                        <span>Dauer: {exercise.duration} Min</span>
                      </div>
                    </div>
                    {isCompleted && (
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        ✓ Abgeschlossen
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Anleitung:</h4>
                      <ol className="space-y-2">
                        {exercise.instructions.map((instruction, instrIdx) => (
                          <li key={instrIdx} className="flex items-start space-x-3">
                            <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                              {instrIdx + 1}
                            </span>
                            <span className="text-gray-700">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {exercise.materials && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Benötigte Materialien:</h4>
                        <ul className="space-y-1">
                          {exercise.materials.map((material, matIdx) => (
                            <li key={matIdx} className="flex items-center space-x-2">
                              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                              <span className="text-gray-600">{material}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <button
                        onClick={() => onCompleteExercise(exercise.id)}
                        disabled={isCompleted}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                          isCompleted
                            ? 'bg-green-600 text-white cursor-default'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isCompleted ? '✓ Übung abgeschlossen' : 'Als erledigt markieren'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'quiz':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Wissensüberprüfung</h2>
            
            <div className="space-y-8">
              {module.content.quiz.map((question, idx) => (
                <div key={question.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {idx + 1}. {question.question}
                  </h3>
                  
                  <div className="space-y-3">
                    {question.options.map((option, optIdx) => {
                      const isSelected = quizAnswers[question.id] === optIdx;
                      const isCorrect = optIdx === question.correctAnswer;                            const showResults = showQuizResults;
                      
                      return (
                        <button
                          key={optIdx}
                          onClick={() => !showResults && setQuizAnswers({...quizAnswers, [question.id]: optIdx})}
                          disabled={showResults}
                          className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                            showResults
                              ? isCorrect 
                                ? 'border-green-500 bg-green-50 text-green-900'
                                : isSelected && !isCorrect
                                  ? 'border-red-500 bg-red-50 text-red-900'
                                  : 'border-gray-200 bg-gray-50 text-gray-700'
                              : isSelected
                                ? 'border-blue-500 bg-blue-50 text-blue-900'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <span className="font-medium">
                            {String.fromCharCode(65 + optIdx)}) {option}
                          </span>
                          {showResults && isCorrect && (
                            <span className="ml-2 text-green-600">✓</span>
                          )}
                          {showResults && isSelected && !isCorrect && (
                            <span className="ml-2 text-red-600">✗</span>
                          )}
                        </button>
                      );
                    })}
                  </div>                      
                      {showQuizResults && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <p className="text-blue-900">
                            <strong>Erklärung:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                </div>
              ))}
            </div>

            {!showQuizResults ? (
              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={onSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length < module.content.quiz.length}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Quiz auswerten
                </button>
              </div>
            ) : (
              <div className="mt-8 pt-6 border-t">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Quiz abgeschlossen!</h3>
                  <p className="text-green-800">
                    Du hast {Object.entries(quizAnswers).filter(([questionId, answer]) => {
                      const question = module.content.quiz.find(q => q.id === questionId);
                      return question && answer === question.correctAnswer;
                    }).length} von {module.content.quiz.length} Fragen richtig beantwortet.
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };      return renderContent();
    };
