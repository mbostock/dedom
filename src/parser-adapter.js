var Document = require("./document"),
    DocumentType = require("./document-type"),
    Element = require("./element"),
    NamedNodeMap = require("./named-node-map"),
    Node = require("./node"),
    NodeList = require("./node-list"),
    Text = require("./text");

module.exports = function() {
  return {
    createDocument: createDocument,
    createElement: createElement,
    setDocumentType: setDocumentType,
    appendChild: appendChild,
    getTagName: getTagName,
    getNamespaceURI: getNamespaceURI,
    insertText: insertText
  };
};

function createDocument() {
  var document = Object.create(Document.prototype);

  defineNode(document, "#document", null, Node.DOCUMENT_NODE);

  Object.defineProperties(document, {
    ownerDocument: {
      enumerable: true,
      writable: false,
      value: document
    }
  });

  return document;
}

// Note: ownerDocument and document.documentElement is set on append
function createElement(tagName, namespaceURI, attrs) {
  var element = Object.create(Element.prototype);

  defineNode(element, tagName, null, Node.ELEMENT_NODE);

  Object.defineProperties(element, elementAliases);
  Object.defineProperties(element, {
    namespaceURI: {
      enumerable: true,
      writable: false,
      value: namespaceURI
    }
  });

  return element;
}

function setDocumentType(document, name, publicId, systemId) {
  var doctype = Object.create(DocumentType.prototype);

  defineNode(doctype, name, null, Node.DOCUMENT_TYPE_NODE);

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
}

function appendChild(parentNode, newChild) {
  if (!parentNode.ownerDocument) throw new Error;

  Object.defineProperties(newChild, {
    ownerDocument: {
      enumerable: true,
      writable: false,
      value: parentNode.ownerDocument
    }
  });

  if (parentNode.nodeType === Node.DOCUMENT_NODE
      && newChild.nodeType === Node.ELEMENT_NODE) Object.defineProperties(parentNode, {
    documentElement: {
      enumerable: true,
      writable: false,
      value: newChild
    }
  });

  parentNode.appendChild(newChild);
}

function getTagName(node) {
  return node.tagName;
}

function getNamespaceURI(node) {
  return node.namespaceURI;
}

// TODO concatenate adjacent text nodes
function insertText(node, data) {
  var text = Object.create(Text.prototype);

  defineNode(text, "#text", data, Node.TEXT_NODE);

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
}

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

function defineNode(node, nodeName, nodeValue, nodeType) {
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
