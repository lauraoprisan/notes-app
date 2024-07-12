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
        message: "Login successful",
        email,
        username,
        token,
        _id
    });

  } catch (error) {
        if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        } else {
        res.status(400).json({ error: 'An unknown error occurred' });
    }
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
        message: "Signin successful",
        email,
        username,
        token,
        _id
    });

  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

export { signupUser, loginUser };