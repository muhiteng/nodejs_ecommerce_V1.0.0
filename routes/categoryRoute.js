const express = require("express");

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../services/categoryService");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const authService = require("../services/authService");

const subCategoryRoute = require("./subCategoryRoute");

const router = express.Router();

//Nested route to get sub categories
router.use("/:categoryId/subCategories", subCategoryRoute);

//router.get('/', getCategories);
router
  .route("/")
  .get(getCategories)
  .post(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );

// //without validation
// router.route('/:id')
// .get(getCategory)
// .put(updateCategory)
// .delete(deleteCategory);
//with validation
router
  .route("/:id")
  // param 1 rule, param 2 middleware ,param 3 service
  .get(getCategoryValidator, getCategory)
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;
