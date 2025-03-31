const express = require('express');
const bodyParser = require('body-parser');//현재는 express에 내장되어있다

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/submit', (req, res)=>{
    const {name, year} = req.body;
    res.send(`Name : ${name}, Year : ${year}`);
})

app.listen(3000, ()=>{
    console.log('서버 실행중');
})