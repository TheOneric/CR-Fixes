'use strict';
/**
*   This file is part of CR-Fixes.
*
*    CR-Fixes is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
*
*    CR-Fixes is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with CR-Fixes.  If not, see <http://www.gnu.org/licenses/>.
*
*	Copyright 2019  Oneric  https://github.com/TheOneric , https://oneric.de
* */
var settings_dt_query = browser.storage.sync.get(["darktheme"]);

function onError(e) {
	console.log("Error; "+e);
}

function init(settings) {
	if(!settings.darktheme)
		return;
	
	if(document.head)
		crf_addDarktheme();
	else {
		var counter = 0;
		var poller = setInterval(function(){
            var skin = document.querySelector('#template_skin_splashlink');
            if(skin !== null) {
                clearInterval(poller);
             	crf_addDarktheme();
            }
			counter++;
			console.log("Polled "+counter+" times.");
			if(counter > 75) {
				clearInterval(poller);
				console.log("[CRF] Failed to add darktheme due to hitting time limit.");
			}
        }, 10);
	}
}

function messageEvent(msg) {
	if(msg.command === "crf_removeDarktheme")
		crf_removeDarktheme();
	else if(msg.command === "crf_addDarktheme")
		crf_addDarktheme();
}

settings_dt_query.then(init, onError);


browser.runtime.onMessage.addListener(messageEvent);


