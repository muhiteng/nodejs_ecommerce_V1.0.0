const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../models/subCategoryModel");
const apiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  // nested rout from category to sub , if category not send in bode take it from param
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

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

exports.createFilterObj = (req, res, next) => {
  // if nested route
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  // add new value to req
  req.filterObject = filterObject;
  next();
};
// @des get all subCategories
// @route  GET api/v1/subcategories
// @access public
exports.getSubCategories = asyncHandler(async (req, res) => {
  // get total number of brands
  const documentsCounts = await subCategoryModel.countDocuments();

  //Build query
  const apiFeatures = new ApiFeatures(subCategoryModel.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  //execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  // const products = await apiFeatures.mongooseQuery;

  const subCategories = await mongooseQuery.populate({
    path: "category",
    select: "name -_id",
  }); // return only name  , -_id to remove id
  res.status(200).json({
    results: subCategories.length,
    paginationResult,
    data: subCategories,
  });
});

// @des get  category by id
// @route  GET api/v1/categories/:id
// @access public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params; //or const {id}=req.params;
  const subCategory = await subCategoryModel
    .findById(id)
    //populate do another separate query
    //.populate("category"); // name of ref to  get all fields of documents relatied by ref model
    .populate({ path: "category", select: "name -_id" }); // return only name  , -_id to remove id;
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
exports.deleteSubCategory = factory.deleteOne(subCategoryModel);
// exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   const subCategory = await subCategoryModel.findByIdAndDelete(id);
//   if (!subCategory) {
//     // res.status(404).json({message:`No category for this id :${id}`});
//     return next(new apiError(`No category for this id :${id}`, 404));
//   }

//   res.status(204).send();
// });
