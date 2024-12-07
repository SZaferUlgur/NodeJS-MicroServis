const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createProxyMiddleware} = require("http-proxy-middleware");
const { startMariaDBService } = require("./services/MariaDBServis");
const { startMssqlDBServis } = require("./services/MssqlDBServis");
const { startMongoDBServis } = require("./services/MongoDBServis");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use("/api/maria", createProxyMiddleware({
    target: `http://localhost:${process.env.PORT_MARIADB || 5001}`,
    changeOrigin: true,
    logLevel: "debug",
    pathRewrite: {
        "^/api/maria": "/api/maria"
    }
}))

app.use("/api/mongo", createProxyMiddleware({
    target: `http://localhost:${process.env.PORT_MONGODB || 5002}`,
    changeOrigin: true,
    logLevel: "debug",
    pathRewrite: {
        "^/api/mongo": "/api/mongo"
    }
}))

app.use("/api/mssql", createProxyMiddleware({
    target: `http://localhost:${process.env.PORT_MSSQLDB || 5003}`,
    changeOrigin: true,
    logLevel: "debug",
    pathRewrite: {
        "^/api/mssql": "/api/mssql"
    }
}))

const startAllService = async () => {
    try {
        await startMariaDBService(process.env.PORT_MARIADB || 5001)
        await startMongoDBServis(process.env.PORT_MONGODB || 5002)
        await startMssqlDBServis(process.env.PORT_MSSQLDB || 5003)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

startAllService()

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});