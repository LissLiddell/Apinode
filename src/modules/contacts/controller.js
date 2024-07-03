const TABLE = 'contact'
module.exports = function (dbInyected) {

    let db = dbInyected

    if(!db){
        db = require('../../DB/mysql')
    }

    function all () {
        return db.all(TABLE)
    }
    
    function add (body) {
        return db.add(TABLE, body)
    }
    
    function del(id) {
        if (id) {
            return db.del(TABLE, id);
        } else {
            throw new Error('Invalid body or missing id');
        }
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