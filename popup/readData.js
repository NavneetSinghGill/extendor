import storeFile from './store/index.js';
import config from '../config.js';

function addItem(key, value){
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.setAttribute('id', key);
    li.appendChild(document.createTextNode(key + ": " + value));
    ul.appendChild(li);
}

function addPageHeader(main) {  
  if(main != null) {
    var pageHeader = document.createElement("div");
    pageHeader.setAttribute("id", "pageHeader");

    var label = document.createElement("label");
    label.setAttribute('class', 'orm-label');
    label.setAttribute("id", "pageHeaderLabel");
    label.innerHTML = "One Red Maple";

    pageHeader.appendChild(label);
    main.appendChild(pageHeader);
  }
}

function addStores(data, main) {
  for(let detail of data.reverse()) {
    // console.log(detail);
    if(detail.shouldShow == 1) {
      var store = storeFile.store(detail, {
        description: false
      });
      main.appendChild(store);
    }
  }
}

var bg = chrome.extension.getBackgroundPage();
console.log("Read ASIN: " + bg.currentASIN);
fetchDetails(bg.currentASIN, false, () => {});

export default function fetchDetails(asin, shouldCreateNewContainer, callback) {
  console.log("FetchDetails called with endpoint: ", config.endpoint + "/getStores?asin=" + asin)
  fetch(config.endpoint + "/getStores?asin=" + asin)
  .then(
    function(response) {

      if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        
        let mainDiv = document.getElementById('main');
        if(shouldCreateNewContainer || mainDiv == null) {
          mainDiv = document.createElement('div');
          mainDiv.setAttribute('id', 'main');
        }
        addPageHeader(mainDiv);

        let popupStoreDivContainer = document.createElement('div');
        popupStoreDivContainer.setAttribute("class", "popupStoreDiv");
        addStores(data, popupStoreDivContainer);
        mainDiv.appendChild(popupStoreDivContainer);
        callback(mainDiv);

      });

    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
};
