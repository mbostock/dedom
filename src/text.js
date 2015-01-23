var CharacterData = require("./character-data");

function Text() {
  throw new TypeError("Illegal constructor");
}

Text.prototype = Object.create(CharacterData.prototype);

module.exports = Text;
