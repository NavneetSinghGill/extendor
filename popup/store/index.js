// import "./style.css";
function store(details, show) {
    var divContainer = document.createElement("div");
    divContainer.setAttribute('class', 'popup-store-divContainer');
//     divContainer.style.backgroundColor = '#e5e5e5'

//     var element = document.createElement("link");
// element.setAttribute("rel", "stylesheet");
// element.setAttribute("type", "text/css");
// element.setAttribute("href", "style.css");
// divContainer.appendChild(element);
    
    // var link = document.createElement('style.css');
    // link.rel = 'stylesheet';  
    // link.type = 'text/css'; 
    // link.href = 'style.css'; 
    // link.href = "style.css";
    // divContainer.style = link;

    // // Get the first script tag
    // var ref = document.querySelector('script');

    // // Insert our new styles before the first script tag
    // ref.parentNode.insertBefore(link, ref);

    var storeImage = document.createElement("img");
    storeImage.setAttribute('class', 'popup-store-image')
    storeImage.setAttribute('src', details.storeImage)
    
    var textContainerDiv = document.createElement("div");
    textContainerDiv.setAttribute('class', 'popup-store-textContainer-div');

        var storeNameLabel = document.createElement("label");
        storeNameLabel.setAttribute('class', 'popup-store-label popup-store-name-label')
        storeNameLabel.innerHTML =  details.storeName;
        textContainerDiv.appendChild(storeNameLabel);
        
        var priceLabel = document.createElement("label");
        priceLabel.setAttribute('class', 'popup-store-label popup-store-price-label')
        priceLabel.innerHTML = details.price;
        textContainerDiv.appendChild(priceLabel);

        if(show && show.description) {
            var descriptionLabel = document.createElement("label");
            descriptionLabel.setAttribute('class', 'popup-store-label popup-store-description-label')
            descriptionLabel.innerHTML = details.description;
            textContainerDiv.appendChild(descriptionLabel);
        }

        var storeDistanceLabel = document.createElement("label");
        storeDistanceLabel.setAttribute('class', 'popup-store-label popup-store-distance-label')
        storeDistanceLabel.innerHTML = details.distance;

    var redirectionAnchor = document.createElement('a');
    redirectionAnchor.setAttribute('class', 'popup-store-redirection-anchor');
    redirectionAnchor.setAttribute('href', details.storeLink);
    redirectionAnchor.setAttribute("target", "_blank");


    divContainer.appendChild(storeImage);
    divContainer.appendChild(textContainerDiv);
    divContainer.appendChild(storeDistanceLabel);
    divContainer.appendChild(redirectionAnchor);

    return divContainer;
}

export {store};