/**
*   This file is part of CR-Fixes.
*   Copyright 2019  Oneric  https://github.com/TheOneric , https://oneric.de
*
*    CR-Fixes is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 2 of the License, or
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
    document.getElementById('bg-url').disabled = !bg;
    document.getElementById('player-size-16-9-x').disabled = !ps;
    document.getElementById('player-size-16-9-y').disabled = !ps;
    document.getElementById('player-size-5-3-x').disabled = !ps;
    document.getElementById('player-size-5-3-y').disabled = !ps;
}

function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    autoplay: document.getElementById('autoplay').value,
    darktheme: document.getElementById('darktheme').value,
    customPlayerSizes: document.getElementById('customPlayerSizes').value,
    ps_16_9_x: document.getElementById('player-size-16-9-x').value,
    ps_16_9_y: document.getElementById('player-size-16-9-y').value,
    ps_5_3_x: document.getElementById('player-size-5-3-x').value,
    ps_5_3_y: document.getElementById('player-size-5-3-y').value,
    customBackground: document.getElementById('customBackground').value,
    bg_url: document.getElementById('bg-url').value
  });
}

function init() {
	// Check probably unnecessary. DOM3 specification should make sure the listeners are called in order
	/*if(INITIALISED_CHOICES) {*/
		disenableAll();
	/*} else {
		var poller = setInterval(function(){
            if(INITIALISED_CHOICES) {
                clearInterval(poller);
                disenableAll();
            }
        }, 75);
	}*/
}



document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.getElementById('customBackground');
    _selector.addEventListener('change', disenableAll);
	var _selector = document.getElementById('customPlayerSizes');
    _selector.addEventListener('change', disenableAll);
});



// Init Dis/Enable states 
document.addEventListener("DOMContentLoaded", init());


document.querySelector("form").addEventListener("submit", saveOptions);


