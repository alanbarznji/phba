const asyncHandler = require("express-async-handler");
const Product = require("../model/Product")
const CardList = require("../model/CardList");
const ApiError = require("../Utility/ErroreApi");
const AllPrice=(cart)=>{
  console.log(cart);
  
    let price=0
    cart.CardList.forEach((e)=>{
  price+=(e.Quantity*e.Price)
})
return price
}
const AllQuantity=(cart)=>{
    let quantity=0
cart.CardList.map((e)=>{
  quantity+=(e.Quantity)
})
return quantity
}
function calculateDiscount(originalPrice, discountPercentage) {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;
  return discountedPrice;
}
exports.Post_CartList = asyncHandler(async (req, res, next) => {
  let price
  console.log(req.body)
  const product = await Product.findOne({ BarCode: req.body.Product });
  console.log('====================================');
  console.log(product.Quantity <= 0);
  console.log('====================================');
  if (!product || product.Quantity <= 0) {
    return next(new ApiError("This product is not available", 404));
  }
  if( req.body.discount>0){
    price=req.body.discount
  }
  else{
    price=product.Price
  }
 

    if (product.LastPrice >price||product.Price<price) {
        return next(new ApiError("The discount is less than the last price", 404));
    }

    const existingCartItem = await CardList.findOne({
        user: req.user._id,
        "CardList.Product": product._id
    });
    const PriceCheck=existingCartItem?existingCartItem.CardList.filter((e)=>e.Price===Number(price)):[]
    // console.log(PriceCheck,'mmmmmmm');
    const index = PriceCheck.findIndex(
      (item)=>((item.Product._id.toString()==product._id.toString())&&(item.Price==Number(price)))
  )
  console.log('====================================');
  console.log(product.Quantity,Number(req.body.Quantity),PriceCheck[index]?.Quantity);
  console.log('====================================');
    console.log(product.Quantity>Number(req.body.Quantity)+PriceCheck[index]?.Quantity,(product.Quantity<(req.body.Quantity+PriceCheck[index]?.Product.Quantity)));
    

  if (existingCartItem &&PriceCheck.some(e=>e.Product._id.toString()==product._id.toString()),index>-1) {
      // If the product already exists in the cart, increment the quantity
      if(product.Quantity>=Number(req.body.Quantity)+PriceCheck[index]?.Quantity){

        PriceCheck[index].Quantity+=req.body.Quantity
        existingCartItem.TotalPrice = AllPrice(existingCartItem);
        
        await existingCartItem.save()
        res.status(201).json({ data: existingCartItem });
      }else{
        return next(new ApiError("these item not have enough quantityt",404))
      }
  } 

else {
      // If the product does not exist in the cart, add a new entry
      const cart = await CardList.findOneAndUpdate(
          { user: req.user._id },
          {
              $push: { CardList: { Product: product._id, Quantity: req.body.Quantity, Price:price} },
          },
          { new: true }
          
      );
      cart.TotalPrice = AllPrice(cart);                                                                      
      await cart.save()

      res.status(201).json({ data: cart });
  }
});
exports.GetOnes_CartList=asyncHandler(async (req,res,next)=>{
    const cart=await CardList.findOne({user:req.user._id})
    if(!cart){
      return next(new ApiError('not have cardList',400))
    }
    res.status(200).json({data:cart})
})
exports.GetAll_CartList = asyncHandler(async (req, res, next) => {
  const cart = await CardList.find();
  if(!cart){
    return next(new ApiError('not have cardList',400))
  }
  res.status(200).json({ data: cart });
});
exports.UpdateOne_CartList = asyncHandler(async (req, res, next) => {
  const cart = await CardList.findOneAndUpdate(
    { user: req.user._id, 'CardList._id': req.params.id },
    {
      $inc: { 'CardList.$.Quantity':  -req.body.Quantity  },
    },
    { new: true }
  );
      if(!cart){
    return next(new ApiError("it is not item in your cart",401))
  }
  cart.TotalPrice = AllPrice(cart);
  await cart.save()
res.status(200).json({ data: cart });

});
exports.DeleteOne_CartList = asyncHandler(async (req, res, next) => {
  const cart = await CardList.findOneAndUpdate(
    {
      user: req.user._id,
      "CardList._id": req.params.Item 
    },
    {
      $pull: { CardList: { _id: req.params.Item } },
    },
    {
      new: true,
    }
  );
  console.log(cart);
  if(!cart){
    return next(new ApiError("it is not item in your cart",401))
  }
    cart.TotalPrice = AllPrice(cart);
    await cart.save()
  res.status(200).json({ data: cart });
});
exports.Delete_CartList = asyncHandler(async (req, res, next) => {
  const cart = await CardList.findOne({user:req.user._id});
  console.log(cart);
  console.log(req.user._id);
  cart.TotalPrice=0
  cart.Brand=null
  cart.CartList=undefined
  await cart.save()
  res.status(200).json({ data: cart });
})
