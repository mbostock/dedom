var Comment = require("./comment"),
    Element = require("./element"),
    Node = require("./node"),
    Text = require("./text");

function Document() {
  throw new TypeError("Illegal constructor");
}

Document.prototype = Object.create(Node.prototype);

Document.prototype.getElementsByTagName = function(tagName) {
  return this.documentElement.getElementsByTagName(tagName);
};

Document.prototype.createElementNS = function(namespaceURI, tagName) {
  var element = Object.create(Element.prototype);
  element.nodeName = tagName;
  element.tagName = tagName;
  element.namespaceURI = namespaceURI;
  element.childNodes = [];
  element.parentNode = null;
  element.ownerDocument = this;
  return element;
};

Document.prototype.createComment = function(data) {
  var comment = Object.create(Comment.prototype);
  comment.data = data;
  comment.ownerDocument = this;
  return comment;
};

Document.prototype.createTextNode = function(data) {
  var text = Object.create(Text.prototype);
  text.data = data;
  text.ownerDocument = this;
  return text;
};

module.exports = Document;
