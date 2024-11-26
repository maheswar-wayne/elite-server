import mongoose, { Schema } from 'mongoose';

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories',
      required: true
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

const SubCategory = mongoose.model('SubCategories', subCategorySchema);
export default SubCategory;
