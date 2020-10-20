
//Fetch the details using ASIN
console.log("ASIN document", document.getElementById("ASIN"))
if(document.getElementById("ASIN") != null){
    chrome.runtime.sendMessage({
        "message": "new_asin",
        "value": document.getElementById("ASIN").value
    });
    chrome.runtime.sendMessage({
        "message": "addPopupOverPage"
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
            } else if(message.mainDiv != undefined) {
                let div = message.mainDiv;
                console.log("Popup", div);
                // div.style.zIndex = '100000';
                div.style.width = '300px';
                div.style.height = '600px';
                div.style.position = 'fixed';
                div.style.top = '20px';
                div.style.right = '20px';
                div.style.backgroundColor = 'red';
                div.style.borderColor = 'black';
                div.style.borderWidth = '2px';
                
                console.log("Final Popup", div);

                document.body.appendChild(div);
                // document.getElementById("diver").innerHTML='<object type="text/html" data="./contentScripts/starta.html"></object>';
            }
        }
    }
)