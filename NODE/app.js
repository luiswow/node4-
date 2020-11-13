
require('newrelic');
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('./config/passport');
var session = require('express-session');
const jwt = require('jsonwebtoken');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var reservasRouter = require('./routes/reservas');
var tokenRouter = require('./routes/token');

var bicicletasAPIRouter = require('./routes/api/bicicletas');
var usuariosAPIRouter = require('./routes/api/usuarios');
var reservasAPIRouter = require("./routes/api/reserva");
const authAPIRouter = require('./routes/api/auth');

const Usuario = require('./models/usuario');
const Token = require('./models/token');
const store = new session.MemoryStore;

// let store;
// if (process.env.NODE_ENV === 'development') {
//   store = new session.MemoryStore;
// } 
// else {
//   store = new MongoDBStore({
//     uri: process.env.MONGO_URI,
//     collection: 'sessions'
//   });
//   store.on('error', function(error) {
//     assert.ifError(error);
//     assert.ok(false);
//   });
// }


let app = express();

app.set('secretKey', 'jwt_pwd_!!223344');

app.use(session({
  cookie: {maxAge: 240 * 60 * 60 * 1000}, 
  store: store,
  saveUninitialized: true,
  resave: 'true',
  resave: 'true',
  secret: 'red_bicis_!!!****!".!".!"..1234' 
})
)

var mongoose = require('mongoose');

 
 var mongoDB = "mongodb://localhost:27017/red_bicicletas";
 //var mongoDB = "mongodb+srv://admin:123789jm@red-bicicletas.s0wih.mongodb.net/<dbname>?retryWrites=true&w=majority";
 var mongoDB = process.env.MONGO_URI;
 mongoose.connect(mongoDB, { 
 	useNewUrlParser: true,
    useUnifiedTopology: true 
     });
 mongoose.Promise = global.Promise;
 var db = mongoose.connection;
 db.on('error', console.error.bind('MongoDB connection error'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', function(req, res){
  res.render('session/login');
});

app.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, usuario, info){
  	 if(err) return next(err);
  	 if(!usuario) return res.render('session/login', {info});

  	  req.logIn(usuario, function(err){
      if(err) return next(err);
      return res.redirect('/');
  });
  	}) (req, res, next);
});

app.get('/logout', function(req, res){
  req.logOut(); 
  res.redirect('/');
});

app.get('/forgotPassword', function(req, res){
  res.render('session/forgotPassword');
});

app.post('/forgotPassword', function(req, res){
  Usuario.findOne({email: req.body.email}, function(err, usuario){
  	if(!usuario) return res.render('session/forgotPassword', {info: {message: 'No existe la clave'}});
   
     usuario.resetPassword(function (err){
      if(err) return next(err);
      console.log('session/forgotPasswordMessage');
    });

    res.render('session/forgotPasswordMessage');
  });
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicicletasRouter);
app.use("/reservas", reservasRouter);
app.use('/token', tokenRouter);


app.use('/api/bicicletas', loggedIn, bicicletasAPIRouter);
app.use('/api/usuarios', validarUsuario, usuariosAPIRouter);
app.use('/api/reserva', reservasAPIRouter);
app.use('/api/auth', authAPIRouter);

app.use('/privacy_policy', function(req, res) {
  res.sendFile('public/privacy_policy.html');
});

app.use('/google057eb0eae89012c2', function(req, res) {
  res.sendFile('public/google057eb0eae89012c2.html');
});


app.get('/auth/google',
  passport.authenticate('google', {
     scope:[
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read' ]}));

app.get( '/auth/google/callback', passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/error'
    })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log('user sin loguearse');
    res.redirect('/login')
  }
}


function validarUsuario(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({
        status: "error",
        message: err.message,
        data: null
      });
    } else {
      req.body.userId = decoded.id;
      console.log('jwt verifyt: ', decoded);
      next();
    }
  });
}




module.exports = app;
