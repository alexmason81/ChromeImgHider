// content.js

var ImgHider = {

  status: true, // true == hide, false == show
  interval: 10000, // default to 30 seconds

  hide: function () {
    // make sure the css isn't already linked (don't need multiple linking as that breaks stuff)
    if (document.getElementById("ChromeImgHider")) {
      return; // it's already there
    }
    // inject the hide stylesheet to hide images and grant hover.
    var link = document.createElement("link");
    link.href = chrome.extension.getURL("style-hide.css");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.id = "ChromeImgHider";
    document.getElementsByTagName("head")[0].appendChild(link);
  },

  show: function () {
    // Remove the hide stylesheet so everything goes back to "normal"
    var link = document.getElementById("ChromeImgHider");
    if (null !== link && link !== undefined) {
      document.getElementsByTagName("head")[0].removeChild(link);
    }
  },

  init: function () {
    // since most of the work needs to be done in refresh, just call it and then return this.
    this.refresh();
    return this;
  },

  toggle: function () {
    this.status = !this.status;
    this.persist();
    this.status ? this.show() : this.hide();
  },

  persist: function () {
    localStorage.hideImages = this.status;
  },

  refresh: function () {
    // If there is no cache set in localStorage, or the cache is older than 1 hour:
    if (localStorage.hideImages === undefined) {
      // default to off
      this.status = true;
      this.persist();
    } else {
      this.status = JSON.parse(localStorage.hideImages);
    }
    this.status ? this.show() : this.hide();
  }

};



// listen for background.js being clicked (icon)
// and do something with the data received
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "page_loaded") {
      // initialize this beast
      ImgHider.init();
      // refresh the setting every 10 seconds -- to account for dynamic changes in the page
      // disabled for now, probably not needed, but leaving the code here until I can decide after more testing.
      // setInterval(function(){ ImgHider.refresh(); }, ImgHider.interval);
      // use the callback and pass it the show/hide status
      sendResponse(ImgHider.status);
    }

    if (request.message === "clicked_browser_action") {
      // toggle the status and show/hide
      ImgHider.toggle();
      // use the callback and pass it the show/hide status
      sendResponse(ImgHider.status);
    }

    if (request.message === "tab_changed_action") {
      // trigger a refresh
      // because toggling the icon when using multiple tabs will only affect the active tab
      // and if they are on the same domain the change wont apply to all tabs unless we do this
      ImgHider.refresh();
      // use the callback and pass it the show/hide status
      sendResponse(ImgHider.status);
    }
  }
);
