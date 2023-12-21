CREATE TABLE chatBox_User (
    idUser INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome_User VARCHAR(50) NOT NULL,
    apelido_User VARCHAR(20) NOT NULL,
    email_User VARCHAR(50) NOT NULL,
    senha_User VARCHAR(12) NOT NULL,
    biografia  VARCHAR(255) NULL,
    foto_perfil VARCHAR(255) NULL
);

CREATE TABLE chatBox_Tweet (
    idTweet INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    texto_Tweet VARCHAR(255) NOT NULL,
    foto_Tweet VARCHAR(255),
    video_Tweet VARCHAR(255),
    curtidas_Tweet INT DEFAULT 0,
    idUser INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES chatBox_User(idUser)
);
