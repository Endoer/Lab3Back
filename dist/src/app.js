var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3030;
var productApi = require('./productApi');
var categoryApi = require('./categoryApi');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.get('/', function (req, res) {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});
app.get('/products', productApi.getProducts);
app.get('/products/:id', productApi.getProductById);
app.post('/products', productApi.createProduct);
app.put('/products/:id', productApi.updateProduct);
app.delete('/products/:id', productApi.deleteProduct);
app.get('/products/:key:value', productApi.searchProduct);
app.get('/category', categoryApi.getCategories);
app.listen(port, function () {
    console.log("server start pravilno");
});
