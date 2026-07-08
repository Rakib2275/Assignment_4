import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";


const createPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.createPaymentIntoDB(
    req.body.rentalRequestId,
    req.user!.id
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Payment session created successfully",
    data: result,
  });
});

const confirmPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.confirmPaymentIntoDB(
    req.body.sessionId
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment confirmed successfully",
    data: result,
  });
});

const getMyPayments = catchAsync(async (req, res) => {
  const result = await PaymentService.getMyPaymentsFromDB(req.user!.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment history retrieved successfully",
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req, res) => {
  const result = await PaymentService.getSinglePaymentFromDB(
    req.params.id as string,
    req.user!.id
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment details retrieved successfully",
    data: result,
  });
});


export const PaymentController = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getSinglePayment,
};