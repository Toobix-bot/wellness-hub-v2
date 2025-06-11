// Virtueller Begleiter System - Typen und Interfaces
export interface VirtualCompanion {
  id: string;
  name: string;
  type: 'plant' | 'pet' | 'planet';
  level: number;
  experience: number;
  health: number;
  happiness: number;
  energy: number;
  lastCared: string;
  birthDate: string;
  traits: string[];
  achievements: string[];
  currentMood: string;
  needsAttention: boolean;
}

export interface CompanionAction {
  id: string;
  name: string;
  description: string;
  energyCost: number;
  effects: {
    health?: number;
    happiness?: number;
    experience?: number;
  };
  cooldown: number; // in minutes
  requiredLevel: number;
}

export interface CompanionEvolution {
  level: number;
  name: string;
  description: string;
  unlockedActions: string[];
  appearance: string;
  specialAbilities: string[];
}

// Plant Companion Data
export const plantEvolutions: CompanionEvolution[] = [
  {
    level: 1,
    name: "Zarter Keimling",
    description: "Ein kleiner Samen beginnt sein Leben. Er braucht sanfte Pflege und viel Liebe.",
    unlockedActions: ['water', 'sunshine'],
    appearance: "🌱",
    specialAbilities: []
  },
  {
    level: 5,
    name: "Junge Pflanze",
    description: "Die ersten Blätter entfalten sich. Deine Fürsorge trägt Früchte.",
    unlockedActions: ['water', 'sunshine', 'fertilize'],
    appearance: "🌿",
    specialAbilities: ["Kann deine Stimmung verbessern"]
  },
  {
    level: 10,
    name: "Blühende Schönheit",
    description: "Wunderschöne Blüten zeigen die Kraft der liebevollen Pflege.",
    unlockedActions: ['water', 'sunshine', 'fertilize', 'prune', 'sing'],
    appearance: "🌸",
    specialAbilities: ["Stressreduktion", "Erhöht Kreativität"]
  },
  {
    level: 20,
    name: "Weiser Baum",
    description: "Ein majestätischer Baum, der Weisheit und Ruhe ausstrahlt.",
    unlockedActions: ['water', 'sunshine', 'fertilize', 'prune', 'sing', 'meditate'],
    appearance: "🌳",
    specialAbilities: ["Weisheitsrat", "Emotionale Heilung", "Naturverbindung"]
  }
];

// Pet Companion Data
export const petEvolutions: CompanionEvolution[] = [
  {
    level: 1,
    name: "Neugeborenes Kätzchen",
    description: "Ein winziges, flauschiges Kätzchen, das deine Liebe und Aufmerksamkeit braucht.",
    unlockedActions: ['feed', 'pet', 'play'],
    appearance: "🐱",
    specialAbilities: []
  },
  {
    level: 8,
    name: "Verspieltes Kätzchen",
    description: "Neugierig und energiegeladen, bereit die Welt zu erkunden.",
    unlockedActions: ['feed', 'pet', 'play', 'train', 'explore'],
    appearance: "🐈",
    specialAbilities: ["Spielkamerad", "Stimmungsaufheller"]
  },
  {
    level: 15,
    name: "Treuer Gefährte",
    description: "Ein loyaler und weiser Begleiter, der dich versteht.",
    unlockedActions: ['feed', 'pet', 'play', 'train', 'explore', 'cuddle', 'adventure'],
    appearance: "🦊",
    specialAbilities: ["Emotionale Unterstützung", "Intuitive Verbindung", "Schutz"]
  },
  {
    level: 25,
    name: "Mystischer Guardian",
    description: "Ein spiritueller Begleiter mit magischen Fähigkeiten.",
    unlockedActions: ['feed', 'pet', 'play', 'train', 'explore', 'cuddle', 'adventure', 'magic'],
    appearance: "🐺✨",
    specialAbilities: ["Heilende Energie", "Spirituelle Führung", "Schutz vor Negativität"]
  }
];

// Planet Companion Data
export const planetEvolutions: CompanionEvolution[] = [
  {
    level: 1,
    name: "Kleiner Asteroid",
    description: "Ein winziger Felsbrocken im Weltraum, bereit zu wachsen.",
    unlockedActions: ['nurture', 'protect'],
    appearance: "🪨",
    specialAbilities: []
  },
  {
    level: 7,
    name: "Junger Planet",
    description: "Atmosphäre beginnt sich zu bilden, erste Anzeichen von Leben.",
    unlockedActions: ['nurture', 'protect', 'atmosphere', 'seed_life'],
    appearance: "🌍",
    specialAbilities: ["Grundlegendes Ökosystem"]
  },
  {
    level: 15,
    name: "Lebendige Welt",
    description: "Eine blühende Welt voller Leben und Biodiversität.",
    unlockedActions: ['nurture', 'protect', 'atmosphere', 'seed_life', 'evolve_species', 'climate_control'],
    appearance: "🌎🌿",
    specialAbilities: ["Artenschutz", "Klimaregulation", "Lebensförderung"]
  },
  {
    level: 30,
    name: "Kosmischer Lebensspender",
    description: "Ein Paradies-Planet, der andere Welten inspiriert und nährt.",
    unlockedActions: ['nurture', 'protect', 'atmosphere', 'seed_life', 'evolve_species', 'climate_control', 'cosmic_connection', 'birth_moons'],
    appearance: "🌟🌍🌙",
    specialAbilities: ["Interdimensionale Heilung", "Universelle Liebe", "Schöpfungskraft"]
  }
];

