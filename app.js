
/**
 * Module dependencies.
 */

var express = require('express')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var passport = require('passport');
var expressSession = require('express-session');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');


// all environments
app.set('port', 3000);
//app.set('hostname', '127.0.0.1')
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(favicon);
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());
//app.use(methodOverride);
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var info = require('./routes/getinfo')
//var balance = require('./routes/getaddressbalance')
var gettrans = require('./routes/gettransaction')
var trans = require('./routes/transferasset')
//app.get('/info', info.getinfo);
//app.get('/balance', balance.getaddressbalance);
app.get('/transactions', gettrans.gettransactions);
app.post('/transfer', trans.transfer);

//app.get('/users', user.list);
/*app.get('/', function(req, res){
    res.send('Hello World\n');
});*/




//mongoose.connect(dbConfig.url);



var dbConfig = require('./config/database.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/passport');
require('./config/passport')(passport);

//Configuring Passport

app.use(expressSession({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



require('./routes/route.js')(app, passport);

//app.listen();

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



