"use strict";
var parent = document.getElementById("content"),
	currentDir = "/",
	currentJSON = {};
function goDown(dir) {
	currentDir += "/" + dir;
}
function goUp() {
	if(currentDir == "/") {
		return;
	}
	for(var i = currentDir.length - 1; i > 0; i--) {
		if(currentDir.substring(i, i + 1) == "/") {
			currentDir = currentDir.substring(0, i);
			break;
		}
	}
}
function getJSON() {
	$.getJSON(currentDir + "/metadata.json", function(json) {
		currentJSON = JSON.parse(json);
		console.log(currentJSON);
	});
	
	//getAsText(currentDir + "/metadata.json");
}
readConfig();
var cards = [];
function readConfig() {
	jQuery.get("covalence.conf", function(data) {
		console.log(data);
	});
}
cards.push(document.createElement("div"));
content.appendChild(document.createElement("button"));

