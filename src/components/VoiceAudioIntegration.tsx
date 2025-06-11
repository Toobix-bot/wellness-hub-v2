'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MicrophoneIcon, 
  SpeakerWaveIcon,
  StopIcon,
  PlayIcon,
  PauseIcon,
  AdjustmentsHorizontalIcon,
  MusicalNoteIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

// Voice & Audio Integration Component
const VoiceAudioIntegration = () => {
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [audioJournals, setAudioJournals] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [voiceCommands, setVoiceCommands] = useState([]);
  const [currentMeditation, setCurrentMeditation] = useState(null);

  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    initializeVoiceRecognition();
    initializeTextToSpeech();
    loadAudioJournals();
    setupVoiceCommands();
  }, []);

  const initializeVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'de-DE';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscription(finalTranscript + interimTranscript);
        
        if (finalTranscript) {
          processVoiceCommand(finalTranscript.toLowerCase().trim());
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };

  const initializeTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices();
      const germanVoice = voices.find(voice => voice.lang.startsWith('de')) || voices[0];
      setSelectedVoice(germanVoice);
      
      // Aktualisiere Stimmen wenn sie geladen werden
      speechSynthesis.onvoiceschanged = () => {
        const updatedVoices = speechSynthesis.getVoices();
        const germanVoice = updatedVoices.find(voice => voice.lang.startsWith('de')) || updatedVoices[0];
        setSelectedVoice(germanVoice);
      };
    }
  };

  const setupVoiceCommands = () => {
    setVoiceCommands([
      {
        trigger: ['meditation starten', 'meditiere', 'meditation beginnen'],
        action: 'start_meditation',
        response: 'Starte deine Meditation. Möchtest du eine geführte Session oder nur den Timer?'
      },
      {
        trigger: ['dankbarkeit', 'dankbar', 'journal öffnen'],
        action: 'open_gratitude',
        response: 'Öffne das Dankbarkeits-Journal. Für was bist du heute dankbar?'
      },
      {
        trigger: ['life rpg', 'spiel starten', 'quests zeigen'],
        action: 'open_life_rpg',
        response: 'Öffne dein Life-RPG Dashboard. Du hast neue Quests verfügbar!'
      },
      {
        trigger: ['stress', 'entspannung', 'beruhigen'],
        action: 'stress_relief',
        response: 'Lass uns eine Entspannungsübung machen. Atme tief ein und aus.'
      },
      {
        trigger: ['fortschritt', 'ziele', 'erfolge'],
        action: 'show_progress',
        response: 'Hier ist dein aktueller Fortschritt. Du machst großartige Fortschritte!'
      },
      {
        trigger: ['stopp', 'beenden', 'aufhören'],
        action: 'stop',
        response: 'Verstanden. Wie kann ich dir sonst helfen?'
      }
    ]);
  };

  const processVoiceCommand = (command) => {
    const matchedCommand = voiceCommands.find(cmd => 
      cmd.trigger.some(trigger => command.includes(trigger))
    );

    if (matchedCommand) {
      executeVoiceCommand(matchedCommand);
    } else {
      // Fallback: Als Tagebucheintrag behandeln
      if (command.length > 10) {
        createAudioJournalEntry(command);
      }
    }
  };

  const executeVoiceCommand = (command) => {
    speak(command.response);
    
    switch (command.action) {
      case 'start_meditation':
        startGuidedMeditation();
        break;
      case 'open_gratitude':
        // Navigation zur Dankbarkeitsseite würde hier passieren
        break;
      case 'open_life_rpg':
        // Navigation zum Life-RPG würde hier passieren
        break;
      case 'stress_relief':
        startBreathingExercise();
        break;
      case 'show_progress':
        showProgressSummary();
        break;
      case 'stop':
        stopListening();
        break;
      default:
        break;
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window && selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setTranscription('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        saveAudioJournal(audioUrl);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const saveAudioJournal = (audioUrl) => {
    const newEntry = {
      id: Date.now(),
      audioUrl,
      date: new Date(),
      title: `Audio-Journal ${new Date().toLocaleDateString()}`,
      duration: 0, // Würde in echter Implementierung berechnet
      transcription: transcription || 'Transkription wird verarbeitet...'
    };
    
    setAudioJournals(prev => [newEntry, ...prev]);
  };

  const createAudioJournalEntry = (text) => {
    const newEntry = {
      id: Date.now(),
      text,
      date: new Date(),
      title: `Sprach-Eintrag ${new Date().toLocaleTimeString()}`,
      type: 'voice_note'
    };
    
    setAudioJournals(prev => [newEntry, ...prev]);
    speak('Dein Tagebucheintrag wurde gespeichert.');
  };

  const loadAudioJournals = () => {
    // Simuliere gespeicherte Audio-Journale
    setAudioJournals([
      {
        id: 1,
        title: 'Morgendliche Reflektion',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        duration: 180,
        transcription: 'Heute fühle ich mich dankbar für die kleinen Momente des Glücks...',
        type: 'audio'
      },
      {
        id: 2,
        title: 'Abendliche Gedanken',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        duration: 245,
        transcription: 'Der Tag war herausfordernd, aber ich habe viel gelernt...',
        type: 'audio'
      }
    ]);
  };

  const startGuidedMeditation = () => {
    const meditations = [
      {
        title: 'Atemmeditation',
        script: 'Setze dich bequem hin und schließe deine Augen. Atme langsam ein... und aus...',
        duration: 300
      },
      {
        title: 'Body Scan',
        script: 'Lass uns eine Reise durch deinen Körper machen. Beginne bei deinen Füßen...',
        duration: 600
      }
    ];
    
    const selectedMeditation = meditations[Math.floor(Math.random() * meditations.length)];
    setCurrentMeditation(selectedMeditation);
    speak(selectedMeditation.script);
  };

  const startBreathingExercise = () => {
    speak('Lass uns gemeinsam atmen. Atme vier Sekunden ein... halte für vier Sekunden... und atme vier Sekunden aus.');
    
    // Implementierung eines geführten Atemrhythmus
    let count = 0;
    const breathingInterval = setInterval(() => {
      if (count % 3 === 0) speak('Einatmen');
      else if (count % 3 === 1) speak('Halten');
      else speak('Ausatmen');
      
      count++;
      if (count >= 12) { // 4 Zyklen
        clearInterval(breathingInterval);
        speak('Ausgezeichnet. Du bist jetzt entspannter.');
      }
    }, 4000);
  };

  const showProgressSummary = () => {
    const summary = 'Diese Woche hast du 5 Meditationen abgeschlossen, 3 Dankbarkeitseinträge geschrieben und 2 Life-RPG Quests erfüllt. Du bist auf einem großartigen Weg!';
    speak(summary);
  };

  const renderVoiceControls = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        🎤 Sprachsteuerung
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Voice Commands */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sprachbefehle
          </h3>
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isListening ? stopListening : startListening}
              className={`w-full p-6 rounded-xl font-semibold text-lg transition-all ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <MicrophoneIcon className="w-8 h-8" />
                <span>{isListening ? 'Höre zu...' : 'Sprachsteuerung aktivieren'}</span>
              </div>
            </motion.button>
            
            {isListening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Du sagst:</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {transcription || 'Sage etwas...'}
                </p>
              </motion.div>
            )}
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Verfügbare Befehle:</h4>
            <div className="space-y-2 text-sm">
              {voiceCommands.slice(0, 4).map((cmd, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                    "{cmd.trigger[0]}"
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audio Recording */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Audio-Journal
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-full p-6 rounded-xl font-semibold text-lg transition-all ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              {isRecording ? (
                <StopIcon className="w-8 h-8" />
              ) : (
                <MicrophoneIcon className="w-8 h-8" />
              )}
              <span>{isRecording ? 'Aufnahme beenden' : 'Audio-Journal aufnehmen'}</span>
            </div>
          </motion.button>
          
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Letzte Einträge:</h4>
            <div className="space-y-2">
              {audioJournals.slice(0, 3).map((entry) => (
                <div key={entry.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                      {entry.title}
                    </h5>
                    <span className="text-xs text-gray-500">
                      {entry.date.toLocaleDateString()}
                    </span>
                  </div>
                  {entry.transcription && (
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                      {entry.transcription}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAudioLibrary = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        🎵 Audio-Bibliothek
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Geführte Meditationen */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-xl text-white">
          <MusicalNoteIcon className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-bold mb-2">Geführte Meditationen</h3>
          <p className="text-sm opacity-90 mb-4">
            KI-generierte, personalisierte Meditationsskripte
          </p>
          <div className="space-y-2">
            <div className="text-sm">• Atemmeditation (5-20 Min)</div>
            <div className="text-sm">• Body Scan (10-30 Min)</div>
            <div className="text-sm">• Achtsamkeit (5-15 Min)</div>
          </div>
          <button className="mt-4 w-full bg-white text-purple-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Meditation starten
          </button>
        </div>

        {/* Entspannungsmusik */}
        <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-xl text-white">
          <SpeakerWaveIcon className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-bold mb-2">Entspannungsmusik</h3>
          <p className="text-sm opacity-90 mb-4">
            Binaurale Beats und Naturklänge
          </p>
          <div className="space-y-2">
            <div className="text-sm">• Regengeräusche</div>
            <div className="text-sm">• Ozeanwellen</div>
            <div className="text-sm">• Binaurale Beats</div>
          </div>
          <button className="mt-4 w-full bg-white text-green-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Musik abspielen
          </button>
        </div>

        {/* Affirmationen */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-xl text-white">
          <DocumentTextIcon className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-bold mb-2">Personalisierte Affirmationen</h3>
          <p className="text-sm opacity-90 mb-4">
            KI-generierte, auf deine Ziele angepasste Affirmationen
          </p>
          <div className="space-y-2">
            <div className="text-sm">• Selbstvertrauen</div>
            <div className="text-sm">• Motivation</div>
            <div className="text-sm">• Dankbarkeit</div>
          </div>
          <button className="mt-4 w-full bg-white text-orange-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Affirmationen anhören
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🎤 Voice & Audio Integration
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Sprachgesteuerte Wellness-Erfahrungen und Audio-Journaling
        </p>
      </div>

      {/* Voice Controls */}
      {renderVoiceControls()}

      {/* Audio Library */}
      {renderAudioLibrary()}
    </div>
  );
};

export default VoiceAudioIntegration;
