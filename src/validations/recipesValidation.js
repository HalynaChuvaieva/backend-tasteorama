import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const getAllRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(50).default(10),
    category: Joi.string(),
    ingredient: Joi.string(),
    keyword: Joi.string().trim().allow(''),
  }),
};

export const getMyRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(50).default(10),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const recipeIdSchema = {
  [Segments.PARAMS]: Joi.object({
    recipeId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createRecipeSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().max(64).required(),
    description: Joi.string().max(200).required(),
    time: Joi.number().min(1).max(360).required(),
    calories: Joi.number().integer().min(1).max(10000).optional(),
    category: Joi.string().required(),
    ingredients: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          measure: Joi.string().required(),
        }),
      )
      .min(2)
      .max(16)
      .required(),
    instructions: Joi.string().max(1200).required(),
  }),
};
export const updateRecipeSchema = {};
