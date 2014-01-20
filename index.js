/**
 * Module dependencies
 */

var it = require('dom-iterator');

/**
 * Export `Iterator`
 */

module.exports = Iterator;

/**
 * Initialize `Iterator`
 *
 * @param {TextNode} node
 * @param {Number} offset
 * @return {Iterator} [description]
 */

function Iterator(node, parent, offset) {
  if (!(this instanceof Iterator)) return new Iterator(node, parent, offset);
  var text = node.textContent;
  offset = offset || 0;
  this.it = it(node, parent).filter(Node.TEXT_NODE);
  this.left = text.slice(0, offset);
  this.loff = offset - 1;
  this.right = text.slice(offset - 1);
  this.roff = offset;
}

/**
 * Next character
 *
 * @return {String} ch
 */

Iterator.prototype.next = function() {
  var ch = this.right[this.roff++];
  var node;

  while (!ch) {
    node = this.it.next();
    if (!node) return null;
    this.right = node.nodeValue;
    this.roff = 0;
    ch = this.right[this.roff++];
  }

  return ch;
};

/**
 * Previous character
 *
 * @return {String} ch
 */

Iterator.prototype.previous =
Iterator.prototype.prev = function() {
  var ch = this.left[this.loff--];

  while (!ch) {
    node = this.it.prev();
    if (!node) return null;
    this.left = node.nodeValue;
    this.loff = this.left.length - 1;
    ch = this.left[this.loff--];
  }

  return ch;
};




