const express = require("express");
const router = express.Router();
const get_validation = require("../Validation/categoryvalidation");
const { toAllow, protect } = require("../service/Auth");
const { post_order, get_order, get_one_order, Expires, get_order_one, get_order_User } = require("../service/Order");

router
  .route("/")
  .get(protect,toAllow("Admin","User"),get_order_one)
  .post(protect,toAllow("Admin","User"), post_order)
  
  // router
  // .route("/:id")
  // .get(protect,toAllow("Admin"),get_one_order);
  
  router
  .route("/all")
  .get(get_order_User)
const OrderRoute=router
module.exports = OrderRoute;     