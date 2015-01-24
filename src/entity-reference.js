var Node = require("./node");

function EntityReference(_, ownerDocument, name) {
  Node.call(this, _, ownerDocument, name, null, Node.ENTITY_REFERENCE_NODE);
}

var prototype = EntityReference.prototype = Object.create(Node.prototype);

prototype.constructor = EntityReference;

module.exports = EntityReference;
