var Text = require("./text");

function CDATASection(_, ownerDocument, data) {
  Text.call(this, _, ownerDocument, data);
}

var prototype = CDATASection.prototype = Object.create(Text.prototype);

prototype.constructor = CDATASection;

module.exports = CDATASection;
