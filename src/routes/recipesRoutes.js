import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middleware/authenticate.js";
import { getAllRecipes } from "../controllers/recipesController.js";
import { getAllRecipesSchema } from "../validations/recipesValidation.js";

const router = Router();

// router.use('/recipes', authenticate);
router.get('/recipes', celebrate(getAllRecipesSchema), getAllRecipes);


export default router;
