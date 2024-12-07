const Products = require("../models/Products");

const addData = async (req, res) => {
    try {
        const { urunAdi, fiyat, miktar, imageURL } = req.body;
        const product = new Products({ urunAdi, fiyat, miktar, imageURL });
        const savedProduct = await product.save();
        res.status(201).send(savedProduct);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const products = await Products.find();
        if(!products.length > 0) {
            res.status(404).send({ error: "Ürün bulunamadı." });
        }
        res.send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};  

const getById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Products.findById(id);
        if(!product) {
            res.status(404).send({ error: "Ürün bulunamadı." });
        }
        res.send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};  

const deleteById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Products.findByIdAndDelete(id);
        if(!product) {
            res.status(404).send({ error: "Ürün bulunamadı." });
        }
        res.send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};  

const updateById = async (req, res) => {
    try {
        const { urunAdi, fiyat, miktar, imageURL } = req.body;
        const {id} = req.params;
        const product = await Products.findByIdAndUpdate(id, { urunAdi, fiyat, miktar, imageURL }, { new: true });
        if(!product) {
            res.status(404).send({ error: "Ürün bulunamadı." });
        }
        res.send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {addData, getAll, getById, deleteById, updateById};