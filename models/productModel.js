const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minlength: [3, "minimun characters must be"],
      maxlength: [100, "maximun characters must be 100"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minlength: [20, "minimun characters must be 20"],
      maxlength: [5000, "maximun characters must be 5000"],
    },
    quantity: {
      type: Number,
      required: [true, "description is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      trim: true,
      maxlength: [10, "maximun characters must be 10"],
    },
    priceAfterDiscount: {
      type: Number,
      max: [2000, "maximun characters must be 2000"],
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "category is required"],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "rating must be equal or bigger than 1"],
      max: [5, "rating must be equal or less than 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {}
);
// use mongoose  query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name -_id",
  });
  next();
});
// 2- Create model
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
