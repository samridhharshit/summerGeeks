const mysql = require('mysql');

// loacl database connection establishment
exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'summergeeks'
});
