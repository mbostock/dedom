var Node = require("./node");

function Attr(_, ownerDocument, name, specified, value) {
  Node.call(this, _, ownerDocument, name, value, Node.ATTRIBUTE_NODE);
  Object.defineProperties(this, {
    specified: {value: specified} // TODO should reflect if nodeValue changes
  });
}

var prototype = Attr.prototype = Object.create(Node.prototype, {
  name: {get: function() { return this.nodeName; }},
  value: {get: function() { return this.nodeValue; }} // TODO this should be writable
});

prototype.constructor = Attr;

module.exports = Attr;
