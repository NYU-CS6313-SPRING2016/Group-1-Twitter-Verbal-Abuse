var credentials = require('./credentials.js');
var twitter = require('twitter');
var sentiment = require('sentiment');
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');

process.on('uncaughtException', function(err) {
  console.log(err);
});

var client = mysql.createConnection({
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: credentials.mysql_username,
  password: credentials.mysql_password,
  database: credentials.mysql_database,
  charset: 'utf8mb4'
});

client.connect();
client.query('DELETE FROM tweet WHERE 1');
var t = new twitter({
  consumer_key: credentials.consumer_key,
  consumer_secret: credentials.consumer_secret,
  access_token_key: credentials.access_token_key,
  access_token_secret: credentials.access_token_secret
});


function parseTwitterDate($stamp) {    
  var date = new Date(Date.parse($stamp));
  var output = date.getUTCFullYear() + '-' + ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' + date.getUTCDate() + ' ' + ('00' + date.getUTCHours()).slice(-2) + ':' + ('00' + date.getUTCMinutes()).slice(-2) + ':' + ('00' + date.getUTCSeconds()).slice(-2);
  return output;
}


function parseTweet(tweet) {

  if ( tweet.lang == 'en' )  { // sentiment module only works on English

  var tweet_id = tweet.id_str;
  var tweet_text = tweet.text;
  var created_at = parseTwitterDate(tweet.created_at);
  var user_id = tweet.user.id_str;
  var screen_name = tweet.user.screen_name;
  var name = tweet.user.name;
  var profile_image_url = tweet.user.profile_image_url;
  var retweets = 0;
  if (tweet.retweeted_status) {
    retweets = tweet.retweeted_status.retweet_count;
  }
  sentiment(tweet.text, function (err, result) { 
    // console.log(tweet.text);
    // console.log(result.score);
    var sentiment_score = result.score
    client.query(
      'INSERT INTO tweet ' +
      'SET tweet_id = ?, tweet_text = ?, created_at = ?, user_id = ?, screen_name = ?, name = ?, profile_image_url = ?, sentiment_score = ?, retweets = ?',
      [tweet_id, tweet_text, created_at, user_id, screen_name, name, profile_image_url, sentiment_score, retweets]
    );
  });

  //  delete old tweets
  client.query( 'DELETE FROM tweet WHERE created_at <  (NOW() + interval 24 hour )' );

  
  ModifyJson(function(result){
    var JsonRes = [];
    //console.log(result);
    for (var key in config) {
      JsonRes.push({"key":config[key]["key"], 'value':result[key]});
    }
    var final = JSON.stringify(JsonRes);
    fs.writeFileSync('public/Json/badwords.json', final);
  });


  updateLive(tweet);


  }
}
var configFile = fs.readFileSync('public/Json/badwords.json');
var config = JSON.parse(configFile);


function ModifyJson(callback){
  var res=[];
  for (var key in config) {
    var word = config[key]["key"];
    client.query('SELECT COUNT(*) AS aresult FROM `tweet` WHERE `tweet_text` LIKE'+'\'%'+word+'%\'',function(err,rows) {
      if(err) {throw err;}
      res.push(rows[0]['aresult']);
      //console.log(res);
    });
  }
  setTimeout(function() {
  // 4. Finished async operation,
  //    call the callback passing the result as argument
    //while (res.length != config.length) {
    //}
    callback(res);
  }, Math.random() * 1000);
}


function updateLive(data) {
  var json = JSON.stringify({
    user : data.user.name,
    text : data.text
  });
  fs.writeFileSync(__dirname + "/public/Json/updateLive.json", json);
}


function getTweets() {
  t.stream('statuses/filter', 
    {track: "beeyotch,biatch,bitch,chinaman,chinamen,chink,crip,cunt,dago,daygo,dego,dick,douchebag,dyke,fag,fatass,fatso,gash,gimp,golliwog,gook,gyp,homo,hooker,jap,kike,kraut,lame,lardass,lesbo,negro,nigga,nigger,paki,pickaninny,pussy,raghead,retard,shemale,skank,slut,spade,spic,spook,tard,tits,titt,trannies,tranny,twat,wetback,whore,wop"},
     function(stream) {
//  t.stream('statuses/sample', function(stream) {
    stream.on('data', function (tweet) {
      //console.log(tweet.text);
      parseTweet(tweet);
    });
    stream.on('error', function(tweet) {
      parseTweet(tweet);
    });
    stream.on('end', function(response) {
      console.error("End:");
      //console.error(response);
      stream.destroy();
      getTweets();
    });
  });
}

exports.getTweets = getTweets;
