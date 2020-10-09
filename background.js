// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Update the declarative rules on install or upgrade.

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [
//         // When a page contains a <video> tag...
//         new chrome.declarativeContent.PageStateMatcher({
//           css: ["video"]
//         })
//       ],
//       // ... show the page action.
//       actions: [new chrome.declarativeContent.ShowPageAction() ]
//     }]);
//   });
// });
// chrome.runtime.onMessage.addListener(function(request) {
//   if (request.type === 'popup_info') {
//     chrome.tabs.create({
//       url: chrome.extension.getURL('popup/index.html'),
//       active: false
//   }, function(tab) {
//       // After the tab has been created, open a window to inject the tab
//       chrome.windows.create({
//           tabId: tab.id,
//           type: 'popup',
//           focused: true
//           // incognito, top, left, ...
//       });
//   });
//   }
// });
chrome.pageAction.onClicked.addListener(function (tab) {
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
  console.log("pageAction clicked");
  // chrome.pageAction.show(tab.tabId, function () {
  //   console.log("in");
  // });

  chrome.pageAction.setPopup({"popup": "./popup/index.html"}, () => {
    console.log(tab);
    chrome.pageAction.show(tab.tabId, () => {

    })
  })
});

// chrome.browserAction.onClicked.addListener(function (tab) {
//     console.log("browserAction clicked");
// });