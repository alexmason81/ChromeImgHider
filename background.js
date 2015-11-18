// background.js


// Called when the user clicks on the browser action.
// sends info to content.js
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0],
        message = "clicked_browser_action";
    chrome.tabs.sendMessage(activeTab.id, {"message": message});
  });
});
