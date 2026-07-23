const fs = require('fs');

const ingredients = JSON.parse(fs.readFileSync('./scripts/ingredients_clean.json', 'utf8'));

// Build ingredient ID set
const ingIds = new Set(ingredients.map(i => i.id));

// Helper to sanitize recipes
function sanitizeRecipes(rawList) {
    const validRecipes = [];
    const seenIds = new Set();
    const comboMap = new Map();

    for (const r of rawList) {
        if (!r.id || !r.base) continue;
        if (seenIds.has(r.id)) {
            console.warn(`Duplicate recipe ID skipped: ${r.id}`);
            continue;
        }

        // Standardize req_ing
        const req_ing = Array.isArray(r.req_ing) ? r.req_ing : [];
        const process = ["Mix", "Boil", "Distill", "Grind"].includes(r.process) ? r.process : "Mix";

        // Check combination key: sort all ingredients/bases
        const comboKey = [r.base, ...req_ing].sort().join('+') + '|' + process;

        if (comboMap.has(comboKey)) {
            const prev = comboMap.get(comboKey);
            console.warn(`Combination collision for ${r.id} (${r.name_cz}) with existing ${prev.id} (${prev.name_cz}) key: ${comboKey}`);
            // If duplicate combination, we can adjust value or keep higher tier/value or slightly tweak process if appropriate, or keep the existing one.
            // Let's keep the higher value one or log it.
            if ((r.value || 0) > (prev.value || 0)) {
                // replace
                const idx = validRecipes.findIndex(x => x.id === prev.id);
                if (idx !== -1) validRecipes.splice(idx, 1);
                comboMap.set(comboKey, r);
                validRecipes.push(r);
                seenIds.delete(prev.id);
                seenIds.add(r.id);
            } else {
                // skip
                continue;
            }
        } else {
            comboMap.set(comboKey, r);
            seenIds.add(r.id);
            validRecipes.push(r);
        }
    }
    return validRecipes;
}

console.log("Helper script initialized.");
