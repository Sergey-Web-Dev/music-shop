/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "isAvailable",
ADD COLUMN     "available" INTEGER;
