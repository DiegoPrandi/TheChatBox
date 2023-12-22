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
    console.log(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
};

// TWEETAR
exports.tweetarPOST = async (req, res) => {
  const { text_Tweet } = req.body;
  const userId = req.session.userId;
  console.log(userId);

  try {
    let imagem_Tweet;

    // Verificar se foi enviado um arquivo de imagem
    if (req.file) {
      imagem_Tweet = `/images/tweets/${req.file.filename}`;
    }

    const novoTweet = await prisma.chatBox_Tweet.create({
      data: {
        texto_Tweet: text_Tweet,
        foto_Tweet: imagem_Tweet, // Salvar o caminho da imagem
        user: { connect: { idUser: userId } },
      },
      include: {
        user: true,
      },
    });

    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro interno do servidor");
  }
};
