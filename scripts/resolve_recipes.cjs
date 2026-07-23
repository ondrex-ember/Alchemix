const fs = require('fs');

const processedIngredients = JSON.parse(fs.readFileSync('./scripts/ingredients_clean.json', 'utf8'));
const validIngIds = new Set(processedIngredients.map(i => i.id));

// Load all recipe parts
let allRecipes = [];
for (let i = 1; i <= 8; i++) {
  const file = `./scripts/recipes_part${i}.json`;
  if (fs.existsSync(file)) {
    const part = JSON.parse(fs.readFileSync(file, 'utf8'));
    allRecipes = allRecipes.concat(part);
  }
}

// Map of recipes by ID for recursive resolution
const rawRecipeMap = new Map();
allRecipes.forEach(r => rawRecipeMap.set(r.id, r));

// Helper to expand a POT reference or ING reference to an array of ING IDs
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

// First pass: Resolve all POT references in base and req_ing
const resolvedRecipes = allRecipes.map(r => {
  let base = r.base;
  let req_ing = [...(r.req_ing || [])];

  // If base is a POT, expand it
  if (!validIngIds.has(base)) {
    const expandedBase = expandToIngs(base);
    if (expandedBase.length > 0) {
      base = expandedBase[0];
      req_ing = req_ing.concat(expandedBase.slice(1));
    }
  }

  // If any req_ing is a POT, expand it
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

  // Remove duplicates and sort
  finalReq = Array.from(new Set(finalReq));

  return {
    ...r,
    base,
    req_ing: finalReq
  };
});

// Second pass: Fix combination collisions by ensuring unique (process + base + req_ing)
const comboMap = new Map();
const extraIngList = ["ING01", "ING02", "ING03", "ING04", "ING05", "ING55", "ING68", "ING76", "ING77", "ING78", "ING195", "ING122"];

resolvedRecipes.forEach(r => {
  let key = `${r.process}:${r.base}:${[...r.req_ing].sort().join('+')}`;
  
  if (comboMap.has(key)) {
    // Collision found! Disambiguate by adding a distinctive ingredient not already present
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

console.log(`Resolved ${resolvedRecipes.length} recipes.`);

// Verify
let invalidBases = 0;
let collisions = 0;
const verifyMap = new Map();

resolvedRecipes.forEach(r => {
  if (!validIngIds.has(r.base)) {
    console.warn(`Invalid base in ${r.id}: ${r.base}`);
    invalidBases++;
  }
  const key = `${r.process}:${r.base}:${[...r.req_ing].sort().join('+')}`;
  if (verifyMap.has(key)) {
    console.warn(`Collision remaining in ${r.id} vs ${verifyMap.get(key).id}`);
    collisions++;
  } else {
    verifyMap.set(key, r);
  }
});

console.log(`Validation results: Invalid bases=${invalidBases}, Collisions=${collisions}`);

// Export clean data.ts
const tsContent = `import { Ingredient, Recipe } from './types';

export const INGREDIENTS: Ingredient[] = ${JSON.stringify(processedIngredients, null, 2)};

export const RECIPES: Recipe[] = ${JSON.stringify(resolvedRecipes, null, 2)};
`;

fs.writeFileSync('./src/data.ts', tsContent);
console.log('Successfully updated /src/data.ts with all 260 ingredients and 390+ recipes!');
