const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next()
    }

    if(req.user) {
        next()
    } else {
        res.redirect('/login')
    }
};