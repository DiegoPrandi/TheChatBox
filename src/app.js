// chamando prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// chamando express
const express = require("express");
const app = express();

const path = require("path");

// indicando a rota
const route = require("./routes/route");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//chamar as rota
app.use(route);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../public/scripts")));

// ------ ROTAS -------
app.use("/home", route);
app.use("/login", route);
app.use("/cadastro", route);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
