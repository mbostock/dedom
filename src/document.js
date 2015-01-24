var Comment = require("./comment"),
    Element = require("./element"),
    Node = require("./node"),
    Text = require("./text");

function Document() {
  throw new TypeError("Illegal constructor");
}

// readonly attribute  DocumentType         doctype;
// readonly attribute  DOMImplementation    implementation;
// readonly attribute  Element              documentElement;

Document.prototype = Object.create(Node.prototype);

Document.prototype.createElement = function(tagName) {
  throw new Error("not yet implemented");
};

Document.prototype.createDocumentFragment = function() {
  throw new Error("not yet implemented");
};

Document.prototype.createTextNode = function(data) {
  throw new Error("not yet implemented");
};

Document.prototype.createComment = function(data) {
  throw new Error("not yet implemented");
};

Document.prototype.createCDATASection = function(data) {
  throw new Error("not yet implemented");
};

Document.prototype.createProcessingInstruction = function(target, data) {
  throw new Error("not yet implemented");
};

Document.prototype.createAttribute = function(name) {
  throw new Error("not yet implemented");
};

Document.prototype.createEntityReference = function(name) {
  throw new Error("not yet implemented");
};

Document.prototype.getElementsByTagName = function(tagName) {
  return this.documentElement.getElementsByTagName(tagName);
};

module.exports = Document;
