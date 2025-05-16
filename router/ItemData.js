const express = require("express");
const router = express.Router();
const get_validation = require("../Validation/categoryvalidation");
const { protect, toAllow } = require("../service/Auth");
const { G_itemData, C_itemData, GO_itemData, U_itemData, D_itemData, uploads, resize } = require("../service/ItemData");
 
router
  .route("/")
  .get(G_itemData).post(uploads,resize,C_itemData)
  router
  .route("/:id")
  .get(GO_itemData)
  .put(U_itemData)
  .delete(D_itemData)
const ItemDataRoute=router
module.exports = ItemDataRoute;