import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/register",userController.createUser)

router.get("/me",auth(Role.LANDLORD,Role.TENANT),userController.getMyProfile);

router.put("/my-profile",auth(Role.LANDLORD,Role.TENANT),userController.updateMyProfile)

export const userRouter = router