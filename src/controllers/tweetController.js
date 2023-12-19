const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
