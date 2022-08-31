const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const CategoryModel = require('../models/categoryModel');

// @des get all categories
// @route  GET api/v1/categories
// @access public
exports.getCategories =asyncHandler(  async (req, res) => {
  const page=req.query.page*1||1;
  const limit=req.query.limit*1||5;
  const skip=(page-1)*limit;

 const categories=await CategoryModel.find({}).skip(skip).limit(limit);
 res.status(200).json({results:categories.length,page,data:categories});
 
});


// @des create new category
// @route  POST api/v1/categories
// @access private
exports.createCategory=asyncHandler(
async (req,res)=>{
  const name = req.body.name;
  const category=await CategoryModel.create({name,slug:slugify(name)});
  res.status(201).send(category);
 
}
) ;
