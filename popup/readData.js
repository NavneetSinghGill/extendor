import * as storeFile from './store/index.js';
// console.log(storeFile.store);

function fetchDetails() {
fetch('https://gist.githubusercontent.com/NavneetSinghGill/e38b6c60bc499d70b805f0e034cf0b0e/raw/02ee7ca113447085c4225f823af7b61309258f13/stores')
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
        
        for(let dict of data) {
          console.log(dict);
          addStore(dict);
        }
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

function addStore(details) {
    var main = document.getElementById("main");
    var store = storeFile.store(details);
    main.appendChild(store);
}

fetchDetails();
