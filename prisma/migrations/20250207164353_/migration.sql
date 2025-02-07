/*
  Warnings:

  - You are about to drop the column `description` on the `Page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Page` DROP COLUMN `description`,
    ADD COLUMN `favicon` LONGTEXT NULL,
    ADD COLUMN `loadingIcon` VARCHAR(191) NULL,
    ADD COLUMN `metaDescription` VARCHAR(191) NULL,
    ADD COLUMN `metaImage` LONGTEXT NULL,
    ADD COLUMN `metaTitle` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Page_title_idx` ON `Page`(`title`);
