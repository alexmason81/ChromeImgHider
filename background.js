// background.js

var setBadgeText, sendToContent, MESSAGE_CONSTANTS = {};

// callback for udpating the badge text
setBadgeText = function (status) {
  var badgeText = status ? 'hide' : 'show';
  if (typeof status != 'boolean') {
    badgeText = '';
  }
  chrome.browserAction.setBadgeText({text:(badgeText)});
};


// callback for sending messages to the content script
sendToContent = function (tab, message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: message }, setBadgeText);
  });
};

MESSAGE_CONSTANTS.page_loaded = 'page_loaded';
MESSAGE_CONSTANTS.tab_changed_action = 'tab_changed_action';
MESSAGE_CONSTANTS.clicked_browser_action = 'clicked_browser_action';

// get the storage data and load the context menu with related listeners and etc.
chrome.storage.sync.get(null, function (prefs) {
  // have to do all the context menu setup here because of the callback
  // used by the storage sync. I haven't found a better way to get the value
  // without waiting for the callback, unfortunately.

  // remvove existing context menus (so fresh and so clean, clean)
  chrome.contextMenus.removeAll();

  // create our context menus
  chrome.contextMenus.create({
    id: 'hideBgImages',
    title: 'Hide Background Images?',
    type: 'checkbox',
    contexts: ['browser_action'],
    checked: prefs.hideBgImages
  });

  // add a click listner for our menu items
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
      switch (info.menuItemId) {
        case 'hideBgImages':
          var tmp = {};
          tmp[info.menuItemId] = info.checked;
          chrome.storage.sync.set(tmp, function () {
            // trigger the page loaded message
            sendToContent(tab, MESSAGE_CONSTANTS.page_loaded);
          });
          break;
      }
  });

  // add a listener for if the setting is changed in the options page
  chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('pref changed');
    if (request.method == 'prefChanged'  && request.prefName == 'hideBgImages') {
      chrome.contextMenus.update('hideBgImages', { checked: request.value });
    }
  });

});



// add a listener to initialize the ImgHider when the page is loaded/updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  sendToContent(tab, MESSAGE_CONSTANTS.page_loaded);
});

// Called when the user clicks on the browser action.
// sends info to content.js
chrome.browserAction.onClicked.addListener(function(tab) {
  sendToContent(tab, MESSAGE_CONSTANTS.clicked_browser_action);
});

// add listener to change badge text when the tab changes
chrome.tabs.onActivated.addListener(function(tab) {
  sendToContent(tab, MESSAGE_CONSTANTS.tab_changed_action);
});
