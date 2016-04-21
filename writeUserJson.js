//直接写函数了
用户这个可以每次读取top10就行。然后写进json
//然后根据读到的key做查询在数据库

function findTopUser(callback){
  var user = [];
  client.query('SELECT screen_name, COUNT(*) AS aresult FROM `tweet` GROUP BY screen_name ORDER BY `aresult` DESC',function(err,rows) {
    if(err) {throw err;}

    for (var i = 0; i < 10; i++) {
        user.push({"key":rows[i]['screen_name'],'value':rows[i]['aresult']});
    }

});
setTimeout(function() {
  // 4. Finished async operation,
  //    call the callback passing the result as argument
  callback(user);
}, Math.random() * 1000);
}

ModifyUserJson(function(result){
  var final = JSON.stringify(result);
  fs.writeFileSync('public/Json/!!!!!!!TOPUSER!!!!!!.json', final);
  console.log("JSON saved to my.json");
});
