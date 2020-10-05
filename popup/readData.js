fetch('https://gist.githubusercontent.com/NavneetSinghGill/e38b6c60bc499d70b805f0e034cf0b0e/raw/fb89f5b75a4eb11bc3b4880c885fa679160b5312/stores')
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
        let dict = data[0];
        console.log(dict);
        for(key in dict) {
            console.log(key + ": " + dict[key]);
            addItem(key, dict[key]);
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function addItem(key, value){
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.setAttribute('id', key);
    li.appendChild(document.createTextNode(key + ": " + value));
    ul.appendChild(li);
}