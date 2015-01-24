var Node = require("./node");

function DocumentFragment() {
  throw new TypeError("Illegal constructor");
}

DocumentFragment.prototype = Object.create(Node.prototype);

module.exports = DocumentFragment;
