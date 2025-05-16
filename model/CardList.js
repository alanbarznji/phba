const { default: mongoose, model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const CardListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
  },
    CardList:[{
        Product: {
            type:mongoose.Schema.ObjectId,
            ref: "Product",
          },
          Quantity: {
            type: Number,
            require: [true, "the email is require"],
      
          },
          Price: {
            type: Number,
            require: [true,  "the role is require"],
          }}
    ],
    TotalPrice:{
        type:Number,
        default:0}
},
   { timestamps: true }
);
CardListSchema.pre(/^find/, async function (next) {
 
  this.populate({
      path: 'CardList.Product',
      select: ""
  })
  next()
})
const CardList = CardListSchema;
module.exports = mongoose.model("CardList", CardList);