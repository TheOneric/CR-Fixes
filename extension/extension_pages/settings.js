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
var def_bg_force = false;
var def_quality = "none";
var def_sub_lang = "";
var def_exp_no_drm = true;
var def_logLevel = "W";

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
    var bg_force = document.getElementById('bg-force');
	var vq = document.getElementById('quality');
	var sl = document.getElementById('sub-lang');
	var x_nd = document.getElementById('no-drm');
	var a_ll = document.getElementById('log-level');
	
	// Easy Default case handling (no booleans)
    if(!!ps_16_9_x) ps_16_9_x.value = result.ps_16_9_x || def_ps_16_9_x;
    if(!!ps_16_9_y) ps_16_9_y.value = result.ps_16_9_y || def_ps_16_9_y;
    if(!!ps_5_3_x) ps_5_3_x.value = result.ps_5_3_x || def_ps_5_3_x;
    if(!!ps_5_3_y) ps_5_3_y.value = result.ps_5_3_y || def_ps_5_3_y;
	if(!!bg_url) bg_url.value = result.bg_url || def_bg_url;
	if(!!sl) sl.value = result.sub_lang || def_sub_lang;
	if(!!vq) vq.value = result.quality || def_quality;
	if(!!a_ll) a_ll.value = result.logLevel || def_logLevel;

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
		if(typeof result.customBackground != "undefined") bg.checked = result.customBackground;
		else bg.checked = def_background;
	}
	if(!!bg_force) {
		if(typeof result.bg_force != "undefined") bg_force.checked = result.bg_force;
		else bg_force.checked = def_bg_force;
	}
	if(!!x_nd) {
		if(typeof result.no_drm != "undefined") x_nd.checked = result.no_drm;
		else x_nd.checked = def_exp_no_drm;
	}
	
	ap.dispatchEvent(event_crf_settings_loaded);
	console.log(result);
  }

  var getting = browser.storage.sync.get();
  //console.log("Loading Settings …");
  getting.then(setCurrentChoice, onError);
}


function restoreDefaults() {
  if(!confirm("Are you sure you want to restore Default settings ?\n(Changes still need to be saved afterwards)"))
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
	bg_url: def_bg_url,
	bg_force: def_bg_force,
	sub_lang: def_sub_lang,
	quality: def_quality,
	no_drm: def_exp_no_drm,
	logLevel: def_logLevel
  });
  prom.then(loadOptions, onError);
}

document.addEventListener("DOMContentLoaded", loadOptions);



