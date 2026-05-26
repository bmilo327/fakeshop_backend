// 1. Az Express keretrendszer beimportálása a szerver létrehozásához
const express = require("express");

// 2. A CORS (Cross-Origin Resource Sharing) csomag beimportálása.
// Ez teszi lehetővé, hogy a szerver fogadjon kéréseket más domainekről/portokról is 
// (pl. ha a frontended a http://localhost:5173-as porton fut, a szerver pedig a 3000-esen).
const cors = require("cors");

// 3. Az Express alkalmazás példányosítása (létrehozzuk a szerver objektumot)
const app = express();

/**
 * MIDDLEWARE-EK (Globális beállítások)
 * Olyan funkciók, amiken minden egyes beérkező kérés átmegy, mielőtt elérné az útvonalakat (routes).
 */

// Engedélyezi a CORS-t minden beérkező kérésre (megelőzi a gyakori CORS-hibákat a böngészőben)
app.use(cors());

// Beépített Express middleware, ami automatikusan elemzi (parse-olja) a beérkező kérések törzsét (req.body), 
// amennyiben az JSON formátumú. Emiatt tudjuk a kontrollerben simán objektumként olvasni a 'req.body'-t.
app.use(express.json());

/**
 * ÚTVONALAK (ROUTES) BEKÖTÉSE
 */

// Beimportáljuk a termékekhez tartozó router fájlt, amit az előbb készítettünk el
const termekRoutes = require("./src/routes/termekRoutes");

// Összekötjük a routert egy alapértelmezett URL-előtaggal (prefix).
// Ez azt jelenti, hogy a routerben lévő összes útvonal elé bekerül az "/api" rész.
// Pl. a routerben lévő "/termekek" a böngészőből már így lesz elérhető: "http://localhost:3000/api/termekek"
app.use("/api", termekRoutes);

/**
 * SZERVER INDÍTÁSA
 */

// Meghatározzuk, hogy a szerver melyik porton figyelje a beérkező kéréseket
const PORT = 3000;

// Elindítjuk a szervert a megadott porton. 
// Amint a szerver sikeresen elindult és készen áll, lefut a benne lévő callback függvény.
app.listen(PORT, () => {
    // Kiírja a konzolra a szerver elérhetőségét, így könnyen kattintható a link a teszteléshez
    console.log(`Szerver fut: http://localhost:${PORT}`);
});