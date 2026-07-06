import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { LandlordPropertyService } from "./landlordProperty.service";

const createProperty = catchAsync(async (req, res) => {
  const result = await LandlordPropertyService.createPropertyIntoDB(
    req.body,
    req.user!.id
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Property created successfully",
    data: result,
  });
});

export const LandlordPropertyController = {
    createProperty
};