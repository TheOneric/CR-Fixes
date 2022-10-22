/**
*   This file is part of CR-Fixes.
*   Copyright 2019  Oneric
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
**/

/** Default settings of the crf extension */
const CRF_DEF_SETTS = {
	autoplay: 			false,
	darktheme:			true,
	customPlayerSizes:	true,
	ps_16_9_x:			960,
	ps_16_9_y:			540,
	ps_5_3_x:			960,
	ps_5_3_y:			576,
	customBackground:	false,
	bg_url:				"",
	bg_force:			false,
	quality:			"none",
	sub_lang:			"",
	startpage_simulTop:	false,
	navbar_custom:		false,
	navbar_shows:		true,
	navbar_forum:		false,
	navbar_news:		true,
	navbar_games:		true,
	navbar_store:		true,
	navbar_premium:		true,
	//Advanced and experimental settings
	logLevel:	"W",
	useTabsPermission: false,
	sendSegmentId: false,
	//Information about setting version (used for setting conversion if necessary)
	version: 1
};


var event_crf_settings_loaded = new CustomEvent('CRFSettingsLoaded', {bubbles: true, cancelable: false});


function onError(error) {
  console.log(`Error: ${error}`);
  var errCon = document.querySelector("#error-content");
  if(errCon) errCon.classList.remove("hidden");
}


function loadOptions() {
  
  function setCurrentChoice(result) {
	var ap = document.getElementById('autoplay');
    var dt = document.getElementById('darktheme');
    var ps = document.getElementById('customPlayerSizes');
    var ps_16_9_x = document.getElementById('player-size-16-9-x');
    var ps_16_9_y = document.getElementById('player-size-16-9-y');
    var ps_5_3_x = document.getElementById('player-size-5-3-x');
    var ps_5_3_y = document.getElementById('player-size-5-3-y');
    var bg = document.getElementById('customBackground');
    var bg_url = document.getElementById('bg-url');
    var bg_force = document.getElementById('bg-force');
	var vq = document.getElementById('quality');
	var sl = document.getElementById('sub-lang');
	var a_ll = document.getElementById('log-level');
	var ssi = document.getElementById('send-segment-id');
	var sp_simu = document.getElementById('startpage-simulTop');
	var nb_c    = document.getElementById('navbar-custom');
	var nb_shws = document.getElementById('navbar-shows');
	var nb_frm  = document.getElementById('navbar-forum');
	var nb_nws  = document.getElementById('navbar-news');
	var nb_gms  = document.getElementById('navbar-games');
	var nb_str  = document.getElementById('navbar-store');
	var nb_prmm = document.getElementById('navbar-premium');

	// Easy Default case handling (no booleans)
    if(!!ps_16_9_x) ps_16_9_x.value = result.ps_16_9_x || CRF_DEF_SETTS.ps_16_9_x;
    if(!!ps_16_9_y) ps_16_9_y.value = result.ps_16_9_y || CRF_DEF_SETTS.ps_16_9_y;
    if(!!ps_5_3_x) ps_5_3_x.value = result.ps_5_3_x || CRF_DEF_SETTS.ps_5_3_x;
    if(!!ps_5_3_y) ps_5_3_y.value = result.ps_5_3_y || CRF_DEF_SETTS.ps_5_3_y;
	if(!!bg_url) bg_url.value = result.bg_url || CRF_DEF_SETTS.bg_url;
	if(!!sl) sl.value = result.sub_lang || CRF_DEF_SETTS.sub_lang;
	if(!!vq) vq.value = result.quality || CRF_DEF_SETTS.quality;
	if(!!a_ll) a_ll.value = result.logLevel || CRF_DEF_SETTS.logLevel;

	//Booleans
	function setBooleanChecked(obj, settName) {
		if(!obj) return;
		if(typeof result[settName] != "undefined")
			obj.checked = !!result[settName];
		else
			obj.checked = CRF_DEF_SETTS[settName];
	}

	setBooleanChecked(ap, 'autoplay');
	setBooleanChecked(dt, 'darktheme');
	setBooleanChecked(ps, 'customPlayerSizes');
	setBooleanChecked(bg, 'customBackground');
	setBooleanChecked(bg_force, 'bg_force');
	setBooleanChecked(ssi, 'sendSegmentId');
	setBooleanChecked(sp_simu, 'startpage_simulTop');
	setBooleanChecked(nb_c, 'navbar_custom');
	setBooleanChecked(nb_shws, 'navbar_shows');
	setBooleanChecked(nb_frm,  'navbar_forum');
	setBooleanChecked(nb_nws,  'navbar_news');
	setBooleanChecked(nb_gms,  'navbar_games');
	setBooleanChecked(nb_str,  'navbar_store');
	setBooleanChecked(nb_prmm, 'navbar_premium');

	ap.dispatchEvent(event_crf_settings_loaded);
	console.log(result);
  }

  var getting = browser.storage.sync.get();
  //console.log("Loading Settings …");
  getting.then(setCurrentChoice, onError);
}


function restoreDefaults() {
  if(!confirm("Are you sure you want to restore Default settings ?"))
	return;
  var prom = browser.storage.sync.set(CRF_DEF_SETTS);
  prom.then(loadOptions, onError);
}

/** 
 This function checks for unset options and sets them to default.
 This has its usecase after an upgrade, that introduced new options, or after initial install.
 In the future this function might also do conversion and/or removal of deprecated options.
*/
function initUnsetSettings() {
  browser.storage.sync.get().then(
	currentSetts => {
	  const options = Object.keys(CRF_DEF_SETTS);
	  var toSet = {};
	  for(var i = 0; i < options.length; ++i) {
		if(!Object.prototype.hasOwnProperty.call(currentSetts, options[i])) {
		  console.log("!! Option "+options[i]+" not yet set !!");
		  toSet[options[i]] = CRF_DEF_SETTS[options[i]];
		}
	  }
	  if(Object.keys(toSet).length > 0) {
		console.log("Push defaults for unset options:\n");
		console.log(toSet);
		browser.storage.sync.set(toSet);
	  }
	},
	onError
  );
}


/**
 Requests permissions if necessary for passed settings
 @return a promis that will be resolved with true if required permissions were granted and false otherwise
*/
function requestPermissions(setts) {
	var toReq = [];
	var addToSet = (arr, e) => {if(arr.indexOf(e) === -1) arr.push(e);}
	
	if(
	 (Object.prototype.hasOwnProperty.call(setts, "quality") && setts["quality"] !== CRF_DEF_SETTS.quality)
  || (Object.prototype.hasOwnProperty.call(setts, "sub_lang") && setts["sub_lang"] !== CRF_DEF_SETTS.sub_lang)
	) {
		if(setts["useTabsPermission"] == true)
			addToSet(toReq, "tabs");
		else
			addToSet(toReq, "activeTab");
	}

	
	return browser.permissions.request({permissions: toReq});
}



//document.addEventListener("DOMContentLoaded", loadOptions);



