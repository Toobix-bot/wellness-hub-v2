import { JournalEntry, JournalStats, PhilosophicalPerspective, InnerBattleChallenge, CulturalWisdom } from '@/types/journal';

// Philosophische Perspektiven aus verschiedenen Kulturen
export const philosophicalPerspectives: PhilosophicalPerspective[] = [
  {
    id: 'buddhist_dualism',
    culture: 'Buddhismus',
    tradition: 'Tibetanisch',
    concept: 'balance',
    title: 'Das Gleichgewicht von Samsara und Nirvana',
    description: 'Im Buddhismus gibt es kein absolutes Gut oder Böse, sondern Unwissenheit und Erleuchtung.',
    teachings: [
      'Leiden entsteht durch Anhaftung',
      'Der Mittlere Weg führt zur Befreiung',
      'Jeder Moment bietet die Chance zur Transformation'
    ],
    practices: ['Meditation der liebenden Güte', 'Achtsamkeits-Praxis', 'Reflexion über Vergänglichkeit'],
    avatar: '🧘‍♂️',
    color: 'from-orange-500 to-yellow-600'
  },
  {
    id: 'christian_duality',
    culture: 'Christentum',
    tradition: 'Mystik',
    concept: 'good_evil',
    title: 'Liebe conquert alles - Kampf zwischen Licht und Schatten',
    description: 'Die christliche Perspektive sieht den Kampf zwischen Gut und Böse als Teil der menschlichen Reise zu Gott.',
    teachings: [
      'Liebe deinen Nächsten wie dich selbst',
      'Vergebung befreit beide - den Geber und Empfänger',
      'In der Dunkelheit scheint das Licht am hellsten'
    ],
    practices: ['Gebet und Kontemplation', 'Werke der Barmherzigkeit', 'Selbstreflexion und Buße'],
    avatar: '✨',
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'taoist_harmony',
    culture: 'Taoismus',
    tradition: 'Chinesisch',
    concept: 'duality',
    title: 'Yin und Yang - Die Harmonie der Gegensätze',
    description: 'Taoismus lehrt, dass scheinbare Gegensätze in Wahrheit sich ergänzende Aspekte des Ganzen sind.',
    teachings: [
      'Im Yin liegt der Samen des Yang',
      'Widerstand verstärkt den Gegner',
      'Wu Wei - Handeln ohne Gewalt'
    ],
    practices: ['Tai Chi und Qigong', 'Naturbeobachtung', 'Fließende Meditation'],
    avatar: '☯️',
    color: 'from-gray-600 to-gray-800'
  },
  {
    id: 'islamic_submission',
    culture: 'Islam',
    tradition: 'Sufismus',
    concept: 'good_evil',
    title: 'Nafs und Ruh - Der innere Jihad',
    description: 'Der Islam spricht vom größeren Jihad - dem Kampf gegen das eigene niedere Selbst (Nafs).',
    teachings: [
      'Das Herz ist der Sitz der Spiritualität',
      'Geduld (Sabr) überwindet alle Schwierigkeiten',
      'In der Hingabe an Allah findet die Seele Frieden'
    ],
    practices: ['Dhikr (Gottesgedenken)', 'Selbstkontrolle und Fasten', 'Gemeinschaftsgebet'],
    avatar: '🌙',
    color: 'from-green-600 to-teal-700'
  },
  {
    id: 'hindu_dharma',
    culture: 'Hinduismus',
    tradition: 'Vedanta',
    concept: 'balance',
    title: 'Dharma und Karma - Die kosmische Ordnung',
    description: 'Hinduismus sieht Gut und Böse als Teil des kosmischen Spiels (Lila) der Gottheit.',
    teachings: [
      'Jede Handlung hat Konsequenzen (Karma)',
      'Dharma ist der rechtschaffene Weg',
      'Das Atman (Selbst) ist eins mit Brahman (Universum)'
    ],
    practices: ['Yoga und Pranayama', 'Mantra-Rezitation', 'Selbstlose Handlung (Seva)'],
    avatar: '🕉️',
    color: 'from-indigo-500 to-purple-700'
  },
  {
    id: 'shamanic_spirits',
    culture: 'Schamanismus',
    tradition: 'Universell',
    concept: 'duality',
    title: 'Geister und Schatten - Die Reise zwischen den Welten',
    description: 'Schamanische Traditionen verstehen die Welt als von Geistern durchdrungen, gute wie herausfordernde.',
    teachings: [
      'Jedes Wesen hat eine Seele',
      'Heilung geschieht durch Balance',
      'Die Natur ist unser größter Lehrer'
    ],
    practices: ['Trommel-Meditation', 'Naturrituale', 'Traumarbeit'],
    avatar: '🦅',
    color: 'from-emerald-500 to-green-700'
  }
];

