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

	Copyright 2019  Oneric
*/

//@require lib_general.js

var settings_bg_query = browser.storage.sync.get(["customBackground", "bg_url", "bg_force", "darktheme"]);


function replaceBackground(settings) {
	if(!settings.customBackground || !settings.bg_url)
		return;   
	
	
	var mutateNodeStyle = function(node, force = false) {
		if(!force && window.getComputedStyle(node, null).backgroundImage != 'none') return;
		crfLogInfo("Set bg …");
		node.style.backgroundImage = 'url('+settings.bg_url+')';
		node.style.backgroundPosition = 'center 0px';
		node.style.backgroundAttachment = 'fixed';
	}
	
	// Always replace body background image in case splashlink fails to load
	replaceBackground_simple(mutateNodeStyle, settings.bg_force);
	
	if(window.location.href.match(/^https?:\/\/(www\.)?crunchyroll\.com(\/[a-z]{2}(-[a-z]{2})?)?(\/((anime-)?news(.*)|videos\/(anime|drama)))?\/?$/)) {
		crfLogDebug("+++ !!! ---- Is splashlink site ! --- !!! +++");
		replaceBackground_splashlink(mutateNodeStyle);
	} else {
		//console.log("+++ !!! ---- Non splashlink site ! --- !!! +++");
		/* The following solves a potential problem (depending on the background image) with series
           episode list sites, where there is no background for container and text is hard to read */
		colour_main_container(settings.darktheme);
	}
	
}

function replaceBackground_splashlink(setStyle) {	
	
	awaitMatch('#template_skin_splashlink', n => {setStyle(n, true); crfLogDebug("found splash_link");});
	return;
}

function replaceBackground_simple(mutateStyleFun, force) {
	var target = document.querySelector('body'); //Returns first body => main body, no iframe etc
	if(!!target) mutateStyleFun(target, force);
	else crfLogError('No body in DOM! o_0'); 
	//As this is called at document_idle, if there's no body now, something went terribly wrong
	// Also (www.)crunchyroll, does not have raw txt or img pages, they are at img1.ak and similar subdomains
}

// TODO Update the colour when toggling darkmode via popup
function colour_main_container(darktheme) {
	var colour;

	crfLogInfo("---- Fix container !");
	if(darktheme) colour = '#34343B';
	else colour = '#f2f2f2';
	var css = document.createElement('style');
	css.type = "text/css";
	//css.title = "CRFix-general"
	// If CR did not mess up way more than expected, there should only be one 'container' (ids are unique)
	css.innerHTML = '\
	div#container.cf { \
	    background-color: '+colour+'; \
	}\
  	';
  document.getElementsByTagName('head')[0].appendChild(css);
}

settings_bg_query.then(replaceBackground, crfLogError);

