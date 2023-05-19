"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbSetup_1 = require("../db/dbSetup");
var getCategories = function (req, res) {
    dbSetup_1.pool.query('SELECT * FROM Category ORDER BY id ASC', function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
module.exports = {
    getCategories: getCategories,
};
