const express = require("express");
const router = express.Router();
const get_validation = require("../Validation/categoryvalidation");
const { protect, toAllow } = require("../service/Auth");
const { G_Product, C_Product, U_Product, D_Product, GO_Product } = require("../service/Product");
const { cr_product } = require("../Utility/Validation/product_validation");
router
  .route("/")
  .get(G_Product).post(cr_product,get_validation,C_Product)
  router
  .route("/:id")
  .get(GO_Product)
  .put(U_Product)
  .delete(D_Product)
const ProductRoute=router
module.exports = ProductRoute;