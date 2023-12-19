const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const path = require("path");
const express = require("express");

exports.home =
  ("/home",
  async (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/home.html"));
  });

exports.login =
  ("/login",
  async (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/login.html"));
  });

exports.cadastro =
  ("/cadastro",
  async (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/signup.html"));
  });

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
