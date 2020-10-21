
//Fetch the details using ASIN
console.log("ASIN document", document.getElementById("ASIN"))
if(document.getElementById("ASIN") != null){
    chrome.runtime.sendMessage({
        "message": "new_asin",
        "value": document.getElementById("ASIN").value
    });
    // chrome.runtime.sendMessage({
    //     "message": "addPopupOverPage"
    // }, (response) => {

    // });
    // let mainPageURL = chrome.runtime.getURL("popup/index.html");//---------------

    // var div = document.createElement("iframe");
    // div.src = mainPageURL;
    // div.name = "frame"

    // div.style.zIndex = '100000';
    // div.style.width = '360px';
    // div.style.height = '600px';
    // div.style.position = 'fixed';
    // div.style.top = '20px';
    // div.style.right = '20px';
    // div.style.backgroundColor = 'white';
    // div.style.boxShadow = '0px 0px 50px 5px grey';

    // document.body.appendChild(div);

    // fetch(mainPageURL)
    // .then((response) => {
    //     return response.text();
    // })
    // .then((response) => {
    //     console.log("Text html: ", response);
    //     var parser = new DOMParser();
    //     var mainPage = parser.parseFromString(response, 'text/html');
    //     console.log("New begi url: ", mainPageURL); 
    //     console.log("New begi: ", mainPage.body);
        
    //     let div = mainPage.body;
    //     // let div = document.createElement("div");
    //     div.style.zIndex = '100000';
    //     div.style.width = '360px';
    //     div.style.height = '600px';
    //     div.style.position = 'fixed';
    //     div.style.top = '20px';
    //     div.style.right = '20px';
    //     div.style.backgroundColor = 'red';
    //     div.style.borderColor = 'black';
    //     div.style.borderWidth = '2px';

    //     console.log("Final Popup", div);
    //     document.body.appendChild(div);
        
    //     // div.insertAdjacentHTML('afterend', response);
    //     div.innerHTML += response;

    //     // var scriptTag = document.createElement('script');
    //     // scriptTag.src = chrome.runtime.getURL("popup/index.html");

    //     // div.appendChild(scriptTag);

        chrome.runtime.sendMessage({
            "message": "executeReadData",
        });
    // })

}

// var port = chrome.runtime.connect({name: "contentScript"});
// port.postMessage({connection: "addPopupOverPage"});
// port.onMessage.addListener(function(message) {
//     console.log("Long live port: ", message);
//     if (message.mainDiv != undefined)
//         console.log("Port message received: ", message.mainDiv);

//         let div = message.mainDiv;
//         console.log("Popup", div);
//         // div.style.zIndex = '100000';
//         div.style.width = '300px';
//         div.style.height = '600px';
//         div.style.position = 'fixed';
//         div.style.top = '20px';
//         div.style.right = '20px';
//         div.style.backgroundColor = 'red';
//         div.style.borderColor = 'black';
//         div.style.borderWidth = '2px';
        
//         console.log("Final Popup", div);

//         document.body.appendChild(div);
// });
    
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
            } else if(message.jsonMainDiv != undefined) {
                let parsedValue1 = JSON.parse(message.jsonMainDiv).mainDiv;

                let div = document.createElement('div');
                
                div.style.zIndex = '100000';
                div.style.width = '300px';
                div.style.height = '600px';
                div.style.position = 'fixed';
                div.style.top = '20px';
                div.style.right = '20px';
                div.style.backgroundColor = 'red';
                div.style.borderColor = 'black';
                div.style.borderWidth = '2px';
                
                document.body.appendChild(div);
                div.innerHTML = parsedValue1;

                console.log("jsonMainDiv:::::::::::::::::::::::: ", newDiv);
            }
        }
    }
)