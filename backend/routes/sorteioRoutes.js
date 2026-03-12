const express = require("express")
const router = express.Router()
const db = require("../db")

router.post("/sortear/:time_id", (req, res) => {

    const { time_id } = req.params

    const sql = `
    SELECT * FROM usuarios
    WHERE time_id = ?
    `

    db.query(sql, [time_id], (err, jogadores) => {

        if (err) {
            console.error(err)
            return res.status(500).json({ erro: "Erro no banco" })
        }

        if (jogadores.length === 0) {
            return res.json({ erro: "Nenhum participante encontrado" })
        }

        // separar goleiros e linha
        let goleiros = jogadores.filter(j => j.tipo_usuario === "goleiro")
        let linha = jogadores.filter(j => j.tipo_usuario !== "goleiro")

        // separar níveis
        let nivel1 = linha.filter(j => j.nivel == 1)
        let nivel2 = linha.filter(j => j.nivel == 2)
        let nivel3 = linha.filter(j => j.nivel == 3)

        // embaralhar
        const shuffle = (arr) => arr.sort(() => Math.random() - 0.5)

        shuffle(nivel1)
        shuffle(nivel2)
        shuffle(nivel3)
        shuffle(goleiros)

        const jogadoresPorGrupo = 5
        const linhaPorGrupo = 4

        const quantidadeGrupos = Math.ceil(linha.length / linhaPorGrupo)

        let grupos = []

        for (let i = 0; i < quantidadeGrupos; i++) {

            grupos.push({
                grupo: String.fromCharCode(65 + i),
                linha: [],
                goleiro: null
            })

        }

        // distribuir nivel 3
        nivel3.forEach((j, i) => {

            let g = i % quantidadeGrupos
            grupos[g].linha.push(j)

        })

        // distribuir nivel 1
        nivel1.forEach((j, i) => {

            let g = i % quantidadeGrupos
            grupos[g].linha.push(j)

        })

        // distribuir nivel 2
        let g = 0

        nivel2.forEach(j => {

            while (grupos[g].linha.length >= linhaPorGrupo) {

                g++
                if (g >= grupos.length) g = 0

            }

            grupos[g].linha.push(j)

            g++
            if (g >= grupos.length) g = 0

        })

        // distribuir goleiros
        goleiros.forEach((gol, i) => {

            let g = i % quantidadeGrupos
            grupos[g].goleiro = gol

        })

        res.json(grupos)

    })

})

module.exports = router