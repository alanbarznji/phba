const asyncHandler = require("express-async-handler");
 
const Order = require("../model/Order");
const User = require("../model/User");
const Product = require("../model/Product");
const factory=require("./Handler");
 
 
const CardList = require("../model/CardList");
const ApiError = require("../Utility/ErroreApi");
const Notfs = require("../model/notf");
const AllPrice=(cart)=>{
  let price=0
  cart.CardList.map((e)=>{
console.log(e.Quantity*e.Price);
price+=(e.Quantity*e.Price)
console.log(price);
})
return price
}
// const AllQuantity=(cart)=>{
//   let quantity=0
// cart.CardList.map((e)=>{
// quantity+=(e.Quantity)
// })
// return quantity
// }
exports.post_order = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const carts = await CardList.findOne({ user: user._id });
  
  if (!carts) {
    return next(new Error('Cart not found'));
  }

  if (carts.CardList.length <= 0) {
    return next(new Error('Cart does not contain any items'));
  }

  carts.TotalPrice += AllPrice(carts);
  await carts.save();

  const order = await Order.create({
    user: req.user._id,
    totalCartPrice: carts.TotalPrice,
    CartLists: carts.CardList,
    NameUser: req.user.name,
    DateCreated: req.body.Date,
  });

  if (!order) {
    return next(new ApiError("Order could not be created", 404));
  }

  // Process the cart items and create bulk operations
  const bulkOptions = await Promise.all(
    carts.CardList.map(async (item) => {
      if (item.Quantity <= 0) {
        return next(new ApiError("Not enough items in stock", 400));
      }
      
      if (item.Quantity < 10) {
        const notification = await Notfs.find({
          Code: 420,
          Product: item.Product._id,
        }).then((e)=>{
          if(e.length===0){
            Notfs.create({
              Warn: `${item.Product.Name} is running low`,
              Code: 420,
              Product: item.Product._id,
            });
          }
          return true
        })
        console.log(notification);
      }

      // Return the bulk update operation for each item
      return {
        updateOne: {
          filter: { _id: item.Product._id },
          update: { $inc: { Quantity: -item.Quantity } },
        },
      };
    })
  );

  // Execute the bulkWrite operation with resolved bulk options
  await Product.bulkWrite(bulkOptions);

  // Clear cart after order is processed
  carts.TotalPrice = 0;
  carts.CardList = undefined;
  await carts.save();

  // Find admin user
  const adminUser = await User.findOne({ role: "Admin" });
  if (!adminUser) {
    return next(new ApiError("No admin found for this user", 401));
  }

  res.status(201).json({
    cart: carts,
    order: order,
  });
});

exports.get_order_one=factory.getOneUser(Order)
exports.get_order_User=factory.getAll(Order)
exports.get_one_order = factory.getOne(Order)

exports.Expires=asyncHandler(async (req,res,next)=>{
  const Orders=  await Order.find({expires:{$lt:Date.now()}})
  for (let doc of Orders) {
    // Update the document
    doc.CheckIt = true;
    doc.expires = undefined;
    // Save the updated document
    await doc.save();
  }
  next()
})
// asyncHandler(async (req, res, next) => {
//   const orders = await Order.find({
//     user: req.user._id
//   });

//   orders.map(async (e) => {
//     if (e.expires < Date.now()) {
//       e.CheckIt = true;
//       await e.save();
//     }
//   });

//   let filter = {};
//   if (req.filterObj) {
//     filter = req.filterObj;
//   }

//   const lastModifiedDocument = await Order.findOne(filter).sort('-updatedAt').select('updatedAt');
//   if (!lastModifiedDocument) {
//     return res.status(404).json({ message: 'No documents found' });
//   }
//   const lastModified = lastModifiedDocument.updatedAt.toISOString();

//   if (req.headers['if-modified-since']) {
//     const ifModifiedSince = new Date(req.headers['if-modified-since']);
//     const lastModifiedDate = new Date(lastModified);

//     if (lastModifiedDate <= ifModifiedSince) {
//       console.log('Resource not modified');
//       return res.status(220).end();
//     }
//   }

//   const documentsCounts = await Order.countDocuments();
//   const apiFeatures = new ApiFeatures(Order.find({ user: req.user._id }), req.query)
//     .paginate(documentsCounts)
//     .filter()
//     .search()
//     .fields()
//     .sort();

//   const { mongooseDb, paginationResult } = apiFeatures;
//   const documents = await mongooseDb;

//   res.setHeader('Last-Modified', lastModified);
//   res
//     .status(200)
//     .json({ results: documents.length, paginationResult, data: documents });
// });
