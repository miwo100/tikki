import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
//import * as cookieParser from 'cookie-parser';
//import * as bodyParser from 'body-parser';
//import * as session from 'express-session';
import { default as passportMiddleware } from './middleware/passport/passport';
import { db } from './database';
//import { router as index } from './routes/index';
import { router as auth } from './routes/auth';

db.sequelize.sync({ force: true });

export var app = express();


// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
passportMiddleware(app, db);
app.use("/auth", auth);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  (<any>err).status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err

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


