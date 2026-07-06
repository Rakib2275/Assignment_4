import express from "express";
import { PropertyController } from "./property.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = express.Router();

router.get(
  "/",
  auth(Role.LANDLORD),
  PropertyController.getAllProperties
);
router.get("/:id",PropertyController.getSingleProperty);
router.get("/categories",PropertyController.getAllCategories)

export const PropertyRoutes = router;