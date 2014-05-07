var ModuleTestHMAC = (function(global) {

return new Test("HMAC", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true,
    }).add([
        testHMACMD5String,
        testHMACMD5StringWithKey,
        testHMACMD5Binary,

        testHMACSHA1String,
        testHMACSHA1StringWithKey,
        testHMACSHA1Binary,

        testHMAC_MD5,
        testHMAC_SHA1,
    ]).run().clone();

function testHMACMD5String(next) {

    // this magic value from http://en.wikipedia.org/wiki/HMAC
    var answer = "74e6f7298a9c2d168935f58c001bad88";
    var HMAC_MD5 = HMAC("MD5", "", "");

    if (answer === HMAC_MD5) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testHMACMD5StringWithKey(next) {

    // this magic value from http://en.wikipedia.org/wiki/HMAC
    var answer = "80070713463e7749b90c2dc24911e275";
    var HMAC_MD5 = HMAC("MD5", "key", "The quick brown fox jumps over the lazy dog");

    if (answer === HMAC_MD5) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testHMACSHA1String(next) {

    // this magic value from http://en.wikipedia.org/wiki/HMAC
    var answer = "fbdb1d1b18aa6c08324b7d64b71fb76370690e1d";
    var HMAC_SHA1 = HMAC("SHA1", "", "");

    if (answer === HMAC_SHA1) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testHMACSHA1StringWithKey(next) {

    // this magic value from http://en.wikipedia.org/wiki/HMAC
    var answer = "de7c9b85b8b78aa6bc8a7a36f70a90701c9db4d9";
    var HMAC_SHA1 = HMAC("SHA1", "key", "The quick brown fox jumps over the lazy dog");

    if (answer === HMAC_SHA1) {
        next && next.pass();
    } else {
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
        next && next.pass();
    } else {
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
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testHMAC_MD5(next) {

    // this magic value from http://en.wikipedia.org/wiki/HMAC
    var answer = "74e6f7298a9c2d168935f58c001bad88";
    var hash = HMAC.MD5("", "");

    if (answer === hash) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

function testHMAC_SHA1(next) {

    // this magic value from http://en.wikipedia.org/wiki/HMAC
    var answer = "fbdb1d1b18aa6c08324b7d64b71fb76370690e1d";
    var hash = HMAC.SHA1("", "");

    if (answer === hash) {
        next && next.pass();
    } else {
        next && next.miss();
    }
}

})((this || 0).self || global);

