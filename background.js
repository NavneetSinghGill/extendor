// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Update the declarative rules on install or upgrade.

var shared = {}
chrome.pageAction.onClicked.addListener(function (tab) {
  console.log("PageAction clicked: " + shared.id + " " + tab);
  // chrome.pageAction.show(tab.tabId, function () {
  //   console.log("in");
  // });
  // chrome.tabs.sendMessage(tab.tabId, {"document": "ASIN"}, (response) => {
  //   console.log("resp: ", response);
    // chrome.pageAction.setPopup({"popup": "./popup/index.html"}, () => {  
      chrome.pageAction.show(tab.tabId, () => {
  
      })
    // })
  // });
});

//Triggered when the tab is changed
chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.log("onActivated: ", activeInfo);
  //Request new ASIN from content script
  // chrome.tabs.sendMessage(activeInfo.tabId, {"deleteDocument": "oneRedMaple"}, () => {
  //   chrome.tabs.sendMessage(activeInfo.tabId, {"document": "ASIN"});
  // });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  //Asks to get ASIN because the tab is updated
  chrome.tabs.sendMessage(tabId, {"document": "ASIN"});
})

//Receives any message sent from other scripts
chrome.runtime.onMessage.addListener(
    function(message, sender, callback) {
      console.log("OnMessage received: ", message);
      if(message != undefined) {

        if (message.message === "new_asin") {
          setASIN(message.value);
        } else if(message.message === "executeReadData") {

        }

      }
});

function setASIN(newState) {
  getActiveTab((tab) => {
    chrome.pageAction.setPopup({"tabId" :tab.id, "popup": "popup/index.html"}, () => {
      if (tab) { // Sanity check
        console.log("tab: ", tab)
        chrome.pageAction.show(tab.id, () => {
          shared = newState;
          performFetchDetails();
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

function performFetchDetails() {
  (async () => {
    let readDataPath = chrome.extension.getURL('./popup/readData.js');
    let fetchDetails = await import(readDataPath);
  
    fetchDetails.default(shared, true, (div) => {
      getActiveTab((tab) => {
        var mainDiv = div.outerHTML;       
        var data = { mainDiv: mainDiv }; 

        //  This gives you a string in JSON syntax of the object above that you can send with XMLHttpRequest.
        var jsonMainDiv = JSON.stringify(data);

        //Load css before doing elements
        chrome.tabs.insertCSS({
          file: "popup/style.css"
        });
        chrome.tabs.insertCSS({
          file: "popup/store/style.css"
        });

        getActiveTab((tab) => {
          console.log("Send message - mainDiv runtime on connect: ", jsonMainDiv);
          chrome.tabs.sendMessage(tab.id,{"jsonMainDiv": jsonMainDiv});
        });
      });
    });
  })();
}