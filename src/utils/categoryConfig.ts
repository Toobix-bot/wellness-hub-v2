// Thematische Kategorien für das Wellness Hub Framework
export interface WellnessCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  path: string;
  modules: string[];
  priority: number;
}

// Neue thematische Kategorien-Konfiguration
export const wellnessCategories: WellnessCategory[] = [
  {
    id: 'mental-emotional',
    name: 'Mental & Emotional',
    description: 'Geist, Gefühle und emotionales Wohlbefinden',
    icon: '🧠',
    color: 'from-blue-500 to-indigo-600',
    path: '/categories/mental-emotional',
    modules: ['therapie', 'emotionen', 'stille', 'bewusstsein', 'mental-health', 'dualitaet-matrix'],
    priority: 1
  },
  {
    id: 'growth-transformation',
    name: 'Growth & Transformation',
    description: 'Persönliche Entwicklung und positive Veränderung',
    icon: '🌱',
    color: 'from-green-500 to-emerald-600',
    path: '/categories/growth-transformation',
    modules: ['transformation', 'charakter-erstellen', 'selbstverwirklichung', 'life-rpg', 'fortschritt', 'herausforderungen'],
    priority: 2
  },
  {
    id: 'relationships-community',
    name: 'Relationships & Community',
    description: 'Beziehungen, Gemeinschaft und sozialer Impact',
    icon: '❤️',
    color: 'from-pink-500 to-rose-600',
    path: '/categories/relationships-community',
    modules: ['liebe', 'community', 'ki-coaches', 'begleiter', 'impact', 'soziales-netzwerk'],
    priority: 3
  },
  {
    id: 'creativity-expression',
    name: 'Creativity & Expression',
    description: 'Kreativität, Ausdruck und künstlerische Entfaltung',
    icon: '🎨',
    color: 'from-purple-500 to-violet-600',
    path: '/categories/creativity-expression',
    modules: ['creative-hub', 'musik-kultur', 'tagebuch', 'geschichten', 'programmier-workshop', 'gaming-corner'],
    priority: 4
  },
  {
    id: 'lifestyle-wellness',
    name: 'Lifestyle & Wellness',
    description: 'Lebensstil, Gesundheit und tägliches Wohlbefinden',
    icon: '🌿',
    color: 'from-teal-500 to-cyan-600',
    path: '/categories/lifestyle-wellness',
    modules: ['dankbarkeit', 'freude', 'naturheilkunde', 'aktivitäten', 'shop'],
    priority: 5
  },
  {
    id: 'tools-systems',
    name: 'Tools & Systems',
    description: 'Werkzeuge, Systeme und organisatorische Features',
    icon: '🔧',
    color: 'from-gray-500 to-slate-600',
    path: '/categories/tools-systems',
    modules: ['settings', 'externe-plattformen', 'roadmap', 'entscheidungsmatrix', 'gamification'],
    priority: 6
  },
  {
    id: 'advanced-esoteric',
    name: 'Advanced & Esoteric',
    description: 'Erweiterte Konzepte und spirituelle Praktiken',
    icon: '✨',
    color: 'from-amber-500 to-yellow-600',
    path: '/categories/advanced-esoteric',
    modules: ['astral-soul-journey', 'philosophie', 'wissen', 'real-world-challenges'],
    priority: 7
  }
];

// Module-zu-Kategorie Mapping
export const moduleToCategory: Record<string, string> = {
  // Mental & Emotional
  'therapie': 'mental-emotional',
  'emotionen': 'mental-emotional', 
  'stille': 'mental-emotional',
  'bewusstsein': 'mental-emotional',
  'mental-health': 'mental-emotional',
  'dualitaet-matrix': 'mental-emotional',
  
  // Growth & Transformation
  'transformation': 'growth-transformation',
  'charakter-erstellen': 'growth-transformation',
  'selbstverwirklichung': 'growth-transformation',
  'life-rpg': 'growth-transformation',
  'fortschritt': 'growth-transformation',
  'herausforderungen': 'growth-transformation',
  
  // Relationships & Community
  'liebe': 'relationships-community',
  'community': 'relationships-community',
  'ki-coaches': 'relationships-community',
  'begleiter': 'relationships-community',
  'impact': 'relationships-community',
  'soziales-netzwerk': 'relationships-community',
  
  // Creativity & Expression
  'creative-hub': 'creativity-expression',
  'musik-kultur': 'creativity-expression',
  'tagebuch': 'creativity-expression',
  'geschichten': 'creativity-expression',
  'programmier-workshop': 'creativity-expression',
  'gaming-corner': 'creativity-expression',
  
  // Lifestyle & Wellness
  'dankbarkeit': 'lifestyle-wellness',
  'freude': 'lifestyle-wellness',
  'naturheilkunde': 'lifestyle-wellness',
  'aktivitäten': 'lifestyle-wellness',
  'shop': 'lifestyle-wellness',
  
  // Tools & Systems
  'settings': 'tools-systems',
  'externe-plattformen': 'tools-systems',
  'roadmap': 'tools-systems',
  'entscheidungsmatrix': 'tools-systems',
  'gamification': 'tools-systems',
  
  // Advanced & Esoteric
  'astral-soul-journey': 'advanced-esoteric',
  'philosophie': 'advanced-esoteric',
  'wissen': 'advanced-esoteric',
  'real-world-challenges': 'advanced-esoteric'
};

// Hilfsfunktionen
export function getCategoryForModule(moduleId: string): WellnessCategory | undefined {
  const categoryId = moduleToCategory[moduleId];
  return wellnessCategories.find(cat => cat.id === categoryId);
}

export function getModulesForCategory(categoryId: string): string[] {
  const category = wellnessCategories.find(cat => cat.id === categoryId);
  return category ? category.modules : [];
}
