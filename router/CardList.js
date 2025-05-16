const express = require("express");
const router = express.Router();
const get_validation = require("../Validation/categoryvalidation");
const { toAllow, protect } = require("../service/Auth");
const { Post_CartList, DeleteOne_CartList, GetOnes_CartList, GetAll_CartList, Delete_CartList, UpdateOne_CartList } = require("../service/CardList");
router
  .route("/")
  .post(protect,toAllow("User"),Post_CartList)
  .get(protect,toAllow("Admin"),GetAll_CartList)
  router
    .route("/:Item")
    .delete(protect,toAllow("Admin","User"), DeleteOne_CartList)
    .post(protect, toAllow("Admin","User"), UpdateOne_CartList);
  router
    .route("/update/:id")
    .put(protect, toAllow("Admin","User") , UpdateOne_CartList)
  router
    .route("/delete")
    .delete(protect, toAllow("Admin","User"), Delete_CartList);
  router
    .route("/your")
    .get(protect, toAllow("Admin","User"), GetOnes_CartList);
 
const CardListRoute=router
module.exports = CardListRoute;