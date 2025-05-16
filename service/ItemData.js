const asyncHandler = require("express-async-handler");
const multer = require("multer");
const factor=require('./Handler')
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const ItemData = require("../model/ItemData");
const memoryStorage=multer.memoryStorage()
exports.resize=asyncHandler(async(req,res,next)=>{
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
    sharp(req.file.buffer).toFormat('jpeg')
    .jpeg({quality:90})
    .resize(500,500)
    .toFile(`uploads/itemData/${filename}`)
    req.body.image = filename;
    next()
  })
  const filter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
      cb(null,true)
    }
    else{
      cb(new ApiError("only image", 400), false);
    }
  }
  exports.uploads = multer({ storage: memoryStorage, fileFilter: filter }).single(
    "image"
    );
exports.C_itemData= 
  asyncHandler(async (req, res,next) => {
    console.log(req.body,
      req.body.Name,
      req.body.image
    );
    
      const newDoc = await ItemData.create({
        Name:req.body.Name,
        image:req.body.image
      });
      if(!newDoc){
        return next(new ApiError("کێشەیەک ڕویدا چیکی امترنێت بکەوە",400))
      }
      res.status(201).json({ data: newDoc });
    })
exports.G_itemData=factor.getAll(ItemData)
exports.GO_itemData=factor.getOne(ItemData)
exports.U_itemData=factor.updateOne(ItemData)
exports.D_itemData=factor.deleteOne(ItemData)