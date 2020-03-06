const validator = require('validator');
const db = require('../DB')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const sanitize = (input) =>{
    const data = validator.trim(validator.escape(input));
    return data;
}

const validate = {};

validate.userInput = async (req , res , next) =>{
   
    //Data sanitization
    Object.keys(req.body).forEach((key)=>{
        req.body[key] = sanitize(req.body[key]);
    })
    

    let {password , name , email} = req.body

    if(!password || !name || !email){
        return res.json({
            error : "Empty fields are not valid"
        })
    }
    if(!validator.isEmail(email)){
        return res.json({
            error : "Invalid email format!"
        })
    }

    if(name.length < 3){
        return res.json({
            error : "Name to short!"
        })
    }

    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
        return res.json({
            error : "The password must contain at least 8 characters, 1 number 1, upper and 1 lowercase"
        })
    }

    //Hashing password 
    req.body.password = await bcryptjs.hash(password, 8);


    next();
}


validate.authorization = async (req , res , next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ' , '');
        const decoded = jwt.verify(token , "SECRET");
        const user = await db.selectOne(token , decoded.id);
        req.body={
            user : user.name,
            email : user.email
        }
        next();
    }catch(e){
        res.json({
            error: e
        })
    }
}

module.exports = validate;