import { Router } from "express";
import { authController } from "./auth.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/login",authController.loginUser);
router.post("/register",authController.createUser)

router.get("/me",auth(Role.LANDLORD,Role.TENANT),authController.getMyProfile);



export const authRouters = router;