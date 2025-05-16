const asyncHandler = require("express-async-handler");
const ApiError = require("../Utility/ErroreApi");
const ApiFeatures = require("../Utility/apifeatcher");
const Product = require("../model/Product");
const factor = require("./Handler");
const Notfs = require("../model/notf");
exports.C_Product=asyncHandler(async(req,res,next)=>{
const product =await Product.create({
    Name:req.body.Name,
    BarCode:req.body.BarCode,
    Quantity:req.body.Quantity,
    Price:req.body.Price,
    LastPrice:req.body.LastPrice||req.body.Price,
    ExpireDate:req.body.ExpireDate
})
if(!product){
    return next(new ApiError("the product is not created",404))
}
res.status(201).json(product)
})
exports.G_Product=  asyncHandler(async (req, res,next) => {
    const date=new Date()
    let filter = {};
    if (req.filterObj) {
      console.log(req.filterObj);
      filter = req.filterObj;
    }

    // Build query
    
    const documentsCounts = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(filter), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .fields()
    .sort()
    console.log('====================================');
    console.log(date.getTime());
    console.log('====================================');
    // Execute query
    const { mongooseDb, paginationResult } = apiFeatures;
    const documents = await mongooseDb;
    documents.forEach(async (e)=>{
        const DateProduct=new Date(e.ExpireDate).getTime()-( 30 * 24 * 60 * 60 * 1000)
        console.log('====================================');
        console.log(DateProduct,e,DateProduct<date,DateProduct,":|",date.getTime());
        console.log('====================================');
        if(DateProduct<date.getTime()){
 console.log('====================================');
 console.log("dddddddddddddd");
 console.log('====================================');
            await Notfs.find({Product:e._id,Code:402}).then(async es=>{
 
                if(es.length===0){
                    console.log('====================================');
                    console.log(es,"lllllllll");
                    console.log('====================================');
await Notfs.create({
    Warn:`${e.Name} these have ecpire inless month`,
    Code:402,
    Product:e._id
})
                }
                return true
            })
        }
    })
    
    res
      .status(200)
      .json({ data: documents  });
  });
exports.GO_Product=asyncHandler(async(req,res,next)=>{
const product =await Product.findById(req.params.id)
if(!product){
    return next(new ApiError(`not have product ${req.params.id}`,400))
}
res.status(200).json(product)
})
exports.U_Product=asyncHandler(async(req,res,next)=>{
const product =await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
if(!product){
    return next(new ApiError(`not have product ${req.params.id}`,400))
}
if(req.body.Quantity>10){
    await Notfs.findOneAndDelete({
        Product:product._id
    })
}
res.status(202).json(product)
})
exports.D_Product=asyncHandler(async(req,res,next)=>{
const product =await Product.findByIdAndDelete(req.params.id,{new:true})
if(!product){
    return next(new ApiError(`not have product ${req.params.id}`,400))
}
res.status(203).json({})
})