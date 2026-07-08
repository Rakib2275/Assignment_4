import { RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateRentalRequest } from "./rental.interface";

const createRentalRequestIntoDB = async (
  payload: ICreateRentalRequest,
  tenantId: string
) => {
  const rentalRequest = await prisma.rentalRequest.create({
    data: {
    tenantId,
    propertyId: payload.propertyId,
    message: payload.message,
    moveInDate: payload.moveInDate,
    durationMonth: payload.durationMonth,
    totalAmount: payload.totalAmount,
  },
    include: {
      tenant: {
        omit: {
          password: true,
        },
      },
      property: true,
    },
  });

  return rentalRequest;
};

const getMyRentalRequestsFromDB = async (tenantId: string) => {
  return await prisma.rentalRequest.findMany({
    where: {
      tenantId,
    },
    include: {
      property: true,
      payment: true,
    },
  });
};

const getSingleRentalRequestFromDB = async (id: string) => {
  return await prisma.rentalRequest.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      tenant: {
        omit: {
          password: true,
        },
      },
      property: true,
      payment: true,
    },
  });
};



export const RentalService = {
  createRentalRequestIntoDB,
  getMyRentalRequestsFromDB,
  getSingleRentalRequestFromDB,
};