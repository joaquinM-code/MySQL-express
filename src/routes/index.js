const express = require('express');
const db = require('../DB');


const router = express.Router();

router.get('/users/all' , async (req , res, next)=>{
    try{
        const results = await db.selectAll();
        res.json(results);
    }catch(e){
        res.send(e);
        console.log(e);
    }
})

router.get('/users/one/:id' , async (req , res, next)=>{
    const id = req.params.id;
    try{
        const results = await db.selectOneById(id);
        res.json(results);
    }catch(e){
        res.sendStatus(500);
        console.log(e);
    }
})

router.post('/users/me' , async (req , res)=>{
    try{
        const results = await db.insertOne(req.body.name);
        res.send("ok");
    }catch(e){
        if(e.code == "ER_DUP_ENTRY"){
           return res.send('The user already exists')
        }
        res.send("We are experiencing some internal errors, please try again later")
    }
})
module.exports = router;