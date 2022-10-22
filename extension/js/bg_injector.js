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
*	Copyright 2019  Oneric
* */

//@require lib_general.js
//@require ../extension_pages/settings.js

function injectPlayerMenu(r, s, a) {
	browser.tabs.executeScript(
	  {
		file: "/js/in_playerSettings.js",
		//code: `console.log("Executed in-script from:"+window.location.href);`,
		allFrames: true
	  }
	).then(	r => crfLogDebug("### Executed in all subframes. ####"), 
			r => crfLogError(r)
	);
}


function requestListener(request, sender, response) {
	switch(request.command) {
	  case "CRF_injectPlayerMenu":
		injectPlayerMenu(request, sender, response);
		break;
	  default:
		crfLogWarning("Unfamiliar request: "+request.command);
	}
}

async function onInstalled({reason, temporary}) {
	crfLogInfo("Installed!  " + reason + " (" + temporary + ")");
	if(temporary) return;
	switch(reason) {
		case "update":
			crfLogDebug("Updated!")
			const url = browser.runtime.getURL("extension_pages/upgrade.html");
			//browser.tabs.create({ url });
			await browser.windows.create({url, type: "popup", height: 600, width: 800});
			break;
		default:
			break;
	}
}

browser.runtime.onMessage.addListener(requestListener);

browser.runtime.onInstalled.addListener(onInstalled);

// Tasks todo on Extension startup
initUnsetSettings();

