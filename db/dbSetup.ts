const Pool = require('pg').Pool
export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1',
    port: 5432,
})