const Recipe = require('../models/recipe');

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update recipe by ID
exports.updateRecipe = async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Recipe not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete recipe by ID
exports.deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};