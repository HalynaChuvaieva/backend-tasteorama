import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

export const getAllRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(50).default(10),
    category: Joi.string(),
    ingredient: Joi.string(),
    keyword: Joi.string().trim().allow(""),
  })
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message("Invalid id format") : value;
};


export const recipeIdSchema = {
  [Segments.PARAMS]: Joi.object({
    recipeId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createRecipeSchema = {};
export const updateRecipeSchema = {};
