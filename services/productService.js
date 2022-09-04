const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const productModel = require("../models/productModel");

const apiError = require("../utils/apiError");

// @des get all products
// @route  GET api/v1/products
// @access public
exports.getProducts = asyncHandler(async (req, res) => {
  //1) filtering
  // to take a copy of req.query not reference in(const queryStringObject=req.query;)
  const queryStringObject = { ...req.query };
  const excludesFields = ["page", "limit", "sort", "fields"];
  excludesFields.forEach((field) => delete queryStringObject[field]);
  //console.log(req.query);
  //console.log(queryStringObject);
  //2) paggination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  // build query
  const mongooseQuery = productModel
    .find(queryStringObject)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" }); // return only name  , -_id to remove id;

  // execute query
  const products = await mongooseQuery;

  // return response
  res.status(200).json({ results: products.length, page, data: products });
});

// @des get  product by id
// @route  GET api/v1/products/:id
// @access public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params; //or const {id}=req.params;
  const product = await productModel.findById(id);
  if (!product) {
    // res.status(404).json({message:`No product for this id :${id}`});
    return next(new apiError(`No product for this id :${id}`, 404));
  }

  res.status(200).json({ data: product });
});

// @des create new product
// @route  POST api/v1/products
// @access private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.category;
  const product = await productModel.create(req.body);
  res.status(201).send(product);
});

// @des post  update product
// @route  POST api/v1/products/:id
// @access private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title);

  const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  }); // new to return product after update);
  if (!product) {
    //res.status(404).json({message:`No product for this id :${id}`});
    return next(new apiError(`No product for this id :${id}`, 404));
  }

  res.status(200).json({ data: product });
});

// @des delete  delete product
// @route  DELETE api/v1/products/:id
// @access private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.findByIdAndDelete(id);
  if (!product) {
    // res.status(404).json({message:`No product for this id :${id}`});
    return next(new apiError(`No product for this id :${id}`, 404));
  }

  res.status(204).send();
});
