const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const productModel = require("../models/productModel");

const apiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

// @des get all products
// @route  GET api/v1/products
// @access public
exports.getProducts = factory.getAll(productModel, "Products");
// exports.getProducts = asyncHandler(async (req, res) => {
//   // //1) filtering
//   // //ex: http://localhost:4000/api/v1/products?ratingsAverage=4.4
//   // // to take a copy of req.query not reference in(const queryStringObject=req.query;)
//   // const queryStringObject = { ...req.query };
//   // const excludesFields = ["page", "limit", "sort", "fields"];
//   // excludesFields.forEach((field) => delete queryStringObject[field]);
//   // //console.log(req.query);
//   // //console.log(queryStringObject);

//   // //ex: http://localhost:4000/api/v1/products?ratingsAverage[lte]=4.4
//   // //applay filtering using [gte,gt,lte,lt]
//   // //object in mongo : {price:{$gte:4},ratingsAverage:{$gte:200}} means greater than or equal
//   // //object in mongo : {price:{$lte:4},ratingsAverage:{$lte:200}} means less than or equal
//   // //parameter in postman :  ratingsAverage[gte] result of it : {price:{gte:4},ratingsAverage:{gte:200}}
//   // // so we replace gte with $gte and for others
//   // //  JSON.stringify : convert object to string, convert string to object : JSON.parse()
//   // let queryStr = JSON.stringify(queryStringObject);
//   // // reqular expression if there is exactly use :(\b   \b) gte,gt,lte,lt   then use :   g means if more than one value
//   // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//   // //2) paggination
//   // const page = req.query.page * 1 || 1;
//   // const limit = req.query.limit * 1 || 5;
//   // const skip = (page - 1) * limit;

//   // get total number of products
//   const documentsCounts = await productModel.countDocuments();

//   const apiFeatures = new ApiFeatures(productModel.find(), req.query)
//     .paginate(documentsCounts)
//     .filter()
//     .search("Products")
//     .limitFields()
//     .sort();
//   // build query
//   // let mongooseQuery = productModel
//   //   .find(JSON.parse(queryStr))
//   //   // .skip(skip)
//   //   // .limit(limit)
//   //   .populate({ path: "category", select: "name -_id" }); // return only name  , -_id to remove id;
//   // //3) sorting
//   // // ex: http://localhost:4000/api/v1/products?sort=-price,sold
//   // // for ASE sort use in query string ex: sort=price , for many sort : sort=price,sold
//   // // for DESC sort use in query string ex: sort=-price, for many sort : sort=price,-sold
//   // if (req.query.sort) {
//   //   // in mongo for many sort use  mongoose.sort('price sold')
//   //   // split query by comma   ex : price,sold => [price,sold]
//   //   // join by comma ex:  [price,sold] => price sold
//   //   const sortBy = req.query.sort.split(",").join(" ");

//   //   mongooseQuery = mongooseQuery.sort(sortBy);
//   // } else {
//   //   // if not there is query string sort then sort by recent products  createAt DESC
//   //   mongooseQuery = mongooseQuery.sort("-createAt");
//   // }

//   // //4) fields limiting
//   // // return only title,image,price ex:  http://localhost:4000/api/v1/products?fields=title,image,price
//   // // return all except price ex:  http://localhost:4000/api/v1/products?fields=-price
//   // if (req.query.fields) {
//   //   // in mongo for specific select use  mongoose.select(' titleprice')
//   //   // split query by comma   ex :title, price => [title, price]
//   //   // join by comma ex:  [title,price] => title price
//   //   const fields = req.query.fields.split(",").join(" ");
//   //   mongooseQuery = mongooseQuery.select(fields);
//   // } else {
//   //   // all fields except __v with return from mongoose
//   //   mongooseQuery = mongooseQuery.select("-__v");
//   // }
//   // // 5) search
//   // if (req.query.keyword) {
//   //   const query = {};
//   //   query.$or=[
//   //     // use option i to make car ==Car==CAR same thing
//   //     { title: { $regex: req.query.keyword ,$options:'i' } },
//   //     { description: { $regex: req.query.keyword ,$options:'i'} },
//   //   ];
//   //   mongooseQuery = mongooseQuery.find(query);
//   // }
//   // execute query
//   //const products = await mongooseQuery;

//   const { mongooseQuery, paginationResult } = apiFeatures;
//   // const products = await apiFeatures.mongooseQuery;
//   const products = await mongooseQuery;

//   // return response
//   res
//     .status(200)
//     .json({ results: products.length, paginationResult, data: products });
// });

// @des get  product by id
// @route  GET api/v1/products/:id
// @access public
exports.getProduct = factory.getOne(productModel);
// exports.getProduct = asyncHandler(async (req, res, next) => {
//   const { id } = req.params; //or const {id}=req.params;
//   const product = await productModel.findById(id);
//   if (!product) {
//     // res.status(404).json({message:`No product for this id :${id}`});
//     return next(new apiError(`No product for this id :${id}`, 404));
//   }

//   res.status(200).json({ data: product });
// });

// @des create new product
// @route  POST api/v1/products
// @access private
exports.createProduct = factory.createOne(productModel);
// exports.createProduct = asyncHandler(async (req, res) => {
//   req.body.slug = slugify(req.body.title);
//   req.body.category;
//   const product = await productModel.create(req.body);
//   res.status(201).send(product);
// });

// @des post  update product
// @route  POST api/v1/products/:id
// @access private
exports.updateProduct = factory.updateOne(productModel);
// exports.updateProduct = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   if (req.body.title) req.body.slug = slugify(req.body.title);

//   const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
//     new: true,
//   }); // new to return product after update);
//   if (!product) {
//     //res.status(404).json({message:`No product for this id :${id}`});
//     return next(new apiError(`No product for this id :${id}`, 404));
//   }

//   res.status(200).json({ data: product });
// });

// @des delete  delete product
// @route  DELETE api/v1/products/:id
// @access private
exports.deleteProduct = factory.deleteOne(productModel);
// exports.deleteProduct = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   const product = await productModel.findByIdAndDelete(id);
//   if (!product) {
//     // res.status(404).json({message:`No product for this id :${id}`});
//     return next(new apiError(`No product for this id :${id}`, 404));
//   }

//   res.status(204).send();
// });
