const mysql = require('mysql2');

const db = mysql.createPool({   // 별도로 connect할 필요 X
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

module.exports = db;