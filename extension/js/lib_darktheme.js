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

const CRF_DarkTheme_title = 'CRFDarkTheme';

function crf_addDarktheme() {
	var dt = document.createElement('link');
	dt.rel = 'stylesheet';
	dt.type = "text/css";
	dt.title = CRF_DarkTheme_title;
	dt.href = browser.runtime.getURL("css/darktheme.css");
	var head = document.getElementsByTagName('head');
	if(!head) {
		console.log("[CRF] No head to add darktheme to !");
		return;
	}
	head[0].appendChild(dt);
	console.log("[CRF] Darktheme css addded");
}

function crf_removeDarktheme() {
	var dt = document.getElementsByTagName('head')[0];
	if(!dt) { 
		console.log("[CRF] Document does not hava a head; di we find a Dullahan … ?");
		return;
	}
	dt = dt.querySelector('link[title="'+CRF_DarkTheme_title+'"]');
	if(!dt) {
		console.log("[CRF] Darktheme was not yet added, so it cannot be removed.");
		return;
	}
	dt.parentNode.removeChild(dt);
	console.log("[CRF] Removed Darktheme.")
}

