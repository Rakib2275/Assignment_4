import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { ReviewController } from "./review.controller";


const router = Router();

router.post("/",auth(Role.TENANT),ReviewController.createReview)

export const ReviewRoutes = router;