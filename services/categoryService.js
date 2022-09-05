const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");
const apiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

// @des get all categories
// @route  GET api/v1/categories
// @access public
exports.getCategories = factory.getAll(CategoryModel);
// exports.getCategories = asyncHandler(async (req, res) => {
//   // get total number of brands
//   const documentsCounts = await CategoryModel.countDocuments();

//   //Build query
//   const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
//     .paginate(documentsCounts)
//     .filter()
//     .search()
//     .limitFields()
//     .sort();

//   //execute query
//   const { mongooseQuery, paginationResult } = apiFeatures;
//   // const products = await apiFeatures.mongooseQuery;

//   const categories = await mongooseQuery;

//   res
//     .status(200)
//     .json({ results: categories.length, paginationResult, data: categories });
// });

// @des get  category by id
// @route  GET api/v1/categories/:id
// @access public
exports.getCategory = factory.getOne(CategoryModel);
// exports.getCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params; //or const {id}=req.params;
//   const category = await CategoryModel.findById(id);
//   if (!category) {
//     // res.status(404).json({message:`No category for this id :${id}`});
//     return next(new apiError(`No category for this id :${id}`, 404));
//   }

//   res.status(200).json({ data: category });
// });

// @des create new category
// @route  POST api/v1/categories
// @access private
exports.createCategory = factory.createOne(CategoryModel);
// exports.createCategory = asyncHandler(async (req, res) => {
//   const name = req.body.name;
//   const category = await CategoryModel.create({ name, slug: slugify(name) });
//   res.status(201).send(category);
// });

// @des post  update category
// @route  POST api/v1/categories/:id
// @access private
exports.updateCategory = factory.updateOne(CategoryModel);
// exports.updateCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const { name } = req.body;

//   const category = await CategoryModel.findOneAndUpdate(
//     { _id: id },
//     { name: name, slug: slugify(name) },
//     { new: true }
//   ); // new to return category after update);
//   if (!category) {
//     //res.status(404).json({message:`No category for this id :${id}`});
//     return next(new apiError(`No category for this id :${id}`, 404));
//   }

//   res.status(200).json({ data: category });
// });

// @des delete  delete category
// @route  DELETE api/v1/categories/:id
// @access private
exports.deleteCategory = factory.deleteOne(CategoryModel);
// exports.deleteCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   const category = await CategoryModel.findByIdAndDelete(id);
//   if (!category) {
//     // res.status(404).json({message:`No category for this id :${id}`});
//     return next(new apiError(`No category for this id :${id}`, 404));
//   }

//   res.status(204).send();
// });
