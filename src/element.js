var secret = require("./secret"),
    Attr = require("./attr"),
    Node = require("./node"),
    NodeList = require("./node-list");

function Element(_, ownerDocument, name, namespaceURI) {
  Node.call(this, _, ownerDocument, name, null, Node.ELEMENT_NODE);
  Object.defineProperties(this, {
    namespaceURI: {enumerable: true, value: namespaceURI}
  });
}

var prototype = Element.prototype = Object.create(Node.prototype, {
  tagName: {get: function() { return this.nodeName; }}
});

prototype.constructor = Element;

prototype.getAttribute = function(name) {
  var attr = this.attributes.getNamedItem(name);
  return attr && attr.nodeValue;
};

prototype.setAttribute = function(name, value) {
  var attr = new Attr(secret, this.ownerDocument, name, true, value);
  this.attributes.setNamedItem(attr);
};

prototype.removeAttribute = function(name) {
  this.attributes.removeNamedItem(name);
};

prototype.getAttributeNode = function(name) {
  throw new Error("not yet implemented");
};

prototype.setAttributeNode = function(newAttr) {
  throw new Error("not yet implemented");
};

prototype.removeAttributeNode = function(oldAttr) {
  throw new Error("not yet implemented");
};

prototype.getElementsByTagName = function(tagName) {
  var nodes = [];

  (function visit(element) {
    var child = element.firstChild;
    while (child) {
      if (child.tagName === tagName) nodes.push(child);
      visit(child);
      child = child.nextSibling;
    }
  })(this);

  return new NodeList(secret, nodes);
};

prototype.normalize = function() {
  throw new Error("not yet implemented");
};

prototype.toString = function() {
  return "<" + this.nodeName + ">";
};

module.exports = Element;
