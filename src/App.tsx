import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Coins,
  ShieldAlert,
  Search,
  BookOpen,
  Compass,
  Users,
  Settings as SettingsIcon,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Plus,
  X,
  TrendingDown,
  Activity,
  CheckCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

import {
  Ingredient,
  Recipe,
  ProcessType,
  Quest,
  Apprentice,
  LoyalCustomer,
  CauldronResidue,
  GameState,
  BartexOffer
} from './types';

import {
  INGREDIENTS,
  RECIPES,
  FOODS,
  CUSTOMER_TEMPLATES,
  PARAMETRIC_TEMPLATES,
  FORAGE_LOCATIONS,
  UPGRADES,
  AILMENTS,
  SEASONS,
  CANONICAL_HOURS,
  BARTEX_OFFERS,
  LOYAL_NAMES,
  LOYAL_CHAIN_QUESTS
} from './data';

import {
  computeVector,
  matchRecipe,
  getProceduralRecipe,
  weightedRandom,
  getSpoilInfo,
  ingMap,
  recMap
} from './utils/gameUtils';

import { CauldronVisual } from './components/CauldronVisual';
import { VectorDisplay } from './components/VectorDisplay';
import { GrimoireTab } from './components/GrimoireTab';
import { LoyalCustomersTab } from './components/LoyalCustomersTab';
import { GremiumTab } from './components/GremiumTab';
import { TechTree } from './components/TechTree';
import { DistillationGame } from './components/DistillationGame';
import { TutorialGuideModal, TUTORIAL_RECIPES } from './components/TutorialGuideModal';

