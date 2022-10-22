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

var QUALITY_SELECTOR = '.qualityMenuItemSelector';
var SUBLANG_SELECTOR = '.subtitlesMenuItemSelector';
var SETTING_SELECTOR = '.settingsMenuButton';
var SELECTED_ATTRIBUTE = '.selected';
var CONTROL_BAR_IN_SELECTOR = '.vjs-control-bar.out'

/*
 *@param quality Is expected to not be "none". "auto" and all numerical values are accepted
 *@apram selectedNode The node in the settings menu that represents the current selected quality
 * */
function setQuality(quality, selectedNode) {
	if(!selectedNode) selectedNode = document.body.firstChild;
	var all_options = selectedNode.parentNode.querySelectorAll(QUALITY_SELECTOR);
	//crfLogDebug("QOpt["+all_options.length+"]: "+all_options)
	const filter = elem => {
		if(!elem) { return false; }
		else if(quality == "auto") {
			return elem.textContent.toLowerCase().match(quality);
		} else {
			//Well I sure hope, they don't add numbers to the class or id names :hime_anxious:
			return parseInt(quality) === parseInt(elem.textContent);
		}
	}
	for(var i = 0; i < all_options.length; ++i) {
		if(filter(all_options[i])) {
			crfLogInfo("Found desired quality :  "+all_options[i]);
			all_options[i].click();
			return;
		}
		else {/*crfLogDebug("Is not desired qual :  "); crfLogDebug(all_options[i]);*/}
	}
}
/*
 *@param langs Is expected to be a non empty string
 *@apram selectedNode The node in the settings menu that represents the current selected sub language
 * */
function setSubLang(langs, selectedNode) {
	if(!selectedNode) selectedNode = document.body.firstChild;
	var all_options = selectedNode.parentNode.querySelectorAll(SUBLANG_SELECTOR);
	var langOrder = langs.split(';');
	//crfLogDebug("SLOpt["+all_options.length+"]: "+all_options);
	//crfLogDebug("SLOrd["+langOrder.length+"]: "+langOrder);
	for(var j = 0; j < langOrder.length; ++j) {
		for(var i = 0; i < all_options.length; ++i) {
			if(all_options[i].textContent.trim().startsWith(langOrder[j].trim())) {
				crfLogInfo("Found desired sublang no."+j+" :  "+all_options[i].textContent);
				all_options[i].click();
				return;
			}
			else {/*crfLogDebug("Is not desired sublang no."+j+" :  "); crfLogDebug(all_options[i]);*/}
		}
	}
}


