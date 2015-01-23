var Node = require("./node");

function DocumentType() {
  throw new TypeError("Illegal constructor");
}

DocumentType.prototype = Object.create(Node.prototype);

module.exports = DocumentType;
