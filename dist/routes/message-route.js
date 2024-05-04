"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message-controller");
const auth_1 = __importDefault(require("../middleware/auth"));
const routes = (0, express_1.Router)();
routes.post('/send-message', auth_1.default, message_controller_1.create);
routes.get('/read-message/:messageId', auth_1.default, message_controller_1.setRead);
routes.get('/:userId', auth_1.default, message_controller_1.fetchUserMessages);
routes.get('/single/:messageId', auth_1.default, message_controller_1.single);
exports.default = routes;
