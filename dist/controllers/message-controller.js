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
exports.single = exports.fetchUserMessages = exports.setRead = exports.create = void 0;
const Messages_1 = __importDefault(require("../models/Messages"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject, content, userId } = req.body;
        let message = new Messages_1.default({
            subject,
            content,
            user: userId
        });
        message = yield message.save();
        return res.status(201).json({
            message: 'Message saved successfully',
            status: 'Success',
            data: message
        });
    }
    catch (e) {
        console.log('Error creating message');
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        });
    }
});
exports.create = create;
const setRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { messageId } = req.params;
        let message = yield Messages_1.default.findByIdAndUpdate(messageId, { is_read: true });
        if (message) {
            return res.status(200).json({
                message: 'Message read successfully',
                status: 'success',
                data: message,
            });
        }
    }
    catch (e) {
        console.log('Error setting a read flag<>', e);
        return res.status(500).json({
            message: e,
            status: 'error',
            error: e
        });
    }
});
exports.setRead = setRead;
const fetchUserMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        let messages = yield Messages_1.default.find({ user: new mongoose_1.default.Types.ObjectId(userId) })
            .sort({ updatedAt: -1, createdAt: -1 })
            .populate('user')
            .exec();
        const data = [];
        let user = {};
        for (let message of messages) {
            const userMessages = {
                subject: message === null || message === void 0 ? void 0 : message.subject,
                content: message === null || message === void 0 ? void 0 : message.content,
                is_read: message === null || message === void 0 ? void 0 : message.is_read,
                time_received: message === null || message === void 0 ? void 0 : message.time_received,
                _id: message === null || message === void 0 ? void 0 : message._id
            };
            user = message === null || message === void 0 ? void 0 : message.user;
            data.push(userMessages);
        }
        const response = {
            messages: [...data],
            user: user
        };
        return res.status(200).json({
            message: 'Messages fetched successfully',
            status: 'success',
            data: response
        });
    }
    catch (e) {
        console.log('Error fetching user messages<>', e);
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        });
    }
});
exports.fetchUserMessages = fetchUserMessages;
const single = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { messageId } = req.params;
        let message = yield Messages_1.default.findById(messageId);
        return res.status(200).json({
            message: 'Message retrieved successfully',
            data: message,
            status: 'success'
        });
    }
    catch (e) {
        console.log("Error fetching message<>", e);
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        });
    }
});
exports.single = single;
