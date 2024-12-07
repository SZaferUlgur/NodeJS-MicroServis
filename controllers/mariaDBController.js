const connectMariaDB = require("../config/mariadbConfig");

const addData = async (req, res) => {
    try {
        let {urunAdi, fiyat, miktar, imageURL} = req.body;
        const connnection = await connectMariaDB();
        const sqlQuery = "CALL addProductSP(?, ?, ?, ?)";
        const response = await connnection.query(sqlQuery, [urunAdi, fiyat, miktar, imageURL]);
        const result = response[0][0].result;
        res.send(result);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

const getAll = async (req, res) => {
    try {
        const connnection = await connectMariaDB();
        const sqlQuery = "CALL getAllProductsSP()";
        const response = await connnection.query(sqlQuery);
        const result = response[0][0].result;
        res.send(result);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};  

const getById = async (req, res) => {
    try {
        let id = req.params.id;
        const connnection = await connectMariaDB();
        const sqlQuery = "CALL getProductByIdSP(?)";
        const response = await connnection.query(sqlQuery, [id]);
        const result = response[0][0].result;
        res.send(result);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};  

const deleteById = async (req, res) => {
    try {
        let id = req.params.id;
        const connnection = await connectMariaDB();
        const sqlQuery = "CALL deleteProductByIdSP(?)";
        const response = await connnection.query(sqlQuery, [id]);
        const result = response[0][0].result;
        res.send(result);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};  

const updateById = async (req, res) => {
    try {
        let {urunAdi, fiyat, miktar, imageURL} = req.body;
        let id = req.params.id;
        const connnection = await connectMariaDB();
        const sqlQuery = "CALL updateProductByIdSP(?, ?, ?, ?, ?)";
        const response = await connnection.query(sqlQuery, [id, urunAdi, fiyat, miktar, imageURL]);
        const result = response[0][0].result;
        res.send(result);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

module.exports = {addData, getAll, getById, deleteById, updateById};