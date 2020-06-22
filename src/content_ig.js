const notLoggedIn = document.documentElement.classList.contains("not-logged-in");

function redirect(element, event) {
    if(event.ctrlKey || event.metaKey) {
        window.open(element.getAttribute('href'));
    }
    else {
        window.location.href = element.getAttribute('href');
    }
}

if (notLoggedIn) {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    const loginParent = ["RnEpo", "_Yhr4"];
    const loginChild = ["pbNvD", "fPMEg", "_8PWHW"];

    const divClasses = ["Nnq7C", "weEfm"];
    const childDivClasses = ["v1Nh3", "kIKUG", "_bz0w"];

    const observer = new MutationObserver(function (mutations) {
        for (const mutation of mutations) {
            for (const addedNode of mutation.addedNodes) {
                if (addedNode.nodeName === 'DIV') {
                    if (loginParent.every(e => addedNode.classList.contains(e))
                        && loginChild.every(e => addedNode.lastChild.classList.contains(e))) {
                        addedNode.parentNode.removeChild(addedNode);
                    }

                    if (divClasses.every(e => addedNode.classList.contains(e)) &&
                        childDivClasses.every(e => addedNode.firstChild.classList.contains(e))) {
                        addedNode.childNodes.forEach(d => {
                            const anchor = d.firstChild;
                            d.addEventListener('click', (event) => redirect(anchor, event))
                        });
                    }
                }
            }
        }
    });

    observer.observe(document.getElementsByTagName("body")[0], {
        childList: true,
        subtree: true
    });


    const divs = document.querySelectorAll("div.v1Nh3.kIKUG._bz0w");

    for (const div of divs) {
        const anchor = div.firstChild;
        div.addEventListener('click', (event) => redirect(anchor, event));
    }
}
