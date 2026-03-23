const express = require("express");
const cors = require("cors");

// ROTAS
const authRoutes = require("./routes/authRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const sorteioRoutes = require("./routes/sorteioRoutes");

const app = express();

// 🔥 CORS LIBERADO (PROBLEMA RESOLVIDO DEFINITIVO)
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 🔍 TESTE
app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

// 🚀 ROTAS
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/sorteio", sorteioRoutes);

// 🔥 PORTA RAILWAY
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});