const connectMSSQL = require("../config/mssqldbConfig");
const sql = require("mssql");

const addData = async (req, res) => {
    try {
        let {urunAdi, fiyat, miktar, imageURL} = req.body;
        const connnection = await connectMSSQL();
        const result = await connnection
            .request()
            .input("p_urunAdi", sql.VarChar, urunAdi)
            .input("p_fiyat", sql.Decimal, fiyat)
            .input("p_miktar", sql.Int, miktar)
            .input("p_imageURL", sql.VarChar, imageURL)
            .execute("addProductSP");
        const response = result.recordset[0]?.result || { message: "Ürün başarıyla eklendi." };
        res.status(201).json(JSON.parse(response));
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

const getAll = async (req, res) => {
    try {
        const connnection = await connectMSSQL();
        const result = await connnection
            .request()
            .execute("getAllProductsSP");
        const response = result.recordset[0]?.result;
        res.status(201).json(JSON.parse(response));
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};  

const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const connnection = await connectMSSQL();
        const result = await connnection
            .request()
            .input("p_id", sql.Int, id)
            .execute("getProductByIdSP");
        const response = result.recordset[0]?.result || { error: "Ürün bulunamadı." };
        res.status(201).json(JSON.parse(response));
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};  

const deleteById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)) {
            return res.status(400).send({error: "Geçersiz ID."});
        }
        const connnection = await connectMSSQL();
        const result = await connnection
            .request()
            .input("p_id", sql.Int, id)
            .execute("deleteProductByIdSP");
        const response = result.recordset[0]?.result || { error: "Ürün bulunamadı." };
        res.status(201).json(JSON.parse(response));
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};  

const updateById = async (req, res) => {
    try {
        let {urunAdi, fiyat, miktar, imageURL} = req.body;
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)) {
            return res.status(400).send({error: "Geçersiz ID."});
        }
        const connnection = await connectMSSQL();
        const result = await connnection
            .request()
            .input("p_id", sql.Int, id)
            .input("p_urunAdi", sql.VarChar, urunAdi)
            .input("p_fiyat", sql.Float, fiyat)
            .input("p_miktar", sql.Int, miktar)
            .input("p_imageURL", sql.VarChar, imageURL)
            .execute("updateProductByIdSP");
        const response = result.recordset[0]?.result || { message: "Ürün Başarıyla Güncellendi." };
        res.status(201).json(JSON.parse(response));
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

module.exports = {addData, getAll, getById, deleteById, updateById};