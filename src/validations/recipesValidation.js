import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

export const getAllRecipesSchema = {

};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};


export const recipeIdSchema = {

};

export const createRecipeSchema = {

};

export const updateRecipeSchema = {

};
