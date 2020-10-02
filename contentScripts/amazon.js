console.log("Amazon");
var imgURL = chrome.runtime.getURL("images/get_started16.png");
// document.body.innerHTML = imgURL;
let myTab = document.getElementById("productDetails_detailBullets_sections1").children[0]
for (i = 0; i < 1; i++) {

    // GET THE CELLS COLLECTION OF THE CURRENT ROW.
    var objCells = myTab.rows.item(i).cells;
    // console.log(objCells);
    // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
    // for (var j = 0; j < 2; j++) {
    //      console.log(objCells.item(j).innerHTML);
    // }

    if(objCells.length == 2) {
        if(objCells.item(0).innerHTML.trim() == "ASIN") {
            console.log(objCells.item(1).innerHTML)
        }
    }
    
}
// traverse(myTab)
fetch('https://gist.githubusercontent.com/NavneetSinghGill/e38b6c60bc499d70b805f0e034cf0b0e/raw/f67adcf069264eba4fd8d467b993f0619f76ff0e/stores')
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
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });