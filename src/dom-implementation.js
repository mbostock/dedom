var secret = require("./secret");

function DOMImplementation(_) {
  if (_ !== secret) throw new TypeError("Illegal constructor");
}

var prototype = DOMImplementation.prototype = Object.create(Object.prototype);

prototype.constructor = DOMImplementation;

prototype.hasFeature = function(feature, version) {
  return false;
};

module.exports = DOMImplementation;
