import mongoose from 'mongoose';
require('dotenv').config();

const { DB_URL } = process.env;

mongoose
    .connect(DB_URL as string)
    .then(() => {
        console.log("database successfully connected");
    })
    .catch((err) => {
        console.log("database connection failed",err);
    });
