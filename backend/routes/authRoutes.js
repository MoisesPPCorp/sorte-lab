const express = require("express")
const router = express.Router()
const db = require("../db")

// CRIAR CONTA
router.post("/criar-conta", (req, res) => {

    const { nome_time, login, senha } = req.body

    const sql = `
    INSERT INTO times (nome_time, login, senha)
    VALUES (?, ?, ?)
    `

    db.query(sql, [nome_time, login, senha], (err, result) => {

        if (err) {
            console.error(err)
            return res.status(500).json({ erro: "Erro ao criar conta" })
        }

        res.json({
            mensagem: "Conta criada com sucesso",
            id: result.insertId
        })

    })

})

// LOGIN
router.post("/login", (req, res) => {

    const { login, senha } = req.body

    const sql = `
    SELECT * FROM times
    WHERE login = ? AND senha = ?
    `

    db.query(sql, [login, senha], (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        if (result.length === 0) {

            return res.status(401).json({
                erro: "Login ou senha inválidos"
            })

        }

        res.json({
            mensagem: "Login realizado",
            time: result[0]
        })

    })

})

module.exports = router