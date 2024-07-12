import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

import {
    loginUser,
    signupUser
} from '../controllers/userController.js'


router.post('/login', loginUser)
router.post('/signup', signupUser)

export default router;
