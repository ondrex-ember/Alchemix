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

console.log(`Loaded ${processedIngredients.length} ingredients and ${allRecipes.length} recipes.`);

// Deduplicate recipes by ID
const recipeMap = new Map();
allRecipes.forEach(r => {
  recipeMap.set(r.id, r);
});

const uniqueRecipes = Array.from(recipeMap.values());
console.log(`Unique recipes by ID: ${uniqueRecipes.length}`);

// Validate bases and req_ing against known ingredient IDs
const validIngIds = new Set(processedIngredients.map(i => i.id));

uniqueRecipes.forEach(r => {
  if (!validIngIds.has(r.base)) {
    console.warn(`Recipe ${r.id} (${r.name_cz}) has invalid base ${r.base}`);
  }
  r.req_ing = (r.req_ing || []).filter(id => {
    if (!validIngIds.has(id)) {
      console.warn(`Recipe ${r.id} (${r.name_cz}) references missing req_ing ${id}`);
      return false;
    }
    return true;
  });
});

// Check for recipe combination collisions
const comboMap = new Map();
uniqueRecipes.forEach(r => {
  const comboKey = `${r.process}:${r.base}:${[...r.req_ing].sort().join('+')}`;
  if (comboMap.has(comboKey)) {
    const existing = comboMap.get(comboKey);
    console.warn(`Collision detected for key [${comboKey}]: ${r.id} (${r.name_cz}) vs ${existing.id} (${existing.name_cz})`);
  } else {
    comboMap.set(comboKey, r);
  }
});

// Output clean data.ts
const tsContent = `import { Ingredient, Recipe } from './types';

export const INGREDIENTS: Ingredient[] = ${JSON.stringify(processedIngredients, null, 2)};

export const RECIPES: Recipe[] = ${JSON.stringify(uniqueRecipes, null, 2)};
`;

fs.writeFileSync('./src/data.ts', tsContent);
console.log('Successfully wrote /src/data.ts!');
