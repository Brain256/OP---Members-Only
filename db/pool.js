const { Pool } = require('pg'); 

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER, 
    database: process.env.DATABASE,
    password: process.env.PASSWORD, 
    port: 5432
})

module.exports = pool; 