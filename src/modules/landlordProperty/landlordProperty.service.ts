import { RentalStatus } from "../../../generated/prisma/enums";
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

const updatePropertyIntoDB = async(id:string,payload:any)=>{
  const updateProperty = await prisma.property.update({
    where: {id},
    data: payload,
    include:{
      landlord : {
        omit: {
          password : true
        }
      }
    }
  })
  return updateProperty
}

const deletePropertyFromDB = async(id:string) =>{
  const deletedProperty = await prisma.property.delete({
    where : {
      id
    }
  })
  return deletedProperty
}

const updateRentalRequestStatusIntoDB = async (
  id: string,
  status: RentalStatus
) => {
  return prisma.rentalRequest.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

export const LandlordPropertyService = {
    createPropertyIntoDB,
    updatePropertyIntoDB,
    deletePropertyFromDB,
    updateRentalRequestStatusIntoDB
}
