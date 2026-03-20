const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

connection.connect(err => {
    if (err) {
        console.error("Erro no banco:", err);
    } else {
        console.log("Banco conectado!");
    }
});

module.exports = connection;