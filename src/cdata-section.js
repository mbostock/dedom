var Text = require("./text");

function CDATASection() {
  throw new TypeError("Illegal constructor");
}

CDATASection.prototype = Object.create(Text.prototype);

module.exports = CDATASection;
