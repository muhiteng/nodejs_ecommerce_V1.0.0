const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

const brandModel = require("../models/brandModel");
// Upload single image
// image is the name of the field by request sended from client
exports.uploadBrandImage = uploadSingleImage("image");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  // here sometimes we must create the floder upload/brands manually
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);

  // Save image into our db
  req.body.image = filename;

  next();
});

// @des get all brands
// @route  GET api/v1/brands
// @access public
exports.getBrands = factory.getAll(brandModel);
// exports.getBrands = asyncHandler(async (req, res) => {
//   // get total number of brands
//   const documentsCounts = await brandModel.countDocuments();

//   //Build query
//   const apiFeatures = new ApiFeatures(brandModel.find(), req.query)
//     .paginate(documentsCounts)
//     .filter()
//     .search()
//     .limitFields()
//     .sort();

//   //execute query
//   const { mongooseQuery, paginationResult } = apiFeatures;
//   // const products = await apiFeatures.mongooseQuery;

//   const brands = await mongooseQuery;

//   res
//     .status(200)
//     .json({ results: brands.length, paginationResult, data: brands });
// });

// @des get  brand by id
// @route  GET api/v1/brands/:id
// @access public
exports.getBrand = factory.getOne(brandModel);
// exports.getBrand = asyncHandler(async (req, res, next) => {
//   const { id } = req.params; //or const {id}=req.params;
//   const brand = await brandModel.findById(id);
//   if (!brand) {
//     // res.status(404).json({message:`No brand for this id :${id}`});
//     return next(new apiError(`No brand for this id :${id}`, 404));
//   }

//   res.status(200).json({ data: brand });
// });

// @des create new brand
// @route  POST api/v1/brands
// @access private
exports.createBrand = factory.createOne(brandModel);
// exports.createBrand = asyncHandler(async (req, res) => {

//   const brand = await brandModel.create(req.body);
//   res.status(201).send(brand);
// });

// exports.createBrand = asyncHandler(async (req, res) => {
//   const name = req.body.name;
//   const brand = await brandModel.create({ name, slug: slugify(name) });
//   res.status(201).send(brand);
// });

// @des post  update brand
// @route  POST api/v1/brands/:id
// @access private
exports.updateBrand = factory.updateOne(brandModel);
// exports.updateBrand = asyncHandler(async (req, res, next) => {

//   const { name } = req.body;

//   const brand = await brandModel.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   ); // new to return brand after update);
//   if (!brand) {
//     //res.status(404).json({message:`No brand for this id :${id}`});
//     return next(new apiError(`No brand for this id :${id}`, 404));
//   }

//   res.status(200).json({ data: brand });
// });
// exports.updateBrand = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const { name } = req.body;

//   const brand = await brandModel.findOneAndUpdate(
//     { _id: id },
//     { name: name, slug: slugify(name) },
//     { new: true }
//   ); // new to return brand after update);
//   if (!brand) {
//     //res.status(404).json({message:`No brand for this id :${id}`});
//     return next(new apiError(`No brand for this id :${id}`, 404));
//   }

//   res.status(200).json({ data: brand });
// });

// @des delete  delete brand
// @route  DELETE api/v1/brands/:id
// @access private
exports.deleteBrand = factory.deleteOne(brandModel);
// exports.deleteBrand = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   const brand = await brandModel.findByIdAndDelete(id);
//   if (!brand) {
//     // res.status(404).json({message:`No brand for this id :${id}`});
//     return next(new apiError(`No brand for this id :${id}`, 404));
//   }

//   res.status(204).send();
// });
