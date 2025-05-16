const mongoose = require("mongoose");

const ItemDataSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "brand required"],
      minlength: [3, "to short"],
      maxlingth: [32, "to long "],
    },
     image: String,
  },
  { timestamps: true }
);
const url=(docs)=>{
  if(docs.image){
    const images=`${process.env.BASE_URL}/ItemData/${docs.image}`
    docs.image=images;
  }

}
ItemDataSchema.post('init',(doc)=>{
  url(doc)
})
ItemDataSchema.post("save",(doc)=>{
  url(doc)
})


const ItemData = mongoose.model("ItemData", ItemDataSchema);

module.exports = ItemData;
