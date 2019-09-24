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

function processProfileApiResponse(tab, json) {
    const profile_hd = json['graphql']['user']['profile_pic_url_hd'];
    const profile = json['graphql']['user']['profile_pic_url'];
    const url = profile_hd || profile;
    openUrl(tab, url);
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
    chrome.tabs.create({
        url: url,
        index: tab.index + 1,
        openerTabId: tab.id,
    });
}

chrome.browserAction.onClicked.addListener(function (tab) {
    console.log('Opening fullsize with URL: ' + tab.url);
    if (tab.url.startsWith('https://www.instagram.com/')) {
        // Accessing a profile image
        if (/^(https:\/\/www\.instagram\.com\/[a-zA-Z0-9_-]+)\/*$/.test(tab.url)) {
            // TODO: Higher resolution
            fetch(tab.url + '?__a=1').then(function (response) {
                return response.json();
            }).then(function (json) {
                processProfileApiResponse(tab, json);
            }).catch(function (error) {
                console.log('Error: ' + error);
            });
        }
        // Accessing an image/video
        if (/^(https:\/\/www\.instagram\.com\/p\/[a-zA-Z0-9_-]+)\/*$/.test(tab.url)) {
            fetch(tab.url + '?__a=1').then(function (response) {
                return response.json();
            }).then(function (json) {
                processApiResponse(tab, json);
            }).catch(function (error) {
                console.log('Error: ' + error);
            });
        }
        else {
            console.log('You tried to open Instagram fullsize with URL: ' + tab.url + ', but it does not match any known pattern');
        }
    }
    else if (tab.url.startsWith('https://vsco.co/')) {
        // Accessing a profile image
        if (/^(https:\/\/vsco.co\/.+\/images\/[0-9]+)$/.test(tab.url)) {
            chrome.tabs.sendMessage(tab.id, "getVscoProfileUrl", null, function (response) {
                if ('url' in response && response.url) {
                    openUrl(tab, response.url);
                }
                else {
                    console.log('Error: Could not find any URL');
                }
            });
        }
        // Accessing an image/video
        else if (/^(https:\/\/vsco.co\/.+\/media\/[a-zA-Z0-9_-]+)$/.test(tab.url)) {
            chrome.tabs.sendMessage(tab.id, "getVscoUrl", null, function (response) {
                if ('url' in response && response.url) {
                    openUrl(tab, response.url);
                }
                else {
                    console.log('Error: Could not find any URL');
                }
            });
        }
        else {
            console.log('You tried to open VSCO fullsize with URL: ' + tab.url + ', but it does not match any known pattern');
        }
    }
    else {
        console.log('You tried to open fullsize with URL: ' + tab.url + ', but it does not match any known pattern');
    }
});
