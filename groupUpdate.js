var groupMap = {};
var groupJson = JSON.stringify([{key : "Women", value : 0}, {key : "Black", value : 0}, {key : "Homosexuality", value : 0}, {key : "Different_regions", value : 0}, {key : "Body_form", value : 0}]);

groupMap["beeyotch"] = "Women";
groupMap["biatch"] = "Women";
groupMap["bitch"] = "Women";
groupMap["cunt"] = "Women";
groupMap["dyke"] = "Women";
groupMap["gash"] = "Women";
groupMap["lesbo"] = "Women";
groupMap["pussy"] = "Women";
groupMap["shemale"] = "Women";
groupMap["skank"] = "Women";
groupMap["slut"] = "Women";
groupMap["tits"] = "Women";
groupMap["titt"] = "Women";
groupMap["whore"] = "Women";

groupMap["golliwog"] = "Black";
groupMap["negro"] = "Black";
groupMap["nigga"] = "Black";
groupMap["nigger"] = "Black";
groupMap["pickaninny"] = "Black";
groupMap["spade"] = "Black";
groupMap["spook"] = "Black";

groupMap["dyke"] = "Homosexuality";
groupMap["fag"] = "Homosexuality";
groupMap["homo"] = "Homosexuality";
groupMap["lesbo"] = "Homosexuality";

groupMap["chinaman"] = "Different_regions";
groupMap["chinamen"] = "Different_regions";
groupMap["dago"] = "Different_regions";
groupMap["daygo"] = "Different_regions";
groupMap["dego"] = "Different_regions";
groupMap["gook"] = "Different_regions";
groupMap["jap"] = "Different_regions";
groupMap["kike"] = "Different_regions";
groupMap["kraut"] = "Different_regions";
groupMap["paki"] = "Different_regions";
groupMap["raghead"] = "Different_regions";
groupMap["spic"] = "Different_regions";
groupMap["wetback"] = "Different_regions";
groupMap["wop"] = "Different_regions";

groupMap["crip"] = "Body_form";
groupMap["fatass"] = "Body_form";
groupMap["gimp"] = "Body_form";
groupMap["lame"] = "Body_form";
groupMap["lardass"] = "Body_form";
groupMap["trannies"] = "Body_form";
groupMap["tranny"] = "Body_form";



function updateGroup(words) {
	var json = JSON.parse(groupJson);
	for (word in words) {
		findGroup(groupMap[words[word]], json);
	}
	groupJson = JSON.stringify(json);
	exports.groupJson = groupJson;
}
function findGroup(group, json) {
	for(groups in json) {
		if (group == json[groups]["key"]) {
			json[groups]["value"]++;
		}
	}
}
exports.updateGroup = updateGroup;