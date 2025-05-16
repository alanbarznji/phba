 
const AuthRoute=require('../router/Auth');
const CardListRoute = require('./CardList');
const ItemDataRoute = require('./ItemData');
const NotfRoute = require('./Notf');
const OrderRoute = require('./Order');
const ProductRoute = require('./Product');
const UserRout = require('./User');
const index = (app) => {
    app.use("/api/v1/product",ProductRoute)
    app.use("/api/v1/card",CardListRoute),
    app.use("/api/v1/order",OrderRoute),
    app.use("/api/v1/product",ProductRoute)
    app.use("/api/v1/auth",AuthRoute)
    app.use("/api/v1/data",ItemDataRoute)
    app.use("/api/v1/user",UserRout)
    app.use("/api/v1/notf",NotfRoute)
};
module.exports=index