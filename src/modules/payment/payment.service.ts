import { PaymentStatus, RentalStatus } from "../../../generated/prisma/enums";
import config from "../../config/index";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

const createPaymentIntoDB = async (rentalRequestId: string,tenantId: string) => {
    // console.log("Rental Id:",rentalRequestId)
  const rental = await prisma.rentalRequest.findUniqueOrThrow({
    where: {
      id: rentalRequestId,
    },
    include: {
      payment: true,
    },
  });

  if (rental.tenantId !== tenantId) {
    throw new Error("Unauthorized");
  }

  if (rental.status !== "APPROVED") {
    throw new Error("Rental request is not approved.");
  }

  if (rental.payment) {
    throw new Error("Payment already completed.");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "usd",

          product_data: {
            name: "RentNest Property Rent",
          },

          unit_amount: Math.round(rental.totalAmount * 100),
        },

        quantity: 1,
      },
    ],

    success_url: `${config.app_url}/payment-success`,
    cancel_url: `${config.app_url}/payment-cancel`,

    metadata: {
      rentalRequestId: rental.id,
    },
  });

  await prisma.payment.create({
    data: {
      rentalRequestId: rental.id,
      transactionId: session.id,
      amount: rental.totalAmount,
      provider: "STRIPE",
      status: "PENDING",
    },
  });

  return {
    paymentUrl: session.url,
    sessionId : session.id
  };
};


const confirmPaymentIntoDB = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw new Error("Payment not completed");
  }

  const payment = await prisma.payment.update({
    where: {
      transactionId: session.id,
    },
    data: {
      status: PaymentStatus.PAID,
      paidAt: new Date(),
    },
  });

  await prisma.rentalRequest.update({
    where: {
      id: payment.rentalRequestId,
    },
    data: {
      status: RentalStatus.COMPLETED,
    },
  });

  return payment;
};

const getMyPaymentsFromDB = async (tenantId: string) => {
  const payments = await prisma.payment.findMany({
    where: {
      rentalRequest: {
        tenantId,
      },
    },
    include: {
      rentalRequest: {
        include: {
          property: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return payments;
};

const getSinglePaymentFromDB = async (
  paymentId: string,
  tenantId: string
) => {
  const payment = await prisma.payment.findFirstOrThrow({
    where: {
      id: paymentId,
      rentalRequest: {
        tenantId,
      },
    },
    include: {
      rentalRequest: {
        include: {
          property: true,
        },
      },
    },
  });

  return payment;
};

export const PaymentService = {
  createPaymentIntoDB,
  confirmPaymentIntoDB,
  getMyPaymentsFromDB,
  getSinglePaymentFromDB,
};