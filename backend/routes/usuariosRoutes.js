const express = require("express")
const router = express.Router()
const db = require("../db")

// CADASTRAR PARTICIPANTE
router.post("/cadastrar", (req, res) => {

    const { time_id, nome, apelido, nivel, tipo_usuario } = req.body

    const sql = `
    INSERT INTO usuarios (time_id, nome, apelido, nivel, tipo_usuario)
    VALUES (?, ?, ?, ?, ?)
    `

    db.query(sql, [time_id, nome, apelido, nivel, tipo_usuario], (err, result) => {

        if (err) {
            console.error(err)
            return res.status(500).json({ erro: "Erro ao cadastrar participante" })
        }

        res.json({
            mensagem: "Participante cadastrado",
            id: result.insertId
        })

    })

})


// LISTAR PARTICIPANTES
router.get("/listar/:time_id", (req, res) => {

    const { time_id } = req.params

    const sql = `
    SELECT * FROM usuarios
    WHERE time_id = ?
    `

    db.query(sql, [time_id], (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        res.json(result)

    })

})


// REMOVER PARTICIPANTE
router.delete("/remover/:id", (req, res) => {

    const { id } = req.params

    const sql = `
    DELETE FROM usuarios
    WHERE id = ?
    `

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        res.json({
            mensagem: "Participante removido"
        })

    })

})

// EDITAR PARTICIPANTE
router.put("/editar/:id", (req, res) => {

    const { id } = req.params
    const { nome, apelido, nivel, tipo_usuario } = req.body

    const sql = `
    UPDATE usuarios
    SET nome = ?, apelido = ?, nivel = ?, tipo_usuario = ?
    WHERE id = ?
    `

    db.query(sql, [nome, apelido, nivel, tipo_usuario, id], (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        res.json({
            mensagem: "Participante atualizado"
        })

    })

})

module.exports = router

router.get("/buscar/:time_id/:termo", (req, res) => {

    const { time_id, termo } = req.params

    const sql = `
SELECT * FROM usuarios
WHERE time_id = ?
AND (
nome LIKE ?
OR apelido LIKE ?
OR id = ?
)
`

    db.query(sql, [

        time_id,
        `%${termo}%`,
        `%${termo}%`,
        termo

    ], (err, result) => {

        if (err) {

            return res.status(500).json(err)

        }

        res.json(result)

    })

})