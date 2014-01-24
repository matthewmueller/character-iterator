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
  this.prevText = text.slice(0, offset);
  this.prevNode = node;
  this.prevOffset = offset - 1;
  this.nextText = offset ? text.slice(offset) : text.slice(offset);
  this.nextNode = node;
  this.nextOffset = 0;
}

/**
 * Next character
 *
 * @return {String} ch
 * @api public
 */

Iterator.prototype.next = function() {
  var ch = this.nextText[this.nextOffset++];
  var node;

  while (!ch) {
    node = this.it.next();
    if (!node) return null;
    this.nextNode = node;
    this.nextText = node.nodeValue;
    this.nextOffset = 0;
    ch = this.nextText[this.nextOffset++];
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
  var ch = this.prevText[this.prevOffset--];

  while (!ch) {
    node = this.it.prev();
    if (!node) return null;
    this.prevNode = node;
    this.prevText = node.nodeValue;
    this.prevOffset = this.prevText.length - 1;
    ch = this.prevText[this.prevOffset--];
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

