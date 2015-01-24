var secret = require("./secret");

function NodeList(_, node) {
  if (_ !== secret) throw new TypeError("Illegal constructor");
  Object.defineProperties(this, {
    _node: {value: node}
  });
}

var prototype = NodeList.prototype = Object.create(Object.prototype, {
  length: {
    get: function() {
      var length = 0, node = this._node._first;
      while (node) ++length, node = node._next;
      return length;
    }
  }
});

prototype.constructor = NodeList;

prototype.item = function(index) {
  var length = 0, node = this._node._first;
  while (node) {
    if (++length > index) return node;
    node = node._next;
  }
  return null;
};

module.exports = NodeList;
