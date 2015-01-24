var CharacterData = require("./character-data"),
    Node = require("./node");

function Text(_, ownerDocument, data) {
  CharacterData.call(this, _, ownerDocument, "#text", data, Node.TEXT_NODE);
}

var prototype = Text.prototype = Object.create(CharacterData.prototype);

prototype.constructor = Text;

prototype.splitText = function(offset) {
  throw new Error("not yet implemented");
};

module.exports = Text;
