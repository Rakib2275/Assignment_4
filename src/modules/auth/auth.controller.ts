import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { register } from "node:module";

const loginUser = catchAsync(async(req: Request,res: Response, next: NextFunction) =>{
    const payload = req.body;

    const {accessToken,refreshToken} = await authService.loginUser(payload);

    res.cookie("accessToken",accessToken,{
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 //24 hour
    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7 //7 day
    })


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "User login successfully",
        data: {accessToken,refreshToken}
    })
})

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await authService.createUserIntoDB(payload);

    // res.status(httpStatus.CREATED).json({
    //   success: true,
    //   statusCode: httpStatus.CREATED,
    //   message: "User registered successfully",
    //   data: {
    //     user,
    //   },
    // });
    sendResponse(res,{
        success:true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {user}
    })
  },
);

// const createUser = async (req: Request,res: Response) =>{
//     try {
//         const payload = req.body;

//     const user = await userService.createUserIntoDB(payload)

//     res.status(httpStatus.CREATED).json({
//         success : true,
//         statusCode: httpStatus.CREATED,
//         message: "User registered successfully",
//         data:{
//             user
//         }
//     })
//     } catch (error) {
//         console.log(error);
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//             message: "Failed to register user",
//             error: (error as Error).message
//         })
//     }
// }


const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    // const {accessToken} = req.cookies;
    console.log(req.user,"user request")

    // const verifiedToken = jwtUtils.verifyToken(accessToken,config.jwt_access_secret)
    
    // if(typeof verifiedToken === "string"){
    //   throw new Error(verifiedToken)
    // }

    const profile = await authService.getMyProfileFromDB(req.user?.id as string)
    


    sendResponse(res,{
        success:true,
        statusCode: httpStatus.CREATED,
        message: "User Profile Show Successfully",
        data: {profile}
    })
  },
);


export const authController = {
    createUser,
    loginUser,
    getMyProfile
    
}