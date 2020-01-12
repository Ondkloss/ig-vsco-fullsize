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
    const profile_id = json['graphql']['user']['id'];
    const profile_hd = json['graphql']['user']['profile_pic_url_hd'];
    const profile = json['graphql']['user']['profile_pic_url'];
    const fallback_url = profile_hd || profile;
    let opened = false;

    fetch(`https://i.instagram.com/api/v1/users/${profile_id}/info/`)
        .then(result => result.json())
        .then(json => {
            // Use 1080x1080 (or high res) if available
            if (['hd_profile_pic_url_info'] in json['user']) {
                const url = json['user']['hd_profile_pic_url_info']['url'];
                openUrl(tab, url);
                opened = true;
            }
        }).catch(reason => console.error(reason))
        .finally(() => {
            if (!opened) {
                openUrl(tab, fallback_url);
            }
        });
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

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
                details.requestHeaders[i].value = 'Instagram 64.0.0.14.96';
                break;
            }
        }
        return { requestHeaders: details.requestHeaders };
    },
    { urls: ["https://i.instagram.com/api/v1/users/*"] },
    ["blocking", "requestHeaders"]
);

chrome.browserAction.onClicked.addListener(function (tab) {
    console.log('Opening fullsize with URL: ' + tab.url);
    if (tab.url.startsWith('https://www.instagram.com/')) {
        const profileRegex = /^(https:\/\/www\.instagram\.com\/[a-zA-Z0-9._-]+)\/?(\?.+)?$/;
        const mediaRegex = /^(https:\/\/www\.instagram\.com\/p\/[a-zA-Z0-9_-]+)\/?(\?.+)?$/;

        // Accessing a profile image
        if (profileRegex.test(tab.url)) {
            const userUrl = profileRegex.exec(tab.url)[1];
            fetch(userUrl + '?__a=1').then(function (response) {
                return response.json();
            }).then(function (json) {
                processProfileApiResponse(tab, json);
            }).catch(function (error) {
                console.log('Error: ' + error);
            });
        }
        // Accessing an image/video
        else if (mediaRegex.test(tab.url)) {
            const mediaUrl = mediaRegex.exec(tab.url)[1];
            fetch(mediaUrl + '?__a=1').then(function (response) {
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
        const profileRegex = /^(https:\/\/vsco.co\/.+\/images(\/[0-9]+)?)$/;
        const mediaRegex = /^(https:\/\/vsco.co\/.+\/media\/[a-zA-Z0-9_-]+)$/;

        // Accessing a profile image
        if (profileRegex.test(tab.url)) {
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
        else if (mediaRegex.test(tab.url)) {
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
