# Image Hider (Chrome Extension)

#### Description

Chrome extension to hide all images by default and show images again with click of icon.

#### Features

- Hides all images by default. Note: there is a short delay as it waits for the page to load before hiding them. This needs work.

- Shows all images again when you click the icon. Note: it will toggle them on/off with each click.

- Uses HTML5 local storage to keep track of the image hide status (based on icon clicks).

- When images are hidden, you can mouse-over them to show them temporarily.

- Hide background images by toggling an extension-wide setting (applys to all domains, not individually). This option can be toggled by right-clicking on the extension icon. 

- NOTE: this extension does **not** block the images from being loaded. It does **not** save on data.

#### License

This is released under the MIT license.

#### Instructions

This is an unpublished Chrome extension. Follow the guide here to install: [Load the extension](https://developer.chrome.com/extensions/getstarted#unpacked)

#### Forks, Bugs, Publishing, and etc.

- If you like this extension and want to contribute to it, feel free. I would like to request that you make a pull request with any changes as I'd like to see what other people come up in improving it.

- If you come across any bugs please report them here and I'll see what I can do.

- If you use this code and make something awesome that you want to publish on Google Play or whatever, that's cool. Just please give me a virtual nod (link to this repo and/or website), if you don't mind.

#### Disclaimer

I made this extension in about 5 minutes (I think I spent more time on this readme than the actual code). Quick and dirty. I did it because I wanted to be able to view articles without all the images, unless I chose to see the images. This is certainly a work in progress. I did not publish it because it is so raw, but I figured someone might be interested in it, and perhaps even contribute to it.

#### Future Changes (wish list?)

- ~~Change it to use straight JavaScript (remove jQuery dependency).~~ Done! 11/19/2015

- ~~Get a better icon (can anyone help with this? A graphic designer I am not.)~~ Done! 12/02/2015

- ~~Include background/css images in the show/hide.~~ Done! 12/07/2015

- Change it to hide images without waiting for page load (if possible).

- Include videos and perhaps other media in the show/hide.

- Add a context menu to allow users to define global settings (ex: transition time, include background images or not, etc);

- Open to suggestions... (submit a change request under the issues tab/page on GitHub)

#### Who Am I?

- Name: Alex Mason

- Website: [Alex's Antidote](http://alexsantidote.com)

- About Me: Just another application developer.

#### Change Log

- v0.2.5 -- 12/07/2015

  - Added a context menu option to toggle the show/hide of background images. This works as a universal (applys to all domains) on/off setting for the background images. Still depends on the regular toggle for show/hide though.

  - Cleaned up the code in places (also made it uglier in some places, sorry about that).

- v0.2.4 -- 12/03/2015

  - Fixed an issue where it showed "hide" on non-pages or pages that disallow extensions (like Chrome Web Store)

  - Fixed an issue that caused the stylesheet to be included multiple times, thus breaking the toggle to show.

- v0.2.3 -- 12/02/2015

  - New Icon thanks to my good buddy Jake Farr.

  - Some reworking of the code to fix a few minor issues.

  - Modified the manifest a bit, prepared to publish on Google Play.

- v0.2.2 -- 11/19/2015

  - Fixed an issue I missed with the last mini-update.

- v0.2.1 -- 11/19/2015

  - Added a feature that will display badge text of "hide" or "show" to indicate how the extension is behaving for the active tab.

  - Note: I'm not sure this is the most efficient or proper way to do this and I'd like to possibly change icons instead, but as mentioned before, I am not a graphic designer so that may not happen any time soon.

  - Another Note: This update may not take initially, even if you tell Chrome to reload the extension. I had to exit Chrome and then wait a few seconds after the tabs loaded before it would kick in. Again, this may need some work, but I think it's a feature worth having (even in it's current state).

- v0.2 -- 11/19/2015

  - Changed code to use straight JavaScript

  - Removed jQuery library

  - Added CSS file for img styles for hiding and transitioning on hover.
