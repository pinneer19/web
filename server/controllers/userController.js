const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('passport')

class UserController {
    async registration(req, res, next) {
        try {
            const {firstName, lastName, email, phoneNumber, password} = req.body
            if (!firstName || !lastName || !email || !phoneNumber || !password) {
                return next(ApiError.badRequest("Invalid parameters!"))
            }
            const user = await User.findOne({firstName, lastName, email, phoneNumber})
            if (user) {
                return next(ApiError.badRequest('User with such data exists!'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const newUser = new User({
                firstName,
                lastName,
                email,
                phoneNumber,
                password: hashPassword
            })
            await newUser.save()
            req.login(newUser, (err) => {
                if (err) {
                    return next(err);
                }
                return res.json({ message: 'Registration successful', user: newUser });
            })
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.json({ message: 'Login successful', user });
            });
        })(req, res, next);
    }

    async logout(req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            return res.json({ message: 'Logout successful' });
        });
    }
}

module.exports = new UserController()