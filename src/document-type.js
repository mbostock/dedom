var Node = require("./node");

function DocumentType() {
  throw new TypeError("Illegal constructor");
}

DocumentType.prototype = Object.create(Node.prototype);

// DOM Level 1
// readonly attribute  DOMString            name;
// readonly attribute  NamedNodeMap         entities;
// readonly attribute  NamedNodeMap         notations;

// DOM Level 2
// readonly attribute DOMString        publicId;
// readonly attribute DOMString        systemId;
// readonly attribute DOMString        internalSubset;

module.exports = DocumentType;
