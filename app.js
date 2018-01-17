// Modules
const compression = require('compression');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Routes
const index = require('./routes/index');
const login = require('./routes/api/auth/login');
const register = require('./routes/api/auth/registration');


const app = express();
app.use(compression()); // Adds GZIP Compression
app.use(helmet()); // Sets HTTP headers to secure express

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add some locals for allowing ejs templates the environment
app.use(function (req,res,next){
    res.locals.env = req.app.get('env');
    next();
});

app.use('/', index);
app.use('/api/auth/login', login);
app.use('/api/auth/register', register);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: 'Error: ' + err.status});
});

module.exports = app;
