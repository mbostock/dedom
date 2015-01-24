var Node = require("./node");

function Notation() {
  throw new TypeError("Illegal constructor");
}

Notation.prototype = Object.create(Node.prototype);

// readonly attribute  DOMString            publicId;
// readonly attribute  DOMString            systemId;

module.exports = Notation;
