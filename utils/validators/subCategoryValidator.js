const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("minimun length ust be 3 characters")
    .isLength({ max: 32 })
    .withMessage("maximum length ust be 32 characters"),
  check("category")
    .notEmpty()
    .withMessage("category is required")
    .isMongoId()
    .withMessage("category must be category id format"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware
];

exports.deleteSubCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware
];
