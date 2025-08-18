const pool = require("./pool.js"); 

exports.createUser = async (firstName, lastName, username, password) => {
    try {
        await pool.query('INSERT INTO users (first_name, last_name, username, password, member_status) VALUES ($1, $2, $3, $4, $5)', [firstName, lastName, username, password, false]);
    } catch (err) {
        throw err; 
    }
}