const TABLE = 'user'
const auth = require('../auth')
module.exports = function (dbInyected) {

    let db = dbInyected

    if(!db){
        db = require('../../DB/mysql')
    }

    function all () {
        return db.all(TABLE)
    }
    
    async function add (body) {
        const user = {
            id: body.id,
            name: body.name,
            active: body.active
        }
        const response = await db.add(TABLE, user)
        var insertId = 0
        if(body.id == 0){
            insertId = response.insertId
        }else{
            insertId = body.id
        }

        var response2 = ''
        if(body.user || body.password){
            response2 = await  auth.add({
                id: insertId,
                user: body.user,
                password: body.password
            })
        }

        return response2
    }
    
    function del (body) {
        return db.del(TABLE, body)
    }
    
    function one (id) {
        return db.one(TABLE, id)
    }

    return {
        add,
        all,
        del,
        one   
    }
}