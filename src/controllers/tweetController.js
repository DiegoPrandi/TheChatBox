const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const loginController = require("./loginController");

// LOGICA PARA OBTER ID DO USUARIO LOGADO NA SESSÃO
const getUserFromSession = async (userId) => {
  if (!userId) return null;

  try {
    const usuario = await prisma.chatBox_User.findUnique({
      where: { idUser: userId },
    });
    return usuario;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao obter usuário da sessão");
  }
};

// PAGINA TWEETAR
exports.tweetar = async (req, res) => {
  try {
    const usuario = await getUserFromSession(req.session.userId);
    res.render("tweetar", { usuario });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
};

// TWEETAR
exports.tweetarPOST = async (req, res) => {
  const { text_Tweet } = req.body;
  const userId = req.session.userId;

  try {
    const novoTweet = await prisma.chatBox_Tweet.create({
      data: {
        texto_Tweet: text_Tweet,
        user: { connect: { idUser: userId } },
      },
      include: {
        user: true, // incluir usuario pois nao estava conseguindo pega o id
      },
    });

    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro interno do servidor");
  }
};
