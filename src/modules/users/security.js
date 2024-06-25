const auth = require('../../auth')

module.exports = function checkAuth(){

    function middleware(req, res, next){
        //const id = req.body.id
        auth.checkToken.confirmToken(req)
        next()
    }

    return middleware
}