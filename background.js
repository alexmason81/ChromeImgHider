// background.js

var setBadgeText;

setBadgeText = function (status) {
  chrome.browserAction.setBadgeText({text:(status ? "show" : "hide")});
}

// add a listener to initialize the ImgHider when the page is loaded/updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0],
        message = "page_loaded";
    chrome.tabs.sendMessage(activeTab.id, {"message": message}, setBadgeText);
  });
});


// Called when the user clicks on the browser action.
// sends info to content.js
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0],
        message = "clicked_browser_action";
    chrome.tabs.sendMessage(activeTab.id, {"message": message}, setBadgeText);
  });
});

// add listener to change badge text when the tab changes
chrome.tabs.onActivated.addListener(function(tab) {
  // send a message to the active tab to get the show/hide status and pass the setBadgeText callback
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0],
        message = "tab_changed_action";
    chrome.tabs.sendMessage(activeTab.id, {"message": message}, setBadgeText);
  });
});
