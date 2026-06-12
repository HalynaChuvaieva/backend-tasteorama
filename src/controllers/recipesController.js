import createHttpError from "http-errors";
import { Recipe } from "../models/recipe.js";

export const getAllRecipes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, category, ingredient, keyword } = req.query;

    const parsedPage = Number(page);
    const parsedPerPage = Number(perPage);
    const skip = (parsedPage - 1) * parsedPerPage;

    const recipesQuery = Recipe.find();

    // 1. Змінили 'name' на 'title', бо в базі саме 'title'
    if (keyword) {
      recipesQuery.where({ title: { $regex: keyword, $options: "i" } });
    }

    if (category) {
      recipesQuery.where("category").equals(category);
    }

    // 2. Змінили 'ingredients.ingredient' на 'ingredients.id'
    if (ingredient) {
      recipesQuery.where("ingredients.id").equals(ingredient);
    }

    const [totalRecipes, recipes] = await Promise.all([
      recipesQuery.clone().countDocuments(),
      recipesQuery
        .skip(skip)
        .limit(parsedPerPage)
        .populate("category", "name")
        // 3. Змінили 'ingredients.ingredient' на 'ingredients.id'
        .populate("ingredients.id", "name img desc"),
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

export const getRecipeById = async (req, res) => {

};

export const createRecipe = async (req, res) => {

};

export const deleteRecipe = async (req, res) => {

};

export const updateRecipe = async (req, res) => {

};
