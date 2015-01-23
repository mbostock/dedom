var CharacterData = require("./character-data");

function Comment() {
  throw new TypeError("Illegal constructor");
}

Comment.prototype = Object.create(CharacterData.prototype);

module.exports = Comment;
