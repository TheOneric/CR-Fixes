'use strict';

var settings_pl_query = browser.storage.sync.get(["customPlayerSizes", "ps_16_9_x", "ps_16_9_y", "ps_5_3_x", "ps_5_3_y"]);

function onError(e) {
	console.log("Error: "+e);
}

function mutatePlayer(settings) {
	if(window.location.href.match(/^https?:\/\/(www\.)?crunchyroll\.com(\/[a-z]{2}(-[a-z]{2})?)?\/[^\/]+\/episode-[^\/]+\/?$/)) {
		console.log("+++ !!! ---- Is Player Page ! --- !!! +++")

		if(settings.customPlayerSizes) insertCustomPlayerSizes(settings);
		
	}
	
}

function insertCustomPlayerSizes(settings) {
	if(!settings.ps_5_3_x || !settings.ps_5_3_y || !settings.ps_16_9_x || !settings.ps_16_9_x) {
		console.log("No sizes set !");
		return;
	}
	//First inject custom CSS to change player size
	var css = document.createElement('style');
	css.type = "text/css";
	css.title = "Player-Resize"
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
  //console.log("Appendend custom style !");
  
  //Now remove conflicting showmedia_free_trial_signup if present
  var elem = document.getElementById('showmedia_free_trial_signup');
  if(!!elem) elem.parentNode.removeChild(elem);
  if(!!elem) console.log("Removed signup stuff !");
  //We also need to move 'showmedia_about_new' downwards if player was enlarged
  function max(a, b) { if (a>b) return a; else return b; }
  var offset = max(settings.ps_16_9_y, settings.ps_5_3_y) -360 +394 +25;
  if(!elem) offset -= 394;
  document.getElementById('showmedia_about_new').style = 'padding-top: '+offset+'px;';
  
}

settings_pl_query.then(mutatePlayer, onError);

