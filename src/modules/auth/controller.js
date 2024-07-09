const bcrypt = require('bcrypt')

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

    return {
        login
    }
}