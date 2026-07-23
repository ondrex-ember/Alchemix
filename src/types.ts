export type IngredientType = "Herb" | "Mineral" | "Resin" | "Liquid" | "Animal";

export interface Ingredient {
  id: string;
  name_lat: string;
  name_cz: string;
  type: IngredientType;
  thermal: number; // -4 to +4
  moisture: number; // -4 to +4
  toxicity: number; // 0 to 100
  potency: number; // 1 to 4
  tags: string[];
  price: number;
  shelf_days: number; // 0 means non-perishable
  color: string;
}

export type ProcessType = "Mix" | "Grind" | "Boil" | "Distill";

export interface Recipe {
  id: string | null;
  name_lat: string;
  name_cz: string;
  category: string;
  tier: number;
  process: ProcessType;
  base: string; // Ingredient ID
  req_ing: string[]; // List of other Ingredient IDs
  effect: string;
  tags: string[];
  value: number;
  color: string;
  procedural?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  icon: string;
  priceMult: number;
  questTypes: ("exact" | "shady" | "parametric")[];
  suspicion: number;
  bonus?: string;
}

export interface Quest {
  id: string;
  type: "exact" | "shady" | "parametric";
  customer: Customer;
  targetRecipeId?: string;
  targetName?: string;
  requirements?: {
    thermal_min?: number;
    thermal_max?: number;
    moisture_min?: number;
    moisture_max?: number;
    tox_min?: number;
    tox_max?: number;
  };
  description: string;
  reward: number;
  bonusReward?: string | null;
  expiresIn: number;
  suspicionGain: number;
  urgent?: boolean;
  isChain?: boolean;
  isFinal?: boolean;
  isDealAccepted?: boolean;
  dealMultiplier?: number;
  bartexOfferIds?: string[]; // If this is a barter quest, items gained on completion
}

export interface Apprentice {
  id: string;
  name: string;
  gender: "m" | "f";
  level: number;
  xp: number;
  curiosity: number; // 1-5
  endurance: number; // 1-5
  dexterity: number; // 1-5
  status: "idle" | "foraging" | "scavenging" | "resting";
  task: {
    type: "forage" | "scavenge";
    locationId: string | null;
    startDay: number;
    returnsOnDay: number;
    riskRoll: number;
  } | null;
  restUntilDay: number;
  missionsCompleted: number;
  totalFinds: number;
}

export interface LoyalCustomer {
  name: string;
  icon: string;
  faction: string;
  visits: number;
  totalSpent: number;
  questsDone: number;
  stars: number;
  chain: number;
  chainDone: boolean;
}

export interface BartexOffer {
  id: string;
  offerIngIds: string[];
  forTag: string;
  desc: string;
  addedDay: number;
}

export interface TechNode {
  id: string;
  name: string;
  icon: string;
  req: Record<string, number>; // e.g. { "ING06": 10 } or { "_process_Distill": 5 }
  desc: string;
  hint?: string; // Recipe ID to hint
  bonus?: string; // Bonus ID to unlock
}

export interface GameEventChoice {
  label: string;
  desc: string;
  fnString?: string; // We can parse or call statically based on index
}

export interface GameEvent {
  id: string;
  title: string;
  icon: string;
  text: string;
  choices: GameEventChoice[];
  unlockCondition?: (state: any) => boolean;
}

export interface Upgrade {
  id: string;
  name: string;
  icon: string;
  cost: number;
  desc: string;
  unlockBrewed?: number;
  unlockQuests?: number;
}

export interface Season {
  id: "spring" | "summer" | "autumn" | "winter";
  name: string;
  icon: string;
  days: number;
  foragingBonus: number;
  priceMultiplier: number;
  vigorBonus: number;
  riskMult: number;
  spoilMult: number;
  mountainLocked: boolean;
  desc: string;
}

export interface Food {
  id: string;
  name: string;
  icon: string;
  price: number;
  vigorGain: number;
  hungerReduce: number;
  desc: string;
}

export interface ForageLocation {
  id: string;
  name: string;
  icon: string;
  vigorCost: number;
  hungerCost: number;
  possibleFinds: { id: string; w: number }[];
  minFinds: number;
  maxFinds: number;
  risks: {
    chance: number;
    name: string;
    icon: string;
    effectText: string;
  }[];
  unlockAt: number;
}

export interface AilmentInfo {
  icon: string;
  name: string;
  color: string;
  desc: string;
  positive?: boolean;
}

export interface CauldronResidue {
  ingId: string;
  name: string;
  color: string;
  thermal: number;
  moisture: number;
  toxicity: number;
}

export type GameSaveData = GameState;

export interface GameState {
  gold: number;
  inventory: Record<string, number>; // { [ingId]: qty }
  slots: string[]; // active items in cauldron
  process: ProcessType;
  discovered: Record<string, boolean>; // { [recipeId]: true }
  hinted: Record<string, boolean>; // { [recipeId]: true }
  notes: Record<string, string>; // { [recipeId]: text }
  favorites: Record<string, boolean>; // { [recipeId]: true }
  brewed: number;
  maxToxSeen: number;
  vigor: number;
  hunger: number;
  gameDay: number;
  inventoryMeta: Record<string, { purchasedDays: number[] }>;
  questsCompleted: number;
  suspicion: number;
  inquisitionWarnings: number;
  upgrades: Record<string, boolean>; // { [upgradeId]: true }
  maxSlots: number;
  grindBonus: number;
  cellarBonus: boolean;
  silverLining: boolean;
  hasCalendar: boolean;
  residue: CauldronResidue | null;
  ailments: Record<string, boolean>;
  inspiredBrews: number;
  blessedBrews: number;
  apprenticeBrews: number;
  lastEventDay: number;
  usedEvents: string[];
  activeEventId: string | null;
  merchantDay: number;
  merchantStock: string[];
  marketBan: { ids: string[]; until: number; forageBan?: boolean } | null;
  tournament: { brewsLeft: number; bestValue: number } | null;
  grimoireFilter: string;
  grimoireSort: string;
  swampUnlockBonus: number;
  gremiumUnlocked: boolean;
  apprentices: Apprentice[];
  pendingReturn: {
    appId: string;
    finds: string[];
    riskTriggered: string | null;
    xpGained: number;
    leveledUp: boolean;
    oldLevel: number;
    newLevel: number;
    restUntilDay: number;
  } | null;
  loyalCustomers: Record<string, LoyalCustomer>;
  bartexOffer: BartexOffer | null;
  usageTrack: Record<string, number>;
  techStats: {
    distillCount: number;
    thermalCancels: number;
    toxOver60: number;
    herbTotal: number;
    nodeTotal?: number;
    mineralTotal: number;
  };
  techUnlocked: Record<string, boolean>;
  tutStep: number;
  tutRecipesCompleted?: Record<string, boolean>;
  seasonIndex: number;
  seasonDay: number;
  demand: Record<string, number>; // -3 to +3
  factions: { guild: number; order: number; underworld: number };
  blackMarketUnlocked: boolean;
  timePaused: boolean;
  droughtUntil: number;
  competitorUntil: number;
  competitorPenalty: number;
  quests?: Quest[];
  brewLog?: BrewLogEntry[];
}

export interface BrewLogEntry {
  id: string;
  day: number;
  potionName: string;
  potionIcon?: string;
  process: ProcessType;
  ingredientIds: string[];
  ingredientNames: string[];
  thermal: number;
  moisture: number;
  toxicity: number;
  isExact: boolean;
  value: number;
  timeStr: string;
}
