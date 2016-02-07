"use strict";
var parent = document.getElementById("content"),
	currentDir = "",
	currentJSON = {},
    treeJSON = {};
function goHome() {
    currentDir = "";
    updateDivs();
}
function goDown(dir) {
	currentDir += "/" + dir;
    updateDivs();
}

function goUp() {
	if(currentDir == "") {
		return;
	}
	for(var i = currentDir.length - 1; i > 0; i--) {
		if(currentDir.substring(i, i + 1) == "/") {
			currentDir = currentDir.substring(0, i);
			break;
		}
	}
    updateDivs();
}
function updateDivs() {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    if(currentDir == "") {
        parent.appendChild(cards[0]);
        parent.appendChild(cards[1]);
    } else {
        getJSON();
    }
}
function getJSON() {
	$.getJSON(currentDir + "/metadata.json", function(json) {
		currentJSON = JSON.parse(json);
		console.log(currentJSON);
	});
	
	//getAsText(currentDir + "/metadata.json");
}
function readConfig() {
	var r = [];
    /*
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "covalence.conf", false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText.split("\n");
                console.log(allText);
               
                for(var i = 0; i < temp.length; i++) {
                    if(allText[i] != "Music" && allText[i] != "Photos" && allText[i] != "") {
                        r.push(allText[i]);      
                    }
                }
            }
        }
    }
    rawFile.send(null);*/
    jQuery.ajax({
        url: "covalence.conf", 
        success: function(data) {
		    var temp = data.split("\n");
            for(var i = 0; i < temp.length; i++) {
                if(temp[i] != "Music" && temp[i] != "Photos" && temp[i] != "") {
                   if(i > r.length) {
                        r.push(temp[i]);      
                    }
                }
            }
        },
        async: false
	});
    
    console.log(r);
    return r;
}
var cards = [];
var temp = document.createElement("div");
temp.className = "card";
temp.innerHTML = "Music"
temp.onclick = goDown(readConfig())[0];
cards.push(temp);
parent.appendChild(temp);
temp = document.createElement("div");
temp.className = "card";
temp.innerHTML = "Photos"
temp.onclick = goDown(readConfig())[1];
cards.push(temp);
parent.appendChild(temp);
console.log("asdfasdf");
content.appendChild(document.createElement("button"));
