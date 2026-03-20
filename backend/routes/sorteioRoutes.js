const express = require("express");
const router = express.Router();
const db = require("../db");
const verificarToken = require("../middleware/auth");
const PDFDocument = require("pdfkit");

// EMBARALHAR
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// 🎯 SORTEIO
router.post("/sortear", verificarToken, (req, res) => {

    const time_id = req.usuario.time_id;
    let { jogadoresPorGrupo } = req.body;

    jogadoresPorGrupo = Number(jogadoresPorGrupo);

    if (!jogadoresPorGrupo || jogadoresPorGrupo <= 0) {
        return res.status(400).json({ erro: "Informe jogadores por grupo válido" });
    }

    db.query("SELECT * FROM usuarios WHERE time_id = ?", [time_id], (err, jogadores) => {

        if (err) return res.status(500).json({ erro: "Erro no banco" });

        if (!jogadores.length) {
            return res.json({ erro: "Sem participantes" });
        }

        let especiais = jogadores.filter(j => j.tipo_usuario === "especial");
        let comuns = jogadores.filter(j => j.tipo_usuario !== "especial");

        let grupos = [];
        const totalGrupos = Math.ceil(comuns.length / jogadoresPorGrupo);

        for (let i = 0; i < totalGrupos; i++) {
            grupos.push({
                grupo: String.fromCharCode(65 + i),
                jogadores: [],
                especial: especiais[i] || null
            });
        }

        shuffle(comuns);

        let index = 0;
        comuns.forEach(j => {
            grupos[index].jogadores.push(j);
            index = (index + 1) % grupos.length;
        });

        db.query(
            "INSERT INTO sorteios (time_id, data_sorteio, resultado) VALUES (?, NOW(), ?)",
            [time_id, JSON.stringify(grupos)]
        );

        res.json({ grupos });

    });

});

// 📄 PDF
router.get("/pdf/:id", verificarToken, (req, res) => {

    const { id } = req.params;
    const time_id = req.usuario.time_id;

    db.query(
        "SELECT * FROM sorteios WHERE id = ? AND time_id = ?",
        [id, time_id],
        (err, result) => {

            if (!result.length) return res.json({ erro: "Não encontrado" });

            const grupos = JSON.parse(result[0].resultado);

            const doc = new PDFDocument();
            res.setHeader("Content-Type", "application/pdf");

            doc.pipe(res);

            doc.text("SorteLab", { align: "center" });

            grupos.forEach(g => {

                doc.moveDown().text("Grupo " + g.grupo);

                if (g.especial) {
                    doc.text("⭐ Especial: " + g.especial.nome);
                }

                g.jogadores.forEach(j => {
                    doc.text("- " + j.nome);
                });

            });

            doc.end();

        }
    );

});

module.exports = router;