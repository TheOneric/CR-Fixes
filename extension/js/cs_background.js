/*
*   This file is part of CR-Fixes.

    CR-Fixes is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.

    CR-Fixes is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.

	Copyright 2019  Oneric  https://github.com/TheOneric , https://oneric.de
*/
/*
* content_sript:  run_at:  idle
*/


var URL = window.location.href;

/** Set some flags */
var is_splashlink_site = URL.match(/^https?:\/\/(www\.)?crunchyroll\.com(\/(en-gb|[a-z]{2}(-[a-z]{2})?|news|videos\/(anime|drama)))?\/?$/);

/** Load settings */
var settings_query = browser.storage.sync.get("customBackground", "bg_url");


/** Functions **/

function replaceBackground(settings) {
    var img_url = browser.runtime.getURL("img/cr-background-template.png");
	console.log("IMG_URL: "+img_url); //DEBUG
	var replacementStyle = "background-image: url("+img_url+"); background-position: center 0px; background-attachment: fixed;";
	//var replacementStyle = "background-image: url(https://img1.ak.crunchyroll.com/i/spire3/76b1e3156f1a96f127bd18e49228b2711545223046_main.jpg); background-position: center 0px; background-attachment: fixed;"
	
    var targetNode = document.querySelector("#template_skin_splashlink");
    if (targetNode !== null) {
        targetNode.style = replacementStyle;
		print("Replaced BG_IMG."); //DEBUG
    } else {
        console.log("WARNING: Cannot replace background image, because 'template_skin_splashlink' does not exist ! \n Waiting for elemnt to be added.");
        var poller = setInterval(function(){
            var skin = document.querySelector('#template_skin_splashlink');
            if(skin !== null) {
                clearInterval(poller);
		        targetNode.style = replacementStyle;
				print("Replaced BG_IMG."); //DEBUG
            }
        }, 50);
    }
}



function do_stuff(settings) {
	if(is_splashlink_site && settings.customBackground) {
		console.log("Attempt to replace Background !"); //DEBUG
		replaceBackground();
	}
}

function onError(error) {
  console.log(`Error: ${error}`);
}

settings_query.then(do_stuff, onError);
console.log("----- cs_background.js loaded !");

(function() {
	
    var targetNode = document.querySelector("#template_skin_splashlink");
    if (targetNode !== null) {
        targetNode.style = "background-image: url(https://img1.ak.crunchyroll.com/i/spire3/76b1e3156f1a96f127bd18e49228b2711545223046_main.jpg); background-position: center 0px; background-attachment: fixed;";
		print("Replaced BG_IMG."); //DEBUG
    } else {
        console.log("WARNING: Cannot replace background image, because 'template_skin_splashlink' does not exist ! \n Waiting for elemnt to be added.");
        var poller = setInterval(function(){
            var skin = document.querySelector('#template_skin_splashlink');
            if(skin !== null) {
                clearInterval(poller);
		        targetNode.style = "background-image: url(https://img1.ak.crunchyroll.com/i/spire3/76b1e3156f1a96f127bd18e49228b2711545223046_main.jpg); background-position: center 0px; background-attachment: fixed;";
				print("Replaced BG_IMG."); //DEBUG
            }
        }, 50);
    }
}).();



