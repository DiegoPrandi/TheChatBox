const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// logica para obter id do Usuario logado na sessão
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
    // Chama a função do controller para obter as informações do usuário
    const usuario = await getUserFromSession(req.session.userId);

    res.render("home", { usuario });
    console.log(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
};

// PAGINA LOGIN
exports.login = async (req, res) => {
  res.render("login");
};

// PAGINA CADASTRO
exports.cadastro = async (req, res) => {
  res.render("signup");
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

// LOGIN DO USUARIO USANDO EXPRESS-SESSION
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
    });

    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro interno do servidor");
  }
};
