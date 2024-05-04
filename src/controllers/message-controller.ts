import {Handler, Request, Response} from 'express';
import Messages from "../models/Messages";
import User from "../models/Users";
import mongoose from "mongoose";

export const create = async (req: Request, res: Response) => {

    try {

        const {subject, content, userId} = req.body;

        let message = new Messages({
            subject,
            content,
            user: userId
        })

        message = await message.save();

        return res.status(201).json({
            message: 'Message saved successfully',
            status: 'Success',
            data: message
        })


    } catch (e: any) {
        console.log('Error creating message');
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        })
    }

}

export const setRead = async (req: Request, res: Response) => {
    try {
        const {messageId} = req.params;

        let message = await Messages.findByIdAndUpdate(
            messageId,
            {is_read: true}
        );

        if (message) {
            return res.status(200).json({
                message: 'Message read successfully',
                status: 'success',
                data: message,
            })
        }


    } catch (e: any) {
        console.log('Error setting a read flag<>', e);

        return res.status(500).json({
            message: e,
            status: 'error',
            error: e
        })

    }
}

export const fetchUserMessages: Handler = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;

        let messages = await Messages.find({user: new mongoose.Types.ObjectId(userId)})
            .sort({updatedAt: -1, createdAt: -1})
            .populate('user')
            .exec();

        let user = await User.findById(userId)

        const data = [];
        for (let message of messages) {
            const userMessages = {
                subject: message?.subject,
                content: message?.content,
                is_read: message?.is_read,
                time_received: message?.time_received,
                _id: message?._id
            };
            data.push(userMessages);

        }

        const response = {
            messages: [...data],
            user
        }

        return res.status(200).json({
            message: 'Messages fetched successfully',
            status: 'success',
            data: response
        });


    } catch (e: any) {
        console.log('Error fetching user messages<>', e);
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        })
    }

}

export const single: Handler = async (req: Request, res: Response) => {

    try {
        const {messageId} = req.params;
        let message = await Messages.findById(messageId);

        return res.status(200).json({
            message: 'Message retrieved successfully',
            data: message,
            status: 'success'
        })

    } catch (e: any) {
        console.log("Error fetching message<>", e);
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        })
    }

}