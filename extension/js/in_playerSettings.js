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



var settings_vt_query = browser.storage.sync.get(["quality", "sub_lang"]);

function onError(e) {
	console.log("Error: "+e);
}

///////////////////////////////////////  LIB_AWAITMATCH.JS  ////////////////////////////////////////
//#INCLUDE extension/js/lib_awaitMatch.js
//-------------------------------------  LIB_AWAITMATCH.JS  --------------------------------------//

///////////////////////////////////////  LIB_PLAYERMENU.JS  ////////////////////////////////////////
//#INCLUDE extension/js/lib_playerMenu.js
//-------------------------------------  LIB_PLAYERMENU.JS  --------------------------------------//



function choosePlayerSettings(esettings) {
	console.log("Choose Quality:"+esettings.quality+"  –  Subs:"+esettings.sub_lang);
	if(esettings.quality && esettings.quality !== "none") {
		//Wait for CR to init menu and selects its default based on cookies and whatnot
		console.log("Search for: "+QUALITY_SELECTOR+''+SELECTED_ATTRIBUTE);
		awaitMatch(QUALITY_SELECTOR+SELECTED_ATTRIBUTE, 
			node => {
				console.log(node);
				//If CR quality selection matches user's wishes, then there is nothing to do
				if(!node.textContent.toLowerCase().includes(esettings.quality))
					setQuality(esettings.quality, node);
			},
		undefined, undefined, undefined, undefined, false);/**/
	}
	if(esettings.sub_lang && esettings.sub_lang !== "") {
		console.log("Attempt to set SubLanguage …");
		console.log("Search for: "+SUBLANG_SELECTOR+''+SELECTED_ATTRIBUTE);
		awaitMatch(SUBLANG_SELECTOR+SELECTED_ATTRIBUTE, 
			node => {
				console.log(node);
				//If CR quality selection matches user's wishes, then there is nothing to do
    var firstOpt = esettings.sub_lang.split(';')[0].trim();
	var currSLan = node.textContent.toString().trim();
    if(!currSLan.startsWith(firstOpt))
					setSubLang(esettings.sub_lang, node);
			},
		undefined, undefined, undefined, undefined, false);/**/
	}
}







if(window.location.href.match(/https:\/\/static\.crunchyroll\.com\/vilos\/player\.html/)) {	
	console.log("Executed in-script from:"+window.location.href);
	//injectLibs();
	settings_vt_query.then(choosePlayerSettings, onError);
} else {
	console.log("Not a player-frame: "+window.location.href);
}

//Set Promise return value
undefined;
