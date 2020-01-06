const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const loginParent = ["RnEpo", "Yx5HN"];
const loginChild = ["pbNvD", "QZZGH", "FrS-d"];

const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
            if (addedNode.nodeName === 'DIV') {
                if (loginParent.every(e => addedNode.classList.contains(e))
                    && loginChild.every(e => addedNode.firstChild.classList.contains(e))) {
                    addedNode.parentNode.removeChild(addedNode);
                }
            }
        }
    }
});

observer.observe(document.getElementsByTagName("body")[0], {
    childList: true,
});
