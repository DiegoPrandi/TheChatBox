const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// PAGINA PERFIL DO USUARIO
// PAGINA PERFIL DO USUARIO
exports.perfilUsuario = async (req, res) => {
  try {
    const userId = req.session.userId; // ID do usuário logado
    const perfilUserId = parseInt(req.params.userId, 10); // ID do usuário cujo perfil está sendo visualizado

    // obter informações do usuário
    const usuario = await prisma.chatBox_User.findUnique({
      where: { idUser: perfilUserId },
    });

    // verificar se o usuário logado é o mesmo que está visualizando o perfil
    const podeEditar = userId === perfilUserId;

    res.render("userProfile", { usuario, podeEditar });
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
