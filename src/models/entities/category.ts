import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    imgURL: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model('Categories', categorySchema);
export default Category;
