import mongoose, {ConnectOptions} from 'mongoose';
require('dotenv').config();

const { DB_URL } = process.env;

mongoose
    .connect(String(DB_URL))
    .then(() => {
        console.log("database successfully connected");
    })
    .catch((err) => {
        console.log("database connection failed",err);
    });
