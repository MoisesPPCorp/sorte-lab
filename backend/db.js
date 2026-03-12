const mysql = require("mysql2")

const connection = mysql.createConnection({

    host: "127.0.0.1",
    user: "root",
    password: "Lucas0514*",
    database: "sorteador_times",
    port: 3306

})

connection.connect((err) => {

    if (err) {
        console.error("Erro ao conectar ao banco:", err.message)
        return
    }

    console.log("Banco conectado com sucesso!")

})

module.exports = connection