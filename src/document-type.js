var NamedNodeMap = require("./named-node-map"),
    Node = require("./node");

function DocumentType(_, ownerDocument, name, publicId, systemId) {
  Node.call(this, _, ownerDocument, name, null, Node.DOCUMENT_TYPE_NODE);
  Object.defineProperties(this, {
    entities: {value: new NamedNodeMap(_)},
    notations: {value: new NamedNodeMap(_)},
    publicId: {value: publicId},
    systemId: {value: systemId}
  });
}

var prototype = DocumentType.prototype = Object.create(Node.prototype, {
  name: {get: function() { return this.nodeName; }}
});

module.exports = DocumentType;
