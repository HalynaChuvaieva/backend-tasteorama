import { Recipe } from "../models/recipe.js";

export const getRecipeByIdService = async (recipeId) => {
  return Recipe.findById(recipeId)
    .populate("category", "name")
    .populate("ingredients.ingredient", "name")
    .populate("owner", "username email avatar");
};
