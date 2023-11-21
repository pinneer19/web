require('dotenv').config()
const express = require('express')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const PORT = process.env.PORT || 5000
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose')
const URL = process.env.DB_CONNECT + process.env.DB_NAME
const fileUpload = require('express-fileupload')

const path = require('path')
const session = require('express-session')
const cors = require('cors')
const router = require('./routes/index')
const passport = require('./config/passport');
const app = express()


const store = MongoStore.create({
    mongoUrl: URL
});
store.on('error', function(error) {
    console.log(error);
});

app.use(cors({
    credentials: true,
    origin: process.env.REACT_PATH
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

// Facebook
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ["profile"]}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

// Google
app.get('/auth/google', passport.authenticate('google', {scope: ["profile", "email"]}))
app.get('/auth/google/callback', passport.authenticate('google',
    { failureRedirect: process.env.REACT_PATH + '/login', successRedirect: process.env.REACT_PATH }),
);

// Github
app.get('/auth/github', passport.authenticate('github', {scope: ["profile"]}))
app.get('/auth/github/callback', passport.authenticate('github',
    { failureRedirect: process.env.REACT_PATH + '/login', successRedirect: process.env.REACT_PATH }),
);

app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await mongoose
            .connect(URL)
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.log(`DB connection error: ${err}`))
        ;

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
