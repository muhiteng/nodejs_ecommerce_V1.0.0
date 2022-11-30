const mongoose = require("mongoose");

// 1- Create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand is required"],
      unique: [true, "brand must be unique"],
      minlength: [3, "minimun characters must be"],
      maxlength: [32, "maximun characters must be 32"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};
// findOne, findAll and update
brandSchema.post("init", (doc) => {
  setImageURL(doc);
});

// create
brandSchema.post("save", (doc) => {
  setImageURL(doc);
});

// 2- Create model
const brandModel = mongoose.model("Brand", brandSchema);

module.exports = brandModel;
