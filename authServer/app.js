"use strict";
var express = require("express");
var path = require("path");
var logger = require("morgan");
//import * as cookieParser from 'cookie-parser';
//import * as bodyParser from 'body-parser';
//import * as session from 'express-session';
var passport_1 = require("./middleware/passport/passport");
var database_1 = require("./database");
//import { router as index } from './routes/index';
var auth_1 = require("./routes/auth");
database_1.db.sequelize.sync({ force: true });
exports.app = express();
// view engine setup
exports.app.set('view engine', 'ejs');
exports.app.set('views', path.join(__dirname, 'views'));
exports.app.use(logger('dev'));
passport_1.default(exports.app, database_1.db);
exports.app.use("/auth", auth_1.router);
// catch 404 and forward to error handler
exports.app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
exports.app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err;
    // render the error page
    res.status(err.status || 500);
    res.render('error', { status: err.status, errormessage: err.message });
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(session({secret: 'cognovo'}));
// routes
//app.use('/', index);
//# sourceMappingURL=app.js.map