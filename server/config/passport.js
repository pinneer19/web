const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Path to your user model

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email', // Field name for the email input
        },
        async (email, password, done) => {
            try {
                console.log("i was here")
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'No user with such email!' });
                }
                console.log("i was here3")

                const isPasswordValid = await bcrypt.compare(password, user.password);

                console.log("i was here4")

                if (!isPasswordValid) {
                    return done(null, false, { message: 'Incorrect password!' });
                }
                console.log(user)
                return done(null, user);
            } catch (error) {
                console.log("i was here2")
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;