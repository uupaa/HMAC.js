# HMAC.js [![Build Status](https://travis-ci.org/uupaa/HMAC.js.png)](http://travis-ci.org/uupaa/HMAC.js)

[![npm](https://nodei.co/npm/uupaa.hmac.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.hmac.js/)

Calc HMAC-SHA1, HMAC-MD5.

## Document

- [HMAC.js wiki](https://github.com/uupaa/HMAC.js/wiki/HMAC)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))


## How to use

### Browser

```js
<script src="lib/HMAC.js">
<script>
console.log( HMAC("MD5", "", "") ); // "74e6f7298a9c2d168935f58c001bad88"
</script>
```

### WebWorkers

```js
importScripts("lib/HMAC.js");

console.log( HMAC("MD5", "", "") ); // "74e6f7298a9c2d168935f58c001bad88"
```

### Node.js

```js
var HMAC = require("lib/HMAC.js");

console.log( HMAC("MD5", "", "") ); // "74e6f7298a9c2d168935f58c001bad88"
```

