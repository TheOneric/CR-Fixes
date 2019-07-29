/*
*   This file is part of CR-Fixes.

    CR-Fixes is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.

    CR-Fixes is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.

	Copyright 2019  Oneric  https://github.com/TheOneric , https://oneric.de
*/


(function() {
    var img_url = browser.extension.getURL("img/cr-background-template.png");
	console.log("IMG_URL: "+img_url)
	
    var targetNode = document.getElementById("template_skin_splashlink");
    if (targetNode !== null) {
//        targetNode.style = "background-image: url(https://img1.ak.crunchyroll.com/i/spire3/76b1e3156f1a96f127bd18e49228b2711545223046_main.jpg); background-position: center 0px; background-attachment: fixed;";
        targetNode.style = "background-image: "+img_url+"; background-position: center 0px; background-attachment: fixed;";
    } else {
        console.log("WARNING: Cannot replace background image, because 'template_skin_splashlink' does not exist ! \n Waiting for elemnt to be added.");
        var poller = setInterval(function(){
            var skin = document.querySelector('#template_skin_splashlink');
            if(skin !== null) {
                clearInterval(poller);
		        targetNode.style = "background-image: "+img_url+"; background-position: center 0px; background-attachment: fixed;";
            }
        }, 50);
    }
})();
