var CharacterData = require("./character-data"),
    Node = require("./node");

function Comment(_, ownerDocument, data) {
  CharacterData.call(this, _, ownerDocument, "#comment", data, Node.COMMENT_NODE);
}

var prototype = Comment.prototype = Object.create(CharacterData.prototype);

prototype.constructor = Comment;

module.exports = Comment;
