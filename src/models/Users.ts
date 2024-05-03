import mongoose from 'mongoose';
import {UserTypes} from "../utils/types/UserTypes";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

const UserModel =  mongoose.model('User', userSchema);

export default UserModel;