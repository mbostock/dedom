var Node = require("./node");

function CharacterData() {
  throw new TypeError("Illegal constructor");
}

//          attribute  DOMString            data;
//                                // raises(DOMException) on setting
//                                // raises(DOMException) on retrieval
// readonly attribute  unsigned long        length;

CharacterData.prototype = Object.create(Node.prototype);

CharacterData.prototype.substringData = function(offset, count) {
  throw new Error("not yet implemented");
};

CharacterData.prototype.appendData = function(arg) {
  throw new Error("not yet implemented");
};

CharacterData.prototype.insertData = function(offset, arg) {
  throw new Error("not yet implemented");
};

CharacterData.prototype.deleteData = function(offset, count) {
  throw new Error("not yet implemented");
};

CharacterData.prototype.replaceData = function(offset, count, arg) {
  throw new Error("not yet implemented");
};

module.exports = CharacterData;
