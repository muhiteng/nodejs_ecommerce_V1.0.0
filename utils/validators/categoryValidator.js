const {check} = require('express-validator');
const validatorMiddleware=require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware
]

exports.createCategoryValidator=[
    check('name').notEmpty().withMessage('name is required')
    .isLength({min:3}).withMessage('minimun length ust be 3 characters')
    .isLength({max:3}).withMessage('maximum length ust be 32 characters'),
    validatorMiddleware
];


exports.updateCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware
];


exports.deleteCategoryValidator=[
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware
];
    
