const fs = require('fs');

const ingredients = JSON.parse(fs.readFileSync('./scripts/ingredients_clean.json', 'utf8'));

// We will embed all recipes from the prompt.
// Let's write them cleanly in an array.
