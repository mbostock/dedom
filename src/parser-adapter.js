var secret = require("./secret"),
    Document = require("./document");

module.exports = function() {
  return {
    createDocument: createDocument,
    createElement: createElement,
    setDocumentType: setDocumentType,
    appendChild: appendChild,
    getTagName: getTagName,
    getNamespaceURI: getNamespaceURI,
    insertText: insertText
  };
};

function createDocument() {
  // Deferred to setDocumentType!
}

function setDocumentType(_, name, publicId, systemId) {
  this.document = new Document(secret, name, publicId, systemId);
}

function createElement(tagName, namespaceURI, attrs) {
  var element = this.document.createElementNS(namespaceURI, tagName);
  attrs.forEach(function(a) { element.setAttribute(a.name, a.value); });
  return element;
}

function appendChild(parentNode, newChild) {
  if (!parentNode) parentNode = this.document;
  parentNode.appendChild(newChild);
}

function getTagName(node) {
  return node.tagName;
}

function getNamespaceURI(node) {
  return node.namespaceURI;
}

// TODO concatenate adjacent text nodes
function insertText(node, data) {
  node.appendChild(this.document.createTextNode(data));
}
