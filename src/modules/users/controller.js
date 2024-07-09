const TABLE = 'usuarioLiss'
module.exports = function (dbInyected) {

    let db = dbInyected

    if(!db){
        db = require('../../DB/mysql')
    }

    function all () {
        return db.all(TABLE)
    }
    
    async function add (data) {
        console.log('Add Request:', JSON.stringify(data));
        const authData = {
            id: data.id,
        }

        if(data.user){
            authData.user = data.user
        }

        if(data.password){
            //encript password
            authData.password = await bcrypt.hash(data.password.toString(), 5)
        }else{
            console.log("No encontrado")
        }
        return db.add(TABLE, authData )
    }
    
    function del (id) {
        return db.del(TABLE, id)
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