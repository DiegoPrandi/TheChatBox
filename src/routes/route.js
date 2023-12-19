const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET
router.get("/home", async (req, res) => {
  try {
    let usuario = null;

    if (req.session.userId) {
      // se há uma sessão de usuário, procure o usuário no banco de dados
      usuario = await prisma.chatBox_User.findUnique({
        where: {
          idUser: req.session.userId,
        },
        select: {
          nome_User: true,
          apelido_User: true,
        },
      });
    }

    res.render("home", { usuario });
    console.log(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
});

router.get("/login", controller.login);
router.get("/cadastro", controller.cadastro);
router.get("/tweetar", (req, res) => {
  const usuario = req.session.userId ? { nome_User: "Usuário" } : null;
  // passar o idUser para o /tweetar
  res.render("tweetar", { usuario });
});

// POST
router.post("/cadastro", controller.cadastroPOST);
router.post("/login", controller.loginPOST);
router.post("/tweetar", controller.tweetarPOST);

module.exports = router;
