const express = require("express");

const {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");

const router = express.Router();

router.route("/").get(getBrands).post(createBrandValidator, createBrand);

// //without validation
// router.route('/:id')
// .get(getBrand)
// .put(updateBrand)
// .delete(deleteBrand);
//with validation
router
  .route("/:id")
  // param 1 rule, param 2 middleware ,param 3 service
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
