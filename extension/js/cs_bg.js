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

var settings_bg_query = browser.storage.sync.get(["customBackground", "bg_url", "darktheme"]);

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
	
	if(window.location.href.match(/^https?:\/\/(www\.)?crunchyroll\.com(\/[a-z]{2}(-[a-z]{2})?)?(\/((anime-)?news(.*)|videos\/(anime|drama)))?\/?$/)) {
		//console.log("+++ !!! ---- Is splashlink site ! --- !!! +++");
		replaceBackground_splashlink(mutateNodeStyle);
	} else {
		//console.log("+++ !!! ---- Non splashlink site ! --- !!! +++");
		/* The following solves a potential problem (depending on the background image) with series
           episode list sites, where there is no background for container and text is hard to read */
		colour_main_container(settings.darktheme);
	}
	
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
	//As this is called at document_idle, if there's no body now, something went terribly wrong
	// Also (www.)crunchyroll, does not have raw txt or img pages, they are at img1.ak and similar subdomains
}

function colour_main_container(darktheme) {
	var colour;

	console.log("---- Fix container !");
	if(darktheme) colour = '#34343B';
	else colour = '#f2f2f2';
	var css = document.createElement('style');
	css.type = "text/css";
	css.title = "CRFix-general"
	// If CR did not mess up way more than expected, there should only be one 'container' (ids are unique)
	css.innerHTML = '\
	div#container.cf { \
	    background-color: '+colour+'; \
	}\
  	';
  document.getElementsByTagName('head')[0].appendChild(css);
}

settings_bg_query.then(replaceBackground, onError);

