const express = require("express");
const dotenv = require("dotenv");
const mariaDBRoutes = require("../routes/mariaDBRoutes");
const errorHandler = require("../middleware/errorHandler");
const notFound = require("../middleware/notFound");
const logger = require("../middleware/logger");

dotenv.config();

const startMariaDBService = async (port) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(logger);
  
  app.use("/products", mariaDBRoutes.routes);
  
  app.use(notFound);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`MariaDB ${port} Port Üzerinde Çalışmaktadır`);
  });
};

module.exports = { startMariaDBService };
