import express from 'express';
import { body } from 'express-validator';

import userController from '../controllers/user.controller.js';
import {verifyAuth} from '../middlewares/verifyAuth.js';

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 6 characters long')
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

//secured routes
// router.get('/profile', authMiddleware.authUser, userController.getUserProfile)

router.get('/logout',verifyAuth, userController.logoutUser)



export default  router; 