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
    const element = document.getElementById('videoObject');
    const json = JSON.parse(element.innerHTML);
    const contentUrl = json.contentUrl;
    return contentUrl;
}

function findProfileUrl() {
    const element = document.getElementById('__NEXT_DATA__');
    const json = JSON.parse(element.innerHTML);
    const avatarMedium = json.props.pageProps.userInfo.user.avatarMedium;
    const result = avatarMedium.replace("720x720", "1080x1080");
    return result;
}
