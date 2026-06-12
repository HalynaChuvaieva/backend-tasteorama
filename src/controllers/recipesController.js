import createHttpError from "http-errors";
import { getRecipeByIdService } from "../services/recipes.js";

export const getAllRecipes = async (req, res) => {};

/**
 * @openapi
 * /api/recipes/{recipeId}:
 *   get:
 *     tags: [Recipes]
 *     summary: Get recipe by id
 *     description: Public endpoint that returns full recipe details by its id.
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: MongoDB ObjectId of the recipe
 *     responses:
 *       200:
 *         description: Recipe successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Recipe retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Invalid recipe id format
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */
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
