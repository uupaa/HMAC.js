// @name: HMAC.js
// @require: Valid.js, ByteArray.js
// @cutoff: @assert @node

(function(global) {
"use strict";

// --- variable --------------------------------------------
//{@assert
var Valid = global["Valid"] || require("uupaa.valid.js");
//}@assert
var ByteArray = global["ByteArray"] || require("uupaa.bytearray.js");

var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function HMAC(method,    // @arg String: hash method. "SHA1", "MD5"
              key,       // @arg String:
              message) { // @arg String:
                         // @ret String: HMAC hash string.
                         // @help: HMAC
//{@assert
    _if(!Valid.type(method, "String"), "HMAC(method)");
    _if(!/SHA1|MD5/.test(method),      "HMAC(method)");
    _if(!Valid.type(key, "String"),    "HMAC(,key)");
    _if(!Valid.type(message, "String"),"HMAC(,,message)");
//}@assert

    var hash = HMAC_encode(method,
                           ByteArray["fromString"](key),
                           ByteArray["fromString"](message)).map(function(value) {
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
function HMAC_encode(method,    // @arg String: hash method. "SHA1", "MD5"
                     key,       // @arg ByteArray:
                     message) { // @arg ByteArray:
                                // @ret ByteArray: [...]
                                // @help: HMAC.encode
                                // @desc: encode HMAC-SHA1, HMAC-MD5
//{@assert
    _if(!Valid.type(method, "String"), "HMAC.encode(method)");
    _if(!/SHA1|MD5/.test(method),      "HMAC.encode(method)");
    _if(!Valid.type(key, "Array"),     "HMAC.encode(,key)");
    _if(!Valid.type(message, "Array"), "HMAC.encode(,,message)");
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
//{@assert
    _if(!Valid.type(key, "String"),     "HMAC.MD5(key)");
    _if(!Valid.type(message, "String"), "HMAC.MD5(,message)");
//}@assert

    return HMAC("MD5", key, message);
}

function HMAC_SHA1(key,       // @arg String:
                   message) { // @arg String:
                              // @ret String: HMAC-SHA1 hash string.
                              // @help: HMAC.SHA1
//{@assert
    _if(!Valid.type(key, "String"),     "HMAC.SHA1(key)");
    _if(!Valid.type(message, "String"), "HMAC.SHA1(,message)");
//}@assert

    return HMAC("SHA1", key, message);
}

//{@assert
function _if(value, msg) {
    if (value) {
        console.error(Valid.stack(msg));
        throw new Error(msg);
    }
}
//}@assert

// --- export ----------------------------------------------
//{@node
if (_inNode) {
    module["exports"] = HMAC;
}
//}@node
if (global["HMAC"]) {
    global["HMAC_"] = HMAC; // already exsists
} else {
    global["HMAC"]  = HMAC;
}

})((this || 0).self || global);

