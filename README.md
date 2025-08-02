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

#### Permissions

This extension needs permissions to access HTTP and HTTPs urls. Why? Because without that it wont be able to identify the images (and background images) on the websites you visit in order to hide them.

The Google Chrome Web Store has a really scary warning when you try to install the extension. Regarding adding the extension, it reads as follows: "Read and change all your data on the websites you visit".

See, doesn't that sound scary? Well don't be alarmed. Google's permissions explanations are a bit vague. This extension is not doing anything harmful. It is only modifying the style of each page you visit to show or hide images. That is all.

No need to be scared. Besides, the source is all right here, so take a look for yourself! :)

#### Installation Instructions

**Chrome Web Store Installation**

Go to the Web Store page for the extension ([Click Here!](https://chrome.google.com/webstore/detail/image-hider/fdjghmbmljbhojdgegmhhbkhgoacgdcb)) and then click "Add to Chrome" button, then click "OK" on the confirmation pop-up.

**Manual Installation**

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

- Website: [Alex's Antidote](https://www.linkedin.com/in/alexmason81/)

- About Me: I'm currently working as a Software Architect Manager at MPHI. I don't have much time for side/hobby projects these days (haven't for a while), so I am slow to update things, sorry.

#### Change Log

- v0.3.0 -- 08/01/2025

  - Migrated to Manifest version 3 to meet new Google requirements.

- v0.2.8 -- 12/08/2015

  - Slightly improved handling of background images.

  - Modified image styles to account for show/hide on some images that were being missed.

- v0.2.7 -- 12/07/2015

  - Modified the patern matching in the manifest so it only targets http and https urls. I did this so it will stop showing the "Allow access to file URLs" checkbox on the chrome://extensions page (this was causing concern for some users).

  - Added an explanation to the readme about the permissions.

- v0.2.6 -- 12/07/2015

  - Fixed the default show/hide. Somehow I mixed it up so it showed by default. Oops! All better now!

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
