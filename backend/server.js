const express = require("express")
const cors = require("cors")

// IMPORTAR ROTAS
const authRoutes = require("./routes/authRoutes")
const usuariosRoutes = require("./routes/usuariosRoutes")
const sorteioRoutes = require("./routes/sorteioRoutes")

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// TESTE DE SERVIDOR
app.get("/", (req, res) => {
    res.send("Servidor funcionando")
})

// ROTAS DA API
app.use("/auth", authRoutes)
app.use("/usuarios", usuariosRoutes)
app.use("/sorteio", sorteioRoutes)

// PORTA
const PORT = 3000

app.listen(PORT, () => {

    console.log("Servidor rodando na porta 3000")

    console.log("Rotas disponíveis:")
    console.log("POST   http://localhost:3000/auth/criar-conta")
    console.log("POST   http://localhost:3000/auth/login")
    console.log("POST   http://localhost:3000/usuarios/cadastrar")
    console.log("GET    http://localhost:3000/usuarios/listar/:time_id")
    console.log("DELETE http://localhost:3000/usuarios/remover/:id")
    console.log("POST   http://localhost:3000/sorteio/sortear/:time_id")

})