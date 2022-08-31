const mongoose = require('mongoose');

// 1- Create Schema
const categorySchema = new mongoose.Schema({
  name: {
    type:String,
    required:[true,"category is required"],
    unique:[true,"category must be unique"],
    minlength:[3,"minimun characters must be"],
    maxlength:[32,"maximun characters must be 32"]


  },
  slug:{
    type:String,
    lowercase:true
  },
  image:String
},{timestamps:true});

// 2- Create model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
