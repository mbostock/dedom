var secret = require("./secret"),
    DOMException = require("./dom-exception"),
    NodeList = require("./node-list"),
    NamedNodeMap = require("./named-node-map");

function Node(_, ownerDocument, nodeName, nodeValue, nodeType) {
  if (_ !== secret) throw new TypeError("Illegal constructor");
  Object.defineProperties(this, {
    _parent: {writable: true},
    _first: {writable: true},
    _last: {writable: true},
    _next: {writable: true},
    _previous: {writable: true},
    _attributes: {value: new NamedNodeMap(_)},
    childNodes: {value: new NodeList(_, [])},
    nodeName: {enumerable: true, value: nodeName},
    nodeValue: {enumerable: true, value: nodeValue}, // TODO this should be writable (sometimes)!
    nodeType: {enumerable: true, value: nodeType},
    ownerDocument: {enumerable: true, value: ownerDocument}
  });
}

Node.ELEMENT_NODE = 1;
Node.ATTRIBUTE_NODE = 2;
Node.TEXT_NODE = 3;
Node.CDATA_SECTION_NODE = 4;
Node.ENTITY_REFERENCE_NODE = 5;
Node.ENTITY_NODE = 6;
Node.PROCESSING_INSTRUCTION_NODE = 7;
Node.COMMENT_NODE = 8;
Node.DOCUMENT_NODE = 9;
Node.DOCUMENT_TYPE_NODE = 10;
Node.DOCUMENT_FRAGMENT_NODE = 11;
Node.NOTATION_NODE = 12;

var prototype = Node.prototype = Object.create(Object.prototype, {
  parentNode: {get: function() { return this._parent; }},
  firstChild: {get: function() { return this._first; }},
  lastChild: {get: function() { return this._last; }},
  nextSibling: {get: function() { return this._next; }},
  previousSibling: {get: function() { return this._previous; }},
  attributes: {get: function() { return this._attributes; }}
});

prototype.constructor = Node;

prototype.insertBefore = function(newChild, refChild) {
  throw new Error("not yet implemented");
};

prototype.replaceChild = function(newChild, oldChild) {
  throw new Error("not yet implemented");
};

prototype.removeChild = function(oldChild) {
  if (oldChild._parent !== this) throw new DOMException(secret, DOMException.HIERARCHY_REQUEST_ERR);
  this.childNodes._nodes.splice(this.childNodes._nodes.indexOf(oldChild), 1);
  if (oldChild._previous) oldChild._previous._next = oldChild._next; else this._first = oldChild._next;
  if (oldChild._next) oldChild._next._previous = oldChild._previous; else this._last = oldChild._previous;
  oldChild._previous = oldChild._next = oldChild._parent = null;
  return oldChild;
};

prototype.appendChild = function(newChild) {
  if (newChild._parent) newChild._parent.removeChild(newChild);
  newChild._parent = this;
  if (newChild._previous = this._last) this._last._next = newChild;
  if (!this._first) this._first = newChild;
  this._last = newChild;
  this.childNodes._nodes.push(newChild);
  return newChild;
};

prototype.hasChildNodes = function() {
  return !!this._first;
};

prototype.cloneNode = function(deep) {
  throw new Error("not yet implemented");
};

prototype.toString = function() {
  return this.nodeName;
};

module.exports = Node;
