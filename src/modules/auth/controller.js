const bcrypt = require('bcrypt')
const auth = require('../../auth')
const TABLE = 'auth'

module.exports = function (dbInyected) {

    let db = dbInyected

    if(!db){
        db = require('../../DB/mysql')
    }

    async function login(user, password){
        const data = await db.query(TABLE, {user: user})       
        return bcrypt.compare(password, data.password)
            .then(result => {
                console.log(result)
                if(result === true)
                   //generate token 
                   return auth.assignToken({ ...data})
                else
                    return null
            })
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

    return {
        add,
        login
    }
}