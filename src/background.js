"use strict";

function processApiResponse(tab, json) {
    // Multiple images
    if ('edge_sidecar_to_children' in json['graphql']['shortcode_media']) {
        const children = json['graphql']['shortcode_media']['edge_sidecar_to_children']['edges'];
        for (let i = 0; i < children.length; i++) {
            const child = children[i]['node']['display_resources'];
            processImageNode(tab, child);
        }
    }
    // Video
    else if ('video_url' in json['graphql']['shortcode_media']) {
        const url = json['graphql']['shortcode_media']['video_url'];
        openUrl(tab, url);
    }
    // Single image
    else {
        const child = json['graphql']['shortcode_media']['display_resources'];
        processImageNode(tab, child);
    }
}

function processImageNode(tab, resources) {
    const max = resources.reduce(function (a, b) {
        return (a.config_width > b.config_width) ? a : b
    });
    openUrl(tab, max.src);
}

function openUrl(tab, url) {
    chrome.tabs.create({ url: url, index: tab.index + 1 });
}

chrome.browserAction.onClicked.addListener(function (tab) {
    if (/^(https:\/\/www\.instagram\.com\/p\/[a-zA-Z0-9_-]+)\/*$/.test(tab.url)) {
        console.log('Opening fullsize with URL: ' + tab.url);
        fetch(tab.url + '?__a=1').then(function (response) {
            return response.json();
        }).then(function (json) {
            processApiResponse(tab, json);
        }).catch(function (error) {
            console.log('Error: ' + error);
        });
    }
    else {
        console.log('You tried to open fullsize with URL: ' + tab.url + ', but it does not match any known pattern');
    }
});
