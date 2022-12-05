const express = require("express");

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} = require("../services/productService");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const authService = require("../services/authService");
const reviewsRoute = require("./reviewRoute");

const router = express.Router();

// Nested route from specific product to reviews
// POST create   /products/:productID/reviews
// GET allReviews   /products/:productID/reviews
// GET getSpecificReview    /products/:productID/reviews/:reviewId
router.use("/:productId/reviews", reviewsRoute);

router
  .route("/")
  .get(getProducts)
  .post(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );

//with validation
router
  .route("/:id")
  // param 1 rule, param 2 middleware ,param 3 service
  .get(getProductValidator, getProduct)
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
