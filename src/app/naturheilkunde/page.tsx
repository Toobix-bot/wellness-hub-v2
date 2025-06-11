'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NaturalRemedy {
  id: string;
  name: string;
  scientificName?: string;
  category: 'kraeuter' | 'oele' | 'mineralien' | 'nahrung' | 'therapien' | 'bewegung';
  uses: string[];
  benefits: string[];
  preparation: string[];
  dosage: string;
  precautions: string[];
  contraindications: string[];
  evidence: 'hoch' | 'mittel' | 'niedrig';
  sources: string[];
  image?: string;
  rating: number;
  reviews: Review[];
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface HealthCondition {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  conventionalTreatment: string[];
  naturalOptions: string[];
  lifestyle: string[];
  prevention: string[];
}

export default function NaturheilkundePage() {
  const [activeTab, setActiveTab] = useState<'browse' | 'conditions' | 'favorites' | 'quiz'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('alle');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRemedy, setSelectedRemedy] = useState<NaturalRemedy | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Kategorien
  const categories = [
    { id: 'alle', name: 'Alle', icon: '🌿', color: 'from-green-500 to-emerald-600' },
    { id: 'kraeuter', name: 'Heilkräuter', icon: '🌱', color: 'from-green-500 to-teal-600' },
    { id: 'oele', name: 'Ätherische Öle', icon: '🧴', color: 'from-purple-500 to-indigo-600' },
    { id: 'mineralien', name: 'Mineralien', icon: '💎', color: 'from-blue-500 to-cyan-600' },
    { id: 'nahrung', name: 'Heilnahrung', icon: '🥗', color: 'from-orange-500 to-red-600' },
    { id: 'therapien', name: 'Therapien', icon: '🤲', color: 'from-pink-500 to-rose-600' },
    { id: 'bewegung', name: 'Bewegung', icon: '🧘‍♀️', color: 'from-indigo-500 to-purple-600' }
  ];

  // Natürliche Heilmittel Datenbank
  const naturalRemedies: NaturalRemedy[] = [
    {
      id: '1',
      name: 'Kurkuma',
      scientificName: 'Curcuma longa',
      category: 'kraeuter',
      uses: ['Entzündungen', 'Verdauungsprobleme', 'Gelenkschmerzen', 'Immunsystem'],
      benefits: [
        'Starke entzündungshemmende Eigenschaften',
        'Antioxidative Wirkung',
        'Unterstützt die Verdauung',
        'Kann Cholesterinspiegel senken',
        'Fördert die Wundheilung'
      ],
      preparation: [
        'Als Tee: 1 TL Kurkumapulver in heißer Milch oder Wasser',
        'Als Gewürz in Speisen',
        'Kurkuma-Paste für äußerliche Anwendung',
        'Kurkuma-Kapseln nach Packungsangabe'
      ],
      dosage: '1-3g täglich, am besten mit schwarzem Pfeffer für bessere Aufnahme',
      precautions: [
        'Bei Gallensteinleiden vorsichtig verwenden',
        'Kann blutverdünnende Wirkung haben',
        'In der Schwangerschaft nur in normalen Mengen als Gewürz'
      ],
      contraindications: [
        'Gallensteine',
        'Schwere Blutgerinnungsstörungen',
        'Vor Operationen absetzen'
      ],
      evidence: 'hoch',
      sources: [
        'Journal of Medicinal Food (2017)',
        'Anti-inflammatory and Antioxidant Properties of Curcumin',
        'European Journal of Pharmacology (2019)'
      ],
      rating: 4.7,
      reviews: [
        {
          id: '1',
          author: 'Maria K.',
          rating: 5,
          comment: 'Hat mir sehr bei Gelenkschmerzen geholfen. Nehme es täglich als Tee.',
          date: new Date().toISOString(),
          helpful: 12
        }
      ]
    },
    {
      id: '2',
      name: 'Lavendel',
      scientificName: 'Lavandula angustifolia',
      category: 'oele',
      uses: ['Schlafstörungen', 'Angst', 'Stress', 'Hautprobleme', 'Kopfschmerzen'],
      benefits: [
        'Beruhigende und entspannende Wirkung',
        'Verbessert die Schlafqualität',
        'Reduziert Angst und Stress',
        'Antiseptische Eigenschaften',
        'Hilft bei Hautreizungen'
      ],
      preparation: [
        'Ätherisches Öl: 2-3 Tropfen in Diffuser',
        'Lavendeltee: 1-2 TL getrocknete Blüten',
        'Lavendelöl verdünnt auf die Haut',
        'Duftsäckchen unter das Kopfkissen'
      ],
      dosage: 'Äußerlich: 1-2 Tropfen verdünnt, Innerlich: als Tee 1-3 Tassen täglich',
      precautions: [
        'Ätherisches Öl immer verdünnt verwenden',
        'Kann bei empfindlicher Haut Reizungen verursachen',
        'Nicht für Kleinkinder unter 2 Jahren'
      ],
      contraindications: [
        'Allergie gegen Lavendel',
        'Niedrigen Blutdruck (große Mengen)',
        'Schwangerschaft (ätherisches Öl)'
      ],
      evidence: 'hoch',
      sources: [
        'International Journal of Nursing Practice (2020)',
        'Evidence-Based Complementary Medicine (2018)',
        'Sleep Medicine Reviews (2019)'
      ],
      rating: 4.8,
      reviews: []
    },
    {
      id: '3',
      name: 'Ingwer',
      scientificName: 'Zingiber officinale',
      category: 'kraeuter',
      uses: ['Übelkeit', 'Verdauung', 'Entzündungen', 'Erkältung', 'Schmerzen'],
      benefits: [
        'Wirksam gegen Übelkeit und Erbrechen',
        'Entzündungshemmende Eigenschaften',
        'Fördert die Verdauung',
        'Wärmende Wirkung bei Erkältungen',
        'Kann Muskelschmerzen lindern'
      ],
      preparation: [
        'Ingwertee: Frischen Ingwer in Scheiben schneiden und aufbrühen',
        'Ingwer kauen bei Übelkeit',
        'Ingwerpulver in Speisen',
        'Ingwer-Kompressen bei Muskelschmerzen'
      ],
      dosage: '1-4g täglich, als Tee oder in Speisen',
      precautions: [
        'Bei Gallensteinleiden vorsichtig verwenden',
        'Kann blutverdünnende Wirkung haben',
        'In hohen Dosen magenschleimhautreizend'
      ],
      contraindications: [
        'Gallensteine',
        'Schwere Herzerkrankungen',
        'Vor Operationen absetzen'
      ],
      evidence: 'hoch',
      sources: [
        'Cochrane Database of Systematic Reviews (2019)',
        'Phytotherapy Research (2020)',
        'Journal of Pain (2018)'
      ],
      rating: 4.6,
      reviews: []
    },
    {
      id: '4',
      name: 'Magnesium',
      scientificName: 'Magnesium',
      category: 'mineralien',
      uses: ['Muskelkrämpfe', 'Schlafstörungen', 'Stress', 'Kopfschmerzen', 'PMS'],
      benefits: [
        'Entspannt Muskeln und Nerven',
        'Verbessert die Schlafqualität',
        'Reduziert Stress und Angstzustände',
        'Kann Migräne vorbeugen',
        'Unterstützt die Herzgesundheit'
      ],
      preparation: [
        'Magnesium-Tabletten oder Kapseln',
        'Magnesium-Pulver in Wasser auflösen',
        'Magnesiumöl für äußerliche Anwendung',
        'Magnesiumbad (Epsom-Salz)'
      ],
      dosage: '300-400mg täglich für Erwachsene',
      precautions: [
        'Bei Nierenproblemen Arzt konsultieren',
        'Kann abführend wirken bei Überdosierung',
        'Wechselwirkungen mit Medikamenten möglich'
      ],
      contraindications: [
        'Schwere Niereninsuffizienz',
        'Herzrhythmusstörungen',
        'Myasthenia gravis'
      ],
      evidence: 'hoch',
      sources: [
        'Nutrients Journal (2020)',
        'Sleep Medicine Reviews (2018)',
        'Headache Medicine (2019)'
      ],
      rating: 4.5,
      reviews: []
    },
    {
      id: '5',
      name: 'Honig',
      scientificName: 'Mel',
      category: 'nahrung',
      uses: ['Husten', 'Wundheilung', 'Verdauung', 'Immunsystem', 'Hautpflege'],
      benefits: [
        'Natürliche antibakterielle Eigenschaften',
        'Beruhigt Husten und Halsschmerzen',
        'Fördert die Wundheilung',
        'Präbiotische Wirkung für Darmflora',
        'Antioxidative Eigenschaften'
      ],
      preparation: [
        'Pur bei Husten (1 TL)',
        'In warmem Tee aufgelöst',
        'Als Wundauflage (Manuka-Honig)',
        'In Gesichtsmasken für die Haut'
      ],
      dosage: '1-3 TL täglich, nicht für Säuglinge unter 1 Jahr',
      precautions: [
        'Nicht für Kinder unter 1 Jahr (Botulismus-Risiko)',
        'Bei Diabetes vorsichtig verwenden',
        'Kann Karies fördern bei schlechter Mundhygiene'
      ],
      contraindications: [
        'Säuglinge unter 1 Jahr',
        'Allergie gegen Bienenprodukte',
        'Schwerer Diabetes mellitus'
      ],
      evidence: 'hoch',
      sources: [
        'Cochrane Database (2018) - Honig gegen Husten',
        'Wound Repair and Regeneration (2019)',
        'Journal of Nutrition Health (2020)'
      ],
      rating: 4.4,
      reviews: []
    },
    {
      id: '6',
      name: 'Akupressur',
      scientificName: '',
      category: 'therapien',
      uses: ['Schmerzen', 'Stress', 'Schlafstörungen', 'Verdauung', 'Kopfschmerzen'],
      benefits: [
        'Schmerzlinderung ohne Medikamente',
        'Entspannt das Nervensystem',
        'Verbessert Durchblutung',
        'Kann Selbst angewendet werden',
        'Keine Nebenwirkungen bei korrekter Anwendung'
      ],
      preparation: [
        'Druckpunkt lokalisieren',
        'Mit Daumen oder Finger 30-60 Sekunden Druck ausüben',
        'Kreisende Bewegungen möglich',
        'Atmung bewusst entspannen'
      ],
      dosage: '2-3 mal täglich für 1-2 Minuten pro Punkt',
      precautions: [
        'Nicht auf offene Wunden drücken',
        'Bei Schwangerschaft bestimmte Punkte meiden',
        'Sanften Druck verwenden'
      ],
      contraindications: [
        'Bestimmte Punkte in der Schwangerschaft',
        'Über Tumoren oder Entzündungen',
        'Bei schweren Herzerkrankungen'
      ],
      evidence: 'mittel',
      sources: [
        'Journal of Pain and Symptom Management (2019)',
        'Complementary Medicine Research (2020)',
        'Evidence-Based CAM (2018)'
      ],
      rating: 4.2,
      reviews: []
    }
  ];

  // Gesundheitszustände
  const healthConditions: HealthCondition[] = [
    {
      id: '1',
      name: 'Schlafstörungen',
      description: 'Schwierigkeiten beim Einschlafen, Durchschlafen oder erholsamen Schlaf',
      symptoms: ['Einschlafprobleme', 'Häufiges Aufwachen', 'Früh-morgendliches Erwachen', 'Müdigkeit am Tag'],
      conventionalTreatment: ['Schlafhygiene', 'Verhaltenstherapie', 'Schlafmittel (kurzfristig)'],
      naturalOptions: ['Lavendel', 'Baldrian', 'Passionsblume', 'Magnesium', 'Melatonin'],
      lifestyle: ['Regelmäßige Schlafzeiten', 'Bildschirmfreie Zeit vor dem Schlaf', 'Entspannungsübungen', 'Kühles, dunkles Schlafzimmer'],
      prevention: ['Stress reduzieren', 'Koffein nach 14 Uhr vermeiden', 'Regelmäßige Bewegung', 'Entspannungsrituale']
    },
    {
      id: '2',
      name: 'Verdauungsprobleme',
      description: 'Beschwerden im Magen-Darm-Bereich wie Völlegefühl, Blähungen oder Sodbrennen',
      symptoms: ['Völlegefühl', 'Blähungen', 'Sodbrennen', 'Übelkeit', 'Unregelmäßiger Stuhlgang'],
      conventionalTreatment: ['Ernährungsumstellung', 'Probiotika', 'Säureblocker', 'Antispasmodika'],
      naturalOptions: ['Ingwer', 'Kamille', 'Fenchel', 'Pfefferminz', 'Kurkuma', 'Flohsamen'],
      lifestyle: ['Langsam essen', 'Gut kauen', 'Regelmäßige Mahlzeiten', 'Stress reduzieren'],
      prevention: ['Ballaststoffreiche Ernährung', 'Ausreichend trinken', 'Bewegung nach Mahlzeiten', 'Fermentierte Lebensmittel']
    },
    {
      id: '3',
      name: 'Stress und Angst',
      description: 'Chronische Anspannung und Sorgen, die das tägliche Leben beeinträchtigen',
      symptoms: ['Nervosität', 'Herzrasen', 'Schlafprobleme', 'Konzentrationsschwierigkeiten', 'Muskelverspannungen'],
      conventionalTreatment: ['Psychotherapie', 'Entspannungsverfahren', 'Medikamente (bei Bedarf)'],
      naturalOptions: ['Lavendel', 'Passionsblume', 'Johanniskraut', 'Magnesium', 'CBD-Öl', 'Rhodiola'],
      lifestyle: ['Meditation', 'Yoga', 'Atemübungen', 'Regelmäßige Bewegung', 'Zeit in der Natur'],
      prevention: ['Work-Life-Balance', 'Soziale Kontakte', 'Hobbys pflegen', 'Grenzen setzen']
    }
  ];

  // Local Storage für Favoriten
  useEffect(() => {
    const savedFavorites = localStorage.getItem('naturalHealingFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (remedyId: string) => {
    const updatedFavorites = favorites.includes(remedyId)
      ? favorites.filter(id => id !== remedyId)
      : [...favorites, remedyId];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('naturalHealingFavorites', JSON.stringify(updatedFavorites));
  };

  const filteredRemedies = naturalRemedies.filter(remedy => {
    const matchesCategory = selectedCategory === 'alle' || remedy.category === selectedCategory;
    const matchesSearch = remedy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         remedy.uses.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const favoriteRemedies = naturalRemedies.filter(remedy => favorites.includes(remedy.id));

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.icon || '🌿';
  };

  const getEvidenceColor = (evidence: string) => {
    switch (evidence) {
      case 'hoch': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'mittel': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'niedrig': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const renderBrowseTab = () => (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Suche nach Heilmittel oder Anwendungsgebiet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Kategorie-Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Heilmittel-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredRemedies.map((remedy) => (
            <motion.div
              key={remedy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setSelectedRemedy(remedy)}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(remedy.category)} text-white rounded-full text-sm font-medium`}>
                  {getCategoryIcon(remedy.category)} {categories.find(c => c.id === remedy.category)?.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(remedy.id);
                  }}
                  className={`text-2xl transition-all ${
                    favorites.includes(remedy.id) 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  {favorites.includes(remedy.id) ? '❤️' : '🤍'}
                </button>
              </div>
              
              <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">
                {remedy.name}
              </h3>
              
              {remedy.scientificName && (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-3">
                  {remedy.scientificName}
                </p>
              )}
              
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Anwendungsgebiete:
                </p>
                <div className="flex flex-wrap gap-1">
                  {remedy.uses.slice(0, 3).map((use, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs"
                    >
                      {use}
                    </span>
                  ))}
                  {remedy.uses.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                      +{remedy.uses.length - 3} weitere
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getEvidenceColor(remedy.evidence)}`}>
                    Evidenz: {remedy.evidence}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {remedy.rating}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {remedy.reviews.length} Bewertungen
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  const renderConditionsTab = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          🏥 Häufige Gesundheitszustände
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Verstehe häufige Gesundheitsprobleme und entdecke natürliche Behandlungsoptionen. 
          Diese Informationen ersetzen keine medizinische Beratung.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {healthConditions.map((condition) => (
          <motion.div
            key={condition.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              {condition.name}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {condition.description}
            </p>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  🔍 Symptome:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {condition.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  🌿 Natürliche Optionen:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {condition.naturalOptions.map((option, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm cursor-pointer hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                      onClick={() => {
                        const remedy = naturalRemedies.find(r => r.name === option);
                        if (remedy) setSelectedRemedy(remedy);
                      }}
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  🏃‍♀️ Lebensstil-Änderungen:
                </h5>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {condition.lifestyle.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  🛡️ Vorbeugung:
                </h5>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {condition.prevention.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderFavoritesTab = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          ❤️ Meine Favoriten ({favoriteRemedies.length})
        </h3>
      </div>

      {favoriteRemedies.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌿</div>
          <h4 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Noch keine Favoriten gespeichert
          </h4>
          <p className="text-gray-500 dark:text-gray-500 mb-6">
            Markiere Heilmittel als Favoriten, um sie hier wiederzufinden
          </p>
          <button
            onClick={() => setActiveTab('browse')}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            Heilmittel entdecken
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRemedies.map((remedy) => (
            <motion.div
              key={remedy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setSelectedRemedy(remedy)}
            >
              {/* Gleicher Content wie in Browse Tab */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(remedy.category)} text-white rounded-full text-sm font-medium`}>
                  {getCategoryIcon(remedy.category)} {categories.find(c => c.id === remedy.category)?.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(remedy.id);
                  }}
                  className="text-2xl text-red-500 hover:text-red-600 transition-all"
                >
                  ❤️
                </button>
              </div>
              
              <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">
                {remedy.name}
              </h3>
              
              {remedy.scientificName && (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-3">
                  {remedy.scientificName}
                </p>
              )}
              
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Anwendungsgebiete:
                </p>
                <div className="flex flex-wrap gap-1">
                  {remedy.uses.slice(0, 3).map((use, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getEvidenceColor(remedy.evidence)}`}>
                  Evidenz: {remedy.evidence}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {remedy.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderQuizTab = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          🧠 Naturheilkunde-Quiz
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Teste dein Wissen über natürliche Heilmittel und lerne Neues dazu
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8">
        <div className="text-center">
          <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            Quiz wird entwickelt...
          </h4>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Wir arbeiten an einem interaktiven Quiz, das dir hilft, dein Wissen über 
            Naturheilkunde zu testen und zu erweitern.
          </p>
          <div className="text-6xl mb-4">🔬</div>
          <p className="text-gray-500 dark:text-gray-400">
            Kommende Features: Wissenstests, Anwendungsszenarien, Sicherheitsquiz
          </p>
        </div>
      </div>
    </div>
  );

  // Heilmittel Detail Modal
  const RemedyModal = ({ remedy, onClose }: { remedy: NaturalRemedy; onClose: () => void }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(remedy.category)} text-white rounded-full font-medium`}>
              {getCategoryIcon(remedy.category)} {categories.find(c => c.id === remedy.category)?.name}
            </span>
            <span className={`px-3 py-1 rounded font-medium ${getEvidenceColor(remedy.evidence)}`}>
              Evidenz: {remedy.evidence}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {remedy.name}
            </h2>
            {remedy.scientificName && (
              <p className="text-lg text-gray-500 dark:text-gray-400 italic">
                {remedy.scientificName}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500 text-xl">⭐</span>
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {remedy.rating}
              </span>
            </div>
            <button
              onClick={() => toggleFavorite(remedy.id)}
              className={`text-3xl transition-all ${
                favorites.includes(remedy.id) 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              {favorites.includes(remedy.id) ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                🎯 Anwendungsgebiete
              </h3>
              <div className="flex flex-wrap gap-2">
                {remedy.uses.map((use, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                ✨ Vorteile
              </h3>
              <ul className="space-y-2">
                {remedy.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                📋 Zubereitung & Anwendung
              </h3>
              <ul className="space-y-2">
                {remedy.preparation.map((prep, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{prep}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                ⚖️ Dosierung
              </h3>
              <p className="text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                {remedy.dosage}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                ⚠️ Vorsichtsmaßnahmen
              </h3>
              <ul className="space-y-2">
                {remedy.precautions.map((precaution, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">⚠️</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{precaution}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                🚫 Gegenanzeigen
              </h3>
              <ul className="space-y-2">
                {remedy.contraindications.map((contra, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">🚫</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{contra}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                📚 Quellen
              </h3>
              <ul className="space-y-1">
                {remedy.sources.map((source, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                    • {source}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 text-xl">⚠️</span>
              <div>
                <p className="text-sm text-yellow-800 dark:text-yellow-200 font-semibold mb-1">
                  Wichtiger Hinweis:
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Diese Informationen ersetzen keine professionelle medizinische Beratung. 
                  Bei gesundheitlichen Beschwerden wenden Sie sich an einen Arzt oder Heilpraktiker.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
            Naturheilkunde-Datenbank
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Entdecke die Kraft der Natur - Wissenschaftlich fundierte Informationen über natürliche Heilmittel
          </p>
          <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ Diese Informationen ersetzen keine medizinische Beratung. Bei gesundheitlichen Problemen konsultieren Sie immer einen Arzt.
            </p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2">
          {[
            { id: 'browse', label: 'Heilmittel durchstöbern', icon: '🌿' },
            { id: 'conditions', label: 'Gesundheitszustände', icon: '🏥' },
            { id: 'favorites', label: 'Meine Favoriten', icon: '❤️' },
            { id: 'quiz', label: 'Wissenstest', icon: '🧠' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'browse' && renderBrowseTab()}
          {activeTab === 'conditions' && renderConditionsTab()}
          {activeTab === 'favorites' && renderFavoritesTab()}
          {activeTab === 'quiz' && renderQuizTab()}
        </motion.div>

        {/* Remedy Detail Modal */}
        <AnimatePresence>
          {selectedRemedy && (
            <RemedyModal 
              remedy={selectedRemedy} 
              onClose={() => setSelectedRemedy(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
