const express = require('express');
const db = require('../db')
const router = express.Router();

//게시글 목록
router.get('/', (req,res)=>{
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

// 게시글 추가하는 페이지
router.get('/add', (req,res)=>{
    res.render('addTravel');
});

// 게시글 추가
router.post('/', (req, res)=>{
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

// 게시글 내용 조회
router.get('/:id', (req, res)=>{
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

// 게시글 수정하는 페이지
router.get('/:id/edit', (req, res)=>{
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
        res.render('editTravel', {travel});
    })
});

// 게시글 수정
router.put('/:id', (req, res)=>{
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

// 게시글 삭제
router.delete('/:id', (req, res)=>{
    const travelID = req.params.id;
    const _query = 'DELETE FROM travellist WHERE id = ?';
    db.query(_query, [travelID], (err, results)=>{
        if(err){
            console.error('DB 쿼리 실패', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if(results.length===0){
            res.status(404).send('Not Found');
            return;
        }
        res.render('deleteSuccess');
    });
});



module.exports = router;