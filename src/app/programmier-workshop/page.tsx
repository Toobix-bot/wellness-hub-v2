'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  CodeBracketIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  BookOpenIcon,
  PlayIcon,
  AcademicCapIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  SparklesIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface ProgrammingCourse {
  id: string;
  title: string;
  language: 'python' | 'javascript' | 'ai' | 'web' | 'data';
  level: 'anfänger' | 'fortgeschritten' | 'experte';
  duration: string;
  description: string;
  topics: string[];
  projects: string[];
  prerequisites: string[];
  learningPath: string[];
  wellnessConnection: string;
  icon: string;
  color: string;
}

interface CodeExample {
  id: string;
  title: string;
  language: string;
  description: string;
  code: string;
  explanation: string[];
  runnable: boolean;
  wellness_use_case: string;
}

interface AIIntegrationProject {
  id: string;
  title: string;
  difficulty: 'einfach' | 'mittel' | 'schwer';
  description: string;
  technologies: string[];
  steps: string[];
  aiTools: string[];
  wellness_application: string;
  estimatedTime: string;
}

const programmingCourses: ProgrammingCourse[] = [
  {
    id: 'python-wellness',
    title: 'Python für Wellness-Apps',
    language: 'python',
    level: 'anfänger',
    duration: '8 Wochen',
    description: 'Lerne Python-Programmierung durch die Entwicklung von Wellness- und Mental Health-Anwendungen',
    topics: [
      'Python Grundlagen & Syntax',
      'Datenstrukturen & Algorithmen',
      'Dateiverarbeitung & APIs',
      'Web Scraping für Wellness-Daten',
      'Datenvisualisierung mit Matplotlib',
      'Chatbot-Entwicklung',
      'Machine Learning Basics',
      'Flask Web-Development'
    ],
    projects: [
      'Mood Tracker mit Datenvisualisierung',
      'Meditation Timer mit Statistiken',
      'Habit Tracker Konsolen-App',
      'Wellness-Chatbot',
      'Persönlicher Wellness-Assistent'
    ],
    prerequisites: ['Grundlegende Computer-Kenntnisse', 'Interesse an Programmierung'],
    learningPath: [
      'Woche 1-2: Python Grundlagen',
      'Woche 3-4: Datenstrukturen & Funktionen',
      'Woche 5-6: Dateien & APIs',
      'Woche 7-8: Projekt-Entwicklung'
    ],
    wellnessConnection: 'Entwickle Tools, die dir und anderen bei der mentalen Gesundheit helfen',
    icon: '🐍',
    color: 'green'
  },
  {
    id: 'javascript-mindfulness',
    title: 'JavaScript & Mindfulness Apps',
    language: 'javascript',
    level: 'fortgeschritten',
    duration: '10 Wochen',
    description: 'Erstelle interaktive Wellness-Webapps mit modernem JavaScript und React',
    topics: [
      'Modern JavaScript (ES6+)',
      'React Hooks & State Management',
      'Progressive Web Apps',
      'Web Audio API für Meditation',
      'Local Storage & IndexedDB',
      'Service Workers',
      'CSS-in-JS & Animations',
      'Testing & Deployment'
    ],
    projects: [
      'Interaktive Meditation-App',
      'Breathing Exercise Webapp',
      'Mood Board Generator',
      'Wellness PWA mit Offline-Support',
      'Community Wellness-Platform'
    ],
    prerequisites: ['HTML/CSS Kenntnisse', 'JavaScript Grundlagen'],
    learningPath: [
      'Woche 1-2: Modern JavaScript',
      'Woche 3-5: React & Komponenten',
      'Woche 6-7: State Management & APIs',
      'Woche 8-10: PWA & Deployment'
    ],
    wellnessConnection: 'Baue Webapps, die Menschen zu einem bewussteren Leben verhelfen',
    icon: '⚛️',
    color: 'blue'
  },
  {
    id: 'ai-wellness',
    title: 'KI für Wellness & Mental Health',
    language: 'ai',
    level: 'experte',
    duration: '12 Wochen',
    description: 'Entwickle intelligente Wellness-Systeme mit Machine Learning und Natural Language Processing',
    topics: [
      'Machine Learning Fundamentals',
      'Natural Language Processing',
      'Sentiment Analysis',
      'Recommendation Systems',
      'Computer Vision für Emotion Detection',
      'Chatbot Development mit NLP',
      'Ethical AI in Healthcare',
      'Model Deployment & MLOps'
    ],
    projects: [
      'Emotionserkennung aus Text',
      'Personalisierter Wellness-Recommender',
      'KI-Therapie-Assistent',
      'Mood Prediction Model',
      'Wellness Content Generator'
    ],
    prerequisites: ['Python Kenntnisse', 'Statistik Grundlagen', 'Machine Learning Basics'],
    learningPath: [
      'Woche 1-3: ML Grundlagen',
      'Woche 4-6: NLP & Text Analysis',
      'Woche 7-9: Computer Vision',
      'Woche 10-12: Deployment & Ethics'
    ],
    wellnessConnection: 'Nutze KI, um personalisierte Wellness-Lösungen zu entwickeln',
    icon: '🤖',
    color: 'purple'
  },
  {
    id: 'data-science-health',
    title: 'Data Science für Gesundheitsdaten',
    language: 'data',
    level: 'fortgeschritten',
    duration: '6 Wochen',
    description: 'Analysiere und visualisiere Gesundheits- und Wellness-Daten für bessere Insights',
    topics: [
      'Pandas & NumPy für Datenanalyse',
      'Datenvisualisierung mit Seaborn/Plotly',
      'Statistische Analyse',
      'Time Series Analysis',
      'Health Data Privacy',
      'Dashboard Creation',
      'Predictive Analytics',
      'A/B Testing für Wellness-Apps'
    ],
    projects: [
      'Personal Health Dashboard',
      'Sleep Pattern Analysis',
      'Wellness Trend Predictor',
      'Community Health Insights',
      'Mental Health Statistics Visualizer'
    ],
    prerequisites: ['Python Grundlagen', 'Statistik Grundwissen'],
    learningPath: [
      'Woche 1-2: Datenanalyse Basics',
      'Woche 3-4: Visualisierung & Statistik',
      'Woche 5-6: Predictive Analytics'
    ],
    wellnessConnection: 'Gewinne wertvolle Erkenntnisse aus Wellness-Daten für bessere Entscheidungen',
    icon: '📊',
    color: 'orange'
  }
];

