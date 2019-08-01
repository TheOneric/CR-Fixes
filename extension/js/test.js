'use strict';



console.log("----   test.js loaded !   -----");

function onError(e) {
	cosnole.log("Error: "+e);
}

var settings_vt_query = browser.storage.sync.get(["quality", "sub_lang"]);
const QUALITY_SELECTOR = '.qualityMenuItemSelector';
const SUBLANG_SELECTOR = '.subtitlesMenuItemSelector';
const SETTING_SELECTOR = '.settingsMenuButton';
const SELECTED_ATTRIBUTE = '.selected';

/*
 *@param quality Is expected to not be "none". "auto" and all numerical values are accepted
 *@apram selectedNode The node in the settings menu that represents the current selected quality
 * */
function setQuality(quality, selectedNode) {
	var all_options = selectedNode.parentNode.querySelectorAll(QUALITY_SELECTOR);
	const filter = elem => {
		if(!!elem) { return false; }
		else if(quality == "auto") {
			return elem.textContent.toLowerCase().match(quality);
		} else {
			//Well I sure hope, they don't add numbers to the class or id names :hime_anxious:
			return parseInt(quality) === parseInt(elem.textContent);
		}
	}
	for(var i = 0; i < all_options.length; ++i) {
		if(filter(all_options[i])) all_options[i].click();
	}
}

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
	p.contentWindow.eval('console.log("!! Executed in iframe!!");');
	p.contentWindow.document.body.style.width = "50%";
	var d = p.contentWindow.document;
	var n = d.createElement('script');
	n.type = "text/javascript";
	n.src = browser.runtime.getURL("js/lib_awaitMatch.js");
	d.head.appendChild(n);
	n = d.createElement('script');
	n.type = "text/javascript";
	n.src = browser.runtime.getURL("js/lib_playerMenu.js");
	d.head.appendChild(n);
  }, undefined, undefined, undefined, undefined, true);
}


settings_vt_query.then(doStuff, onError);

