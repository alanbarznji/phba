const { default: mongoose, model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const Product_Schema = new mongoose.Schema(
  {
    Name: {
      type: String,
      require: [true, "the name is require"],
      unique: true,
    },
    BarCode: {
      type: String,
      require: [true, "the password is require"],
      unique: true,
    },
    Quantity: {
      type: Number,
      require: [true, "the email is require"],
 
    },
    Price: {
      type: Number,
 
      require: [true,  "the role is require"],
    },
    LastPrice: {
      type: Number,
 
      require: [true,  "the role is require"],
    },
    DisCount:{
        type: Number,
 default:0,
        require: [true,  "the role is require"],
    },
ExpireDate:{
    type: Date,
           require: [true,  "the role is require"],
}
  },
  { timestamps: true }
);
const Product = Product_Schema;
module.exports = mongoose.model("Product", Product);