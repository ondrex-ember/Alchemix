import { Ingredient, Recipe, ProcessType, CauldronResidue } from '../types';
import { INGREDIENTS, RECIPES } from '../data';

// Process Modifiers
export const PROCESS_MODIFIERS: Record<ProcessType, { thermal: number; moisture: number; tox_mult: number }> = {
  Mix:     { thermal: 0, moisture: 0,  tox_mult: 1.0 },
  Grind:   { thermal: 0, moisture: -1, tox_mult: 1.0 },
  Boil:    { thermal: 1, moisture: -1, tox_mult: 1.1 },
  Distill: { thermal: 1, moisture: -2, tox_mult: 1.5 },
};

// Helper maps
export const ingMap: Record<string, Ingredient> = {};
INGREDIENTS.forEach(i => { ingMap[i.id] = i; });

export const recMap: Record<string, Recipe> = {};
RECIPES.forEach(r => { recMap[r.id || ''] = r; });

// Computes the humoral vectors for chosen ingredients in slots
export function computeVector(
  slots: string[],
  process: ProcessType,
  residue: CauldronResidue | null,
  silverLining: boolean
): { thermal: number; moisture: number; toxicity: number } {
  const mod = PROCESS_MODIFIERS[process];
  
  let thermal = slots.reduce((sum, id) => sum + (ingMap[id]?.thermal || 0), 0);
  let moisture = slots.reduce((sum, id) => sum + (ingMap[id]?.moisture || 0), 0);
  let toxicity = slots.reduce((sum, id) => sum + (ingMap[id]?.toxicity || 0), 0);

  // Apply process impact
  thermal = Math.max(-8, Math.min(8, thermal + mod.thermal));
  moisture = Math.max(-8, Math.min(8, moisture + mod.moisture));
  toxicity = Math.min(100, Math.round(toxicity * mod.tox_mult));

  // Apply memory residue
  if (residue) {
    const mult = silverLining ? 0.5 : 1.0;
    thermal = Math.max(-8, Math.min(8, thermal + Math.round(residue.thermal * mult)));
    moisture = Math.max(-8, Math.min(8, moisture + Math.round(residue.moisture * mult)));
    toxicity = Math.min(100, Math.round(toxicity + residue.toxicity * mult));
  }

  return { thermal, moisture, toxicity };
}

// Matches cauldron slots against predefined recipes
export function matchRecipe(slots: string[], process: ProcessType): Recipe | null {
  const sorted = [...slots].sort();
  for (const r of RECIPES) {
    // Basic ingredient-based match (excludes chain items)
    if (!ingMap[r.base]) continue;
    const expected = [r.base, ...r.req_ing].sort();
    if (r.process !== process) continue;
    if (expected.length !== sorted.length) continue;
    if (expected.every((v, i) => v === sorted[i])) return r;
  }
  return null;
}

