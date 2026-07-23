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
  BartexOffer,
  BrewLogEntry,
  CraftedPotionItem
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
import { SettingsModal, THEMES } from './components/SettingsModal';

export default function App() {
  // ══════════════════════════════════════════════════════
  //  GLOBAL STATE
  // ══════════════════════════════════════════════════════
  const [gold, setGold] = useState<number>(150);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [potionInventory, setPotionInventory] = useState<Record<string, CraftedPotionItem>>({});
  const [forageExp, setForageExp] = useState<number>(0);
  const [inventoryMeta, setInventoryMeta] = useState<Record<string, { purchasedDays: number[] }>>({});
  const [slots, setSlots] = useState<string[]>([]);
  const [process, setProcess] = useState<ProcessType>("Mix");
  const [discovered, setDiscovered] = useState<Record<string, boolean>>({});
  const [hinted, setHinted] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [brewed, setBrewed] = useState<number>(0);
  const [brewLog, setBrewLog] = useState<BrewLogEntry[]>([]);
  const [logSearch, setLogSearch] = useState<string>('');
  const [logProcessFilter, setLogProcessFilter] = useState<string>('all');
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
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock'>('in_stock');
  const [ingredientTypeFilter, setIngredientTypeFilter] = useState<string>('All');
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

  // Settings & Theme
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<string>(() => localStorage.getItem('alchemix_theme') || 'default');
  const [tutBannerDismissed, setTutBannerDismissed] = useState<boolean>(() => localStorage.getItem('alchemix_tut_banner_dismissed') === 'true');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('alchemix_theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem('alchemix_tut_banner_dismissed', tutBannerDismissed ? 'true' : 'false');
  }, [tutBannerDismissed]);

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
    { text: "Vítej v Athanor v2! Jsi alchymistou v temném středověku. Vlevo vidíš svůj <strong>Sklad ingrediencí</strong> — klikni na vodu a víno, abys je přidal na pracovní stůl." },
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
        setPotionInventory(d.potionInventory ?? {});
        setForageExp(d.forageExp ?? 0);
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

  const applySaveData = (d: any) => {
    if (!d) return;
    setGold(d.gold ?? 150);
    setInventory(d.inventory ?? {});
    setPotionInventory(d.potionInventory ?? {});
    setForageExp(d.forageExp ?? 0);
    setDiscovered(d.discovered ?? {});
    setHinted(d.hinted ?? {});
    setNotes(d.notes ?? {});
    setFavorites(d.favorites ?? {});
    setBrewed(d.brewed ?? 0);
    setBrewLog(d.brewLog ?? []);
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
    if (d.quests && Array.isArray(d.quests)) {
      setQuests(d.quests);
    }

    if (d.upgrades?.UPG_CAULDRON) setMaxSlots(8);
    if (d.upgrades?.UPG_MORTAR) setGrindBonus(1);
    if (d.upgrades?.UPG_CELLAR) setCellarBonus(true);
    if (d.upgrades?.UPG_SILVER) setSilverLining(true);
    if (d.upgrades?.UPG_CALENDAR) setHasCalendar(true);
  };

  // Sync to localstorage
  const saveGame = () => {
    const saveData: GameState = {
      gold, inventory, potionInventory, forageExp, slots, process, discovered, hinted, notes, favorites,
      brewed, maxToxSeen, vigor, hunger, gameDay, inventoryMeta, questsCompleted,
      suspicion, inquisitionWarnings, upgrades, maxSlots, grindBonus, cellarBonus,
      silverLining, hasCalendar, residue, ailments: activeAilments, inspiredBrews,
      blessedBrews, apprenticeBrews, lastEventDay, usedEvents, activeEventId: activeEvent?.id || null,
      merchantDay, merchantStock, marketBan: null, tournament, grimoireFilter: 'all',
      grimoireSort: 'name', swampUnlockBonus, gremiumUnlocked, apprentices, pendingReturn,
      loyalCustomers, bartexOffer, usageTrack, techStats, techUnlocked, tutStep, tutRecipesCompleted,
      seasonIndex, seasonDay, demand, factions, blackMarketUnlocked, timePaused,
      droughtUntil, competitorUntil, competitorPenalty, quests, brewLog
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
    try {
      const d = JSON.parse(saved);
      applySaveData(d);
      addNotification("📂 Hra byla načtena z paměti!", "success");
    } catch (err) {
      addNotification("❌ Chyba při načítání pozice!", "error");
    }
  };

  const handleExportSave = () => {
    const saveData = {
      gold, inventory, slots, process, discovered, hinted, notes, favorites,
      brewed, maxToxSeen, vigor, hunger, gameDay, inventoryMeta, questsCompleted,
      suspicion, inquisitionWarnings, upgrades, maxSlots, grindBonus, cellarBonus,
      silverLining, hasCalendar, residue, ailments: activeAilments, inspiredBrews,
      blessedBrews, apprenticeBrews, lastEventDay, usedEvents, activeEventId: activeEvent?.id || null,
      merchantDay, merchantStock, marketBan: null, tournament, grimoireFilter: 'all',
      grimoireSort: 'name', swampUnlockBonus, gremiumUnlocked, apprentices, pendingReturn,
      loyalCustomers, bartexOffer, usageTrack, techStats, techUnlocked, tutStep, tutRecipesCompleted,
      seasonIndex, seasonDay, demand, factions, blackMarketUnlocked, timePaused,
      droughtUntil, competitorUntil, competitorPenalty, quests, brewLog
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(saveData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `alchemix_save_den_${gameDay}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addNotification("📥 Soubor s uložení byl stažen do počítače.", "success");
  };

  const handleImportSave = (jsonText: string) => {
    try {
      const d = JSON.parse(jsonText);
      applySaveData(d);
      saveGame();
      addNotification("🎉 Pozice ze souboru byla úspěšně načtena!", "success");
    } catch (err) {
      addNotification("❌ Neplatný formát souboru s uložením!", "error");
    }
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

      // Update brewed counts & log
      setBrewed((prev) => prev + 1);
      setMaxToxSeen((prev) => Math.max(prev, vec.toxicity));

      const ingNames = slots.map(id => ingMap[id]?.name_cz || id);
      const newLogEntry: BrewLogEntry = {
        id: `brew_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        day: gameDay,
        potionName: matched.name_cz,
        potionIcon: matched.tags?.includes('tonic') ? '🧪' : '🏺',
        process,
        ingredientIds: [...slots],
        ingredientNames: ingNames,
        thermal: vec.thermal,
        moisture: vec.moisture,
        toxicity: vec.toxicity,
        isExact,
        value: matched.value,
        timeStr: `Den ${gameDay}`,
      };
      setBrewLog((prev) => [newLogEntry, ...prev].slice(0, 100));

      // Store crafted potion or powder in laboratory warehouse stock (potionInventory)
      const pKey = matched.id || matched.name_cz;
      const isPowder = process === 'Grind';
      setPotionInventory((prev) => {
        const existing = prev[pKey] || {
          id: pKey,
          name_cz: matched.name_cz,
          category: isPowder ? 'Powder' : matched.category || 'Liquid',
          value: matched.value || (isExact ? 15 : 2),
          isExact,
          count: 0,
          icon: isPowder ? '🧪' : '🏺',
          process,
        };
        return {
          ...prev,
          [pKey]: {
            ...existing,
            count: existing.count + 1,
          },
        };
      });

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

  const activeTheme = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  return (
    <div
      className="min-h-screen font-sans antialiased relative pb-16 md:pb-0 transition-colors duration-500"
      style={{
        backgroundColor: activeTheme.bgMain,
        color: activeTheme.textColor,
      }}
    >
      {/* Real-time paused indicator */}
      {timePaused && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 bg-red-950/90 border border-red-700 text-red-400 px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-widest z-250 animate-pulse font-bold">
          ⏸️ Čas v dílně je zastaven
        </div>
      )}

      {/* Medieval Header */}
      <header className="border-b border-[#5c3d1a] bg-[#1a1208]/90 py-4 px-6 sticky top-0 z-100 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="font-['Cinzel'] text-3xl md:text-4xl text-[#f0c040] font-bold tracking-widest flex items-center justify-center md:justify-start gap-2">
              ⚗️ Athanor v2
            </h1>
            <p className="text-[10px] text-[#7a5f35] font-serif uppercase tracking-wider italic mt-0.5">
              Středověká lékárna · Alchymistická laboratoř
            </p>
          </div>

          {/* Stat bar */}
          <div className="flex gap-2.5 flex-wrap items-center justify-center text-xs font-serif">
            <span className="flex items-center gap-1 bg-[#1a1208]/80 border border-[#5c3d1a] px-2 py-1 rounded-lg text-white" title="Zlato v truhle">
              <Coins className="w-3.5 h-3.5 text-[#f0c040]" />
              <strong className="text-[#f0c040]">{gold} zl.</strong>
            </span>
            <span className="flex items-center gap-1 bg-[#1a1208]/80 border border-[#5c3d1a] px-2 py-1 rounded-lg text-[#e8d5a3]" title="Energijní síla">
              ⚡ Vigor: <strong className={vigor < 25 ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>{vigor}/100</strong>
            </span>
            <span className="flex items-center gap-1 bg-[#1a1208]/80 border border-[#5c3d1a] px-2 py-1 rounded-lg text-[#e8d5a3]" title="Stupeň hladu">
              🍖 Hlad: <strong className={hunger > 50 ? 'text-amber-400 font-bold' : 'text-white'}>{hunger}/100</strong>
            </span>
            <span className="flex items-center gap-1 bg-[#1a1208]/80 border border-[#5c3d1a] px-2 py-1 rounded-lg text-[#e8d5a3]" title="Splněné cechovní zakázky">
              📜 Zakázky: <strong className="text-[#f0c040] font-bold">{questsCompleted}</strong>
            </span>
            <span className="flex items-center gap-1 bg-[#1a1208]/80 border border-[#5c3d1a] px-2 py-1 rounded-lg text-[#b5945a]" title="Počet uvařených lektvarů">
              🧪 <strong className="text-white">{brewed}×</strong>
            </span>
            <span className="flex items-center gap-1 bg-[#1a1208]/80 border border-[#5c3d1a] px-2 py-1 rounded-lg text-[#b5945a]" title="Objevené recepty v grimoáru">
              📖 <strong className="text-white">{Object.keys(discovered).length}/{RECIPES.length}</strong>
            </span>
            <span className="flex items-center gap-1 bg-[#1a1208]/80 border border-[#5c3d1a] px-2 py-1 rounded-lg text-[#b5945a]">
              📅 Den <strong className="text-white">{gameDay}</strong>
            </span>
            <button
              onClick={() => setTutGuideOpen(true)}
              className="px-2.5 py-1 bg-gradient-to-r from-[#7a4a10] to-[#c8961e] hover:from-[#8a5a15] hover:to-[#e0a820] text-white border border-[#f0c040]/60 rounded-lg text-xs font-serif font-bold cursor-pointer shadow-md transition-all flex items-center gap-1.5"
            >
              🎓 Škola ({Object.keys(tutRecipesCompleted).length}/3)
            </button>
            <button
              onClick={() => setSettingsOpen(true)}
              className="px-2.5 py-1 bg-[#2a1d0d] hover:bg-[#3d2a13] text-[#e8d5a3] border border-[#5c3d1a] hover:border-[#c8961e] rounded-lg text-xs font-serif font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow"
              title="Nastavení hry (Ukládání, Motivy, Verze)"
            >
              <SettingsIcon className="w-3.5 h-3.5 text-[#f0c040]" /> Nastavení
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[calc(100vh-120px)] border-x border-[#5c3d1a]">
        
        {/* LEFT COLUMN: Warehouse Inventory */}
        <section className="lg:col-span-3 border-r border-[#5c3d1a] p-4 flex flex-col gap-4 lg:min-h-[calc(100vh-120px)]">
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
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#7a5f35] absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Hledat surovinu, latinský název..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1208] border border-[#5c3d1a] rounded-lg pl-8 pr-7 py-1.5 text-xs text-[#e8d5a3] focus:outline-none focus:border-[#c8961e] placeholder-[#7a5f35]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-[#7a5f35] hover:text-white cursor-pointer"
                  title="Vymazat hledání"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Main Toggle Switch: Skladem vs Vše */}
            <div className="grid grid-cols-2 bg-[#120d07] border border-[#5c3d1a] p-1 rounded-xl text-xs font-serif shadow-inner">
              <button
                onClick={() => setStockFilter('in_stock')}
                className={`py-1.5 px-2 text-center rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  stockFilter === 'in_stock'
                    ? 'bg-gradient-to-r from-[#7a4a10] to-[#c8961e] text-white shadow border border-[#f0c040]/30'
                    : 'text-[#b5945a] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>📦 Skladem</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${stockFilter === 'in_stock' ? 'bg-black/40 text-[#f0c040]' : 'bg-black/30 text-[#8a6f45]'}`}>
                  {INGREDIENTS.filter(i => (inventory[i.id] || 0) > 0).length}
                </span>
              </button>

              <button
                onClick={() => setStockFilter('all')}
                className={`py-1.5 px-2 text-center rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  stockFilter === 'all'
                    ? 'bg-gradient-to-r from-[#7a4a10] to-[#c8961e] text-white shadow border border-[#f0c040]/30'
                    : 'text-[#b5945a] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>📚 Vše</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${stockFilter === 'all' ? 'bg-black/40 text-[#f0c040]' : 'bg-black/30 text-[#8a6f45]'}`}>
                  {INGREDIENTS.length}
                </span>
              </button>
            </div>

            {/* Ingredient Type Filter Pills */}
            <div className="flex flex-wrap gap-1.5 py-1 text-[11px] font-serif">
              {[
                { id: 'All', label: 'Všechny typy' },
                { id: 'Herb', label: '🌿 Byliny' },
                { id: 'Mineral', label: '💎 Minerály' },
                { id: 'Liquid', label: '💧 Tekutiny' },
                { id: 'Resin', label: '🪵 Pryskyřice' },
                { id: 'Animal', label: '🐾 Živočišné' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setIngredientTypeFilter(cat.id)}
                  className={`px-2 py-0.5 rounded-md border whitespace-nowrap cursor-pointer transition-all ${
                    ingredientTypeFilter === cat.id
                      ? 'bg-[#c8961e]/25 border-[#c8961e] text-[#f0c040] font-bold shadow'
                      : 'border-[#5c3d1a]/50 text-[#b5945a] hover:text-white bg-[#1a1208]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Item scroll list */}
          <div className="flex flex-col gap-1.5 max-h-[50vh] lg:max-h-[calc(100vh-320px)] flex-1 overflow-y-auto pr-1">
            {(() => {
              const items = INGREDIENTS.filter(i => {
                const qty = inventory[i.id] || 0;
                if (stockFilter === 'in_stock' && qty <= 0) return false;
                if (ingredientTypeFilter !== 'All' && i.type !== ingredientTypeFilter) return false;
                if (searchQuery.trim()) {
                  const q = searchQuery.toLowerCase();
                  const nameCzMatches = i.name_cz.toLowerCase().includes(q);
                  const nameLatMatches = i.name_lat.toLowerCase().includes(q);
                  const tagsMatches = (i.tags || []).some(t => t.toLowerCase().includes(q));
                  const typeMatches = i.type.toLowerCase().includes(q);
                  if (!nameCzMatches && !nameLatMatches && !tagsMatches && !typeMatches) return false;
                }
                return true;
              });

              if (items.length === 0) {
                return (
                  <div className="p-4 text-center text-xs text-[#7a5f35] font-serif bg-black/20 rounded-xl border border-[#5c3d1a]/30">
                    Žádné suroviny neodpovídají zvoleným filtrům.
                  </div>
                );
              }

              return items.map(item => {
                const qty = inventory[item.id] || 0;
                const hasQty = qty > 0;
                const inCauldron = slots.includes(item.id);

                return (
                  <div
                    key={item.id}
                    onClick={() => hasQty && addIngredientToSlot(item.id)}
                    className={`p-2 border rounded-xl flex items-center justify-between transition-all select-none cursor-pointer ${
                      inCauldron
                        ? 'bg-[#c8961e]/15 border-[#c8961e] shadow-sm'
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
                    <span className={`font-mono text-xs font-bold ${hasQty ? 'text-[#f0c040]' : 'text-stone-600'}`}>
                      {hasQty ? `${qty}×` : '—'}
                    </span>
                  </div>
                );
              });
            })()}
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
              {!tutBannerDismissed && (
                <div className="bg-gradient-to-r from-[#1f1509] via-[#2a1d0d] to-[#1f1509] border border-[#c8961e]/60 p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-lg relative">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#c8961e]/20 border border-[#c8961e] flex items-center justify-center text-[#f0c040] font-bold text-base shadow shrink-0">
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
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setTutGuideOpen(true)}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-[#c8961e] to-[#f0c040] hover:brightness-110 text-black font-serif font-bold text-xs rounded-lg cursor-pointer whitespace-nowrap shadow transition-all"
                    >
                      Otevřít
                    </button>
                    <button
                      onClick={() => {
                        setTutBannerDismissed(true);
                        localStorage.setItem('alchemix_tut_banner_dismissed', 'true');
                      }}
                      className="p-1 text-[#7a5f35] hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                      title="Zavřít tento banner (lze kdykoliv otevřít z tlačítka v hlavičce)"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

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
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] text-[#7a5f35] font-serif uppercase tracking-widest">
                    Vložené suroviny v kotli ({slots.length} / {maxSlots})
                  </span>
                  {Object.values(inventory).some(qty => (qty as number) > 0) && slots.length < maxSlots && (
                    <span className="text-[9px] text-[#f0c040] font-serif animate-pulse flex items-center gap-1">
                      ✨ Klikni na surovinu vlevo pro vložení
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(() => {
                    const hasIngredients = Object.values(inventory).some(qty => (qty as number) > 0);
                    return Array.from({ length: maxSlots }).map((_, i) => {
                      const id = slots[i];
                      const item = id ? ingMap[id] : null;

                      return (
                        <div
                          key={i}
                          onClick={() => item && removeIngredientFromSlot(i)}
                          className={`h-16 border rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all relative overflow-hidden ${
                            item
                              ? 'border-[#5c3d1a] bg-[#1a1208] hover:border-red-500 hover:bg-red-950/20 shadow-md'
                              : hasIngredients
                              ? 'border-dashed border-[#c8961e] bg-[#c8961e]/10 text-[#f0c040] hover:border-[#f0c040] hover:bg-[#c8961e]/20 animate-pulse shadow-[0_0_12px_rgba(200,150,30,0.25)]'
                              : 'border-dashed border-[#5c3d1a]/40 bg-[#0d0a06]/40 text-[#7a5f35] hover:border-[#7a5128]'
                          }`}
                          title={item ? `${item.name_cz} (klikni pro odebrání)` : hasIngredients ? "Vyber surovinu v levém skladu pro vložení" : "Prázdný slot"}
                        >
                          {item ? (
                            <>
                              <span className="text-base">{item.type === 'Herb' ? '🌿' : item.type === 'Mineral' ? '💎' : item.type === 'Liquid' ? '💧' : item.type === 'Resin' ? '🪵' : '🐾'}</span>
                              <span className="text-[9px] font-serif text-center truncate w-full px-1 text-[#e8d5a3] font-semibold">
                                {item.name_cz}
                              </span>
                            </>
                          ) : hasIngredients ? (
                            <div className="flex flex-col items-center justify-center gap-0.5">
                              <span className="text-sm text-[#f0c040] font-bold">+</span>
                              <span className="text-[8px] font-serif text-[#c8961e] font-bold tracking-tight">Vlož surovinu</span>
                            </div>
                          ) : (
                            <span className="text-sm text-[#5c3d1a] font-bold">+</span>
                          )}
                        </div>
                      );
                    });
                  })()}
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

              {/* Workbench Recent Brew Log Feed */}
              {brewLog.length > 0 && (
                <div className="mt-3 border border-[#5c3d1a]/60 bg-[#120d07]/60 rounded-xl p-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between border-b border-[#5c3d1a]/40 pb-1.5">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-[#f0c040] flex items-center gap-1">
                      📜 Poslední uvařené elixíry ({brewLog.length})
                    </span>
                    <button
                      onClick={() => setActiveCenterTab('stats')}
                      className="text-[10px] font-serif text-[#b5945a] hover:text-[#f0c040] underline cursor-pointer"
                    >
                      Otevřít celou kroniku &rarr;
                    </button>
                  </div>
                  <div className="flex flex-col gap-1.5 max-h-[160px] overflow-y-auto pr-1">
                    {brewLog.slice(0, 4).map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-[#1a1208] border border-[#5c3d1a]/50 p-2 rounded-lg flex flex-col gap-1 text-[11px]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-[#e8d5a3] flex items-center gap-1">
                            <span>{entry.potionIcon || '🧪'}</span> {entry.potionName}
                          </span>
                          <span className="text-[9px] text-[#7a5f35] font-serif">
                            {entry.timeStr} · {entry.process === 'Mix' ? '🥄' : entry.process === 'Grind' ? '🪨' : entry.process === 'Boil' ? '🔥' : '💧'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-[#7a5f35]">Suroviny:</span>
                            {entry.ingredientNames.map((ing, idx) => (
                              <span key={idx} className="bg-[#0d0a06] border border-[#5c3d1a]/40 px-1.5 py-0.5 rounded text-[#b5945a]">
                                {ing}
                              </span>
                            ))}
                          </div>
                          <span className="text-[#2ecc71] font-bold font-serif shrink-0 ml-1">
                            💰 {entry.value} z.
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
              <div className="flex justify-between items-center pb-2 border-b border-[#5c3d1a]">
                <h3 className="font-serif text-[#f0c040] text-sm font-bold tracking-wider flex items-center gap-2">
                  📜 Kronika & Záznamy dílny
                </h3>
                <span className="text-[11px] text-[#7a5f35] font-serif">
                  Aktivních zakázek: <strong className="text-white">{quests.length}</strong>
                </span>
              </div>

              {/* ACTIVE GUILD QUESTS IN KRONIKA */}
              <div className="bg-[#120d07] border border-[#5c3d1a] rounded-xl p-3.5 flex flex-col gap-3">
                <h4 className="font-serif text-xs text-[#f0c040] font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>📜 Aktivní cechovní zakázky ({quests.length})</span>
                  <span className="text-[10px] text-[#b5945a] font-normal italic">
                    Odevzdej přímo z truhly vytvořených lektvarů
                  </span>
                </h4>

                {quests.length === 0 ? (
                  <div className="text-center italic text-[#7a5f35] py-3 text-xs font-serif bg-black/20 rounded-lg">
                    Nemáš žádné aktivní zakázky. Nové zakázky se objevují každé ráno!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {quests.map((q) => {
                      const matchingPotion = (Object.values(potionInventory) as CraftedPotionItem[]).find(
                        p => p.count > 0 && (
                          (q.targetRecipeId && p.id === q.targetRecipeId) ||
                          (q.targetName && p.name_cz.toLowerCase().includes(q.targetName.toLowerCase()))
                        )
                      );
                      const hasStock = Boolean(matchingPotion);

                      return (
                        <div
                          key={q.id}
                          className={`p-3 border rounded-xl flex flex-col justify-between gap-2 bg-[#1a1208] ${
                            hasStock ? 'border-[#f0c040] ring-1 ring-[#f0c040]/30 shadow-md' : 'border-[#5c3d1a]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{q.customer.icon}</span>
                              <div>
                                <span className="font-serif text-xs font-bold text-[#e8d5a3] block">
                                  {q.customer.name}
                                </span>
                                <span className="text-[10px] text-[#7a5f35] font-serif">
                                  {q.customer.role || 'Zákazník cechu'}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs text-[#f0c040] font-bold font-mono bg-black/40 px-2 py-0.5 rounded border border-[#5c3d1a]">
                              💰 {q.reward} zl.
                            </span>
                          </div>

                          <p className="text-xs text-[#b5945a] leading-relaxed italic">
                            "{q.description}"
                          </p>

                          <div className="flex items-center justify-between border-t border-[#5c3d1a]/40 pt-2 text-[10px] font-serif">
                            {hasStock ? (
                              <span className="text-green-400 font-bold flex items-center gap-1">
                                ✅ Máš v truhle ({matchingPotion?.name_cz})
                              </span>
                            ) : (
                              <span className="text-amber-400/80 italic">
                                ⏳ Poptává: {q.targetName || 'Speciální lektvar'}
                              </span>
                            )}

                            <button
                              onClick={() => {
                                if (hasStock && matchingPotion) {
                                  let fulfilled = false;
                                  setPotionInventory(prev => {
                                    const entry = (Object.entries(prev) as [string, CraftedPotionItem][]).find(([k, item]) =>
                                      ((matchingPotion.id && (k === matchingPotion.id || item.id === matchingPotion.id)) ||
                                      (matchingPotion.name_cz && item.name_cz === matchingPotion.name_cz)) && item.count > 0
                                    );
                                    if (!entry || entry[1].count <= 0) return prev;
                                    const [dictKey, curItem] = entry;
                                    fulfilled = true;
                                    const newCount = curItem.count - 1;
                                    if (newCount <= 0) {
                                      const next = { ...prev };
                                      delete next[dictKey];
                                      return next;
                                    }
                                    return {
                                      ...prev,
                                      [dictKey]: {
                                        ...curItem,
                                        count: newCount
                                      }
                                    };
                                  });

                                  if (fulfilled) {
                                    setGold(g => g + q.reward);
                                    setQuestsCompleted(qc => qc + 1);
                                    setQuests(prev => prev.filter(quest => quest.id !== q.id));
                                    addNotification(`🎉 Zakázka pro ${q.customer.name} splněna! Získal jsi 🪙 ${q.reward} zl.!`, "success");
                                  } else {
                                    addNotification(`❌ V truhle nemáš dostatek lektvaru na skladě!`, "error");
                                  }
                                } else {
                                  addNotification(`❌ V truhle nemáš potřebný lektvar: ${q.targetName || 'požadovaný lektvar'}. Uvař ho u stolu!`, "error");
                                }
                              }}
                              className={`px-3 py-1 font-serif font-bold text-xs rounded-lg cursor-pointer transition-all ${
                                hasStock
                                  ? 'bg-gradient-to-r from-[#c8961e] to-[#f0c040] text-black hover:brightness-110 shadow'
                                  : 'bg-[#2a1d0d] text-[#7a5f35] border border-[#5c3d1a] hover:text-[#b5945a]'
                              }`}
                            >
                              {hasStock ? '🤝 Odevzdat & Vybrat odměnu' : '🧪 Uvařit v dílně'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* GENERAL STATS SUMMARY */}
              <div className="flex flex-col gap-2.5 text-xs text-[#b5945a] font-serif">
                <div className="flex justify-between">
                  <span>📅 Celkový věk laboratoře:</span>
                  <span className="text-white font-bold">{gameDay} dní</span>
                </div>
                <div className="flex justify-between">
                  <span>🧪 Celkem uvařeno preparátů:</span>
                  <span className="text-white font-bold">{brewed}×</span>
                </div>
                <div className="flex justify-between">
                  <span>📜 Splněné cechovní smlouvy:</span>
                  <span className="text-[#f0c040] font-bold">{questsCompleted} zakázek</span>
                </div>
                <div className="flex justify-between">
                  <span>👁️ Podezření u svaté inkvizice:</span>
                  <span className={suspicion > 50 ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>{suspicion}%</span>
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

              {/* LOG UVAŘENÝCH SUROVIN A ELIXÍRŮ */}
              <div className="border-t border-[#5c3d1a] pt-4 mt-2">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif text-[#f0c040] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                    📜 Log uvařených surovin a elixírů ({brewLog.length})
                  </h4>
                  {brewLog.length > 0 && (
                    <button
                      onClick={() => {
                        if (confirm("Chceš opravdu smazat historii uvařených surovin v logu?")) {
                          setBrewLog([]);
                          addNotification("📜 Log vaření byl vyčištěn.", "info");
                        }
                      }}
                      className="text-[10px] text-red-400/80 hover:text-red-300 font-serif underline cursor-pointer"
                    >
                      Vymazat log
                    </button>
                  )}
                </div>

                {/* Search & Filter bar for Log */}
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#7a5f35]" />
                    <input
                      type="text"
                      placeholder="Hledat v logu (název, surovina...)"
                      value={logSearch}
                      onChange={(e) => setLogSearch(e.target.value)}
                      className="w-full bg-[#0d0a06] border border-[#5c3d1a] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#e8d5a3] placeholder-[#7a5f35] focus:outline-none focus:border-[#c8961e]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 text-[10px] font-serif">
                    {[
                      { id: 'all', label: 'Vše' },
                      { id: 'Mix', label: '🥄 Smíchat' },
                      { id: 'Grind', label: '🪨 Drtit' },
                      { id: 'Boil', label: '🔥 Vařit' },
                      { id: 'Distill', label: '💧 Destilovat' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setLogProcessFilter(f.id)}
                        className={`px-2 py-1 border rounded cursor-pointer whitespace-nowrap ${
                          logProcessFilter === f.id
                            ? 'bg-[#c8961e] border-[#ffe88a] text-black font-bold'
                            : 'bg-[#0d0a06] border-[#5c3d1a] text-[#b5945a] hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Log Entries List */}
                <div className="flex flex-col gap-2 max-h-[320px] overflow-y-auto pr-1">
                  {(() => {
                    const filtered = brewLog.filter((entry) => {
                      if (logProcessFilter !== 'all' && entry.process !== logProcessFilter) return false;
                      if (logSearch) {
                        const q = logSearch.toLowerCase();
                        const matchName = entry.potionName.toLowerCase().includes(q);
                        const matchIng = entry.ingredientNames.some((ing) => ing.toLowerCase().includes(q));
                        if (!matchName && !matchIng) return false;
                      }
                      return true;
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="p-4 border border-dashed border-[#5c3d1a]/50 rounded-lg text-center text-[#7a5f35] text-xs font-serif">
                          {brewLog.length === 0
                            ? "Dosud jsi neuvařil žádný lektvar. Vlož suroviny do kotle na Stole a vyrob svůj první alchymistický preparát!"
                            : "Žádný záznam v logu neodpovídá zvolenému filtru."}
                        </div>
                      );
                    }

                    return filtered.map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-[#0d0a06]/80 border border-[#5c3d1a] p-3 rounded-lg flex flex-col gap-2 text-xs"
                      >
                        <div className="flex items-center justify-between border-b border-[#5c3d1a]/30 pb-1.5">
                          <div className="flex items-center gap-1.5 font-serif font-bold text-[#f0c040]">
                            <span className="text-sm">{entry.potionIcon || '🧪'}</span>
                            <span>{entry.potionName}</span>
                            {entry.isExact ? (
                              <span className="text-[9px] bg-green-950/80 text-green-400 border border-green-700/60 px-1.5 py-0.5 rounded font-normal">
                                Recept
                              </span>
                            ) : (
                              <span className="text-[9px] bg-amber-950/80 text-amber-400 border border-amber-700/60 px-1.5 py-0.5 rounded font-normal">
                                Pokus
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-[#7a5f35] font-serif">
                            <span>{entry.timeStr}</span>
                            <span className="bg-[#1a1208] border border-[#5c3d1a] px-1.5 py-0.5 rounded text-[#e8d5a3]">
                              {entry.process === 'Mix' ? '🥄 Smíchat' : entry.process === 'Grind' ? '🪨 Drtit' : entry.process === 'Boil' ? '🔥 Vařit' : '💧 Destilovat'}
                            </span>
                          </div>
                        </div>

                        {/* Used Ingredients badges */}
                        <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                          <span className="text-[#7a5f35] font-serif">Použité suroviny:</span>
                          {entry.ingredientNames.map((ingName, idx) => (
                            <span
                              key={idx}
                              className="bg-[#1a1208] border border-[#5c3d1a] px-2 py-0.5 rounded-md text-[#e8d5a3] font-serif flex items-center gap-1"
                            >
                              <span>🌿</span> {ingName}
                            </span>
                          ))}
                        </div>

                        {/* Vector & Value summary */}
                        <div className="flex items-center justify-between text-[10px] text-[#b5945a] font-mono bg-black/30 p-1.5 rounded border border-[#5c3d1a]/40">
                          <div className="flex gap-3 font-serif">
                            <span>🔥 Teplo: <strong className={entry.thermal > 0 ? 'text-red-400' : entry.thermal < 0 ? 'text-blue-400' : 'text-gray-300'}>{entry.thermal > 0 ? `+${entry.thermal}` : entry.thermal}</strong></span>
                            <span>💧 Vlhko: <strong className={entry.moisture > 0 ? 'text-cyan-400' : entry.moisture < 0 ? 'text-amber-400' : 'text-gray-300'}>{entry.moisture > 0 ? `+${entry.moisture}` : entry.moisture}</strong></span>
                            <span>☣️ Toxicita: <strong className={entry.toxicity > 50 ? 'text-red-400' : 'text-green-400'}>{entry.toxicity}</strong></span>
                          </div>
                          <span className="text-[#2ecc71] font-serif font-bold text-xs">
                            💰 {entry.value} z.
                          </span>
                        </div>
                      </div>
                    ));
                  })()}
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
          <div className="flex border-b border-[#5c3d1a]/60 gap-1 flex-wrap">
            {['quests', 'forage', 'grimoire', 'loyal', 'gremium'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 min-w-[70px] py-2 px-1 text-[11px] font-serif uppercase tracking-wider cursor-pointer rounded-t-lg transition-all border-t border-x ${
                  activeTab === t
                    ? 'bg-[#5c3d1a] text-[#f0c040] font-bold border-[#c8961e]/60 shadow-sm'
                    : 'bg-[#1a1208]/20 border-transparent text-[#7a5f35] hover:text-[#b5945a] hover:bg-[#1a1208]/40'
                }`}
              >
                {t === 'quests' ? '📜 Cech' : t === 'forage' ? '🧭 Sběr' : t === 'grimoire' ? '📖 Recepty' : t === 'loyal' ? '👥 Zákazníci' : '🎓 Gremium'}
              </button>
            ))}
          </div>

          <div className="flex-1">
            {activeTab === 'quests' && (
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-[#f0c040] text-xs uppercase tracking-widest">
                    📜 Smluvní listiny cechu
                  </h3>
                  <span className="text-[10px] text-[#7a5f35] font-serif">
                    Splněno: {questsCompleted} zakázek
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 max-h-[55vh] lg:max-h-[calc(100vh-260px)] flex-1 overflow-y-auto pr-1">
                  {quests.map((q) => {
                    const isShady = q.type === 'shady';
                    return (
                      <div
                        key={q.id}
                        className={`border-2 p-3 rounded-xl flex flex-col gap-2 transition-all ${
                          q.isDealAccepted
                            ? 'border-[#c8961e] bg-[#22180b] shadow-lg ring-1 ring-[#f0c040]/30'
                            : isShady
                            ? 'border-purple-900 bg-purple-950/20'
                            : 'border-[#5c3d1a] bg-[#1a1208]/80 hover:border-[#7a5128]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{q.customer.icon}</span>
                            <span className="font-serif text-xs font-bold text-[#e8d5a3]">
                              {q.customer.name}
                            </span>
                          </div>
                          {q.isDealAccepted ? (
                            <span className="text-[10px] bg-[#c8961e]/20 text-[#f0c040] border border-[#c8961e]/50 px-2 py-0.5 rounded-full font-serif font-bold flex items-center gap-1 shrink-0">
                              🤝 Deal podepsán (+40%)
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#7a5f35] font-serif shrink-0">
                              Standardní poptávka
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#b5945a] leading-relaxed">
                          {q.description}
                        </p>

                        <div className="flex justify-between items-center text-[10px] mt-0.5 font-serif border-t border-[#5c3d1a]/30 pt-2">
                          <span className="text-[#f0c040] font-bold text-xs">💰 {q.reward} zlatých</span>
                          <span className="text-[#7a5f35]">Vyprší za: {q.expiresIn} vaření</span>
                        </div>

                        {!q.isDealAccepted && (
                          <button
                            onClick={() => {
                              setQuests((prev) =>
                                prev.map((quest) => {
                                  if (quest.id === q.id) {
                                    const boostedReward = Math.round(quest.reward * 1.4);
                                    addNotification(`🤝 Podepsal jsi Cechovní Deal s ${quest.customer.name}! Odměna zvýšena na 💰 ${boostedReward} zlatých.`, 'success');
                                    return {
                                      ...quest,
                                      isDealAccepted: true,
                                      reward: boostedReward,
                                      dealMultiplier: 1.4,
                                      suspicionGain: Math.min(100, quest.suspicionGain + 5),
                                    };
                                  }
                                  return quest;
                                })
                              );
                            }}
                            className="w-full py-1.5 bg-gradient-to-r from-[#7a4a10] to-[#c8961e] hover:brightness-110 text-white font-serif font-bold text-[11px] rounded-lg cursor-pointer transition-all shadow flex items-center justify-center gap-1.5 mt-1"
                          >
                            🤝 Uzavřít Cechovní Deal (+40% odměna)
                          </button>
                        )}
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
                <div className="flex flex-col gap-4 max-h-[360px] overflow-y-auto pr-1">
                  {/* Crafted Potions & Powders Stock Section */}
                  <div>
                    <h3 className="font-serif text-xs text-[#f0c040] font-bold uppercase tracking-wider mb-2 flex items-center justify-between border-b border-[#5c3d1a] pb-1">
                      <span>🧪 Uvařené lektvary & preparáty v laboratoři</span>
                      <span className="text-[10px] text-[#7a5f35] font-normal">
                        ({(Object.values(potionInventory) as CraftedPotionItem[]).reduce((a: number, b: CraftedPotionItem) => a + (b.count || 0), 0)} ks v truhle)
                      </span>
                    </h3>

                    {(Object.values(potionInventory) as CraftedPotionItem[]).filter((p: CraftedPotionItem) => p.count > 0).length === 0 ? (
                      <div className="text-center italic text-[#7a5f35] py-4 text-xs font-serif bg-[#0d0a06]/40 border border-[#5c3d1a]/40 rounded-xl">
                        V truhle nemáš žádné vyrobené lektvary ani prášky.<br />
                        Běž ke stolu a uvař nebo rozdrt preparáty!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {(Object.values(potionInventory) as CraftedPotionItem[]).filter((p: CraftedPotionItem) => p.count > 0).map((p: CraftedPotionItem) => {
                          const unitPrice = p.isExact ? Math.max(1, p.value) : (p.value ? Math.max(0.5, p.value * 0.2) : 1);
                          const isGuildWanted = quests.some(q => q.targetName === p.name_cz || q.targetRecipeId === p.id);
                          const pKey = p.id || p.name_cz;

                          return (
                            <div
                              key={pKey}
                              className={`p-2.5 border rounded-xl flex items-center justify-between gap-2 transition-all ${
                                isGuildWanted ? 'border-[#f0c040] bg-[#2a1d0d]' : 'border-[#5c3d1a] bg-[#0d0a06]/60'
                              }`}
                            >
                              <div className="flex flex-col min-w-0 flex-1">
                                <div className="flex items-center gap-1">
                                  <span className="text-xs">{p.icon || '🧪'}</span>
                                  <span className="font-serif text-xs font-bold text-[#e8d5a3] truncate">
                                    {p.name_cz}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-[#7a5f35] mt-0.5">
                                  <span>{p.category}</span>
                                  {isGuildWanted && (
                                    <span className="text-amber-400 font-bold bg-amber-500/20 px-1 rounded text-[9px]">
                                      📜 Poptává Cech!
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-[#2ecc71] font-bold font-serif mt-0.5">
                                  Cena: 🪙 {unitPrice} zl. {p.isExact ? '' : '(Bez cennosti)'}
                                </span>
                              </div>

                              <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className="text-xs text-[#f0c040] font-mono font-bold bg-black/40 px-2 py-0.5 rounded border border-[#5c3d1a]">
                                  {p.count}×
                                </span>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => {
                                      let sold = false;
                                      setPotionInventory(prev => {
                                        const entry = (Object.entries(prev) as [string, CraftedPotionItem][]).find(([k, item]) => 
                                          (k === pKey || item.id === p.id || item.name_cz === p.name_cz) && item.count > 0
                                        );
                                        if (!entry || entry[1].count <= 0) return prev;

                                        const [dictKey, curItem] = entry;
                                        sold = true;
                                        const newCount = curItem.count - 1;
                                        if (newCount <= 0) {
                                          const next = { ...prev };
                                          delete next[dictKey];
                                          return next;
                                        }
                                        return {
                                          ...prev,
                                          [dictKey]: {
                                            ...curItem,
                                            count: newCount
                                          }
                                        };
                                      });

                                      if (sold) {
                                        setGold(g => Number((g + unitPrice).toFixed(2)));
                                        addNotification(`Prodal jsi 1× ${p.name_cz} za 🪙 ${unitPrice} zl.`, "success");
                                      } else {
                                        addNotification(`❌ Tento lektvar nemáš na skladě.`, "error");
                                      }
                                    }}
                                    className="px-2 py-0.5 bg-[#c8961e] hover:bg-[#f0c040] text-black text-[10px] font-serif font-bold rounded cursor-pointer"
                                  >
                                    Prodat 1×
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Raw Ingredients Section */}
                  <div>
                    <h3 className="font-serif text-xs text-[#f0c040] font-bold uppercase tracking-wider mb-2 flex items-center justify-between border-b border-[#5c3d1a] pb-1 pt-2">
                      <span>🌿 Surové ingredience ze skladu</span>
                      <span className="text-[10px] text-[#7a5f35] font-normal">
                        ({Object.values(inventory).reduce((a: number, b) => a + (b as number), 0)} ks)
                      </span>
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(inventory).filter(([, qty]) => (qty as number) > 0).map(([id, qty]) => {
                        const item = ingMap[id];
                        if (!item) return null;
                        const sellPrice = Math.max(1, Math.round(item.price * 0.6));

                        return (
                          <div
                            key={id}
                            onClick={() => {
                              let sold = false;
                              setInventory(prev => {
                                if (!prev[id] || prev[id] <= 0) return prev;
                                sold = true;
                                const newQty = prev[id] - 1;
                                if (newQty <= 0) {
                                  const next = { ...prev };
                                  delete next[id];
                                  return next;
                                }
                                return { ...prev, [id]: newQty };
                              });
                              if (sold) {
                                setGold(g => g + sellPrice);
                                addNotification(`Prodal jsi 1× ${item.name_cz} za 🪙 ${sellPrice} zl.`, "info");
                              } else {
                                addNotification(`❌ Tuto surovinu už nemáš v inventáři.`, "error");
                              }
                            }}
                            className="p-2 border border-[#5c3d1a] hover:border-[#2ecc71] rounded-xl flex items-center justify-between cursor-pointer bg-[#0d0a06]/40 transition-colors"
                          >
                            <div>
                              <span className="font-serif text-[11px] block text-white font-bold">{item.name_cz}</span>
                              <span className="text-[10px] text-[#2ecc71] font-serif">Prodej: 🪙 {sellPrice}</span>
                            </div>
                            <span className="text-[10px] text-[#f0c040] font-bold bg-black/40 px-1.5 py-0.5 rounded">{qty}×</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
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

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={(themeId) => {
          setCurrentTheme(themeId);
          localStorage.setItem('alchemix_theme', themeId);
          const t = THEMES.find((x) => x.id === themeId);
          addNotification(`🎨 Grafické téma změněno: ${t?.name || themeId}`, 'success');
        }}
        onQuickSave={saveGame}
        onQuickLoad={loadGameManual}
        onExportSave={handleExportSave}
        onImportSave={handleImportSave}
        onResetGame={resetGame}
      />

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
