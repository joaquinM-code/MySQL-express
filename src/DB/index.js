const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'user',
    password:'password',
    database: 'games'
})

const db = {};

db.selectAll = () =>{
    return new Promise((resolve , reject)=>{
        pool.query('SELECT * FROM test' , (err , results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}

db.selectOneById = (id) =>{
    return new Promise((resolve , reject)=>{
        //If you add multiple question marks you can pass an array of variables (ex: SELECT * FROM test WHERE id=? name=?',[id , name])
        pool.query('SELECT * FROM test WHERE id=?',[id], (err , results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results[0]);//we only return one row
        })
    })
}

db.insertOne = (name) =>{
    return new Promise((resolve , reject)=>{
        pool.query('INSERT INTO test (name) VALUES (?)', name , (err , results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    })
}



module.exports = db;
