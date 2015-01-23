var Node = require("./node");

function Element() {
  throw new TypeError("Illegal constructor");
}

Element.prototype = Object.create(Node.prototype);

Element.prototype.setAttribute = function(name, value) {
  throw new Error("not implemented");
};

Element.prototype.getAttribute = function(name) {
  throw new Error("not implemented");
};

// TODO childNodes should be a NodeList, not an Array
// TODO various properties should be made read-only?

Element.prototype.removeChild = function(oldChild) {
  if (oldChild.parentNode !== this) throw new Error;
  var i = this.childNodes.indexOf(oldChild);
  this.childNodes.splice(i, 1);
  if (i === 0) this.firstChild = this.childNodes[0] || null;
  oldChild.parentNode = null;
  return oldChild;
};

Element.prototype.appendChild = function(newChild) {
  if (newChild.parentNode) newChild.parentNode.removeChild(newChild);
  if (!this.childNodes.length) this.firstChild = newChild;
  this.childNodes.push(newChild);
  newChild.parentNode = this;
  return newChild;
};

Element.prototype.insertBefore = function(newChild, refChild) {
  if (refChild.parentNode !== this) throw new Error;
  if (newChild.parentNode) newChild.parentNode.removeChild(newChild);
  var i = this.childNodes.indexOf(refChild);
  if (i <= 0) this.firstChild = newChild;
  this.childNodes.splice(i, 0, newChild);
  newChild.parentNode = this;
  return newChild;
};

Element.prototype.getElementsByTagName = function(tagName) {
  var results = [];

  visitBefore(this, function(element) {
    if (element.tagName === tagName) {
      result = element;
      return false;
    }
    return true;
  });

  return result;
};

function visitBefore(element, visitor) {
  if (visitor(element) && element.childNodes) {
    element.childNodes.forEach(function(child) {
      visitBefore(child, visitor);
    });
  }
}

module.exports = Element;
