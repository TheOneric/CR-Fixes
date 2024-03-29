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
*	Copyright 2019  Oneric
* */

// run_at document_start
//@require lib_general.js

var settings_ap_query = browser.storage.sync.get(["autoplay"]);


function isPlayerPage(href) {
	return href.match(/^https?:\/\/(www\.)?crunchyroll\.com(\/[a-z]{2}(-[a-z]{2})?)?\/[^\/]+\/episode-[^\/]+\/?$/);
}

function crf_onVideoEnd_dynamic(next_ep_link) {
	if(!isPlayerPage(next_ep_link)) {
		crfLogError("Redirect to unrecognized episode page requested. Request denied.\
      Page in question: "+next_ep_link+"\
      If this was a mistake please report this to https://github.com/TheOneric/CR-Fix.");
		return;
	}
	browser.storage.sync.get(["autoplay"]).then(	function (res) {
		if(res.autoplay) {
			window.location.href = next_ep_link;
			crfLogDebug("Allow Autoplay. At least this time … (￣ヘ￣)"); 
		}
		else crfLogDebug("Stopped Autoplay. <(￣︶￣)>");
	}, crfLogError
	);
}
//Make above function available to be called from window context, to allow for dynamic dis/enabling of autoplay
exportFunction(crf_onVideoEnd_dynamic, window, {defineAs: 'crf_onVideoEnd_dynamic'});

function init(settings) {
  if(settings.autoplay)
    return;
  
  window.addEventListener('beforescriptexecute',
    async function(event)
    {
      if(event.target.src.match(/\/vilos_player.*\.js$/) ) {
		  crfLogInfo("Vilos Player script detected !");

          //Prevent original script from being executed
          event.preventDefault();
  	      
          //Remove original and define custom VilosPlayer
          var parent_node = event.target.parentNode;
          parent_node.removeChild(event.target);
      
          //Load original script; modify it and create replacement script
          // to make  VilosPlayer  available in page context we need to use window.eval
          //Due to unclear license conditions, we cannot download and modify the script beforehand to then insert it locally with browser.runtime.getURL()
          try {
            const response = await fetch(event.target.src);
            const old_src  = await response.text();
            //Current version (7e305b26)
            const new_src  = old_src.replace(
                                /\(location.href=([^)]*("[^"]*")?)+\)/g,
                                '(crf_onVideoEnd_dynamic($1))'
                            );
            //Previous Vilos player version 07ba0994
            //old_src.replace(
            //      /"ended",function\(\)\{c&&\(location\.href=c\)\}\)\}\}$/,
            //      '"ended",function(){if(!!c) crf_onVideoEnd_dynamic(c);})}}')

            crfLogDebug(new_src);
            window.eval(new_src);
          } catch(err) {
            crfLogError(err);
          }
      }
    }
  );
}

if(isPlayerPage(window.location.href)) {
	settings_ap_query.then(init, crfLogError);
}

