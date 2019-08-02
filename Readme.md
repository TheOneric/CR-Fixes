# CR-Fixes

![logo](https://raw.githubusercontent.com/TheOneric/CR-Fixes/master/extra-files/Logo-ver1%2Bbackground.png)

## What is this

This extension attempts to add some functions to the crunchyroll webpage, that I felt were direly needed. Like **toggable autoplay**, so you can read the comments at the ned of the video without being interrupted by a redirect. **A dark mode** so you can watch your animes alone and in the darkness without burning your eyes.  
All options can be disabled individually, so you can avoid conflicts with your already existing customisations.
In fact, if you are only interested in the visual changes *(darkmode, player resize, background)*, these can all be achieved with already existing plugins and user-scripts across most browsers.<sup>[1](#crf_footnote1)</sup> 
In case of the video quality selection, there was one user script I know of that did this, but this script doesn't work anymore.
However toggable autoplay and the hierachical multi-langual subtitle selection are to my knowledge as off publishing this unique to this extension.
THe language selection lets you define language orders like:  
`German -> English -> Spanish (Spain... -> Off`  
and the first of these languages available for your video will be selected.


For a full list of options, see the **Settings** section below.



## Settings
Generally speaking all changes to settings require the website to be reloaded(F5), unless stated otherwise. All cahnges to settings made in the popup need to be saved before they take full effect.

### Enable Autoplay
**Default: false**  
If set to *true* autoplay of next episode is allowed; this is the current website behaviour.  
If set to *false* autoplay will be blocked.
**_This setting takes effect as of the moment it is saved_**  
**This setting can be set via the popup menu**
### Use Darktheme
**Default: true**  
If set to *true* a custom css stylesheet will be injected into all normal crunchyroll.com pages with a dark color palette (with some ornage highlights).  
If set to *false* no action is performed.  
Set this to false, if you wish to keep the default style or if using a different extension or script to change the style of *crunchyroll.com* sites.
**This setting can be set via the popup menu**  
**_If this setting is toggled via the popup menu and the active tab is a crunchyroll webpage, a preview of the darktheme/normal theme will be directly displayed._** For it to take full effect **_saving is requiered_** and a refresh might also be necessary under certain conditions.<sup>[2](#crf_footnote2)</sup>
### Resize Player
**Default: true**  
If set to *true* the player container will be resized according to the values defined in the input boxes. The default resize values are meant to fill the width of the *template_container* object, to not interfere with a possible background image.
Also if this is set to *true* any possible signup-box will be removed to make space for a larger video container.  
If set to *false*, no action will be taken.
#### 16:9 Player and 5:3 Player x,y values
**Default 16:9:  960 x 540**  
**Default 16:9:  960 x 576**  
These customise the player size, if **Resize Player** is set to true. The values are set in pixel units. You may either enlarge or shrink the player. Minimum length is 0 and maximum length is 9999.

### Custom Background
If set to *true*, the extension will attempt to inject a custom background image into the body of all crunchyroll pages and redefine the image on alll template\_skin\_splashlink objects, if present, though the splashlink object will still be present and clickable.  
If set to *false* no action will be taken.
 
### Default Video Quality
**Default: none**  
If set to something other than *none*, the extension will try to set the video quality to the given value when the page is loaded.  
Available values: *none*, *auto*, *1080*, *720*, *480*, *360*, *240*

### Subtitle Languages
**Default: \<empty string\>**  
If not empty the extension will try to set the subtitle language according to this option, regardless of the language of the crunchyroll website.
The value of this setting will be processed as follows:  
1. If the value is an empty string, no action will be taken.
2. The string will be split with *';'* as a seperator. Each element of this string represents one language.
3. A language specified by the user is *available* if in the player subtitle menu, there is an entry that whose start is identical to the language. 
E.g. the entry *French (France...* will be matched by either *F*, *French* or *French (France*, but will not be matched by *French (France)*.
4. If the first language is an available option, this language will be selected.
5. Otherwise the extension will move on to the second language requested by the user.
6. This continous until a language could be set or there are no more languages set by the user.

Please note that all languages must *exactly* match the start of their counterparts in the player options menu.
E.g. the entry for German in the player menu is *German (German...*, so *German*, *Ger*, *G* or *German (German...* will all match, but *german*, *g*, *GER* or *German (Germany)* would __not__ match.
If you wish to set Spanish, including the part after the parantheses might be necessary to match your desired language as the player has entries for *Spanish (Spain..* and *Spanish (Latin...*.
Only requesting *Spanish* might yield either of these choices.




## Installation
### GitHub-Method
Clone this repo, build ant then either:
* load as temporary extension
* OR  
* pack the contents of the *build* folder (without root folder) yourself and install from file

### addons.mozilla.com
This extension will soon<sup>TM</sup> be avialable at https://addons.mozilla.org/


## For Developers
### Contributing
Just send me Pullrequest or open an issue, explaining the changes made and/or the problems encountered.
Please note that this projected is licensed under the GPLv3.
If you contribute to this project, you consent to also release your contribution under the terms of the GNU General Public License version 3.

### Build instructions
Just run `make`.
This will copy all the files inside the *extension* folder to the build folder (will be created if necessary) and process all `//#INCLUDE` instructions.

## Build Dependencies
* `make`
* `awk`

### File hierachy and file names
All webpages and their corresponding scripts and css are located in extensions/extension_pages.  
All scripts meant to modify crunchyroll are located in extension/js. All content script files start with cs\_, all js files that only define functions and constants start with lib\_, all scripts that are injected via `browser.tabs.executeScript` start with in\_ and all background scripts start with bg\_.  
All stylesheets for crunchyroll.com are located in extension/css.


---


<a name="crf_footnote1">1</a>: In fact the darktheme provided here is a modified version of tholinka's dark crunchyroll plugin, which can be found here: https://github.com/tholinka/Dark-Crunchyroll-Plugin  

<a name="crf_footnote2">2</a>: If the active tab was a series overview page (where all the episodes are listed) a refresh is necessary to change the container colour. And for the dark/not-dark mode to take effect in other tabs, that were not active when toggling via popup, a refresh is also necessary.
