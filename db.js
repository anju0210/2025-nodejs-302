const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

db.connect(err=>{
    if(err){
        console.error('MySQL 연결 실패 : ', err);
        return;
    }
    console.log('MySQL 연결 성공');
});

module.exports = db;