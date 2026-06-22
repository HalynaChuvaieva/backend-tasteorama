import { Ingredient } from '../models/ingredients.js';

export const getIngredients = async (req, res) => {
  const ingredients = await Ingredient.find();

  res.status(200).json(ingredients);
};
