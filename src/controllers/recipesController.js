import createHttpError from "http-errors";
import { getRecipeByIdService } from "../services/recipes.js";
import { Recipe } from "../models/recipe.js";
import { Ingredient } from "../models/ingredient.js";

export const getAllRecipes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, category, ingredient, keyword } = req.query;

    const parsedPage = Number(page);
    const parsedPerPage = Number(perPage);
    const skip = (parsedPage - 1) * parsedPerPage;

    const recipesQuery = Recipe.find();

    // 1. Пошук за словом у назві рецепта
    if (keyword) {
      recipesQuery.where({ title: { $regex: keyword, $options: "i" } });
    }

    // 2. Пошук за категорією (прямий збіг рядка)
    if (category) {
      // Використовуємо regex для пошуку без врахування регістру (щоб "chicken" і "Chicken" працювали)
      recipesQuery.where({ category: { $regex: category, $options: "i" } });
    }

    // 3. Пошук за НАЗВОЮ інгредієнта
    if (ingredient) {
      // Крок А: Шукаємо інгредієнт за назвою в колекції Ingredients
      const foundIngredient = await Ingredient.findOne({
        name: { $regex: ingredient, $options: "i" } // 'i' означає case-insensitive
      });

      if (foundIngredient) {
        // Крок Б: Якщо інгредієнт знайдено, беремо його ID і фільтруємо рецепти
        // Оскільки в базі ID збережено як рядок, перетворюємо foundIngredient._id на String
        recipesQuery.where("ingredients.id").equals(foundIngredient._id.toString());
      } else {
        // Крок В: Якщо такого інгредієнта не існує, змушуємо запит повернути порожній масив
        // (шукаємо за гарантовано неіснуючим значенням)
        recipesQuery.where("ingredients.id").equals("not-found");
      }
    }

    const [totalRecipes, recipes] = await Promise.all([
      recipesQuery.clone().countDocuments(),
      recipesQuery
        .skip(skip)
        .limit(parsedPerPage)
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
