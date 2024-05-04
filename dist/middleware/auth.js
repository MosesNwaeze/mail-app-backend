"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const Users_1 = __importDefault(require("../models/Users"));
(0, dotenv_1.config)();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log(token, "token<>");
        const JWT_KEY = process.env.JWT_SECRETE;
        const decodedToken = jsonwebtoken_1.default.verify(token, JWT_KEY);
        const savedEmail = decodedToken.email;
        let savedUser = yield Users_1.default.findOne({ email: savedEmail });
        if (savedUser) {
            return next();
        }
        return res.status(403).json({
            message: 'Unauthorized access',
            status: 'error'
        });
    }
    catch (e) {
        console.log('Error verifying token<>', e);
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        });
    }
});
exports.default = auth;
