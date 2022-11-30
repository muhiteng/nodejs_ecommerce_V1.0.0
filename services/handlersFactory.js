const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      // res.status(404).json({message:`No brand for this id :${id}`});
      return next(new ApiError(`No brand for this id :${id}`, 404));
    }

    res.status(204).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    //const { name } = req.body;

    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // new to return brand after update);
    if (!document) {
      return next(new ApiError(`No result for this document`, 404));
    }

    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).send(document);
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params; //or const {id}=req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`No document for this id :${id}`, 404));
    }

    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modeName = "") =>
  asyncHandler(async (req, res) => {
    // for nested routes in subCategories
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // get total number of brands
    const documentsCounts = await Model.countDocuments();

    //Build query
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(modeName)
      .limitFields()
      .sort();

    //execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    // const products = await apiFeatures.mongooseQuery;

    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });
