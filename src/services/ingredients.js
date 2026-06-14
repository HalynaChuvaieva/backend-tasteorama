import { Ingredient } from '../models/ingredients.js';

export async function getAllIngredients() {
  const ingredients = await Ingredient.find();
  return ingredients;
}
