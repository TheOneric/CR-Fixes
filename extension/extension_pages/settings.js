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

var def_autoplay = false;
var def_darktheme = true;
var def_playerResize = true;
var def_ps_16_9_x = 1280;
var def_ps_16_9_y = 720;
var def_ps_5_3_x = 1280;
var def_ps_5_3_y = 768;
var def_background = false;
var def_bg_url = "";

var INITIALISED_CHOICES = false;

function onError(error) {
  console.log(`Error: ${error}`);
}


function loadOptions() {
	//TODO Settings are not loaded properly !
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
	
    if(ap) ap.value = result.autoplay || def_autoplay;
    if(dt) dt.value = result.darktheme || def_darktheme;
	if(ps) ps.value = result.customPlayerSizes || def_playerResize;
    if(ps_16_9_x) ps_16_9_x.value = result.ps_16_9_x || def_ps_16_9_x;
    if(ps_16_9_y) ps_16_9_y.value = result.ps_16_9_y || def_ps_16_9_y;
    if(ps_5_3_x) ps_5_3_x.value = result.ps_5_3_x || def_ps_5_3_x;
    if(ps_5_3_y) ps_5_3_y.value = result.ps_5_3_y || def_ps_5_3_y;
	if(bg) bg.value = result.customBackground || def_background;
	if(bg_url) bg_url.value = result.bg_url || def_bg_url;
	
	INITIALISED_CHOICES = true;
  }

  var getting = browser.storage.sync.get();
  getting.then(setCurrentChoice, onError);
}


function restoreDefaults() {
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


