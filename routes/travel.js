const express = require('express');
const db = require('../db')
const router = express.Router();

router.get('/add', (req,res)=>{
    res.render('addTravel');
});

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
})

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