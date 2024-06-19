const mysql = require('mysql')
const config = require('../config')

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conection

function conMysql(){
   conection =  mysql.createConnection(dbconfig)

   conection.connect((err) => {
     if(err){
        console.log('[db err]', err)
        setTimeout(conMysql, 200)
     }else{
        console.log('DB conected!')
     }   
   })

   conection.on('error', err => {
        console.log('[db err]', err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql()
        }else{
            throw err
        }
   })
}

conMysql()

function all(table){
    return new Promise( (resolve, reject) => {
        conection.query(`SELECT * FROM ${table}`, (error, result) => {
            if(error)
        })
    })
}

function one(table, id){

}

function add(table, data){

}

function del(table, id){

}

module.exports = {
    all,
    one,
    add,
    del
}