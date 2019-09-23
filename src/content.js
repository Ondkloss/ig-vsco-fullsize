chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message == 'getVscoUrl') {
        console.log('Received getVscoUrl message');
        sendResponse({ url: findUrl() });
    }
    else {
        console.log('Received unknown message');
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
