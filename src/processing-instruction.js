var Node = require("./node");

function ProcessingInstruction(_, ownerDocument, target, data) {
  Node.call(this, _, ownerDocument, "#processing-instruction", null, Node.PROCESSING_INSTRUCTION_NODE);
  Object.defineProperties(this, {
    target: {enumerable: true, value: target},
    data: {enumerable: true, writable: true, value: data}
  });
}

var prototype = ProcessingInstruction.prototype = Object.create(Node.prototype);

prototype.constructor = ProcessingInstruction;

module.exports = ProcessingInstruction;
