const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

router.get("/home", controller.home);

module.exports = router;