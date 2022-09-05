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
