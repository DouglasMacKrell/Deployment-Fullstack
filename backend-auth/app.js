var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('./auth/passport');

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend-auth/build')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "NOT_A_GOOD_SECRET",
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend-auth/build/index.html"))
})

module.exports = app;
