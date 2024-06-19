const db = require('../../DB/mysql')

const TABLE = 'contact'

function all () {
    return db.all(TABLE)
}

module.exports = {
    all,
}