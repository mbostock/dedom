var secret = require("./secret");

// Note: array indexing is not supported! (That would require proxies?)

function NodeList(_, nodes) {
  if (_ !== secret) throw new TypeError("Illegal constructor");
  Object.defineProperties(this, {
    _nodes: {value: nodes}
  });
}

var prototype = NodeList.prototype = Object.create(Object.prototype, {
  length: {get: function() { return this._nodes.length; }}
});

prototype.constructor = NodeList;

prototype.item = function(index) {
  return this._nodes[index] || null;
};

prototype.toString = function() {
  return this._nodes + "";
};

module.exports = NodeList;
