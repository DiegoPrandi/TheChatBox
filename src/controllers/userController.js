const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// PAGINA PERFIL DO USUARIO
exports.perfilUsuario = async (req, res) => {
  try {
    const tweetId = parseInt(req.params.userId, 10);

    // obter informações do tweet
    const tweet = await prisma.chatBox_Tweet.findUnique({
      where: { idTweet: tweetId },
      include: {
        user: true,
      },
    });

    const usuario = tweet.user;

    res.render("perfilUsuario", { usuario });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
};
