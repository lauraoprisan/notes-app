import express from "express";
const router = express.Router();
import { loginUser, signupUser, googleAuth } from '../controllers/userController.js';
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/google', googleAuth);
export default router;
//# sourceMappingURL=authRoutes.js.map