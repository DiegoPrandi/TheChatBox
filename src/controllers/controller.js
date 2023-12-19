const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const path = require("path");
const express = require("express");

// PAGINA HOME
// PAGINA HOME
exports.home = async (req, res) => {
  res.render("home");
};

// PAGINA LOGIN
exports.login = async (req, res) => {
  res.render("login");
};

// PAGINA CADASTRO
exports.cadastro = async (req, res) => {
  res.render("signup");
};

// CADASTRAR USUARIO NO BANCO DE DADOS
exports.cadastroPOST = async (req, res) => {
  const { nome_User, apelido_User, email_User, senha_User } = req.body;

  try {
    // Criar um novo usuário
    const novoUsuario = await prisma.chatBox_User.create({
      data: {
        nome_User,
        apelido_User,
        email_User,
        senha_User,
      },
    });

    alert("Usuário cadastrado com sucesso");
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
    // Verificar as credenciais do usuário
    const usuario = await prisma.chatBox_User.findFirst({
      where: {
        email_User: email_User,
        senha_User: senha_User,
      },
    });

    if (!usuario) {
      return res.status(401).send("Credenciais inválidas");
    }

    // Armazenar o ID do usuário na sessão
    req.session.userId = usuario.idUser;

    res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
};
