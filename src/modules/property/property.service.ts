
import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { IPropertyQuery } from "./property.interface";

const getAllPropertiesFromDB = async (query: IPropertyQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";

  const andConditions: Prisma.PropertyWhereInput[] = [];
  console.log("Query:",query)

  // Search
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          location: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // Location Filter
if (query.location) {
  andConditions.push({
    location: {
      contains: String(query.location),
      mode: "insensitive",
    },
  });
}


  // Price Filter
  if (query.minPrice || query.maxPrice) {
    andConditions.push({
      price: {
        gte: query.minPrice ? Number(query.minPrice) : undefined,
        lte: query.maxPrice ? Number(query.maxPrice) : undefined,
      },
    });
  }

if (query.price) {
  andConditions.push({
    price: {
      lte: Number(query.price),
    },
  });
}

  // Status Filter
  if (query.status) {
    andConditions.push({
      status: query.status as any,
    });
  }

  const properties = await prisma.property.findMany({
    where: {
      AND: andConditions,
    },

    take: limit,
    skip,

    orderBy: {
      [sortBy]: sortOrder,
    },

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

  return properties;
};

const getSinglePropertyFromDB = async (id: string) => {
  const property = await prisma.property.findUniqueOrThrow({
    where: { id },
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

  return property;
};

const getAllCategoriesFromDB = async () => {
  return prisma.category.findMany();
};

export const PropertyService = {
  getAllPropertiesFromDB,
  getSinglePropertyFromDB,
  getAllCategoriesFromDB
};