"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const user_controller_1 = require("../controllers/user-controller");
const routes = (0, express_1.Router)();
routes.get('/', auth_1.default, user_controller_1.users);
exports.default = routes;
