'use strict';

var settings_query = browser.storage.sync.get(["customBackground", "bg_url"]);

function onError(e) {
	console.log("Error: "+e);
}

function replaceBackground(settings) {
	if(window.location.href.match(/^https?:\/\/(www\.)?crunchyroll\.com(\/(en-gb|[a-z]{2}(-[a-z]{2})?|news|videos\/(anime|drama)))?\/?$/)) {
		replaceBackground_splashlink(settings);
		console.log("+++ !!! ---- Is splashlink site ! --- !!! +++")
	}
	
}

function replaceBackground_splashlink(settings) {
	if(!settings.customBackground || !settings.bg_url)
		return;    
	
	var target_style = "background-image: url("+settings.bg_url+"); background-position: center 0px; background-attachment: fixed;";
	
    var targetNode = document.getElementById("template_skin_splashlink");
    if (targetNode !== null) {
        targetNode.style = target_style;
    } else {
		//TODO Replace with more elegant DOMMuationObserver
        //console.log("WARNING: Cannot replace background image, because 'template_skin_splashlink' does not exist ! \n Waiting for elemnt to be added.");
        var poller = setInterval(function(){
            var skin = document.querySelector('#template_skin_splashlink');
            if(skin !== null) {
                clearInterval(poller);
                skin.style = target_style;
            }
        }, 50);
    }
}

settings_query.then(replaceBackground, onError);

