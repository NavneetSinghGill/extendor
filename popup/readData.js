import * as storeFile from './store/index.js';
// console.log(storeFile.store);

function fetchDetails() {
fetch('https://gist.githubusercontent.com/NavneetSinghGill/e38b6c60bc499d70b805f0e034cf0b0e/raw/f4dbfe0ef2932aa79a4551c9ca6d9a7ec4b86388/stores')
  .then(
    function(response) {
        if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        // chrome.runtime.sendMessage({type: "popup_info"});
        
        addPageHeader();
        addStores(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function addItem(key, value){
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.setAttribute('id', key);
    li.appendChild(document.createTextNode(key + ": " + value));
    ul.appendChild(li);
}

function addPageHeader() {
  var main = document.getElementById("main");
  
  var pageHeader = document.createElement("div");
  pageHeader.setAttribute("id", "pageHeader");

  var label = document.createElement("label");
  label.setAttribute('class', 'orm-label');
  label.setAttribute("id", "pageHeaderLabel");
  label.innerHTML = "One Red Maple";

  pageHeader.appendChild(label);
  main.appendChild(pageHeader);
}

function addStores(data) {
  for(let detail of data) {
    console.log(detail);
    var main = document.getElementById("main");
    var store = storeFile.store(detail);
    main.appendChild(store);
  }
}

fetchDetails();
