'use strict';



console.log("----   test.js loaded !   -----");

function onError(e) {
	cosnole.log("Error: "+e);
}

var settings_vt_query = browser.storage.sync.get(["quality", "sub_lang"]);

function doStuff(settings) {
	
}


settings_vt_query.then(doStuff, onError);

