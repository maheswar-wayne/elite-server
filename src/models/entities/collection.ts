import mongoose, { Schema } from 'mongoose';

const collectionSchema = new Schema(
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
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subCategories',
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

const Collection = mongoose.model('collection', collectionSchema);
export default Collection;
