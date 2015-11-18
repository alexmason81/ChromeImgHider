// content.js

var ImgHide, ImgShow, ImgHiderInit;

ImgHide = function () {
  // set all img elements to have no opacity
  jQuery('img').css('opacity', '0');

  jQuery('img').hover(
    function () {
      jQuery(this).fadeTo(1, 1); // fade to visible on mouse enter
    },
    function () {
      jQuery(this).fadeTo(1, 0); // fade to invidible on mouse leave
    }
  );
};

ImgShow = function () {
  // set all img elements to have full opacity
  jQuery('img').css('opacity', '1');

  jQuery('img').off('mouseenter mouseleave');
};


ImgHiderInit = function () {
  // If there is no cache set in localStorage, or the cache is older than 1 hour:
	if (typeof localStorage.hideImages == 'undefined') {
    // default to off
    localStorage.hideImages = 'true';
  }

  localStorage.hideImages == 'true' ? ImgHide() : ImgShow();
}


jQuery(function () {
  ImgHiderInit();
});


// listen for backgroun.js being clicked (icon)
// and do something with the data received
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      // toggle the localStorage
      localStorage.hideImages = (localStorage.hideImages == 'true' ? 'false' : 'true');
      // re-intialize
      ImgHiderInit();
    }
  }
);
