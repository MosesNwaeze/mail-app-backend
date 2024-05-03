import mongoose from "mongoose";
import {MessageTypes} from "./MessageTypes";

export interface UserTypes {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    message?: MessageTypes;
}