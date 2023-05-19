"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var Pool = require('pg').Pool;
exports.pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1',
    port: 5432,
});
