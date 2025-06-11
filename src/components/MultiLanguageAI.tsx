'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGlobe, 
  FaLanguage, 
  FaVolumeUp, 
  FaMicrophone,
  FaRobot,
  FaUsers,
  FaChartLine,
  FaCog,
  FaDownload,
  FaCloudDownloadAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHeart,
  FaStar,
  FaFlag,
  FaHeadphones,
  FaKeyboard,
  FaEye,
  FaAccessibleIcon,
  FaBook,
  FaGraduationCap,
  FaCertificate,
  FaHandPaper
} from 'react-icons/fa';
import { 
  Language, 
  CulturalAdaptation, 
  AITranslationEngine,
  VoiceLocalization,
  MultiLanguageSession,
  LanguageAnalytics,
  LanguagePreferences,
  LocalizationRequest,
  LocalizationResponse
} from '../types/multiLanguage';

const MultiLanguageAI: React.FC = () => {
  const [supportedLanguages, setSupportedLanguages] = useState<Language[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<string>('de');
  const [userPreferences, setUserPreferences] = useState<LanguagePreferences | null>(null);
  const [activeTab, setActiveTab] = useState<'languages' | 'translation' | 'voice' | 'cultural' | 'analytics'>('languages');
  const [translationEngine, setTranslationEngine] = useState<AITranslationEngine | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationDemo, setTranslationDemo] = useState<LocalizationResponse | null>(null);
  const [voiceSupport, setVoiceSupport] = useState<VoiceLocalization[]>([]);
  const [culturalAdaptations, setCulturalAdaptations] = useState<CulturalAdaptation[]>([]);
  const [analytics, setAnalytics] = useState<LanguageAnalytics | null>(null);

  // 50+ unterstützte Sprachen
  const mockLanguages: Language[] = [
    // Europäische Sprachen
    { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪', rtl: false, enabled: true },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', rtl: false, enabled: true },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', rtl: false, enabled: true },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', rtl: false, enabled: true },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', rtl: false, enabled: true },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', rtl: false, enabled: true },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', rtl: false, enabled: true },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', rtl: false, enabled: true },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', rtl: false, enabled: true },
    { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', rtl: false, enabled: true },
    { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', rtl: false, enabled: true },
    { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', rtl: false, enabled: true },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', rtl: false, enabled: true },
    { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', rtl: false, enabled: true },
    { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', rtl: false, enabled: true },
    { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', rtl: false, enabled: true },
    { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', rtl: false, enabled: true },
    { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', rtl: false, enabled: true },
    { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', rtl: false, enabled: true },
    { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮', rtl: false, enabled: true },

    // Asiatische Sprachen
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', rtl: false, enabled: true },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', rtl: false, enabled: true },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', rtl: false, enabled: true },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', rtl: false, enabled: true },
    { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', rtl: false, enabled: true },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', rtl: false, enabled: true },
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', rtl: false, enabled: true },
    { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', rtl: false, enabled: true },
    { code: 'tl', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', rtl: false, enabled: true },

    // Mittlerer Osten & Afrika
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true, enabled: true },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', rtl: true, enabled: true },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', rtl: true, enabled: true },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', rtl: false, enabled: true },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', rtl: false, enabled: true },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', rtl: false, enabled: true },

    // Weitere wichtige Sprachen
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', rtl: false, enabled: true },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', rtl: true, enabled: true },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇱🇰', rtl: false, enabled: true },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', rtl: false, enabled: true },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', rtl: false, enabled: true },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', rtl: false, enabled: true },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', rtl: false, enabled: true },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', rtl: false, enabled: true },

    // Lateinamerikanische Sprachen
    { code: 'pt-br', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷', rtl: false, enabled: true },
    { code: 'es-mx', name: 'Spanish (Mexico)', nativeName: 'Español (México)', flag: '🇲🇽', rtl: false, enabled: true },
    { code: 'es-ar', name: 'Spanish (Argentina)', nativeName: 'Español (Argentina)', flag: '🇦🇷', rtl: false, enabled: true },

    // Afrikanische Sprachen
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬', rtl: false, enabled: true },
    { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬', rtl: false, enabled: true },
    { code: 'ha', name: 'Hausa', nativeName: 'هَوُسَ', flag: '🇳🇬', rtl: false, enabled: true },
    { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦', rtl: false, enabled: true },
    { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', flag: '🇿🇦', rtl: false, enabled: true },
    { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦', rtl: false, enabled: true },

    // Pazifische Sprachen
    { code: 'mi', name: 'Māori', nativeName: 'Te Reo Māori', flag: '🇳🇿', rtl: false, enabled: true },
    { code: 'sm', name: 'Samoan', nativeName: 'Gagana Samoa', flag: '🇼🇸', rtl: false, enabled: true }
  ];

  const mockTranslationEngine: AITranslationEngine = {
    id: 'wellness-ai-translator',
    name: 'Wellness AI Translator',
    provider: 'custom',
    supportedLanguages: mockLanguages.map(l => l.code),
    accuracy: 0.96,
    culturalAwareness: 0.89,
    wellnessSpecialization: 0.94,
    realTimeCapability: true,
    offlineCapability: true
  };

  const mockAnalytics: LanguageAnalytics = {
    usage: [
      { languageCode: 'de', sessionCount: 15420, duration: 892000, userCount: 3240, engagement: 0.87 },
      { languageCode: 'en', sessionCount: 12890, duration: 756000, userCount: 2890, engagement: 0.82 },
      { languageCode: 'es', sessionCount: 8940, duration: 534000, userCount: 1890, engagement: 0.79 },
      { languageCode: 'fr', sessionCount: 6780, duration: 445000, userCount: 1560, engagement: 0.75 },
      { languageCode: 'zh', sessionCount: 5670, duration: 387000, userCount: 1230, engagement: 0.88 }
    ],
    translationMetrics: {
      requestCount: 89450,
      successRate: 0.97,
      averageQuality: 0.92,
      userSatisfaction: 0.89
    },
    culturalInsights: {
      preferredContent: {
        'de': ['meditation', 'stress-management', 'mindfulness'],
        'en': ['fitness', 'mental-health', 'productivity'],
        'zh': ['traditional-medicine', 'qi-gong', 'meditation'],
        'ja': ['zen', 'mindfulness', 'nature-therapy']
      },
      engagementPatterns: {
        'de': 0.87,
        'en': 0.82,
        'es': 0.79,
        'fr': 0.75
      },
      dropoffPoints: {
        'complex-terminology': ['therapy-sessions', 'medical-content'],
        'cultural-mismatch': ['western-practices', 'religious-content']
      }
    }
  };

  useEffect(() => {
    setSupportedLanguages(mockLanguages);
    setTranslationEngine(mockTranslationEngine);
    setAnalytics(mockAnalytics);

    // Mock-Benutzereinstellungen
    setUserPreferences({
      userId: 'user-123',
      primaryLanguage: 'de',
      fallbackLanguages: ['en', 'es'],
      autoDetectLanguage: true,
      translateUserContent: true,
      voiceLanguage: 'de',
      textToSpeechEnabled: true,
      speechToTextEnabled: true,
      culturalAdaptationLevel: 'moderate',
      qualityPreference: 'balance'
    });
  }, []);

  const performTranslation = async (text: string, targetLanguage: string) => {
    setIsTranslating(true);
    
    // Simuliere KI-Übersetzung
    setTimeout(() => {
      const mockResponse: LocalizationResponse = {
        translatedText: getTranslatedText(text, targetLanguage),
        confidence: 0.92 + Math.random() * 0.08,
        alternatives: [
          getTranslatedText(text, targetLanguage, 'alternative1'),
          getTranslatedText(text, targetLanguage, 'alternative2')
        ],
        culturalNotes: getCulturalNotes(targetLanguage),
        qualityScore: 0.89 + Math.random() * 0.1,
        processingTime: 150 + Math.random() * 100,
        cached: Math.random() > 0.7
      };
      
      setTranslationDemo(mockResponse);
      setIsTranslating(false);
    }, 1500);
  };

  const getTranslatedText = (text: string, lang: string, variant?: string): string => {
    const translations: Record<string, Record<string, string>> = {
      'Willkommen zu Ihrer Wellness-Reise': {
        'en': 'Welcome to your wellness journey',
        'es': 'Bienvenido a tu viaje de bienestar',
        'fr': 'Bienvenue dans votre parcours de bien-être',
        'zh': '欢迎来到您的健康之旅',
        'ja': 'ウェルネスの旅へようこそ',
        'ar': 'مرحباً بك في رحلة العافية الخاصة بك'
      }
    };
    
    return translations[text]?.[lang] || `[${lang}] ${text}`;
  };

  const getCulturalNotes = (lang: string): string[] => {
    const notes: Record<string, string[]> = {
      'zh': ['考虑传统中医理念', '注重和谐与平衡的概念'],
      'ja': ['融入禅宗思想', '重视自然与内心的连接'],
      'ar': ['考虑伊斯兰健康观念', '注意性别相关的文化敏感性'],
      'hi': ['融入阿育吠陀传统', '考虑瑜伽和冥想的文化背景']
    };
    
    return notes[lang] || ['Kulturelle Anpassung für bessere Benutzerfreundlichkeit'];
  };

  const renderLanguageGrid = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Unterstützte Sprachen ({supportedLanguages.length})</h3>
        <div className="flex space-x-2">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <FaDownload className="inline w-4 h-4 mr-2" />
            Offline-Pakete
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <FaCloudDownloadAlt className="inline w-4 h-4 mr-2" />
            Cloud-Sync
          </button>
        </div>
      </div>

      {/* Regionale Gruppierung */}
      {[
        { region: 'Europa', languages: supportedLanguages.filter(l => ['de', 'en', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'no', 'da', 'fi', 'pl', 'ru', 'cs', 'hu', 'ro', 'bg', 'hr', 'sk', 'sl'].includes(l.code)) },
        { region: 'Asien-Pazifik', languages: supportedLanguages.filter(l => ['zh', 'ja', 'ko', 'hi', 'th', 'vi', 'id', 'ms', 'tl', 'bn', 'ta', 'te', 'ml', 'kn', 'gu', 'pa', 'mi', 'sm'].includes(l.code)) },
        { region: 'Mittlerer Osten & Afrika', languages: supportedLanguages.filter(l => ['ar', 'he', 'fa', 'tr', 'sw', 'am', 'ur', 'yo', 'ig', 'ha', 'zu', 'xh', 'af'].includes(l.code)) },
        { region: 'Lateinamerika', languages: supportedLanguages.filter(l => ['pt-br', 'es-mx', 'es-ar'].includes(l.code)) }
      ].map(({ region, languages }) => (
        <div key={region} className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-semibold mb-4">{region}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {languages.map((language) => (
              <motion.div
                key={language.code}
                layout
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  currentLanguage === language.code
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-25'
                }`}
                onClick={() => setCurrentLanguage(language.code)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{language.name}</div>
                    <div className="text-sm text-gray-600">{language.nativeName}</div>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    {language.enabled ? (
                      <FaCheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <FaExclamationTriangle className="w-4 h-4 text-yellow-500" />
                    )}
                    {language.rtl && (
                      <FaHandPaper className="w-3 h-3 text-blue-500" title="Right-to-Left" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTranslationDemo = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-6">KI-Übersetzung Live-Demo</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quelltext (Deutsch)
            </label>
            <textarea
              defaultValue="Willkommen zu Ihrer Wellness-Reise"
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Geben Sie Text zur Übersetzung ein..."
            />
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zielsprache
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={(e) => performTranslation("Willkommen zu Ihrer Wellness-Reise", e.target.value)}
              >
                <option value="">Sprache wählen...</option>
                {supportedLanguages.filter(l => l.code !== 'de').map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Übersetzung
            </label>
            <div className="h-32 p-3 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
              {isTranslating ? (
                <div className="flex items-center space-x-2">
                  <FaRobot className="w-5 h-5 text-indigo-600 animate-spin" />
                  <span>KI übersetzt...</span>
                </div>
              ) : translationDemo ? (
                <div className="w-full">
                  <div className="font-medium text-gray-900 mb-2">
                    {translationDemo.translatedText}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Vertrauen: {Math.round(translationDemo.confidence * 100)}%</span>
                    <span>Qualität: {Math.round(translationDemo.qualityScore * 100)}%</span>
                    <span>{translationDemo.processingTime}ms</span>
                  </div>
                </div>
              ) : (
                <span className="text-gray-500">Wählen Sie eine Zielsprache</span>
              )}
            </div>

            {translationDemo && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternative Übersetzungen
                </label>
                <div className="space-y-2">
                  {translationDemo.alternatives.map((alt, index) => (
                    <div key={index} className="p-2 bg-gray-100 rounded text-sm">
                      {alt}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {translationDemo && translationDemo.culturalNotes.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Kulturelle Hinweise</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              {translationDemo.culturalNotes.map((note, index) => (
                <li key={index}>• {note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Translation Engine Info */}
      {translationEngine && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">KI-Übersetzungsmodul</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {Math.round(translationEngine.accuracy * 100)}%
              </div>
              <div className="text-sm text-gray-600">Genauigkeit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(translationEngine.culturalAwareness * 100)}%
              </div>
              <div className="text-sm text-gray-600">Kulturelles Bewusstsein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(translationEngine.wellnessSpecialization * 100)}%
              </div>
              <div className="text-sm text-gray-600">Wellness-Spezialisierung</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {supportedLanguages.length}
              </div>
              <div className="text-sm text-gray-600">Sprachen</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {analytics && (
        <>
          {/* Usage Statistics */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Nutzungsstatistiken</h3>
            <div className="space-y-4">
              {analytics.usage.map((usage) => {
                const language = supportedLanguages.find(l => l.code === usage.languageCode);
                return (
                  <div key={usage.languageCode} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{language?.flag}</span>
                      <div>
                        <div className="font-medium">{language?.name}</div>
                        <div className="text-sm text-gray-600">
                          {usage.userCount.toLocaleString()} Benutzer
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold">{usage.sessionCount.toLocaleString()}</div>
                        <div className="text-gray-600">Sessions</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{Math.round(usage.duration / 60000)} Min</div>
                        <div className="text-gray-600">Gesamt</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{Math.round(usage.engagement * 100)}%</div>
                        <div className="text-gray-600">Engagement</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Translation Metrics */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Übersetzungsmetriken</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">
                  {analytics.translationMetrics.requestCount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Anfragen gesamt</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round(analytics.translationMetrics.successRate * 100)}%
                </div>
                <div className="text-sm text-gray-600">Erfolgsrate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round(analytics.translationMetrics.averageQuality * 100)}%
                </div>
                <div className="text-sm text-gray-600">Durchschnittliche Qualität</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {Math.round(analytics.translationMetrics.userSatisfaction * 100)}%
                </div>
                <div className="text-sm text-gray-600">Benutzerzufriedenheit</div>
              </div>
            </div>
          </div>

          {/* Cultural Insights */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Kulturelle Erkenntnisse</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Bevorzugte Inhalte nach Region</h4>
                <div className="space-y-3">
                  {Object.entries(analytics.culturalInsights.preferredContent).map(([lang, content]) => {
                    const language = supportedLanguages.find(l => l.code === lang);
                    return (
                      <div key={lang} className="flex items-start space-x-3">
                        <span className="text-lg">{language?.flag}</span>
                        <div>
                          <div className="font-medium">{language?.name}</div>
                          <div className="text-sm text-gray-600">
                            {content.join(', ')}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Engagement-Muster</h4>
                <div className="space-y-2">
                  {Object.entries(analytics.culturalInsights.engagementPatterns).map(([lang, engagement]) => {
                    const language = supportedLanguages.find(l => l.code === lang);
                    return (
                      <div key={lang} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span>{language?.flag}</span>
                          <span className="text-sm">{language?.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${engagement * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {Math.round(engagement * 100)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Multi-Language AI System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Barrieren überwinden mit intelligenter Übersetzung und kultureller Anpassung 
            für über 50 Sprachen weltweit.
          </p>
        </div>

        {/* Current Language Display */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-4">
              <FaGlobe className="w-6 h-6 text-indigo-600" />
              <div>
                <div className="text-sm text-gray-600">Aktuelle Sprache</div>
                <div className="font-semibold">
                  {supportedLanguages.find(l => l.code === currentLanguage)?.flag}{' '}
                  {supportedLanguages.find(l => l.code === currentLanguage)?.name}
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FaCheckCircle className="w-4 h-4 text-green-500" />
                <span>KI-Übersetzung aktiv</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {[
              { id: 'languages', label: 'Sprachen', icon: FaLanguage },
              { id: 'translation', label: 'KI-Übersetzung', icon: FaRobot },
              { id: 'voice', label: 'Sprache & Audio', icon: FaVolumeUp },
              { id: 'cultural', label: 'Kulturell', icon: FaFlag },
              { id: 'analytics', label: 'Analyse', icon: FaChartLine }
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
          {activeTab === 'languages' && renderLanguageGrid()}
          {activeTab === 'translation' && renderTranslationDemo()}
          {activeTab === 'voice' && (
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <FaVolumeUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sprach- & Audio-Features</h3>
              <p className="text-gray-600">Mehrsprachige Text-zu-Sprache und Sprach-zu-Text Integration.</p>
            </div>
          )}
          {activeTab === 'cultural' && (
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <FaFlag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Kulturelle Anpassungen</h3>
              <p className="text-gray-600">Intelligente kulturelle Lokalisierung für authentische Benutzererfahrungen.</p>
            </div>
          )}
          {activeTab === 'analytics' && renderAnalytics()}
        </AnimatePresence>

        {/* Global Language Stats */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-6">Globale Reichweite</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600">{supportedLanguages.length}</div>
              <div className="text-gray-600">Unterstützte Sprachen</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">195</div>
              <div className="text-gray-600">Länder erreicht</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">7.8B</div>
              <div className="text-gray-600">Menschen weltweit</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">96%</div>
              <div className="text-gray-600">Weltbevölkerung abgedeckt</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiLanguageAI;
