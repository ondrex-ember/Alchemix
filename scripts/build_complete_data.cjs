const fs = require('fs');

const processedIngredients = JSON.parse(fs.readFileSync('./scripts/ingredients_clean.json', 'utf8'));

// Load all recipe parts
let allRecipes = [];
for (let i = 1; i <= 8; i++) {
  const file = `./scripts/recipes_part${i}.json`;
  if (fs.existsSync(file)) {
    const part = JSON.parse(fs.readFileSync(file, 'utf8'));
    allRecipes = allRecipes.concat(part);
  }
}

const validIngIds = new Set(processedIngredients.map(i => i.id));
const rawRecipeMap = new Map();
allRecipes.forEach(r => rawRecipeMap.set(r.id, r));

function expandToIngs(id, depth = 0) {
  if (depth > 10) return [];
  if (validIngIds.has(id)) return [id];
  if (rawRecipeMap.has(id)) {
    const target = rawRecipeMap.get(id);
    const baseIngs = expandToIngs(target.base, depth + 1);
    let reqIngs = [];
    (target.req_ing || []).forEach(req => {
      reqIngs = reqIngs.concat(expandToIngs(req, depth + 1));
    });
    return [...baseIngs, ...reqIngs];
  }
  return [];
}

const resolvedRecipes = allRecipes.map(r => {
  let base = r.base;
  let req_ing = [...(r.req_ing || [])];

  if (!validIngIds.has(base)) {
    const expandedBase = expandToIngs(base);
    if (expandedBase.length > 0) {
      base = expandedBase[0];
      req_ing = req_ing.concat(expandedBase.slice(1));
    }
  }

  let finalReq = [];
  req_ing.forEach(req => {
    if (validIngIds.has(req)) {
      if (req !== base) finalReq.push(req);
    } else {
      const expanded = expandToIngs(req);
      expanded.forEach(e => {
        if (e !== base) finalReq.push(e);
      });
    }
  });

  finalReq = Array.from(new Set(finalReq));

  // Map any unknown process type like "Sublime" to "Distill"
  let process = r.process;
  if (!["Mix", "Grind", "Boil", "Distill"].includes(process)) {
    process = "Distill";
  }

  return {
    ...r,
    process,
    base,
    req_ing: finalReq
  };
});

// Fix combination collisions
const comboMap = new Map();
const extraIngList = ["ING01", "ING02", "ING03", "ING04", "ING05", "ING55", "ING68", "ING76", "ING77", "ING78", "ING195", "ING122"];

resolvedRecipes.forEach(r => {
  let key = `${r.process}:${r.base}:${[...r.req_ing].sort().join('+')}`;
  if (comboMap.has(key)) {
    for (const extraIng of extraIngList) {
      if (extraIng !== r.base && !r.req_ing.includes(extraIng)) {
        r.req_ing.push(extraIng);
        r.req_ing.sort();
        key = `${r.process}:${r.base}:${[...r.req_ing].sort().join('+')}`;
        if (!comboMap.has(key)) break;
      }
    }
  }
  comboMap.set(key, r);
});

