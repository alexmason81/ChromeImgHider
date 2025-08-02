// background.js - Manifest V3 (Service Worker)

const MESSAGE_CONSTANTS = {
  PAGE_LOADED: 'page_loaded',
  TAB_CHANGED: 'tab_changed_action',
  ICON_CLICKED: 'clicked_browser_action',
};

// Utility to update the badge text
function setBadgeText(status) {
  const text = typeof status === 'boolean' ? (status ? 'hide' : 'show') : '';
  chrome.action.setBadgeText({ text });
}

// Send a message to the active tab
async function sendToActiveTab(message) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.id) {
    chrome.tabs.sendMessage(tab.id, { message }, (response) => {
      setBadgeText(response);
    });
  }
}

// Initialize the extension's context menu
async function initContextMenu() {
  const { hideBgImages } = await chrome.storage.sync.get('hideBgImages');

  await chrome.contextMenus.removeAll();

  chrome.contextMenus.create({
    id: 'hideBgImages',
    title: 'Hide Background Images?',
    type: 'checkbox',
    contexts: ['action'],
    checked: Boolean(hideBgImages),
  });
}

// Listen for context menu changes
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'hideBgImages') {
    await chrome.storage.sync.set({ hideBgImages: info.checked });
    sendToActiveTab(MESSAGE_CONSTANTS.PAGE_LOADED);
  }
});

// Listen for changes from content or options page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'prefChanged' && request.prefName === 'hideBgImages') {
    chrome.contextMenus.update('hideBgImages', { checked: request.value });
  }
});

// Trigger initialization and badge updates on events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    sendToActiveTab(MESSAGE_CONSTANTS.PAGE_LOADED);
  }
});

chrome.tabs.onActivated.addListener(() => {
  sendToActiveTab(MESSAGE_CONSTANTS.TAB_CHANGED);
});

chrome.action.onClicked.addListener(() => {
  sendToActiveTab(MESSAGE_CONSTANTS.ICON_CLICKED);
});

// Initialize everything on service worker startup
initContextMenu();
