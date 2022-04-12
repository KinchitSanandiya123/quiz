var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const jwt = require("jsonwebtoken");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup

const db = require("./config");

app.use(cors());
db.sequelize.sync();



app.use(function(req, res, next){
  console.log(req.path)
  const token = req.headers['x-api-token'];
  if(token){
    /// const token = jwt.sign(insRes, "testabc123");

    
    jwt.verify(token, 'testabc123', function(err, decoded) {
      if(err){
        return res.status(401).json({status:false, message:"Unauthorised", data:{}});
              
      }else{
        db.admin.findOne({
          where:{
            id:decoded.id
          }
        }).then((user)=>{
          if(user){
            req.user = user;
            next();
          }else{
            return res.status(401).json({status:false, message:"Unauthorised", data:{}});
         
          }
        }).catch((err)=>{
          console.log(err, "err")
          return res.status(401).json({status:false, message:"Unauthorised", data:{}});
        })
      }
    });

    
  }else{
    if(["/admin/login"].includes(req.path)){
      next();
    }else{
      return res.status(401).json({status:false, message:"Unauthorised", data:{}});
    }
    
  }
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err, "err")
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});
module.exports = app;
