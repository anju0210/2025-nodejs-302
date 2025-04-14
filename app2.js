const express = require('express');
const path = require('path');
const dotenv = require('dotenv');  
const methodOverride = require('method-override');

const PORT = 3000;

dotenv.config();
const app = express();
const travelRouter = require('./routes/travel');

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/travel', travelRouter);

app.set('view engine', 'ejs');
// __dirname : 현재 파일이 속한 절대경로
// path.join을 하면 운영체제에 맞추어 경로 구분자를 알아서 정해준다
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res)=>{
    res.render('home');
});

//use: 모든 mothod에 대해, 경로가 없으면?: 모든 경로에 대해
app.use((req, res)=>{
    res.status(404).send('Not Found');
});

app.listen(PORT, ()=>{
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});

