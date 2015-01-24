var secret = require("./secret"),
    Attr = require("./attr"),
    Comment = require("./comment"),
    CDATASection = require("./cdata-section"),
    DocumentType = require("./document-type"),
    DOMImplementation = require("./dom-implementation"),
    Element = require("./element"),
    EntityReference = require("./entity-reference"),
    Node = require("./node"),
    ProcessingInstruction = require("./processing-instruction"),
    Text = require("./text");

function Document(_, name, publicId, systemId) {
  Node.call(this, _, this, "#document", null, Node.DOCUMENT_NODE);
  Object.defineProperties(this, {
    doctype: {value: new DocumentType(_, this, name, publicId, systemId)},
    implementation: new DOMImplementation(_)
  });
}

var prototype = Document.prototype = Object.create(Node.prototype, {
  documentElement: {
    get: function() {
      var child = this._first;
      while (child) {
        if (child.nodeType === Node.ELEMENT_NODE) return child;
        child = child._next;
      }
      return null;
    }
  }
});

prototype.constructor = Document;

prototype.addEventListener = function() { // needed for nwmatcher IE9 check
  throw new Error("not yet implemented");
};

prototype.createElement = function(tagName) {
  return new Element(secret, this, tagName, this.documentElement.namespaceURI);
};

prototype.createElementNS = function(namespaceURI, qualifiedName) {
  return new Element(secret, this, qualifiedName, namespaceURI);
};

prototype.createDocumentFragment = function() {
  throw new Error("not yet implemented");
};

prototype.createTextNode = function(data) {
  return new Text(secret, this, data);
};

prototype.createComment = function(data) {
  return new Comment(secret, this, data);
};

prototype.createCDATASection = function(data) {
  return new CDATASection(secret, this, data);
};

prototype.createProcessingInstruction = function(target, data) {
  return new ProcessingInstruction(secret, this, target, data);
};

prototype.createAttribute = function(name) {
  return new Attr(secret, this, name, false, "");
};

prototype.createEntityReference = function(name) {
  return new EntityReference(secret, this, name);
};

prototype.getElementsByTagName = function(tagName) {
  return this.documentElement.getElementsByTagName(tagName);
};

prototype.getElementById = function(id) {
  return this.documentElement.getElementById(id);
};

prototype.querySelector = function(selector) {
  return this.documentElement.querySelector(selector);
};

prototype.querySelectorAll = function(selector) {
  return this.documentElement.querySelectorAll(selector);
};

module.exports = Document;
