# FAKESHOP BACKEND
Ez egy Node.js és Express.js alapon működő, MVC (Model-View-Controller) mintát követő REST API, amely egy MySQL adatbázisban tárolt termékek CRUD (létrehozás, olvasás, frissítés, törlés) műveleteit kezeli.
## 📁 Projektstruktúra és Fájlok Feladatköre
- app.js (Alkalmazás belépési pont)
    - Elindítja a HTTP szervert a 3000-es porton.
    - Beállítja a globális middleware-eket: a cors()-t a kereszt-eredetű kérések engedélyezéséhez, és az express.json()-t a beérkező JSON adatok feldolgozásához.
    - Beköti az API útvonalakat az /api prefix alá.
- config/db.js (Adatbázis kapcsolat)
    - Létrehozza a kapcsolatot a helyi MySQL szerverrel (termek_db adatbázis).
    - Felelős a sikeres kapcsolódás ellenőrzéséért és a kapcsolat exportálásáért.
- routes/termekRoutes.js (Útválasztó / Router)
    - Meghatározza a HTTP metódusok (GET, POST, PUT, DELETE) és az URL végpontok kapcsolatát.
    - Közvetíti a kéréseket a megfelelő kontroller funkciókhoz.
- controllers/TermekController.js (Vezérlő / Controller)
    - Kezeli a HTTP kéréseket (req) és válaszokat (res).
    - Kinyeri az adatokat az URL-ből vagy a kérés törzséből, meghívja a modellt, majd az eredményt vagy a hibát (státuszkódokkal, pl. 500) JSON formátumban visszaküldi a kliensnek.
- models/termekModel.js (Adatmodell)
    - Az alkalmazás adatrétege. Statikus metódusokon keresztül futtatja a nyers SQL lekérdezéseket.
    - Biztonságos helyőrzőket (?) használ az SQL injection támadások kivédésére.