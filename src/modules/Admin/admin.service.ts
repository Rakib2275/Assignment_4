import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
  return prisma.user.findMany({
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });
};

const updateUserStatusIntoDB = async (
  id: string,
  status: UserStatus
) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      status,
    },
    omit: {
      password: true,
    },
  });
};

const getAllPropertiesFromDB = async () => {
  return prisma.property.findMany({
    include: {
      landlord: {
        omit: {
          password: true,
        },
      },
      category: true,
      reviews: true,
    },
  });
};

const getAllRentalsFromDB = async () => {
  return prisma.rentalRequest.findMany({
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

export const AdminService = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
  getAllPropertiesFromDB,
  getAllRentalsFromDB,
};