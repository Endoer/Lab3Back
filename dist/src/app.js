"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3030;
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
var dbSetup_1 = require("../db/dbSetup");
// get config vars
dotenv.config();
// access config var
process.env.TOKEN_SECRET;
var productApi = require('./productApi');
var orderApi = require('./orderApi');
var customerApi = require('./customerApi');
var courierApi = require('./courierApi');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.get('/', function (req, res) {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});
app.get('/products', productApi.getProducts);
app.get('/products/:id', productApi.getProductById);
app.get('/products/:key:value', productApi.searchProduct);
app.get('/orders', orderApi.getOrders);
app.get('/orders/:id', orderApi.getOrderById);
app.get('/orders/:key:value', orderApi.searchOrder);
app.get('/customers', customerApi.getCustomers);
app.get('/customers/:id', customerApi.getCustomerById);
app.get('/customers/:key:value', customerApi.searchCustomer);
app.get('/couriers', courierApi.getCouriers);
app.get('/couriers/:id', courierApi.getCourierById);
app.get('/couriers/:key:value', courierApi.searchCourier);
app.get('/auth', function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    console.log(username, password);
    //чекнуть юзера
    dbSetup_1.pool.query('Select * from users where username=$1 and password=$2', [username, password], function (err, result) {
        if (err) {
            throw err;
        }
        if (result.rowCount) {
            res.statusMessage = "Successful authorization";
            res.status(200).send({ status: true,
                token: jwt.sign({ username: username, password: password }, process.env.TOKEN_SECRET, { expiresIn: '180s' }) });
        }
        else {
            res.statusMessage = "Authorization invalid";
            res.status(400).send({ status: false, message: "Invalid authorization data" });
        }
    });
});
app.use(function (req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, function (err, user) {
        console.log(err, user);
        if (err)
            return res.sendStatus(403);
        //req.user = user
        next();
    });
});
app.post('/products', productApi.createProduct);
app.put('/products/:id', productApi.updateProduct);
app.delete('/products/:id', productApi.deleteProduct);
app.listen(port, function () {
    console.log(process.env.TOKEN_SECRET);
    console.log("server start pravilno");
});
