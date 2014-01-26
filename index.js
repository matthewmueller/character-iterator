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
  this.it = it(node).filter(Node.TEXT_NODE);
  this.initialize(node, offset);
}

/**
 * Initialize
 *
 * @param {Node} node
 * @param {Number} offset
 * @return {Iterator}
 * @api private
 */

Iterator.prototype.initialize = function(node, offset) {
  this.node = node || this.it.start;
  this.offset = this.so = offset || this.so || 0;
  this.text = (3 == this.node.nodeType) ? this.node.nodeValue : null;
};

/**
 * Next character
 *
 * @return {String} ch
 * @api public
 */

Iterator.prototype.next = function() {
  this.peaked = null;

  // initial setup when `this.node` isnt a text node
  if (!this.text) {
    this.node = this.it.next();
    if (!this.node) return null;
    this.text = this.node.nodeValue;
  }

  var ch = this.text[this.offset++];
  var node;

  while (!ch) {
    node = this.it.next();
    if (!node) return null;
    this.node = node;
    this.text = node.nodeValue;
    this.offset = 0;
    ch = this.text[this.offset++];
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
  this.peaked = null;

  // initial setup when `this.node` isnt a text node
  if (!this.text) {
    this.node = this.it.prev();
    if (!this.node) return null;
    this.text = this.node.nodeValue;
  }

  var ch = this.text[--this.offset];
  var node;

  while (!ch) {
    node = this.it.prev();
    if (!node) return null;
    this.node = node;
    this.text = node.nodeValue;
    this.offset = this.text.length;
    ch = this.text[--this.offset];
  }

  return ch;
};

/**
 * Peak in either direction
 * `n` nodes. Peak backwards
 * using negative numbers.
 *
 * @param {Number} n (optional)
 * @return {Node|null}
 * @api public
 */

Iterator.prototype.peak = function(n) {
  n = undefined == n ? 1 : n;
  var peaked = this.peaked = this.peaked || new Iterator(this.node, this.offset);

  if (!n) return null;
  else if (n > 0) while(n--) node = peaked.next();
  else while(n++) node = peaked.prev();
  return node;
}

/**
 * Reset the iterator
 *
 * @param {Node} node (optional)
 * @return {Iterator}
 * @api public
 */

Iterator.prototype.reset = function(node, offset) {
  this.it.reset(node);
  this.initialize(node, offset);
  return this;
};

