const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.MYSQLHOST || "localhost",
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "",
    database: process.env.MYSQLDATABASE || "sorte_lab",
    port: process.env.MYSQLPORT || 3306
});

// 🔥 CONEXÃO SEGURA
connection.connect(err => {
    if (err) {
        console.error("❌ Erro no banco:", err.message);
    } else {
        console.log("✅ Banco conectado!");
    }
});

module.exports = connection;