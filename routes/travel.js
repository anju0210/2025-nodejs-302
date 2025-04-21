const express = require('express');
const db = require('../db')
const router = express.Router();

//게시글 목록
router.get('/', async (req,res)=>{
    try{
        const _query = 'SELECT id, name FROM travellist';
        const [results] = await db.query(_query);
        const travelList = results;
        res.render('travel', {travelList});
    }
    catch(err){
        console.error('DB 쿼리 실패');
        res.status(500).send('Internal Server Error');
    }
});   

// 게시글 추가하는 페이지
router.get('/add', (req,res)=>{
    res.render('addTravel');
});

// 게시글 추가
router.post('/', async (req, res)=>{
    const {name} = req.body;
    try{
        const _query = 'INSERT INTO travellist (name) VALUES (?)';
        await db.query(_query, [name]);
        res.redirect('/travel');
    }
    catch(err){
        console.error('DB 쿼리 실패', err);
        res.status(500).send('Internal Server Error');
    }
});

// 게시글 내용 조회
router.get('/:id', async (req, res)=>{
    const travelID = req.params.id;
    try{
        const _query = 'SELECT * FROM travellist WHERE id = ?';
        const [results] = await db.query(_query, [travelID]);

        if(results.length===0){
            res.status(404).send('Not Found');
        }
        
        const travel = results[0];
        res.render('travelDetail', {travel});
    }
    catch(err){
        console.error('DB 쿼리 실패', err);
        res.status(500).send('Internal Server Error');
    }
})

// 게시글 수정하는 페이지
router.get('/:id/edit', async (req, res)=>{
    const travelID = req.params.id;
    try{
        const query = 'SELECT * FROM travellist WHERE id = ?';
        const [results] = await db.query(query, [travelID]);

        if(results.length===0){
            res.status(404).send('Not Found');
        }

        const travel = results[0];
        res.render('editTravel', {travel});
    }
    catch(err){
        console.error('DB 쿼리 실패', err);
        res.status(500).send('Internal Server Error');
    }
});

// 게시글 수정
router.put('/:id', async (req, res)=>{
    const travelID = req.params.id;
    const {name} = req.body;
    try{
        const _query = 'UPDATE travellist SET name = ? WHERE id = ?';
        await db.query(_query,  [name, travelID]);

        res.render('updateSuccess');
    }
    catch(err){
        console.error('DB 쿼리 실패', err);
        res.status(500).send('Internal Server Error');
    }
});

// 게시글 삭제
router.delete('/:id',  async (req, res)=>{
    const travelID = req.params.id;
    try{
        const _query = 'DELETE FROM travellist WHERE id = ?';
        await db.query(_query, [travelID]);

        res.render('deleteSuccess');
    }
    catch(err){
        console.error('DB 쿼리 실패', err);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;