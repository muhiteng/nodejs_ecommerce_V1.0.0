const express = require('express');

const { getCategories ,createCategory,getCategory,updateCategory} = require('../services/categoryService');

const router = express.Router();

//router.get('/', getCategories);
router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getCategory).put(updateCategory);

module.exports = router;
