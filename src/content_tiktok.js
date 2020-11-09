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

    if (element) {
        const json = JSON.parse(element.innerHTML);
        const contentUrl = json.contentUrl;
        return contentUrl;
    }
    else {
        const source = document.getElementsByClassName('video-player')[0].src;
        return source;
    }
}

function findProfileUrl() {
    const element = document.getElementById('__NEXT_DATA__');
    const json = JSON.parse(element.innerHTML);

    if (json && 'userInfo' in json.props.pageProps) {
        let result = json.props.pageProps.userInfo.user.avatarLarger;

        if(!result) {
            result = json.props.pageProps.userInfo.user.avatarMedium;
        }

        if(!result) {
            result = json.props.pageProps.userInfo.user.avatarThumb;
        }

        return result;
    }
    else {
        const source = document.querySelector('.avatar > .avatar-wrapper').src;
        const result = source.replace("720x720", "1080x1080");
        return result;
    }
}
