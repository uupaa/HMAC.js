// --- define ----------------------------------------------
// --- variable --------------------------------------------
var test = new UnitTest([
        testHMACMD5String,
        testHMACMD5StringWithKey,
        testHMACMD5Binary,

        testHMACSHA1String,
        testHMACSHA1StringWithKey,
        testHMACSHA1Binary,
    ]);

// --- interface -------------------------------------------
// --- implement -------------------------------------------
function testHMACMD5String(next) {

    // this magic value from http://en.wikipedia.org/wiki/HMAC
    var answer = "74e6f7298a9c2d168935f58c001bad88";
    var HMAC_MD5 = HMAC("MD5", "", "");

    if (answer === HMAC_MD5) {
        console.log("testHMACMD5String ok");
        next && next.pass();
    } else {
        console.log("testHMACMD5String ng");
        next && next.miss();
    }
}

function testHMACMD5StringWithKey(next) {

    // this magic value from http://en.wikipedia.org/wiki/HMAC
    var answer = "80070713463e7749b90c2dc24911e275";
    var HMAC_MD5 = HMAC("MD5", "key", "The quick brown fox jumps over the lazy dog");

    if (answer === HMAC_MD5) {
        console.log("testHMACMD5StringWithKey ok");
        next && next.pass();
    } else {
        console.log("testHMACMD5StringWithKey ng");
        next && next.miss();
    }
}

function testHMACSHA1String(next) {

    // this magic value from http://en.wikipedia.org/wiki/HMAC
    var answer = "fbdb1d1b18aa6c08324b7d64b71fb76370690e1d";
    var HMAC_SHA1 = HMAC("SHA1", "", "");

    if (answer === HMAC_SHA1) {
        console.log("testHMACSHA1String ok");
        next && next.pass();
    } else {
        console.log("testHMACSHA1String ng");
        next && next.miss();
    }
}

function testHMACSHA1StringWithKey(next) {

    // this magic value from http://en.wikipedia.org/wiki/HMAC
    var answer = "de7c9b85b8b78aa6bc8a7a36f70a90701c9db4d9";
    var HMAC_SHA1 = HMAC("SHA1", "key", "The quick brown fox jumps over the lazy dog");

    if (answer === HMAC_SHA1) {
        console.log("testHMACSHA1StringWithKey ok");
        next && next.pass();
    } else {
        console.log("testHMACSHA1StringWithKey ng");
        next && next.miss();
    }
}

function testHMACMD5Binary(next) {

    // this magic value from http://en.wikipedia.org/wiki/HMAC
    var answer = "74e6f7298a9c2d168935f58c001bad88";
    var HMAC_MD5 = HMAC.encode("MD5", [], []);

    var match = HMAC_MD5.every(function(value, index) {
            var hex = parseInt(answer.slice(index * 2, index * 2 + 2), 16);

            return value === hex;
        });

    if (match) {
        console.log("testHMACMD5Binary ok");
        next && next.pass();
    } else {
        console.log("testHMACMD5Binary ng");
        next && next.miss();
    }
}

function testHMACSHA1Binary(next) {

    // this magic value from http://en.wikipedia.org/wiki/HMAC
    var answer = "fbdb1d1b18aa6c08324b7d64b71fb76370690e1d";
    var HMAC_SHA1 = HMAC.encode("SHA1", [], []);

    var match = HMAC_SHA1.every(function(value, index) {
            var hex = parseInt(answer.slice(index * 2, index * 2 + 2), 16);

            return value === hex;
        });

    if (match) {
        console.log("testHMACSHA1Binary ok");
        next && next.pass();
    } else {
        console.log("testHMACSHA1Binary ng");
        next && next.miss();
    }
}

// --- export ----------------------------------------------

// --- run ----------------------------------------------
function _init() {
    // create <input> buttons.
    if (typeof document !== "undefined") {
        test.names().forEach(function(name) {
            //  <input type="button" onclick="testX()" value="testX()" /> node.
            document.body.appendChild(
                _createNode("input", {
                    type: "button",
                    value: name + "()",
                    onclick: name + "()" }));
        });
        window.addEventListener("error", function(message, lineno, filename) {
            document.body.style.backgroundColor = "red";
        });
    }
    // run
    test.run(function(err) {
        if (typeof document !== "undefined") {
            document.body.style.backgroundColor = err ? "red" : "lime";
        } else {
            // console color
            var RED    = '\u001b[31m';
            var YELLOW = '\u001b[33m';
            var GREEN  = '\u001b[32m';
            var CLR    = '\u001b[0m';

            if (err) {
                console.log(RED + "error." + CLR);
            } else {
                console.log(GREEN + "ok." + CLR);
            }
        }
    });

    function _createNode(name, attrs) {
        var node = document.createElement(name);

        for (var key in attrs) {
            node.setAttribute(key, attrs[key]);
        }
        return node;
    }
}

if (this.self) {
    this.self.addEventListener("load", _init);
} else {
    _init();
}

