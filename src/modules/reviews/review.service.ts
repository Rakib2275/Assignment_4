import { RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateReview } from "./review.interface";

const createReviewIntoDB = async (
  payload: ICreateReview,
  tenantId: string) => {
  // Check completed rental
  const rental = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
      status: RentalStatus.COMPLETED,
    },
  });

  if (!rental) {
    throw new Error(
      "You can review only after completing the rental."
    );
  }

  // Prevent duplicate review
  const existingReview = await prisma.review.findFirst({
    where: {
      propertyId: payload.propertyId,
      tenantId,
    },
  });

  if (existingReview) {
    throw new Error("You already reviewed this property.");
  }

  const review = await prisma.review.create({
    data: {
      tenantId,
      propertyId: payload.propertyId,
      rating: payload.rating,
      comment: payload.comment,
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

  return review;
};

export const ReviewService = {
  createReviewIntoDB,
};