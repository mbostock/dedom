var Document = require("./document"),
    DocumentType = require("./document-type");

var document = null;

exports.createDocument = function() {
  if (document !== null) throw new Error("illegal state");
  document = Object.create(Document.prototype);
  document.nodeName = "#document";
  var doctype = document.doctype = Object.create(DocumentType.prototype);
  doctype.name = "html";
  doctype.nodeName = "html";
  doctype.publicId = "";
  doctype.systemId = "";
  document.childNodes = [doctype];
  return document;
};

exports.createDocumentFragment = function() {
  throw new Error("not implemented");
};

exports._finalize = function() {
  document.documentElement = document.childNodes[1];
  document = null;
};

exports.createElement = function(tagName, namespaceURI, attrs) {
  var element = document.createElementNS(namespaceURI, tagName);
  attrs.forEach(function(a) { element.setAttribute(a.name, a.value); });
  return element;
};

exports.createCommentNode = function(textContent) {
  return document.createComment(textContent);
};

exports.setDocumentType = function(document, name, publicId, systemId) {
  var doctype = document.doctype;
  doctype.name = name;
  doctype.publicId = publicId;
  doctype.systemId = systemId;
};

exports.setQuirksMode = function(document) {
  throw new Error("not implemented");
};

exports.isQuirksMode = function(document) {
  throw new Error("not implemented");
};

exports.appendChild = function(parentNode, newNode) {
  if (parentNode instanceof Document) {
    if (parentNode.documentElement) throw new Error;
    parentNode.documentElement = newNode;
    parentNode.childNodes.push(newNode);
    newNode.parentNode = parentNode;
    return;
  }
  parentNode.appendChild(newNode);
};

exports.insertBefore = function(parentNode, newNode, referenceNode) {
  throw new Error("not implemented");
};

exports.detachNode = function(node) {
  throw new Error("not implemented");
};

exports.insertText = function(parentNode, text) {
  if (parentNode.childNodes.length) {
    var prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];

    if (prevNode.nodeName === '#text') {
      prevNode.value += text;
      return;
    }
  }

  parentNode.appendChild(document.createTextNode(text));
};

exports.insertTextBefore = function(parentNode, text, referenceNode) {
  var prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];

  if (prevNode && prevNode.nodeName === '#text')
    prevNode.value += text;
  else
    insertBefore(parentNode, createTextNode(text), referenceNode);
};

exports.adoptAttributes = function(recipientNode, attrs) {
  var recipientAttrsMap = [];

  for (var i = 0; i < recipientNode.attrs.length; i++)
    recipientAttrsMap.push(recipientNode.attrs[i].name);

  for (var j = 0; j < attrs.length; j++) {
    if (recipientAttrsMap.indexOf(attrs[j].name) === -1)
      recipientNode.attrs.push(attrs[j]);
  }
};


//Tree traversing
exports.getFirstChild = function(node) {
  return node.childNodes[0];
};

exports.getChildNodes = function(node) {
  return node.childNodes;
};

exports.getParentNode = function(node) {
  return node.parentNode;
};

exports.getAttrList = function(node) {
  return node.attrs;
};

exports.getTagName = function(element) {
  return element.tagName;
};

exports.getNamespaceURI = function(element) {
  return element.namespaceURI;
};

exports.getTextNodeContent = function(textNode) {
  return textNode.data;
};

exports.getCommentNodeContent = function(commentNode) {
  return commentNode.data;
};

exports.getDocumentTypeNodeName = function(doctypeNode) {
  return doctypeNode.name;
};

exports.getDocumentTypeNodePublicId = function(doctypeNode) {
  return doctypeNode.publicId;
};

exports.getDocumentTypeNodeSystemId = function(doctypeNode) {
  return doctypeNode.systemId;
};

exports.isTextNode = function(node) {
  return node.nodeName === '#text';
};

exports.isCommentNode = function(node) {
  return node.nodeName === '#comment';
};

exports.isDocumentTypeNode = function(node) {
  return node.nodeName === '#documentType';
};

exports.isElementNode = function(node) {
  return !!node.tagName;
};
