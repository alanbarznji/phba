 
const { check, body } = require("express-validator");
 

exports.cr_product = [
  check("Name")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("Product required")
 ,
  check("BarCode")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars"),
  check("Quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("Price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),
  check("LastPrice")
  .notEmpty()
  .withMessage("Product price is required")
  .isNumeric()
  .withMessage("Product price must be a number")
  .isLength({ max: 32 }),
  check("ExpireDate")
  .notEmpty()
  .withMessage("Product price is required")
  .custom(val=>{
    const date=new Date(val).getTime()
    if(date<=Date.now()){
return  Promise.reject(
  new  Error('please check the date')
)
    }
    return true
  }
  ),

 
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