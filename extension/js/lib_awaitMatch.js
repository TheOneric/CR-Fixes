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




