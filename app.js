'use strict'

const request        = require('request'),
      express        = require('express'),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      passport       = require('passport'),
      passportLocal  = require('passport-local'),
      methodOverride = require('method-override'),
      User           = require('./models/user'),
      flash          = require('connect-flash'),
      session        = require('express-session'),
      apiRoutes      = require('./routes/api'),
      gifRoutes      = require('./routes/gif'),
      port           = process.env.PORT,
      indexRoutes    = require('./routes/index'),
      app            = express();

//Mongoose Setup
const db = process.env.DATABASE;
mongoose.connect(db, {useNewUrlParser: true});

//EXPRESS SETUP
const arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static('public'))

//PASSPORT SETUP
app.use(session({
    secret: "Random Text",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.arr = arr;
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success');
    next();
})
app.use(indexRoutes);
app.use(gifRoutes);
app.use(apiRoutes);






app.listen(port, function(){
    console.log('I Got You!!')
})