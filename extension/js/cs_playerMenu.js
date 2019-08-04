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


console.log("----   cs_playerMenu.js loaded !   -----");

function onError(e) {
	console.log("Error: "+e);
}

var settings_vt_query = browser.storage.sync.get(["quality", "sub_lang"]);

function doStuff(settings) {
  console.log("Attempt injection");
  awaitMatch('#vilos-player', p => {
	console.log("Found player frame, try injection.");
	browser.runtime.sendMessage(
	  {
		command: 'CRF_injectPlayerMenu'
		//tabID: browser.tabs.getCurrent().id //tabID already passed with sender reference
	  }
	);
  }, undefined, undefined, undefined, undefined, false);
}


settings_vt_query.then(doStuff, onError);

