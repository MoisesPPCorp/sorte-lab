const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

const SECRET = "sorteLab_secret";

// 🔐 LOGIN
router.post("/login", (req, res) => {

    const { login, senha } = req.body;

    const sql = `
        SELECT * FROM times
        WHERE login = ? AND senha = ?
    `;

    db.query(sql, [login, senha], (err, result) => {

        if (err) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }

        if (result.length === 0) {
            return res.status(401).json({ erro: "Login inválido" });
        }

        const time = result[0];

        const token = jwt.sign(
            {
                time_id: time.id,
                nome_time: time.nome_time,
                tipo_usuario: "admin"
            },
            SECRET,
            { expiresIn: "8h" }
        );

        res.json({
            mensagem: "Login realizado",
            token
        });

    });

});

// 🆕 CRIAR CONTA
router.post("/criar-conta", (req, res) => {

    const { nome_time, login, senha } = req.body;

    db.query(
        "INSERT INTO times (nome_time, login, senha) VALUES (?, ?, ?)",
        [nome_time, login, senha],
        (err, result) => {

            if (err) {
                return res.status(500).json({ erro: "Erro ao criar conta" });
            }

            res.json({
                mensagem: "Conta criada",
                id: result.insertId
            });

        }
    );

});

module.exports = router;