var Node = require("./node");

function DocumentFragment(_, ownerDocument) {
  Node.call(this, _, ownerDocument, "#document-fragment", null, Node.DOCUMENT_FRAGMENT_NODE);
}

var prototype = DocumentFragment.prototype = Object.create(Node.prototype);

prototype.constructor = DocumentFragment;

module.exports = DocumentFragment;
