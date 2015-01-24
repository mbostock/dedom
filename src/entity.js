var Node = require("./node");

function Entity() {
  throw new TypeError("Illegal constructor");
}

Entity.prototype = Object.create(Node.prototype);

// readonly attribute  DOMString            publicId;
// readonly attribute  DOMString            systemId;
// readonly attribute  DOMString            notationName;

module.exports = Entity;
