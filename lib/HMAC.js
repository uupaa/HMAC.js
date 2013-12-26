// @name: HMAC.js

(function(global) {

// --- define ----------------------------------------------
// --- variable --------------------------------------------
// --- interface -------------------------------------------
function HMAC(method,    // @arg String: hash method. "SHA1", "MD5"
              key,       // @arg String:
              message) { // @arg String:
                         // @ret String: HMAC hash string. lower case
                         // @help: HMAC
//{@assert
    _if(typeof method  !== "string", "invalid HMAC(method,,)");
    _if(!/SHA1|MD5/.test(method),    "invalid HMAC(method,,)");
    _if(typeof key     !== "string", "invalid HMAC(,key,)");
    _if(typeof message !== "string", "invalid HMAC(,,message)");
//}@assert

    var hash = HMAC_encode(method,
                           BinaryString.toArray(key),
                           BinaryString.toArray(message)).map(function(value) {
            return value < 0x10 ? ("0" + value.toString(16))
                                : value.toString(16);
        }).join("").toLowerCase();

    return hash;
}
HMAC.name = "HMAC";
HMAC.repository = "https://github.com/uupaa/HMAC.js";
HMAC.encode = HMAC_encode; // HMAC.encode(method:String, key:ByteArray, message:ByteArray):ByteArray

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
        key = global[method].encode(key);
    }
    opad = key.concat(); // clone
    ipad = key.concat(); // clone

    for (; i < blocksize; ++i) {
        opad[i] ^= 0x5C; // xor
        ipad[i] ^= 0x36; // xor
    }
    return global[method].encode(opad.concat(
                    global[method].encode(ipad.concat(message)) ));
}

//{@assert
function _if(booleanValue, errorMessageString) {
    if (booleanValue) {
        throw new Error(errorMessageString);
    }
}
//}@assert

// --- export ----------------------------------------------
if (global.process) { // node.js
    module.exports = HMAC;
}
global.HMAC = HMAC;

})(this.self || global);

