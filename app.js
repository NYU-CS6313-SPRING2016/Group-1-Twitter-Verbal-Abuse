
var twitter         = require('twitter'),
    sentiment       = require('sentiment'),
    mysql           = require('mysql'),
    credentials     = require('./credentials.js');

var express = require('express')
    , app = module.exports = express();
var path = require('path');
var consume = require('./consume.js');

app.engine('.html', require('ejs').__express);


    app.set( 'x-powered-by', false);
    app.set( 'views', __dirname + '/views' );
    app.set( 'view engine', 'html' );
    app.use( express.static( path.join( __dirname, 'public' ) ) );
  

process.on('uncaughtException', function(err) {
  console.log(err);
});

app.get('/', function(req, res){
	consume.connectSQL();
	consume.getTweets();
  	res.render('TwitterTest', {});
});

app.listen(4000);
