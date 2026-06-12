import mongoose from "mongoose";
import { Recipe } from "../models/recipe.js";

export const getRecipeByIdService = async (recipeId) => {
  const query = Recipe.findById(recipeId);
  const registered = mongoose.modelNames();

  if (registered.includes("Category")) {
    query.populate("category", "name");
  }
  if (registered.includes("Ingredient")) {
    query.populate("ingredients.ingredient", "name");
  }
  if (registered.includes("User")) {
    query.populate("owner", "username email avatar");
  }

  return query;
};
