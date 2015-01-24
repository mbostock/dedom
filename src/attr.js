var Node = require("./node");

function Attr() {
  throw new TypeError("Illegal constructor");
}

// readonly attribute  DOMString            name;
// readonly attribute  boolean              specified;
//          attribute  DOMString            value;

Attr.prototype = Object.create(Node.prototype);
