var secret = require("./secret"),
    Attr = require("./attr"),
    Node = require("./node");

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
  throw new Error("not yet implemented");
  // var results = []; // TODO NodeList

  // visitBefore(this, function(element) {
  //   if (element.tagName === tagName) {
  //     result = element;
  //     return false;
  //   }
  //   return true;
  // });

  // return result;
};

prototype.normalize = function() {
  throw new Error("not yet implemented");
};

// function visitBefore(element, visitor) {
//   if (visitor(element) && element.childNodes) {
//     element.childNodes.forEach(function(child) {
//       visitBefore(child, visitor);
//     });
//   }
// }

module.exports = Element;
