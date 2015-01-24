var secret = require("./secret"),
    nwmatcher = require("../lib/nwmatcher/nwmatcher-noqsa"),
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
  id: {get: function() { return this.getAttribute("id"); }},
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

prototype.querySelector = function(selector) {
  return matcher(this).first(selector, this);
};

prototype.querySelectorAll = function(selector) {
  throw new Error("not yet implemented");
};

// TODO restrict to just Element types
prototype.getElementById = function(id) {
  var child = this.firstChild;

  id += "";

  out: while (child) {
    if (child.id === id) return child;
    if (child.firstChild) child = child.firstChild;
    else if (child.nextSibling) child = child.nextSibling;
    else {
      do {
        child = child.parentNode;
        if (child === this) break out;
      } while (!child.nextSibling);
      child = child.nextSibling;
    }
  }

  return null;
};

// TODO restrict to just Element types
prototype.getElementsByTagName = function(tagName) {
  var nodes = [],
      child = this.firstChild;

  tagName += "";

  out: while (child) {
    if (tagName === "*" || child.tagName === tagName) nodes.push(child);
    if (child.firstChild) child = child.firstChild;
    else if (child.nextSibling) child = child.nextSibling;
    else {
      do {
        child = child.parentNode;
        if (child === this) break out;
      } while (!child.nextSibling);
      child = child.nextSibling;
    }
  }

  return new NodeList(secret, nodes);
};

prototype.normalize = function() {
  throw new Error("not yet implemented");
};

prototype.toString = function() {
  return "<" + this.nodeName + ">";
};

function matcher(element) {
  var document = element.ownerDocument,
      matcher = document._matcher;
  if (matcher) return matcher;
  matcher = nwmatcher({document: document});
  Object.defineProperty(document, "_matcher", {value: matcher});
  return matcher;
}

module.exports = Element;
