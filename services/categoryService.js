const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const CategoryModel = require('../models/categoryModel');
  const apiError=require('../utils/apiError');

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

// @des get  category by id
// @route  GET api/v1/categories/:id
// @access public
exports.getCategory=asyncHandler(async (req,res,next)=>{

 const id=req.params.id;  //or const {id}=req.params;
 const category=await CategoryModel.findById(id); 
 if(!category){
  // res.status(404).json({message:`No category for this id :${id}`});
  return next(new apiError(`No category for this id :${id}`,404));
   
 }
   
  res.status(200).json({data:category});
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

// @des post  update category
// @route  POST api/v1/categories/:id
// @access private
exports.updateCategory=asyncHandler(async (req,res,next)=>{

   const {id}=req.params;
   const {name}=req.body;
   
  const category=await CategoryModel.findOneAndUpdate({_id:id},{name:name,slug:slugify(name)},{new:true});// new to return category after update); 
  if(!category){
    //res.status(404).json({message:`No category for this id :${id}`});
    return next(new apiError(`No category for this id :${id}`,404));
  }
    
   res.status(200).json({data:category});
 });

 // @des delete  delete category
// @route  DELETE api/v1/categories/:id
// @access private
exports.deleteCategory=asyncHandler(async (req,res,next)=>{

  const {id}=req.params;
  
  
 const category=await CategoryModel.findByIdAndDelete(id);
 if(!category){
  // res.status(404).json({message:`No category for this id :${id}`});
  return next(new apiError(`No category for this id :${id}`,404));
 }
   
  res.status(204).send();
});