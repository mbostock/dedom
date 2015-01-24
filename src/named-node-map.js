var secret = require("./secret");

function NamedNodeMap(_) {
  if (_ !== secret) throw new TypeError("Illegal constructor");
  Object.defineProperties(this, {
    _nodes: {value: []}
  });
}

var prototype = NamedNodeMap.prototype = Object.create(Object.prototype, {
  length: {get: function() { return this._nodes.length; }}
});

prototype.constructor = NamedNodeMap;

prototype.getNamedItem = function(name) {
  var node,
      i = -1,
      n = this._nodes.length;
  while (++i < n) {
    if ((node = this._nodes[i]).nodeName == name) {
      return node;
    }
  }
  return null;
};

prototype.setNamedItem = function(node) {
  var name = node.nodeName,
      oldNode,
      i = -1,
      n = this._nodes.length;
  while (++i < n) {
    if ((oldNode = this._nodes[i]).nodeName == name) {
      this._nodes[i] = node;
      return oldNode;
    }
  }
  this._nodes.push(node);
  return null;
};

prototype.removeNamedItem = function(name) {
  var node,
      i = -1,
      n = this._nodes.length;
  while (++i < n) {
    if ((node = this._nodes[i]).nodeName == name) {
      this._nodes.splice(i, 1);
      return node;
    }
  }
  return null;
};

prototype.item = function(index) {
  return this._nodes[index] || null;
};

module.exports = NamedNodeMap;
