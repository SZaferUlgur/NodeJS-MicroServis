const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    urunAdi: {type: String, required: true},
    fiyat: {type: Number, required: true},
    miktar: {type: Number, required: true},
    imageURL: {type: String, required: true},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
