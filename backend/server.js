const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 ERROS GLOBAIS
process.on("uncaughtException", (err) => {
    console.error("ERRO GLOBAL:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("PROMISE ERROR:", err);
});

// 🔥 CORS
app.use(cors());
app.use(express.json());

// 🔍 TESTE
app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

// ROTAS
const authRoutes = require("./routes/authRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const sorteioRoutes = require("./routes/sorteioRoutes");

app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/sorteio", sorteioRoutes);

// 🔥 PORTA RAILWAY
const PORT = process.env.PORT || 3000;

// 🔥 ESSENCIAL PRA RAILWAY
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});