export default function App() {
  // ══════════════════════════════════════════════════════
  //  GLOBAL STATE
  // ══════════════════════════════════════════════════════
  const [gold, setGold] = useState<number>(150);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [inventoryMeta, setInventoryMeta] = useState<Record<string, { purchasedDays: number[] }>>({});
  const [slots, setSlots] = useState<string[]>([]);
  const [process, setProcess] = useState<ProcessType>("Mix");
  const [discovered, setDiscovered] = useState<Record<string, boolean>>({});
  const [hinted, setHinted] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [brewed, setBrewed] = useState<number>(0);
  const [maxToxSeen, setMaxToxSeen] = useState<number>(0);
  const [vigor, setVigor] = useState<number>(100);
  const [hunger, setHunger] = useState<number>(0);
  const [gameDay, setGameDay] = useState<number>(1);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [questsCompleted, setQuestsCompleted] = useState<number>(0);
  const [suspicion, setSuspicion] = useState<number>(0);
  const [inquisitionWarnings, setInquisitionWarnings] = useState<number>(0);
  const [upgrades, setUpgrades] = useState<Record<string, boolean>>({});
  const [residue, setResidue] = useState<CauldronResidue | null>(null);
  const [activeAilments, setActiveAilments] = useState<Record<string, boolean>>({});
  
  // Progression limits
  const [maxSlots, setMaxSlots] = useState<number>(6);
  const [grindBonus, setGrindBonus] = useState<number>(0);
  const [cellarBonus, setCellarBonus] = useState<boolean>(false);
  const [silverLining, setSilverLining] = useState<boolean>(false);
  const [hasCalendar, setHasCalendar] = useState<boolean>(false);

  // Seasons & calendar tracking
  const [seasonIndex, setSeasonIndex] = useState<number>(0);
  const [seasonDay, setSeasonDay] = useState<number>(0);
  const [demand, setDemand] = useState<Record<string, number>>({});
  const [factions, setFactions] = useState<{ guild: number; order: number; underworld: number }>({
    guild: 0,
    order: 0,
    underworld: 0,
  });
  const [blackMarketUnlocked, setBlackMarketUnlocked] = useState<boolean>(false);
  const [timePaused, setTimePaused] = useState<boolean>(false);

  // Sub-systems state
  const [loyalCustomers, setLoyalCustomers] = useState<Record<string, LoyalCustomer>>({});
  const [bartexOffer, setBartexOffer] = useState<BartexOffer | null>(null);
  const [usageTrack, setUsageTrack] = useState<Record<string, number>>({});
  const [techStats, setTechStats] = useState({
    distillCount: 0,
    thermalCancels: 0,
    toxOver60: 0,
    herbTotal: 0,
    mineralTotal: 0,
  });
  const [techUnlocked, setTechUnlocked] = useState<Record<string, boolean>>({});
  
  // Mentorship / Gremium
  const [gremiumUnlocked, setGremiumUnlocked] = useState<boolean>(false);
  const [apprentices, setApprentices] = useState<Apprentice[]>([]);
  const [pendingReturn, setPendingReturn] = useState<any>(null);

  // Temporary buffs tracking
  const [inspiredBrews, setInspiredBrews] = useState<number>(0);
  const [blessedBrews, setBlessedBrews] = useState<number>(0);
  const [apprenticeBrews, setApprenticeBrews] = useState<number>(0);
  const [droughtUntil, setDroughtUntil] = useState<number>(0);
  const [competitorUntil, setCompetitorUntil] = useState<number>(0);
  const [competitorPenalty, setCompetitorPenalty] = useState<number>(0);

  // Traveling merchant
  const [merchantDay, setMerchantDay] = useState<number>(-99);
  const [merchantStock, setMerchantStock] = useState<string[]>([]);

  // Tournament
  const [tournament, setTournament] = useState<{ brewsLeft: number; bestValue: number } | null>(null);

  // Story Events
  const [lastEventDay, setLastEventDay] = useState<number>(0);
  const [usedEvents, setUsedEvents] = useState<string[]>([]);
  const [activeEvent, setActiveEvent] = useState<any | null>(null);

  // Local Presentation state
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("quests");
  const [activeCenterTab, setActiveCenterTab] = useState<string>("bench");
  const [selectedIngredientId, setSelectedIngredientId] = useState<string | null>(null);
  
  // Modals view
  const [shopOpen, setShopOpen] = useState<boolean>(false);
  const [shopMode, setShopMode] = useState<"buy" | "sell" | "food" | "black">("buy");
  const [shopFilter, setShopFilter] = useState<string>("All");
  const [shopSearch, setShopSearch] = useState<string>("");
  const [bartexOpen, setBartexOpen] = useState<boolean>(false);
  const [merchantOpen, setMerchantOpen] = useState<boolean>(false);
  const [distillActive, setDistillActive] = useState<boolean>(false);
  const [lastBrewResult, setLastBrewResult] = useState<{ result: Recipe; vec: any; isExact: boolean } | null>(null);
  const [brewingAnimation, setBrewingAnimation] = useState<boolean>(false);
  const [swampUnlockBonus, setSwampUnlockBonus] = useState<number>(0);

  // Navigation Panel state for Mobile
  const [mobileActivePanel, setMobileActivePanel] = useState<"left" | "center" | "right">("center");

  // Notifications
  const [notifications, setNotifications] = useState<{ id: string; msg: string; type: "success" | "info" | "warn" | "error" }[]>([]);

  const addNotification = (msg: string, type: "success" | "info" | "warn" | "error" = "info") => {
    const id = Date.now().toString() + Math.random().toString();
    setNotifications(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  // Tutorial steps & Guide
  const [tutStep, setTutStep] = useState<number>(0); // 0=not started, 1..6=tutorial, -1=completed
  const [tutGuideOpen, setTutGuideOpen] = useState<boolean>(false);
  const [tutRecipesCompleted, setTutRecipesCompleted] = useState<Record<string, boolean>>({});

  const TUTORIAL_STEPS = [
    { text: "Vítej v AlchemiX! Jsi alchymistou v temném středověku. Vlevo vidíš svůj <strong>Sklad ingrediencí</strong> — klikni na vodu a víno, abys je přidal na pracovní stůl." },
    { text: "Skvěle! Přidal jsi ingredience do slotů na stole. Nyní zvol metodu úpravy (např. Smíchat nebo Vařit) a stiskni tlačítko <strong>UVAŘ!</strong>" },
    { text: "Pokud jsi trefil správný poměr a techniku, uvaříš recept zapsaný v Grimoiru! Jinak humorální engine vytvoří procedurální odvar." },
    { text: "Místní lidé tě navštěvují se svými trablemi v záložce <strong>📜 Zakázky</strong>. Plněním těchto kontraktů vyděláváš zlato a prestiž u frakcí." },
    { text: "Když ti chybí vzácné suroviny, navštiv trh (<strong>Navštívit trh</strong>). Zde můžeš také prodat své přebytečné sběry, nakoupit jídlo k obnově sil, nebo navštívit Černý trh." },
    { text: "Časem si získáš věhlas, který ti umožní otevřít <strong>Gremium</strong> — spolek učedníků, kteří za tebe budou sbírat vzácné byliny a kamení. Pozor však na zvídavé oči Inkvizice! Hodně štěstí. ⚗️" }
  ];

  // ══════════════════════════════════════════════════════
  //  MOUNT LOAD & PERSISTENCE
  // ══════════════════════════════════════════════════════
  useEffect(() => {
    const saved = localStorage.getItem('alchemix_react_save');
    if (saved) {
      try {
        const d = JSON.parse(saved) as GameState;
        setGold(d.gold ?? 150);
        setInventory(d.inventory ?? {});
        setDiscovered(d.discovered ?? {});
        setHinted(d.hinted ?? {});
        setNotes(d.notes ?? {});
        setFavorites(d.favorites ?? {});
        setBrewed(d.brewed ?? 0);
        setMaxToxSeen(d.maxToxSeen ?? 0);
        setVigor(d.vigor ?? 100);
        setHunger(d.hunger ?? 0);
        setGameDay(d.gameDay ?? 1);
        setInventoryMeta(d.inventoryMeta ?? {});
        setQuestsCompleted(d.questsCompleted ?? 0);
        setSuspicion(d.suspicion ?? 0);
        setInquisitionWarnings(d.inquisitionWarnings ?? 0);
        setUpgrades(d.upgrades ?? {});
        setResidue(d.residue ?? null);
        setActiveAilments(d.ailments ?? {});
        setInspiredBrews(d.inspiredBrews ?? 0);
        setBlessedBrews(d.blessedBrews ?? 0);
        setApprenticeBrews(d.apprenticeBrews ?? 0);
        setLastEventDay(d.lastEventDay ?? 0);
        setUsedEvents(d.usedEvents ?? []);
        setMerchantDay(d.merchantDay ?? -99);
        setMerchantStock(d.merchantStock ?? []);
        setSwampUnlockBonus(d.swampUnlockBonus ?? 0);
        setGremiumUnlocked(d.gremiumUnlocked ?? false);
        setApprentices(d.apprentices ?? []);
        setLoyalCustomers(d.loyalCustomers ?? {});
        setBartexOffer(d.bartexOffer ?? null);
        setUsageTrack(d.usageTrack ?? {});
        setTechStats(d.techStats ?? { distillCount: 0, thermalCancels: 0, toxOver60: 0, herbTotal: 0, mineralTotal: 0 });
        setTechUnlocked(d.techUnlocked ?? {});
        setTutStep(d.tutStep ?? 0);
        setTutRecipesCompleted(d.tutRecipesCompleted ?? {});
        setSeasonIndex(d.seasonIndex ?? 0);
        setSeasonDay(d.seasonDay ?? 0);
        setDemand(d.demand ?? {});
        setFactions(d.factions ?? { guild: 0, order: 0, underworld: 0 });
        setBlackMarketUnlocked(d.blackMarketUnlocked ?? false);
        setTimePaused(d.timePaused ?? false);
        setDroughtUntil(d.droughtUntil ?? 0);
        setCompetitorUntil(d.competitorUntil ?? 0);
        setCompetitorPenalty(d.competitorPenalty ?? 0);

        // Apply upgrades impact directly
        if (d.upgrades?.UPG_CAULDRON) setMaxSlots(8);
        if (d.upgrades?.UPG_MORTAR) setGrindBonus(1);
        if (d.upgrades?.UPG_CELLAR) setCellarBonus(true);
        if (d.upgrades?.UPG_SILVER) setSilverLining(true);
        if (d.upgrades?.UPG_CALENDAR) setHasCalendar(true);
      } catch (err) {
        console.error("Failed to load saved AlchemiX data", err);
      }
    } else {
      // Setup initial basic supplies
      const initialInv: Record<string, number> = {};
      const initialMeta: Record<string, { purchasedDays: number[] }> = {};
      ["ING01", "ING02", "ING03", "ING04", "ING05", "ING19"].forEach(id => {
        initialInv[id] = 3;
        initialMeta[id] = { purchasedDays: [1, 1, 1] };
      });
      setInventory(initialInv);
      setInventoryMeta(initialMeta);
      setTutStep(1); // Auto-start tutorial for new players
    }
  }, []);

  // Sync to localstorage
  const saveGame = () => {
    const saveData: GameState = {
      gold, inventory, slots, process, discovered, hinted, notes, favorites,
      brewed, maxToxSeen, vigor, hunger, gameDay, inventoryMeta, questsCompleted,
      suspicion, inquisitionWarnings, upgrades, maxSlots, grindBonus, cellarBonus,
      silverLining, hasCalendar, residue, ailments: activeAilments, inspiredBrews,
      blessedBrews, apprenticeBrews, lastEventDay, usedEvents, activeEventId: activeEvent?.id || null,
      merchantDay, merchantStock, marketBan: null, tournament, grimoireFilter: 'all',
      grimoireSort: 'name', swampUnlockBonus, gremiumUnlocked, apprentices, pendingReturn,
      loyalCustomers, bartexOffer, usageTrack, techStats, techUnlocked, tutStep, tutRecipesCompleted,
      seasonIndex, seasonDay, demand, factions, blackMarketUnlocked, timePaused,
      droughtUntil, competitorUntil, competitorPenalty
    };
    localStorage.setItem('alchemix_react_save', JSON.stringify(saveData));
    addNotification("Hra uložena do kroniky! 💾", "success");
  };

  const loadGameManual = () => {
    const saved = localStorage.getItem('alchemix_react_save');
    if (!saved) {
      addNotification("Žádný dřívější záznam v kronice nenalezen.", "warn");
      return;
    }
    // Simple reload to reset React states safely
    window.location.reload();
  };

  const resetGame = () => {
    if (!confirm("Opravdu si přeješ smazat veškerý svůj pokrok a začít jako chudý nováček?")) return;
    localStorage.removeItem('alchemix_react_save');
    window.location.reload();
  };

  // Generate initial quests if empty
  useEffect(() => {
    if (quests.length === 0) {
      const q1 = generateQuest();
      const q2 = generateQuest();
      const q3 = generateQuest();
      setQuests([q1, q2, q3]);
    }
  }, [quests]);

  // ══════════════════════════════════════════════════════
  //  CORE GENERATORS (QUESTS, EVENTS, MERCHANTS)
  // ══════════════════════════════════════════════════════
  const generateQuest = (): Quest => {
    const availableCustomers = CUSTOMER_TEMPLATES.filter(c => {
      if (c.id === 'CUST_SHADOW' && suspicion > 70) return false;
      return true;
    });
    const customer = availableCustomers[Math.floor(Math.random() * availableCustomers.length)];
    const qType = customer.questTypes[Math.floor(Math.random() * customer.questTypes.length)];

    if (qType === 'exact') {
      const pool = RECIPES.filter(r => {
        if (!ingMap[r.base]) return false;
        const totalCost = [r.base, ...r.req_ing].reduce((s, id) => s + (ingMap[id]?.price || 10), 0);
        return totalCost <= Math.max(25, gold * 0.4);
      });
      const selectedRecipe = pool.length ? pool[Math.floor(Math.random() * pool.length)] : RECIPES[0];
      const reward = Math.round((selectedRecipe.value || 15) * customer.priceMult * 1.35);
      return {
        id: 'Q' + Date.now().toString() + Math.random().toString(),
        type: 'exact',
        customer,
        targetRecipeId: selectedRecipe.id || '',
        targetName: selectedRecipe.name_cz,
        description: `Lékař žádá ${selectedRecipe.name_cz} pro svého urozeného pacienta.`,
        reward,
        expiresIn: 4,
        suspicionGain: customer.suspicion || 0,
      };
    } else if (qType === 'shady') {
      const templates = PARAMETRIC_TEMPLATES.filter(t => t.shady);
      const template = templates[Math.floor(Math.random() * templates.length)];
      const baseReward = 60 + Math.floor(Math.random() * 40);
      return {
        id: 'Q' + Date.now().toString() + Math.random().toString(),
        type: 'shady',
        customer,
        requirements: template.req,
        description: template.text,
        reward: Math.round(baseReward * template.mult * customer.priceMult),
        expiresIn: 3,
        suspicionGain: customer.suspicion || 15,
      };
    } else {
      const templates = PARAMETRIC_TEMPLATES.filter(t => !t.shady);
      const template = templates[Math.floor(Math.random() * templates.length)];
      const baseReward = 20 + Math.floor(Math.random() * 20);
      return {
        id: 'Q' + Date.now().toString() + Math.random().toString(),
        type: 'parametric',
        customer,
        requirements: template.req,
        description: template.text,
        reward: Math.round(baseReward * template.mult * customer.priceMult),
        expiresIn: 4,
        suspicionGain: 0,
      };
    }
  };

  // Faction handling
  const gainFaction = (key: 'guild' | 'order' | 'underworld', amount: number) => {
    setFactions(prev => {
      const nextVal = Math.max(0, Math.min(100, prev[key] + amount));
      const oldVal = prev[key];

      // Order rep brings hints!
      if (key === 'order' && Math.floor(nextVal / 10) > Math.floor(oldVal / 10)) {
        revealGrimoireHint();
      }

      // Underworld rep unlocks black market at 30+
      if (key === 'underworld' && nextVal >= 30 && !blackMarketUnlocked) {
        setBlackMarketUnlocked(true);
        addNotification("🌑 Černý trh odemčen v nabídce trhu!", "success");
      }

      return { ...prev, [key]: nextVal };
    });

    if (key === 'underworld' && amount > 0) {
      setSuspicion(prev => {
        const nextSusp = Math.min(100, prev + Math.floor(amount * 0.4));
        return nextSusp;
      });
    }
  };

  // Tech Tree unlock triggers
  const recordUsage = (usedSlots: string[], technique: ProcessType, vec: any) => {
    const nextTrack = { ...usageTrack };
    let herbAdded = 0;
    let mineralAdded = 0;

    usedSlots.forEach(id => {
      nextTrack[id] = (nextTrack[id] || 0) + 1;
      const ing = ingMap[id];
      if (ing?.type === 'Herb') herbAdded++;
      if (ing?.type === 'Mineral') mineralAdded++;
    });
    setUsageTrack(nextTrack);

    const nextStats = {
      distillCount: techStats.distillCount + (technique === 'Distill' ? 1 : 0),
      toxOver60: techStats.toxOver60 + (vec.toxicity > 60 ? 1 : 0),
      thermalCancels: techStats.thermalCancels,
      herbTotal: techStats.herbTotal + herbAdded,
      mineralTotal: techStats.mineralTotal + mineralAdded,
    };

    // Check thermal cancel
    const hasHot = usedSlots.some(id => (ingMap[id]?.thermal || 0) >= 2);
    const hasCold = usedSlots.some(id => (ingMap[id]?.thermal || 0) <= -2);
    if (hasHot && hasCold && Math.abs(vec.thermal) <= 1) {
      nextStats.thermalCancels += 1;
    }

    setTechStats(nextStats);

    // Scan achievements
    const newlyUnlocked: string[] = [];
    const checkNodes = [
      { id: 'TECH_POPPY', reqKey: 'ING06', needed: 10, hint: 'POT15' },
      { id: 'TECH_DISTILL5', reqKey: '_process_Distill', needed: 5, hint: 'POT02' },
      { id: 'TECH_PARADOX', reqKey: '_thermal_cancel', needed: 3, hint: 'POT12' },
      { id: 'TECH_RESIN3', doubleReq: { ING26: 5, ING31: 3 }, hint: 'POT69' },
      { id: 'TECH_HERB10', reqKey: '_herb_total', needed: 20, bonus: 'forage_herb' },
      { id: 'TECH_MINERAL5', reqKey: '_mineral_total', needed: 15, bonus: 'mountain_bonus' },
      { id: 'TECH_POISON', reqKey: '_tox_over60', needed: 5, bonus: 'black_market_early' }
    ];

    checkNodes.forEach(node => {
      if (techUnlocked[node.id]) return;

      let qualified = false;
      if (node.doubleReq) {
        qualified = Object.entries(node.doubleReq).every(([k, v]) => (nextTrack[k] || 0) >= v);
      } else {
        const val = node.reqKey?.startsWith('_')
          ? (nextStats as any)[node.reqKey.replace('_', '')]
          : nextTrack[node.reqKey || ''];
        qualified = (val || 0) >= (node.needed || 0);
      }

      if (qualified) {
        newlyUnlocked.push(node.id);
        setTechUnlocked(prev => ({ ...prev, [node.id]: true }));
        addNotification(`🔬 Výzkum odemčen: ${node.id === 'TECH_POPPY' ? 'Opium Purificatum' : 'Alchymický mistr'}!`, "success");
        if (node.hint) setHinted(prev => ({ ...prev, [node.hint!]: true }));
      }
    });
  };

  const revealGrimoireHint = () => {
    const pool = RECIPES.filter(r => !discovered[r.id || ''] && !hinted[r.id || ''] && ingMap[r.base]);
    if (pool.length === 0) return;
    const r = pool[Math.floor(Math.random() * pool.length)];
    setHinted(prev => ({ ...prev, [r.id || '']: true }));
    addNotification(`🌫️ Odhalil jsi tušený recept: ${r.category} (${r.process})`, "info");
  };

  // Spoilage system
  const checkSpoilageTrigger = (day: number) => {
    const spoiled: string[] = [];
    const nextInv = { ...inventory };
    const nextMeta = { ...inventoryMeta };

    Object.keys(nextInv).forEach(ingId => {
      if ((nextInv[ingId] || 0) <= 0) return;
      const info = getSpoilInfo(ingId, day, nextMeta[ingId]?.purchasedDays, cellarBonus);
      if (info.expired) {
        spoiled.push(ingMap[ingId]?.name_cz || ingId);
        nextInv[ingId] = 0;
        nextMeta[ingId] = { purchasedDays: [] };
      }
    });

    if (spoiled.length > 0) {
      setInventory(nextInv);
      setInventoryMeta(nextMeta);
      addNotification(`🗑️ Zkáza surovin: ${spoiled.join(', ')} podlehly hnilobě a plísním.`, "error");
    }
  };

  // Dynamic demand generator
  const triggerDynamicPrices = () => {
    // Generate new barter offer
    if (!bartexOffer && Math.random() < 0.4) {
      const bOffer = BARTEX_OFFERS[Math.floor(Math.random() * BARTEX_OFFERS.length)];
      setBartexOffer({ ...bOffer, addedDay: gameDay });
    }

    // Mean reverting demand
    setDemand(prev => {
      const nextDemand = { ...prev };
      Object.keys(nextDemand).forEach(k => {
        if (nextDemand[k] > 0) nextDemand[k]--;
        else if (nextDemand[k] < 0) nextDemand[k]++;
        if (nextDemand[k] === 0) delete nextDemand[k];
      });

      // Randomly spike 2 items
      const ids = Object.keys(ingMap);
      const spike1 = ids[Math.floor(Math.random() * ids.length)];
      const spike2 = ids[Math.floor(Math.random() * ids.length)];
      nextDemand[spike1] = Math.max(-3, Math.min(3, (nextDemand[spike1] || 0) + (Math.random() > 0.5 ? 2 : -2)));
      nextDemand[spike2] = Math.max(-3, Math.min(3, (nextDemand[spike2] || 0) + (Math.random() > 0.5 ? 1 : -1)));

      return nextDemand;
    });
  };

  // Holy Inquisition audit checking
  const checkInquisitionTrigger = () => {
    if (suspicion >= 100) {
      const contraband = INGREDIENTS.filter(i => i.toxicity >= 60 || i.tags.includes('poison')).map(i => i.id);
      const confiscated: string[] = [];
      const nextInv = { ...inventory };
      const nextMeta = { ...inventoryMeta };

      contraband.forEach(id => {
        if ((nextInv[id] || 0) > 0) {
          confiscated.push(ingMap[id]?.name_cz || id);
          nextInv[id] = 0;
          nextMeta[id] = { purchasedDays: [] };
        }
      });

      const fine = Math.floor(gold * 0.3);
      setGold(prev => Math.max(0, prev - fine));
      setInventory(nextInv);
      setInventoryMeta(nextMeta);
      setSuspicion(25);
      setInquisitionWarnings(0);

      addNotification(`🚨 INCIDENT INKVIZICE! Pokuta: ${fine} zlatých. Zabaveno: ${confiscated.length ? confiscated.join(', ') : 'nic'}.`, "error");
    } else if (suspicion >= 70 && inquisitionWarnings === 0) {
      setInquisitionWarnings(1);
      addNotification("⚠️ Stráže inkvizice krouží kolem tvé dílny! Odstraň jedovaté látky.", "warn");
    }
  };

  // Story Event Triggering
  const triggerStoryEvent = (day: number) => {
    if (activeEvent) return;
    if (day - lastEventDay < 5) return;
    if (Math.random() > 0.6) return;

    // Load available events
    const { EVENTS } = require('./data'); // Dynamic import safety
    const pool = EVENTS.filter((e: any) => {
      if (usedEvents.includes(e.id)) return false;
      if (e.unlockCondition && !e.unlockCondition()) return false;
      return true;
    });

    if (pool.length === 0) return;
    const selected = pool[Math.floor(Math.random() * pool.length)];
    setActiveEvent(selected);
    setLastEventDay(day);
    setUsedEvents(prev => [...prev, selected.id]);
  };

  // Apprentice expeditions return monitoring
  const advanceApprentices = (day: number) => {
    const nextApps = apprentices.map(app => {
      const copy = { ...app };
      if ((copy.status === 'foraging' || copy.status === 'scavenging') && copy.task) {
        if (day >= copy.task.returnsOnDay) {
          // Trigger return processing
          const finds: string[] = [];
          let riskTriggered: string | null = null;
          let xpGained = copy.task.type === 'forage' ? 8 : 3;

          const yieldMult = copy.level * 0.1 + 0.5;

          if (copy.task.type === 'forage') {
            const loc = FORAGE_LOCATIONS.find(l => l.id === copy.task?.locationId);
            if (loc) {
              const riskRoll = copy.task.riskRoll;
              const appRisk = loc.risks[0]?.chance * (1 - (copy.endurance - 1) * 0.08);

              if (riskRoll < appRisk && loc.risks[0]) {
                riskTriggered = loc.risks[0].name;
                xpGained = Math.max(1, xpGained - 3);
              } else {
                const bonus = copy.curiosity >= 4 ? 1 : 0;
                const baseCount = loc.minFinds + Math.floor(Math.random() * (loc.maxFinds - loc.minFinds + 1));
                const count = Math.max(1, Math.round(baseCount * yieldMult) + bonus);

                for (let i = 0; i < count; i++) {
                  const dropId = weightedRandom(loc.possibleFinds);
                  if (ingMap[dropId]) {
                    finds.push(ingMap[dropId].name_cz);
                    setInventory(prev => ({ ...prev, [dropId]: (prev[dropId] || 0) + 1 }));
                    setInventoryMeta(prev => {
                      const meta = prev[dropId] || { purchasedDays: [] };
                      return { ...prev, [dropId]: { purchasedDays: [...meta.purchasedDays, day] } };
                    });
                  }
                }
              }
            }
          } else {
            // Local scavenge
            const count = Math.max(1, Math.round((2 + Math.random() * 2) * yieldMult));
            for (let i = 0; i < count; i++) {
              const basicPool = ["ING01", "ING03", "ING04", "ING57", "ING59"];
              const dropId = basicPool[Math.floor(Math.random() * basicPool.length)];
              finds.push(ingMap[dropId].name_cz);
              setInventory(prev => ({ ...prev, [dropId]: (prev[dropId] || 0) + 1 }));
              setInventoryMeta(prev => {
                const meta = prev[dropId] || { purchasedDays: [] };
                return { ...prev, [dropId]: { purchasedDays: [...meta.purchasedDays, day] } };
              });
            }
          }

          // Compute Leveling
          const oldLevel = copy.level;
          const nextXP = copy.xp + xpGained;
          const neededXP = copy.level * 35;
          let newLevel = copy.level;
          let remainingXP = nextXP;
          let leveledUp = false;

          if (remainingXP >= neededXP && copy.level < 10) {
            remainingXP -= neededXP;
            newLevel++;
            leveledUp = true;
          }

          // Rest time
          const restPeriod = Math.max(1, 3 - Math.floor(copy.endurance / 2));
          copy.status = 'resting';
          copy.restUntilDay = day + restPeriod;
          copy.level = newLevel;
          copy.xp = remainingXP;
          copy.missionsCompleted += 1;
          copy.totalFinds += finds.length;
          copy.task = null;

          setPendingReturn({
            appId: copy.id,
            finds,
            riskTriggered,
            xpGained,
            leveledUp,
            oldLevel,
            newLevel,
            restUntilDay: copy.restUntilDay,
          });
        }
      } else if (copy.status === 'resting' && day >= copy.restUntilDay) {
        copy.status = 'idle';
      }
      return copy;
    });
    setApprentices(nextApps);
  };

  // Active Ailments execution
  const processAilments = () => {
    if (activeAilments.POISONED) {
      setVigor(prev => Math.max(0, prev - 4));
      addNotification("🤢 Jed ti koluje v žilách! Vigor -4", "error");
    }
    if (activeAilments.FEVERISH) {
      setVigor(prev => Math.min(70, prev));
    }
  };

  // Calendar Season management
  const getSeason = () => SEASONS[seasonIndex % SEASONS.length];

  const advanceCalendar = () => {
    if (timePaused) return;

    setSeasonDay(prev => {
      const nextDay = prev + 1;
      const current = getSeason();
      if (nextDay >= current.days) {
        setSeasonIndex(s => (s + 1) % SEASONS.length);
        const nextSeason = SEASONS[(seasonIndex + 1) % SEASONS.length];
        addNotification(`${nextSeason.icon} ${nextSeason.name} začíná! ${nextSeason.desc}`, "info");
        return 0;
      }
      return nextDay;
    });

    setGameDay(prev => {
      const nextD = prev + 1;
      checkSpoilageTrigger(nextD);
      advanceApprentices(nextD);
      triggerDynamicPrices();
      triggerStoryEvent(nextD);
      return nextD;
    });
  };

  // ══════════════════════════════════════════════════════
  //  INTERACTIONS & CONTROLS
  // ══════════════════════════════════════════════════════
  const addIngredientToSlot = (id: string) => {
    const qty = inventory[id] || 0;
    if (qty <= 0) {
      addNotification("Nemáš tuto surovinu ve skladu!", "warn");
      return;
    }
    if (slots.length >= maxSlots) {
      addNotification(`Stůl je plný! Kapacita stolu je ${maxSlots} slotů.`, "warn");
      return;
    }
    if (slots.includes(id)) {
      addNotification("Tento prvek už leží na stole.", "info");
      return;
    }
    setSlots(prev => [...prev, id]);

    // Tutorial flag progression
    if (tutStep === 1 && slots.length + 1 >= 2) {
      setTutStep(2);
    }
  };

  const removeIngredientFromSlot = (index: number) => {
    setSlots(prev => prev.filter((_, i) => i !== index));
  };

  const handleSetupTutorialSlots = (
    baseId: string,
    reqIds: string[],
    processType: 'Mix' | 'Grind' | 'Boil' | 'Distill'
  ) => {
    const missing = [baseId, ...reqIds].filter(id => (inventory[id] || 0) <= 0);
    if (missing.length > 0) {
      const missingNames = missing.map(id => ingMap[id]?.name_cz || id).join(', ');
      addNotification(`⚠️ Ve skladu chybí: ${missingNames}. Použij "Doplnit suroviny".`, 'warn');
      return;
    }
    setSlots([baseId, ...reqIds]);
    setProcess(processType);
    setActiveCenterTab('bench');
    addNotification(`⚡ Připraveno na stůl! Nyní stiskni tlačítko UVAŘ!`, 'success');
  };

  const handleRefillStartingIngredients = () => {
    setInventory(prev => {
      const next = { ...prev };
      ["ING01", "ING03", "ING04", "ING19"].forEach(id => {
        next[id] = Math.max(next[id] || 0, 3);
      });
      return next;
    });
    setInventoryMeta(prev => {
      const next = { ...prev };
      ["ING01", "ING03", "ING04", "ING19"].forEach(id => {
        if (!next[id] || (next[id].purchasedDays || []).length < 3) {
          next[id] = { purchasedDays: [gameDay, gameDay, gameDay] };
        }
      });
      return next;
    });
    addNotification("📦 Sklad byl doplněn o cvičné suroviny (Voda, Med, Ocet, Růže)!", "success");
  };

  // CORE BREWING ENGINE
  const triggerBrew = () => {
    if (slots.length === 0) return;

    if (process === 'Distill') {
      setDistillActive(true);
      return;
    }

    executeBrewProcess(100); // regular 100% standard process quality
  };

  const executeBrewProcess = (processQualityPct: number) => {
    setBrewingAnimation(true);

    setTimeout(() => {
      setBrewingAnimation(false);

      const vec = computeVector(slots, process, residue, silverLining);
      const matchedRaw = matchRecipe(slots, process);
      const isExact = !!matchedRaw;

      // Clone or generate procedural recipe
      let matched: Recipe;
      if (matchedRaw) {
        matched = { ...matchedRaw };
      } else {
        matched = { ...getProceduralRecipe(vec) };
      }

      // Minigame Quality updates
      if (process === 'Distill') {
        if (processQualityPct > 85) {
          vec.toxicity = Math.max(0, vec.toxicity - 15);
          matched.value = Math.round(matched.value * 1.25);
          addNotification("💧 Perfektní destilát! Toxicita snížena, hodnota +25%!", "success");
        } else if (processQualityPct < 40) {
          vec.toxicity = Math.min(100, vec.toxicity + 15);
          matched.value = Math.max(2, Math.round(matched.value * 0.8));
          setActiveAilments(prev => ({ ...prev, POISONED: true }));
          setSuspicion(prev => Math.min(100, prev + 8));
          addNotification('Znečištěný destilát vyvolal toxické výpary!', 'warn');
        }
      }

      // Consume materials
      setInventory((prev) => {
        const nextInv = { ...prev };
        slots.forEach((id) => {
          if (nextInv[id] > 0) nextInv[id]--;
        });
        return nextInv;
      });

      // FIFO record clean
      setInventoryMeta((prev) => {
        const nextMeta = { ...prev };
        slots.forEach((id) => {
          if (nextMeta[id]?.purchasedDays?.length) {
            nextMeta[id].purchasedDays.shift();
          }
        });
        return nextMeta;
      });

      // Update brewed counts
      setBrewed((prev) => prev + 1);
      setMaxToxSeen((prev) => Math.max(prev, vec.toxicity));

      if (isExact && matched.id && !discovered[matched.id]) {
        setDiscovered((prev) => ({ ...prev, [matched.id!]: true }));
        addNotification(`✨ Nový alchymistický recept zaznamenán: ${matched.name_cz}!`, 'success');
      }

      // Check tutorial 3-recipes progress reward
      if (isExact && matched.id) {
        const tutMatch = TUTORIAL_RECIPES.find(r => r.id === matched.id);
        if (tutMatch && !tutRecipesCompleted[matched.id]) {
          setTutRecipesCompleted(prev => ({ ...prev, [matched.id!]: true }));
          setGold(g => g + tutMatch.rewardGold);
          setVigor(v => Math.min(100, v + tutMatch.rewardVigor));
          addNotification(`🎓 Výuková lekce splněna: ${tutMatch.name}! Odměna: +${tutMatch.rewardGold} Zlata & +${tutMatch.rewardVigor} Síly!`, 'success');
        }
      }

      // Record tech-tree research counters
      recordUsage(slots, process, vec);

      // Restore energy if tonic is brewed
      if (matched.tags?.includes('tonic') && isExact) {
        setVigor((prev) => Math.min(100, prev + 12));
      }

      // Decrement active ailments counters, check cures
      setActiveAilments((prev) => {
        const next = { ...prev };
        if (next.POISONED && vec.toxicity < 10 && vec.thermal < 0) {
          delete next.POISONED;
          addNotification("🤢 Otrava z těla vypuzena čistým chladivým odvarem!", "success");
        }
        if (next.FEVERISH && vec.thermal <= -2 && vec.toxicity < 20) {
          delete next.FEVERISH;
          addNotification("🥵 Horečka byla zlomena mrazivým odvarem!", "success");
        }
        return next;
      });

      // Save memory residue for next potion
      if (slots.length > 0) {
        const highestToxId = [...slots].sort((a, b) => (ingMap[b]?.toxicity || 0) - (ingMap[a]?.toxicity || 0))[0];
        const carrier = ingMap[highestToxId];
        if (carrier) {
          const mult = silverLining ? 0.5 : 1.0;
          setResidue({
            ingId: carrier.id,
            name: carrier.name_cz,
            color: carrier.color,
            thermal: Math.round(carrier.thermal * 0.25 * mult),
            moisture: Math.round(carrier.moisture * 0.25 * mult),
            toxicity: Math.round(carrier.toxicity * 0.08 * mult),
          });
        }
      } else {
        setResidue(null);
      }

      // Deduct Vigor and add Hunger per action
      const poisonedTax = activeAilments.POISONED ? 4 : 0;
      setVigor((prev) => Math.max(0, prev - (2 + poisonedTax)));
      setHunger((prev) => Math.min(100, prev + 2));

      // Advance game calendar day if time is running
      if (!timePaused) {
        setGameDay((prev) => prev + 1);
        
        // Inline calendar advancement: check spoilages
        setInventory((prevInv) => {
          const nextInv = { ...prevInv };
          Object.keys(nextInv).forEach((id) => {
            const ing = ingMap[id];
            if (ing && ing.shelf_days > 0) {
              const meta = inventoryMeta[id];
              if (meta && meta.purchasedDays && meta.purchasedDays.length > 0) {
                let spoiledCount = 0;
                const nextDays = meta.purchasedDays.filter((buyDay) => {
                  const age = (gameDay + 1) - buyDay;
                  if (age > ing.shelf_days) {
                    spoiledCount++;
                    return false;
                  }
                  return true;
                });
                if (spoiledCount > 0) {
                  nextInv[id] = Math.max(0, nextInv[id] - spoiledCount);
                  addNotification(`🥀 Zkazilo se nám ${spoiledCount}× ${ing.name_cz}!`, 'warn');
                  setInventoryMeta((prevMeta) => ({
                    ...prevMeta,
                    [id]: { purchasedDays: nextDays },
                  }));
                }
              }
            }
          });
          return nextInv;
        });
      }

      // Evaluation of Quests
      setQuests((prevQuests) => {
        const nextQuests = prevQuests.map((q) => {
          let isCompleted = false;
          if (q.type === 'exact') {
            if (matched.id === q.targetRecipeId) isCompleted = true;
          } else {
            const req = q.requirements;
            if (req) {
              let ok = true;
              if (req.thermal_min !== undefined && vec.thermal < req.thermal_min) ok = false;
              if (req.thermal_max !== undefined && vec.thermal > req.thermal_max) ok = false;
              if (req.moisture_min !== undefined && vec.moisture < req.moisture_min) ok = false;
              if (req.moisture_max !== undefined && vec.moisture > req.moisture_max) ok = false;
              if (req.tox_min !== undefined && vec.toxicity < req.tox_min) ok = false;
              if (req.tox_max !== undefined && vec.toxicity > req.tox_max) ok = false;
              if (ok) isCompleted = true;
            }
          }

          if (isCompleted) {
            const starCount = loyalCustomers[q.customer.id]?.stars || 1;
            const hasLoyalBonus = starCount >= 2;
            const finalReward = Math.round(q.reward * (hasLoyalBonus ? 1.1 : 1.0));
            setGold((g) => g + finalReward);
            setQuestsCompleted((qc) => qc + 1);

            // Factions & Suspicion
            if (q.customer.id === 'CUST_KNIGHT') gainFaction('guild', 5);
            if (q.customer.id === 'CUST_MONK') gainFaction('order', 5);
            if (q.customer.id === 'CUST_MERCHANT') gainFaction('guild', 2);
            if (q.type === 'shady') gainFaction('underworld', 8);

            if (q.suspicionGain > 0) {
              setSuspicion((prev) => Math.min(100, prev + q.suspicionGain));
            }

            // Record customer loyalty
            setLoyalCustomers((prevLoyal) => {
              const cid = q.customer.id;
              const current = prevLoyal[cid] || {
                name: q.customer.name,
                icon: q.customer.icon,
                faction: cid,
                visits: 0,
                totalSpent: 0,
                questsDone: 0,
                stars: 1,
                chain: 0,
                chainDone: false,
              };
              const next = { ...current };
              next.visits += 1;
              next.totalSpent += finalReward;
              next.questsDone += 1;
              next.stars = next.visits >= 8 ? 4 : next.visits >= 4 ? 3 : next.visits >= 2 ? 2 : 1;
              return { ...prevLoyal, [cid]: next };
            });

            addNotification(`📜 Zakázka splněna! Obdržel jsi 💰 ${finalReward} zlatých.`, 'success');
            return null; // completed, remove from active quests list
          }

          const nextExpires = q.expiresIn - 1;
          if (nextExpires <= 0) {
            addNotification(`📜 Zakázka od ${q.customer.name} vypršela.`, 'warn');
            return null;
          }
          return { ...q, expiresIn: nextExpires };
        }).filter(Boolean) as Quest[];

        // Refill to 3 quests if empty
        while (nextQuests.length < 3) {
          nextQuests.push(generateQuest());
        }

        return nextQuests;
      });

      // Output state result
      setLastBrewResult({ result: matched, vec, isExact });

      // Clean slots
      setSlots([]);
    }, 850);
  };

  return (
    <div className="min-h-screen text-[#e8d5a3] font-sans antialiased relative pb-16 md:pb-0 bg-[#0d0a06]">
      {/* Real-time paused indicator */}
      {timePaused && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 bg-red-950/90 border border-red-700 text-red-400 px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-widest z-250 animate-pulse font-bold">
          ⏸️ Čas v dílně je zastaven
        </div>
      )}

      {/* Medieval Header */}
      <header className="border-b border-[#5c3d1a] bg-gradient-to-b from-[#1a1208] to-transparent py-4 px-6 sticky top-0 z-100 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-[#f0c040] font-bold tracking-widest text-shadow shadow-[#c8961e]/40 flex items-center justify-center md:justify-start gap-2">
              ⚗️ AlchemiX
            </h1>
            <p className="text-[10px] text-[#7a5f35] font-serif uppercase tracking-wider italic mt-0.5">
              Středověká lékárna · Alchymistická laboratoř
            </p>
          </div>

          {/* Stat bar */}
          <div className="flex gap-4 flex-wrap items-center justify-center text-xs font-serif">
            <span className="flex items-center gap-1.5 text-white">
              <Coins className="w-4 h-4 text-[#f0c040]" /> Zlato:{' '}
              <strong className="text-[#f0c040]">{gold}</strong>
            </span>
            <span className="text-[#b5945a]">
              Uvařeno: <strong className="text-white">{brewed}×</strong>
            </span>
            <span className="text-[#b5945a]">
              Recepty: <strong className="text-white">{Object.keys(discovered).length}</strong>
            </span>
            <span className="text-[#b5945a]">
              Den: <strong className="text-white">{gameDay}</strong>
            </span>
            <button
              onClick={() => setTutGuideOpen(true)}
              className="px-3 py-1 bg-gradient-to-r from-[#7a4a10] to-[#c8961e] hover:from-[#8a5a15] hover:to-[#e0a820] text-white border border-[#f0c040]/60 rounded-lg text-xs font-serif font-bold cursor-pointer shadow-md transition-all flex items-center gap-1.5"
            >
              🎓 Škola alchymie ({Object.keys(tutRecipesCompleted).length}/3)
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[calc(100vh-120px)] border-x border-[#5c3d1a]">
        
        {/* LEFT COLUMN: Warehouse Inventory */}
        <section className="lg:col-span-3 border-r border-[#5c3d1a] p-4 flex flex-col gap-4">
          <div className="border-b border-[#5c3d1a] pb-2 flex justify-between items-center">
            <h2 className="font-serif text-xs text-[#f0c040] tracking-widest uppercase">
              📦 Sklad surovin
            </h2>
            <button
              onClick={() => {
                setShopOpen(true);
                setShopMode('buy');
              }}
              className="px-2.5 py-1.5 bg-gradient-to-b from-[#7a4a10] to-[#c8961e] hover:from-[#8a5a15] hover:to-[#e0a820] text-white border border-[#f0c040]/50 rounded-lg text-[10px] font-serif uppercase font-bold tracking-wider cursor-pointer shadow-md transition-all flex items-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Tržiště
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#7a5f35] absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Hledat surovinu, účinek..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1208] border border-[#5c3d1a] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#e8d5a3] focus:outline-none focus:border-[#c8961e] placeholder-[#7a5f35]"
              />
            </div>
          </div>

          {/* Item scroll list */}
          <div className="flex flex-col gap-1.5 max-h-[450px] overflow-y-auto pr-1">
            {INGREDIENTS.filter(i => {
              const matchesQ = i.name_cz.toLowerCase().includes(searchQuery.toLowerCase()) || i.name_lat.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesQ;
            }).map(item => {
              const qty = inventory[item.id] || 0;
              const hasQty = qty > 0;
              const inCauldron = slots.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => hasQty && addIngredientToSlot(item.id)}
                  className={`p-2 border rounded-xl flex items-center justify-between transition-all select-none cursor-pointer ${
                    inCauldron
                      ? 'bg-[#c8961e]/10 border-[#c8961e]'
                      : hasQty
                      ? 'border-[#5c3d1a] bg-[#1a1208] hover:bg-[#241a0e] hover:border-[#7a5128]'
                      : 'border-[#5c3d1a]/20 bg-black/10 opacity-35 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <h4 className="font-serif text-[12px] text-white font-semibold">
                        {item.name_cz}
                      </h4>
                      <p className="text-[10px] text-[#7a5f35] italic">{item.name_lat}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#b5945a]">
                    {hasQty ? `${qty}×` : '—'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* CENTER COLUMN: Interactive Workbench */}
        <section className="lg:col-span-5 border-r border-[#5c3d1a] p-4 flex flex-col gap-4">
          {/* Sub tabs selectors */}
          <div className="flex border-b border-[#5c3d1a] gap-2">
            <button
              onClick={() => setActiveCenterTab('bench')}
              className={`flex-1 pb-2 text-xs font-serif uppercase tracking-wider cursor-pointer ${
                activeCenterTab === 'bench' ? 'border-b-2 border-[#c8961e] text-white' : 'text-[#7a5f35]'
              }`}
            >
              ⚗️ Stůl
            </button>
            <button
              onClick={() => setActiveCenterTab('research')}
              className={`flex-1 pb-2 text-xs font-serif uppercase tracking-wider cursor-pointer ${
                activeCenterTab === 'research' ? 'border-b-2 border-[#c8961e] text-white' : 'text-[#7a5f35]'
              }`}
            >
              🔬 Výzkum
            </button>
            <button
              onClick={() => setActiveCenterTab('stats')}
              className={`flex-1 pb-2 text-xs font-serif uppercase tracking-wider cursor-pointer ${
                activeCenterTab === 'stats' ? 'border-b-2 border-[#c8961e] text-white' : 'text-[#7a5f35]'
              }`}
            >
              📊 Kronika
            </button>
          </div>

          {activeCenterTab === 'bench' && (
            <div className="flex flex-col gap-4 flex-1">
              {/* Tutorial Quick Card Banner */}
              <div className="bg-gradient-to-r from-[#1f1509] via-[#2a1d0d] to-[#1f1509] border border-[#c8961e]/60 p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#c8961e]/20 border border-[#c8961e] flex items-center justify-center text-[#f0c040] font-bold text-base shadow">
                    🎓
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-[#f0c040]">
                      Škola alchymie · 3 Výukové recepty
                    </h4>
                    <p className="text-[11px] text-[#b5945a] font-serif">
                      {Object.keys(tutRecipesCompleted).length === 3
                        ? "Všechny 3 výukové lekce uvařeny! Skvělá práce."
                        : `Dokončeno: ${Object.keys(tutRecipesCompleted).length}/3. Nauč se Míchat, Vařit a Destilovat!`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setTutGuideOpen(true)}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-[#c8961e] to-[#f0c040] hover:brightness-110 text-black font-serif font-bold text-xs rounded-lg cursor-pointer whitespace-nowrap shadow transition-all"
                >
                  Otevřít recepty
                </button>
              </div>

              {/* Cauldron Visual Animation */}
              <CauldronVisual
                brewing={brewingAnimation}
                liquidColor={slots.length > 0 ? (ingMap[slots[0]]?.color || '#1a3320') : '#1a3320'}
                residue={residue}
                onClearResidue={() => {
                  if (vigor >= 5) {
                    setVigor(v => Math.max(0, v - 5));
                    setResidue(null);
                    addNotification("🧹 Vyčistil jsi kotel od starých zbytků.", "info");
                  }
                }}
                vigor={vigor}
              />

              {/* Added Slots */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-[#7a5f35] font-serif uppercase tracking-widest text-center">
                  Vložené suroviny v kotli ({slots.length} / {maxSlots})
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: maxSlots }).map((_, i) => {
                    const id = slots[i];
                    const item = id ? ingMap[id] : null;

                    return (
                      <div
                        key={i}
                        onClick={() => item && removeIngredientFromSlot(i)}
                        className={`h-16 border rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                          item
                            ? 'border-[#5c3d1a] bg-[#1a1208] hover:border-red-500'
                            : 'border-dashed border-[#5c3d1a]/40 bg-[#0d0a06]/40 text-[#7a5f35] hover:border-[#7a5128]'
                        }`}
                      >
                        {item ? (
                          <>
                            <span className="text-base">🌿</span>
                            <span className="text-[9px] font-serif text-center truncate w-full px-1 text-[#e8d5a3]">
                              {item.name_cz}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-[#5c3d1a] font-bold">+</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Method choice */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-[#7a5f35] font-serif uppercase tracking-widest text-center">
                  Postup zpracování
                </span>
                <div className="grid grid-cols-4 gap-1">
                  {(['Mix', 'Grind', 'Boil', 'Distill'] as ProcessType[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setProcess(p)}
                      className={`py-2 text-[11px] font-serif border rounded-lg cursor-pointer transition-colors ${
                        process === p
                          ? 'bg-[#c8961e] border-[#ffe88a] text-black font-bold'
                          : 'bg-[#1a1208] border-[#5c3d1a] text-[#b5945a] hover:bg-[#241a0e]'
                      }`}
                    >
                      {p === 'Mix' ? '🥄 Smíchat' : p === 'Grind' ? '🪨 Drtit' : p === 'Boil' ? '🔥 Vařit' : '💧 Destilovat'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action trigger */}
              <button
                disabled={slots.length === 0 || brewingAnimation}
                onClick={triggerBrew}
                className="w-full py-3.5 bg-gradient-to-r from-[#7a4a10] via-[#c8961e] to-[#7a4a10] hover:from-[#8a5a15] hover:to-[#e0a820] text-white border-2 border-[#ffe88a]/50 rounded-xl font-serif font-bold text-sm tracking-widest disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed shadow-lg transition-transform active:scale-98"
              >
                UVAŘ ELIXÍR!
              </button>

              {/* Humoral dynamic preview */}
              {slots.length > 0 && (
                <div className="mt-2">
                  <VectorDisplay
                    thermal={computeVector(slots, process, residue, silverLining).thermal}
                    moisture={computeVector(slots, process, residue, silverLining).moisture}
                    toxicity={computeVector(slots, process, residue, silverLining).toxicity}
                  />
                </div>
              )}

              {/* Output Result */}
              {lastBrewResult && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-2 border border-[#c8961e] bg-[#1a1208]/90 rounded-xl p-4 text-center relative shadow-inner"
                >
                  <button
                    onClick={() => setLastBrewResult(null)}
                    className="absolute top-2 right-2 p-1 text-[#7a5f35] hover:text-white rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="text-3xl block mb-1">⚗️</span>
                  <h3 className="font-serif text-[#f0c040] text-sm font-semibold">
                    {lastBrewResult.result.name_cz}
                  </h3>
                  <p className="text-[11px] text-[#7a5f35] italic font-serif">
                    {lastBrewResult.result.name_lat}
                  </p>
                  <p className="text-xs text-[#b5945a] leading-relaxed mt-2">
                    {lastBrewResult.result.effect}
                  </p>
                  <p className="text-[11px] text-[#2ecc71] font-serif font-bold mt-2">
                    Oceňovaná hodnota: 💰 {lastBrewResult.result.value} zlatých
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {activeCenterTab === 'research' && (
            <div className="flex flex-col gap-4">
              <TechTree
                usageTrack={usageTrack}
                techStats={techStats}
                techUnlocked={techUnlocked}
              />
            </div>
          )}

          {activeCenterTab === 'stats' && (
            <div className="flex flex-col gap-4 bg-[#1a1208] border border-[#5c3d1a] rounded-xl p-4">
              <h3 className="font-serif text-[#f0c040] text-sm font-bold tracking-wider pb-2 border-b border-[#5c3d1a]">
                📜 Záznamy dílny
              </h3>
              <div className="flex flex-col gap-2.5 text-xs text-[#b5945a] font-serif">
                <div className="flex justify-between">
                  <span>📅 Celkový věk laboratoře:</span>
                  <span className="text-white">{gameDay} dní</span>
                </div>
                <div className="flex justify-between">
                  <span>🧪 Celkem uvařeno:</span>
                  <span className="text-white">{brewed}×</span>
                </div>
                <div className="flex justify-between">
                  <span>🎖️ Splněné smlouvy:</span>
                  <span className="text-white">{questsCompleted} zakázek</span>
                </div>
                <div className="flex justify-between">
                  <span>👁️ Podezření u inkvizitorů:</span>
                  <span className="text-red-400 font-bold">{suspicion}%</span>
                </div>
              </div>

              {/* Alchemical Knowledge Stats */}
              <div className="border-t border-[#5c3d1a] pt-4 mt-2">
                <h4 className="font-serif text-white text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  📖 Alchemické vědění & Sklad
                </h4>
                <div className="flex flex-col gap-2.5 text-xs text-[#b5945a] font-serif">
                  <div className="flex justify-between">
                    <span>🌿 Celkem ingrediencí v encyklopedii:</span>
                    <span className="text-white font-bold">{INGREDIENTS.length}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 text-[10px] text-center bg-black/30 p-1.5 rounded-lg border border-[#5c3d1a]/50 my-0.5">
                    <div><span className="block text-[#2ecc71]">Byliny</span><span className="text-white font-mono">{INGREDIENTS.filter(i => i.type === 'Herb').length}</span></div>
                    <div><span className="block text-[#9b59b6]">Minerály</span><span className="text-white font-mono">{INGREDIENTS.filter(i => i.type === 'Mineral').length}</span></div>
                    <div><span className="block text-[#3498db]">Tekutiny</span><span className="text-white font-mono">{INGREDIENTS.filter(i => i.type === 'Liquid').length}</span></div>
                    <div><span className="block text-[#e67e22]">Pryskyřice</span><span className="text-white font-mono">{INGREDIENTS.filter(i => i.type === 'Resin').length}</span></div>
                    <div><span className="block text-[#e74c3c]">Živočišné</span><span className="text-white font-mono">{INGREDIENTS.filter(i => i.type === 'Animal').length}</span></div>
                  </div>

                  <div className="flex justify-between mt-1">
                    <span>📜 Celkem možných receptů:</span>
                    <span className="text-white font-bold">{RECIPES.length}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-[10px] text-center bg-black/30 p-1.5 rounded-lg border border-[#5c3d1a]/50 my-0.5">
                    <div><span className="block text-[#e67e22]">Míchání</span><span className="text-white font-mono">{RECIPES.filter(r => r.process === 'Mix').length}</span></div>
                    <div><span className="block text-[#f1c40f]">Tření</span><span className="text-white font-mono">{RECIPES.filter(r => r.process === 'Grind').length}</span></div>
                    <div><span className="block text-[#e74c3c]">Vaření</span><span className="text-white font-mono">{RECIPES.filter(r => r.process === 'Boil').length}</span></div>
                    <div><span className="block text-[#3498db]">Destilace</span><span className="text-white font-mono">{RECIPES.filter(r => r.process === 'Distill').length}</span></div>
                  </div>

                  <div className="flex justify-between mt-1">
                    <span>✨ Objevené recepty:</span>
                    <span className="text-[#f0c040] font-bold">
                      {Object.keys(discovered).length} / {RECIPES.length} ({Math.round((Object.keys(discovered).length / (RECIPES.length || 1)) * 100)}%)
                    </span>
                  </div>
                  
                  {/* Progress bar of discovery */}
                  <div className="w-full bg-black/40 rounded-full h-2 border border-[#5c3d1a] overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#7a4a10] to-[#c8961e] h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.round((Object.keys(discovered).length / (RECIPES.length || 1)) * 100))}%` }}
                    />
                  </div>

                  <div className="flex justify-between border-t border-[#5c3d1a]/30 pt-2.5 mt-1">
                    <span>📦 Unikátních surovin skladem:</span>
                    <span className="text-white">
                      {Object.values(inventory).filter(qty => (qty as number) > 0).length} druhů
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>⚖️ Celkový počet surovin skladem:</span>
                    <span className="text-white">
                      {Object.values(inventory).reduce((acc: number, qty) => acc + (qty as number), 0)} kusů
                    </span>
                  </div>
                </div>
              </div>

              {/* Upgrades store */}
              <div className="border-t border-[#5c3d1a] pt-4 mt-2">
                <h4 className="font-serif text-white text-xs uppercase tracking-widest mb-3">
                  🔨 Rozšíření dílny & Vybavení
                </h4>
                <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto">
                  {UPGRADES.map(item => {
                    const isBought = !!upgrades[item.id];
                    const canBuy = gold >= item.cost;

                    return (
                      <div
                        key={item.id}
                        className={`p-2.5 border rounded-lg flex items-center justify-between ${
                          isBought
                            ? 'border-green-600 bg-green-950/5 opacity-70'
                            : 'border-[#5c3d1a] bg-[#0d0a06]/40'
                        }`}
                      >
                        <div className="flex-1 pr-4">
                          <h5 className="font-serif text-[#e8d5a3] text-xs font-semibold">
                            {item.icon} {item.name}
                          </h5>
                          <p className="text-[10px] text-[#7a5f35] leading-snug mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                        {isBought ? (
                          <span className="text-[10px] text-green-500 font-bold shrink-0">
                            Aktivní
                          </span>
                        ) : (
                          <button
                            disabled={!canBuy}
                            onClick={() => {
                              setGold(prev => prev - item.cost);
                              setUpgrades(prev => ({ ...prev, [item.id]: true }));
                              if (item.id === 'UPG_CAULDRON') setMaxSlots(8);
                              if (item.id === 'UPG_MORTAR') setGrindBonus(1);
                              if (item.id === 'UPG_CELLAR') setCellarBonus(true);
                              if (item.id === 'UPG_SILVER') setSilverLining(true);
                              if (item.id === 'UPG_CALENDAR') setHasCalendar(true);
                              addNotification(`🔨 Vylepšení zakoupeno: ${item.name}!`, "success");
                            }}
                            className="px-2 py-1.5 bg-gradient-to-b from-[#7a4a10] to-[#c8961e] disabled:opacity-20 text-white rounded text-[10px] font-bold cursor-pointer font-serif shrink-0 border border-[#f0c040]/30"
                          >
                            🪙 {item.cost}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* RIGHT COLUMN: Quests, Foraging, Grimoire tabs */}
        <section className="lg:col-span-4 p-4 flex flex-col gap-4">
          <div className="flex border-b border-[#5c3d1a] gap-1 flex-wrap">
            {['quests', 'forage', 'grimoire', 'loyal', 'gremium'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 py-1.5 text-[10px] font-serif uppercase tracking-wider cursor-pointer ${
                  activeTab === t ? 'bg-[#5c3d1a] text-[#f0c040]' : 'text-[#7a5f35] hover:text-[#b5945a]'
                }`}
              >
                {t === 'quests' ? '📜 Cech' : t === 'forage' ? '🧭 Sběr' : t === 'grimoire' ? '📖 Recepty' : t === 'loyal' ? '👥 Zákazníci' : '🎓 Gremium'}
              </button>
            ))}
          </div>

          <div className="flex-1">
            {activeTab === 'quests' && (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-[#f0c040] text-xs uppercase tracking-widest">
                    📜 Smluvní listiny cechu
                  </h3>
                  <span className="text-[10px] text-[#7a5f35] font-serif">
                    Splněno: {questsCompleted} zakázek
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 max-h-[480px] overflow-y-auto pr-1">
                  {quests.map((q) => {
                    const isShady = q.type === 'shady';
                    return (
                      <div
                        key={q.id}
                        className={`border-2 p-3 rounded-xl flex flex-col gap-1.5 transition-all ${
                          isShady
                            ? 'border-purple-900 bg-purple-950/5'
                            : 'border-[#5c3d1a] bg-[#1a1208]/80 hover:border-[#7a5128]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{q.customer.icon}</span>
                          <span className="font-serif text-xs font-bold text-[#e8d5a3]">
                            {q.customer.name}
                          </span>
                        </div>
                        <p className="text-xs text-[#b5945a] leading-relaxed">
                          {q.description}
                        </p>
                        <div className="flex justify-between items-center text-[10px] mt-1.5 font-serif border-t border-[#5c3d1a]/30 pt-1.5">
                          <span className="text-[#f0c040] font-bold">💰 {q.reward} zlatých</span>
                          <span className="text-[#7a5f35]">Vyprší za: {q.expiresIn} vaření</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'forage' && (
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-[#f0c040] text-xs uppercase tracking-widest">
                  🧭 Výpravy do divočiny
                </h3>
                <p className="text-[11px] text-[#7a5f35] font-serif leading-relaxed italic">
                  Sběr stojí energii (Vigor) a zvyšuje Hlad. Doporučujeme nakoupit jídlo na trhu před cestou!
                </p>

                <div className="flex flex-col gap-2">
                  {FORAGE_LOCATIONS.map((loc) => {
                    const isLocked = questsCompleted < loc.unlockAt;
                    const canAfford = vigor >= loc.vigorCost;

                    return (
                      <div
                        key={loc.id}
                        className={`p-3 border rounded-xl flex items-center justify-between ${
                          isLocked ? 'border-[#5c3d1a]/20 opacity-40 bg-black/10' : 'border-[#5c3d1a] bg-[#1a1208]'
                        }`}
                      >
                        <div className="flex-1 pr-3">
                          <h4 className="font-serif text-white text-xs font-bold flex items-center gap-1.5">
                            <span>{loc.icon}</span> {loc.name}
                            {isLocked && <span className="text-[10px] text-red-500 font-normal ml-1">(Odemkne se od {loc.unlockAt} zakázek)</span>}
                          </h4>
                          <p className="text-[10px] text-[#7a5f35] mt-1 font-serif">
                            Spotřeba: ⚡ -{loc.vigorCost} Vigor / 🍖 +{loc.hungerCost} Hlad
                          </p>
                        </div>
                        <button
                          disabled={isLocked || !canAfford}
                          onClick={() => {
                            setVigor(v => Math.max(0, v - loc.vigorCost));
                            setHunger(h => Math.min(100, h + loc.hungerCost));
                            
                            // Loot calculation
                            const itemsFound: string[] = [];
                            const rollCount = loc.minFinds + Math.floor(Math.random() * (loc.maxFinds - loc.minFinds + 1));
                            
                            for (let i = 0; i < rollCount; i++) {
                              const dropId = weightedRandom(loc.possibleFinds);
                              if (ingMap[dropId]) {
                                itemsFound.push(ingMap[dropId].name_cz);
                                setInventory(prev => ({ ...prev, [dropId]: (prev[dropId] || 0) + 1 }));
                              }
                            }
                            advanceCalendar();
                            addNotification(`🧭 Nalezeno: ${itemsFound.join(', ')}`, "success");
                          }}
                          className="px-3 py-2 bg-gradient-to-b from-[#7a4a10] to-[#c8961e] disabled:opacity-20 text-white border border-[#f0c040]/30 rounded-lg text-xs font-bold cursor-pointer font-serif shrink-0 transition-all hover:brightness-110 active:scale-95"
                        >
                          Vyrazit
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'grimoire' && (
              <GrimoireTab
                discovered={discovered}
                hinted={hinted}
                favorites={favorites}
                notes={notes}
                onToggleFavorite={(id) => setFavorites(prev => ({ ...prev, [id]: !prev[id] }))}
                onSaveNote={(id, text) => setNotes(prev => ({ ...prev, [id]: text }))}
                onSaveGame={saveGame}
                onLoadGame={loadGameManual}
                onResetGame={resetGame}
              />
            )}

            {activeTab === 'loyal' && (
              <LoyalCustomersTab loyalCustomers={loyalCustomers} />
            )}

            {activeTab === 'gremium' && (
              <GremiumTab
                gremiumUnlocked={gremiumUnlocked}
                questsCompleted={questsCompleted}
                swampUnlockBonus={swampUnlockBonus}
                gold={gold}
                gameDay={gameDay}
                apprentices={apprentices}
                upgrades={upgrades}
                onHire={(slot) => {
                  const costs = [120, 250, 500];
                  const cost = costs[slot];
                  setGold(g => g - cost);
                  
                  const isFemale = Math.random() < 0.35;
                  const names = isFemale ? ['Hildegardis', 'Margaretha', 'Catharina'] : ['Albertus', 'Raymundus', 'Nicolaus'];
                  const name = names[Math.floor(Math.random() * names.length)];

                  const newApp: Apprentice = {
                    id: 'app_' + Date.now() + Math.random().toString(),
                    name,
                    gender: isFemale ? 'f' : 'm',
                    level: 1,
                    xp: 0,
                    curiosity: 2 + Math.floor(Math.random() * 3),
                    endurance: 2 + Math.floor(Math.random() * 3),
                    dexterity: 2 + Math.floor(Math.random() * 3),
                    status: 'idle',
                    task: null,
                    restUntilDay: 0,
                    missionsCompleted: 0,
                    totalFinds: 0,
                  };
                  setApprentices(prev => [...prev, newApp]);
                  addNotification(`🎓 Přijat nový učedník do Gremia: ${name}!`, "success");
                }}
                onDismiss={(id) => {
                  setApprentices(prev => prev.filter(a => a.id !== id));
                  addNotification("Propustil jsi učedníka z Gremia.", "info");
                }}
                onSend={(appId, type, locationId) => {
                  setApprentices(prev => prev.map(a => {
                    if (a.id === appId) {
                      const returns = gameDay + (type === 'forage' ? 1 : 1);
                      return {
                        ...a,
                        status: type === 'forage' ? 'foraging' : 'scavenging',
                        task: {
                          type,
                          locationId,
                          startDay: gameDay,
                          returnsOnDay: returns,
                          riskRoll: Math.random()
                        }
                      };
                    }
                    return a;
                  }));
                  addNotification("Učedník vyrazil na sběr.", "info");
                }}
              />
            )}
          </div>
        </section>
      </main>

      {/* Popups & Dialogs Overlay */}
      <AnimatePresence>
        {/* Shop Modal */}
        {shopOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-200 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#1a1208] border-2 border-[#c8961e] max-w-xl w-full rounded-2xl p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setShopOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-[#7a5f35] hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="font-serif text-lg text-[#f0c040] mb-4">🛒 Tržiště a Obchod</h2>

              <div className="flex gap-2 border-b border-[#5c3d1a] pb-3 mb-4">
                {['buy', 'sell', 'food', 'black'].map((mode) => {
                  if (mode === 'black' && !blackMarketUnlocked) return null;
                  return (
                    <button
                      key={mode}
                      onClick={() => setShopMode(mode as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-serif ${
                        shopMode === mode ? 'bg-[#c8961e] text-black font-bold' : 'text-[#7a5f35] hover:text-white'
                      }`}
                    >
                      {mode === 'buy' ? 'Koupit' : mode === 'sell' ? 'Prodat' : mode === 'food' ? 'Potraviny' : 'Černý trh 🌑'}
                    </button>
                  );
                })}
              </div>

              {/* BUY panel */}
              {shopMode === 'buy' && (
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                    {INGREDIENTS.map((item) => {
                      const finalPrice = Math.max(1, Math.round(item.price * (1 + (demand[item.id] || 0) * 0.15)));
                      const canAfford = gold >= finalPrice;

                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (canAfford) {
                              setGold(g => g - finalPrice);
                              setInventory(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
                            }
                          }}
                          className={`p-2 border rounded-xl flex items-center justify-between cursor-pointer ${
                            canAfford ? 'border-[#5c3d1a] hover:border-[#c8961e] bg-[#0d0a06]/40' : 'opacity-40 cursor-not-allowed'
                          }`}
                        >
                          <div>
                            <span className="font-serif text-[11px] block text-white font-bold">{item.name_cz}</span>
                            <span className="text-[10px] text-[#7a5f35] font-serif italic">🪙 {finalPrice}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SELL panel */}
              {shopMode === 'sell' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                  {Object.entries(inventory).filter(([, qty]) => (qty as number) > 0).map(([id, qty]) => {
                    const item = ingMap[id];
                    if (!item) return null;
                    const sellPrice = Math.max(1, Math.round(item.price * 0.6));

                    return (
                      <div
                        key={id}
                        onClick={() => {
                          setGold(g => g + sellPrice);
                          setInventory(prev => ({ ...prev, [id]: prev[id] - 1 }));
                        }}
                        className="p-2 border border-[#5c3d1a] hover:border-red-500 rounded-xl flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <span className="font-serif text-[11px] block text-white font-bold">{item.name_cz}</span>
                          <span className="text-[10px] text-[#2ecc71] font-serif">Prodej: 🪙 {sellPrice}</span>
                        </div>
                        <span className="text-[10px] text-[#7a5f35]">{qty}×</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* FOOD panel */}
              {shopMode === 'food' && (
                <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto">
                  {FOODS.map((f) => {
                    const canAfford = gold >= f.price;
                    return (
                      <div
                        key={f.id}
                        onClick={() => {
                          if (canAfford) {
                            setGold(g => g - f.price);
                            setVigor(v => Math.min(100, v + f.vigorGain));
                            setHunger(h => Math.max(0, h - f.hungerReduce));
                            addNotification(`${f.icon} Sněden ${f.name}! Vigor +${f.vigorGain}`, "success");
                          }
                        }}
                        className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer ${
                          canAfford ? 'border-[#5c3d1a] hover:border-[#c8961e] bg-[#0d0a06]/40' : 'opacity-40 cursor-not-allowed'
                        }`}
                      >
                        <div>
                          <span className="text-xl block mb-1">{f.icon}</span>
                          <span className="font-serif text-xs block text-white font-bold">{f.name}</span>
                          <span className="text-[10px] text-green-500">⚡ +{f.vigorGain} Vigor</span>
                        </div>
                        <span className="text-xs text-[#f0c040] font-semibold">🪙 {f.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Distillation Active Minigame Modal */}
        {distillActive && (
          <DistillationGame
            onComplete={(quality) => {
              setDistillActive(false);
              executeBrewProcess(quality);
            }}
            onCancel={() => setDistillActive(false)}
          />
        )}
      </AnimatePresence>

      {/* Tutorial Overlay */}
      {tutStep > 0 && tutStep <= TUTORIAL_STEPS.length && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-300 flex items-end justify-center pb-24 md:pb-12 pointer-events-none">
          <div className="w-full max-w-lg bg-[#1a1208] border-2 border-[#c8961e] p-5 rounded-2xl pointer-events-auto mx-4 shadow-2xl relative">
            <span className="text-[9px] text-[#7a5f35] font-serif uppercase tracking-widest block mb-1">
              Průvodce alchymií · Krok {tutStep} / {TUTORIAL_STEPS.length}
            </span>
            <p className="text-xs text-[#e8d5a3] font-serif leading-relaxed" dangerouslySetInnerHTML={{ __html: TUTORIAL_STEPS[tutStep - 1].text }} />
            
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setTutStep(-1)}
                className="text-[10px] text-[#7a5f35] hover:text-red-400 font-serif cursor-pointer underline"
              >
                Přeskočit návod
              </button>
              <button
                onClick={() => {
                  if (tutStep === TUTORIAL_STEPS.length) {
                    setTutStep(-1);
                    setGremiumUnlocked(true); // unlock apprentiship as end of tut
                  } else {
                    setTutStep(prev => prev + 1);
                  }
                }}
                className="px-3.5 py-1.5 bg-[#c8961e] hover:bg-[#ffe88a] text-black rounded-lg text-xs font-bold font-serif cursor-pointer"
              >
                Rozumím →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial 3-Recipes Guide Modal */}
      <TutorialGuideModal
        isOpen={tutGuideOpen}
        onClose={() => setTutGuideOpen(false)}
        inventory={inventory}
        ingMap={ingMap}
        onSetupSlots={handleSetupTutorialSlots}
        onRefillStartingIngredients={handleRefillStartingIngredients}
        tutRecipesCompleted={tutRecipesCompleted}
        discoveredRecipes={discovered}
      />

      {/* Floating Notifications */}
      <div className="fixed bottom-6 right-6 z-400 flex flex-col gap-2 max-w-sm pointer-events-none">
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`p-3 border rounded-xl shadow-lg pointer-events-auto text-xs font-serif ${
              n.type === 'success'
                ? 'bg-green-950/90 border-green-600 text-green-200'
                : n.type === 'error'
                ? 'bg-red-950/90 border-red-800 text-red-200'
                : n.type === 'warn'
                ? 'bg-yellow-950/90 border-yellow-700 text-yellow-200'
                : 'bg-[#1a1208]/90 border-[#5c3d1a] text-[#e8d5a3]'
            }`}
          >
            {n.msg}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Safety stubs for required checks
function recordTechStats(slots: string[], process: string, vec: any) {}
function tickAilments(vec: any) {}
function addAilment(name: string) {}
function addSuspicion(val: number) {}
function addAlert(text: string, state: string) {}
function recordResidue(slots: string[]) {}
function poisonedTax(ailments: any): number { return 0; }
function advanceCalendar() {}
function checkQuestFulfillment(result: any, vec: any) {}
function resultProduct(matched: any, vec: any, exact: boolean) {}
function setLastResult(arg: any) {}
