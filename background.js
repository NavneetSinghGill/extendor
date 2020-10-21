// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Update the declarative rules on install or upgrade.

let addPopupOverPage = (async () => {
  let readDataPath = chrome.extension.getURL('./popup/readData.js');
  let fetchDetails = await import(readDataPath);

  fetchDetails.default(currentASIN, true, (mainDiv) => {
    getActiveTab((tab) => {
      console.log("Send message - mainDiv", mainDiv);
      chrome.tabs.sendMessage(tab.id, {"mainDiv": mainDiv});
    });
  });
});

var currentASIN = ""
chrome.pageAction.onClicked.addListener(function (tab) {
  console.log("curr " + currentASIN)
  console.log("pageAction clicked");
  // chrome.pageAction.show(tab.tabId, function () {
  //   console.log("in");
  // });
  // chrome.tabs.sendMessage(tab.tabId, {"document": "ASIN"}, (response) => {
  //   console.log("resp: ", response);
    // chrome.pageAction.setPopup({"popup": "./popup/index.html"}, () => {  
      console.log(tab);
      chrome.pageAction.show(tab.tabId, () => {
  
      })
    // })
  // });
});

//Triggered when the tab is changed
chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.log("onActivated: ", activeInfo)
  //Request new ASIN from content script
  chrome.tabs.sendMessage(activeInfo.tabId, {"document": "ASIN"});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.tabs.sendMessage(tabId, {"document": "ASIN"});
})

//Receives any message sent from other scripts
chrome.runtime.onMessage.addListener(
    function(message, sender, callback) {
      console.log(message)
      if(message != undefined) {
        if (message.message === "new_asin") {
          setASIN(message.value);
        } else if(message.message === "addPopupOverPage") {
          // addPopupOverPage();
          fetchDetails.default(currentASIN, true, (mainDiv) => {
            getActiveTab((tab) => {
              console.log("Send message - mainDiv", mainDiv);
              callback({"mainDiv": mainDiv});
            });
          });
        }
      }
});

function setASIN(asin) {
  getActiveTab((tab) => {
    chrome.pageAction.setPopup({"tabId" :tab.id, "popup": "popup/index.html"}, () => {
      if (tab) { // Sanity check
        console.log("tab: ", tab)
        chrome.pageAction.show(tab.id, () => {
          currentASIN = asin;
      })
      }
    })
  });
}

function getActiveTab(callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    if(tab != undefined) {
      callback(tab);
    }
  });
}

// var port = chrome.runtime.connect({name: "contentScript"});
// port.postMessage({connection: "AmazonToBackgroundScript"});
// port.onMessage.addListener(function(message) {
//   if (message.mainDiv != undefined)
//     console.log("Port message received: ", message.mainDiv);
// });

chrome.runtime.onConnect.addListener(function(port) {
  // console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(message) {
    if (message.connection == "addPopupOverPage")

      (async () => {
        let readDataPath = chrome.extension.getURL('./popup/readData.js');
        let fetchDetails = await import(readDataPath);
      
        fetchDetails.default(currentASIN, true, (mainDiv) => {
          getActiveTab((tab) => {
            console.log("Send message - mainDiv", mainDiv);
            // chrome.tabs.sendMessage(tab.id, {"mainDiv": mainDiv});
            port.postMessage({"mainDiv": "HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII"});
          });
        });
      })();
      
  });
});