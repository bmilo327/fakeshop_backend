const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "termek_db"
});

connection.connect((err) => {
    if (err) {
        console.error("Hiba a csatlakozáskor:", err);
        return;
    }
    console.log("Sikeres adatbázis kapcsolat!");
});

module.exports = connection;