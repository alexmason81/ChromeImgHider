// content.js

var ImgHide, ImgShow, ImgHiderInit;

ImgHide = function () {
  // inject the hide stylesheet to hide images and grant hover.
  var link = document.createElement("link");
  link.href = chrome.extension.getURL("style-hide.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.id = "ChromeImgHider";
  document.getElementsByTagName("head")[0].appendChild(link);
};

ImgShow = function () {
  // Remove the hide stylesheet so everything goes back to "normal"
  var link = document.getElementById("ChromeImgHider");
  if (null != link && typeof link != "undefined") {
    document.getElementsByTagName("head")[0].removeChild(link);
  }
};


ImgHiderInit = function () {
  // If there is no cache set in localStorage, or the cache is older than 1 hour:
	if (typeof localStorage.hideImages == 'undefined') {
    // default to off
    localStorage.hideImages = 'true';
  }

  localStorage.hideImages == 'true' ? ImgHide() : ImgShow();
}


// initialize this beast
ImgHiderInit();



// listen for backgroun.js being clicked (icon)
// and do something with the data received
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      // toggle the localStorage
      localStorage.hideImages = (localStorage.hideImages == 'true' ? 'false' : 'true');
      // re-intialize
      ImgHiderInit();
      // use the callback and pass it the show/hide status
      sendResponse(localStorage.hideImages);
    }

    if (request.message === "tab_changed_action") {
      // use the callback and pass it the show/hide status
      sendResponse(localStorage.hideImages);
    }
  }
);
