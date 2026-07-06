import { Router } from "express";
import { RentalController } from "./rental.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(Role.TENANT),
  RentalController.createRentalRequest
);

router.get(
  "/",
  auth(Role.TENANT),
  RentalController.getMyRentalRequests
);

router.get(
  "/:id",
  auth(Role.TENANT),
  RentalController.getSingleRentalRequest
);

export const RentalRoutes = router;