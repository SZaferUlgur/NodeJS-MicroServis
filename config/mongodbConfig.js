const mongoose = require("mongoose");
require("dotenv").config();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error("MongoDB Bağlantısı Başarısız:", error.message);
    }
};

module.exports = connectMongoDB;