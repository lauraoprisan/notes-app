import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../models/UserModel.js';

const createToken = (_id: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const { username, _id } = user;

    // create a token
    const token = createToken(_id as string);

    res.status(200).json({
        email,
        username,
        token,
        _id
    });

  } catch (error: any) {
      res.status(400).json({error: error.message})
  }
};

// signup a user
const signupUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username } = req.body;

  try {
    const user = await User.signup(email, password, username);
    const { _id } = user;

    // create a token
    const token = createToken(_id as string);

    res.status(200).json({
        email,
        username,
        token,
        _id
    });

  } catch (error: any) {
    res.status(400).json({error: error.message})
}
};

export { signupUser, loginUser };