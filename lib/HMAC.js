(function(global) {
"use strict";

// --- dependency modules ----------------------------------
var DataType = global["DataType"];

// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function HMAC(method,    // @arg String - hash method. "SHA1", "MD5"
              key,       // @arg String
              message) { // @arg String
                         // @ret String - HMAC hash string.
//{@dev
    $valid($type(method, "String"),  HMAC, "method");
    $valid(/SHA1|MD5/.test(method),  HMAC, "method");
    $valid($type(key, "String"),     HMAC, "key");
    $valid($type(message, "String"), HMAC, "message");
//}@dev

    var hash = Array.prototype.map.call(HMAC_encode(method,
                           DataType["Uint8Array"]["fromString"](key),
                           DataType["Uint8Array"]["fromString"](message)), function(value) {
            return value < 0x10 ? ("0" + value.toString(16))
                                :        value.toString(16);
        }).join("");

    return hash;
}

//{@dev
HMAC["repository"] = "https://github.com/uupaa/HMAC.js";
//}@dev

HMAC["encode"] = HMAC_encode;   // HMAC.encode(method:String, key:Uint8Array, message:Uint8Array):Uint8Array
HMAC["MD5"]    = HMAC_MD5;      // HMAC.MD5(key:String, message:String):String
HMAC["SHA1"]   = HMAC_SHA1;     // HMAC.SHA1(key:String, message:String):String

// --- implements ------------------------------------------
function HMAC_encode(method,    // @arg String - hash method. "SHA1", "MD5"
                     key,       // @arg Uint8Array
                     message) { // @arg Uint8Array
                                // @ret Uint8Array
                                // @desc encode HMAC-SHA1, HMAC-MD5
//{@dev
    $valid($type(method, "String"),      HMAC_encode, "method");
    $valid(/SHA1|MD5/.test(method),      HMAC_encode, "method");
    $valid($type(key, "Uint8Array"),     HMAC_encode, "key");
    $valid($type(message, "Uint8Array"), HMAC_encode, "message");
//}@dev

    // pseudocode from http://en.wikipedia.org/wiki/HMAC

    var blocksize = 64; // magic word(MD5.blocksize = 64, SHA1.blocksize = 64)
    var i = 0, opad, ipad;

    if (key.length > blocksize) {
        key = global[method]["encode"](key);
    }

    var padSize = Math.max(key.length, blocksize);

    opad = new Uint8Array(padSize);
    ipad = new Uint8Array(padSize);
    opad.set(key);
    ipad.set(key);

    for (; i < blocksize; ++i) {
        opad[i] ^= 0x5C; // xor
        ipad[i] ^= 0x36; // xor
    }
    return global[method]["encode"](
            DataType["Uint8Array"]["concat"](opad,
                global[method]["encode"](
                    DataType["Uint8Array"]["concat"](ipad, message))));
}

function HMAC_MD5(key,       // @arg String
                  message) { // @arg String
                             // @ret String - HMAC-MD5 hash string.
//{@dev
    $valid($type(key, "String"),     HMAC_MD5, "key");
    $valid($type(message, "String"), HMAC_MD5, "message");
//}@dev

    return HMAC("MD5", key, message);
}

function HMAC_SHA1(key,       // @arg String
                   message) { // @arg String
                              // @ret String - HMAC-SHA1 hash string.
//{@dev
    $valid($type(key, "String"),     HMAC_SHA1, "key");
    $valid($type(message, "String"), HMAC_SHA1, "message");
//}@dev

    return HMAC("SHA1", key, message);
}

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = HMAC;
}
global["HMAC" in global ? "HMAC_" : "HMAC"] = HMAC; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

