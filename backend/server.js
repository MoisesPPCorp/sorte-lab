const express = require("express");
const cors = require("cors");

// 🔥 TRATAMENTO GLOBAL (ANTES DE TUDO)
process.on("uncaughtException", (err) => {
    console.error("ERRO GLOBAL:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("PROMISE ERROR:", err);
});

// ROTAS
const authRoutes = require("./routes/authRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const sorteioRoutes = require("./routes/sorteioRoutes");

const app = express();

// 🔥 CORS LIBERADO
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 🔍 ROTA TESTE (IMPORTANTE)
app.get("/", (req, res) => {
    res.status(200).send("Servidor funcionando 🚀");
});

// 🚀 ROTAS
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/sorteio", sorteioRoutes);

// 🔥 PORTA (RAILWAY)
const PORT = process.env.PORT || 3000;

// 🔥 START SERVER CORRETO
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});