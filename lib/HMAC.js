// @name: HMAC.js
// @require: WordArray.js, ByteArray.js, MD5.js, SHA1.js

(function(global) {

// --- variable --------------------------------------------
var inNode = "process" in global;

var WordArray = global["WordArray"] || require("uupaa.wordarray.js");  // npm link uupaa.wordarray.js
var ByteArray = global["ByteArray"] || require("uupaa.bytearray.js");  // npm link uupaa.bytearray.js
var MD5       = global["MD5"]       || require("uupaa.md5.js");        // npm link uupaa.md5.js
var SHA1      = global["SHA1"]      || require("uupaa.sha1.js");       // npm link uupaa.sha1.js

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function HMAC(method,    // @arg String: hash method. "SHA1", "MD5"
              key,       // @arg String:
              message) { // @arg String:
                         // @ret String: HMAC hash string.
                         // @help: HMAC
//{@assert
    _if(typeof method  !== "string", "invalid HMAC(method,,)");
    _if(!/SHA1|MD5/.test(method),    "invalid HMAC(method,,)");
    _if(typeof key     !== "string", "invalid HMAC(,key,)");
    _if(typeof message !== "string", "invalid HMAC(,,message)");
//}@assert

    var hash = HMAC_encode(method,
                           ByteArray["fromString"](key),
                           ByteArray["fromString"](message)).map(function(value) {
            return value < 0x10 ? ("0" + value.toString(16))
                                :        value.toString(16);
        }).join("");

    return hash;
}
HMAC["name"] = "HMAC";
HMAC["repository"] = "https://github.com/uupaa/HMAC.js";

HMAC["encode"] = HMAC_encode;   // HMAC.encode(method:String, key:ByteArray, message:ByteArray):ByteArray
HMAC["MD5"]    = HMAC_MD5;      // HMAC.MD5(key:String, message:String):String
HMAC["SHA1"]   = HMAC_SHA1;     // HMAC.SHA1(key:String, message:String):String

// --- implement -------------------------------------------
function HMAC_encode(method,    // @arg String: hash method. "SHA1", "MD5"
                     key,       // @arg ByteArray:
                     message) { // @arg ByteArray:
                                // @ret ByteArray: [...]
                                // @help: HMAC.encode
                                // @desc: encode HMAC-SHA1, HMAC-MD5
//{@assert
    _if(typeof method !== "string", "invalid HMAC.encode(method,,)");
    _if(!/SHA1|MD5/.test(method),   "invalid HMAC.encode(method,,)");
    _if(!Array.isArray(key),        "invalid HMAC.encode(,key,)");
    _if(!Array.isArray(message),    "invalid HMAC.encode(,,message)");
//}@assert

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

function HMAC_MD5(key,       // @arg String:
                  message) { // @arg String:
                             // @ret String: HMAC-MD5 hash string.
                             // @help: HMAC.MD5
    return HMAC("MD5", key, message);
}

function HMAC_SHA1(key,       // @arg String:
                   message) { // @arg String:
                              // @ret String: HMAC-SHA1 hash string.
                              // @help: HMAC.SHA1
    return HMAC("SHA1", key, message);
}

//{@assert
function _if(booleanValue, errorMessageString) {
    if (booleanValue) {
        throw new Error(errorMessageString);
    }
}
//}@assert

// --- export ----------------------------------------------
//{@node
if (inNode) {
    module["exports"] = HMAC;
}
//}@node
global["HMAC"] ? (global["HMAC_"] = HMAC) // already exsists
               : (global["HMAC"]  = HMAC);

})(this.self || global);

