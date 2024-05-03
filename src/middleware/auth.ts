import {Request,NextFunction,RequestHandler, Response} from 'express'
import jwt,{JwtPayload} from "jsonwebtoken";
import {config} from 'dotenv';
import User from '../models/Users';

config();

const auth = async (req: Request, res: Response, next: NextFunction)=> {

    try {

        const token = req.headers.authorization?.split(" ")[1] as string;

        console.log(token, "token<>")

        const JWT_KEY = process.env.JWT_SECRETE as string;
        const decodedToken: any  = jwt.verify(token,JWT_KEY);

        const savedEmail = decodedToken.email;

        let savedUser = await User.findOne({email: savedEmail});

        if(savedUser){
            return next();
        }

        return res.status(403).json({
            message: 'Unauthorized access',
            status: 'error'
        })

    }catch (e: any) {
       console.log('Error verifying token<>', e)
       return res.status(500).json({
           message: e.message,
           status: 'error',
           error: e
       })
    }
}

export default auth;