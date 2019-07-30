'use strict';
/*
*   This file is part of CR-Fixes.

    CR-Fixes is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    CR-Fixes is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with CR-Fixes.  If not, see <http://www.gnu.org/licenses/>.

	Copyright 2019  Oneric  https://github.com/TheOneric , https://oneric.de
*/

var settings_bg_query = browser.storage.sync.get(["customBackground", "bg_url"]);

function onError(e) {
	console.log("Error: "+e);
}

function replaceBackground(settings) {
	if(!settings.customBackground || !settings.bg_url)
		return;   
	
	var target_style = "background-image: url("+settings.bg_url+"); background-position: center 0px; background-attachment: fixed;";
	var mutateNodeStyle = function(node) {
		node.style.backgroundImage = 'url('+settings.bg_url+')';
		node.style.backgroundPosition = 'center 0px';
		node.style.backgroundAttachement = 'fixed';
	}
	
	// Always replace body background image in case splashlink fails to load
	replaceBackground_simple(mutateNodeStyle);
	
	if(window.location.href.match(/^https?:\/\/(www\.)?crunchyroll\.com(\/[a-z]{2}(-[a-z]{2})?)?(\/(news|videos\/(anime|drama)))?\/?$/)) {
		//console.log("+++ !!! ---- Is splashlink site ! --- !!! +++");
		replaceBackground_splashlink(mutateNodeStyle);
	} /*else {
		console.log("+++ !!! ---- Non splashlink site ! --- !!! +++");
	}*/
	
}

function replaceBackground_splashlink(setStyle, target_style) {	
	
    var targetNode = document.getElementById("template_skin_splashlink");
    if (targetNode !== null) {
        //targetNode.style = target_style;
		setStyle(targetNode);
		//console.log("Replaced Bg at first try !");
    } else {
		//TODO Replace with more elegant DOMMuationObserver
        //console.log("WARNING: Cannot replace background image, because 'template_skin_splashlink' does not exist ! \n Waiting for elemnt to be added.");
        var poller = setInterval(function(){
            var skin = document.querySelector('#template_skin_splashlink');
            if(skin !== null) {
                clearInterval(poller);
                //skin.style = target_style;
				setStyle(skin);
            }
        }, 50);
    }
}

function replaceBackground_simple(mutateStyleFun) {
	var target = document.querySelector('body'); //Returns first body => main body, no iframe etc
	if(!!target) mutateStyleFun(target);
	else onError('No body in DOM! o_0'); 
	//Remember: This is called at document_idle, if there's no body now, something went terribly wrong
	// Also (www.)crunchyroll, does not have raw txt or img pages, they are at img1.ak and similar subdomains
}

settings_bg_query.then(replaceBackground, onError);
