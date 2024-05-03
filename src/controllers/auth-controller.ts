import {Handler, Request, Response} from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import UserModel from '../models/Users';

dotenv.config();

export const login: Handler = async (req: Request, res: Response) => {

    try {

        const {email, password} = req.body;

        let user = await UserModel.findOne({ email: email});


        if (user) {
            const isValid = await bcrypt.compare(password, String(user.password) );

            if (isValid) {
                const privateKey = process.env.JWT_SECRETE as string;
                 const token = jwt.sign({email: String(user.email)}, privateKey, {expiresIn:'24h'})

                if (token) {
                    return res.status(200).json({
                        message: 'Login successful',
                        status: 'success',
                        data: user,
                        token
                    })
                }

                return res.status(500).json({
                    message: 'Login failed',
                    status: 'error',
                })

            }

            return res.status(401).json({
                message: 'User not authorized',
                status: 'error'
            })

        }

       return res.status(404).json({
           message: 'User not found',
           status: 'error',
       })

    }catch (e: any) {
        console.log('Error logging user', e);
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        })
    }

}

export const signup:Handler =async  (req: Request, res: Response) => {

    try {

        const {first_name,last_name,email,password} = req.body
        const salt = 10

        const hashPassword = await bcrypt.hash(password, salt)

        let user = new UserModel({
            first_name,
            last_name,
            email,
            password: hashPassword,
        })

        user = await user.save();

        const privateKey = process.env.JWT_SECRETE as string;
        const token = jwt.sign({email: String(user.email)}, privateKey, {expiresIn:'24h'})


        if(user){
            return res.status(201).json({
                message: 'Registration successful',
                data: user,
                status: 'success',
                token
            })
        }

        return res.status(500).json({
            message: 'Registration failed',
            status: 'error'
        })

    }catch (e: any) {
        console.log('Error registering user', e);
        return res.status(500).json({
            message: e.message,
            status: 'error',
            error: e
        })
    }


}

