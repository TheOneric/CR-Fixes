/**
*   This file is part of CR-Fixes.
*   Copyright 2019  Oneric
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
    const bg = document.getElementById('customBackground').checked;
    const ps = document.getElementById('customPlayerSizes').checked;
	const nb = document.getElementById('navbar-custom').checked;
	//console.log("[disenAll] bg:"+bg+"  ;  ps:"+ps);
    document.getElementById('bg-url').disabled = !bg;
    document.getElementById('player-size-16-9-x').disabled = !ps;
    document.getElementById('player-size-16-9-y').disabled = !ps;
    document.getElementById('player-size-5-3-x').disabled  = !ps;
    document.getElementById('player-size-5-3-y').disabled  = !ps;
    document.getElementById('navbar-shows').disabled   = !nb;
    document.getElementById('navbar-forum').disabled   = !nb;
    document.getElementById('navbar-news').disabled    = !nb;
    document.getElementById('navbar-games').disabled   = !nb;
    document.getElementById('navbar-store').disabled   = !nb;
    document.getElementById('navbar-premium').disabled = !nb;
}

function saveOptions(e) {
  e.preventDefault();
  const setts = {
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
	startpage_simulTop: document.getElementById('startpage-simulTop').checked,
	navbar_custom:  document.getElementById('navbar-custom').checked,
	navbar_shows:   document.getElementById('navbar-shows').checked,
	navbar_forum:   document.getElementById('navbar-forum').checked,
	navbar_news:    document.getElementById('navbar-news').checked,
	navbar_games:   document.getElementById('navbar-games').checked,
	navbar_store:   document.getElementById('navbar-store').checked,
	navbar_premium: document.getElementById('navbar-premium').checked,
	logLevel: document.getElementById('log-level').value,
	sendSegmentId: document.getElementById('send-segment-id').checked
  };
  browser.storage.sync.set(setts);
  requestPermissions(setts);
}

function init() {
	//console.log("-- Start Init");
	disenableAll();
	//console.log("-- Init succesfull !");

    var _selector = document.getElementById('customBackground');
    _selector.addEventListener('change', disenableAll);
    _selector = document.getElementById('customPlayerSizes');
    _selector.addEventListener('change', disenableAll);
    _selector = document.getElementById('navbar-custom');
    _selector.addEventListener('change', disenableAll);

	document.getElementById('bgTemplate').href = browser.runtime.getURL("img/cr-background-template.png");

}




document.addEventListener("DOMContentLoaded", loadOptions);

document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#restoreDefButton").addEventListener("click", restoreDefaults);

// Init Dis/Enable states 
document.addEventListener("CRFSettingsLoaded", init);






