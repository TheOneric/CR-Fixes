(function() {
    'use strict';

    var targetNode = document.getElementById("template_skin_splashlink");
    if (targetNode !== null) {
        targetNode.style = "background-image: url(https://img1.ak.crunchyroll.com/i/spire3/76b1e3156f1a96f127bd18e49228b2711545223046_main.jpg); background-position: center 0px; background-attachment: fixed;";
    } else {
        console.log("WARNING: Cannot replace background image, because 'template_skin_splashlink' does not exist ! \n Waiting for elemnt to be added.");
        var poller = setInterval(function(){
            var skin = document.querySelector('#template_skin_splashlink');
            if(skin !== null) {
                clearInterval(poller);
                skin.style = "background-image: url(https://img1.ak.crunchyroll.com/i/spire3/76b1e3156f1a96f127bd18e49228b2711545223046_main.jpg); background-position: center 0px; background-attachment: fixed;";
            }
        }, 50);
    }
})();

