chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('Received ' + message + ' message');
    if (message == 'getTikTokUrl') {
        sendResponse({ url: findUrl() });
    }
    else if (message == 'getTikTokProfileUrl') {
        sendResponse({ url: findProfileUrl() });
    }
    else {
        sendResponse({});
    }
});

function findUrl() {
    return undefined;
}

function findProfileUrl() {
    return undefined;
}
