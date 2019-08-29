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

////////////////////////////////////////  LIB_GENERAL.JS  //////////////////////////////////////////
//#INCLUDE extension/js/lib_general.js
//--------------------------------------  LIB_GENERAL.JS  ----------------------------------------//
///////////////////////////////////////  LIB_AWAITMATCH.JS  ////////////////////////////////////////
//#INCLUDE extension/js/lib_awaitMatch.js
//-------------------------------------  LIB_AWAITMATCH.JS  --------------------------------------//

///////////////////////////////////////  LIB_PLAYERMENU.JS  ////////////////////////////////////////
//#INCLUDE extension/js/lib_playerMenu.js
//-------------------------------------  LIB_PLAYERMENU.JS  --------------------------------------//



function choosePlayerSettings(esettings) {
	crfLogInfo("Choose Quality:"+esettings.quality+"  –  Subs:"+esettings.sub_lang);
	if(esettings.quality && esettings.quality !== "none") {
		//Wait for CR to init menu and selects its default based on cookies and whatnot
		crfLogDebug("Search for: "+QUALITY_SELECTOR+''+SELECTED_ATTRIBUTE);
		awaitMatch(QUALITY_SELECTOR+SELECTED_ATTRIBUTE, 
			node => {
				crfLogDebug(node);
				//If CR quality selection matches user's wishes, then there is nothing to do
				if(!node.textContent.toLowerCase().includes(esettings.quality))
					setQuality(esettings.quality, node);
			},
		undefined, undefined, undefined, undefined, false);/**/
	}
	if(esettings.sub_lang && esettings.sub_lang !== "") {
		crfLogDebug("Attempt to set SubLanguage …");
		crfLogDebug("Search for: "+SUBLANG_SELECTOR+''+SELECTED_ATTRIBUTE);
		awaitMatch(SUBLANG_SELECTOR+SELECTED_ATTRIBUTE, 
			node => {
				crfLogDebug(node);
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
	crfLogInfo("Executed in-script from:"+window.location.href);
	//injectLibs();
	settings_vt_query.then(choosePlayerSettings, crfLogError);
} else {
	crfLogInfo("Not a player-frame: "+window.location.href);
}

//Set Promise return value
undefined;
