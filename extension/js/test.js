'use strict';



console.log("----   test.js loaded !   -----");

var settings_ap_query = browser.storage.sync.get(["autoplay"]);

function onError(e) {
  console.log("Error: "+e);
}

function rejectEnforcedAutoplay(vilos_player_src) {
	var viloz = vilos_player_src.replace(/"ended",function\(\)\{c&&\(location\.href=c\)\}\)\}\}$/, '"ended",function(){if(!!c) crf_onVideoEnd_dynamic(c);})}}');
	console.log(viloz);
}


fetch('https://www.crunchyroll.com/versioned_assets/js/components/vilos_player.07ba0994.js').then(response => response.text(), onError).then(rejectEnforcedAutoplay, onError);




