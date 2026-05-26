// 1. A 'mysql2' csomag beimportálása. 
// Ez a könyvtár teszi lehetővé, hogy JavaScriptből SQL lekérdezéseket küldjünk a MySQL szervernek.
const mysql = require("mysql2");

// 2. Az adatbázis-kapcsolat konfigurálása és létrehozása
const connection = mysql.createConnection({
    // A szerver címe. Mivel a saját gépeden fut az adatbázis, ez "localhost" (vagy 127.0.0.1)
    host: "localhost",
    
    // A MySQL alapértelmezett portja (ezen a "csatornán" kommunikál az adatbázis)
    port: 3306,
    
    // Az adatbázis-felhasználó neve. Lokális fejlesztésnél (pl. XAMPP, Wamp) ez szinte mindig "root"
    user: "root",
    
    // A felhasználóhoz tartozó jelszó. Lokális tesztkörnyezetben alapértelmezetten üresen szokás hagyni ("")
    password: "",
    
    // Annak a konkrét adatbázisnak a neve, amelyikben a 'termekek' tábla található
    database: "termek_db"
});

/**
 * A CSATLAKOZÁS VÉGREHAJTÁSA
 * Megkísérli felépíteni a kapcsolatot a fent megadott adatokkal.
 */
connection.connect((err) => {
    // Hibakezelés: Ha a kapcsolat sikertelen (pl. rossz jelszó, nem fut a MySQL szerver),
    // kiírja a hibát a konzolra és leállítja a folyamatot.
    if (err) {
        console.error("Hiba a csatlakozáskor:", err);
        return;
    }
    
    // Ha nincs hiba, a konzolon jelzi, hogy a híd sikeresen kiépült az adatbázissal
    console.log("Sikeres adatbázis kapcsolat!");
});

// A kapcsolat (connection) objektum exportálása.
// Ezt importálja be a 'TermekModel.js' fájl (const db = require(...)), hogy futtatni tudja a db.query() parancsokat.
module.exports = connection;