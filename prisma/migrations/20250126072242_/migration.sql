-- AlterTable
ALTER TABLE `page` ADD COLUMN `description` LONGTEXT NULL,
    ADD COLUMN `isPremium` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `theme` VARCHAR(191) NULL;
