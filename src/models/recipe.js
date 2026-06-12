import { model, Schema } from "mongoose";
import { Category } from "./category.js";
import { Ingredient } from "./ingredient.js";

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [64, 'Title cannot exceed 64 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [200, 'Description cannot exceed 200 characters'],
      trim: true,
    },
    time: {
      type: String,
      required: [true, 'Cooking time is required'],
    },
    cals: {
      type: Number,
      min: [1, 'Calories must be at least 1'],
      max: [10000, 'Calories cannot exceed 10000'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    ingredients: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: [true, 'Ingredient is required'],
        },
        measure: {
          type: String,
          required: [true, 'Measure is required'],
        }
      }
    ],
    instructions: {
      type: String,
      required: [true, 'Instructions are required'],
    },
    thumb: {
      type: String,
      default: null,
    }
  },
  { timestamps: true }
);

export const Recipe = model('Recipe', recipeSchema);
