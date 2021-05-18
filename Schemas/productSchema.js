var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    prd_ID: String,
    prd_name : String,
    prd_desc: String,
    prd_price: Number,
    prd_reg_date: String,
    prd_quantity: Number
});
module.exports = mongoose.model("productdetails",ProductSchema);