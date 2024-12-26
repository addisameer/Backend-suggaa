import dotenv from "dotenv"
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    fullName : {
        firstName: {
            type: String,
            required: true,
            minlength: [ 3, 'First name must be at least 3 characters long' ],
        },
        lastName: {
            type: String,
            minlength: [ 3, 'Last name must be at least 3 characters long' ],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [ 5, 'Email must be at least 5 characters long' ],
    },
    password: {
        type: String,
        required: true
    },
    refreshToken : {
        type : String,
    }
})
userSchema.methods.generateAccessToken = function () {
    const token  =  jwt.sign(
        {
          _id: this._id 
        },
        process.env.ACCESS_TOKEN_SECRET,
        { 
         expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    );
    return token;
}

userSchema.methods.generateRefreshToken = function () {
    const token  =  jwt.sign(
        {
          _id: this._id 
        },
        process.env.REFRESH_TOKEN_SECRET,
        { 
         expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    );
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
});                                                                                                                 

export const User= mongoose.model('User', userSchema);


