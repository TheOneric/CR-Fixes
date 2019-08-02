'use strict';



console.log("----   cs_playerMenu.js loaded !   -----");

function onError(e) {
	console.log("Error: "+e);
}

var settings_vt_query = browser.storage.sync.get(["quality", "sub_lang"]);


function doStufff(settings) {
	if(settings.quality && settings.quality !== "none") {
		//Wait for CR to init menu and selects its default based on cookies and whatnot
		awaitMatch(QUALITY_SELECTOR+SELECTED_ATTRIBUTE, 
			node => {
				console.log(node);
				//If CR quality selection matches user's wishes, then there is nothing to do
				if(!node.textContent.toLowerCase().includes(settings.quality))
					setQuality(settings.quality, node);
			},
		undefined, undefined, undefined, undefined, true);
	}
	
}

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

