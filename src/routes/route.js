const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET
router.get("/home", controller.home);

router.get("/login", controller.login);
router.get("/cadastro", controller.cadastro);
router.get("/tweetar", controller.tweetar);

// POST
router.post("/cadastro", controller.cadastroPOST);
router.post("/login", controller.loginPOST);
router.post("/tweetar", controller.tweetarPOST);

module.exports = router;
