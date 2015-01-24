var Node = require("./node");

function Element() {
  throw new TypeError("Illegal constructor");
}

// readonly attribute  DOMString            tagName;

Element.prototype = Object.create(Node.prototype);

Element.prototype.getAttribute = function(name) {
  throw new Error("not yet implemented");
};

Element.prototype.setAttribute = function(name, value) {
  throw new Error("not yet implemented");
};

Element.prototype.removeAttribute = function(name) {
  throw new Error("not yet implemented");
};

Element.prototype.getAttributeNode = function(name) {
  throw new Error("not yet implemented");
};

Element.prototype.setAttributeNode = function(newAttr) {
  throw new Error("not yet implemented");
};

Element.prototype.removeAttributeNode = function(oldAttr) {
  throw new Error("not yet implemented");
};

Element.prototype.getElementsByTagName = function(tagName) {
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

Element.prototype.normalize = function() {
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
