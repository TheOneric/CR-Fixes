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

	Copyright 2020  Oneric  https://github.com/TheOneric , https://oneric.de
*/

//@require lib_general.js
//@run_at  document_end

var settings_bg_query = browser.storage.sync.get([
	"startpage_simulTop",
	"navbar_custom",
	"navbar_shows", "navbar_forum", "navbar_news",
	"navbar_games", "navbar_store", "navbar_premium"
]);

function isStartpage(url) {
	const b = /^https:\/\/www\.crunchyroll\.com\/([a-zA-Z]{2}(-[a-zA-Z]{2})?)?\/?$/.test(url);
	return b;
}

function doReorder(settings) {
	crfLogDebug("__ Reorder CS loaded __");
	if(!!settings.startpage_simulTop && isStartpage(window.location.href))
		moveSimulcast();

	if(!!settings.navbar_custom)
		customiseNavbar(settings);
}

function moveSimulcast() {
	const simuElem = document.getElementById('welcome_nowshowing');
    const newsElem = simuElem.parentElement.querySelector('#welcome_left>.welcome-block.clearfix');

    if(simuElem && newsElem)
      newsElem.parentElement.insertBefore(simuElem, newsElem);
}

function customiseNavbar(settings) {
	//Ensure header-banner is present (should be on all non-error www.crunchyroll pages)
	const headContainer = document.getElementById('header_container');
	if(!headContainer) return;

	//Get the elem with the tabs
	const headTabs = headContainer.querySelector('#header_menubar_beta>ul');
	if(!headTabs) return;

	//Now customise

	//News doesn't have an id, so we rely on it's child to locate it
	const newsRef = headTabs.querySelector('li>a[href$=news]');
	//Start with creating and adding Forum before elements are removed
	if(settings.navbar_forum) {
		//Create 'Forum' tab element
		var forumTab = document.createElement("li");
		var forumRef = document.createElement("a");
		forumRef.href = "/forum";
		forumRef.itemprop = "url";
		forumRef.token = "topbar";
		var forumText = document.createTextNode("Forum");
		forumRef.appendChild(forumText);
		forumTab.appendChild(forumRef);

		//Add before News if possible
		if(!!newsRef) {
			headTabs.insertBefore(forumTab, newsRef.parentElement);
		} else {
			crfLogError("Couldn't find news ref. Can't insert 'Forum' !");
		}
	}

	//Proceed to delete all unwanted tabs

	function deleteRef(ref, name) {
		if(!ref)
			crfLogWarning("Couldn't locate '"+name+"' ref!");
		else
			headTabs.removeChild(ref.parentElement);
	}

	function deleteTab(tab, name) {
		if(!tab)
			crfLogWarning("Couldn't locate '"+name+"' tab!");
		else
			headTabs.removeChild(tab);
	}

	if(!settings.navbar_shows) {
		const showsRef = headTabs.querySelector('li>a[href$=anime]');
		deleteRef(showsRef, "Shows");
	}
	if(!settings.navbar_news) {
		//News ref already grabbed to insert Forum
		deleteRef(newsRef, "News");
	}
	if(!settings.navbar_games) {
		const gamesTab   = headTabs.querySelector('li.games');
		deleteTab(gamesTab, "Games");
	}
	if(!settings.navbar_store) {
		const storeTab   = headTabs.querySelector('li.store');
		deleteTab(storeTab, "Store");
	}
	if(!settings.navbar_premium) {
		const premiumRef = headTabs.querySelector('#header_try_premium_free');
		deleteRef(premiumRef, "Premium");
	}
}


settings_bg_query.then(doReorder, crfLogError);
