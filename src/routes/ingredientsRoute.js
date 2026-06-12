import { Router } from 'express';

import { getIngredients } from '../controllers/ingredientsController.js';

const ingredientsRouter = Router();

ingredientsRouter.get('/api/ingredients', getIngredients); // path for a list of all ingredients

export default ingredientsRouter;
