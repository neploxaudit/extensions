---
sidebar_position: 3
---

# Extension Structure

Although for many extensions may seem simple, in reality, it is a set of several components, 4 of which are basic:
- In-page Script (Essentially inserting a `<script>` tag on the page, so there is no need to describe this separately in this article)
- Content Script
- Background Script
- Extension Window
  
![Architecture](/img/Extension-Structure/extension-architecture.png)

Next, I would like to briefly list the components.

## Content Script
The first component is the `Content Script`. If we take the official description from the [chrome](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts) website, we can read that it is:

> `Content scripts` are files that run in the context of web pages. Using the standard Document Object Model (DOM), they are able to read details of the web pages the browser visits, make changes to them, and pass information to their parent extension.

Based on this wording, it may seem that this is the same as if you inserted a script on your site like this `<script src=...example.js></script>`

However, this is not entirely true; the `content script` runs in an `isolated world`.
> An `isolated world` is a private execution environment that isn't accessible to the page or other extensions. A practical consequence of this isolation is that JavaScript variables in an extension's `content scripts` are not visible to the host page or other extensions' `content scripts`.

What does this mean? Essentially, you can think of it as if your site is running several programs in parallel that do not share variables and so on, but are tied to one DOM.

To understand this in practice, after installing a test extension, open the developer console. In the upper left corner of the console, you will be able to select the context.

![isolated worlds](/img/Extension-Structure/isolated-worlds.png)

For testing, you can execute code in the main context of your site:
```javascript:my-website/docs/Basics/Extension Structure.md
window.test='elephant'
({}).__proto__.neplox='test'
```
After that, execute the code in the `extension` context by switching to it in the menu shown in the screenshot above:
```javascript
console.log(window.test + " " + ({}).__proto__.neplox)
// Output undefined undefined
```
This example shows the main idea of the `content script`; it allows extension developers not to worry that someone will affect their code.

However, besides convenience, this also carries a security mechanism. The `Isolation World` `content script` has functionalities that are not available on the site; here is a list of the most important ones:
- Access to extension local storage
- Access to messaging with the `background script`

Since we mentioned the `background script`, let's figure out what it is.

## Background script
Essentially, the `Background script` is analogous to a `Service Worker`. It can communicate with the `content script`. Usually, all the most critical logic is implemented in this context, and the most critical data is stored (details in the chapter on storage).

Example background:
```javascript
// Listen for connections from content scripts
chrome.runtime.onConnect.addListener((port) => {
    console.log("Connected to port:", port);
  
    // Listen for messages on the port
    port.onMessage.addListener((msg) => {
      console.log("Message received:", msg);
  
      // Respond to a specific message
      if (msg.type === "greet") {
        port.postMessage({ reply: "Hello from background script!" });
      }
    });
  
    // Optional: Respond when the port disconnects
    port.onDisconnect.addListener(() => {
      console.log("Port disconnected");
    });
  });
```

Accordingly, the interaction from the `content script` will look something like this:

```javascript
const port = chrome.runtime.connect();
port.onMessage.addListener((e)=>{console.log(e)})
port.postMessage({type: "greet"});
```

![Message](/img/Extension-Structure/runtime-example-message.png)

You can also debug the `background script`. To do this, go to `chrome://extensions/?id=REPLACE_WITH_YOUR_EXTENSION_ID` and click `Inspect views service worker`, you will get the standard debugger window in the context of the `background script`, and now you can debug it like a regular site.

![debug-extension](/img/Extension-Structure/debug-extension.png)

## Extension window
Extensions often have their own pages, which are essentially a regular website. However, it has several restrictions:
- It is accessible via a special protocol `chrome-extension://` and the URL looks like `chrome-extension://ID_OF_EXTENSION`
- Only sites that are explicitly allowed can open this page (through `iframe` or `window.open`)
Example of the Metamask window:
![Metamask Extension Window](/img/Extension-Structure/Metamask-Extension-Page.png)

## Manifest
To conclude this chapter, I would like to talk about the `manifest` file - this is the main description file of the extension, which describes which `content/background scripts` to load, as well as access restrictions, and so on.
A typical `manifest.json` looks something like this:
```
{
    "manifest_version": 3,
    "name": "Test by Slonser",
    "version": "1.0",
    "description": "Slonser example",
    "permissions": [ "tabs", "cookies", "storage", "scripting", "sidePanel" ],
    "action": {
      "default_icon": {
        "128": "logo.jpg"
      }
    },
    "background": {
      "service_worker": "background.js"
    },
    "content_scripts": [
        {
          "matches": ["<all_urls>"],
          "js": ["content.js"],
          "run_at": "document_end",
          "all_frames": true
        }
    ],
    "web_accessible_resources": [ {
        "matches": [ "http://*/*", "https://*/*" ],
        "resources": [ "assets/example.js","assets/test.js" ],
        "use_dynamic_url": false
     } ]
  }
```
`manifest.json` is a good starting point for analyzing the security of the extension; the full specification can be read [here](https://developer.chrome.com/docs/extensions/reference/manifest).
Throughout the articles, we will refer to misconfigurations of the `manifest` and errors caused by this. However, it does not make sense to describe all its properties here. Just read the official documentation at the link above.