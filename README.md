HMAC.js
=========

Calc HMAC-SHA1, HMAC-MD5.

# Document

https://github.com/uupaa/HMAC.js/wiki/HMAC

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

# for Developers

1. Install development dependency tools

    ```sh
    $ brew install closure-compiler
    $ brew install node
    $ npm install -g plato
    ```

2. Clone Repository and Install

    ```sh
    $ git clone git@github.com:uupaa/HMAC.js.git
    $ cd HMAC.js
    $ npm install
    ```

3. Build and Minify

    `$ npm run build`

4. Test

    `$ npm run test`

5. Lint

    `$ npm run lint`