const codeExamples: CodeExample[] = [
  {
    id: 'mood-tracker',
    title: 'Einfacher Mood Tracker',
    language: 'python',
    description: 'Ein Python-Script zum Verfolgen der täglichen Stimmung',
    code: `import datetime
import json
import matplotlib.pyplot as plt

class MoodTracker:
    def __init__(self):
        self.mood_file = 'mood_data.json'
        self.load_data()
    
    def load_data(self):
        try:
            with open(self.mood_file, 'r') as f:
                self.moods = json.load(f)
        except FileNotFoundError:
            self.moods = {}
    
    def save_data(self):
        with open(self.mood_file, 'w') as f:
            json.dump(self.moods, f, indent=2)
    
    def add_mood(self, mood_score, notes=""):
        date = datetime.date.today().isoformat()
        self.moods[date] = {
            'score': mood_score,
            'notes': notes
        }
        self.save_data()
        print(f"Mood {mood_score}/10 für {date} gespeichert!")
    
    def show_trends(self):
        dates = list(self.moods.keys())
        scores = [self.moods[date]['score'] for date in dates]
        
        plt.figure(figsize=(10, 6))
        plt.plot(dates, scores, marker='o')
        plt.title('Deine Stimmungs-Trends')
        plt.ylabel('Mood Score (1-10)')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()

# Verwendung
tracker = MoodTracker()
tracker.add_mood(8, "Toller Tag mit Meditation!")
tracker.show_trends()`,
    explanation: [
      'Die Klasse MoodTracker speichert Stimmungsdaten in einer JSON-Datei',
      'add_mood() fügt eine neue Stimmungsbewertung mit optionalen Notizen hinzu',
      'show_trends() visualisiert die Stimmungsverläufe mit matplotlib',
      'Die Daten werden persistent gespeichert und können über Zeit verfolgt werden'
    ],
    runnable: true,
    wellness_use_case: 'Hilft dabei, Stimmungsmuster zu erkennen und den Fortschritt bei Wellness-Praktiken zu verfolgen'
  },
  {
    id: 'breathing-exercise',
    title: 'Interaktive Atemübung',
    language: 'javascript',
    description: 'Eine JavaScript-Komponente für geführte Atemübungen',
    code: `class BreathingExercise {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.isRunning = false;
        this.currentPhase = 'inhale';
        this.cycleCount = 0;
        this.maxCycles = 10;
        
        this.phases = {
            inhale: { duration: 4000, instruction: 'Einatmen...' },
            hold: { duration: 4000, instruction: 'Halten...' },
            exhale: { duration: 6000, instruction: 'Ausatmen...' }
        };
        
        this.createUI();
    }
    
    createUI() {
        this.container.innerHTML = \`
            <div class="breathing-circle"></div>
            <div class="instruction">Bereit für die Atemübung?</div>
            <div class="cycle-counter">Zyklus: 0/\${this.maxCycles}</div>
            <button onclick="breathingApp.toggle()">Start</button>
        \`;
        
        this.circle = this.container.querySelector('.breathing-circle');
        this.instruction = this.container.querySelector('.instruction');
        this.counter = this.container.querySelector('.cycle-counter');
    }
    
    start() {
        this.isRunning = true;
        this.cycleCount = 0;
        this.nextPhase();
    }
    
    stop() {
        this.isRunning = false;
        clearTimeout(this.timeout);
        this.instruction.textContent = 'Übung beendet. Gut gemacht!';
        this.circle.className = 'breathing-circle';
    }
    
    nextPhase() {
        if (!this.isRunning) return;
        
        const phase = this.phases[this.currentPhase];
        this.instruction.textContent = phase.instruction;
        this.circle.className = \`breathing-circle \${this.currentPhase}\`;
        
        this.timeout = setTimeout(() => {
            if (this.currentPhase === 'exhale') {
                this.cycleCount++;
                this.counter.textContent = \`Zyklus: \${this.cycleCount}/\${this.maxCycles}\`;
                
                if (this.cycleCount >= this.maxCycles) {
                    this.stop();
                    return;
                }
            }
            
            // Nächste Phase
            const phases = Object.keys(this.phases);
            const currentIndex = phases.indexOf(this.currentPhase);
            this.currentPhase = phases[(currentIndex + 1) % phases.length];
            
            this.nextPhase();
        }, phase.duration);
    }
    
    toggle() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }
}

// CSS (separat hinzufügen)
const css = \`
.breathing-circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    margin: 20px auto;
    transition: transform ease-in-out;
}

.breathing-circle.inhale {
    transform: scale(1.3);
    transition-duration: 4s;
}

.breathing-circle.hold {
    transform: scale(1.3);
    transition-duration: 4s;
}

.breathing-circle.exhale {
    transform: scale(1);
    transition-duration: 6s;
}
\`;

// Initialisierung
const breathingApp = new BreathingExercise('breathing-container');`,
    explanation: [
      'Die BreathingExercise Klasse erstellt eine interaktive Atemübung',
      'Verschiedene Phasen (Einatmen, Halten, Ausatmen) mit unterschiedlichen Timings',
      'Visuelle Animation eines sich vergrößernden/verkleinernden Kreises',
      'Automatische Zyklen-Zählung und Beendigung nach festgelegter Anzahl'
    ],
    runnable: true,
    wellness_use_case: 'Hilft bei Stressabbau und Achtsamkeitspraxis durch geführte Atemtechniken'
  },
  {
    id: 'sentiment-analysis',
    title: 'Sentiment-Analyse für Tagebuch',
    language: 'python',
    description: 'KI-basierte Stimmungsanalyse von Tagebucheinträgen',
    code: `from textblob import TextBlob
import nltk
from collections import defaultdict
import matplotlib.pyplot as plt
import seaborn as sns

class JournalSentimentAnalyzer:
    def __init__(self):
        # Download erforderlicher NLTK-Daten
        nltk.download('punkt', quiet=True)
        nltk.download('brown', quiet=True)
        
        self.entries = []
        self.sentiments = []
    
    def add_entry(self, text, date):
        """Füge einen Tagebucheintrag hinzu und analysiere die Stimmung"""
        blob = TextBlob(text)
        
        sentiment_data = {
            'date': date,
            'text': text,
            'polarity': blob.sentiment.polarity,  # -1 (negativ) bis 1 (positiv)
            'subjectivity': blob.sentiment.subjectivity,  # 0 (objektiv) bis 1 (subjektiv)
            'word_count': len(text.split()),
            'emotions': self.extract_emotions(text)
        }
        
        self.entries.append(sentiment_data)
        return sentiment_data
    
    def extract_emotions(self, text):
        """Extrahiere emotionale Schlüsselwörter"""
        emotion_words = {
            'joy': ['happy', 'joy', 'excited', 'glad', 'cheerful', 'glücklich', 'freude'],
            'sadness': ['sad', 'depressed', 'down', 'unhappy', 'traurig', 'deprimiert'],
            'anger': ['angry', 'furious', 'mad', 'irritated', 'wütend', 'ärgerlich'],
            'fear': ['afraid', 'scared', 'worried', 'anxious', 'ängstlich', 'sorge'],
            'love': ['love', 'adore', 'cherish', 'liebe', 'schätze']
        }
        
        emotions_found = defaultdict(int)
        words = text.lower().split()
        
        for emotion, keywords in emotion_words.items():
            for word in words:
                if word in keywords:
                    emotions_found[emotion] += 1
        
        return dict(emotions_found)
    
    def get_mood_trends(self):
        """Analysiere Stimmungstrends über Zeit"""
        if not self.entries:
            return None
        
        dates = [entry['date'] for entry in self.entries]
        polarities = [entry['polarity'] for entry in self.entries]
        
        return {
            'dates': dates,
            'mood_scores': polarities,
            'average_mood': sum(polarities) / len(polarities),
            'mood_range': max(polarities) - min(polarities)
        }
    
    def generate_insights(self):
        """Generiere Wellness-Insights basierend auf der Analyse"""
        if not self.entries:
            return "Keine Einträge zum Analysieren."
        
        trends = self.get_mood_trends()
        avg_mood = trends['average_mood']
        
        insights = []
        
        if avg_mood > 0.3:
            insights.append("🌟 Deine allgemeine Stimmung ist sehr positiv!")
        elif avg_mood > 0.1:
            insights.append("😊 Du hast eine insgesamt positive Einstellung.")
        elif avg_mood > -0.1:
            insights.append("😐 Deine Stimmung ist ausgeglichen.")
        else:
            insights.append("💙 Es scheint, als könntest du etwas Unterstützung gebrauchen.")
        
        # Emotionsanalyse
        all_emotions = defaultdict(int)
        for entry in self.entries:
            for emotion, count in entry['emotions'].items():
                all_emotions[emotion] += count
        
        if all_emotions:
            top_emotion = max(all_emotions, key=all_emotions.get)
            insights.append(f"🎭 Deine häufigste Emotion ist: {top_emotion}")
        
        return "\\n".join(insights)
    
    def visualize_mood(self):
        """Erstelle eine Visualisierung der Stimmungstrends"""
        trends = self.get_mood_trends()
        if not trends:
            return
        
        plt.figure(figsize=(12, 6))
        
        # Subplot 1: Mood over time
        plt.subplot(1, 2, 1)
        plt.plot(trends['dates'], trends['mood_scores'], marker='o', linestyle='-')
        plt.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
        plt.title('Stimmungsverlauf über Zeit')
        plt.ylabel('Stimmung (Polarität)')
        plt.xticks(rotation=45)
        
        # Subplot 2: Emotion distribution
        plt.subplot(1, 2, 2)
        all_emotions = defaultdict(int)
        for entry in self.entries:
            for emotion, count in entry['emotions'].items():
                all_emotions[emotion] += count
        
        if all_emotions:
            emotions = list(all_emotions.keys())
            counts = list(all_emotions.values())
            plt.bar(emotions, counts, color='skyblue')
            plt.title('Emotionsverteilung')
            plt.ylabel('Häufigkeit')
        
        plt.tight_layout()
        plt.show()

# Beispiel-Verwendung
analyzer = JournalSentimentAnalyzer()

# Beispiel-Einträge hinzufügen
analyzer.add_entry("Heute war ein wundervoller Tag! Ich habe meditiert und fühle mich sehr glücklich.", "2024-01-01")
analyzer.add_entry("Ich bin etwas gestresst wegen der Arbeit, aber versuche positiv zu bleiben.", "2024-01-02")
analyzer.add_entry("Tolle Yoga-Session heute morgen. Ich fühle mich ausgeglichen und friedlich.", "2024-01-03")

# Insights generieren
print(analyzer.generate_insights())
analyzer.visualize_mood()`,
    explanation: [
      'TextBlob wird für Natural Language Processing und Sentiment-Analyse verwendet',
      'Polarity-Score zeigt an, ob ein Text positiv oder negativ ist (-1 bis 1)',
      'Emotionale Schlüsselwörter werden extrahiert und kategorisiert',
      'Trends werden visualisiert, um Muster in der mentalen Gesundheit zu erkennen'
    ],
    runnable: true,
    wellness_use_case: 'Automatische Analyse von Tagebucheinträgen zur Erkennung von Stimmungsmustern und mentalen Gesundheitstrends'
  }
];

