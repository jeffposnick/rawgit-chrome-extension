var gitHubUrlRegex = /https?:\/\/(?:[^\.]+\.)?github.com/i;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'loading' && gitHubUrlRegex.test(tab.url)) {
    chrome.tabs.executeScript(tabId, {
      file: 'scripts/rawgit.js'
    });
  }
});
