'use strict';



console.log("----   cs_playerMenu.js loaded !   -----");

function onError(e) {
	console.log("Error: "+e);
}

var settings_vt_query = browser.storage.sync.get(["quality", "sub_lang"]);

function doStuff(settings) {
  console.log("Attempt injection");
  awaitMatch('#vilos-player', p => {
	console.log("Found player frame, try injection.");
	browser.runtime.sendMessage(
	  {
		command: 'CRF_injectPlayerMenu'
		//tabID: browser.tabs.getCurrent().id //tabID already passed with sender reference
	  }
	);
  }, undefined, undefined, undefined, undefined, false);
}


settings_vt_query.then(doStuff, onError);

