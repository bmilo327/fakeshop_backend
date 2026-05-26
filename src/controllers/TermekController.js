// 1. A modell beimportálása, amely az adatbázis-műveletekért (SQL lekérdezésekért) felelős
const TermekModel = require("../models/termekModel.js");

/**
 * ÖSSZES TERMÉK LEKÉRÉSE
 * Kezeli a GET kéréseket az összes termék listázásához.
 */
exports.getAllTermek = (req, res) => {
    // Meghívja a modell 'getAll' függvényét, ami lekéri az adatokat az adatbázisból
    TermekModel.getAll((err, results) => {
        // Hibakezelés: Ha hiba történik az adatbázisban, 500-as (Server Error) státusszal és a hibaüzenettel tér vissza
        if (err) return res.status(500).json(err);
        
        // Sikeres lekérés esetén visszaadja a termékek listáját JSON formátumban
        res.json(results);
    });
};

/**
 * EGY SPECIFIKUS TERMÉK LEKÉRÉSE ID ALAPJÁN
 * Kezeli a GET kéréseket, ahol az URL-ben szerepel az ID (pl. /termek/5)
 */
exports.getTermekById = (req, res) => {
    // Kinyeri az 'id' paramétert az URL-ből (req.params-ból)
    const id = req.params.id;

    // Meghívja a modell 'getById' függvényét a kinyert azonosítóval
    TermekModel.getById(id, (err, results) => {
        // Hibakezelés: Ha adatbázis hiba van, 500-as hibát küld vissza
        if (err) return res.status(500).json(err);
        
        // Mivel az adatbázis tömbként adja vissza a találatot (még ha csak 1 elem is), 
        // a tömb legelső, [0]-ás indexű elemét küldjük vissza a kliensnek
        res.json(results[0]);
    });
};

/**
 * ÚJ TERMÉK LÉTREHOZÁSA
 * Kezeli a POST kéréseket, a küldött adatokat elmenti az adatbázisba
 */
exports.createTermek = (req, res) => {
    // Kinyeri a kérés törzséből (body) a küldött termékadatokat (pl. név, ár)
    const termek = req.body;

    // Átadja a termék objektumot a modell 'create' függvényének
    TermekModel.create(termek, (err, result) => {
        // Hibakezelés
        if (err) return res.status(500).json(err);
        
        // Sikeres mentés után egy visszajelző üzenetet küld, 
        // valamint az adatbázis által generált új ID-t (result.insertId)
        res.json({ message: "Termék létrehozva!", id: result.insertId });
    });
};

/**
 * TERMÉK FRISSÍTÉSE
 * Kezeli a PUT (vagy PATCH) kéréseket egy adott ID-jú termék módosítására
 */
exports.updateTermek = (req, res) => {
    // Szükség van a módosítandó termék ID-jára az URL-ből...
    const id = req.params.id;
    // ...és az új adatokra a kérés törzséből (body)
    const termek = req.body;

    // Átadja az ID-t és a frissítendő adatokat a modell 'update' függvényének
    TermekModel.update(id, termek, (err) => {
        // Hibakezelés
        if (err) return res.status(500).json(err);
        
        // Sikeres frissítés esetén nyugtázó üzenetet küld vissza
        res.json({ message: "Termék frissítve!" });
    });
};

/**
 * TERMÉK TÖRÖLÉSE
 * Kezeli a DELETE kéréseket egy adott ID-jú termék eltávolítására
 */
exports.deleteTermek = (req, res) => {
    // Kinyeri a törlendő termék azonosítóját az URL-ből
    const id = req.params.id;

    // Meghívja a modell 'delete' függvényét a törlés végrehajtásához
    TermekModel.delete(id, (err) => {
        // Hibakezelés
        if (err) return res.status(500).json(err);
        
        // Sikeres törlés esetén nyugtázó üzenetet küld vissza
        res.json({ message: "Termék törölve!" });
    });
};