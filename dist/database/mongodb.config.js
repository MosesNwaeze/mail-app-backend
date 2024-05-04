"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const { DB_URL } = process.env;
mongoose_1.default
    .connect(String(DB_URL))
    .then(() => {
    console.log("database successfully connected");
})
    .catch((err) => {
    console.log("database connection failed", err);
});
