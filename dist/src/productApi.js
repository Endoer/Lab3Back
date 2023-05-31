"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbSetup_1 = require("../db/dbSetup");
var createProduct = function (req, res) {
    var _a = req.body, name = _a.name, price = _a.price;
    dbSetup_1.pool.query('INSERT INTO products (name, price ) VALUES ($1, $2) RETURNING *', [name, price], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(201).send("Product added with ID: ".concat(results.rows[0].id));
    });
};
var deleteProduct = function (req, res) {
    var id = parseInt(req.params.id);
    dbSetup_1.pool.query('DELETE FROM products WHERE id = $1', [id], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).send("Product deleted with ID: ".concat(id));
    });
};
var getProducts = function (req, res) {
    dbSetup_1.pool.query('SELECT * FROM products ORDER BY id ASC', function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
var getProductById = function (req, res) {
    var id = parseInt(req.params.id);
    dbSetup_1.pool.query('SELECT * FROM products WHERE id = $1', [id], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
var updateProduct = function (req, res) {
    var id = parseInt(req.params.id);
    var _a = req.body, name = _a.name, price = _a.price;
    dbSetup_1.pool.query('UPDATE products SET name = $1, price = $2, WHERE id = $3', [name, price, id], function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).send("Product modified with ID: ".concat(id));
    });
};
var searchProduct = function (req, res) {
    var key = req.params.key;
    var value = req.params.value;
    dbSetup_1.pool.query('Select * from products where $1 like $2%', [key, value], function (error, results) {
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
