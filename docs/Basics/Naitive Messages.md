---
sidebar_position: 5
---

# Native Messages
[Native messaging](https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging) - API that helps to exchange messages with native applications.

Communication occurs in `background.js`, which can be found by searching for constructions like this:
```javascript
chrome.runtime.connectNative('com.example.example')
```
In fact, all we can do with this API is interact with the stdin/stdout of a registered application. So it is obvious that even with full control over the command arguments of this API, achieving RCE by itself is impossible.
However, sometimes certain applications have `RCE as a Service` through unverified stdin input. So if you see the use of `native messaging`, make sure that the input is sanitized.