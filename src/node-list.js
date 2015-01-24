// TODO support array indexing

function NodeList() {
  throw new TypeError("Illegal constructor");
}

// readonly attribute  unsigned long        length;

NodeList.prototype.item = function(index) {
  var length = 0,
      node = this._node._first;
  while (node) {
    if (length >= index) return node;
    ++length;
    node = node._next;
  }
  return null;
};

module.exports = NodeList;
