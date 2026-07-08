import { Router } from "express";
import { CategoryController } from "./category.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// Public
router.get("/", CategoryController.getAllCategories);

// Admin
router.post(
  "/",
  auth(Role.ADMIN),
  CategoryController.createCategory
);

export const CategoryRoutes = router;