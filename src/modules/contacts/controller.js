const db = require('../../DB/mysql')

const TABLE = 'contacts'

function all () {
    return db.all(TABLE)
}

module.exports = {
    all,
}