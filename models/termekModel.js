const db = require("../config/db.js");

class TermekModel {

    static getAll(callback) {
        db.query("SELECT * FROM termekek", callback);
    }

    static getById(id, callback) {
        db.query("SELECT * FROM termekek WHERE id = ?", [id], callback);
    }

    static create(termek, callback) {
        db.query("INSERT INTO termekek SET ?", termek, callback);
    }

    static update(id, termek, callback) {
        db.query("UPDATE termekek SET ? WHERE id = ?", [termek, id], callback);
    }

    static delete(id, callback) {
        db.query("DELETE FROM termekek WHERE id = ?", [id], callback);
    }
}

module.exports = TermekModel;