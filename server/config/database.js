const mongoose = require('mongoose');
require("dotenv").config();

// const url = `mongodb+srv://pranab90:pranab90783@cluster0.0opmf0k.mongodb.net/`;
// const url1 = `mongodb://127.0.0.1:27017/TodoDB`;
const MONGO_URI = process.env.MONGO_URI;
const connectDatabase = async (req, res) => {
    try {
        await mongoose
            .connect(MONGO_URI)
            .then(() => {
                console.log("Database Connected!!");
            });
    } catch (error) {
        console.error("Database Connection Failed");
    }
};
connectDatabase();