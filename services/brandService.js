const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const brandModel = require("../models/brandModel");
const apiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
// @des get all brands
// @route  GET api/v1/brands
// @access public
exports.getBrands = asyncHandler(async (req, res) => {
  // get total number of brands
  const documentsCounts = await brandModel.countDocuments();

  //Build query
  const apiFeatures = new ApiFeatures(brandModel.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  //execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  // const products = await apiFeatures.mongooseQuery;

  const brands = await mongooseQuery;

  res
    .status(200)
    .json({ results: brands.length, paginationResult, data: brands });
});

// @des get  brand by id
// @route  GET api/v1/brands/:id
// @access public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params; //or const {id}=req.params;
  const brand = await brandModel.findById(id);
  if (!brand) {
    // res.status(404).json({message:`No brand for this id :${id}`});
    return next(new apiError(`No brand for this id :${id}`, 404));
  }

  res.status(200).json({ data: brand });
});

// @des create new brand
// @route  POST api/v1/brands
// @access private
exports.createBrand = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).send(brand);
});

// @des post  update brand
// @route  POST api/v1/brands/:id
// @access private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  ); // new to return brand after update);
  if (!brand) {
    //res.status(404).json({message:`No brand for this id :${id}`});
    return next(new apiError(`No brand for this id :${id}`, 404));
  }

  res.status(200).json({ data: brand });
});

// @des delete  delete brand
// @route  DELETE api/v1/brands/:id
// @access private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await brandModel.findByIdAndDelete(id);
  if (!brand) {
    // res.status(404).json({message:`No brand for this id :${id}`});
    return next(new apiError(`No brand for this id :${id}`, 404));
  }

  res.status(204).send();
});
