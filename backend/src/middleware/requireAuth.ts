import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { UserDocument } from '../models/UserModel.js'

interface MyJwtPayload extends JwtPayload {
    _id: string;
    // Add other fields from your JWT payload if necessary
}

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    //verify authentication
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const JWT_SECRET = process.env.JWT_SECRET as string
        const { _id } = jwt.verify(token, JWT_SECRET) as MyJwtPayload;
        req.user = await User.findOne({ _id }).select('_id') as UserDocument;

        // console.log("req.user from requireauth: ", req.user)

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error:'Request is not authorized'})
    }

}

export default requireAuth