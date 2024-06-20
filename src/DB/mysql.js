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

function add(table, data){
    if(data && data.id == 0){
        return insert(table,data)
    }else{
        return update(table,data)
    }
}

function all(table){
    return new Promise( (resolve, reject) => {
        conection.query(`SELECT * FROM ${table}`, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function del(table, data){
    return new Promise( (resolve, reject) => {
        conection.query(`DELETE FROM ${table} WHERE id= ?`, data.id, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function insert(table, data){
    return new Promise( (resolve, reject) => {
        conection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function one(table, id){
    return new Promise( (resolve, reject) => {
        conection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function update(table, data){
    return new Promise( (resolve, reject) => {
        conection.query(`UPDATE ${table} SET ? WHERE id= ?`, [data, data.id], (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

module.exports = {
    all,
    add,
    del,
    one
}