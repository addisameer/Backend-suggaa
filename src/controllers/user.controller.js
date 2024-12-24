import {User} from '../models/user.model.js';
import userService from '../services/user.service.js';

import { validationResult } from 'express-validator';
import {BlacklistToken} from '../models/blackListToken.model.js';
import {ApiError} from  "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from  "../utils/asyncHandler.js"

const generateAccessAndRefreshToken = (user) => {
    const accessToken =  user.generateAccessToken();
    const refreshToken =  user.generateRefreshToken();
    user.refreshToken = refreshToken;
    return {accessToken , refreshToken};
}

const registerUser = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);    
    if (!errors.isEmpty()) {
         throw new ApiError(401 , "Please fill all the field correctly")
    }
    const { fullName, email, password } = req.body;
    const isUserAlready = await User.findOne({ email });
    if (isUserAlready) {
        throw new ApiError(401 , "User already registered . ")
    }
    const user =await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password,
    })
    const createdUser = await User.findById(user._id).select("--password")
    res.status(201).json(new ApiResponse(201 , createdUser , "user registered successfully"))
})

const loginUser =asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new ApiError(401 , "Please fill all the field correctly")
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(401 , "Invalid username and password")
    }
    const isMatch = await user.comparePassword(password);    
    if (!isMatch){
        throw new ApiError(401 , "Incorrect password")
    }
    const {accessToken , refreshToken} =  generateAccessAndRefreshToken(user)
    const loggedInUser = await  User.findById(user._id).select("--password") 
    console.log(user);
    console.log(loggedInUser);
    res.cookie('accessToken', accessToken);
    res.cookie("refreshToken" , refreshToken);
    res.status(200).json(new ApiResponse(200,loggedInUser ,"Logged in successfully"))      
})

const getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user);

}

const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });
}

const userController =  {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
}

export default userController