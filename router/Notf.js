const express = require("express");
const router = express.Router();
const get_validation = require("../Validation/categoryvalidation");
const { protect, toAllow } = require("../service/Auth");
const { G_itemData, C_itemData, GO_itemData, U_itemData, D_itemData, uploads, resize } = require("../service/ItemData");
const { get_Notfs } = require("../service/Notf");
 
router
  .route("/")
  .get(get_Notfs) 
 
const NotfRoute=router
module.exports = NotfRoute;