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
			mosettings = {attributes: true, characterData:false, childList: true, subtree: true}
	) {
	var state = {matched: false};
	var mobserver;
	var foundMatch = function(node) {state.matched = true; onMatch(node); mobserver.disconnect();}
	function callback(mrecords) {
		for(var i = 0; i < mrecords.length; i++) {
			var m = null;
			if(mrecords[i].type === "attributes")
			{
				if(mrecords[i].target.matches(selector))
					m = mrecords[i];
			}
			else if(mrecords[i].type === "childList")
			{
				//Removal of nodes should not affect selector matches, thus we only check addedNodes
				for(var j = 0; j < mrecords[i].addedNodes.length; j++) {
					if(mrecords[i].addedNodes[j].matches(selector)) {
						m = mrecords[i].addedNodes[j];
						break;
					}
				}
			}
			else {
				console.log("[CRF] Unexpected mrecord of unknown type:");
				console.log(mrecords[i]);
			}
			
			if(m !== null) {
				foundMatch(m);
				return;
			}
			
		}
	}

	/* It is necessary to set up and initialise the MObserver BEFORE we check if element is already
	 * present, as otherwise there is a timeframe between our intial check and the modserver.observe
	 * call, where we might miss the change that produces the match.
	 * In order to deal with the possibility that mobserver might find a match before we can call our
	 * 'initial' check, the state object was introduced.
	 * */
	mobserver = new MutationObserver(onMatch);
	mobserver.observe(root, mosettings);
	var matches = root.querySelectorAll(selector);
	if(matches.length > 0) {
		mobserver.disconnect();
		if(state.matched === false) {
			state.matched = true;
			onMatch(matches[0]);
		}
	}
}

