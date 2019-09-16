"use strict";

// Instagram functionality
function processApiResponse(tab, json) {
    const root = json['graphql']['shortcode_media'];

    // Multiple
    if ('edge_sidecar_to_children' in root) {
        const nodes = root['edge_sidecar_to_children']['edges'];
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i]['node'];
            processNode(tab, node);
        }
    }
    // Single
    else {
        const node = root;
        processNode(tab, node);
    }
}

function processNode(tab, node) {
    // Video
    if ('video_url' in node) {
        const element = node['video_url'];
        openUrl(tab, element);
    }
    // Image
    else if ('display_resources' in node) {
        const element = node['display_resources'];
        processImageNode(tab, element);
    }
}

function processImageNode(tab, resources) {
    const max = resources.reduce(function (a, b) {
        return (a.config_width > b.config_width) ? a : b
    });
    openUrl(tab, max.src);
}

// General functionality
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
    else if (/^(https:\/\/vsco.co\/.+\/media\/[a-zA-Z0-9_-]+)$/.test(tab.url)) {
        console.log('Opening fullsize with URL: ' + tab.url);
        chrome.tabs.sendMessage(tab.id, "getVscoImageUrl", null, function (response) {
            if ('url' in response && response.url) {
                openUrl(tab, response.url);
            }
            else {
                console.log('Error: Could not find any image URL');
            }
        });
    }
    else {
        console.log('You tried to open fullsize with URL: ' + tab.url + ', but it does not match any known pattern');
    }
});
