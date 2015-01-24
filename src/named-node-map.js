function NamedNodeMap() {
  throw new TypeError("Illegal constructor");
}

// readonly attribute  unsigned long        length;

NamedNodeMap.prototype.getNamedItem = function(name) {
  throw new Error("not yet implemented");
};

NamedNodeMap.prototype.setNamedItem = function(arg) {
  throw new Error("not yet implemented");
};

NamedNodeMap.prototype.removeNamedItem = function(name) {
  throw new Error("not yet implemented");
};

NamedNodeMap.prototype.item = function(index) {
  throw new Error("not yet implemented");
};

module.exports = NamedNodeMap;
