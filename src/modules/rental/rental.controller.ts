import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { RentalService } from "./rental.service";

const createRentalRequest = catchAsync(async (req, res) => {
  const result = await RentalService.createRentalRequestIntoDB(
    req.body,
    req.user!.id
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Rental request submitted successfully",
    data: result,
  });
});

const getMyRentalRequests = catchAsync(async (req, res) => {
  const result = await RentalService.getMyRentalRequestsFromDB(req.user!.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Rental requests retrieved successfully",
    data: result,
  });
});

const getSingleRentalRequest = catchAsync(async (req, res) => {
  const result = await RentalService.getSingleRentalRequestFromDB(
    req.params.id as string
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Rental request retrieved successfully",
    data: result,
  });
});


export const RentalController = {
  createRentalRequest,
  getMyRentalRequests,
  getSingleRentalRequest,
};