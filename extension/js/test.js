'use strict';

var settings_query = browser.storage.sync.get(["customBackground", "bg_url"]);

function onError(e) {
	console.log("Error: "+e);
}

console.log("----   test.js loaded !   -----");

function replaceBackground(settings) {
	if(window.location.href.match(/^https?:\/\/(www\.)?crunchyroll\.com(\/[a-z]{2}(-[a-z]{2})?)?(\/(news|videos\/(anime|drama)))?\/?$/)) {
		console.log("+++ !!! ---- Is splashlink site ! --- !!! +++")
		replaceBackground_splashlink(settings);
	}
	
}

//settings_query.then(mutatePlayer, onError);

