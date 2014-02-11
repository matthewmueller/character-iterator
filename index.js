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
 * @param {Node} root
 * @return {Iterator}
 * @api public
 */

function Iterator(node, offset, root) {
  if (!(this instanceof Iterator)) return new Iterator(node, offset, root);
  this.it = it(node, root).select(Node.TEXT_NODE).revisit(false);
  this.node = node || this.it.start;
  this.offset = undefined == offset ? 0 : offset;
  this.root = root;
  this.text = (3 == this.node.nodeType) ? this.node.nodeValue : null;
}

/**
 * Next character
 *
 * @return {String} ch
 * @api public
 */

Iterator.prototype.next = function() {
  this.peaked = null;
  var node;

  // initial setup when `this.node` isnt a text node
  if (!this.text) {
    node = this.it.next();
    if (!node) return null;
    this.node = node;
    this.text = this.node.nodeValue;
  }

  var ch = this.text[this.offset++];

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
  var node;

  // initial setup when `this.node` isnt a text node
  if (!this.text) {
    node = this.it.closing().prev();
    if (!node) return null;
    this.node = node;
    this.text = this.node.nodeValue;
  }

  var ch = this.text[--this.offset];

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
  var peaked = this.peaked = this.peaked || new Iterator(this.node, this.offset, this.root);

  if (!n) return null;
  else if (n > 0) while(n--) node = peaked.next();
  else while(n++) node = peaked.prev();
  return node;
}

/**
 * Utility: Check if node is higher
 * than root. Also checks if root
 * exists
 *
 * @param {Node} node
 * @param {Node} root
 * @return {Boolean}
 * @api private
 */

function higher(node, root) {
  return root && !root.contains(node);
}