const aiIntegrationProjects: AIIntegrationProject[] = [
  {
    id: 'ai-wellness-coach',
    title: 'Personalisierter KI-Wellness-Coach',
    difficulty: 'schwer',
    description: 'Entwickle einen intelligenten Wellness-Coach, der personalisierte Empfehlungen basierend auf Nutzerverhalten gibt',
    technologies: ['Python', 'OpenAI API', 'FastAPI', 'SQLite', 'React'],
    steps: [
      'Setup der Entwicklungsumgebung und API-Keys',
      'Datenmodell für Nutzerprofile und Wellness-Aktivitäten erstellen',
      'Backend-API mit FastAPI entwickeln',
      'OpenAI Integration für natürliche Sprachverarbeitung',
      'Empfehlungsalgorithmus basierend auf Nutzerverhalten implementieren',
      'React Frontend für Chat-Interface erstellen',
      'Datenschutz und Sicherheitsmaßnahmen implementieren',
      'Testing und Deployment'
    ],
    aiTools: ['OpenAI GPT-4', 'Hugging Face Transformers', 'scikit-learn'],
    wellness_application: 'Bietet personalisierte Wellness-Empfehlungen, Motivationssprüche und adaptive Coaching-Strategien',
    estimatedTime: '6-8 Wochen'
  },
  {
    id: 'emotion-detection-app',
    title: 'Emotionserkennung durch Gesichtsanalyse',
    difficulty: 'mittel',
    description: 'Webapp zur Emotionserkennung über Webcam für Wellness-Tracking',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'Flask', 'JavaScript'],
    steps: [
      'Computer Vision Grundlagen mit OpenCV',
      'Pre-trained Emotion Detection Model integrieren',
      'Webcam-Interface in Browser erstellen',
      'Real-time Emotionserkennung implementieren',
      'Datenvisualisierung für Emotionstrends',
      'Privacy-first Ansatz (lokale Verarbeitung)',
      'Mobile Responsiveness hinzufügen'
    ],
    aiTools: ['TensorFlow/Keras', 'OpenCV', 'MediaPipe'],
    wellness_application: 'Hilft Nutzern dabei, ihre emotionalen Zustände zu verfolgen und Trigger für Stress zu identifizieren',
    estimatedTime: '4-5 Wochen'
  },
  {
    id: 'mindfulness-nlp',
    title: 'NLP-basierte Achtsamkeits-App',
    difficulty: 'einfach',
    description: 'Text-basierte App, die Achtsamkeits-Übungen basierend auf Stimmungsanalyse vorschlägt',
    technologies: ['Python', 'spaCy', 'Streamlit', 'SQLite'],
    steps: [
      'Text-Preprocessing und NLP-Pipeline mit spaCy',
      'Stimmungsanalyse von Nutzer-Eingaben',
      'Datenbank mit Achtsamkeits-Übungen erstellen',
      'Matching-Algorithmus für Übungsempfehlungen',
      'Streamlit-Interface für einfache Bedienung',
      'Progress-Tracking und Statistiken',
      'Export-Funktion für persönliche Daten'
    ],
    aiTools: ['spaCy', 'TextBlob', 'VADER Sentiment'],
    wellness_application: 'Schlägt passende Meditation und Achtsamkeitsübungen basierend auf der aktuellen Stimmung vor',
    estimatedTime: '2-3 Wochen'
  }
];