// Innere Kämpfe - Gamifizierte Challenges
export const innerBattleChallenges: InnerBattleChallenge[] = [
  {
    id: 'anxiety_demon',
    name: 'Der Angst-Dämon',
    description: 'Ein zitterndes Wesen aus Sorgen und Was-wäre-wenn-Szenarien',
    difficulty: 'easy',
    opponent: {
      name: 'Anxietas',
      avatar: '😰',
      weaknesses: ['Atemtechniken', 'Achtsamkeit', 'Realitätscheck'],
      strengths: ['Zukunftsängste', 'Katastrophendenken', 'Körperliche Symptome']
    },
    weapons: [
      {
        name: 'Atemschild',
        type: 'mindfulness',
        power: 8,
        description: 'Tiefe Atemzüge schaffen einen Schutzwall gegen panische Gedanken'
      },
      {
        name: 'Realitätsschwert',
        type: 'wisdom',
        power: 9,
        description: 'Schneidet durch irrationale Ängste mit Fakten und Logik'
      }
    ],
    rewards: {
      xp: 50,
      insight: 'Angst ist ein Gefühl, nicht die Realität. Du hast mehr Kontrolle als du denkst.',
      unlockedContent: ['Atemmeditation', 'Angst-Tagebuch Template']
    }
  },
  {
    id: 'jealousy_shadow',
    name: 'Der Eifersucht-Schatten',
    description: 'Ein grünes Monster, das Vergleiche anstellt und Neid säht',
    difficulty: 'medium',
    opponent: {
      name: 'Invidia',
      avatar: '💚',
      weaknesses: ['Selbstliebe', 'Dankbarkeit', 'Mitgefühl'],
      strengths: ['Vergleiche', 'Minderwertigkeitsgefühle', 'Sozialer Druck']
    },
    weapons: [
      {
        name: 'Dankbarkeits-Aura',
        type: 'gratitude',
        power: 7,
        description: 'Verwandelt Neid in Wertschätzung für das eigene Leben'
      },
      {
        name: 'Selbstliebe-Licht',
        type: 'love',
        power: 10,
        description: 'Strahlendes Selbstvertrauen, das alle Vergleiche überflüssig macht'
      }
    ],
    rewards: {
      xp: 75,
      insight: 'Jeder läuft seinen eigenen Weg. Deine Reise ist einzigartig und wertvoll.',
      unlockedContent: ['Selbstliebe-Meditation', 'Dankbarkeits-Ritual']
    }
  },
  {
    id: 'anger_volcano',
    name: 'Der Wut-Vulkan',
    description: 'Ein brodelnder Berg aus unterdrückten Emotionen und Frustration',
    difficulty: 'hard',
    opponent: {
      name: 'Ira Igneus',
      avatar: '🌋',
      weaknesses: ['Geduld', 'Vergebung', 'Verstehen'],
      strengths: ['Rechthaberei', 'Verletzter Stolz', 'Unerfüllte Erwartungen']
    },
    weapons: [
      {
        name: 'Gedulds-Schild',
        type: 'mindfulness',
        power: 6,
        description: 'Lässt die heißen Emotionen an dir abprallen wie Wasser am Fels'
      },
      {
        name: 'Vergebungs-Welle',
        type: 'love',
        power: 12,
        description: 'Löscht selbst die heißesten Flammen mit heilender Liebe'
      }
    ],
    rewards: {
      xp: 100,
      insight: 'Wut ist ein Signal, aber nicht der Fahrer. Du kannst wählen, wie du reagierst.',
      unlockedContent: ['Wut-Transformation-Technik', 'Vergebungs-Meditation']
    }
  }
];

