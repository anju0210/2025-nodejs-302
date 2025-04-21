const express = require('express');
const Travel = require('../models/Travel');
const router = express.Router();

//게시글 목록
router.get('/', async (req,res)=>{
    try{
        const travelList = await Travel.findAll({attributes:['id', 'name']});
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
        await Travel.create({name});
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
        const travel = await Travel.findByPk(travelID);

        if(!travel){
            res.status(404).send('Not Found');
        }
        
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
        const travel = await Travel.findByPk(travelID);

        if(!travel){
            res.status(404).send('Not Found');
        }

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
        const travel = await Travel.findByPk(travelID);

        if(!travel){
            res.status(404).send('Not Found');
        }

        await travel.update({name});
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
        const travel = await Travel.findByPk(travelID);

        if(!travel){
            res.status(404).send('Not Found');
        }

        await travel.destroy();

        res.render('deleteSuccess');
    }
    catch(err){
        console.error('DB 쿼리 실패', err);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;