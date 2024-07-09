const sql = require('mssql')
const config = require('../config')

let pool

function conMysql(){
    pool = sql.connect(config);

   sql.connect((err) => {
     if(err){
        console.log('[db err]', err)
        setTimeout(conMysql, 200)
     }else{
        console.log('DB conected!')
     }   
   })

   sql.on('error', err => {
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
    return new Promise( (resolve, reject) => {
        conection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data], (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function all(table, res){
    try{
        let result = pool.request().query(`SELECT * FROM ${table}`, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    } catch (err) {
        console.error('Error al ejecutar la consulta', err);
        res.status(500).send('Error al consultar la base de datos');
      }
}

function del(table, id){
    return new Promise( (resolve, reject) => {
        conection.query(`DELETE FROM ${table} WHERE id= ?`, id , (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function query(table, query){
    return new Promise( (resolve, reject) => {
        conection.query(`SELECT * FROM ${table} WHERE ?`, query, (error, result) => {
            return error ? reject(error) : resolve(result[0])
        })
    })
}

function one(table, id){
    return new Promise( (resolve, reject) => {
        conection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, result) => {
            return error ? reject(error) : resolve(result[0])
        })
    })
}

module.exports = {
    all,
    add,
    del,
    query,
    one
}