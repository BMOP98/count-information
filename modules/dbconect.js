var mysql = require('mysql2');

const connect = mysql.createConnection({
    host: 'database-1.cz2qa6yo0uk5.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: '12345678b',
    database: 'db_client'
});

connect.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connect;