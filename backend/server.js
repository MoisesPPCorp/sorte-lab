const express = require("express");
const cors = require("cors");

// ROTAS
const authRoutes = require("./routes/authRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const sorteioRoutes = require("./routes/sorteioRoutes");

const app = express();

// 🔥 MIDDLEWARES
app.use(cors());
app.use(express.json());

// 🔍 TESTE
app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

// 🚀 ROTAS
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/sorteio", sorteioRoutes);

// 🔥 PORTA (IMPORTANTE PARA DEPLOY)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`);

    console.log("\n📌 ROTAS DISPONÍVEIS:");
    console.log("POST   /auth/criar-conta");
    console.log("POST   /auth/login");

    console.log("POST   /usuarios/cadastrar");
    console.log("GET    /usuarios/listar");
    console.log("PUT    /usuarios/editar/:id");
    console.log("DELETE /usuarios/remover/:id");

    console.log("POST   /sorteio/sortear");
    console.log("GET    /sorteio/historico");
});