import { Schema, model } from "mongoose";
import { Category } from "./category.js";
import { Ingredient } from "./ingredient.js";

const recipeIngredientSchema = new Schema(
  {
    ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient", required: true },
    amount: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const recipeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    cookingTime: { type: Number, required: true, min: 1 },
    calories: { type: Number, min: 0 },
    category: {
      type: String,
      required: true
    },
    ingredients: { type: [recipeIngredientSchema], default: [] },
    instructions: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

recipeSchema.index({ title: "text", description: "text" });
recipeSchema.index({ category: 1 });
recipeSchema.index({ owner: 1 });

export const Recipe = model("Recipe", recipeSchema);
