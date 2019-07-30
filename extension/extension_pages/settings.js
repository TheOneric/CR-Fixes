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

var def_autoplay = false;
var def_darktheme = true;
var def_playerResize = true;
var def_ps_16_9_x = 960;
var def_ps_16_9_y = 540;
var def_ps_5_3_x = 960;
var def_ps_5_3_y = 576;
var def_background = false;
var def_bg_url = "";

var event_crf_settings_loaded = new CustomEvent('CRFSettingsLoaded', {bubbles: true, cancelable: false});


function onError(error) {
  console.log(`Error: ${error}`);
  var errCon = document.querySelector("#error-content");
  if(errCon) errCon.classList.remove("hidden");
}


function loadOptions() {
  
  function setCurrentChoice(result) {
	var ap = document.getElementById('autoplay');
    var dt = document.getElementById('darktheme');
    var ps = document.getElementById('customPlayerSizes');
    var ps_16_9_x = document.getElementById('player-size-16-9-x');
    var ps_16_9_y = document.getElementById('player-size-16-9-y');
    var ps_5_3_x = document.getElementById('player-size-5-3-x');
    var ps_5_3_y = document.getElementById('player-size-5-3-y');
    var bg = document.getElementById('customBackground');
    var bg_url = document.getElementById('bg-url');
	
	// Easy Default case handling (no booleans)
    if(!!ps_16_9_x) ps_16_9_x.value = result.ps_16_9_x || def_ps_16_9_x;
    if(!!ps_16_9_y) ps_16_9_y.value = result.ps_16_9_y || def_ps_16_9_y;
    if(!!ps_5_3_x) ps_5_3_x.value = result.ps_5_3_x || def_ps_5_3_x;
    if(!!ps_5_3_y) ps_5_3_y.value = result.ps_5_3_y || def_ps_5_3_y;
	if(!!bg_url) bg_url.value = result.bg_url || def_bg_url;

	//Messy
    if(!!ap) { 
		if(typeof result.autoplay != "undefined")
			ap.checked = result.autoplay;
		else
			ap.checked = def_autoplay;
	}
    if(!!dt) {
		if(typeof result.darktheme != "undefined") dt.checked = result.darktheme;
		else dt.checked = def_darktheme;
	}
	if(!!ps) {
		if(typeof result.customPlayerSizes != "undefined") ps.checked = result.customPlayerSizes;
		else ps.checked = def_playerResize;
	}
	if(!!bg) {
		if(typeof result.customBackground) bg.checked = result.customBackground;
		else bg.checked = def_background;
	}
	
	ap.dispatchEvent(event_crf_settings_loaded);
	console.log(result);
  }

  var getting = browser.storage.sync.get();
  //console.log("Loading Settings …");
  getting.then(setCurrentChoice, onError);
}


function restoreDefaults() {
  if(!confirm("Are you sure you want to restore Default settings ?\n(Changes still need to bes saved afterwards)"))
	return;
  var prom = browser.storage.sync.set({
    autoplay: def_autoplay,
    darktheme: def_playerResize,
    customPlayerSizes: def_playerResize,
    ps_16_9_x: def_ps_16_9_x,
    ps_16_9_y: def_ps_16_9_y,
    ps_5_3_x: def_ps_5_3_x,
    ps_5_3_y: def_ps_5_3_y,
    customBackground: def_background,
	bg_url: def_bg_url
  });
  prom.then(loadOptions, onError);
}

document.addEventListener("DOMContentLoaded", loadOptions);



