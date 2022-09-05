const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      // res.status(404).json({message:`No brand for this id :${id}`});
      return next(new apiError(`No brand for this id :${id}`, 404));
    }
  
    res.status(204).send();
  });

  exports.updateOne=(Model)=>asyncHandler(async (req, res, next) => {
  
    const { name } = req.body;
  
    const document = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ); // new to return brand after update);
    if (!document) {
      
      return next(new apiError(`No result for this id :${id}`, 404));
    }
  
    res.status(200).json({ data: document });
  });
