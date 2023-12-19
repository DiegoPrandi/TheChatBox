// chamando prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// chamando express
const express = require("express");
const session = require("express-session");
const app = express();

const path = require("path");

app.use(
  session({
    secret: "crazyMyMan", // Deve ser mantido em segredo
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// indicando a rota
const route = require("./routes/route");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// chamar as rota
app.use(route);

// configurar o servidor para apresentar os arquivos estáticos (css e js)
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../public/scripts")));

// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ------ ROTAS -------
app.use("/home", route);
app.use("/login", route);
app.use("/cadastro", route);
app.use("/tweetar", route);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
