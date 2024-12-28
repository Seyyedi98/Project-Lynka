-- CreateTable
CREATE TABLE `Page` (
    `uri` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `owner` VARCHAR(191) NULL,
    `content` LONGTEXT NOT NULL,
    `visits` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Page_uri_key`(`uri`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_owner_fkey` FOREIGN KEY (`owner`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
