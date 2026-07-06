import { Router } from "express";
import { CategoryController } from "./category.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

// Public
router.get("/", CategoryController.getAllCategories);

// Admin
router.post(
  "/",
  auth("ADMIN"),
  CategoryController.createCategory
);

export const CategoryRoutes = router;