const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const path = require("path");
const fs = require("fs");

const upload = require("../middlewares/uploadMiddleware");

const getUserFromSession = async (userId) => {
  if (!userId) return null;

  try {
    const usuarioLogado = await prisma.chatBox_User.findUnique({
      where: { idUser: userId },
      select: {
        nome_User: true,
        apelido_User: true,
        foto_Perfil: true,
      },
    });
    return usuarioLogado;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao obter usuário da sessão");
  }
};
// PAGINA PERFIL DO USUARIO
exports.perfilUsuario = async (req, res) => {
  try {
    const userId = req.session.userId; // ID do usuário logado
    const perfilUserId = parseInt(req.params.userId, 10); // ID do usuário do perfil está sendo visualizado

    // obter informações do usuário
    const usuario = await prisma.chatBox_User.findUnique({
      where: { idUser: perfilUserId },
      include: {
        // incluir
        tweets: {
          // tweets
          select: {
            // selecionar os campos...
            idTweet: true,
            texto_Tweet: true,
            foto_Tweet: true,
            video_Tweet: true,
          },
        },
      },
    });

    // verificar se o usuário logado é o mesmo que está visualizando o perfil
    const podeEditar = userId === perfilUserId;
    const usuarioLogado = await getUserFromSession(userId);

    res.render("userProfile", { usuarioLogado, usuario, podeEditar, userId });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
};

exports.editarBiografia = async (req, res) => {
  try {
    const userId = req.session.userId;
    const novaBiografia = req.body.novaBiografia;

    // atualizar a biografia no banco de dados
    await prisma.chatBox_User.update({
      where: { idUser: userId },
      data: { biografia: novaBiografia },
    });

    res.redirect(`/perfil/${userId}`); // vai para o perfil do usuario logado
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
};

exports.editarFotoPerfil = async (req, res) => {
  try {
    const userId = req.session.userId;
    const fotoPerfil = req.file;

    // verifique se o usuário fez upload de uma nova foto
    if (fotoPerfil) {
      // atualiza o caminho da foto de perfil no banco de dados
      await prisma.chatBox_User.update({
        where: { idUser: userId },
        data: { foto_Perfil: `/images/perfis/temp/${fotoPerfil.filename}` },
      });
    }

    res.redirect(`/perfil/${userId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
};
