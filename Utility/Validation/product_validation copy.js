 
const { check, body } = require("express-validator");
 

exports.cr_ItemData = [
  check("Name")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("Product required")
];

exports.gr_product = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  
];

exports.ur_product = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  body("title")
    .optional()

 
];

exports.dr_product = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
 ];