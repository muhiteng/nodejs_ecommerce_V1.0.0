const express = require('express');


const { getCategories ,createCategory,getCategory,updateCategory,deleteCategory} = require('../services/categoryService');
const {getCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator}=require("../utils/validators/categoryValidator")
const router = express.Router();

//router.get('/', getCategories);
router.route('/')
.get(getCategories)
.post(createCategoryValidator,createCategory);

// //without validation
// router.route('/:id')
// .get(getCategory)
// .put(updateCategory)
// .delete(deleteCategory);
//with validation
router.route('/:id')
// param 1 rule, param 2 middleware ,param 3 service
.get(getCategoryValidator,getCategory)
.put(updateCategoryValidator,updateCategory)
.delete(deleteCategoryValidator,deleteCategory);

module.exports = router;
