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

const updateProperty = catchAsync(async (req, res) => {
  const result = await LandlordPropertyService.updatePropertyIntoDB(
    req.params.id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Property updated successfully",
    data: result,
  });
});


const deleteProperty = catchAsync(async (req, res) => {
  const result = await LandlordPropertyService.deletePropertyFromDB(
    req.params.id as string
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Property deleted successfully",
    data: result,
  });
});

export const LandlordPropertyController = {
    createProperty,
    updateProperty,
    deleteProperty
};