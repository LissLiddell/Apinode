const auth = require('.')

const TABLE = 'auth'
module.exports = function (dbInyected) {

    let db = dbInyected

    if(!db){
        db = require('../../DB/mysql')
    }
    
    function add (data) {

        const authData = {
            id: data.id,
        }

        if(data.user){
            authData.user = data.user
        }

        if(data.password){
            authData.password = data.password
        }
        return db.add(TABLE, authData)
    }

    return {
        add,
    }
}