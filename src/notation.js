var Node = require("./node");

function Notation(_, ownerDocument, name, publicId, systemId) {
  Node.call(this, _, ownerDocument, name, null, Node.NOTATION_NODE);
  Object.defineProperties(this, {
    publicId: {enumerable: true, value: publicId},
    systemId: {enumerable: true, value: systemId}
  });
}

var prototype = Notation.prototype = Object.create(Node.prototype);

prototype.constructor = Notation;

module.exports = Notation;
