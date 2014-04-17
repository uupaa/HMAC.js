=========
HMAC.js
=========

![](https://travis-ci.org/uupaa/HMAC.js.png)

Calc HMAC-SHA1, HMAC-MD5.

# Document

- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [HMAC.js wiki](https://github.com/uupaa/HMAC.js/wiki/HMAC)


# How to use

```js
<script src="lib/HMAC.js">
<script>
// for Browser
console.log( HMAC("MD5", "", "") ); // "74e6f7298a9c2d168935f58c001bad88"
</script>
```

```js
// for WebWorkers
importScripts("lib/HMAC.js");

console.log( HMAC("MD5", "", "") ); // "74e6f7298a9c2d168935f58c001bad88"
```

```js
// for Node.js
var HMAC = require("lib/HMAC.js");

console.log( HMAC("MD5", "", "") ); // "74e6f7298a9c2d168935f58c001bad88"
```

