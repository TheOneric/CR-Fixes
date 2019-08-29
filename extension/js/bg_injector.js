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

//@require lib_general.js

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

function setNoDRMCookie(settings) {
	if(!settings.no_drm) return;
	browser.cookies.set({
		domain: ".crunchyroll.com",
		expirationDate: 0x7fffffff * 1e3,
		path: "/",
		name: "VILOS_DRM_ROLLOUT",
		value: "7fc56270e7a70fa81a5935b72eacbe29_1",
		httpOnly: false,
		url: "https://www.crunchyroll.com/"
	});
}

function requestListener(request, sender, response) {
	switch(request.command) {
	  case "CRF_injectPlayerMenu":
		injectPlayerMenu(request, sender, response);
		break;
	  case "CRF_requestNonDRM":
		setNoDRMCookie({no_drm: true});
		break;
	  default:
		crfLogWarning("Unfamiliar request: "+request.command);
	}
}

browser.runtime.onMessage.addListener(requestListener);
browser.storage.sync.get(["no_drm"]).then(setNoDRMCookie, crfLogError);

