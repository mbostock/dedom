var Node = require("./node");

function CharacterData(_, ownerDocument, name, data, type) {
  Node.call(this, _, ownerDocument, name, data, type);
}

var prototype = CharacterData.prototype = Object.create(Node.prototype, {
  length: {get: function() { return this.nodeValue.length; }},
  data: {get: function() { return this.nodeValue; }} // TODO this should be writable
});

prototype.constructor = CharacterData;

prototype.substringData = function(offset, count) {
  throw new Error("not yet implemented");
};

prototype.appendData = function(arg) {
  throw new Error("not yet implemented");
};

prototype.insertData = function(offset, arg) {
  throw new Error("not yet implemented");
};

prototype.deleteData = function(offset, count) {
  throw new Error("not yet implemented");
};

prototype.replaceData = function(offset, count, arg) {
  throw new Error("not yet implemented");
};

module.exports = CharacterData;
