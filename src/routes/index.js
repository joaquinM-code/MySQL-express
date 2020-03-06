const express = require('express');
const db = require('../DB');
const validate = require('../middleware/validate');



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

router.get('/users/me' , validate.authorization, async (req , res, next)=>{
    try{
        res.send(req.body);
    }catch(e){
        res.sendStatus(500);
    }
})

router.post('/users/register' , validate.userInput , async (req , res)=>{
    try{
        result = await db.insertOne(req.body);
        const token = await db.insertToken(result.insertId , req.body.name);
        res.json({
            user: req.body.name,
            token
        });
    }catch(e){
        if(e.code == "ER_DUP_ENTRY"){
           return res.json({
               error:'The user or email already exist'
           })
        }
        res.json({
            error:"We are experiencing some internal errors, please try again later"
        })
    }
})
module.exports = router;