import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    versionKey: false,
    timestamps: false
  }
);

export const Category = model('Category', categorySchema);
