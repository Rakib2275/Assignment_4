import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { LandlordPropertyController } from "./landlordProperty.controller";


const router = Router();

router.post("/properties",auth(Role.LANDLORD),LandlordPropertyController.createProperty
);
router.put("/properties/:id",auth(Role.LANDLORD),
    LandlordPropertyController.updateProperty
)

router.delete("/properties/:id",auth(Role.LANDLORD),
  LandlordPropertyController.deleteProperty
);

router.patch("/requests/:id",LandlordPropertyController.updateRentalRequestStatus)

export const LandlordPropertyRoutes = router;