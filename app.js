
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
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

// all environments
app.set('port', 3000);
//app.set('hostname', '127.0.0.1')
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(favicon);
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());
//app.use(methodOverride);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var info = require('./routes/getinfo')
var balance = require('./routes/getaddressbalance')
var gettrans = require('./routes/gettransaction')
var trans = require('./routes/transferasset')
app.get('/info', info.getinfo);
app.get('/balance', balance.getaddressbalance);
app.get('/transactions', gettrans.gettransactions);
app.post('/transfer', trans.transfer);

//app.get('/users', user.list);
/*app.get('/', function(req, res){
    res.send('Hello World\n');
});*/

//app.listen();

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
