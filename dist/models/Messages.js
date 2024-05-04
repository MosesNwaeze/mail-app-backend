"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    subject: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    is_read: {
        type: Boolean,
        required: true,
        default: false
    },
    time_received: {
        type: String,
        default: new Date().toISOString()
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { autoCreate: true });
const messageModel = mongoose_1.default.model('Messages', messageSchema);
exports.default = messageModel;
