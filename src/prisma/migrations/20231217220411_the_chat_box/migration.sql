-- CreateTable
CREATE TABLE `chatBox_User` (
    `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_User` VARCHAR(191) NOT NULL,
    `apelido_User` VARCHAR(191) NOT NULL,
    `email_User` VARCHAR(191) NOT NULL,
    `senha_User` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chatBox_Tweet` (
    `idTweet` INTEGER NOT NULL AUTO_INCREMENT,
    `texto_Tweet` VARCHAR(191) NOT NULL,
    `foto_Tweet` VARCHAR(191) NULL,
    `video_Tweet` VARCHAR(191) NULL,
    `curtidas_Tweet` INTEGER NOT NULL DEFAULT 0,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`idTweet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chatBox_Tweet` ADD CONSTRAINT `chatBox_Tweet_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `chatBox_User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;
