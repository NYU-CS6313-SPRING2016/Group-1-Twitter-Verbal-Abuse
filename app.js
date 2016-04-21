var express = require('express')
    , app = module.exports = express();
var path = require('path');
var consume = require('./consume.js');

app.engine('.html', require('ejs').__express);

app.configure(function() {
    app.set( 'x-powered-by', false);
    app.set( 'views', __dirname + '/views' );
    app.set( 'view engine', 'html' );
    app.use( express.static( path.join( __dirname, 'public' ) ) );
});  

process.on('uncaughtException', function(err) {
  console.log(err);
});

app.get('/', function(req, res){
	consume.getTweets();
  	res.render('TwitterTest', {});
});

app.listen(3000);
