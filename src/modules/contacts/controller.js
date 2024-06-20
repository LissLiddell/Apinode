const db = require('../../DB/mysql')

const TABLE = 'contact'

function all () {
    return db.all(TABLE)
}

function one (id) {
    return db.one(TABLE, id)
}

function add (body) {
    return db.add(TABLE, body)
}

function del (body) {
    return db.del(TABLE, body)
}

module.exports = {
    all,
    one,
    del,
    add
}