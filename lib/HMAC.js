(function(global) {
"use strict";

// --- dependency module -----------------------------------
//{@dev
//  This code block will be removed in `$ npm run build-release`. http://git.io/Minify
var Valid = global["Valid"] || require("uupaa.valid.js"); // http://git.io/Valid
//}@dev
var DataType = global["DataType"] || require("uupaa.datatype.js");

// --- local variable --------------------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function HMAC(method,    // @arg String - hash method. "SHA1", "MD5"
              key,       // @arg String
              message) { // @arg String
                         // @ret String - HMAC hash string.
//{@dev
    Valid(Valid.type(method, "String"),  HMAC, "method");
    Valid(/SHA1|MD5/.test(method),       HMAC, "method");
    Valid(Valid.type(key, "String"),     HMAC, "key");
    Valid(Valid.type(message, "String"), HMAC, "message");
//}@dev

    var hash = HMAC_encode(method,
                           DataType["Array"]["fromString"](key),
                           DataType["Array"]["fromString"](message)).map(function(value) {
            return value < 0x10 ? ("0" + value.toString(16))
                                :        value.toString(16);
        }).join("");

    return hash;
}

HMAC["repository"] = "https://github.com/uupaa/HMAC.js";

HMAC["encode"] = HMAC_encode;   // HMAC.encode(method:String, key:ByteArray, message:ByteArray):ByteArray
HMAC["MD5"]    = HMAC_MD5;      // HMAC.MD5(key:String, message:String):String
HMAC["SHA1"]   = HMAC_SHA1;     // HMAC.SHA1(key:String, message:String):String

// --- implement -------------------------------------------
function HMAC_encode(method,    // @arg String - hash method. "SHA1", "MD5"
                     key,       // @arg ByteArray
                     message) { // @arg ByteArray
                                // @ret ByteArray
                                // @desc encode HMAC-SHA1, HMAC-MD5
//{@dev
    Valid(Valid.type(method, "String"), HMAC.encode, "method");
    Valid(/SHA1|MD5/.test(method),      HMAC.encode, "method");
    Valid(Valid.type(key, "Array"),     HMAC.encode, "key");
    Valid(Valid.type(message, "Array"), HMAC.encode, "message");
//}@dev

    // pseudocode from http://en.wikipedia.org/wiki/HMAC

    var blocksize = 64; // magic word(MD5.blocksize = 64, SHA1.blocksize = 64)
    var i = 0, opad, ipad;

    if (key.length > blocksize) {
        key = global[method]["encode"](key);
    }
    opad = key.concat(); // clone
    ipad = key.concat(); // clone

    for (; i < blocksize; ++i) {
        opad[i] ^= 0x5C; // xor
        ipad[i] ^= 0x36; // xor
    }
    return global[method]["encode"](opad.concat(
                    global[method]["encode"](ipad.concat(message)) ));
}

function HMAC_MD5(key,       // @arg String
                  message) { // @arg String
                             // @ret String - HMAC-MD5 hash string.
//{@dev
    Valid(Valid.type(key, "String"),     HMAC.MD5, "key");
    Valid(Valid.type(message, "String"), HMAC.MD5, "message");
//}@dev

    return HMAC("MD5", key, message);
}

function HMAC_SHA1(key,       // @arg String
                   message) { // @arg String
                              // @ret String - HMAC-SHA1 hash string.
//{@dev
    Valid(Valid.type(key, "String"),     HMAC.SHA1, "key");
    Valid(Valid.type(message, "String"), HMAC.SHA1, "message");
//}@dev

    return HMAC("SHA1", key, message);
}

// --- export ----------------------------------------------
if ("process" in global) {
    module["exports"] = HMAC;
}
global["HMAC" in global ? "HMAC_" : "HMAC"] = HMAC; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom

