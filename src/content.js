chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message == 'getVscoImageUrl') {
        console.log('Received getVscoImageUrl message');
        sendResponse({ url: findImage() });
    }
    else {
        console.log('Received unknown message');
        sendResponse({});
    }
});

function findImage() {
    let url = document.querySelector("meta[property='og:image']").content;
    url = url.substring(0, url.lastIndexOf('?'));
    return url;
}
