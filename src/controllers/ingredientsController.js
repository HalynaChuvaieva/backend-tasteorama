import { getAllIngredients } from '../services/ingredients.js';

export const getIngredients = async (req, res, next) => {
  try {
    const ingredients = await getAllIngredients();
    res.status(200).json(ingredients);
  } catch (error) {
    console.error('Failed to fetch ingredients:', error.message);
    next(error);
  }
};
