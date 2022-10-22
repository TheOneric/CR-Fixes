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

crfLogDebug("----   cs_playerMenu.js loaded !   -----");

var settings_vt_query = browser.storage.sync.get(["quality", "sub_lang"]);

function doStuff(settings) {
  crfLogInfo("Attempt injection");
  awaitMatch('#vilos-player', p => {
	crfLogInfo("Found player frame, try injection.");
	browser.runtime.sendMessage(
	  {
		command: 'CRF_injectPlayerMenu'
		//tabID: browser.tabs.getCurrent().id //tabID already passed with sender reference
	  }
	);
  }, undefined, undefined, undefined, undefined, false);
}


// FIXME & HELP-WANTED: React-Player broke this, see:
//   https://github.com/TheOneric/CR-Fixes/issues/2
//settings_vt_query.then(doStuff, crfLogError);

