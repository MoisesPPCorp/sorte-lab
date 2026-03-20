const express = require("express");
const router = express.Router();
const db = require("../db");
const verificarToken = require("../middleware/auth");

// 📌 CADASTRAR
router.post("/cadastrar", verificarToken, (req, res) => {

    const time_id = req.usuario.time_id;
    const { nome, apelido, nivel, tipo_participante } = req.body;

    if (!nome || !nivel) {
        return res.status(400).json({ erro: "Nome e nível obrigatórios" });
    }

    const tipo = tipo_participante || "comum";

    db.query(
        `INSERT INTO usuarios (time_id, nome, apelido, nivel, tipo_usuario)
         VALUES (?, ?, ?, ?, ?)`,
        [time_id, nome, apelido, nivel, tipo],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json({ erro: "Erro ao cadastrar" });
            }

            res.json({
                mensagem: "Participante cadastrado",
                id: result.insertId
            });

        }
    );

});

// 📌 LISTAR
router.get("/listar", verificarToken, (req, res) => {

    const time_id = req.usuario.time_id;

    db.query(
        "SELECT * FROM usuarios WHERE time_id = ?",
        [time_id],
        (err, result) => {

            if (err) return res.status(500).json({ erro: "Erro" });

            res.json({ dados: result });

        }
    );

});

// 📌 REMOVER
router.delete("/remover/:id", verificarToken, (req, res) => {

    const { id } = req.params;
    const time_id = req.usuario.time_id;

    db.query(
        "DELETE FROM usuarios WHERE id = ? AND time_id = ?",
        [id, time_id],
        (err) => {

            if (err) return res.status(500).json({ erro: "Erro ao remover" });

            res.json({ mensagem: "Removido" });

        }
    );

});

module.exports = router;