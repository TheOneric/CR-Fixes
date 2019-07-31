# CR-Fixes

![logo](https://raw.githubusercontent.com/TheOneric/CR-Fixes/master/extra-files/Logo-ver1%2Bbackground.png)

## What is this

This plugin attempts to add some functions to the crunchyroll webpage, that I felt were direly needed. Like **toggable autoplay**, so you can read the comments at the ned of the video without being interrupted by a redirect. **A dark mode** so you can watch your animes alone and in the darkness without burning your eyes.  
All options can be disabled, so they do not conflict with your already existing customisations.
In fact, most of what this extension does, can also be achieved by utilisng several other extensions and user scripts already available.<sup>[1](#crf_footnote1)</sup> 
The exception of this is toggable autoplay; which I couldn't find anywhere else. And the **(still WIP)** hierachical subtitle language selection. So that you can define selection orders like:  
`German (German) -> English -> Spanish (Spain) -> Off`  
and the first of these languages available will be selected.



But still, even if you are a fan of autoplay, having all tweaks in one place, might still be convenient.
For a full list of options, see the **Settings** section below.



## Settings
Generally speaking all changes to settings require the website to be reloaded(F5), unless stated otherwise. All cahnges to settings made in the popup need to be saved before they take full effect.

### Enable Autoplay
**Default: false**  
If set to *true* autoplay of next episode is allowed; this is the current website behaviour.  
If set to *false* autoplay will be blocked.
**_This setting takes effect as of the moment it is saved_**
### Use Darktheme
**Default: true**  
If set to *true* a custom css stylesheet will be injected into all normal crunchyroll.com pages with a dark color palette (with some ornage highlights).  
If set to *false* no action is performed.  
Set this to false, if you wish to keep the default style or if using a different extension or script to change the style of *crunchyroll.com* sites.
**_If this setting is toggled via the popup menu and the active tab is a crunchyroll webpage, a preview of the darktheme/normal theme will be directly displayed._** For it to tkae full effect in **_saving is requiered_** and a refresh might be necessary if on a episode list page of a series.
### Resize Player
**Default: true**  
If set to *true* the player container will be resized according to the values defined in the input boxes. The default resize values are meant to fill the width of the *template_container* object, to not interfere with a possible background image.
Also if this is set to *true* any possible signup-box will be removed to make space for a larger video container.  
If set to *false*, no action will be taken.
#### 16:9 Player and 5:3 Player x,y values
**Default 16:9:  960 x 540**  
**Default 16:9:  960 x 576**  
These customise the player size, if **Resize Player** is set to true. The values are set in pixel units. You may either enlarge or shrink the player. Minimum length is 0 and maximum length is 9999.
<a name="myfootnote1">1</a>: Footnote content goes here
### Custom Background
If set to *true*, the plugin will attempt to inject a custom background image into the body of all crunchyroll pages and redefine the image on alll template\_skin\_splashlink objects, if present, though the splashlink object will still be present and clickable.  
If set to *false* no action will be taken.

---

**The following settings are WIP or planned and not yet available** 
 
### Default Video Quality
**Default: none**  
If set to something other than *none*, the extension will try to set the video quality to the given value when the page is loaded.  
Available values: *none*, *auto*, *1080*, *720*, *480*, *360*

### Subtitle Languages
**Default: <empty string>**
If not empty the extension will try to set the subtitle language according to this option, regardless of the language of the crunchyroll website.
The value of this setting will be processed as follows:  
1. If the vidoe has a subtitle matching the first line of this value, it will be attempted to set this language
2. If the language was available for this video, no further action will be performed.
3. Otherwise, move on to the second line and repeat the previous steps
4. This continous until a language could be set or there are no more lines  

Please note that all languages must *exactly* match their counterparts in the player options menu.




## Installation
### GitHub-Method
Clone this repo, then
load as temporary extension.  
OR  
 pack the contents of the extension folder (without root folder) yourself. Then install from file.

### addons.mozilla.com
This extension will soon<sup>TM</sup> be avialable at https://addons.mozilla.org/


## For Developers
### Contributing
Just send me Pullrequest or open an issue, explaining the changes made and/or the problems encountered.
Please note that this projected is licensed under the GPLv3.
If you contribute to this project, you consent to also release your contribution under the terms of the GNU General Public License version 3.

### File hierachy and file names
All webpages and their corresponding scripts and css are located in extensions/extension_pages.  
All scripts meant to modify crunchyroll are located in extension/js. All content script files start with cs\_, all js files that only define functions and constants start with lib\_.  
All stylesheets for crunchyroll.com are located in extension/css.

### JS Naming conventions
None yet.


<a name="crf_footnote1">1</a>: In fact the darktheme provided here is a modified version of tholinka's dark crunchyroll plugin, which can be found here: https://github.com/tholinka/Dark-Crunchyroll-Plugin
