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
