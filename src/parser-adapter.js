var Document = require("./document"),
    DocumentType = require("./document-type"),
    Element = require("./element"),
    NamedNodeMap = require("./named-node-map"),
    Node = require("./node"),
    NodeList = require("./node-list"),
    Text = require("./text");

var document; // blech, createElement doesn’t know its document

exports.createDocument = function() {
  document = Object.create(Document.prototype);

  defineNode(document, "#document", null, Node.DOCUMENT_NODE, document);

  return document;
};

exports.setDocumentType = function(document, name, publicId, systemId) {
  var doctype = Object.create(DocumentType.prototype);

  defineNode(doctype, name, null, Node.DOCUMENT_TYPE_NODE, document);

  Object.defineProperties(doctype, documentTypeAliases);
  Object.defineProperties(doctype, {
    entities: {
      enumerable: true,
      writable: false,
      value: createNamedNodeMap()
    },
    notations: {
      enumerable: true,
      writable: false,
      value: createNamedNodeMap()
    },
    publicId: {
      enumerable: true,
      writable: false,
      value: publicId
    },
    systemId: {
      enumerable: true,
      writable: false,
      value: systemId
    }
  });

  Object.defineProperties(document, {
    doctype: {
      enumerable: true,
      writable: false,
      value: doctype
    }
  });
};

exports.createElement = function(tagName, namespaceURI, attrs) {
  if (document == null) throw new Error;
  var element = Object.create(Element.prototype);

  defineNode(element, tagName, null, Node.ELEMENT_NODE, document);

  if (tagName === "html") Object.defineProperties(document, {
    documentElement: {
      enumerable: true,
      writable: false,
      value: element
    }
  });

  Object.defineProperties(element, elementAliases);
  Object.defineProperties(element, {
    namespaceURI: {
      enumerable: true,
      writable: false,
      value: namespaceURI
    }
  });

  return element;
};

exports.appendChild = function(parentNode, newChild) {
  parentNode.appendChild(newChild);
};

exports.getTagName = function(node) {
  return node.tagName;
};

exports.getNamespaceURI = function(node) {
  return node.namespaceURI;
};

// TODO concatenate adjacent text nodes
exports.insertText = function(node, data) {
  var text = Object.create(Text.prototype);

  defineNode(text, "#text", data, Node.TEXT_NODE, document);

  Object.defineProperties(text, {
    data: {
      enumerable: true,
      writable: false,
      value: data
    },
    length: {
      enumerable: true,
      writable: false,
      value: data.length
    }
  });

  node.appendChild(text);
};

function createNamedNodeMap() {
  return Object.create(NamedNodeMap.prototype, {
    length: {
      enumerable: true,
      writable: false,
      value: 0
    }
  });
}

function createNodeList(node) {
  var nodeList = Object.create(NodeList.prototype);

  Object.defineProperties(nodeList, nodeListAliases);
  Object.defineProperties(nodeList, {
    _node: {
      enumerable: false,
      writable: false,
      value: node
    }
  });

  return nodeList;
}

function defineNode(node, nodeName, nodeValue, nodeType, ownerDocument) {
  Object.defineProperties(node, nodeAliases);
  Object.defineProperties(node, {
    nodeName: {
      enumerable: true,
      writable: false,
      value: nodeName
    },
    nodeValue: {
      enumerable: true,
      writable: false,
      value: nodeValue
    },
    nodeType: {
      enumerable: true,
      writable: false,
      value: nodeType
    },
    ownerDocument: {
      enumerable: true,
      writable: false,
      value: ownerDocument
    },
    _children: {
      enumerable: false,
      writable: false,
      value: createNodeList(node)
    },
    _attributes: {
      enumerable: false,
      writable: false,
      value: createNamedNodeMap() // TODO
    }
  });
}

var documentTypeAliases = {
  name: {
    enumerable: true,
    get: function() {
      return this.nodeName;
    }
  },
  internalSubset: {
    enumerable: true,
    writable: false,
    value: null
  }
};

var elementAliases = {
  tagName: {
    enumerable: true,
    get: function() {
      return this.nodeName;
    }
  }
};

var nodeListAliases = {
  length: {
    enumerable: true,
    get: function() {
      var length = 0,
          node = this._node._first;
      while (node) ++length, node = node._next;
      return length;
    }
  }
};

var nodeAliases = {
  _parent: {
    enumerable: false,
    writable: true,
    value: null
  },
  parentNode: {
    enumerable: true,
    get: function() {
      return this._parent;
    }
  },
  childNodes: {
    enumerable: true,
    get: function() {
      return this._children;
    }
  },
  _first: {
    enumerable: false,
    writable: true,
    value: null
  },
  firstChild: {
    enumerable: true,
    get: function() {
      return this._first;
    }
  },
  _last: {
    enumerable: false,
    writable: true,
    value: null
  },
  lastChild: {
    enumerable: true,
    get: function() {
      return this._last;
    }
  },
  _next: {
    enumerable: false,
    writable: true,
    value: null
  },
  nextSibling: {
    enumerable: true,
    get: function() {
      return this._next;
    }
  },
  _previous: {
    enumerable: false,
    writable: true,
    value: null
  },
  previousSibling: {
    enumerable: true,
    get: function() {
      return this._previous;
    }
  },
  attributes: {
    enumerable: true,
    get: function() {
      return this._attributes;
    }
  }
};
