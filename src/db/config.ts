import mysql from 'mysql2';

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST, // Change this to your MySQL server hostname
    user: process.env.DB_USER, // MySQL username
    password: process.env.DB_PASSWORD, // MySQL password
});


// Connect To Mysql
connection.connect((err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log(`Connected to Mysql`);
});

// Create if database exist
connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    // Use the database after checking
    connection.changeUser({ database: process.env.DB_NAME }, (changeUserErr) => {
        if (changeUserErr) {
            console.error("error");
            connection.end();
            return;
        }
        const tableQuery = `CREATE TABLE IF NOT EXISTS tasks (
                id VARCHAR(255) PRIMARY KEY NOT NULL,
                title varchar(255) NOT NULL,
                status BOOLEAN default false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`

        // Check IF table Exist
        connection.query(tableQuery, (err) => {
            if (err) return connection.end();
        })
    });
});


export default connection