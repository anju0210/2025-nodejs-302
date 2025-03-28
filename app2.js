const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

app.set('view engine', 'ejs');
// __dirname : 현재 파일이 속한 절대경로
// path.join을 하면 운영체제에 맞추어 경로 구분자를 알아서 정해준다
app.set('views', path.join(__dirname, 'views'));

db.connect(err=>{
    if(err){
        console.error('MySQL 연결 실패 : ', err);
        return;
    }
    console.log('MySQL 연결 성공');
});

app.get('/', (req,res)=>{
    res.render('home');
});

app.get('/travel', (req,res)=>{
    const query = 'SELECT id, name FROM travellist';
    db.query(query, (err, results)=>{
        if(err){
            console.error('DB 쿼리 실패');
            res.status(500).send('Internal Server Error');
            return;
        }
        const travelList = results;
        res.render('travel', {travelList});
    });

});

app.listen(3000, ()=>{
    console.log('서버 실행중');
});