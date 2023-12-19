/*
  Warnings:

  - Added the required column `biografia` to the `chatBox_User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chatBox_User` ADD COLUMN `biografia` VARCHAR(255) NOT NULL;
