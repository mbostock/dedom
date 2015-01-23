var parse5 = require("parse5");

var adapter = require("./src/tree-adapter"),
    parser = new parse5.Parser(adapter),
    serializer = new parse5.Serializer;

exports.parse = function(html) {
  var document = parser.parse(html);
  adapter._finalize(); // TODO make this cleaner
  return document;
};

exports.serialize = function(document) {
  return serializer.serialize(document);
};

exports.CharacterData = require("./src/character-data");
exports.Comment = require("./src/comment");
exports.Document = require("./src/document");
exports.DocumentType = require("./src/document-type");
exports.Element = require("./src/element");
exports.Node = require("./src/node");
exports.Text = require("./src/text");
