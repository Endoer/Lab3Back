"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbSetup_1 = require("../db/dbSetup");
var createProduct = function (req, res) {
    var _a = req.body, name = _a.name, price = _a.price, categoryId = _a.categoryId;
    dbSetup_1.pool.query('INSERT INTO Product (name, price, category) VALUES ($1, $2, $3) RETURNING *', [name, price, categoryId], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(201).send("User added with ID: ".concat(results.rows[0].id));
    });
};
var deleteProduct = function (req, res) {
    var id = parseInt(req.params.id);
    dbSetup_1.pool.query('DELETE FROM Product WHERE id = $1', [id], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).send("User deleted with ID: ".concat(id));
    });
};
var getProducts = function (req, res) {
    dbSetup_1.pool.query('SELECT * FROM Product ORDER BY id ASC', function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
var getProductById = function (req, res) {
    var id = parseInt(req.params.id);
    dbSetup_1.pool.query('SELECT * FROM Product WHERE id = $1', [id], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
var updateProduct = function (req, res) {
    var id = parseInt(req.params.id);
    var _a = req.body, name = _a.name, price = _a.price, categoryId = _a.categoryId;
    dbSetup_1.pool.query('UPDATE product SET name = $1, price = $2, category = $3  WHERE id = $4', [name, price, categoryId, id], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).send("User modified with ID: ".concat(id));
    });
};
var searchProduct = function (req, res) {
    var key = req.params.key;
    var value = req.params.value;
    dbSetup_1.pool.query('Select * from product where $1 like $2%', [key, value], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
module.exports = {
    getProducts: getProducts,
    getProductById: getProductById,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    searchProduct: searchProduct,
};
