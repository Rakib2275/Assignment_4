import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await AdminService.getAllUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const result = await AdminService.updateUserStatusIntoDB(
    req.params.id as string,
    req.body.status
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User status updated successfully",
    data: result,
  });
});

const getAllProperties = catchAsync(async (req, res) => {
  const result = await AdminService.getAllPropertiesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Properties retrieved successfully",
    data: result,
  });
});

const getAllRentals = catchAsync(async (req, res) => {
  const result = await AdminService.getAllRentalsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Rental requests retrieved successfully",
    data: result,
  });
});

export const AdminController = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentals,
};