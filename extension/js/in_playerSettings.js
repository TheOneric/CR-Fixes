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
var QUALITY_SELECTOR = '.qualityMenuItemSelector';
var SUBLANG_SELECTOR = '.subtitlesMenuItemSelector';
var SETTING_SELECTOR = '.settingsMenuButton';
var SELECTED_ATTRIBUTE = '.selected';
var CONTROL_BAR_IN_SELECTOR = '.vjs-control-bar.out'

//load libs
//fetch(browser.runtime.getURL("js/lib_awaitMatch.js")).then(r => r.text()).then(t => eval(t));
//fetch(browser.runtime.getURL("js/lib_playerMenu.js")).then(r => r.text()).then(t => eval(t));

function onError(e) {
	console.log("Error: "+e);
}

///////////////////////////////////////  LIB_AWAITMATCH.JS  ////////////////////////////////////////

/**
 * This waits until the first match of selector is found in the document and then executes a callback.
 *
 * @param selector The selector to wait for
 * @param onMatch A callback function to execute when match was found.
 * @param root [optional] The root node to watch. Defaults to document.body
 * @param mosettings [optional] An MutationObserverInit object passed to the .observer() call
 * @returns No return value.
 * */
function awaitMatch(selector, onMatch, 
			root = document.body,      /* characterData changes should not affect a selector match*/
			mosettings = {attributes: true, characterData:false, childList: true, subtree: true},
			minPollTime = 100,
			maxPollTime = 500,
			debug = false
	) {

/* Apparently there is no efficient way to get the corresponding Element object of a Node object
 * thus the way more elegenat, and if it would work, more efficient approach, of 
 * commit cf3c04f90fe1201d20c6134943389895e331df56 does not work  */
	
	var state = {matched: false, lastCall: Date.now(), lastMutant: Date.now()};
	var mobserver;
	var funQ;
	function foundMatch(node) {
		state.matched = true; 
		if(debug) console.log("Found selector:'"+selector+"'");
		onMatch(node); 
		mobserver.disconnect();
		clearTimeout(funQ);
	}

	const searchFor = () => {
		if(debug) console.log("Search now for : '"+selector+"'");
		const m = root.querySelector(selector);
		if (!!m) foundMatch(m);
		state.lastCall = Date.now();
	};
	function callback(m, o) {
		if(state.matched) {
			console.log("Already matched but still receiving muataions …");
			o.disconnect();
			return;
		}
		var now = Date.now();
		clearTimeout(funQ);
		funQ = null;
		if(now - state.lastMutation > (maxPollTime-minPollTime)*2/3+minPollTime) {
			searchFor();
		} else {
			if(now-state.lastCall > maxPollTime) {
				searchFor();
			} else if(now-state.lastCall < minPollTime) {
				funQ = setTimeout(searchFor, minPollTime);
			}
		}
		state.lastMutant = now;
	}

	/* It is necessary to set up and initialise the Mobserver BEFORE we check if element is already
	 * present, as otherwise there is a timeframe between our intial check and the modserver.observe
	 * call, where we might miss the change that produces the match.
	 * In order to deal with the possibility that mobserver might find a match before we can call our
	 * 'initial' check, the state object was introduced.
	 * */
	mobserver = new MutationObserver(callback);
	mobserver.observe(root, mosettings);
	var matches = root.querySelectorAll(selector);
	if(matches.length > 0) {
		mobserver.disconnect();
		if(state.matched === false) {
			state.matched = true;
			onMatch(matches[0]);
		}
	}
	//	eval(``);
}




function periodicCheck(selector, onMatch, 
			root = document.body, 
			pTime = 50,
			debug = false) {

	var m = root.querySelector(selector);
	var c = 1;
	if(m) {
		if(debug) console.log("Found '"+selector+"' on first try");
		onMatch(m);
	} else {
		var p = setInterval(() => {
			++c;
			m = root.querySelector(selector);
			if(debug) console.log(c+". try: '"+selector+"-match: "+m);
			if(!!m) {
				console.log("Matched on "+c+". try.");
				onMatch(m);
				clearInterval(p);
			}
		}, pTime);
	}

}
//-------------------------------------  LIB_AWAITMATCH.JS  --------------------------------------//

///////////////////////////////////////  LIB_PLAYERMENU.JS  ////////////////////////////////////////
/*
 *@param quality Is expected to not be "none". "auto" and all numerical values are accepted
 *@apram selectedNode The node in the settings menu that represents the current selected quality
 * */
function setQuality(quality, selectedNode) {
	if(!selectedNode) selectedNode = document.body.firstChild;
	var all_options = selectedNode.parentNode.querySelectorAll(QUALITY_SELECTOR);
	console.log("QOpt["+all_options.length+"]: "+all_options)
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
			console.log("Found desired quality :  "+all_options[i]);
			all_options[i].click();
			return;
		}
		else {console.log("Is not desired qual :  "); console.log(all_options[i]);}
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
	console.log("SLOpt["+all_options.length+"]: "+all_options);
	console.log("SLOrd["+langOrder.length+"]: "+langOrder);
	for(var j = 0; j < langOrder.length; ++j) {
		for(var i = 0; i < all_options.length; ++i) {
			if(all_options[i].textContent.trim().startsWith(langOrder[j].trim())) {
				console.log("Found desired sublang no."+j+" :  "+all_options[i].textContent);
				all_options[i].click();
				return;
			}
			else {console.log("Is not desired sublang no."+j+" :  "); console.log(all_options[i]);}
		}
	}
}
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
