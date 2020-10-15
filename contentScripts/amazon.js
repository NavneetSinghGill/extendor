console.log("amazon.js");

console.log("ASIN document", document.getElementById("ASIN"))
if(document.getElementById("ASIN") != null){
    chrome.runtime.sendMessage({
        "message": "new_asin",
        "value": document.getElementById("ASIN").value
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
            }
        }
    }
)