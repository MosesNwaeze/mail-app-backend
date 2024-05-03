import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {autoCreate: true})

const messageModel = mongoose.model('Messages', messageSchema)

export default messageModel;