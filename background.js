// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Update the declarative rules on install or upgrade.

let addPopupOverPage = (async () => {
  let readDataPath = chrome.extension.getURL('./popup/readData.js');
  let fetchDetails = await import(readDataPath);

  fetchDetails.default(currentASIN, true, (mainDiv) => {
    getActiveTab((tab) => {
      console.log("Send message - mainDiv addPopupOverPage method", mainDiv);
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
              console.log("Send message - mainDiv on message addPopupOverPage", mainDiv);
              callback({"mainDiv": mainDiv});
            });
          });
        } else if(message.message === "executeReadData") {

          (async () => {
            let readDataPath = chrome.extension.getURL('./popup/readData.js');
            let fetchDetails = await import(readDataPath);
          
            fetchDetails.default(currentASIN, true, (div) => {
              getActiveTab((tab) => {

                // let div1 = document.createElement('div');
                // div1.setAttribute('id', 'dd1');
                // let div2 = document.createElement('div');
                // let div3 = document.createElement('div');
                // div2.appendChild(div3);
                // div1.appendChild(div2);

                // console.log("Send message - mainDiv runtime on connect: ", div1);
                // chrome.tabs.sendMessage(tab.id, {"mainDiv": mainDiv});
                var mainDiv = div.outerHTML;       
                var data = { mainDiv: mainDiv }; 
    
                //  This gives you a string in JSON syntax of the object above that you can 
                // send with XMLHttpRequest.
                
                var jsonMainDiv = JSON.stringify(data);
                // port.postMessage({"jsonMainDiv": div1});
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

                // chrome.tabs.executeScript({
                //   file: "popup/readData.js"
                // });
              });
            });
          })();

          // let mainPageURL = chrome.runtime.getURL("popup/index.html");
          // fetch(mainPageURL)
          // .then((response) => {
          //     return response.text();
          // })
          // .then((response) => {
          //     console.log("Text html: ", response);
          //     var parser = new DOMParser();
          //     var mainPage = parser.parseFromString(response, 'text/html');
          //     console.log("New begi url: ", mainPageURL); 
          //     console.log("New begi: ", mainPage.body);

          //     // chrome.tabs.executeScript({
          //     //   file: "popup/readData.js"
          //     // });
          // });

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
            console.log("Send message - mainDiv runtime on connect: ", currentASIN, mainDiv);
            // chrome.tabs.sendMessage(tab.id, {"mainDiv": mainDiv});
            var mainDiv = mainDiv.outerHTML;       
            var data = { mainDiv: mainDiv }; 

            //  This gives you a string in JSON syntax of the object above that you can 
            // send with XMLHttpRequest.
            var jsonMainDiv = JSON.stringify(data);
            port.postMessage({"jsonMainDiv": jsonMainDiv});
          });
        });
      })();
      
  });
});