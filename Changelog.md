#Changelog (end-user features only)

##Version 1.2.1  (2022-10-22) - Final Release
* Fix update notification showing up on browser updates and install
* Added deprecation notice.

##Version 1.2.0  (2020-05-21)
+ Option to move simulcasts above news on startpage
+ Customisable Navbar
+ New experimental setting: "Custom Segment-Id event"
* Improved Sidebar positioning when logged in and on preview epsiodes
* Minor improvements for settings page
* Fixed bug with reversed logging priority
- Disabled quality and language selection for now
  (see issue [#2](https://github.com/TheOneric/CR-Fixes/issues/2))
- Removed experimental setting "Request DRM-free"
  CR no longer acknowledges this cookie, but now falls back to non-DRM stream by default when Widevine absent

##Version 1.1.2
* now request 'activeTab' permission when using quality or sublang settings
* this might fix injection failure bug ?

##Version 1.1.1 (pre)
+ added LogLevel setting
* Address vilos_player script update, which broke autoplay disable
* all settings not yet set are now assigned default value on startup
* generalised "Experimental" settings section to "Advanced" section, with a special prefix for experimental settings
* fixed bug causing player-size and bg-url input boxes to be falsely disabled

##Version 1.1.0 (pre)
+ added experimental "Request DRM-free streams" feautre
+ added Readme link as help link in settings page
+ added option to respect bacjgrounds set by CR-users on their userpage
* respecting userpage-backgrounds is now default
* some more css fixes applying to forum/series and userpages
* switching to svg icon instead of png


##Version 1.0.1 (pre)
+ added Firefox for Android Support
* fix some orange links


##Version 1.0.0 (initial release)
+ Toggable Autoplay
+ Darktheme
+ Player Resize
+ Custom Background
+ Default Videoquality
+ Subtitle hierachy
