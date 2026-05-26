// 1. Az adatbázis-kapcsolat beimportálása a konfigurációs fájlból (általában mysql2 vagy mysql csomag)
const db = require("../config/db.js");

/**
 * TermekModel osztály
 * Statikus metódusokat tartalmaz, így nem kell példányosítani (new TermekModel()), 
 * közvetlenül az osztály nevén keresztül hívhatóak a funkciók.
 */
class TermekModel {

    /**
     * ÖSSZES TERMÉK LEKÉRÉSE
     * @param {Function} callback - A kontrollerből átadott függvény, ami lefut, ha megvan az eredmény
     */
    static getAll(callback) {
        // Lefuttatja a standard SQL lekérdezést az összes rekord kinyerésére
        db.query("SELECT * FROM termekek", callback);
    }

    /**
     * EGY TERMÉK LEKÉRÉSE ID ALAPJÁN
     * @param {number|string} id - A keresett termék egyedi azonosítója
     * @param {Function} callback
     */
    static getById(id, callback) {
        // A '?' egy placeholder (helyőrző). Megvédi a kódot az SQL injection támadásoktól.
        // A [id] tömbben lévő érték fog biztonságosan behelyettesítődni a '?' helyére.
        db.query("SELECT * FROM termekek WHERE id = ?", [id], callback);
    }

    /**
     * ÚJ TERMÉK HOZZÁADÁSA
     * @param {Object} termek - A beszúrandó termék adatai objektumként (pl. { nev: "Cipő", ar: 5000 })
     * @param {Function} callback
     */
    static create(termek, callback) {
        // A 'SET ?' egy kényelmi funkció a mysql csomagban: 
        // Automatikusan kulcs-érték párokká alakítja az átadott 'termek' objektumot (pl. INSERT INTO termekek SET nev='Cipő', ar=5000)
        db.query("INSERT INTO termekek SET ?", termek, callback);
    }

    /**
     * TERMÉK MÓDOSÍTÁSA ID ALAPJÁN
     * @param {number|string} id - A módosítandó termék azonosítója
     * @param {Object} termek - Az új adatokat tartalmazó objektum
     * @param {Function} callback
     */
    static update(id, termek, callback) {
        // Itt két helyőrző (?) van. Az első '?' helyére a 'termek' objektum kerül módosítási listaként, 
        // a második '?' helyére pedig az 'id'. A sorrend a tömbben [termek, id] pontosan megegyezik a kérdőjelek sorrendjével.
        db.query("UPDATE termekek SET ? WHERE id = ?", [termek, id], callback);
    }

    /**
     * TERMÉK TÖRLÉSE ID ALAPJÁN
     * @param {number|string} id - A törlendő termék azonosítója
     * @param {Function} callback
     */
    static delete(id, callback) {
        // Letörli a megadott azonosítójú sort a 'termekek' táblából
        db.query("DELETE FROM termekek WHERE id = ?", [id], callback);
    }
}

// Az osztály exportálása, hogy a kontroller (vagy más fájlok) be tudják importálni a require() segítségével
module.exports = TermekModel;