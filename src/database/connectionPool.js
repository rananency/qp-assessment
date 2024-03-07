const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'SYSTEM',
    database: 'groceryapp'
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID ' + connection.threadId);
    connection.release();
});

module.exports = pool;