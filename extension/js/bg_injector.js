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


function injectPlayerMenu(r, s, a) {
	browser.webNavigation.getAllFrames( {tabId: s.tab.id}).then( farray => {
	  const pf = farray.filter(f => f.url.match(/^https:\/\/static\.crunchyroll\.com\/vilos\/player\.html/) );
	  console.log(pf);
	  const fid = pf.length > 0 ? pf[0].frameId : -1;
	  var details;
	  if(fid === -1) details = {file: "/js/in_playerSettings.js", allFrames: true};
	  else details = {file: "/js/in_playerSettings.js", frameId: fid};
	  
	  browser.tabs.executeScript(
	   details
	  ).then(	r => console.log("### Executed in "+(fid===-1?"all":"player")+" subframes. ####"), 
			r => console.log("#### Error: "+r)
	  )
	 }, e => console.log("# Error: "+e)
	);
}

function requestListener(request, sender, response) {
	switch(request.command) {
	  case "CRF_injectPlayerMenu":
		injectPlayerMenu(request, sender, response);
		break;
	  default:
		console.log("Unfamiliar request: "+request.command);
	}
}

browser.runtime.onMessage.addListener(requestListener);

