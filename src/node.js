function Node() {
  throw new TypeError("Illegal constructor");
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

Node.prototype.insertBefore = function(newChild, refChild) {
  throw new Error("not yet implemented");
};

Node.prototype.replaceChild = function(newChild, oldChild) {
  throw new Error("not yet implemented");
};

Node.prototype.removeChild = function(oldChild) {
  if (oldChild._parent !== this) throw new Error; // TODO DOMException
  if (oldChild._previous) oldChild._previous._next = oldChild._next;
  else this._first = oldChild._next;
  if (oldChild._next) oldChild._next._previous = oldChild._previous;
  else this._last = oldChild._previous;
  oldChild._previous = oldChild._next = oldChild._parent = null;
  return oldChild;
};

Node.prototype.appendChild = function(newChild) {
  if (newChild._parent) newChild._parent.removeChild(newChild);
  newChild._parent = this;
  if (newChild._previous = this._last) this._last._next = newChild;
  this._last = newChild;
  if (!this._first) this._first = newChild;
  return newChild;
};

Node.prototype.hasChildNodes = function() {
  return !!this._first;
};

Node.prototype.cloneNode = function(deep) {
  throw new Error("not yet implemented");
};

module.exports = Node;
