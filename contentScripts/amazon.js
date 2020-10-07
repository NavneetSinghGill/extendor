console.log("Amazon");

console.log(document.getElementById("ASIN").value)

// traverse(myTab)
// fetch('https://gist.githubusercontent.com/NavneetSinghGill/e38b6c60bc499d70b805f0e034cf0b0e/raw/f67adcf069264eba4fd8d467b993f0619f76ff0e/stores')
//   .then(
//     function(response) {
//         if (response.status !== 200) {
//         console.log('Looks like there was a problem. Status Code: ' +
//           response.status);
//         return;
//       }

//       // Examine the text in the response
//       response.json().then(function(data) {
//         console.log(data);
//         chrome.runtime.sendMessage({type: "popup_info"});
//       });
//     }
//   )
//   .catch(function(err) {
//     console.log('Fetch Error :-S', err);
//   });