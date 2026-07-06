/*
  Warnings:

  - Added the required column `message` to the `RentalRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RentalRequest" ADD COLUMN     "message" TEXT NOT NULL;
