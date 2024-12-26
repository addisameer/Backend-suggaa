import { asyncHandler } from "../utils/asyncHandler.js";




const verifyAuth = asyncHandler(async(req,res,next) => {
    console.log("In  verifyAuth");
    
    console.log(req.cookie);
    
    // const accessToken = req.cookies()
})

export  {verifyAuth}