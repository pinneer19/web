module.exports = function (req, res, next) {
    if(req.isAuthenticated()) {
        next()
    } else {
        return res.status(401).json({message: 'Non-authorized access', session: req.session, user: req.user, res: res.user})
    }
};