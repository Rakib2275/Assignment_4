import { prisma } from "../../lib/prisma";
import { ICreateProperty } from "./landlordProperty.interface";

const createPropertyIntoDB = async (
  payload: ICreateProperty,
  landlordId: string
) => {
  const property = await prisma.property.create({
    data: {
      ...payload,
      landlordId,
    },
    include: {
      landlord: {
        omit: {
          password: true,
        },
      },
      category: true,
    },
  });

  return property;
};

export const LandlordPropertyService = {
    createPropertyIntoDB
}