export default function ProgrammierWorkshopPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'examples' | 'ai-projects' | 'community'>('courses');
  const [selectedCourse, setSelectedCourse] = useState<ProgrammingCourse | null>(null);
  const [selectedExample, setSelectedExample] = useState<CodeExample | null>(null);
  const [selectedProject, setSelectedProject] = useState<AIIntegrationProject | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-cyan-900">
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
                Programmier-Workshop
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Python, JavaScript, KI & Wellness-Tech lernen und anwenden
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="text-2xl">💻</div>
            <div className="text-2xl">🤖</div>
            <div className="text-2xl">🧠</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-xl p-1 mb-8 shadow-lg">
          {[
            { id: 'courses', label: 'Lernpfade', icon: AcademicCapIcon },
            { id: 'examples', label: 'Code-Beispiele', icon: CodeBracketIcon },
            { id: 'ai-projects', label: 'KI-Projekte', icon: CpuChipIcon },
            { id: 'community', label: 'Dev Community', icon: UserGroupIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Lernpfade Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🎓 Strukturierte Lernpfade für Wellness-Tech
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programmingCourses.map((course) => (
                <motion.div
                  key={course.id}
                  onClick={() => setSelectedCourse(selectedCourse?.id === course.id ? null : course)}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 bg-${course.color}-100 dark:bg-${course.color}-900 rounded-xl flex items-center justify-center text-2xl`}>
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {course.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          course.level === 'anfänger' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : course.level === 'fortgeschritten'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {course.level}
                        </span>
                        <span className="text-sm text-gray-500">
                          ⏱️ {course.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {course.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                      🎯 Wellness-Verbindung:
                    </h4>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {course.wellnessConnection}
                    </p>
                  </div>

                  <AnimatePresence>
                    {selectedCourse?.id === course.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
                      >
                        {/* Learning Path */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            📚 Lernpfad:
                          </h4>
                          <div className="space-y-2">
                            {course.learningPath.map((step, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <span className="w-6 h-6 bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 rounded-full text-xs flex items-center justify-center">
                                  {index + 1}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  {step}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Topics */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            🔧 Was du lernst:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {course.topics.map((topic, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                <span className="text-gray-600 dark:text-gray-300">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Projects */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            🚀 Projekte:
                          </h4>
                          <ul className="space-y-1">
                            {course.projects.map((project, index) => (
                              <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></span>
                                {project}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                          Kurs starten
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Code-Beispiele Tab */}
        {activeTab === 'examples' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              💻 Praktische Code-Beispiele für Wellness-Apps
            </h2>

            <div className="space-y-6">
              {codeExamples.map((example) => (
                <motion.div
                  key={example.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => setSelectedExample(selectedExample?.id === example.id ? null : example)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                          {example.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {example.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm">
                          {example.language}
                        </span>
                        {example.runnable && (
                          <PlayIcon className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        🎯 Wellness-Anwendung:
                      </h4>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {example.wellness_use_case}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedExample?.id === example.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 dark:border-gray-600"
                      >
                        {/* Code */}
                        <div className="p-6 bg-gray-50 dark:bg-gray-900">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            📝 Code:
                          </h4>
                          <div className="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sm text-green-400 font-mono">
                              <code>{example.code}</code>
                            </pre>
                          </div>
                        </div>

                        {/* Explanation */}
                        <div className="p-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            💡 Erklärung:
                          </h4>
                          <ul className="space-y-2">
                            {example.explanation.map((point, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <LightBulbIcon className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {example.runnable && (
                            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                              <PlayIcon className="h-4 w-4 inline mr-2" />
                              Code ausführen
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* KI-Projekte Tab */}
        {activeTab === 'ai-projects' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🤖 KI-Integration Projekte für Wellness
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiIntegrationProjects.map((project) => (
                <motion.div
                  key={project.id}
                  onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.difficulty === 'einfach' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : project.difficulty === 'mittel'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-purple-600 dark:text-purple-400">
                      🤖 KI-Projekt
                    </span>
                    <span className="text-sm text-gray-500">
                      ⏱️ {project.estimatedTime}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                      🎯 Wellness-Anwendung:
                    </h4>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {project.wellness_application}
                    </p>
                  </div>

                  <AnimatePresence>
                    {selectedProject?.id === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
                      >
                        {/* Technologies */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            🔧 Technologien:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* AI Tools */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            🤖 KI-Tools:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.aiTools.map((tool, index) => (
                              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full text-sm">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Steps */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            📋 Projektschritte:
                          </h4>
                          <ol className="space-y-2">
                            {project.steps.map((step, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <span className="w-6 h-6 bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  {step}
                                </span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          <RocketLaunchIcon className="h-4 w-4 inline mr-2" />
                          Projekt starten
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              👥 Developer Community
            </h2>

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Aktive Entwickler', value: '890', icon: CodeBracketIcon, color: 'cyan' },
                { label: 'Code-Beispiele', value: '150+', icon: BookOpenIcon, color: 'blue' },
                { label: 'KI-Projekte', value: '45', icon: CpuChipIcon, color: 'purple' },
                { label: 'Community Rating', value: '4.9★', icon: StarIcon, color: 'yellow' }
              ].map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg flex items-center justify-center mb-4`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Latest Community Projects */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                🔥 Neueste Community-Projekte
              </h3>
              <div className="space-y-4">
                {[
                  {
                    user: 'WellnessDevGuru',
                    project: 'AI-Mood-Tracker mit Computer Vision',
                    language: 'Python',
                    stars: 127,
                    description: 'Emotionserkennung durch Gesichtsanalyse für Wellness-Tracking',
                    time: 'vor 2 Tagen'
                  },
                  {
                    user: 'MindfulCoder',
                    project: 'React Meditation Timer PWA',
                    language: 'JavaScript',
                    stars: 89,
                    description: 'Progressive Web App für geführte Meditationen mit Offline-Support',
                    time: 'vor 3 Tagen'
                  },
                  {
                    user: 'DataWellness',
                    project: 'Health Data Analytics Dashboard',
                    language: 'Python',
                    stars: 156,
                    description: 'Umfassendes Dashboard zur Analyse von Gesundheits- und Wellness-Daten',
                    time: 'vor 5 Tagen'
                  }
                ].map((project, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <CodeBracketIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {project.user}
                        </span>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                          {project.language}
                        </span>
                      </div>
                      <h4 className="text-cyan-600 dark:text-cyan-400 font-medium mb-1">
                        {project.project}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {project.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{project.time}</span>
                        <span>⭐ {project.stars}</span>
                        <button className="text-cyan-600 dark:text-cyan-400 hover:underline">
                          Code ansehen
                        </button>
                        <button className="text-green-600 dark:text-green-400 hover:underline">
                          Fork & Contribute
                        </button>
                      </div>
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
}
