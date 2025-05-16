const mongoose = require("mongoose");

const NotfSchema = new mongoose.Schema(
  {
    Warn: {
      type: String,
    },
     Code:Number,
     Product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product"
     }
  },
  { timestamps: true }
);
 


const Notfs = mongoose.model("Notf", NotfSchema);

module.exports = Notfs;
