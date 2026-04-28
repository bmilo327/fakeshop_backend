const express = require("express");
const router = express.Router();
const termekController = require("../controllers/TermekController");

router.get("/termekek", termekController.getAllTermek);
router.get("/termekek/:id", termekController.getTermekById);
router.post("/termekek", termekController.createTermek);
router.put("/termekek/:id", termekController.updateTermek);
router.delete("/termekek/:id", termekController.deleteTermek);

module.exports = router;