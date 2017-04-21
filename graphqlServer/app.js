"use strict";
var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var graphql_1 = require("./middleware/graphql");
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use('/graphql', bodyParser.json(), graphql_1.graphqlMiddleware);
app.use('/graphiql', graphql_1.graphiqlMiddleware);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error', { status: err.status, errormessage: err.message });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
//# sourceMappingURL=app.js.map