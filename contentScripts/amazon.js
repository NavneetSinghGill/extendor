console.log("Amazon");

console.log("a" + document.getElementById("ASIN") + "a")
if(document.getElementById("ASIN") != null){
    chrome.runtime.sendMessage({
        "message": "new_asin",
        "value": document.getElementById("ASIN").value
    });
}

// var port = chrome.runtime.connect({name: "knockknock"});
// port.onMessage.addListener(function(message) {
//     console.log("amazon: ", message)
//   if (message.document != undefined)
//     port.postMessage({
//         "message": "new_asin",
//         "value": document.getElementById("ASIN").value
//     });
// });

// chrome.runtime.onConnect.addListener(function(port) {
//     console.log("amazon1: ", port)

//     port.onMessage.addListener(function(request) {
//     if (message.document != undefined)
//         port.postMessage({
//             "message": "new_asin",
//             "value": document.getElementById("ASIN").value
//         });
//     });
//   });

chrome.runtime.onMessage.addListener(
    (message, sender, callback) => {
        console.log("content S", document.getElementById(message.document).value);
        if (message.document != undefined) {
            let key = "new_asin"
            let value = document.getElementById(message.document).value
            // response({
            //     key: value 
            // });
            callback({
                "message": "new_asin",
                "value": document.getElementById("ASIN").value
            })
            chrome.runtime.sendMessage({
                "message": "new_asin",
                "value": document.getElementById("ASIN").value
            });
        }
    })

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