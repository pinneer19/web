const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const {deserialize, ObjectId} = require("mongodb");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({email});
                if (!user) {
                    return done(null, false, {message: 'No user with such email!'});
                }
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return done(null, false, {message: 'Incorrect password!'});
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOneAndUpdate(
                {email: profile.email},
                {
                    $setOnInsert: {
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.email,
                        phoneNumber: null,
                        password: null,
                    }
                },
                {upsert: true})
                .then(user => {
                    console.log(user);
                    return done(null, user)
                })
                .catch(err => {
                    console.log(err.message);
                    return done(err)
                });
        }
    )
);

passport.use(
    new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: '/auth/facebook/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOneAndUpdate(
                {email: profile.email},
                {
                    $setOnInsert: {
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.email,
                        phoneNumber: null,
                        password: null,
                    }
                },
                {upsert: true})
                .then(user => {
                    console.log(user);
                    return done(null, user)
                })
                .catch(err => {
                    console.log(err.message);
                    return done(err)
                });
        }
    ));

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile)
        User.findOneAndUpdate(
            {lastName: profile.username},
            {
                $setOnInsert: {
                    firstName: profile.displayName,
                    lastName: profile.username,
                    email: null,
                    phoneNumber: null,
                    password: null,
                }
            },
            {upsert: true})
            .then(user => {
                return done(null, user)
            })
            .catch(err => {
                return done(err)
            });
    }
));

module.exports = passport;