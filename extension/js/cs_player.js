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

//@require lib_general.js

var settings_pl_query = browser.storage.sync.get(["customPlayerSizes", "ps_16_9_x", "ps_16_9_y", "ps_5_3_x", "ps_5_3_y"]);


function mutatePlayer(settings) {
	if(window.location.href.match(/^https?:\/\/(www\.)?crunchyroll\.com(\/[a-z]{2}(-[a-z]{2})?)?\/[^\/]+\/episode-[^\/]+\/?$/)) {
		crfLogInfo("---- Is Player Page ! ---")

		if(settings.customPlayerSizes) insertCustomPlayerSizes(settings);
		
	}
	
}

function insertCustomPlayerSizes(settings) {
	if(!settings.ps_5_3_x || !settings.ps_5_3_y || !settings.ps_16_9_x || !settings.ps_16_9_x) {
		crfLogWarning("No sizes set !");
		return;
	}
	//First inject custom CSS to change player size
	var css = document.createElement('style');
	css.type = "text/css";
	//css.title = "Player-Resize" //Multiple differnetly titled css styles seem to cause problems
	css.innerHTML = '\
	.player-container { \
	    width: '+settings.ps_5_3_x+'px; \
	    height: '+settings.ps_5_3_y+'px; \
	}\
  	\
	.player-container-16-9 {\
	    width: '+settings.ps_16_9_x+'px;\
    	height: '+settings.ps_16_9_y+'px;\
  }';
  document.getElementsByTagName('head')[0].appendChild(css);
  //crfLogDebug("Appendend custom style !");
  
  //Now remove conflicting showmedia_free_trial_signup if present
  var elem = document.getElementById('showmedia_free_trial_signup');
  if(!!elem) {
	elem.parentNode.removeChild(elem);
	crfLogInfo("Removed signup stuff !");
  }
  //We also need to move '#sidebar' downwards if player was enlarged
  function max(a, b) { if (a>b) return a; else return b; }
  var offset = max(settings.ps_16_9_y, settings.ps_5_3_y) -360 +341;
  if(!elem) offset -= 555;
  document.getElementById('sidebar').style = 'margin-top: '+offset+'px;';
  
}

settings_pl_query.then(mutatePlayer, crfLogError);

