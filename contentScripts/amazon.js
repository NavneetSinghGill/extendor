
//Fetch the details using ASIN
console.log("ASIN document", document.getElementById("ASIN"))
if(document.getElementById("ASIN") != null){
    chrome.runtime.sendMessage({
        "message": "new_asin",
        "value": document.getElementById("ASIN").value
    });

    chrome.runtime.sendMessage({
        "message": "executeReadData",
    });
}

chrome.runtime.onMessage.addListener(
    (message, sender, callback) => {
        console.log("amazon.js - On message: ", message);
        if(message != null) {
            if (message.document != undefined) {
                chrome.runtime.sendMessage({
                    "message": "new_asin",
                    "value": document.getElementById(message.document).value
                });
            } else if(message.jsonMainDiv != undefined) {
                let parsedValue1 = JSON.parse(message.jsonMainDiv).mainDiv;

                let div = document.createElement('div');
                div.setAttribute('id', 'bodyContainer');
                
                document.body.appendChild(div);
                div.innerHTML = parsedValue1;

                console.log("jsonMainDiv:::::::::::::::::::::::: ", div.childNodes);
            }
        }
    }
)