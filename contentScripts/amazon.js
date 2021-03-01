
//Fetch the details using ASIN
console.log("ASIN document", document.getElementById("ASIN"))
if(document.getElementById("ASIN") != null){

    //Commented because it will be triggered from onUpdated in background.js

    // chrome.runtime.sendMessage({
    //     "message": "new_asin",
    //     "value": document.getElementById("ASIN").value
    // });

}

chrome.runtime.onMessage.addListener(
    (message, sender, callback) => {
        console.log("amazon.js - On message: ", message);
        if(message != null) {
            if(message.document == "ASIN") {
                var newState = {
                    "id" : document.getElementById("ASIN").value,
                    "text": document.title
                }
                console.log("newState: ", newState);
                chrome.runtime.sendMessage({
                    "message": "new_asin",
                    "value": newState
                });
            } else if (message.document != undefined) {
                chrome.runtime.sendMessage({
                    "message": "new_asin",
                    "value": document.getElementById(message.document).value
                });
            } else if(message.jsonMainDiv != undefined) {
                let parsedValue1 = JSON.parse(message.jsonMainDiv).mainDiv;

                let div = document.createElement('div');
                div.setAttribute('id', 'oneRedMaple');
                
                document.body.appendChild(div);
                div.innerHTML = parsedValue1;

                console.log("jsonMainDiv:::::::::::::::::::::::: ", div.childNodes);
            } else if(message.deleteDocument != undefined) {
                let elementToDelete = document.getElementById(message.deleteDocument)
                elementToDelete.parentElement.removeChild(elementToDelete);
                callback();
            }
        }
    }
)