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

// run_at document_start

var settings_ap_query = browser.storage.sync.get(["autoplay"]);

function onError(e) {
  console.log("Error: "+e);
  //debugger;
}

function isPlayerPage(href) {
	return href.match(/^https?:\/\/(www\.)?crunchyroll\.com(\/[a-z]{2}(-[a-z]{2})?)?\/[^\/]+\/episode-[^\/]+\/?$/);
}

function crf_onVideoEnd_dynamic(next_ep_link) {
	if(!isPlayerPage(next_ep_link)) {
		console.log("[CRF] Redirect to unrecognized episode page requested. Request denied.\
      Page in question"+next_ep_link+"\
      If this was a mistake please report this to https://github.com/TheOneric/CR-Fix.");
		return;
	}
	browser.storage.sync.get(["autoplay"]).then(	function (res) {
		if(res.autoplay) {
			window.location.href = next_ep_link;
			console.log("[CRF] Allow Autoplay. At least this time … (￣ヘ￣)"); 
		}
		else console.log("[CRF] Stopped Autoplay. <(￣︶￣)>");
	}, onError
	);
}
//Make above function available to be called from window context, to allow for dynamic dis/enabling of autoplay
exportFunction(crf_onVideoEnd_dynamic, window, {defineAs: 'crf_onVideoEnd_dynamic'});

function init(settings) {
  if(settings.autoplay)
    return;
  
  window.addEventListener('beforescriptexecute',
    function(event)
    {
      if(event.target.src.match(/\/vilos_player.*\.js$/) ) {
		  console.log("Vilos Player script detected !");
  	      
          //Remove original and define custom VilosPlayer
          var parent_node = event.target.parentNode;
          parent_node.removeChild(event.target);
          
          // to make  VilosPlayer  available in page context we need to use window.eval
          // exporting VilosPlayer with 
          //    exportFunction(VilosPlayer, window, {defineAs: 'VilosPlayer'})
          // did not work because of access errors for properties of the player. 
          // My guess is, it has something to do with the use of this during definition (in extension context)
          //fetch(browser.runtime.getURL("js/viloz_player.js")).then(response => response.text(), onError).then(vp => window.eval(vp), onError);
          //Load original script; modify it and create replacement script
          //Due to unclear license conditions, we cannot download and modify the script beforehand to then insert it locally with browser.runtime.getURL()
          fetch('https://www.crunchyroll.com/versioned_assets/js/components/vilos_player.07ba0994.js')
            .then(response => response.text(), onError)
            .then(src => src.replace(/"ended",function\(\)\{c&&\(location\.href=c\)\}\)\}\}$/, '"ended",function(){if(!!c) crf_onVideoEnd_dynamic(c);})}}'), onError)
            .then(new_src => window.eval(new_src), onError);
          
          //Prevent original script from being executed
          event.preventDefault();
      }
    }
  );
}

if(isPlayerPage(window.location.href)) {
	settings_ap_query.then(init, onError);
}

