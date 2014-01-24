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
 * @return {Iterator}
 * @api public
 */

function Iterator(node, offset) {
  if (!(this instanceof Iterator)) return new Iterator(node, offset);
  var text = node.textContent;
  offset = offset || 0;
  this.it = it(node).filter(Node.TEXT_NODE);
  this.left = text.slice(0, offset);
  this.leftNode = node;
  this.leftOffset = offset - 1;
  this.right = offset ? text.slice(offset) : text.slice(offset);
  this.rightNode = node;
  this.rightOffset = 0;
}

/**
 * Next character
 *
 * @return {String} ch
 * @api public
 */

Iterator.prototype.next = function() {
  var ch = this.right[this.rightOffset++];
  var node;

  while (!ch) {
    node = this.it.next();
    if (!node) return null;
    this.rightNode = node;
    this.right = node.nodeValue;
    this.rightOffset = 0;
    ch = this.right[this.rightOffset++];
  }

  return ch;
};

/**
 * Previous character
 *
 * @return {String} ch
 * @api public
 */

Iterator.prototype.previous =
Iterator.prototype.prev = function() {
  var ch = this.left[this.leftOffset--];

  while (!ch) {
    node = this.it.prev();
    if (!node) return null;
    this.leftNode = node;
    this.left = node.nodeValue;
    this.leftOffset = this.left.length - 1;
    ch = this.left[this.leftOffset--];
  }

  return ch;
};

/**
 * Reset the iterator
 *
 * @param {Node} node (optional)
 * @return {Iterator}
 * @api public
 */

Iterator.prototype.reset = function(node) {
  this.it.reset(node);
  return this;
};

