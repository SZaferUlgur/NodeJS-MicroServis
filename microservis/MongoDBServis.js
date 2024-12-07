const express = require("express");
const dotenv = require("dotenv");
const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");
const notFound = require("../middleware/notFound");
const mongoDBRoutes = require("../routes/mongoDBRoutes");
const connectMongoDB = require("../config/mongodbConfig");

dotenv.config();

const startMongoDBServis = async (port) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(logger);
    app.use("/products", mongoDBRoutes.routes);
    app.use(notFound);
    app.use(errorHandler);

    try {
        await connectMongoDB();
    } catch (error) {    
        console.error("MongoDB Bağlantısı Başarısız:", error.message);
    }    

    app.listen(port, () => {
        console.log(`MongoDB Servis is running on port ${port}`);
    });
};

module.exports = { startMongoDBServis };