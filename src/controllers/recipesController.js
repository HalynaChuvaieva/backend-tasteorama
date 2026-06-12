import createHttpError from "http-errors";
import { getRecipeByIdService } from "../services/recipes.js";

export const getAllRecipes = async (req, res) => {};

export const getRecipeById = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await getRecipeByIdService(recipeId);
    if (!recipe) {
      throw createHttpError(404, "Recipe not found");
    }
    res.status(200).json({
      status: 200,
      message: "Recipe retrieved successfully",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

export const createRecipe = async (req, res) => {};
export const deleteRecipe = async (req, res) => {};
export const updateRecipe = async (req, res) => {};
