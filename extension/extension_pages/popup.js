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


function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    autoplay: document.getElementById('autoplay').checked,
    darktheme: document.getElementById('darktheme').checked,
  });
}

function showAllSettings(e) {
	//console.log("Opening Settings Page …");
	browser.runtime.openOptionsPage();
	//console.log("Opened Settings Page.");
}

function toggleDarkmode() {
	var opt = document.getElementById('darktheme');
	//console.log("Someone knocked … ");
	if(!opt) return;
	console.log("…");
	browser.permissions.request({permissions: ["activeTab"]}).then(function(granted) {
		if(!granted) return;
		//console.log("Granted activeTab permission");
		browser.tabs.query({active: true, currentWindow: true}).then(
			function(tabs) {
				if(!tabs[0].url) return;
				if(!tabs[0].url.match(/^https?:\/\/(www\.)?crunchyroll\.com/)) {
					//console.log("Not a crunchyroll page.");
					return;
				}
				if(opt.checked) 
					browser.tabs.sendMessage(tabs[0].id, {command: "crf_addDarktheme"});
				else
					browser.tabs.sendMessage(tabs[0].id, {command: "crf_removeDarktheme"});
				//console.log("Sent message");
			}
		);
	});
}

function init() {
	document.getElementById('darktheme').addEventListener('change', toggleDarkmode);
	console.log("Initialised popup.");
}

document.addEventListener("DOMContentLoaded", loadOptions);

document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#fullSettingsButton").addEventListener("click", showAllSettings);

document.addEventListener("CRFSettingsLoaded", init);

