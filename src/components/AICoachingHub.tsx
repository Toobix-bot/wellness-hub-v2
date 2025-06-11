'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  HeartIcon,
  LightBulbIcon,
  SparklesIcon,
  UserCircleIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  ChevronDownIcon,
  BoltIcon,
  AcademicCapIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { aiPersonalities, matchPersonalityToUser, getPersonalityById } from '@/utils/aiPersonalitiesData';
import { AIPersonality, CoachingSession, SessionType } from '@/types/aiPersonalities';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  personality?: string;
  mood?: string;
  suggestions?: string[];
}

interface AICoachingHubProps {
  initialPersonality?: string;
  sessionType?: SessionType;
}

export default function AICoachingHub({ 
  initialPersonality = 'maya-healer',
  sessionType = 'daily-checkin' 
}: AICoachingHubProps) {
  const [currentPersonality, setCurrentPersonality] = useState<AIPersonality>(
    getPersonalityById(initialPersonality) || aiPersonalities[0]
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userMood, setUserMood] = useState<number>(5);
  const [sessionActive, setSessionActive] = useState(false);
  const [showPersonalitySelector, setShowPersonalitySelector] = useState(false);
  const [currentSession, setCurrentSession] = useState<CoachingSession | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initiale Begrüßung
    if (messages.length === 0) {
      startSession();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startSession = () => {
    const session: CoachingSession = {
      id: `session-${Date.now()}`,
      coachId: currentPersonality.id,
      userId: 'current-user', // TODO: Get from auth
      startTime: new Date(),
      sessionType,
      topics: [],
      mood: { before: userMood },
      goals: [],
      activities: [],
      outcomes: [],
      satisfaction: 0,
      notes: ''
    };

    setCurrentSession(session);
    setSessionActive(true);

    // Finde passende Begrüßung
    const firstMeetingResponse = currentPersonality.responses.find(
      r => r.trigger === 'first-meeting'
    );

    if (firstMeetingResponse) {
      const greeting = firstMeetingResponse.responseTemplates[
        Math.floor(Math.random() * firstMeetingResponse.responseTemplates.length)
      ];

      addAIMessage(greeting);
    }
  };

  const addAIMessage = (content: string, suggestions?: string[]) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      content,
      timestamp: new Date(),
      personality: currentPersonality.id,
      suggestions
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content,
      timestamp: new Date(),
      mood: userMood.toString()
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMsg = currentMessage;
    setCurrentMessage('');
    addUserMessage(userMsg);
    setIsTyping(true);

    // Simuliere AI-Antwort (in echter App würde hier LLM-Integration stehen)
    setTimeout(() => {
      const response = generateAIResponse(userMsg);
      setIsTyping(false);
      addAIMessage(response.content, response.suggestions);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    // Einfache Regel-basierte Antworten (in echter App: LLM mit Personality-Prompts)
    const lowerMsg = userMessage.toLowerCase();
    
    // Krisenintervention
    if (lowerMsg.includes('hilfe') || lowerMsg.includes('verzweifelt') || lowerMsg.includes('panik')) {
      const crisisResponse = currentPersonality.responses.find(r => r.trigger === 'crisis-mode');
      if (crisisResponse) {
        return {
          content: crisisResponse.responseTemplates[0],
          suggestions: ['Atemübung starten', 'Notfall-Kontakt anrufen', 'Grounding-Technik']
        };
      }
    }

    // Motivation gesucht
    if (lowerMsg.includes('motivation') || lowerMsg.includes('aufgeben') || lowerMsg.includes('müde')) {
      const motivationResponse = currentPersonality.responses.find(r => r.trigger === 'motivation-needed');
      if (motivationResponse) {
        return {
          content: motivationResponse.responseTemplates[0],
          suggestions: ['Tägliche Routine setzen', 'Kleine Schritte planen', 'Erfolge feiern']
        };
      }
    }

    // Persönlichkeits-spezifische Standard-Antworten
    const quotes = currentPersonality.quotes;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    switch (currentPersonality.personality) {
      case 'nurturing-healer':
        return {
          content: `Das hört sich an, als trägst du viel mit dir. ${randomQuote} Möchtest du mir mehr darüber erzählen?`,
          suggestions: ['Gefühle erkunden', 'Selbstmitgefühl üben', 'Atemarbeit']
        };
      
      case 'motivational-warrior':
        return {
          content: `Ich höre einen Kämpfer! ${randomQuote} Zeit für Action - was ist dein nächster Schritt?`,
          suggestions: ['Sofort handeln', 'Hindernisse identifizieren', 'Workout starten']
        };
      
      case 'scientific-analyst':
        return {
          content: `Interessante Beobachtung! ${randomQuote} Lass uns Daten sammeln - auf einer Skala von 1-10, wie würdest du das bewerten?`,
          suggestions: ['Hypothese aufstellen', 'Messbare Ziele setzen', 'Studien recherchieren']
        };
      
      case 'creative-trickster':
        return {
          content: `Ooh, das klingt nach einem kreativen Puzzle! ${randomQuote} Was wäre, wenn wir das mal ganz anders angehen?`,
          suggestions: ['Brainstorming', 'Perspektive wechseln', 'Spielerisch experimentieren']
        };
      
      case 'spiritual-sage':
        return {
          content: `Betrachte diese Erfahrung mit liebevoller Aufmerksamkeit. ${randomQuote} Was lehrt dich dieser Moment?`,
          suggestions: ['Meditation', 'Selbst-Reflexion', 'Gegenwart erleben']
        };
      
      default:
        return {
          content: `Danke, dass du das mit mir teilst. ${randomQuote}`,
          suggestions: ['Weiter vertiefen', 'Pause machen', 'Andere Perspektive']
        };
    }
  };

  const switchPersonality = (personalityId: string) => {
    const newPersonality = getPersonalityById(personalityId);
    if (newPersonality) {
      setCurrentPersonality(newPersonality);
      setShowPersonalitySelector(false);
      
      // Übergabe-Nachricht
      addAIMessage(`${newPersonality.avatar} Hallo! Ich bin ${newPersonality.name}. ${newPersonality.quotes[0]} Ich übernehme jetzt deine Begleitung.`);
      
      // Session aktualisieren
      if (currentSession) {
        setCurrentSession({
          ...currentSession,
          coachId: newPersonality.id
        });
      }
    }
  };

  const getPersonalityIcon = (personality: AIPersonality) => {
    switch (personality.personality) {
      case 'nurturing-healer': return <HeartIcon className="w-5 h-5" />;
      case 'motivational-warrior': return <BoltIcon className="w-5 h-5" />;
      case 'scientific-analyst': return <BeakerIcon className="w-5 h-5" />;
      case 'creative-trickster': return <SparklesIcon className="w-5 h-5" />;
      case 'spiritual-sage': return <AcademicCapIcon className="w-5 h-5" />;
      default: return <UserCircleIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{currentPersonality.avatar}</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPersonality.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentPersonality.title}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Stimmungs-Slider */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Stimmung:</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userMood}
                  onChange={(e) => setUserMood(Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm font-medium text-purple-600">{userMood}/10</span>
              </div>
              
              {/* Coach wechseln */}
              <div className="relative">
                <button
                  onClick={() => setShowPersonalitySelector(!showPersonalitySelector)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  <span className="text-sm">Coach wechseln</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
                
                <AnimatePresence>
                  {showPersonalitySelector && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                    >
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Wähle deinen Coach
                        </h3>
                        <div className="space-y-2">
                          {aiPersonalities.map((personality) => (
                            <button
                              key={personality.id}
                              onClick={() => switchPersonality(personality.id)}
                              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                currentPersonality.id === personality.id
                                  ? 'bg-purple-100 dark:bg-purple-900'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              <span className="text-2xl">{personality.avatar}</span>
                              <div className="flex-1 text-left">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {personality.name}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                  {personality.specializations[0]?.area}
                                </div>
                              </div>
                              {getPersonalityIcon(personality)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p>{message.content}</p>
                    {message.suggestions && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentMessage(suggestion)}
                            className="text-xs px-2 py-1 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString('de-DE', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <div className="flex space-x-4">
              <input
                ref={inputRef}
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Teile deine Gedanken mit..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
                <span>Senden</span>
              </button>
            </div>
          </div>
        </div>

        {/* Coaching Tools Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Schnell-Tools von {currentPersonality.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentPersonality.skills.slice(0, 3).map((skill) => (
              <div
                key={skill.id}
                className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 rounded-lg"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {skill.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {skill.description}
                </p>
                <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  Tool verwenden →
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
