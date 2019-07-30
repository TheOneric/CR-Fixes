'use strict';

//var settings_test_query = browser.storage.sync.get(["bg_url"]);


console.log("----   test.js loaded !   -----");

var settings_ap_query = browser.storage.sync.get(["autoplay"]);

function onError(e) {
  console.log("Error: "+e);
}

//settings_query.then(mutatePlayer, onError);

