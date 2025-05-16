const mongoose = require("mongoose");

const FinegrChema = new mongoose.Schema(
  {

     image: String,
  },
  { timestamps: true }
);




const Finger = mongoose.model("Finger", FinegrChema);

module.exports = Finger;