// Kulturelle Weisheiten
export const culturalWisdom: CulturalWisdom[] = [
  {
    id: 'japanese_ikigai',
    culture: 'Japan',
    category: 'philosophy',
    title: 'Ikigai - Der Grund des Seins',
    originalText: '生き甲斐',
    translation: 'Das, wofür es sich zu leben lohnt',
    context: 'Okinawa hat eine der höchsten Lebenserwartungen der Welt',
    modernApplication: 'Finde die Schnittmenge aus dem was du liebst, was du gut kannst, was die Welt braucht und womit du Geld verdienen kannst',
    practices: ['Morgen-Reflexion', 'Kleine tägliche Freuden', 'Sinn-orientierte Ziele'],
    aiAvatar: {
      name: 'Sensei Takeshi',
      personality: 'Weise, geduldig, humorvoll',
      appearance: '👴🏻'
    }
  },
  {
    id: 'danish_hygge',
    culture: 'Dänemark',
    category: 'daily_life',
    title: 'Hygge - Gemütliche Zufriedenheit',
    translation: 'Das Gefühl von Gemütlichkeit und Zufriedenheit',
    context: 'Dänemark zählt regelmäßig zu den glücklichsten Ländern der Welt',
    modernApplication: 'Schaffe bewusst Momente der Gemütlichkeit und Verbundenheit im Alltag',
    practices: ['Kerzen anzünden', 'Gemeinsame Mahlzeiten', 'Einfache Freuden schätzen'],
    aiAvatar: {
      name: 'Anna Hygge',
      personality: 'Warmherzig, entspannt, gesellig',
      appearance: '👩🏼'
    }
  },
  {
    id: 'ubuntu_philosophy',
    culture: 'Afrika (Bantu)',
    category: 'society',
    title: 'Ubuntu - Ich bin, weil wir sind',
    originalText: 'Ubuntu',
    translation: 'Menschlichkeit gegenüber anderen',
    context: 'Grundprinzip vieler afrikanischer Gesellschaften',
    modernApplication: 'Erkenne die Verbundenheit aller Menschen und handle entsprechend',
    practices: ['Gemeinschaftsarbeit', 'Teilen von Ressourcen', 'Kollektive Entscheidungen'],
    aiAvatar: {
      name: 'Nia Ubuntu',
      personality: 'Mitfühlend, gemeinschaftsorientiert, weise',
      appearance: '👩🏿'
    }
  }
];

// Journal Utility Functions
export const journalUtils = {
  // Berechne Wachstum der virtuellen Welt basierend auf Journal-Einträgen
  calculateWorldGrowth: (entries: JournalEntry[]): number => {
    return entries.reduce((total, entry) => {
      const moodBonus = entry.mood > 7 ? 2 : 1;
      const lengthBonus = entry.content.length > 200 ? 1.5 : 1;
      const reflectionBonus = entry.reflectionPrompts ? 2 : 1;
      
      return total + (10 * moodBonus * lengthBonus * reflectionBonus);
    }, 0);
  },

  // Generiere Reflexionsfragen basierend auf Stimmung
  generateReflectionPrompts: (mood: number): string[] => {
    if (mood <= 3) {
      return [
        'Was beschäftigt dich heute am meisten?',
        'Welche kleine Sache könnte dir heute helfen?',
        'Wer oder was gibt dir normalerweise Kraft?'
      ];
    } else if (mood <= 7) {
      return [
        'Was hat heute gut funktioniert?',
        'Wofür bist du heute dankbar?',
        'Was möchtest du morgen anders machen?'
      ];
    } else {
      return [
        'Was hat dir heute besonders viel Freude bereitet?',
        'Wie kannst du diese positive Energie teilen?',
        'Welche Erkenntnis möchtest du dir für schwierigere Tage merken?'
      ];
    }
  },

  // Analysiere Emotionsmuster
  analyzeEmotionPatterns: (entries: JournalEntry[]): any => {
    const emotionCounts: Record<string, number> = {};
    const moodTrends: number[] = [];
    
    entries.forEach(entry => {
      entry.emotions.forEach(emotion => {
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
      });
      moodTrends.push(entry.mood);
    });

    return {
      mostCommonEmotions: Object.entries(emotionCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([emotion, count]) => ({ emotion, count })),
      averageMood: moodTrends.reduce((a, b) => a + b, 0) / moodTrends.length,
      moodTrend: moodTrends.length > 1 ? 
        moodTrends[moodTrends.length - 1] - moodTrends[0] : 0
    };
  }
};
