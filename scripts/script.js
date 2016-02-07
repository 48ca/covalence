"use strict";
var parent = document.getElementById("content"),
	currentDir = "",
	currentJSON = {},
    treeJSON = {};

$.ajaxSetup({
    async: false
});
var cards = [];
var temp = document.createElement("div");
temp.className = "card";
var tempInner = document.createElement("div");
tempInner.className = "card-icon";
tempInner.style.backgroundImage = "url('icons/music.svg')";
temp.appendChild(tempInner);
temp.innerHTML = temp.innerHTML + "Music";
var asdf = readConfig();
console.log(asdf);
temp.onclick = goDown(asdf[0]);
cards.push(temp);
parent.appendChild(temp);

temp = document.createElement("div");
temp.className = "card";
tempInner = document.createElement("div");
tempInner.className = "card-icon";
tempInner.style.backgroundImage = "url('icons/camera.svg')";
temp.appendChild(tempInner);
temp.innerHTML = temp.innerHTML + "Photos"
temp.onclick = goDown(readConfig()[1]);
cards.push(temp);
parent.appendChild(temp);


function goHome() {
    currentDir = "";
    updateDivs();
}
function goDown(dir) {
	currentDir += dir;
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
        console.log(currentDir);
        getJSON();
        cards = []
        var arr = currentJSON["files"]
        var temp2;
        for(var i = 0; i < arr.length; i++) {
                /*var temp = document.createElement("div");
                temp.className = "card";
                var tempInner = document.createElement("div");
                tempInner.className = "card-icon";
                tempInner.style.backgroundImage = "url('" + arr[i]+ "')";
                temp.appendChild(tempInner);
                temp.innerHTML = temp.innerHTML + arr[i];
                temp.onclick = goDown(currentJSON);
                cards.push(temp);
                parent.appendChild(temp);
                */
                console.log(arr[i]);
        }
    }
}
function getJSON() {
	$.getJSON(currentDir + "/metadata.json", function(json) {
		currentJSON = json;
	});
	//getAsText(currentDir + "/metadata.json");
}
function readConfig() {
	var r = [];
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


var Module = class {
    constructor(url) {
        var temp = document.createElement("div");
        temp.className = "card";
        var tempInner = document.createElement("div");
        tempInner.className = "card-icon";
        tempInner.style.backgroundImage = "url('" + url + "')";
        temp.appendChild(tempInner);
        temp.innerHTML = temp.innerHTML + url;
        temp.onclick = goDown(currentJSON);
        cards.push(temp);
        parent.appendChild(temp);

    }
}
