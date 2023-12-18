const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

router.get("/home", controller.home);
router.get("/login", controller.login);
router.get("/cadastro", controller.cadastro);

module.exports = router;
