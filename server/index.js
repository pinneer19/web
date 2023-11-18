require('dotenv').config()
const express = require('express')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const URL = process.env.DB_CONNECT + process.env.DB_NAME
const fileUpload = require('express-fileupload')
const path = require('path')
const session = require('express-session')
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const passport = require('./config/passport');


function checkAuth() {
    return app.use((req, res, next) => {
        if (req.user) next();
        else res.redirect('/login');
    });
}


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)

app.get('/home', checkAuth, (req, res) => {
    res.json({message: "ok"})
});

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
