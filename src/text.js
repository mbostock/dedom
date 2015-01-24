var CharacterData = require("./character-data");

function Text() {
  throw new TypeError("Illegal constructor");
}

Text.prototype = Object.create(CharacterData.prototype);

Text.prototype.splitText = function(offset) {
  throw new Error("not yet implemented");
};

module.exports = Text;
