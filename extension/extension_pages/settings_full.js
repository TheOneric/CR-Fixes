/**
*   This file is part of CR-Fixes.
*   Copyright 2019  Oneric  https://github.com/TheOneric , https://oneric.de
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
**/

/** This file depends on extension_pages/settings.js  to be loaded beforehand !  */

function disenableAll() {
    var bg = document.getElementById('customBackground').checked;
    var ps = document.getElementById('customPlayerSizes').checked;
	console.log("[disenAll] bg:"+bg+"  ;  ps:"+ps);
    document.getElementById('bg-url').disabled = !bg;
    document.getElementById('player-size-16-9-x').disabled = !ps;
    document.getElementById('player-size-16-9-y').disabled = !ps;
    document.getElementById('player-size-5-3-x').disabled = !ps;
    document.getElementById('player-size-5-3-y').disabled = !ps;
}

function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    autoplay: document.getElementById('autoplay').checked,
    darktheme: document.getElementById('darktheme').checked,
    customPlayerSizes: document.getElementById('customPlayerSizes').checked,
    ps_16_9_x: document.getElementById('player-size-16-9-x').value,
    ps_16_9_y: document.getElementById('player-size-16-9-y').value,
    ps_5_3_x: document.getElementById('player-size-5-3-x').value,
    ps_5_3_y: document.getElementById('player-size-5-3-y').value,
    customBackground: document.getElementById('customBackground').checked,
    bg_url: document.getElementById('bg-url').value,
	bg_force: document.getElementById('bg-force').checked,
	sub_lang: document.getElementById('sub-lang').value,
	quality: document.getElementById('quality').value,
	no_drm: document.getElementById('no-drm').checked
  });
  if(document.getElementById('no-drm').checked)
	browser.runtime.sendMessage({command: "CRF_requestNonDRM"});
}

function init() {
	console.log("-- Start Init");
	//TODO: Bug: For some reason all checkboxes appear to be unchecked when executing here,
	//		 but are fine when called from 'change' event
	//       As this doesn't cause any problems and can easily be fixed by toggling two times
	//		 fixing this has a low priority right now
	disenableAll(); 
	console.log("-- Init succesfull !");

	document.addEventListener("DOMContentLoaded", function (event) {
	    var _selector = document.getElementById('customBackground');
	    _selector.addEventListener('change', disenableAll);
		var _selector = document.getElementById('customPlayerSizes');
	    _selector.addEventListener('change', disenableAll);
	});

	document.getElementById('bgTemplate').href = browser.runtime.getURL("img/cr-background-template.png");
	
}






document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#restoreDefButton").addEventListener("click", restoreDefaults);

// Init Dis/Enable states 
document.addEventListener("CRFSettingsLoaded", init());






