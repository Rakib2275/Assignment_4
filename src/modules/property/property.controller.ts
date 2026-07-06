import { Request, Response } from "express";
import { PropertyService } from "./property.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await PropertyService.getAllPropertiesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Properties retrieved successfully",
    data: result,
  });
});


const getSingleProperty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await PropertyService.getSinglePropertyFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Property retrieved successfully",
    data: result,
  });
});


const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await PropertyService.getAllCategoriesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Categories retrieved successfully",
    data: result,
  });
});

export const PropertyController = {
  getAllProperties,
  getSingleProperty,
  getAllCategories
};