require('dotenv').config(); 

const pool = require('./pool.js'); 

const SQL = `
    CREATE TABLE users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name VARCHAR(255),
        last_name VARCHAR(255), 
        username VARCHAR(255) UNIQUE, 
        password VARCHAR(255), 
        member_status BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, 
        title VARCHAR(255),
        text TEXT, 
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`


async function populate() {
    console.log('seeding'); 
    await pool.query(SQL); 
    console.log('done'); 
}

populate(); 
