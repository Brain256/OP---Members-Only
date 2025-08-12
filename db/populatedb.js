require('dotenv').configure(); 

const pool = require('./pool.js'); 

const SQL = `
    CREATE TABLE users (
        id INTEGER PRIMARY KEY GENERATED AS ALWAYS AS IDENTITY,
        first_name VARCHAR(255),
        last_name VARCHAR(255), 
        username VARCHAR(255), 
        password VARCHAR(255), 
        member_status BOOLEAN DEFAULT FALSE
    )

    CREATE TABLE messages (
        id INTEGER PRIMARY KEY GENERATED AS ALWAYS AS IDENTITY, 
        user_id INTEGER REFERENCES users(id), 
        title VARCHAR(255),
        text TEXT, 
        time TIMESTAMP
    )
`


async function populate() {
    console.log('seeding'); 
    await pool.query(SQL); 
    console.log('done'); 
}

populate(); 