const fileContent = `import {
  Ingredient,
  Recipe,
  Food,
  Customer,
  ForageLocation,
  Upgrade,
  AilmentInfo,
  Season,
  BartexOffer,
  TechNode
} from './types';

export const INGREDIENTS: Ingredient[] = ${JSON.stringify(processedIngredients, null, 2)};

export const RECIPES: Recipe[] = ${JSON.stringify(resolvedRecipes, null, 2)};

export const FOODS: Food[] = [
  { id: "FOOD_BREAD", name: "Chléb s česnekem", icon: "🍞", price: 5, vigorGain: 20, hungerReduce: 25, desc: "Sprostý chléb s česnekovým mazáním k zahnání hladu." },
  { id: "FOOD_MEAT", name: "Pečená zvěřina", icon: "🍖", price: 15, vigorGain: 45, hungerReduce: 50, desc: "Šťavnatý kus pečené zvěřiny z panského lesa." },
  { id: "FOOD_WINE", name: "Svařené kořeněné víno", icon: "🍷", price: 10, vigorGain: 30, hungerReduce: 15, desc: "Teplé víno s hřebíčkem a skořicí. Zahřeje duši." },
  { id: "FOOD_MEAD", name: "Staročeská medovina", icon: "🍺", price: 12, vigorGain: 35, hungerReduce: 20, desc: "Sladký medový nápoj vracející veselí a sílu." }
];

export const CUSTOMER_TEMPLATES: Customer[] = [
  { id: "CUST_TOWN", name: "Měšťan", icon: "👔", priceMult: 1.0, questTypes: ["exact", "parametric"], suspicion: 0 },
  { id: "CUST_MONK", name: "Bratr Bernard", icon: "⛪", priceMult: 1.1, questTypes: ["exact", "parametric"], suspicion: -2 },
  { id: "CUST_NOBLE", name: "Pán z Hradce", icon: "👑", priceMult: 2.0, questTypes: ["exact", "parametric"], suspicion: 5 },
  { id: "CUST_SHADOW", name: "Zahalený cizinec", icon: "🗡️", priceMult: 2.5, questTypes: ["shady"], suspicion: 15 },
  { id: "CUST_HERBAL", name: "Bába kořenářka", icon: "👵", priceMult: 0.9, questTypes: ["exact"], suspicion: -5 }
];

export const PARAMETRIC_TEMPLATES = [
  {
    name: "Chladivý obklad na horkost",
    req: { thermal_max: -1, tox_max: 20 },
    text: "Zákazníka trápí vysoká horečka a blouznění. Žádá chladivý odvar.",
    mult: 1.1,
    shady: false
  },
  {
    name: "Zahřívací odvar na zimnici",
    req: { thermal_min: 2, tox_max: 20 },
    text: "Prokřehlý pocestný žádá silně prohřívací nápoj bez jedu.",
    mult: 1.2,
    shady: false
  },
  {
    name: "Slabý jed bez zápachu",
    req: { tox_min: 50, tox_max: 85 },
    text: "Tajemný pán žádá odvar s vysokou toxicitou pro zvláštní účely...",
    mult: 2.0,
    shady: true
  },
  {
    name: "Svíravá mast na krev",
    req: { moisture_max: -2, tox_max: 15 },
    text: "Raničář potřebuje mocně vysušující a stavěcí mast na rány.",
    mult: 1.3,
    shady: false
  }
];

export const FORAGE_LOCATIONS: ForageLocation[] = [
  {
    id: "FORAGE_MEADOW",
    name: "Slunečná luka",
    icon: "🌱",
    vigorCost: 15,
    hungerCost: 10,
    possibleFinds: [
      { id: "ING01", w: 30 }, { id: "ING11", w: 20 }, { id: "ING17", w: 15 },
      { id: "ING18", w: 15 }, { id: "ING19", w: 10 }, { id: "ING57", w: 25 },
      { id: "ING58", w: 20 }, { id: "ING59", w: 25 }
    ],
    minFinds: 2,
    maxFinds: 4,
    risks: [{ chance: 0.05, name: "Včelí žihadlo", icon: "🐝", effectText: "-10 Vigor" }],
    unlockAt: 1
  },
  {
    id: "FORAGE_FOREST",
    name: "Hluboký hvozd",
    icon: "🌲",
    vigorCost: 25,
    hungerCost: 15,
    possibleFinds: [
      { id: "ING06", w: 15 }, { id: "ING08", w: 10 }, { id: "ING10", w: 20 },
      { id: "ING13", w: 15 }, { id: "ING16", w: 20 }, { id: "ING27", w: 8 },
      { id: "ING60", w: 15 }, { id: "ING190", w: 20 }
    ],
    minFinds: 2,
    maxFinds: 5,
    risks: [{ chance: 0.15, name: "Divoký kanec", icon: "🐗", effectText: "-25 Vigor" }],
    unlockAt: 1
  },
  {
    id: "FORAGE_MOUNTAIN",
    name: "Skalnatý vrch",
    icon: "⛰️",
    vigorCost: 35,
    hungerCost: 25,
    possibleFinds: [
      { id: "ING42", w: 20 }, { id: "ING49", w: 15 }, { id: "ING65", w: 20 },
      { id: "ING67", w: 15 }, { id: "ING68", w: 25 }, { id: "ING78", w: 15 },
      { id: "ING82", w: 20 }, { id: "ING84", w: 8 }
    ],
    minFinds: 2,
    maxFinds: 4,
    risks: [{ chance: 0.20, name: "Horský pád", icon: "🧗", effectText: "-35 Vigor" }],
    unlockAt: 3
  },
  {
    id: "FORAGE_SWAMP",
    name: "Zrádné močály",
    icon: "🐸",
    vigorCost: 40,
    hungerCost: 30,
    possibleFinds: [
      { id: "ING07", w: 5 }, { id: "ING09", w: 8 }, { id: "ING12", w: 15 },
      { id: "ING62", w: 8 }, { id: "ING177", w: 20 }, { id: "ING178", w: 20 },
      { id: "ING179", w: 25 }
    ],
    minFinds: 1,
    maxFinds: 4,
    risks: [{ chance: 0.25, name: "Močálová zimnice", icon: "🤒", effectText: "-40 Vigor" }],
    unlockAt: 5
  }
];

export const UPGRADES: Upgrade[] = [
  { id: "UPG_CAULDRON", name: "Královský kotel", icon: "🥣", cost: 120, desc: "Zvětší kapacitu pracovního stolu na 8 ingrediencí." },
  { id: "UPG_MORTAR", name: "Achatový hmoždíř", icon: "🍸", cost: 80, desc: "Zvýší účinnost tření ingrediencí." },
  { id: "UPG_CELLAR", name: "Ledový sklep", icon: "❄️", cost: 100, desc: "Zdvojnásobí trvanlivost podléhajících bylin." },
  { id: "UPG_SILVER", name: "Stříbrné vyložení", icon: "✨", cost: 150, desc: "Sníží nepříznivý vliv sedimentu v kotli o 50%." },
  { id: "UPG_CALENDAR", name: "Almanach hvězd", icon: "📅", cost: 60, desc: "Opatří informace o sezónních poptávkách a svátcích." }
];

export const AILMENTS: Record<string, AilmentInfo> = {
  FEVER: { icon: "🔥", name: "Horká horečka", color: "#e74c3c", desc: "Tělo hoří, spotřeba sil při práci je o 50% vyšší." },
  POISON: { icon: "☠️", name: "Otravná usazenina", color: "#8e44ad", desc: "Znečištěná krev snižuje prodejní cenu elixírů." },
  INSPIRED: { icon: "💡", name: "Múza alchymie", color: "#f1c40f", desc: "Další vařený elixír přinese dvojnásobnou hodnotu!", positive: true }
};

export const SEASONS: Season[] = [
  { id: "spring", name: "Jaro", icon: "🌸", days: 10, foragingBonus: 1.2, priceMultiplier: 1.0, vigorBonus: 10, riskMult: 0.8, spoilMult: 1.0, mountainLocked: false, desc: "Čas rašení a jarní mízy." },
  { id: "summer", name: "Léto", icon: "☀️", days: 10, foragingBonus: 1.0, priceMultiplier: 1.1, vigorBonus: 0, riskMult: 1.0, spoilMult: 1.5, mountainLocked: false, desc: "Teplé horké dny. Byliny rychleji tlejí." },
  { id: "autumn", name: "Podzim", icon: "🍂", days: 10, foragingBonus: 0.9, priceMultiplier: 1.2, vigorBonus: -5, riskMult: 1.2, spoilMult: 1.0, mountainLocked: false, desc: "Čas sběru kořenů a plodů." },
  { id: "winter", name: "Zima", icon: "❄️", days: 10, foragingBonus: 0.5, priceMultiplier: 1.5, vigorBonus: -15, riskMult: 1.5, spoilMult: 0.5, mountainLocked: true, desc: "Mrazivá zima. Hory jsou neprůchodné." }
];

export const CANONICAL_HOURS = [
  { name: "Matutina (Jitřní)", icon: "🌅" },
  { name: "Prima (První)", icon: "🌄" },
  { name: "Tertia (Třetí)", icon: "☀️" },
  { name: "Sexta (Polední)", icon: "🌕" },
  { name: "Nona (Devátá)", icon: "🌤️" },
  { name: "Vespera (Večerní)", icon: "<ctrl42>" },
  { name: "Completorium (Noční)", icon: "🌙" }
];

export const BARTEX_OFFERS: BartexOffer[] = [
  { id: "BO_01", offerIngIds: ["ING06", "ING09"], forTag: "precious", desc: "Potulný kupec nabízí vzácné minerály za uspávací byliny.", addedDay: 1 }
];

export const LOYAL_NAMES = ["Bratr Jan", "Apotekář Jakub", "Rychtář Šebestián", "Paní Kateřina"];

export const LOYAL_CHAIN_QUESTS: Record<string, any> = {
  "Bratr Jan": {
    chainName: "Klášterní herbář",
    steps: [
      { reqRecipeId: "POT01", dialog: "Mír s tebou. Klášter potřebuje čistou vodu na omyvatelné relikvie." },
      { reqRecipeId: "POT05", dialog: "Medový oxymel nám pomůže přestát bratrské nachlazení v refektáři." }
    ]
  }
};

export const TECH_NODES: TechNode[] = [
  { id: "TECH_DISTILL", name: "Destilační křivda", icon: "🧪", req: { "_process_Distill": 3 }, desc: "Otevírá pokročilé destilační aparáty." },
  { id: "TECH_HERBALISM", name: "Herbální mistrovství", icon: "🌿", req: { "ING11": 5, "ING17": 5 }, desc: "Umožňuje hlubší porozumění rostlinným humorům." },
  { id: "TECH_MINERALS", name: "Kovová transmutace", icon: "💎", req: { "ING65": 5, "ING68": 5 }, desc: "Otevírá práci s těžkými kovy a vitrioly." }
];
`;

fs.writeFileSync('./src/data.ts', fileContent);
console.log('Successfully written complete /src/data.ts!');
