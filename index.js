var parse5 = require("parse5");

var parser = new parse5.Parser(require("./src/parser-adapter")),
    serializer = new parse5.Serializer(require("./src/serializer-adapter"));

var Attr = exports.Attr = require("./src/attr.js"),
    CDATASection = exports.CDATASection = require("./src/cdata-section.js"),
    CharacterData = exports.CharacterData = require("./src/character-data.js"),
    Comment = exports.Comment = require("./src/comment.js"),
    DocumentFragment = exports.DocumentFragment = require("./src/document-fragment.js"),
    DocumentType = exports.DocumentType = require("./src/document-type.js"),
    Document = exports.Document = require("./src/document.js"),
    DOMException = exports.DOMException = require("./src/dom-exception.js"),
    DOMImplementation = exports.DOMImplementation = require("./src/dom-implementation.js"),
    Element = exports.Element = require("./src/element.js"),
    EntityReference = exports.EntityReference = require("./src/entity-reference.js"),
    Entity = exports.Entity = require("./src/entity.js"),
    NamedNodeMap = exports.NamedNodeMap = require("./src/named-node-map.js"),
    NodeList = exports.NodeList = require("./src/node-list.js"),
    Node = exports.Node = require("./src/node.js"),
    Notation = exports.Notation = require("./src/notation.js"),
    ProcessingInstruction = exports.ProcessingInstruction = require("./src/processing-instruction.js"),
    Text = exports.Text = require("./src/text.js");

// TODO DOMParser?
exports.parse = function(html) {
  return parser.parse(html);
};

// TODO XMLSerializer?
exports.serialize = function(document) {
  return serializer.serialize(document);
};
