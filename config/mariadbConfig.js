const mariadb = require("mariadb");
require("dotenv").config();

const mariadbPool = mariadb.createPool({
    host: process.env.HOSTNAME,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10,
    port: process.env.MARIADB_PORT,
});
 
const connectMariaDB = async () => {
    try {
        const connection = await mariadbPool.getConnection();
        console.log("MariaDB Bağlantısı Başarılı..");
        return connection;
    } catch (error) {
        console.error("Mariadb Bağlantısı Başarısız:", error.message);
    }
};

module.exports = connectMariaDB;