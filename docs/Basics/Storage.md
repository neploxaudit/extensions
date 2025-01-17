---
sidebar_position: 4
---

# Storage
When you create a Chrome extension, you have several ways to store data:
- chrome.storage
- IndexDB on Extension or other chrome-extension:// based storage

In most cases, developers prefer to use `chrome.storage`.
The official documentation can be found [here](https://developer.chrome.com/docs/extensions/reference/api/storage#storage_areas). It fully describes each method, but for convenience, I will also provide a description below:

storage.local
> Data is stored locally and cleared when the extension is removed. The storage limit is 10 MB (5 MB in Chrome 113 and earlier), but can be increased by requesting the "unlimitedStorage" permission. We recommend using storage.local to store larger amounts of data.

storage.managed
> Managed storage is read-only storage for policy-installed extensions and managed by system administrators using a developer-defined schema and enterprise policies. Policies are analogous to options but are configured by a system administrator instead of the user, allowing the extension to be preconfigured for all users of an organization. For information on policies, see Documentation for Administrators. To learn more about the managed storage area, see Manifest for storage areas.

storage.session
> Holds data in memory while an extension is loaded. The storage is cleared if the extension is disabled, reloaded, or updated and when the browser restarts. By default, it's not exposed to content scripts, but this behavior can be changed by setting chrome.storage.session.setAccessLevel(). The storage limit is 10 MB (1 MB in Chrome 111 and earlier). The storage.session interface is one of several we recommend for service workers.

storage.sync
> If syncing is enabled, the data is synced to any Chrome browser that the user is logged into. If disabled, it behaves like storage.local. Chrome stores the data locally when the browser is offline and resumes syncing when it's back online. The quota limitation is approximately 100 KB, 8 KB per item. We recommend using storage.sync to preserve user settings across synced browsers. If you're working with sensitive user data, instead use storage.session.

In fact, the most important thing to understand is that chrome.storage is available from both content scripts and the extension background script. This effectively allows developers to retrieve data from storage from a content script attached to the DOM of any website. This sometimes creates problems, but we will discuss this in the chapter on attacks.