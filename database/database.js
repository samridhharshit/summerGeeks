const mysql = require('mysql');

// local database connection establishment
exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'summergeeks'
});
