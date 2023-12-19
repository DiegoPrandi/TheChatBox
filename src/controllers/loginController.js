const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// PAGINA LOGIN
exports.login = async (req, res) => {
  res.render("login");
};

// PAGINA CADASTRO
exports.cadastro = async (req, res) => {
  res.render("signup");
};

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

// PAGINA HOME
exports.home = async (req, res) => {
  try {
    const userId = req.session.userId;

    // obter todos os tweets
    const tweets = await prisma.chatBox_Tweet.findMany({
      include: {
        user: {
          select: {
            idUser: true,
            nome_User: true,
            apelido_User: true,
            email_User: true,
          },
        },
      },
    });

    // obter as informações do usuário
    const usuario = await getUserFromSession(userId);

    res.render("home", { usuario, tweets });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
};

// CADASTRAR USUARIO NO BANCO DE DADOS
exports.cadastroPOST = async (req, res) => {
  const { nome_User, apelido_User, email_User, senha_User } = req.body;

  try {
    // criar um novo usuário
    const novoUsuario = await prisma.chatBox_User.create({
      data: {
        nome_User,
        apelido_User,
        email_User,
        senha_User,
      },
    });

    console.log("Usuário cadastrado com sucesso");
    res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
};

// LOGIN USUARIO E ARMAZENAR NA SESSÃO
exports.loginPOST = async (req, res) => {
  const { email_User, senha_User } = req.body;

  try {
    // verificar as credenciais do usuário
    const usuario = await prisma.chatBox_User.findFirst({
      where: {
        email_User: email_User,
        senha_User: senha_User,
      },
    });

    if (!usuario) {
      return res.status(401).send("Credenciais inválidas");
    }

    // armazenar o ID do usuário na sessão
    req.session.userId = usuario.idUser;

    res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
};
