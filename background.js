/*chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });*/
console.log("Hi2");
// chrome.tabs.onActivated.addListener(function (tab) {
//     var props
//     for (var propertyName in tab) {
//         // propertyName is what you want
//         // you can get the value like this: myObject[propertyName]
//         props = props + propertyName + ": " + tab[propertyName] + "\n"
//     }
//     // alert(props);
//     console.log(props);
// });
// chrome.tabs.onActivated.addListener(function (tab) {
//   // chrome.runtime.getBackgroundPage(function (window) {
//   //   console.log(window.HTMLTableElement())
//   // })
//   console.log(tab.id)
//   chrome.pageCapture.saveAsMHTML({"tabId": tab}, function (mhtmlData) {
//     console.log("LoLo");
// })
// }); 