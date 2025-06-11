'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Crown, Star, Gift, CreditCard, Shield, 
  Sparkles, Zap, Heart, Users, BookOpen, Headphones,
  Download, Check, X, Lock, Unlock
} from 'lucide-react';

// TypeScript Interfaces
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'premium' | 'courses' | 'coaching' | 'resources' | 'physical';
  features: string[];
  icon: string;
  popular?: boolean;
  comingSoon?: boolean;
  image?: string;
}

interface Subscription {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  icon: string;
  popular?: boolean;
  color: string;
}

interface Purchase {
  id: string;
  productId: string;
  purchaseDate: Date;
  type: 'product' | 'subscription';
  status: 'active' | 'expired' | 'cancelled';
}

const ShopPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shop' | 'premium' | 'purchases'>('shop');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Premium-Abonnements
  const subscriptions: Subscription[] = [
    {
      id: 'basic',
      name: 'Wellness Basic',
      description: 'Grundlegende Premium-Features für deinen Wellness-Weg',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: [
        'Erweiterte KI-Coach Gespräche',
        'Premium Meditationen & Sounds',
        'Detaillierte Analytics',
        'Werbefreie Erfahrung',
        'Cloud-Synchronisation',
        'Offline-Modus'
      ],
      icon: '🌱',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'pro',
      name: 'Wellness Pro',
      description: 'Professionelle Tools für ernsthafte Wellness-Praktiker',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        'Alle Basic Features',
        'Persönlicher 1:1 KI-Coach',
        'Erweiterte Gamification',
        'Community-Mentorship',
        'Individuelle Wellness-Pläne',
        'Wissenschaftliche Reports',
        'Priority Support'
      ],
      icon: '⭐',
      popular: true,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'master',
      name: 'Wellness Master',
      description: 'Die ultimative Wellness-Erfahrung für Experten',
      monthlyPrice: 39.99,
      yearlyPrice: 399.99,
      features: [
        'Alle Pro Features',
        'Live 1:1 Coaching Sessions',
        'Exklusive Masterclasses',
        'Beta-Features Zugang',
        'Persönlicher Wellness-Butler',
        'VIP Community Access',
        'Lifetime Updates',
        'Retreat-Rabatte'
      ],
      icon: '👑',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  // Shop-Produkte
  const products: Product[] = [
    // Premium Kurse
    {
      id: 'meditation-masterclass',
      name: 'Meditation Masterclass',
      description: '8-wöchiger intensiver Meditationskurs mit persönlicher Betreuung',
      price: 149.99,
      originalPrice: 199.99,
      category: 'courses',
      features: [
        '56 geführte Meditationen',
        'Wöchentliche Live-Sessions',
        'Persönliches Feedback',
        'Zertifikat bei Abschluss'
      ],
      icon: '🧘‍♀️',
      popular: true
    },
    {
      id: 'manifestation-workshop',
      name: 'Manifestation Workshop',
      description: 'Lerne die Kunst der bewussten Manifestation',
      price: 89.99,
      category: 'courses',
      features: [
        '21-Tage Manifestation Challenge',
        'Vision Board Tools',
        'Affirmations Library',
        'Community Support'
      ],
      icon: '✨'
    },
    // 1:1 Coaching
    {
      id: 'life-coaching',
      name: 'Life Coaching Paket',
      description: 'Persönliches 1:1 Coaching mit zertifizierten Coaches',
      price: 299.99,
      category: 'coaching',
      features: [
        '4 x 60min Sessions',
        'Persönlicher Action Plan',
        'Email Support',
        'Ressourcen Bibliothek'
      ],
      icon: '🎯'
    },
    {
      id: 'relationship-coaching',
      name: 'Beziehungs-Coaching',
      description: 'Spezialisiertes Coaching für Beziehungen und Selbstliebe',
      price: 199.99,
      category: 'coaching',
      features: [
        '3 x 60min Sessions',
        'Beziehungs-Assessment',
        'Übungen für zu Hause',
        'Partner-Integration möglich'
      ],
      icon: '💕'
    },
    // Digitale Ressourcen
    {
      id: 'soundscape-collection',
      name: 'Premium Soundscapes',
      description: 'Hochwertige Entspannungsmusik und Naturklänge',
      price: 29.99,
      category: 'resources',
      features: [
        '100+ HD Soundscapes',
        'Binaurale Beats',
        'Sleep Stories',
        'Offline Download'
      ],
      icon: '🎵'
    },
    {
      id: 'journal-templates',
      name: 'Journal Template Pack',
      description: 'Professionelle Vorlagen für dein Wellness-Journal',
      price: 19.99,
      category: 'resources',
      features: [
        '50+ Unique Templates',
        'PDF & Digital Format',
        'Anpassbare Layouts',
        'Druckoptimiert'
      ],
      icon: '📔'
    },
    // Physische Produkte
    {
      id: 'wellness-journal',
      name: 'Wellness Journal (Physisch)',
      description: 'Hochwertiges gebundenes Journal mit geführten Prompts',
      price: 39.99,
      category: 'physical',
      features: [
        '365 Tage Prompts',
        'Hardcover Binding',
        'Premium Papier',
        'Kostenloser Versand'
      ],
      icon: '📖'
    },
    {
      id: 'meditation-kit',
      name: 'Meditation Starter Kit',
      description: 'Alles was du für den perfekten Meditationsplatz brauchst',
      price: 89.99,
      category: 'physical',
      features: [
        'Meditation Kissen',
        'Räucherstäbchen Set',
        'Tibetan Singing Bowl',
        'Anleitung & Karten'
      ],
      icon: '🕯️',
      comingSoon: true
    }
  ];

  // Lokale Daten laden
  useEffect(() => {
    const savedPurchases = localStorage.getItem('wellness-purchases');
    const savedSubscription = localStorage.getItem('wellness-subscription');
    
    if (savedPurchases) {
      setPurchases(JSON.parse(savedPurchases));
    }
    
    if (savedSubscription) {
      setCurrentSubscription(savedSubscription);
    }
  }, []);

  // Kategorien für Filter
  const categories = [
    { id: 'all', name: 'Alle Produkte', icon: '🛍️' },
    { id: 'courses', name: 'Kurse', icon: '📚' },
    { id: 'coaching', name: 'Coaching', icon: '🎯' },
    { id: 'resources', name: 'Ressourcen', icon: '💎' },
    { id: 'physical', name: 'Physische Produkte', icon: '📦' }
  ];

  // Gefilterte Produkte
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Kauf-Handler
  const handlePurchase = (productId: string, type: 'product' | 'subscription') => {
    const newPurchase: Purchase = {
      id: Date.now().toString(),
      productId,
      purchaseDate: new Date(),
      type,
      status: 'active'
    };

    const updatedPurchases = [...purchases, newPurchase];
    setPurchases(updatedPurchases);
    localStorage.setItem('wellness-purchases', JSON.stringify(updatedPurchases));

    if (type === 'subscription') {
      setCurrentSubscription(productId);
      localStorage.setItem('wellness-subscription', productId);
    }

    setShowPaymentModal(false);
    setSelectedProduct(null);
  };

  // Premium Features Komponente
  const PremiumSection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold mb-4"
        >
          <Crown size={24} />
          Premium Mitgliedschaften
        </motion.div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Entfalte dein volles Wellness-Potenzial mit unseren Premium-Abonnements
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {subscriptions.map((sub, index) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border ${
              sub.popular ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200 dark:border-gray-700'
            } overflow-hidden`}
          >
            {sub.popular && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-semibold">
                Beliebteste Wahl
              </div>
            )}
            
            <div className={`p-8 ${sub.popular ? 'pt-16' : ''}`}>
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${sub.color} flex items-center justify-center text-2xl mb-4`}>
                  {sub.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {sub.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {sub.description}
                </p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    €{sub.monthlyPrice}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">/Monat</span>
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">
                  Oder €{sub.yearlyPrice}/Jahr (2 Monate gratis!)
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {sub.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check size={16} className="text-green-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setShowPaymentModal(true);
                }}
                disabled={currentSubscription === sub.id}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                  currentSubscription === sub.id
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : sub.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                }`}
              >
                {currentSubscription === sub.id ? 'Aktiv' : 'Upgrade jetzt'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Shop Komponente
  const ShopSection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold mb-4"
        >
          <ShoppingBag size={24} />
          Wellness Shop
        </motion.div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Entdecke kuratierte Wellness-Produkte und -Dienstleistungen
        </p>
      </div>

      {/* Kategorie Filter */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Produkte Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${
              product.comingSoon ? 'opacity-75' : ''
            }`}
          >
            {product.popular && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                Beliebt
              </div>
            )}

            {product.comingSoon && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <span className="text-gray-900 dark:text-white font-semibold">
                    Bald verfügbar
                  </span>
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-xl">
                  {product.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      €{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        €{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {product.description}
              </p>

              <ul className="space-y-2 mb-6">
                {product.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check size={14} className="text-green-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
                {product.features.length > 3 && (
                  <li className="text-gray-500 dark:text-gray-400 text-sm">
                    +{product.features.length - 3} weitere Features
                  </li>
                )}
              </ul>

              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setShowPaymentModal(true);
                }}
                disabled={product.comingSoon}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                  product.comingSoon
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                }`}
              >
                {product.comingSoon ? 'Bald verfügbar' : 'Jetzt kaufen'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Käufe Komponente
  const PurchasesSection = () => {
    const userProducts = purchases.filter(p => p.type === 'product').map(p => 
      products.find(prod => prod.id === p.productId)
    ).filter(Boolean);

    const userSubscription = currentSubscription ? 
      subscriptions.find(s => s.id === currentSubscription) : null;

    return (
      <div className="space-y-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full text-lg font-semibold mb-4"
          >
            <Gift size={24} />
            Meine Käufe
          </motion.div>
        </div>

        {/* Aktives Abonnement */}
        {userSubscription && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                {userSubscription.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{userSubscription.name}</h3>
                <p className="opacity-80">Aktives Abonnement</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Inkludierte Features:</h4>
                <ul className="space-y-1">
                  {userSubscription.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 opacity-90">
                      <Check size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-2">
                  €{userSubscription.monthlyPrice}/Monat
                </div>
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all">
                  Verwalten
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gekaufte Produkte */}
        {userProducts.length > 0 ? (
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Gekaufte Produkte
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProducts.map((product) => (
                <div
                  key={product?.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-xl">
                      {product?.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {product?.name}
                      </h4>
                      <span className="text-green-600 dark:text-green-400 text-sm">
                        Gekauft
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-all">
                    <Download size={16} className="inline mr-2" />
                    Zugreifen
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !userSubscription && (
            <div className="text-center py-12">
              <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Noch keine Käufe
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Entdecke unsere Premium-Produkte und -Services
              </p>
              <button
                onClick={() => setActiveTab('shop')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all"
              >
                Shop besuchen
              </button>
            </div>
          )
        )}
      </div>
    );
  };

  // Payment Modal
  const PaymentModal = () => (
    <AnimatePresence>
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPaymentModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                <CreditCard />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Demo Kauf
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dies ist eine Demo-Implementierung
              </p>
            </div>

            {selectedProduct && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedProduct.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {selectedProduct.name}
                    </h4>
                    <span className="text-lg font-bold text-green-600">
                      €{selectedProduct.price}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={() => handlePurchase(
                  selectedProduct?.id || 'demo',
                  selectedProduct ? 'product' : 'subscription'
                )}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-all"
              >
                Demo-Kauf abschließen
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Abbrechen
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Wellness Shop & Premium
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Erweitere deine Wellness-Reise mit Premium-Features, Kursen und personalisierten Services
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
            {[
              { id: 'shop', name: 'Shop', icon: ShoppingBag },
              { id: 'premium', name: 'Premium', icon: Crown },
              { id: 'purchases', name: 'Meine Käufe', icon: Gift }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon size={20} />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'shop' && <ShopSection />}
            {activeTab === 'premium' && <PremiumSection />}
            {activeTab === 'purchases' && <PurchasesSection />}
          </motion.div>
        </AnimatePresence>

        {/* Payment Modal */}
        <PaymentModal />
      </div>
    </div>
  );
};

export default ShopPage;
