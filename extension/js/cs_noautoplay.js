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

function init(settings) {
  if(settings.autoplay)
    return;
  
  window.addEventListener('beforescriptexecute',
    function(event)
    {
      if(event.target.src.match(/\/vilos_player.*\.js$/) ) {
		  console.log("Vilos Player script detected !");
  	      //Create replacement script
          var replacement = event.target.cloneNode(true);
          var parent_node = event.target.parentNode;
          replacement.type = 'text/javascript';
          replacement.src = browser.runtime.getURL("js/viloz_player.js");
          //Remove original and define custom VilosPlayer
          /* Simplying inserting the script like this unfortunately fails 'VilosPlayer not defined'
          * (script probably still executed in extension environment instead of page env)
          * parent_node.appendChild(replacement); */
          parent_node.removeChild(event.target);
          // to make  VilosPlayer  available in page context we use window.eval
          // exporting VilosPlayer with 
          //    exportFunction(VilosPlayer, window, {defineAs: 'VilosPlayer'})
          // did not work because of access errors for properties of the player. 
          // My guess is, it has something to do with the use of this during definition (in extension context)
          fetch(browser.runtime.getURL("js/viloz_player.js")).then(response => response.text(), onError).then(vp => window.eval(vp), onError);
          
          //Prevent original script from being executed
          event.preventDefault();
      }
    }
  );
}

if(window.location.href.match(/^https?:\/\/(www\.)?crunchyroll\.com(\/[a-z]{2}(-[a-z]{2})?)?\/[^\/]+\/episode-[^\/]+\/?$/)) {
	settings_ap_query.then(init, onError);
}
