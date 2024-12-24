import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const createUser = async ({firstName, lastName, email, password}) => {
    if (!firstName || !email || !password) {
       throw new ApiErrorError('All fields are required');
    } 
    const user =  await User.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    })
    return user;
}
const userService =  {
    createUser
}

export  default userService;

