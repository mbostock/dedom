function DOMImplementation() {
  throw new TypeError("Illegal constructor");
}

DOMImplementation.prototype.hasFeature = function(feature, version) {
  throw new Error("not yet implemented");
};

module.exports = DOMImplementation;
