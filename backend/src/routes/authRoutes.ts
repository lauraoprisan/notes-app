import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

import {
    loginUser,
    signupUser,
    googleAuth
} from '../controllers/userController.js'


router.post('/login', loginUser)
router.post('/signup', signupUser)
router.post('/google', googleAuth)

export default router;
