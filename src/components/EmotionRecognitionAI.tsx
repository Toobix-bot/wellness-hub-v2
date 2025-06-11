'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCamera, 
  FaMicrophone, 
  FaEye, 
  FaHeart,
  FaBrain,
  FaSmile,
  FaFrown,
  FaMeh,
  FaAngry,
  FaSurprise,
  FaPlay,
  FaPause,
  FaStop,
  FaCog,
  FaShieldAlt,
  FaChartLine,
  FaLightbulb,
  FaCalendarAlt,
  FaDownload,
  FaUpload,
  FaUsers,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle
} from 'react-icons/fa';
import { 
  EmotionData, 
  FacialEmotionAnalysis, 
  VoiceEmotionAnalysis,
  EmotionPattern,
  EmotionBasedRecommendation,
  EmotionSession,
  RealTimeEmotionFeedback,
  EmotionPrivacySettings
} from '../types/emotionAI';

const EmotionRecognitionAI: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [analysisType, setAnalysisType] = useState<'facial' | 'voice' | 'combined'>('facial');
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null);
  const [sessionData, setSessionData] = useState<EmotionData[]>([]);
  const [realTimeFeedback, setRealTimeFeedback] = useState<RealTimeEmotionFeedback | null>(null);
  const [emotionPatterns, setEmotionPatterns] = useState<EmotionPattern[]>([]);
  const [recommendations, setRecommendations] = useState<EmotionBasedRecommendation[]>([]);
  const [privacySettings, setPrivacySettings] = useState<EmotionPrivacySettings>({
    enableFacialRecognition: false,
    enableVoiceAnalysis: false,
    dataRetentionDays: 30,
    shareWithTherapists: false,
    anonymizeData: true,
    localProcessingOnly: true,
    consentTimestamp: new Date(),
    gdprCompliant: true
  });
  const [activeTab, setActiveTab] = useState<'live' | 'patterns' | 'insights' | 'settings'>('live');
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [microphonePermission, setMicrophonePermission] = useState<'granted' | 'denied' | 'pending'>('pending');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Emotion-Icons Mapping
  const emotionIcons = {
    joy: FaSmile,
    sadness: FaFrown,
    anger: FaAngry,
    fear: FaExclamationTriangle,
    surprise: FaSurprise,
    disgust: FaFrown,
    neutral: FaMeh,
    contempt: FaAngry
  };

  // Emotion-Farben Mapping
  const emotionColors = {
    joy: 'text-yellow-500 bg-yellow-50',
    sadness: 'text-blue-500 bg-blue-50',
    anger: 'text-red-500 bg-red-50',
    fear: 'text-purple-500 bg-purple-50',
    surprise: 'text-orange-500 bg-orange-50',
    disgust: 'text-green-500 bg-green-50',
    neutral: 'text-gray-500 bg-gray-50',
    contempt: 'text-indigo-500 bg-indigo-50'
  };

  // Mock-Daten für Emotionsmuster
  const mockEmotionPatterns: EmotionPattern[] = [
    {
      id: 'pattern-1',
      userId: 'user-123',
      timeRange: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date()
      },
      patterns: {
        dominantEmotions: ['joy', 'neutral', 'sadness'],
        emotionalStability: 0.75,
        stressTriggers: ['arbeit', 'verkehr', 'nachrichten'],
        positivityTrend: 0.65,
        recoveryTime: 15
      },
      insights: {
        summary: 'Ihre emotionale Balance zeigt eine positive Tendenz mit gelegentlichen Stress-Episoden.',
        recommendations: [
          'Atemübungen bei Stress-Triggern',
          'Regelmäßige Meditation am Morgen',
          'Positive Affirmationen vor wichtigen Terminen'
        ],
        wellnessScore: 78
      }
    }
  ];

  useEffect(() => {
    setEmotionPatterns(mockEmotionPatterns);
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      // Kamera-Berechtigung prüfen
      if (analysisType === 'facial' || analysisType === 'combined') {
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraPermission('granted');
        cameraStream.getTracks().forEach(track => track.stop());
      }

      // Mikrofon-Berechtigung prüfen
      if (analysisType === 'voice' || analysisType === 'combined') {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophonePermission('granted');
        audioStream.getTracks().forEach(track => track.stop());
      }
    } catch (error) {
      console.error('Berechtigung verweigert:', error);
      setCameraPermission('denied');
      setMicrophonePermission('denied');
    }
  };

  const startAnalysis = async () => {
    if (!privacySettings.enableFacialRecognition && !privacySettings.enableVoiceAnalysis) {
      alert('Bitte aktivieren Sie mindestens eine Analysemethode in den Datenschutzeinstellungen.');
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {};
      
      if ((analysisType === 'facial' || analysisType === 'combined') && privacySettings.enableFacialRecognition) {
        constraints.video = true;
      }
      
      if ((analysisType === 'voice' || analysisType === 'combined') && privacySettings.enableVoiceAnalysis) {
        constraints.audio = true;
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current && constraints.video) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      if (constraints.audio) {
        setupAudioAnalysis(stream);
      }

      setIsActive(true);
      startEmotionDetection();
    } catch (error) {
      console.error('Fehler beim Starten der Analyse:', error);
    }
  };

  const stopAnalysis = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    setIsActive(false);
    setCurrentEmotion(null);
    setRealTimeFeedback(null);
  };

  const setupAudioAnalysis = (stream: MediaStream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    
    analyser.fftSize = 2048;
    source.connect(analyser);
    
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
  };

  const startEmotionDetection = () => {
    // Simulierte Emotionserkennung
    const detectionInterval = setInterval(() => {
      if (!isActive) {
        clearInterval(detectionInterval);
        return;
      }

      // Mock-Emotionsdaten generieren
      const mockEmotion: EmotionData = {
        timestamp: Date.now(),
        emotions: {
          joy: Math.random() * 0.8,
          sadness: Math.random() * 0.3,
          anger: Math.random() * 0.2,
          fear: Math.random() * 0.25,
          surprise: Math.random() * 0.4,
          disgust: Math.random() * 0.15,
          neutral: Math.random() * 0.6,
          contempt: Math.random() * 0.1
        },
        confidence: 0.85 + Math.random() * 0.1,
        dominantEmotion: ['joy', 'neutral', 'sadness', 'surprise'][Math.floor(Math.random() * 4)]
      };

      setCurrentEmotion(mockEmotion);
      setSessionData(prev => [...prev.slice(-50), mockEmotion]);

      // Echtzeit-Feedback generieren
      generateRealTimeFeedback(mockEmotion);
    }, 1000);
  };

  const generateRealTimeFeedback = (emotion: EmotionData) => {
    const feedback: RealTimeEmotionFeedback = {
      currentEmotion: emotion.dominantEmotion,
      intensity: Math.max(...Object.values(emotion.emotions)),
      confidence: emotion.confidence,
      suggestions: {
        immediate: getFeedbackSuggestions(emotion.dominantEmotion),
        breathing: emotion.dominantEmotion === 'anger' || emotion.dominantEmotion === 'fear',
        posture: emotion.dominantEmotion === 'sadness',
        environment: emotion.dominantEmotion === 'fear' || emotion.dominantEmotion === 'anger'
      },
      trendAnalysis: {
        improving: emotion.dominantEmotion === 'joy',
        stable: emotion.dominantEmotion === 'neutral',
        declining: ['sadness', 'anger', 'fear'].includes(emotion.dominantEmotion),
        timeFrame: '5 Minuten'
      }
    };

    setRealTimeFeedback(feedback);
  };

  const getFeedbackSuggestions = (emotion: string): string[] => {
    const suggestions = {
      joy: ['Genießen Sie diesen Moment!', 'Teilen Sie Ihre Freude mit anderen'],
      sadness: ['Führen Sie eine Atemübung durch', 'Hören Sie beruhigende Musik'],
      anger: ['Zählen Sie bis 10', 'Verlassen Sie kurz den Raum'],
      fear: ['Erden Sie sich mit 5-4-3-2-1 Technik', 'Atmen Sie tief durch'],
      surprise: ['Nehmen Sie sich einen Moment', 'Verarbeiten Sie das Erlebte'],
      neutral: ['Bleiben Sie achtsam', 'Setzen Sie eine positive Intention']
    };

    return suggestions[emotion as keyof typeof suggestions] || ['Bleiben Sie aufmerksam'];
  };

  const getEmotionIntensity = (emotion: string, emotions: EmotionData['emotions']) => {
    return Math.round(emotions[emotion as keyof typeof emotions] * 100);
  };

  const renderLiveAnalysis = () => (
    <div className="space-y-6">
      {/* Video/Audio Stream */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Live-Analyse</h3>
          <div className="flex space-x-2">
            {!isActive ? (
              <button
                onClick={startAnalysis}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaPlay className="inline w-4 h-4 mr-2" />
                Starten
              </button>
            ) : (
              <button
                onClick={stopAnalysis}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaStop className="inline w-4 h-4 mr-2" />
                Stoppen
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Feed */}
          {(analysisType === 'facial' || analysisType === 'combined') && (
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-64 bg-gray-900 rounded-lg object-cover"
                autoPlay
                muted
                playsInline
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />
              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-lg">
                  <FaCamera className="w-12 h-12 text-white opacity-50" />
                </div>
              )}
            </div>
          )}

          {/* Audio Visualization */}
          {(analysisType === 'voice' || analysisType === 'combined') && (
            <div className="relative">
              <div className="w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="flex space-x-1 items-end">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-green-500 w-2 rounded-t"
                      style={{
                        height: `${Math.random() * 100 + 20}px`,
                        animation: isActive ? `pulse 0.5s infinite ${i * 0.1}s` : 'none'
                      }}
                    />
                  ))}
                </div>
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-lg">
                    <FaMicrophone className="w-12 h-12 text-white opacity-50" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Emotion Display */}
      {currentEmotion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4">Aktuelle Emotion</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(currentEmotion.emotions).map(([emotion, value]) => {
              const IconComponent = emotionIcons[emotion as keyof typeof emotionIcons];
              const intensity = Math.round(value * 100);
              
              return (
                <div
                  key={emotion}
                  className={`p-4 rounded-lg border ${
                    emotion === currentEmotion.dominantEmotion
                      ? 'border-indigo-300 bg-indigo-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <IconComponent className={`w-5 h-5 ${emotionColors[emotion as keyof typeof emotionColors]?.split(' ')[0] || 'text-gray-500'}`} />
                    <span className="text-sm font-medium capitalize">{emotion}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${intensity}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{intensity}%</div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Dominante Emotion:</span>
              <div className="flex items-center space-x-2">
                {React.createElement(
                  emotionIcons[currentEmotion.dominantEmotion as keyof typeof emotionIcons],
                  { className: 'w-5 h-5 text-indigo-600' }
                )}
                <span className="font-semibold capitalize">{currentEmotion.dominantEmotion}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span>Vertrauen:</span>
              <span className="font-medium">{Math.round(currentEmotion.confidence * 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Real-time Feedback */}
      {realTimeFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaLightbulb className="w-5 h-5 mr-2 text-yellow-500" />
            Echtzeit-Empfehlungen
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Sofortige Maßnahmen:</h4>
              <ul className="space-y-2">
                {realTimeFeedback.suggestions.immediate.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <FaCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-3">
              {realTimeFeedback.suggestions.breathing && (
                <div className="flex items-center space-x-2 text-sm">
                  <FaHeart className="w-4 h-4 text-red-500" />
                  <span>Atemübung empfohlen</span>
                </div>
              )}
              {realTimeFeedback.suggestions.posture && (
                <div className="flex items-center space-x-2 text-sm">
                  <FaUsers className="w-4 h-4 text-blue-500" />
                  <span>Körperhaltung anpassen</span>
                </div>
              )}
              {realTimeFeedback.suggestions.environment && (
                <div className="flex items-center space-x-2 text-sm">
                  <FaInfoCircle className="w-4 h-4 text-purple-500" />
                  <span>Umgebung optimieren</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderEmotionPatterns = () => (
    <div className="space-y-6">
      {emotionPatterns.map((pattern) => (
        <motion.div
          key={pattern.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Emotionsmuster</h3>
            <div className="text-sm text-gray-500">
              {pattern.timeRange.start.toLocaleDateString()} - {pattern.timeRange.end.toLocaleDateString()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Emotionale Stabilität</h4>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(pattern.patterns.emotionalStability * 100)}%
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Positivitätstrend</h4>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(pattern.patterns.positivityTrend * 100)}%
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Wellness-Score</h4>
              <div className="text-2xl font-bold text-purple-600">
                {pattern.insights.wellnessScore}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-3">Erkenntnisse</h4>
            <p className="text-gray-700 mb-4">{pattern.insights.summary}</p>
            
            <h5 className="font-medium mb-2">Empfehlungen:</h5>
            <ul className="space-y-1">
              {pattern.insights.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <FaCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-6">Datenschutz & Einstellungen</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-4">Analysemethoden</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={privacySettings.enableFacialRecognition}
                onChange={(e) => setPrivacySettings(prev => ({
                  ...prev,
                  enableFacialRecognition: e.target.checked
                }))}
                className="w-4 h-4 text-indigo-600"
              />
              <span>Gesichtserkennung aktivieren</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={privacySettings.enableVoiceAnalysis}
                onChange={(e) => setPrivacySettings(prev => ({
                  ...prev,
                  enableVoiceAnalysis: e.target.checked
                }))}
                className="w-4 h-4 text-indigo-600"
              />
              <span>Sprachanalyse aktivieren</span>
            </label>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4">Datenschutz</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={privacySettings.localProcessingOnly}
                onChange={(e) => setPrivacySettings(prev => ({
                  ...prev,
                  localProcessingOnly: e.target.checked
                }))}
                className="w-4 h-4 text-indigo-600"
              />
              <span>Nur lokale Verarbeitung</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={privacySettings.anonymizeData}
                onChange={(e) => setPrivacySettings(prev => ({
                  ...prev,
                  anonymizeData: e.target.checked
                }))}
                className="w-4 h-4 text-indigo-600"
              />
              <span>Daten anonymisieren</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Datenaufbewahrung (Tage)
          </label>
          <input
            type="number"
            value={privacySettings.dataRetentionDays}
            onChange={(e) => setPrivacySettings(prev => ({
              ...prev,
              dataRetentionDays: parseInt(e.target.value)
            }))}
            className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
            min="1"
            max="365"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            KI-gestützte Emotionserkennung
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Verstehen Sie Ihre Emotionen besser mit fortschrittlicher KI-Technologie 
            für Gesichts- und Stimmerkennung.
          </p>
        </div>

        {/* Analysis Type Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {[
              { id: 'facial', label: 'Gesichtserkennung', icon: FaEye },
              { id: 'voice', label: 'Stimmerkennung', icon: FaMicrophone },
              { id: 'combined', label: 'Kombiniert', icon: FaBrain }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setAnalysisType(id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  analysisType === id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="inline w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {[
              { id: 'live', label: 'Live-Analyse', icon: FaPlay },
              { id: 'patterns', label: 'Muster', icon: FaChartLine },
              { id: 'insights', label: 'Erkenntnisse', icon: FaLightbulb },
              { id: 'settings', label: 'Einstellungen', icon: FaCog }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="inline w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'live' && renderLiveAnalysis()}
          {activeTab === 'patterns' && renderEmotionPatterns()}
          {activeTab === 'insights' && (
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <FaChartLine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Erkenntnisse werden generiert</h3>
              <p className="text-gray-600">Sammeln Sie mehr Daten für detaillierte Insights.</p>
            </div>
          )}
          {activeTab === 'settings' && renderSettings()}
        </AnimatePresence>

        {/* Privacy Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <FaShieldAlt className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Datenschutz-Hinweis</h4>
              <p className="text-sm text-blue-800">
                Alle Emotionsdaten werden lokal auf Ihrem Gerät verarbeitet und nicht an externe Server übertragen. 
                Sie haben jederzeit die volle Kontrolle über Ihre Daten und können diese löschen.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
      `}</style>
    </div>
  );
};

export default EmotionRecognitionAI;
