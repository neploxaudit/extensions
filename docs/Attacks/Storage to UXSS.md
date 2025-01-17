---
sidebar_position: 5
---

# Unsafe storage to UXSS
Sometimes developers forget that `chrome.storage.local` is the same for all sites where the `content script` is loaded.

```javascript
window.addEventListener("message", (event) => {
    if (event.source !== window) return;

    if (event.data.action === "setUsername") {
        chrome.storage.local.set({ ["Username"]: event.data.value }, () => {
            console.log("Storage set successfully");
        });
    }
});

document.addEventListener("DOMContentLoaded", (event) => {
    chrome.storage.local.get("Username", (data) => {
        if (data.Username) {
            var host = document.createElement('div');
            host.innerHTML = `<h1>${data.Username}</h1>`
            document.body.appendChild(host);
        }
    });
});
```

This is a fairly simple example, but it shows a very important thing. You need to sanitize data inserted into `chrome.storage`. Because data received from one `origin` will be applied across all domains. In fact, this allows for achieving UXSS.

## Namespace confusion
Usually, extensions are injected into HTML pages, but they can also be injected into SVG files, which can help you achieve UXSS.
A simplified real example:
```javascript
window.addEventListener("message", (event) => {
    if (event.source !== window) return;

    if (event.data.action === "setTheme") {
        var style_container = document.createElement('style');
        style_container.innerText = `.classname{
            background: url(${event.data.theme});
        }`;
        chrome.storage.local.set({ ["theme"]: style_container.outerHTML }, () => {
            console.log("Storage set successfully");
        });
    }
});

document.addEventListener("DOMContentLoaded", (event) => {
    chrome.storage.local.get("theme", (data) => {
        if (data.theme) {
            var host = document.createElement('div');
            host.innerHTML = `${data.theme} ...`;
            document.body.appendChild(host);
        }
    });
});
```
In this case, it seems that the maximum you can achieve is CSS injection on any site where the extension is opened (which is already quite good) - however, you can achieve full XSS.

The fact is that we can set the `theme` to:
```xml
<img src="x" onerror="alert()"></img>
```
After that, the attacker can direct the user to an SVG document on a third-party site, for example, the company's logo. In the SVG context, the `<img>` tag inside the `<style>` tag will be applied, and we will get XSS.

You also need to understand that SVG documents, in general, have a number of differences from HTML documents - for example, there is no document.head, and so on. Perhaps this can help you.

