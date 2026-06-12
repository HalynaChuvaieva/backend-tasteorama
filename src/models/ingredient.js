import { model, Schema } from "mongoose";

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: false
  }
);

export const Ingredient = model('Ingredient', ingredientSchema);
