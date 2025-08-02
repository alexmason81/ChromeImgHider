// content.js - Injected into pages via content script

const ImgHider = {
  status: false, // true = hidden, false = visible

  hide: function () {
    // Hide background images if preference is enabled
    chrome.storage.sync.get('hideBgImages', ({ hideBgImages }) => {
      if (hideBgImages) {
        const allElements = document.getElementsByTagName('*');

        for (let i = 0; i < allElements.length; i++) {
          const el = allElements[i];
          const style = getComputedStyle(el);
          const bgImage = style.backgroundImage || '';
          const bg = style.background || '';

          if (bg.includes('url(') || bgImage.includes('url(')) {
            el.classList.add('ChromeBgHider');
          }
        }
      } else {
        // Remove background hider class
        const bgHidden = document.getElementsByClassName('ChromeBgHider');
        for (let i = bgHidden.length - 1; i >= 0; i--) {
          try {
            bgHidden[i].classList.remove('ChromeBgHider');
          } catch (e) {
            // Element may be detached or invalid
            console.warn('Error removing background class:', e);
          }
        }
      }
    });

    // Inject stylesheet if not already injected
    if (!document.getElementById('ChromeImgHider')) {
      const link = document.createElement('link');
      link.href = chrome.runtime.getURL('style-hide.css');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.id = 'ChromeImgHider';
      document.head.appendChild(link);
    }
  },

  show: function () {
    const link = document.getElementById('ChromeImgHider');
    if (link) {
      link.remove();
    }

    // Remove background hiding if present
    const bgHidden = document.getElementsByClassName('ChromeBgHider');
    for (let i = bgHidden.length - 1; i >= 0; i--) {
      try {
        bgHidden[i].classList.remove('ChromeBgHider');
      } catch (e) {
        console.warn('Error removing background class:', e);
      }
    }
  },

  persist: function () {
    localStorage.hideImages = JSON.stringify(this.status);
  },

  refresh: function () {
    if (localStorage.hideImages === undefined) {
      this.status = true; // Default to hiding
      this.persist();
    } else {
      this.status = JSON.parse(localStorage.hideImages);
    }

    this.status ? this.hide() : this.show();
  },

  toggle: function () {
    this.status = !this.status;
    this.persist();
    this.status ? this.hide() : this.show();
  },

  init: function () {
    this.refresh();
  }
};

// Message listener from background service worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case 'page_loaded':
      ImgHider.init();
      sendResponse(ImgHider.status);
      break;

    case 'clicked_browser_action':
      ImgHider.toggle();
      sendResponse(ImgHider.status);
      break;

    case 'tab_changed_action':
      ImgHider.refresh();
      sendResponse(ImgHider.status);
      break;
  }

  // Return true if response is async (not needed here)
  return false;
});
