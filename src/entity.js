var Node = require("./node");

function Entity(_, ownerDocument, name, publicId, systemId, notationName) {
  Node.call(this, _, ownerDocument, name, null, Node.ENTITY_NODE);
  Object.defineProperties(this, {
    publicId: {value: publicId},
    systemId: {value: systemId},
    notationName: {value: notationName} // same as name?
  });
}

var prototype = Entity.prototype = Object.create(Node.prototype);

prototype.constructor = Entity;

module.exports = Entity;
