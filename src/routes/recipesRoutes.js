import { Router } from "express";
import { celebrate } from "celebrate";
import { getRecipeById } from "../controllers/recipesController.js";
import { recipeIdSchema } from "../validations/recipesValidation.js";

const router = Router();

router.get("/api/recipes/:recipeId", celebrate(recipeIdSchema), getRecipeById);

export default router;
