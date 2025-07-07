/*
  Warnings:

  - You are about to drop the column `user_id` on the `academies` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `classes` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `academies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "academies" DROP CONSTRAINT "academies_user_id_fkey";

-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_user_id_fkey";

-- AlterTable
ALTER TABLE "academies" DROP COLUMN "user_id",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "classes" DROP COLUMN "user_id",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "academies" ADD CONSTRAINT "academies_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
