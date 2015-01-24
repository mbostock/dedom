var Node = require("./node");

exports.getAttrList = function(node) {
  var i = -1, n = node.attributes.length, a, array = new Array(n);
  while (++i < n) array[i] = {name: (a = node.attributes.item(i)).nodeName, value: a.nodeValue};
  return array;
};

exports.getChildNodes = function(node) {
  var array = [], child = node.firstChild;
  while (child) array.push(child), child = child.nextSibling;
  return array;
};

exports.getCommentNodeContent = function(comment) {
  return comment.data;
};

exports.getDocumentTypeNodeName = function(documentType) {
  return documentType.nodeName;
};

exports.getDocumentTypeNodePublicId = function(documentType) {
  return documentType.publicId;
};

exports.getDocumentTypeNodeSystemId = function(documentType) {
  return documentType.systemId;
};

exports.getFirstChild = function(node) {
  return node.firstChild;
};

exports.getNamespaceURI = function(node) {
  return node.namespaceURI;
};

exports.getParentNode = function(node) {
  return node.parentNode;
};

exports.getTagName = function(node) {
  return node.tagName;
};

exports.getTextNodeContent = function(node) {
  return node.data;
};

exports.isCommentNode = function(node) {
  return node.nodeType === Node.COMMENT_NODE;
};

exports.isDocumentTypeNode = function(node) {
  return node.nodeType === Node.DOCUMENT_TYPE_NODE;
};

exports.isElementNode = function(node) {
  return node.nodeType === Node.ELEMENT_NODE;
};

exports.isTextNode = function(node) {
  return node.nodeType === Node.TEXT_NODE;
};
