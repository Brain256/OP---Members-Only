const pool = require("./pool.js"); 

exports.createUser = async (firstName, lastName, username, password) => {
    try {
        await pool.query('INSERT INTO users (first_name, last_name, username, password, member_status) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, username, password, false]);
    } catch (err) {
        throw err; 
    }
}

exports.changeStatus = async (username) => {
    try {
        await pool.query('UPDATE users SET member_status = TRUE WHERE username = $1', [username]);
    } catch (err) {
        throw err; 
    }
}