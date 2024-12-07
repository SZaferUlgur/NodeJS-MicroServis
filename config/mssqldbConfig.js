const sql = require("mssql");
require("dotenv").config();

const mssqlConfig = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.HOSTNAME,
    database: process.env.DATABASE,
    port: parseInt(process.env.PORT_MSSQL, 10) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

const connectMSSQL = async () => {
    try {
        const connection = await sql.connect(mssqlConfig);
        console.log("MSSQL Bağlantısı Başarılı..");
        return connection;
    } catch (error) {
        console.error("MSSQL Bağlantısı Başarısız:", error.message);
    }
};

module.exports = connectMSSQL;