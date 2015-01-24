var Node = require("./node");

function EntityReference() {
  throw new TypeError("Illegal constructor");
}

EntityReference.prototype = Object.create(Node.prototype);

module.exports = EntityReference;
