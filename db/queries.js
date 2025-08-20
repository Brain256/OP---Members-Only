const pool = require("./pool.js"); 

exports.createUser = async (firstName, lastName, username, password) => {
    try {
        const result = await pool.query('INSERT INTO users (first_name, last_name, username, password, member_status) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, username, password, false]);
        return result; 
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

exports.createMsg = async (userid, title, text) => {
    try {
        await pool.query('INSERT INTO messages (user_id, title, text) VALUES ($1, $2, $3)', [userid, title, text]); 
    } catch (err) {
        throw err; 
    }
}