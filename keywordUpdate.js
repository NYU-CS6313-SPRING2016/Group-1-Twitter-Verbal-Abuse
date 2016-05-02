var fs = require('fs');
var path = require('path');
var groupUpdate = require('./groupUpdate.js');
var jsonKey = JSON.stringify([{"key":"beeyotch","value":0},{"key":"biatch","value":0},{"key":"bitch","value":0},{"key":"chinaman","value":0},{"key":"chinamen","value":0},{"key":"crip","value":0},{"key":"cunt","value":0},{"key":"dago","value":0},{"key":"daygo","value":0},{"key":"dego","value":0},{"key":"dick","value":0},{"key":"douchebag","value":0},{"key":"dyke","value":0},{"key":"fag","value":0},{"key":"fatass","value":0},{"key":"fatso","value":0},{"key":"gash","value":0},{"key":"gimp","value":0},{"key":"golliwog","value":0},{"key":"gook","value":0},{"key":"gyp","value":0},{"key":"homo","value":0},{"key":"hooker","value":0},{"key":"jap","value":0},{"key":"kike","value":0},{"key":"kraut","value":0},{"key":"lame","value":0},{"key":"lardass","value":0},{"key":"lesbo","value":0},{"key":"negro","value":0},{"key":"nigga","value":0},{"key":"nigger","value":0},{"key":"paki","value":0},{"key":"pickaninny","value":0},{"key":"pussy","value":0},{"key":"raghead","value":0},{"key":"retard","value":0},{"key":"shemale","value":0},{"key":"skank","value":0},{"key":"slut","value":0},{"key":"spade","value":0},{"key":"spic","value":0},{"key":"spook","value":0},{"key":"tard","value":0},{"key":"tits","value":0},{"key":"titt","value":0},{"key":"trannies","value":0},{"key":"tranny","value":0},{"key":"twat","value":0},{"key":"wetback","value":0},{"key":"whore","value":0},{"key":"wop","value":0}]);

function keywordUpdate(/* text content*/ text) {
	var words = [];
	var json = JSON.parse(jsonKey);
	var lowerText = text.toLowerCase();
	for (key in json) {
		if (lowerText.indexOf(json[key]["key"]) > -1) {
			json[key]["value"]++;
			words.push(json[key]["key"]);
		}
	}
	groupUpdate.updateGroup(words);
	jsonKey = JSON.stringify(json);
	exports.jsonKey = jsonKey;
}
exports.keywordUpdate = keywordUpdate;