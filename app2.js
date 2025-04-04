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

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
    const _query = 'SELECT id, name FROM travellist';
    db.query(_query, (err, results)=>{
        if(err){
            console.error('DB 쿼리 실패');
            res.status(500).send('Internal Server Error');
            return;
        }
        const travelList = results;
        res.render('travel', {travelList});
    });

});

app.get('/travel/:id', (req, res)=>{
    const travelID = req.params.id;
    const query = 'SELECT * FROM travellist WHERE id = ?';
    db.query(query, [travelID], (err, results)=>{
        if(err){
            console.error('DB 쿼리 실패', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if(results.length===0){
            res.status(404).send('Not Found');
        }
        const travel = results[0];
        res.render('travelDetail', {travel});
    })
})

app.post('/travel', (req, res)=>{
    const {name} = req.body;
    const _query = 'INSERT INTO travellist (name) VALUES (?)';
    db.query(_query, [name], (err, results)=>{
        if(err){
            console.error('DB 쿼리 실패', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/travel');
    })
});

app.put('/travel/:id', (req, res)=>{
    const travelID = req.params.id;
    const {name} = req.body;
    const _query = 'UPDATE travellist SET name = ? WHERE id = ?';
    db.query(_query, [name, travelID], (err, results)=>{
        if(err){
            console.error('DB 쿼리 실패', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if(results.length===0){
            res.status(404).send('Not Found');
            return;
        }
        res.render('updateSuccess');
    });
});

app.get('/add-travel', (req,res)=>{
    res.render('addTravel');
});

//use: 모든 mothod에 대해, 경로가 없으면?: 모든 경로에 대해
app.use((req, res)=>{
    res.status(404).send('Not Found');
});

app.listen(3000, ()=>{
    console.log('서버 실행중');
});