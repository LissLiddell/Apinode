const config = {
    user: 'usrexamen',
    password: 'Abc123**',
    server: 'PROSERVER',
    database: 'Examen',
    options: {
        encrypt: false,
        enableArithAbort: true
    },
    jwt:{
        secret: process.env.JET_SECRET || 'topsecret'
    }
}

module.exports = config;