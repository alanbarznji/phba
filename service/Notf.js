const factory=require("./Handler");
const ApiError = require("../Utility/ErroreApi");
const Notfs = require("../model/notf");
exports.get_Notfs=factory.getAll(Notfs)
exports.get_Notfs_User=factory.getAll(Notfs)
exports.get_one_Notfs = factory.getOne(Notfs)