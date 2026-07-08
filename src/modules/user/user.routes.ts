import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/register",userController.createUser)

router.get("/me",auth(Role.LANDLORD,Role.TENANT),userController.getMyProfile);

export const userRouter = router