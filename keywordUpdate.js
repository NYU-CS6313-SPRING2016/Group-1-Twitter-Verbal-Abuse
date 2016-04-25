var fs = require('fs');
var path = require('path');

function keywordUpdate(/* text content*/ text) {
	var key = {};
	var config = fs.readFileSync(__dirname + '/public/JSON/abusiveWords.json');
	var json = JSON.parse(config);
	
	var lowerText = text.toLowerCase();
	for (key in json) {
		if (lowerText.indexOf(json[key]["key"]) > -1) {
			json[key]["value"]++;
		}
	}
	fs.writeFileSync(__dirname + '/public/JSON/abusiveWords.json', JSON.stringify(json));
}
exports.keywordUpdate = keywordUpdate;