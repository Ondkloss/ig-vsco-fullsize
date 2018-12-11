"use strict";

chrome.browserAction.onClicked.addListener(function (tab) {
    if (/^(https:\/\/www\.instagram\.com\/p\/[a-zA-Z0-9_-]+)\/*$/.test(tab.url)) {
        console.log('Opening fullsize with URL: ' + tab.url);
        fetch(tab.url + '?__a=1').then(function (response) {
            return response.json();
        }).then(function (json) {
            const resources = json['graphql']['shortcode_media']['display_resources'];

            const max = resources.reduce(function (a, b) {
                return (a.config_width > b.config_width) ? a : b
            });
            chrome.tabs.create({ url: max.src, index: tab.index + 1 });
        }).catch(function (error) {
            console.log('Error: ' + error);
        });
    }
    else {
        console.log('You tried to open fullsize with URL: ' + tab.url + ', but it does not match any known pattern');
    }
});