// Generates procedural results for failed or custom combinations
export function getProceduralRecipe(vec: { thermal: number; moisture: number; toxicity: number }): Recipe {
  const { thermal, moisture, toxicity } = vec;
  let name = "";
  let effect = "";
  let color = "#8e44ad";
  const tags: string[] = [];

  const absT = Math.abs(thermal);
  const absM = Math.abs(moisture);

  const thermalWord =
    thermal > 2
      ? "Hořký"
      : thermal > 0
      ? "Hřejivý"
      : thermal < -2
      ? "Mrazivý"
      : thermal < 0
      ? "Chladivý"
      : "Neutrální";

  const moistWord =
    moisture > 2
      ? "Vlhký"
      : moisture > 0
      ? "Zvlhčující"
      : moisture < -2
      ? "Vysušující"
      : moisture < 0
      ? "Suchý"
      : "";

  if (toxicity > 70) {
    name = "Jedovatý odvar";
    color = "#8e1010";
    tags.push("poison", "dangerous");
    effect = `Vysoce toxická směs (tox: ${toxicity}). ${thermalWord} charakter. SMRTELNĚ NEBEZPEČNÉ!`;
  } else if (toxicity > 40) {
    name = `${thermalWord} toxický lektvar`;
    color = "#c0392b";
    tags.push("toxic");
    effect = `Středně toxická směs. Tepl. ${thermal > 0 ? "+" : ""}${thermal}, Vlhk. ${moisture > 0 ? "+" : ""}${moisture}, Tox. ${toxicity}.`;
  } else if (thermal < -2 && toxicity < 30) {
    name = `${thermalWord} chladivý obklad`;
    color = "#2980b9";
    tags.push("cooling", "analgesic");
    effect = `Chlazení a utišení horkosti. Teplotní vektor: ${thermal}, Vlhkost: ${moisture}.`;
  } else if (thermal > 2 && toxicity < 20) {
    name = `${thermalWord} zahřívací elixír`;
    color = "#e67e22";
    tags.push("warming", "tonic");
    effect = `Zahřívá prokřehlé údy a povzbuzuje vitalitu. Teplotní vektor: ${thermal}, Vlhkost: ${moisture}.`;
  } else if (Math.abs(thermal) <= 1 && Math.abs(moisture) <= 1) {
    name = "Nevýrazný odvar";
    color = "#7f8c8d";
    tags.push("neutral");
    effect = "Humorální vektory se vyrušily. Slabý, nezaměřený účinek.";
  } else {
    name = `${thermalWord}${moistWord ? " " + moistWord.toLowerCase() : ""} odvar`;
    color = "#8e44ad";
    tags.push("procedural");
    effect = `Neznámý procedurální lektvar. Teplotní vektor: ${thermal > 0 ? "+" : ""}${thermal}, Vlhkost: ${moisture > 0 ? "+" : ""}${moisture}, Tox. ${toxicity}.`;
  }

  // Calculate base value based on quality of balanced properties
  const value = Math.max(2, Math.round(10 - toxicity / 10 + absT + absM));

  return {
    id: null,
    name_cz: name,
    name_lat: "Compositum Ignotum",
    category: "Unknown",
    tier: 0,
    process: "Mix",
    base: "",
    req_ing: [],
    effect,
    color,
    tags,
    value,
    procedural: true,
  };
}

// Selects items using weighted random distributions
export function weightedRandom(items: { id: string; w: number }[]): string {
  const total = items.reduce((sum, item) => sum + item.w, 0);
  let rand = Math.random() * total;
  for (const item of items) {
    rand -= item.w;
    if (rand <= 0) return item.id;
  }
  return items[items.length - 1].id;
}

// Get the game shelf life of an ingredient
export function getShelfGameDays(ing: Ingredient, cellarBonus: boolean): number {
  if (!ing.shelf_days) return 0;
  const base = Math.max(4, Math.floor(ing.shelf_days / 7));
  return cellarBonus ? base * 2 : base;
}

// Get spoilage stats for an ingredient
export function getSpoilInfo(
  ingId: string,
  gameDay: number,
  purchasedDays: number[] | undefined,
  cellarBonus: boolean
): { warning: boolean; shelfDays: number; daysLeft: number; expired: boolean } {
  const ing = ingMap[ingId];
  if (!ing) return { warning: false, shelfDays: 0, daysLeft: 0, expired: false };
  const shelfDays = getShelfGameDays(ing, cellarBonus);
  if (shelfDays === 0) return { warning: false, shelfDays: 0, daysLeft: 0, expired: false };

  if (!purchasedDays || !purchasedDays.length) {
    return { warning: false, shelfDays, daysLeft: shelfDays, expired: false };
  }

  const oldestDay = purchasedDays[0];
  const age = gameDay - oldestDay;
  const daysLeft = Math.max(0, shelfDays - age);
  const warning = daysLeft <= Math.max(1, Math.floor(shelfDays * 0.25));
  return { warning, shelfDays, daysLeft, expired: daysLeft === 0 };
}
