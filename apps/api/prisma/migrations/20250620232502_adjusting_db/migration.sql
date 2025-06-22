/*
  Warnings:

  - You are about to drop the column `class_id` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the `classes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,group_id]` on the table `enrollments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `group_id` to the `enrollments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'INSTRUTOR';
ALTER TYPE "Role" ADD VALUE 'RECEPCAO';
ALTER TYPE "Role" ADD VALUE 'ALUNO';
ALTER TYPE "Role" ADD VALUE 'RESPONSAVEL';
ALTER TYPE "Role" ADD VALUE 'LEAD';

-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_academy_id_fkey";

-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_class_id_fkey";

-- DropIndex
DROP INDEX "enrollments_user_id_class_id_key";

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "class_id",
ADD COLUMN     "group_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "classes";

-- CreateTable
CREATE TABLE "training_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "academy_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "training_groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "training_groups_slug_key" ON "training_groups"("slug");

-- CreateIndex
CREATE INDEX "training_groups_owner_id_idx" ON "training_groups"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_user_id_group_id_key" ON "enrollments"("user_id", "group_id");

-- AddForeignKey
ALTER TABLE "training_groups" ADD CONSTRAINT "training_groups_academy_id_fkey" FOREIGN KEY ("academy_id") REFERENCES "academies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_groups" ADD CONSTRAINT "training_groups_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "training_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
