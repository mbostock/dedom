var Node = require("./node");

function CharacterData() {
  throw new TypeError("Illegal constructor");
}

CharacterData.prototype = Object.create(Node.prototype);

module.exports = CharacterData;
