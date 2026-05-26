// 1. Az Express keretrendszer beimportálása
const express = require("express");

// 2. Egy új router (útválasztó) objektum létrehozása.
// Ez teszi lehetővé, hogy az útvonalakat külön fájlba szervezzük, ne a fő szerver fájlban (pl. server.js) legyen az összes.
const router = express.Router();

// 3. A kontroller beimportálása, ami a tényleges logikát és az adatbázis hívásokat tartalmazza
const termekController = require("../controllers/TermekController");

/**
 * ÚTVONALAK (ROUTES) DEFINIÁLÁSA
 * Megadjuk, hogy milyen HTTP metódusra (GET, POST, PUT, DELETE) 
 * és milyen URL-re érkező kérést melyik kontroller függvény kezeljen le.
 */

// GET kérés a '/termekek' URL-re -> Lekéri az összes terméket
router.get("/termekek", termekController.getAllTermek);

// GET kérés egy konkrét ID-jú termékre -> A ':id' egy dinamikus paraméter (pl. /termekek/12)
// A kontrollerben ez lesz a req.params.id
router.get("/termekek/:id", termekController.getTermekById);

// POST kérés a '/termekek' URL-re -> Új termék küldése a kérés törzsében (body) és mentése
router.post("/termekek", termekController.createTermek);

// PUT kérés egy konkrét ID-jú termékre -> A megadott azonosítójú termék adatainak frissítése
router.put("/termekek/:id", termekController.updateTermek);

// DELETE kérés egy konkrét ID-jú termékre -> A megadott azonosítójú termék törlése
router.delete("/termekek/:id", termekController.deleteTermek);

// Az elkészített router objektum exportálása, 
// hogy a fő alkalmazásfájl (app.js vagy server.js) be tudja kötni az app.use() segítségével
module.exports = router;