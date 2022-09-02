const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");
const apiError = require("../utils/apiError");

// @des create new subcategory
// @route  POST api/v1/subcategories
// @access private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).send(subCategory);
});

// @des get all subCategories
// @route  GET api/v1/subcategories
// @access public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await subCategoryModel.find({}).skip(skip).limit(limit);
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @des get  category by id
// @route  GET api/v1/categories/:id
// @access public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params; //or const {id}=req.params;
  const subCategory = await subCategoryModel.findById(id);
  if (!subCategory) {
    // res.status(404).json({message:`No category for this id :${id}`});
    return next(new apiError(`No category for this id :${id}`, 404));
  }

  res.status(200).json({ data: subCategory });
});

// @des post  update category
// @route  POST api/v1/categories/:id
// @access private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await subCategoryModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name), category: category },
    { new: true }
  ); // new to return category after update);
  if (!subCategory) {
    //res.status(404).json({message:`No category for this id :${id}`});
    return next(new apiError(`No category for this id :${id}`, 404));
  }

  res.status(200).json({ data: subCategory });
});

// @des delete  delete sub category
// @route  DELETE api/v1/subcategories/:id
// @access private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await subCategoryModel.findByIdAndDelete(id);
  if (!subCategory) {
    // res.status(404).json({message:`No category for this id :${id}`});
    return next(new apiError(`No category for this id :${id}`, 404));
  }

  res.status(204).send();
});
