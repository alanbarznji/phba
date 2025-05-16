const { Schema, default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema({
    CartLists: [
        {
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
              }
        },
    ],
    totalCartPrice: Number,
    totalCartQuantity:Number,
    NameUser: {
        type: String,
    },
    DateCreated:String
},
    { timestamps: true });

OrderSchema.pre(/^find/, async function (next) {
 
    this.populate({
        path: 'CartLists.Product',
        select: ""
    })
    next()
})
// OrderSchema.post(/^find/,async function (next) {
// await this.find({expires:{lt:Date.now()}}).then((e)=>{
// e.CheckIt=true
// e.save()
// })
//     next()
// })

module.exports = mongoose.model("Order", OrderSchema);
