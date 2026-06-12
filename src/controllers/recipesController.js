import createHttpError from "http-errors";
import { getRecipeByIdService } from "../services/recipes.js";
import { Recipe } from "../models/recipe.js";

export const getAllRecipes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, category, ingredient, keyword } = req.query;

    const parsedPage = Number(page);
    const parsedPerPage = Number(perPage);
    const skip = (parsedPage - 1) * parsedPerPage;

    const recipesQuery = Recipe.find();

    if (keyword) {
      recipesQuery.where({ title: { $regex: keyword, $options: "i" } });
    }

    if (category) {
      recipesQuery.where("category").equals(category);
    }

    if (ingredient) {
      recipesQuery.where("ingredients.ingredient").equals(ingredient);
    }

    const [totalRecipes, recipes] = await Promise.all([
      recipesQuery.clone().countDocuments(),
      recipesQuery
        .skip(skip)
        .limit(parsedPerPage)
        .populate("ingredients.ingredient", "name desc img"),
    ]);

    const totalPages = Math.ceil(totalRecipes / parsedPerPage);

    res.status(200).json({
      page: parsedPage,
      perPage: parsedPerPage,
      totalRecipes,
      totalPages,
      recipes,
    });
  } catch (error) {
    next(error);
  }
};


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
