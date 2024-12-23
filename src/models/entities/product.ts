import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    modelName: {
      type: String,
      required: true
    },
    material: {
      type: String,
      required: true
    },
    color: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      required: true
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
    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'productCollection',
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imgURL: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Products', productSchema);
export default Product;
