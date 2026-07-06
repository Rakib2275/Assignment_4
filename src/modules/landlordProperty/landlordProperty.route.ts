import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { LandlordPropertyController } from "./landlordProperty.controller";


const router = Router();

router.post("/properties",auth(Role.LANDLORD),LandlordPropertyController.createProperty
);

export const LandlordPropertyRoutes = router;