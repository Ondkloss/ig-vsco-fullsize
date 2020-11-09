chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('Received ' + message + ' message');
    if (message == 'getVscoUrl') {
        sendResponse({ url: findUrl() });
    }
    else if (message == 'getVscoProfileUrl') {
        sendResponse({ url: findProfileUrl() });
    }
    else {
        sendResponse({});
    }
});

function findUrl() {
    const imageElement = document.querySelector("meta[property='og:image']");
    const videoElement = document.querySelector("meta[property='og:video']");

    if (videoElement) {
        return videoElement.content;
    }
    else {
        const content = imageElement.content;
        return content.substring(0, content.lastIndexOf('?'));
    }
}

function findProfileUrl() {
    const imageElement = document.querySelector("img[class*='css-1u1zie3']");
    const content = imageElement.src;
    return content.substring(0, content.lastIndexOf('?'));
}
