const mysql = require('mysql');
const jwt = require('jsonwebtoken');


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'user',
    password:'password',
    database: 'games'
})

const db = {};

db.selectOne = (token , id) =>{
    return new Promise((resolve , reject)=>{
        //If you add multiple question marks you can pass an array of variables (ex: SELECT * FROM test WHERE id=? name=?',[id , name])
        pool.query('SELECT users.name, users.email FROM users JOIN tokens ON users.id = tokens.user WHERE token=? AND tokens.user =?',[token , id], (err , results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        })
    })
}

db.insertToken = async (id , userName) =>{
    const token = await jwt.sign({userName , id} , "SECRET");

    return new Promise((resolve , reject)=>{
        pool.query('INSERT INTO tokens (user , token) VALUES (?,?)' , [id , token] , (err , results)=>{
            if(err){
                return reject(err);
            } 
            return resolve(token);
        });
    })
}

db.insertOne = (user) =>{
    return new Promise((resolve , reject)=>{
        const {name , email , password} = user;
        
        pool.query('INSERT INTO users (name , email , password) VALUES (?,?,?)', [name , email , password] , (err , results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}



module.exports = db;
