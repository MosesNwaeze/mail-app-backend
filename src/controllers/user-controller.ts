import {Request, Response, Handler} from 'express';
import Users from '../models/Users'

export const users: Handler = async (req: Request, res: Response) => {

    try{

        let users = await Users
            .find()
            .sort({createdAt: -1, updatedAt: -1})
            .exec();

        return res.status(200).json({
            message: 'Users retrieved successfully',
            status: 'success',
            data: users
        })

    }catch (e: any) {
        console.log('Error fetching users<>', e);
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        })
    }

}

export const user = async (req: Request, res: Response) => {

    try{

        const {userId} = req.params;

        let user = await Users.findById(userId);

        return res.status(200).json({
            message: 'User retrieved successfully',
            status: 'success',
            data: user
        })

    }catch (e: any) {
        console.log('Error fetching user<>', e);
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        })
    }
}