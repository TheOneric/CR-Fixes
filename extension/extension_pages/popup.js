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
	console.log("Opening Settings Page …");
	browser.runtime.openOptionsPage();
	console.log("Opened Settings Page.");
}

document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#fullSettingsButton").addEventListener("click", showAllSettings);

