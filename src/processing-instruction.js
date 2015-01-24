var Node = require("./node");

function ProcessingInstruction() {
  throw new TypeError("Illegal constructor");
}

// readonly attribute  DOMString            target;
//          attribute  DOMString            data;
//                                     // raises(DOMException) on setting

ProcessingInstruction.prototype = Object.create(Node.prototype);

module.exports = ProcessingInstruction;