// Companion Actions
export const companionActions: Record<string, CompanionAction> = {
  // Plant Actions
  water: {
    id: 'water',
    name: 'Gießen',
    description: 'Gib deiner Pflanze das Wasser des Lebens',
    energyCost: 10,
    effects: { health: 15, happiness: 10, experience: 5 },
    cooldown: 60, // 1 Stunde
    requiredLevel: 1
  },
  sunshine: {
    id: 'sunshine',
    name: 'Sonnenlicht',
    description: 'Lass deine Pflanze im warmen Sonnenlicht baden',
    energyCost: 5,
    effects: { health: 10, happiness: 15, experience: 3 },
    cooldown: 120, // 2 Stunden
    requiredLevel: 1
  },
  fertilize: {
    id: 'fertilize',
    name: 'Düngen',
    description: 'Nähre deine Pflanze mit liebevoller Aufmerksamkeit',
    energyCost: 20,
    effects: { health: 25, experience: 10 },
    cooldown: 240, // 4 Stunden
    requiredLevel: 5
  },
  
  // Pet Actions
  feed: {
    id: 'feed',
    name: 'Füttern',
    description: 'Gib deinem Begleiter nahrhaftes Futter',
    energyCost: 15,
    effects: { health: 20, happiness: 10, experience: 5 },
    cooldown: 90, // 1.5 Stunden
    requiredLevel: 1
  },
  pet: {
    id: 'pet',
    name: 'Streicheln',
    description: 'Zeige Zuneigung durch sanfte Berührung',
    energyCost: 5,
    effects: { happiness: 20, experience: 3 },
    cooldown: 30, // 30 Minuten
    requiredLevel: 1
  },
  play: {
    id: 'play',
    name: 'Spielen',
    description: 'Hab Spaß und schaffe gemeinsame Erinnerungen',
    energyCost: 25,
    effects: { happiness: 25, experience: 8 },
    cooldown: 60, // 1 Stunde
    requiredLevel: 1
  },
  
  // Planet Actions
  nurture: {
    id: 'nurture',
    name: 'Nähren',
    description: 'Fördere das Wachstum deines Planeten',
    energyCost: 20,
    effects: { health: 15, experience: 7 },
    cooldown: 120, // 2 Stunden
    requiredLevel: 1
  },
  protect: {
    id: 'protect',
    name: 'Beschützen',
    description: 'Schütze deinen Planeten vor kosmischen Gefahren',
    energyCost: 30,
    effects: { health: 30, happiness: 10, experience: 10 },
    cooldown: 180, // 3 Stunden
    requiredLevel: 1
  }
};

// Companion Factory
export const createNewCompanion = (type: 'plant' | 'pet' | 'planet', name: string): VirtualCompanion => {
  const now = new Date().toISOString();
  
  return {
    id: `${type}_${Date.now()}`,
    name,
    type,
    level: 1,
    experience: 0,
    health: 100,
    happiness: 80,
    energy: 100,
    lastCared: now,
    birthDate: now,
    traits: [],
    achievements: [],
    currentMood: 'neugierig',
    needsAttention: false
  };
};

// Experience calculation
export const getExperienceNeededForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

export const calculateLevel = (experience: number): number => {
  let level = 1;
  let totalExp = 0;
  
  while (totalExp + getExperienceNeededForLevel(level) <= experience) {
    totalExp += getExperienceNeededForLevel(level);
    level++;
  }
  
  return level;
};

// Get current evolution stage
export const getEvolutionStage = (type: 'plant' | 'pet' | 'planet', level: number): CompanionEvolution => {
  let evolutions: CompanionEvolution[];
  
  switch (type) {
    case 'plant':
      evolutions = plantEvolutions;
      break;
    case 'pet':
      evolutions = petEvolutions;
      break;
    case 'planet':
      evolutions = planetEvolutions;
      break;
  }
  
  // Find the highest evolution stage the companion qualifies for
  for (let i = evolutions.length - 1; i >= 0; i--) {
    if (level >= evolutions[i].level) {
      return evolutions[i];
    }
  }
  
  return evolutions[0]; // Fallback to first evolution
};

// Mood system based on care level
export const calculateMood = (companion: VirtualCompanion): string => {
  const timeSinceLastCare = Date.now() - new Date(companion.lastCared).getTime();
  const hoursSinceLastCare = timeSinceLastCare / (1000 * 60 * 60);
  
  if (companion.health < 30) return 'krank';
  if (companion.happiness > 80) return 'überglücklich';
  if (companion.happiness > 60) return 'fröhlich';
  if (companion.happiness > 40) return 'zufrieden';
  if (companion.happiness > 20) return 'traurig';
  if (hoursSinceLastCare > 24) return 'verlassen';
  
  return 'neutral';
};

// Check if companion needs attention
export const needsAttention = (companion: VirtualCompanion): boolean => {
  const timeSinceLastCare = Date.now() - new Date(companion.lastCared).getTime();
  const hoursSinceLastCare = timeSinceLastCare / (1000 * 60 * 60);
  
  return (
    companion.health < 50 ||
    companion.happiness < 50 ||
    hoursSinceLastCare > 8
  );
};
