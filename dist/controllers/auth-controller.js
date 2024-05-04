"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signup = exports.login = void 0;
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const Users_1 = __importDefault(require("../models/Users"));
dotenv_1.default.config();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield Users_1.default.findOne({ email: email });
        if (user) {
            const isValid = yield bcrypt.compare(password, String(user.password));
            if (isValid) {
                const privateKey = process.env.JWT_SECRETE;
                const token = jwt.sign({ email: String(user.email) }, privateKey, { expiresIn: '24h' });
                if (token) {
                    return res.status(200).json({
                        message: 'Login successful',
                        status: 'success',
                        data: user,
                        token
                    });
                }
                return res.status(500).json({
                    message: 'Login failed',
                    status: 'error',
                });
            }
            return res.status(401).json({
                message: 'User not authorized',
                status: 'error'
            });
        }
        return res.status(404).json({
            message: 'User not found',
            status: 'error',
        });
    }
    catch (e) {
        console.log('Error logging user', e);
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password } = req.body;
        const salt = 10;
        const hashPassword = yield bcrypt.hash(password, salt);
        let user = new Users_1.default({
            first_name,
            last_name,
            email,
            password: hashPassword,
        });
        user = yield user.save();
        const privateKey = process.env.JWT_SECRETE;
        const token = jwt.sign({ email: String(user.email) }, privateKey, { expiresIn: '24h' });
        if (user) {
            return res.status(201).json({
                message: 'Registration successful',
                data: user,
                status: 'success',
                token
            });
        }
        return res.status(500).json({
            message: 'Registration failed',
            status: 'error'
        });
    }
    catch (e) {
        console.log('Error registering user', e);
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        });
    }
});
exports.signup = signup;
