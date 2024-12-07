const express = require("express");
const dotenv = require("dotenv");
const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");
const notFound = require("../middleware/notFound");
const mssqlDBRoutes = require("../routes/mssqlDBRoutes");

dotenv.config();

const startMssqlDBServis = async (port) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(logger);
    app.use("/products", mssqlDBRoutes.routes);

    app.use(notFound);
    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`MssqlDB Servis is running on port ${port}`);
    });
}

module.exports = {startMssqlDBServis}