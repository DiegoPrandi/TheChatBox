const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

router.get("/home", controller.home);
router.get("/login", controller.login);
router.get("/cadastro", controller.cadastro);
router.post("/cadastro", controller.cadastroPOST);

module.exports = router;
